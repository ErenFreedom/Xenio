// controllers/loginController.js
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const sendOTP = require('../utils/sendEmail');  // Reuse sendOTP function from utils

// AES-256 encryption secret key
const encryptionKey = process.env.ENCRYPTION_KEY || 'default_secret_key';
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'jwt_default_secret_key';

// Function to decrypt password
function decryptPassword(encryptedPassword) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Step 1: Authenticate User Credentials and Send OTP
async function initiateLogin(req, res) {
    const { emailOrUsername, password } = req.body;

    // Find user by email or username
    db.get(
        `SELECT * FROM users WHERE email = ? OR username = ?`,
        [emailOrUsername, emailOrUsername],
        async (err, user) => {
            if (err) {
                console.error('Error querying users table:', err.message);
                return res.status(500).json({ message: 'Database error' });
            }

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Decrypt stored password
            const decryptedPassword = decryptPassword(user.password);

            // Compare passwords
            if (decryptedPassword !== password) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate and send OTP
            try {
                const otp = await sendOTP(user.email);
                db.run(
                    `INSERT INTO otps (email, otp, created_at) VALUES (?, ?, datetime('now'))`,
                    [user.email, otp],
                    (otpErr) => {
                        if (otpErr) {
                            console.error('Error inserting OTP:', otpErr.message);
                            return res.status(500).json({ message: 'Error storing OTP' });
                        }

                        res.status(200).json({ message: 'OTP sent to your email. Please verify to complete login.' });
                    }
                );
            } catch (emailError) {
                console.error('Error sending OTP email:', emailError.message);
                res.status(500).json({ message: 'Error sending OTP email' });
            }
        }
    );
}

// Step 2: Verify OTP and Complete Login
function verifyLoginOtp(req, res) {
    const { email, otp } = req.body;

    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (err, user) => {
            if (err || !user) {
                console.error('Error querying users table:', err.message);
                return res.status(500).json({ message: 'Database error' });
            }

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

                    // Retrieve OTP creation time and compare with current time for expiration
                    const otpCreatedAtUTC = new Date(otpRecord.created_at + " UTC");
                    const currentTimeUTC = new Date(new Date().toISOString());

                    const timeDiff = (currentTimeUTC - otpCreatedAtUTC) / 1000;

                    if (timeDiff > 120) { // 120 seconds (2-minute validity)
                        return res.status(400).json({ message: 'OTP expired' });
                    }

                    // Generate JWT token with username, email, and encrypted password
                    const tokenPayload = {
                        userId: user.id,
                        username: user.username,
                        email: user.email,
                        password: user.password // Or consider encrypting this if absolutely necessary
                    };

                    const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '2h' });

                    // Clear OTP after successful login
                    db.run(`DELETE FROM otps WHERE email = ?`, [email], (deleteErr) => {
                        if (deleteErr) {
                            console.error('Error deleting OTP:', deleteErr.message);
                            return res.status(500).json({ message: 'Error clearing OTP' });
                        }
                        res.status(200).json({ message: 'Login successful', token });
                    });
                }
            );
        }
    );
}

module.exports = { initiateLogin, verifyLoginOtp };
