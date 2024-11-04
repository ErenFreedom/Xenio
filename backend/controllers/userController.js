// controllers/userController.js
const db = require('../config/db');

// Controller to get user profile
const getUserProfile = (req, res) => {
    const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user ID

    db.get(
        `SELECT first_name, last_name, username, date_of_birth, email FROM users WHERE id = ?`,
        [userId],
        (err, row) => {
            if (err) {
                console.error('Error retrieving user profile:', err.message);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!row) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(row); // Send the user data to populate the form
        }
    );
};

// Controller to update user profile
const updateUserProfile = (req, res) => {
    const userId = req.user.id;
    const { first_name, last_name, username, date_of_birth, email } = req.body;

    db.run(
        `UPDATE users SET 
            first_name = ?, 
            last_name = ?, 
            username = ?, 
            date_of_birth = ?, 
            email = ? 
        WHERE id = ?`,
        [first_name, last_name, username, date_of_birth, email, userId],
        function (err) {
            if (err) {
                console.error('Error updating user profile:', err.message);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Profile updated successfully' });
        }
    );
};

module.exports = { getUserProfile, updateUserProfile };
