// authMiddleware.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Load the JWT secret key from environment variables
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'jwt_default_secret_key';

// Middleware to verify JWT and check if the query requires authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting token in format 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Access denied.' });
    }

    jwt.verify(token, jwtSecretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid. Access denied.' });
        }
        req.user = user; // Attach decoded user info to request
        next();
    });
}

// Middleware to check if a query requires login
function checkIfLoginRequired(req, res, next) {
    const queryText = req.body.text || req.query.text;

    if (!queryText) {
        return res.status(400).json({ message: 'No query text provided.' });
    }

    db.get(
        `SELECT login_required FROM queries WHERE query_text = ?`,
        [queryText],
        (err, row) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ message: 'Internal server error.' });
            }
            if (!row) {
                return res.status(404).json({ message: 'Query not found.' });
            }

            // If the query requires login, verify the token
            if (row.login_required) {
                authenticateToken(req, res, next);
            } else {
                next(); // Proceed without authentication
            }
        }
    );
}

module.exports = checkIfLoginRequired;
