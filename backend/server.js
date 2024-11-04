const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

require('./config/db');  
require('./models');     

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

const authRoutes = require('./routes/authRoutes');
const loginRoutes = require('./routes/loginRoutes');
const queryRoutes = require('./routes/queryRoutes'); 
const userRoutes = require('./routes/userRoutes'); 

// Register routes
app.use('/api/auth', authRoutes);         // Authentication routes
app.use('/api/login', loginRoutes);       // Login-related routes
app.use('/api/query', queryRoutes);       // Prediction route
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
