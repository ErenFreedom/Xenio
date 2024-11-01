// src/pages/PrivatePages/FraudDisputeResolution.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function FraudDisputeResolution() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Queries for fraud management and dispute resolution
    const queries = [
        {
            question: 'I suspect fraudulent activity on my account. What should I do?',
            answers: [
                'Contact customer service immediately to report the suspicious activity.',
                'Temporarily freeze or block your account if necessary to prevent unauthorized transactions.',
                'Monitor your account for any additional unusual transactions.',
                'Work with your bank’s fraud team to investigate the matter.'
            ]
        },
        {
            question: 'How do I dispute a transaction?',
            answers: [
                'Log in to your account and go to the "Dispute a Transaction" section.',
                'Select the transaction you wish to dispute and follow the on-screen instructions.',
                'Provide any required information to support your claim.',
                'Submit the dispute request and wait for a response from your bank.'
            ]
        },
        {
            question: 'What happens after I report a fraudulent transaction?',
            answers: [
                'Your bank will review your report and begin an investigation.',
                'If your claim is valid, your bank may temporarily credit your account during the investigation.',
                'The investigation may take some time, and your bank will keep you informed of its progress.',
                'Once the investigation is complete, you’ll be notified of the final decision.'
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
                <h1>Fraud Management and Dispute Resolution</h1>
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

export default FraudDisputeResolution;
