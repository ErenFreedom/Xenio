const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');

// Create User table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            date_of_birth TEXT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            is_verified BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Could not create users table:', err.message);
        } else {
            console.log('User table created successfully.');
        }
    });
});

module.exports = db;
