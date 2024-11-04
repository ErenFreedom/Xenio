// src/pages/Extras/HowXenioWorks.jsx
import React from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './Extras.css';

function HowXenioWorks() {
    return (
        <div className="extras-page">
            <HomeHeader />
            <div className="extras-content">
                <h2 className="extras-title">How Xenio Works</h2>
                <p className="extras-point">1. Users sign up and verify their accounts for secure access.</p>
                <p className="extras-point">2. Our platform offers a seamless login experience.</p>
                <p className="extras-point">3. Transfer funds instantly with real-time notifications.</p>
                <p className="extras-point">4. Track expenses and savings goals through intuitive dashboards.</p>
                <p className="extras-point">5. Enjoy exclusive benefits and rewards with Xenio's loyalty program.</p>
            </div>
            <HomeFooter />
        </div>
    );
}

export default HowXenioWorks;
