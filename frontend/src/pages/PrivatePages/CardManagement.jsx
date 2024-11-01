// src/pages/PrivatePages/CardManagement.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function CardManagement() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Queries for credit/debit card management
    const queries = [
        {
            question: 'How do I activate my new credit/debit card?',
            answers: [
                'Log in to your online banking account and go to "Card Management".',
                'Select your new card and click on the "Activate" option.',
                'You may be required to enter a security code or verify your identity.',
                'Once activated, your card is ready for use.'
            ]
        },
        {
            question: 'What should I do if my card is lost/stolen?',
            answers: [
                'Contact customer service immediately to report the loss or theft.',
                'Request to have your card blocked to prevent unauthorized use.',
                'Follow up with your bank for a replacement card if needed.'
            ]
        },
        {
            question: 'How do I request a credit limit increase?',
            answers: [
                'Log in to your account and go to the "Credit Limit" section.',
                'Submit a request for a credit limit increase and provide the necessary information.',
                'Your bank may review your income, spending habits, and payment history.',
                'Wait for approval from your bank; you’ll be notified if the increase is granted.'
            ]
        },
        {
            question: 'How can I block or unblock my card?',
            answers: [
                'Log in to your online banking and go to "Card Management".',
                'Choose the card you want to block/unblock and select the appropriate option.',
                'Confirm the action, and your card will be blocked/unblocked instantly.',
                'Contact customer support if you face any issues during the process.'
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
                <h1>Credit/Debit Card Management</h1>
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

export default CardManagement;
