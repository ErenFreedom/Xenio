// pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import { FaSearch } from 'react-icons/fa';
import HomeFooter from '../../components/Footer/HomeFooter';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [rewardPoints, setRewardPoints] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    // Retrieve JWT token from local storage
    const token = localStorage.getItem('jwtToken');

    const latestTransaction = {
        account: `#${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        amount: Math.floor(Math.random() * (100000 - 10000 + 1) + 10000)
    };

    // Animation for numbers
    useEffect(() => {
        const animateValue = (setter, end, duration) => {
            let start = 0;
            const step = Math.max(Math.floor(end / 100), 1);
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

        animateValue(setBalance, Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000), 500);
        animateValue(setRewardPoints, Math.floor(Math.random() * (5000 - 100 + 1) + 100), 500);
        animateValue(setMonthlySavings, Math.floor(Math.random() * (200000 - 10000 + 1) + 10000), 500);
    }, []);

    const publicPageRoutes = {
        'How do I open a new bank account?': 'account-opening',
        'What documents are required for account verification?': 'account-opening',
        'What is the interest rate on loans?': 'loans-mortgages',
        'How do I apply for a personal loan?': 'loans-mortgages',
        'What are the eligibility criteria for a mortgage?': 'loans-mortgages',
        'What are the fees for international transfers?': 'international-transfers',
        'What is the current interest rate on savings accounts?': 'savings-fixed-deposit',
        'How do I open a fixed deposit account?': 'savings-fixed-deposit',
        'How is interest calculated on savings accounts?': 'savings-fixed-deposit',
        'How do I register for online banking?': 'mobile-banking',
        'How do I download the mobile banking app?': 'mobile-banking',
        'Where is the nearest bank branch or ATM?': 'atm-branch-locator',
        'How do I withdraw cash without a card from an ATM?': 'atm-branch-locator',
        'What is the maximum amount I can withdraw from an ATM?': 'atm-branch-locator',
        'Can I deposit checks using an ATM?': 'atm-branch-locator',
        'What are the bank’s working hours?': 'customer-support',
        'How do I contact customer service?': 'customer-support',
        'Where can I find my account number/IBAN/SWIFT code?': 'customer-support',
        'How do I apply for a new service or product?': 'account-opening'
        // add other public query mappings
    };

    const privatePageRoutes = {
        'How do I close my account?': 'account-management',
        'How do I update my personal details?': 'account-management',
        'I forgot my username/password. How can I recover it?': 'authentication-security',
        'How do I reset my online banking password?': 'authentication-security',
        'What should I do if my account is locked?': 'authentication-security',
        'How can I enable two-factor authentication (2FA)?': 'authentication-security',
        'Why hasn’t my transfer gone through?': 'transactions-transfer',
        'How can I track my transaction history?': 'transactions-transfer',
        'I made a transfer to the wrong account. Can I reverse it?': 'transactions-transfer',
        'What are the daily transfer limits?': 'transactions-transfer',
        'How do I activate my new credit/debit card?': 'card-management',
        'What should I do if my card is lost/stolen?': 'card-management',
        'How do I request a credit limit increase?': 'card-management',
        'How can I block or unblock my card?': 'card-management',
        'How do I repay my loan early?': 'loan-repayment',
        'Why did my payment fail?': 'transactions-transfer',
        'How do I set up auto-payments for my bills?': 'payments-recurring',
        'How can I check the status of a scheduled payment?': 'transactions-transfer',
        'How can I stop or modify a recurring payment?': 'payments-recurring',
        'I suspect fraudulent activity on my account. What should I do?': 'fraud-dispute-resolution',
        'How do I dispute a transaction?': 'fraud-dispute-resolution',
        'What happens after I report a fraudulent transaction?': 'fraud-dispute-resolution',
        'Why was I charged a fee on my account?': 'fee-management',
        'How do I avoid monthly maintenance fees?': 'fee-management',
        'How do I protect myself from online banking fraud?': 'fraud-dispute-resolution',
        'Can I get a refund for an overdraft fee?': 'fee-management',
        'Can I withdraw money from my savings account before maturity?': 'savings-transaction-limits',
        'How can I change my transaction limits in the mobile app?': 'savings-transaction-limits',
        'How can I check my account balance online?': 'transactions-transfer'
        // add other private query mappings
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/query/predict`,
                { text: searchQuery },
                { headers: { Authorization: `Bearer ${token}` } } // Include JWT token
            );

            const { predicted_category, requires_login } = response.data;

            if (requires_login) {
                const pageRoute = privatePageRoutes[predicted_category];
                if (pageRoute) {
                    navigate(`/private/${pageRoute}`);
                } else {
                    toast.error("Private page not found for this query.");
                }
            } else {
                const pageRoute = publicPageRoutes[predicted_category];
                if (pageRoute) {
                    navigate(`/public/${pageRoute}`);
                } else {
                    toast.error("Public page not found for this query.");
                }
            }
        } catch (error) {
            console.error("Error fetching query result:", error);
            toast.error("Authentication required. Redirecting to login...");
            setTimeout(() => navigate('/login'), 1000); // Redirect to login after showing toast
        }
    };

    return (
        <div className="dashboard-page">
            <ToastContainer />
            <DashboardHeader />
            <div className="search-container">
                <FaSearch className="search-icon" onClick={handleSearch} />
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
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
