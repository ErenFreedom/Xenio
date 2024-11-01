import React, { useState } from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PublicPages.css';

function CustomerSupport() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Sample data for the three queries
    const queries = [
        {
            question: 'How do I contact customer service?',
            answers: [
                'You can reach customer service by calling the toll-free number on our website.',
                'Email support is available; check the "Contact Us" section for the address.',
                'Chat support is accessible via the mobile banking app and website.',
                'In-person support is available at any of our bank branches during working hours.',
                'Some banks offer 24/7 support through phone and chat services.',
                'Check the "Help & Support" section in your online banking portal for more options.'
            ]
        },
        {
            question: 'Where can I find my account number/IBAN/SWIFT code?',
            answers: [
                'Your account number is printed on your bank statement and checkbook.',
                'The IBAN and SWIFT code are available in your online banking profile.',
                'You can request this information by visiting a branch with valid identification.',
                'Most bank apps display IBAN and SWIFT codes under account details.',
                'For international transactions, you may need both IBAN and SWIFT codes.',
                'Contact customer service if you have trouble locating these details.'
            ]
        },
        {
            question: 'What are the bank’s working hours?',
            answers: [
                'Most branches are open Monday to Friday from 9:00 AM to 5:00 PM.',
                'Some branches have extended hours on weekends for customer convenience.',
                'Holiday hours may vary; check the website for the latest information.',
                '24/7 services are available through online banking and ATMs.',
                'Customer service hotline is available for extended hours in many regions.',
                'Contact your local branch for specific hours if you need in-person services.'
            ]
        }
    ];

    // Toggle dropdown
    const handleToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="account-opening-page">
            <HomeHeader />
            <div className="content">
                <h1>Customer Support and Contact Information</h1>
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

export default CustomerSupport;
