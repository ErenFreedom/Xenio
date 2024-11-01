// utils/sendEmail.js
const nodemailer = require('nodemailer');

// Function to generate a 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Generates a 6-digit OTP
}

// Function to send an OTP email
async function sendOTP(email) {
    const otp = generateOTP();

    // Configure the nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email details
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. It will expire in 1 minute.`,
        html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>It will expire in 1 minute.</p>`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}: ${otp}`);
        return otp; // Return the OTP so it can be saved in the database
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Could not send OTP email');
    }
}

module.exports = sendOTP;
