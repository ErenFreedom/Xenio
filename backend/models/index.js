const db = require('../config/db');

// Import models to trigger table creation
require('./User');
require('./Otp');
require('./TempUser');

module.exports = db;
