import React, { useState } from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PublicPages.css';

function SavingsFixedDeposit() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Check if user is logged in by verifying if a token exists
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    const queries = [
        {
            question: 'How do I open a fixed deposit account?',
            answers: [
                'Visit your bank branch or log in to your online banking portal.',
                'Choose the tenure and amount you wish to deposit.',
                'Submit identification and income proof if required.',
                'Select the interest payout option: monthly, quarterly, or at maturity.',
                'Review the terms, conditions, and penalties for early withdrawal.',
                'Complete the application and fund the fixed deposit account.'
            ]
        },
        {
            question: 'What is the current interest rate on savings accounts?',
            answers: [
                'Interest rates on savings accounts vary by bank and account type.',
                'Higher interest rates may apply for premium accounts or higher balances.',
                'Interest rates are subject to change based on economic conditions.',
                'Check the bank’s website or contact customer service for current rates.',
                'Some banks offer bonus interest rates for long-term savings commitments.',
                'Rates are typically lower than fixed deposit interest rates.'
            ]
        },
        {
            question: 'How is interest calculated on savings accounts?',
            answers: [
                'Interest is calculated daily on the closing balance in the account.',
                'Banks typically credit the interest monthly or quarterly.',
                'The interest rate is annual, but the calculation is done on a daily basis.',
                'Simple interest calculation: (Balance × Interest Rate) / 365.',
                'Compound interest may be applicable, depending on the bank’s policy.',
                'Interest earned may be subject to tax deductions if above a threshold.'
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
                <h1>Savings and Fixed Deposit Information</h1>
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

export default SavingsFixedDeposit;
