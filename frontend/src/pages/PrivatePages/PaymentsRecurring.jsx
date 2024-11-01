// src/pages/PrivatePages/PaymentsRecurring.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function PaymentsRecurring() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Queries for payments and recurring payments
    const queries = [
        {
            question: 'How do I set up auto-payments for my bills?',
            answers: [
                'Log in to your online banking account and go to the "Payments" section.',
                'Select "Auto-Pay" and choose the bill or payee you want to set up auto-pay for.',
                'Enter the amount, frequency, and start date for auto-pay.',
                'Confirm your settings to enable auto-pay for your selected bills.'
            ]
        },
        {
            question: 'How can I check the status of a scheduled payment?',
            answers: [
                'Go to the "Scheduled Payments" section in your online banking account.',
                'Locate the payment you want to check; the status will be shown as "Pending", "Completed", or "Failed".',
                'If you have any questions, contact customer support for further assistance.'
            ]
        },
        {
            question: 'How can I stop or modify a recurring payment?',
            answers: [
                'Log in to your online banking account and go to "Recurring Payments".',
                'Select the payment you want to stop or modify.',
                'Click on "Edit" to change the payment details or "Cancel" to stop the payment.',
                'Review and confirm the changes.'
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
                <h1>Payments and Recurring Payments</h1>
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

export default PaymentsRecurring;
