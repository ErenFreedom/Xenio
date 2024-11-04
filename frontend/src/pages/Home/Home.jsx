import React, { useState, useEffect } from 'react';
import './Home.css';
import { FaSearch } from 'react-icons/fa';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        { image: '/image2.png', text: 'Innovative Banking Solutions' },
        { image: '/image3.png', text: 'Secure and Trusted' },
        { image: '/image4.png', text: 'Effortless Transactions' },
        { image: '/image5.png', text: 'Next-Generation Payment Systems' },
        { image: '/image6.png', text: 'Personalized Financial Services' },
        { image: '/image7.png', text: 'Banking at Your Fingertips' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const publicPageRoutes = {
        'How do I open a new bank account?': 'account-opening',
        'What documents are required for account verification?': 'account-opening',
        'What is the interest rate on loans?': 'loans-mortgages',
        'How do I apply for a personal loan?': 'loans-mortgages',
        'What are the eligibility criteria for a mortgage?': 'loans-mortgages',
        'What are the fees for international transfers?': 'international-transfers',
        'What is the current interest rate on savings accounts?': 'savings-fixed-deposit',
        'How do I open a fixed deposit account?': 'savings-fixed-deposit',
        'How is interest calculated on savings accounts?': 'savings-fixed-deposit',
        'How do I register for online banking?': 'mobile-banking',
        'How do I download the mobile banking app?': 'mobile-banking',
        'Where is the nearest bank branch or ATM?': 'atm-branch-locator',
        'How do I withdraw cash without a card from an ATM?': 'atm-branch-locator',
        'What is the maximum amount I can withdraw from an ATM?': 'atm-branch-locator',
        'Can I deposit checks using an ATM?': 'atm-branch-locator',
        'What are the bank’s working hours?': 'customer-support',
        'How do I contact customer service?': 'customer-support',
        'Where can I find my account number/IBAN/SWIFT code?': 'customer-support',
        'How do I apply for a new service or product?': 'account-opening'
    };

    const privatePageRoutes = {
        'How do I close my account?': 'account-management',
        'How do I update my personal details?': 'account-management',
        'I forgot my username/password. How can I recover it?': 'authentication-security',
        'How do I reset my online banking password?': 'authentication-security',
        'What should I do if my account is locked?': 'authentication-security',
        'How can I enable two-factor authentication (2FA)?': 'authentication-security',
        'Why hasn’t my transfer gone through?': 'transactions-transfer',
        'How can I track my transaction history?': 'transactions-transfer',
        'I made a transfer to the wrong account. Can I reverse it?': 'transactions-transfer',
        'What are the daily transfer limits?': 'transactions-transfer',
        'How do I activate my new credit/debit card?': 'card-management',
        'What should I do if my card is lost/stolen?': 'card-management',
        'How do I request a credit limit increase?': 'card-management',
        'How can I block or unblock my card?': 'card-management',
        'How do I repay my loan early?': 'loan-repayment',
        'Why did my payment fail?': 'transactions-transfer',
        'How do I set up auto-payments for my bills?': 'payments-recurring',
        'How can I check the status of a scheduled payment?': 'transactions-transfer',
        'How can I stop or modify a recurring payment?': 'payments-recurring',
        'I suspect fraudulent activity on my account. What should I do?': 'fraud-dispute-resolution',
        'How do I dispute a transaction?': 'fraud-dispute-resolution',
        'What happens after I report a fraudulent transaction?': 'fraud-dispute-resolution',
        'Why was I charged a fee on my account?': 'fee-management',
        'How do I avoid monthly maintenance fees?': 'fee-management',
        'How do I protect myself from online banking fraud?': 'fraud-dispute-resolution',
        'Can I get a refund for an overdraft fee?': 'fee-management',
        'Can I withdraw money from my savings account before maturity?': 'savings-transaction-limits',
        'How can I change my transaction limits in the mobile app?': 'savings-transaction-limits',
        'How can I check my account balance online?': 'transactions-transfer'
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/query/predict`, { text: searchQuery });
            const { predicted_category, requires_login } = response.data;

            if (requires_login) {
                const pageRoute = privatePageRoutes[predicted_category];
                if (pageRoute) {
                    toast.info("Login is required to access this page.");
                    setTimeout(() => navigate('/login'), 3000); // Redirect to login after showing toast
                } else {
                    toast.error("Private page not found for this query.");
                }
            } else {
                const pageRoute = publicPageRoutes[predicted_category];
                if (pageRoute) {
                    navigate(`/public/${pageRoute}`);
                } else {
                    toast.error("Public page not found for this query.");
                }
            }
        } catch (error) {
            console.error("Error handling search:", error);
            toast.error("Please Login First");
            setTimeout(() => navigate('/login'), 3000); // Redirect to login on error
        }
    };

    return (
        <div className="home">
            <ToastContainer />
            <HomeHeader />
            <div className="home-body">
                <div className="search-container">
                    <FaSearch className="search-icon" onClick={handleSearch} />
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <div className="home-content">
                    <div className="left-text">
                        <h1>Your Money,</h1>
                        <h1>to The Power of <span className="highlight">Xenio</span>.</h1>
                        <p>Discover the reloadable mobile wallet that gives you the best of a debit card,</p>
                        <p>offering discounts on travel, multi currency features, loyality rewards, and more.</p>
                        <p>No credit, no interest, no annual fee.</p>
                        <div className="early-access">
                            <h2>Get Early Access</h2>
                            <button className="button-81" onClick={() => navigate('/signup')}>Register Now</button>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="image-right">
                            <img src={slides[currentIndex].image} alt="Slideshow" className="right-image" />
                            <p className="slide-text">{slides[currentIndex].text}</p>
                        </div>
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}

export default Home;
