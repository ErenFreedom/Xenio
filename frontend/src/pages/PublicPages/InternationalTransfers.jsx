import React, { useState } from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PublicPages.css';

function InternationalTransfers() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Check if user is logged in by verifying if a token exists
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    const queries = [
        {
            question: 'What are the fees for international transfers?',
            answers: [
                'Fees vary depending on the bank and the destination country.',
                'Additional intermediary fees may apply if the transfer goes through other banks.',
                'Foreign exchange rates impact the total cost of the transfer.',
                'Some banks offer reduced fees for premium account holders.',
                'Check with your bank for a detailed breakdown of applicable fees.',
                'International transfer fees can be flat-rate or percentage-based depending on the amount.'
            ]
        },
        {
            question: 'Can I get a refund for an overdraft fee?',
            answers: [
                'Contact customer service to request an overdraft fee refund.',
                'Some banks allow a one-time fee waiver if it is your first overdraft.',
                'Overdraft fees may be refunded as a goodwill gesture for loyal customers.',
                'Ensure you have sufficient funds to avoid future overdraft fees.',
                'Automatic alerts can help prevent overdrafts by notifying you of low balances.',
                'Refund policies vary; refer to your bank’s terms and conditions.'
            ]
        },
        {
            question: 'Why was I charged a fee on my account?',
            answers: [
                'Account maintenance fees apply if your balance is below a minimum requirement.',
                'Banks may charge fees for certain transactions, such as international transfers.',
                'Check your account statement for a detailed list of fees and charges.',
                'ATM withdrawals from non-partner banks may incur extra fees.',
                'Excessive withdrawal fees apply if you exceed a specified number of withdrawals.',
                'Contact customer service for specific information on any unexpected charges.'
            ]
        }
    ];

    const handleToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="account-opening-page">
            {isLoggedIn ? <DashboardHeader /> : <HomeHeader />}
            <div className="content">
                <h1>International Transfers and Fees</h1>
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

export default InternationalTransfers;
