// src/pages/Extras/AboutXenio.jsx
import React from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './Extras.css';

function AboutXenio() {
    return (
        <div className="extras-page">
            <HomeHeader />
            <div className="extras-content">
                <h2 className="extras-title">About Xenio</h2>
                <p className="extras-point">1. Xenio is a digital banking solution offering seamless transactions.</p>
                <p className="extras-point">2. Our platform is built with security and reliability in mind.</p>
                <p className="extras-point">3. Users can manage finances with ease through our app.</p>
                <p className="extras-point">4. Our team is dedicated to providing exceptional customer support.</p>
                <p className="extras-point">5. We focus on innovative features that enhance financial control.</p>
            </div>
            <HomeFooter />
        </div>
    );
}

export default AboutXenio;
