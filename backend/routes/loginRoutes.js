// routes/loginRoutes.js
const express = require('express');
const { initiateLogin, verifyLoginOtp } = require('../controllers/loginController');
const router = express.Router();

router.post('/login/initiate', initiateLogin);  // Initiate login and send OTP
router.post('/login/verify-otp', verifyLoginOtp);  // Verify OTP and complete login

module.exports = router;
