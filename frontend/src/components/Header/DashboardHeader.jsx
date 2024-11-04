import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './DashboardHeader.css';

function DashboardHeader() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        // Clear the JWT token from localStorage
        localStorage.removeItem('jwtToken');
        console.log("User logged out");

        // Redirect to the home page
        navigate('/');
    };

    return (
        <header className="dashboard-header">
            <div className="dashboard-header-left">
                <img src="/logo.png" alt="Xenio Logo" className="dashboard-logo" />
            </div>
            <div className="dashboard-header-center">
                <h2 className="dashboard-welcome-message">Welcome to your Dashboard</h2>
            </div>
            <div className="dashboard-header-right" onClick={toggleDropdown}>
                <FaUserCircle className="dashboard-profile-icon" />
                {dropdownVisible && (
                    <div className="dashboard-dropdown">
                        <button className="dashboard-dropdown-item" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default DashboardHeader;
