// routes/queryRoutes.js
const express = require('express');
const axios = require('axios'); // For making HTTP requests to FastAPI
const db = require('../config/db'); // Database connection
const checkIfLoginRequired = require('../middlewares/authMiddleware'); // Middleware to verify login if required

const router = express.Router();

// Route to predict query category using FastAPI and handle login requirement
router.post('/predict', checkIfLoginRequired, async (req, res) => {
    const { text } = req.body;

    try {
        // Call FastAPI model to get predicted query category
        const response = await axios.post('http://127.0.0.1:8000/predict/', { text });

        const { predicted_category } = response.data; // Extract predicted category
        const requiresLogin = await checkLoginRequirement(predicted_category);

        if (requiresLogin && !req.user) {
            // If login is required and user is not authenticated, block access
            return res.status(401).json({ message: 'Authentication required for this query.' });
        }

        res.json({ predicted_category, requires_login: requiresLogin });
    } catch (error) {
        console.error('Error in /predict route:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Helper function to check if a predicted category requires login
async function checkLoginRequirement(predicted_category) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT login_required FROM queries WHERE query_text = ?`,
            [predicted_category],
            (err, row) => {
                if (err) {
                    console.error('Database error:', err.message);
                    reject(err);
                }
                resolve(row ? row.login_required === 1 : false);
            }
        );
    });
}

module.exports = router;
