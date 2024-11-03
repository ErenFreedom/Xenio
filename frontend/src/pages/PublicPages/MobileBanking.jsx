import React, { useState } from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './PublicPages.css';

function MobileBanking() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Check if user is logged in by verifying if a token exists
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    const queries = [
        {
            question: 'How do I register for online banking?',
            answers: [
                'Visit the bank’s website and navigate to the online banking registration page.',
                'Complete the registration form with your account details and personal information.',
                'Create a secure username and password for accessing your online banking.',
                'Verify your identity with a one-time password (OTP) sent to your registered mobile.',
                'After completing the registration, you will be able to log in to online banking.'
            ]
        },
        {
            question: 'How do I download the mobile banking app?',
            answers: [
                'Go to the App Store (iOS) or Google Play Store (Android) on your smartphone.',
                'Search for the bank’s official mobile banking app by name.',
                'Ensure that the app is developed by the official bank to avoid scams.',
                'Download and install the app on your device.',
                'Open the app and log in with your online banking credentials or register if you are a new user.'
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
                <h1>Mobile and Online Banking Registration</h1>
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

export default MobileBanking;
