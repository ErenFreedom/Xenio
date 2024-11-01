// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('./config/db');  // Import database connection
require('./models');  // Initialize tables by loading models

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Import and use auth and login routes
const authRoutes = require('./routes/authRoutes');
const loginRoutes = require('./routes/loginRoutes');  // Import login routes

app.use('/api/auth', authRoutes);
app.use('/api', loginRoutes);  // Register login routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
