// pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import { FaSearch } from 'react-icons/fa';
import HomeFooter from '../../components/Footer/HomeFooter';
import './Dashboard.css';

function Dashboard() {
    const [balance, setBalance] = useState(0);
    const [rewardPoints, setRewardPoints] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);
    const latestTransaction = {
        account: `#${Math.floor(1000000000 + Math.random() * 9000000000)}`, // Generates a random 10-digit account number
        amount: Math.floor(Math.random() * (100000 - 10000 + 1) + 10000) // Random amount between 10,000 and 100,000
    };

    // Animation for numbers
    useEffect(() => {
        const animateValue = (setter, end, duration) => {
            let start = 0;
            const step = Math.max(Math.floor(end / 100), 1); // Step to reach target quickly
            const stepTime = Math.abs(Math.floor(duration / (end / step)));

            const timer = setInterval(() => {
                start += step;
                if (start >= end) {
                    setter(end);
                    clearInterval(timer);
                } else {
                    setter(start);
                }
            }, stepTime);
        };

        // Randomly generated values for the demo with a faster counting animation
        animateValue(setBalance, Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000), 500); // 500ms duration
        animateValue(setRewardPoints, Math.floor(Math.random() * (5000 - 100 + 1) + 100), 500); // 500ms duration
        animateValue(setMonthlySavings, Math.floor(Math.random() * (200000 - 10000 + 1) + 10000), 500); // 500ms duration
    }, []);

    return (
        <div className="dashboard-page">
            <DashboardHeader />
            <div className="search-container">
                <FaSearch className="search-icon" />
                <input type="text" className="search-bar" placeholder="Search..." />
            </div>
            <div className="dashboard-content">
                <div className="dashboard-card">
                    <h3>Current Balance</h3>
                    <p>₹{balance.toLocaleString()}</p>
                </div>
                <div className="dashboard-card">
                    <h3>Latest Transaction</h3>
                    <p className="latest-transaction">
                        {latestTransaction.account} - ₹{latestTransaction.amount.toLocaleString()} <br />
                        Money Credited
                    </p>
                </div>
                <div className="dashboard-card">
                    <h3>Rewards Points</h3>
                    <p>{rewardPoints.toLocaleString()}</p>
                </div>
                <div className="dashboard-card">
                    <h3>Monthly Savings</h3>
                    <p>₹{monthlySavings.toLocaleString()}</p>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}

export default Dashboard;
