// src/pages/PrivatePages/FeeManagement.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function FeeManagement() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Queries for fee management and charges
    const queries = [
        {
            question: 'Why was I charged a fee on my account?',
            answers: [
                'Fees may be applied for account maintenance, overdrafts, or other banking services.',
                'Review your bank’s fee schedule for detailed information on potential charges.',
                'Contact customer support if you believe a fee was charged in error.'
            ]
        },
        {
            question: 'How do I avoid monthly maintenance fees?',
            answers: [
                'Maintain the minimum balance required by your account to waive fees.',
                'Set up direct deposits, as some accounts waive fees with regular deposits.',
                'Consider switching to an account type with no monthly maintenance fees.'
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
                <h1>Fee Management and Charges</h1>
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

export default FeeManagement;
