// src/pages/Extras/ExclusiveBenefits.jsx
import React from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './Extras.css';

function ExclusiveBenefits() {
    return (
        <div className="extras-page">
            <HomeHeader />
            <div className="extras-content">
                <h2 className="extras-title">Exclusive Benefits</h2>
                <p className="extras-point">1. Earn cashback on every transaction made through Xenio.</p>
                <p className="extras-point">2. Get access to discounted loan interest rates.</p>
                <p className="extras-point">3. Enjoy priority customer support as a premium member.</p>
                <p className="extras-point">4. Receive early access to new features and updates.</p>
                <p className="extras-point">5. Join our referral program to earn rewards.</p>
            </div>
            <HomeFooter />
        </div>
    );
}

export default ExclusiveBenefits;
