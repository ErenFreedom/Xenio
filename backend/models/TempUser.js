const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');

// Create TempUser table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS temp_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            username TEXT NOT NULL,
            date_of_birth TEXT,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Could not create temp_users table:', err.message);
        } else {
            console.log('TempUser table created successfully.');
        }
    });
});

module.exports = db;
