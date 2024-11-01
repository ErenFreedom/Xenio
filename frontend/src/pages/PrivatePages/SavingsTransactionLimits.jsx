// src/pages/PrivatePages/SavingsTransactionLimits.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function SavingsTransactionLimits() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Queries for savings and transaction limits
    const queries = [
        {
            question: 'Can I withdraw money from my savings account before maturity?',
            answers: [
                'Early withdrawal may result in penalties or a reduction in interest.',
                'Check with your bank regarding specific terms for your savings account.',
                'Consider transferring funds to a more accessible account for regular withdrawals.'
            ]
        },
        {
            question: 'How can I change my transaction limits in the mobile app?',
            answers: [
                'Log in to your mobile app and navigate to the "Settings" or "Transaction Limits" section.',
                'Follow the prompts to adjust your daily, weekly, or monthly transaction limits.',
                'Some limits may require bank approval; contact support for assistance.'
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
                <h1>Savings and Transaction Limits</h1>
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

export default SavingsTransactionLimits;
