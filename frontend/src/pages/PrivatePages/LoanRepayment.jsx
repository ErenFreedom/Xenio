// src/pages/PrivatePages/LoanRepayment.jsx
import React, { useState } from 'react';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PrivatePages.css';

function LoanRepayment() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Queries for loan repayment and management
    const queries = [
        {
            question: 'How do I repay my loan early?',
            answers: [
                'Contact your bank to discuss early repayment options.',
                'Check if there are any prepayment penalties or fees.',
                'Make a lump sum payment or increase monthly installments to repay early.',
                'Confirm that your loan balance is updated once the payment is made.'
            ]
        },
        {
            question: 'How do I apply for a personal loan?',
            answers: [
                'Log in to your online banking and navigate to "Loan Services".',
                'Fill out the loan application with the required personal and financial details.',
                'Submit proof of income, identification, and other necessary documents.',
                'Wait for the bank’s decision on your loan application.'
            ]
        },
        {
            question: 'What is the interest rate on loans?',
            answers: [
                'Interest rates depend on the type of loan, term length, and your credit score.',
                'Contact your bank or visit the official website for the latest interest rates.',
                'Fixed interest rates remain the same throughout the loan term.',
                'Variable interest rates may fluctuate based on market conditions.'
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
                <h1>Loan Repayment and Management</h1>
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

export default LoanRepayment;
