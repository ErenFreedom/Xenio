const CryptoJS = require('crypto-js');
const db = require('../config/db');
const sendOTP = require('../utils/sendEmail');

// AES-256 encryption secret key
const encryptionKey = process.env.ENCRYPTION_KEY || 'default_secret_key';

// Function to encrypt password
function encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, encryptionKey).toString();
}

// Register user and send OTP
async function registerUser(req, res) {
    const { firstName, lastName, username, dob, email, password } = req.body;

    // Encrypt the password
    const encryptedPassword = encryptPassword(password);

    db.get(
        `SELECT * FROM users WHERE email = ? OR username = ?`,
        [email, username],
        async (err, existingUser) => {
            if (err) {
                console.error('Error querying users table:', err.message);
                return res.status(500).json({ message: 'Database error' });
            }

            if (existingUser) {
                return res.status(400).json({ message: 'Email or username already exists in the system' });
            }

            try {
                const otp = await sendOTP(email);
                db.run(
                    `INSERT INTO temp_users (first_name, last_name, username, date_of_birth, email, password) VALUES (?, ?, ?, ?, ?, ?)`,
                    [firstName, lastName, username, dob, email, encryptedPassword],
                    (tempUserErr) => {
                        if (tempUserErr) {
                            console.error('Error inserting into temp_users:', tempUserErr.message);
                            return res.status(500).json({ message: 'Error saving temporary user' });
                        }

                        // Store OTP in the OTP table for verification with timestamp in IST
                        db.run(
                            `INSERT INTO otps (email, otp, created_at) VALUES (?, ?, datetime('now', '+5 hours', '30 minutes'))`,
                            [email, otp],
                            (otpErr) => {
                                if (otpErr) {
                                    console.error('Error inserting OTP:', otpErr.message);
                                    return res.status(500).json({ message: 'Error storing OTP' });
                                }

                                res.status(200).json({ message: 'OTP sent to your email. Please verify within 2 minutes.' });
                            }
                        );
                    }
                );
            } catch (emailError) {
                console.error('Error sending OTP email:', emailError.message);
                res.status(500).json({ message: 'Error sending OTP email' });
            }
        }
    );
}

// Verify OTP and complete registration
function verifyOtp(req, res) {
    const { email, otp } = req.body;

    db.get(
        `SELECT * FROM otps WHERE email = ? AND otp = ?`,
        [email, otp],
        (err, otpRecord) => {
            if (err) {
                console.error('Error querying OTPs table:', err.message);
                return res.status(500).json({ message: 'Database error' });
            }

            if (!otpRecord) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            const otpCreatedAtIST = new Date(otpRecord.created_at + " UTC+0530");
            const currentTimeIST = new Date();

            const timeDiff = (currentTimeIST - otpCreatedAtIST) / 1000;

            if (timeDiff > 120) { // 120 seconds for 2-minute validity
                return res.status(400).json({ message: 'OTP expired' });
            }

            db.get(
                `SELECT * FROM temp_users WHERE email = ?`,
                [email],
                (tempUserErr, tempUser) => {
                    if (tempUserErr || !tempUser) {
                        console.error('Error retrieving temporary user data:', tempUserErr?.message);
                        return res.status(500).json({ message: 'Error completing registration' });
                    }

                    db.run(
                        `INSERT INTO users (first_name, last_name, username, date_of_birth, email, password, is_verified) VALUES (?, ?, ?, ?, ?, ?, 1)`,
                        [tempUser.first_name, tempUser.last_name, tempUser.username, tempUser.date_of_birth, tempUser.email, tempUser.password],
                        (userInsertErr) => {
                            if (userInsertErr) {
                                console.error('Error inserting verified user:', userInsertErr.message);
                                return res.status(500).json({ message: 'Error finalizing registration' });
                            }

                            db.run(`DELETE FROM otps WHERE email = ?`, [email]);
                            db.run(`DELETE FROM temp_users WHERE email = ?`, [email], (deleteErr) => {
                                if (deleteErr) {
                                    console.error('Error deleting temporary data:', deleteErr.message);
                                    return res.status(500).json({ message: 'Error clearing temporary data' });
                                }

                                res.status(200).json({ message: 'Registration successful' });
                            });
                        }
                    );
                }
            );
        }
    );
}

async function resendOtp(req, res) {
    const { email } = req.body;

    db.get(`SELECT * FROM temp_users WHERE email = ?`, [email], async (err, tempUser) => {
        if (err || !tempUser) {
            return res.status(404).json({ message: 'User not found or not registered.' });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Unix timestamp
        const lastResendTime = tempUser.last_resend_time;
        const timeDiff = currentTime - lastResendTime;

        if (tempUser.resend_count >= 3) {
            if (timeDiff < 3600) {
                const remainingTime = Math.ceil((3600 - timeDiff) / 60);
                return res.status(429).json({ message: `Resend limit reached. Please wait ${remainingTime} minutes.` });
            } else {
                db.run(`UPDATE temp_users SET resend_count = 0 WHERE email = ?`, [email]);
            }
        }

        try {
            const newOtp = await sendOTP(email);
            db.run(
                `UPDATE temp_users SET resend_count = resend_count + 1, last_resend_time = datetime('now', '+5 hours', '30 minutes') WHERE email = ?`,
                [email]
            );

            db.run(
                `UPDATE otps SET otp = ?, created_at = datetime('now', '+5 hours', '30 minutes') WHERE email = ?`,
                [newOtp, email],
                (otpUpdateErr) => {
                    if (otpUpdateErr) {
                        console.error('Error updating OTP:', otpUpdateErr.message);
                        return res.status(500).json({ message: 'Error updating OTP' });
                    }

                    res.status(200).json({ message: 'OTP resent successfully. Please verify within 2 minutes.' });
                }
            );
        } catch (error) {
            console.error('Error resending OTP:', error.message);
            res.status(500).json({ message: 'Error sending OTP' });
        }
    });
}

module.exports = { registerUser, verifyOtp, resendOtp };
