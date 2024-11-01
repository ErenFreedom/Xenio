// src/pages/PrivatePages/AuthenticationSecurity.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function AuthenticationSecurity() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Data for authentication and security settings queries
    const queries = [
        {
            question: 'I forgot my username/password. How can I recover it?',
            answers: [
                'Go to the login page and click on "Forgot Username/Password".',
                'Enter your registered email or phone number.',
                'Follow the instructions sent to your email to recover your account details.',
                'If needed, contact customer support for additional assistance.'
            ]
        },
        {
            question: 'How do I reset my online banking password?',
            answers: [
                'Log in to your online banking account and navigate to settings.',
                'Select "Change Password" from the security section.',
                'Follow the steps to create a new, secure password.',
                'Ensure your password is a mix of uppercase, lowercase, numbers, and special characters.'
            ]
        },
        {
            question: 'How can I enable two-factor authentication (2FA)?',
            answers: [
                'Log in to your account and go to the security settings.',
                'Select the "Enable Two-Factor Authentication (2FA)" option.',
                'Choose your preferred method, such as SMS or authenticator app.',
                'Follow the steps provided to set up and activate 2FA for your account.'
            ]
        },
        {
            question: 'How do I protect myself from online banking fraud?',
            answers: [
                'Always use strong, unique passwords for your online accounts.',
                'Enable two-factor authentication (2FA) for added security.',
                'Avoid accessing your account from public or shared devices.',
                'Regularly review your transaction history for any unauthorized activity.',
                'Be cautious of phishing emails and links, and never share your login credentials.'
            ]
        }
    ];

    // Toggle dropdown
    const handleToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="private-page">
            <DashboardHeader />
            <div className="content">
                <h1>Authentication and Security Settings</h1>
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

export default AuthenticationSecurity;
