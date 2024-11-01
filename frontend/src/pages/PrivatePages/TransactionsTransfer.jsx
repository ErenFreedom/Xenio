// src/pages/PrivatePages/TransactionTransfer.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function TransactionTransfer() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Queries for transactions and transfer management
    const queries = [
        {
            question: 'Why hasn’t my transfer gone through?',
            answers: [
                'Transfers can be delayed due to high network traffic or bank processing times.',
                'Double-check your account balance to ensure sufficient funds.',
                'Verify that you entered the correct recipient details.',
                'If the issue persists, contact customer support for further assistance.'
            ]
        },
        {
            question: 'How can I track my transaction history?',
            answers: [
                'Log in to your account and go to the "Transactions" or "History" section.',
                'You can filter transactions by date, type, or amount for easier tracking.',
                'For more detailed information, download your transaction statement.',
                'Contact customer support if you have questions about specific transactions.'
            ]
        },
        {
            question: 'I made a transfer to the wrong account. Can I reverse it?',
            answers: [
                'Contact your bank immediately to report the error and request a reversal.',
                'Provide as much detail as possible about the mistaken transfer.',
                'Keep in mind that successful reversals depend on the receiving bank and account holder.',
                'Your bank will guide you on the next steps and any potential charges.'
            ]
        },
        {
            question: 'What are the daily transfer limits?',
            answers: [
                'Daily transfer limits depend on your account type and banking regulations.',
                'Log in to your account settings to view your specific transfer limits.',
                'To request an increase in transfer limits, reach out to customer support.',
                'Ensure you are within the limit to avoid delays or declined transactions.'
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
                <h1>Transactions and Transfer Management</h1>
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

export default TransactionTransfer;
