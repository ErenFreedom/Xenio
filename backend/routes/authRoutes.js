// routes/authRoutes.js
const express = require('express');
const { registerUser, verifyOtp } = require('../controllers/authController');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for OTP verification
router.post('/verify-otp', verifyOtp);

module.exports = router;
