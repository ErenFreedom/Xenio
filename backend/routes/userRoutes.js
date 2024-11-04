// routes/userRoutes.js
const express = require('express');
const { updateUserProfile, getUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get user profile
router.get('/profile', authenticateToken, getUserProfile);

// Route to update user profile
router.put('/profile', authenticateToken, updateUserProfile);

module.exports = router;
