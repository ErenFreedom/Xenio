// src/pages/Extras/ContactUs.jsx
import React from 'react';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './Extras.css';

function ContactUs() {
    return (
        <div className="extras-page">
            <HomeHeader />
            <div className="extras-content">
                <h2 className="extras-title">Contact Us</h2>
                <p className="extras-point">1. Email: support@xenio.com</p>
                <p className="extras-point">2. Phone: +1 (800) 123-4567</p>
                <p className="extras-point">3. Address: 123 Xenio St., Suite 100, Fintech City</p>
                <p className="extras-point">4. Social Media: Follow us on Twitter, Instagram, and Facebook.</p>
                <p className="extras-point">5. Our support team is available 24/7 to assist you.</p>
            </div>
            <HomeFooter />
        </div>
    );
}

export default ContactUs;
