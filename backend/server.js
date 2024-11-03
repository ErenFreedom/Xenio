// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

// Initialize database connection
require('./config/db');  // Import database connection
require('./models');     // Initialize tables by loading models

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Import and use auth and login routes
const authRoutes = require('./routes/authRoutes');
const loginRoutes = require('./routes/loginRoutes');
const queryRoutes = require('./routes/queryRoutes'); // Import the prediction route

// Register routes
app.use('/api/auth', authRoutes);         // Authentication routes
app.use('/api/login', loginRoutes);       // Login-related routes
app.use('/api/query', queryRoutes);       // Prediction route

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
