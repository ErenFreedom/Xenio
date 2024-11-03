import React, { useState } from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PublicPages.css';

function AccountOpening() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Check if user is logged in by verifying if a token exists
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    // Sample data for the two queries
    const queries = [
        {
            question: 'How do I open a new bank account?',
            answers: [
                'Visit the nearest branch or apply online.',
                'Complete the application form provided.',
                'Submit necessary identification documents.',
                'Provide proof of address and income.',
                'Meet with a bank representative if required.',
                'Wait for account verification and activation.'
            ]
        },
        {
            question: 'What documents are required for account verification?',
            answers: [
                'Government-issued ID (passport, driver’s license, etc.).',
                'Proof of address (utility bill, lease, etc.).',
                'Social Security Number or equivalent.',
                'Proof of income if applicable.',
                'Any additional documents required by the bank.'
            ]
        }
    ];

    // Toggle dropdown
    const handleToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="account-opening-page">
            {/* Conditional Header: Show DashboardHeader if logged in, else HomeHeader */}
            {isLoggedIn ? <DashboardHeader /> : <HomeHeader />}
            
            <div className="content">
                <h1>Account Opening and Verification</h1>
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

export default AccountOpening;
