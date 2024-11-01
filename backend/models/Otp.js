const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');

// Create OTP table with created_at adjusted to Indian Standard Time (IST)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS otps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            otp TEXT NOT NULL,
            created_at DATETIME DEFAULT (datetime('now', '+5 hours', '30 minutes'))
        )
    `, (err) => {
        if (err) {
            console.error('Could not create OTP table:', err.message);
        } else {
            console.log('OTP table created successfully with IST time.');
        }
    });
});

module.exports = db;
