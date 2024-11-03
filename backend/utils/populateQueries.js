// utils/populateQueries.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Define the path to the SQLite database file
const dbPath = path.join(__dirname, '../database/lockerdb.sqlite');

// Open the database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Define the queries and their login requirements
const queries = [
    // Login Required
    { query_text: 'How do I close my account?', login_required: true },
    { query_text: 'How do I update my personal details?', login_required: true },
    { query_text: 'I forgot my username/password. How can I recover it?', login_required: true },
    { query_text: 'How do I reset my online banking password?', login_required: true },
    { query_text: 'What should I do if my account is locked?', login_required: true },
    { query_text: 'How can I enable two-factor authentication (2FA)?', login_required: true },
    { query_text: 'Why hasn’t my transfer gone through?', login_required: true },
    { query_text: 'How can I track my transaction history?', login_required: true },
    { query_text: 'I made a transfer to the wrong account. Can I reverse it?', login_required: true },
    { query_text: 'What are the daily transfer limits?', login_required: true },
    { query_text: 'How do I activate my new credit/debit card?', login_required: true },
    { query_text: 'What should I do if my card is lost/stolen?', login_required: true },
    { query_text: 'How do I request a credit limit increase?', login_required: true },
    { query_text: 'How can I block or unblock my card?', login_required: true },
    { query_text: 'How do I repay my loan early?', login_required: true },
    { query_text: 'Why did my payment fail?', login_required: true },
    { query_text: 'How do I set up auto-payments for my bills?', login_required: true },
    { query_text: 'How can I check the status of a scheduled payment?', login_required: true },
    { query_text: 'How can I stop or modify a recurring payment?', login_required: true },
    { query_text: 'I suspect fraudulent activity on my account. What should I do?', login_required: true },
    { query_text: 'How do I dispute a transaction?', login_required: true },
    { query_text: 'What happens after I report a fraudulent transaction?', login_required: true },
    { query_text: 'Why was I charged a fee on my account?', login_required: true },
    { query_text: 'How do I avoid monthly maintenance fees?', login_required: true },
    { query_text: 'How do I protect myself from online banking fraud?', login_required: true },
    { query_text: 'Can I get a refund for an overdraft fee?', login_required: true },
    { query_text: 'Can I withdraw money from my savings account before maturity?', login_required: true },
    { query_text: 'How can I change my transaction limits in the mobile app?', login_required: true },
    { query_text: 'How can I check my account balance online?', login_required: true },

    // General (No Login Required)
    { query_text: 'How do I open a new bank account?', login_required: false },
    { query_text: 'What documents are required for account verification?', login_required: false },
    { query_text: 'What is the interest rate on loans?', login_required: false },
    { query_text: 'How do I apply for a personal loan?', login_required: false },
    { query_text: 'What are the eligibility criteria for a mortgage?', login_required: false },
    { query_text: 'What are the fees for international transfers?', login_required: false },
    { query_text: 'What is the current interest rate on savings accounts?', login_required: false },
    { query_text: 'How do I open a fixed deposit account?', login_required: false },
    { query_text: 'How is interest calculated on savings accounts?', login_required: false },
    { query_text: 'How do I register for online banking?', login_required: false },
    { query_text: 'How do I download the mobile banking app?', login_required: false },
    { query_text: 'Where is the nearest bank branch or ATM?', login_required: false },
    { query_text: 'How do I withdraw cash without a card from an ATM?', login_required: false },
    { query_text: 'What is the maximum amount I can withdraw from an ATM?', login_required: false },
    { query_text: 'Can I deposit checks using an ATM?', login_required: false },
    { query_text: 'What are the bank’s working hours?', login_required: false },
    { query_text: 'How do I contact customer service?', login_required: false },
    { query_text: 'Where can I find my account number/IBAN/SWIFT code?', login_required: false },
    { query_text: 'How do I apply for a new service or product?', login_required: false }
];

// Function to insert queries into the table
function populateQueries() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS queries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            query_text TEXT NOT NULL,
            login_required BOOLEAN NOT NULL
        );`);

        const insertQuery = `INSERT INTO queries (query_text, login_required) VALUES (?, ?)`;

        queries.forEach((query) => {
            db.run(insertQuery, [query.query_text, query.login_required ? 1 : 0], (err) => {
                if (err) {
                    console.error('Error inserting query:', err.message);
                } else {
                    console.log(`Inserted query: "${query.query_text}"`);
                }
            });
        });

        console.log('All queries have been inserted.');
    });
}

// Run the function to populate the table
populateQueries();

// Close the database connection after population
db.close((err) => {
    if (err) {
        console.error('Error closing the database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
