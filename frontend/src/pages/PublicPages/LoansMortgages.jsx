import React, { useState } from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PublicPages.css';

function LoansMortgages() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Check if user is logged in by verifying if a token exists
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    const queries = [
        {
            question: 'How do I apply for a personal loan?',
            answers: [
                'Visit the bank website or nearest branch to start your application.',
                'Fill out the loan application form with accurate details.',
                'Provide necessary documents, including proof of income and identification.',
                'Review the loan terms, interest rates, and repayment period.',
                'Submit the application and wait for the approval process to complete.',
                'Once approved, funds will be disbursed to your account.'
            ]
        },
        {
            question: 'What is the interest rate on loans?',
            answers: [
                'Interest rates vary depending on the type of loan and your credit history.',
                'Fixed rates remain constant throughout the loan term, while variable rates fluctuate.',
                'Contact the bank for specific rates for personal, home, and business loans.',
                'Consider additional fees or charges associated with the loan.',
                'Interest rates may change based on economic conditions and bank policies.',
                'Lower interest rates are often available for shorter loan terms.'
            ]
        },
        {
            question: 'What are the eligibility criteria for a mortgage?',
            answers: [
                'Must be at least 18 years of age and a legal resident.',
                'Provide proof of stable income and employment history.',
                'Good credit score is generally required, though specific scores vary by lender.',
                'Have sufficient funds for a down payment, typically around 10-20%.',
                'Meet the bank’s debt-to-income ratio requirements.',
                'Provide additional documents such as tax returns and bank statements.'
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
                <h1>Loans and Mortgages Information</h1>
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

export default LoansMortgages;
