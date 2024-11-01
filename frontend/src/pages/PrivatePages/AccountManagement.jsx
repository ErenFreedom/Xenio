// src/pages/PrivatePages/AccountManagement.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function AccountManagement() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Sample data for account management queries
    const queries = [
        {
            question: 'How do I close my account?',
            answers: [
                'Visit your nearest branch and submit an account closure form.',
                'Ensure that there are no outstanding dues on your account.',
                'Withdraw or transfer remaining funds before closure.',
                'Submit your debit card and any unused checkbooks.',
                'Wait for account closure confirmation from the bank.'
            ]
        },
        {
            question: 'How do I update my personal details?',
            answers: [
                'Log into your online banking account and navigate to settings.',
                'Edit your personal details like address, email, or phone number.',
                'Verify the updated information with an OTP sent to your registered mobile.',
                'Visit the branch if additional verification documents are required.'
            ]
        },
        {
            question: 'How can I check my account balance online?',
            answers: [
                'Log in to your online banking account using your credentials.',
                'Navigate to the account summary section to view your balance.',
                'Use the bank’s mobile app for on-the-go balance checking.',
                'Enable balance notifications to stay updated via SMS or email.'
            ]
        }
    ];

    // Toggle dropdown
    const handleToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="account-management-page">
            <DashboardHeader />
            <div className="content">
                <h1>Account Management Dashboard</h1>
                <div className="queries">
                    {queries.map((query, index) => (
                        <div key={index} className="query-box">
                            <button
                                className="button-35"
                                onClick={() => handleToggle(index)}
                            >
                                <span>{query.question}</span>
                                <span className="arrow">{openDropdown === index ? '▲' : '▼'}</span>
                            </button>
                            {openDropdown === index && (
                                <div className="query-body">
                                    <ul>
                                        {query.answers.map((answer, i) => (
                                            <li key={i}>{answer}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}

export default AccountManagement;
