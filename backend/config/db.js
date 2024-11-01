// db.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Define the SQLite database file path
const dbPath = path.join(__dirname, '../database/lockerdb.sqlite');

// Initialize the SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database successfully.');
    }
});

// Export the database connection
module.exports = db;
