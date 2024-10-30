import React from 'react';
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa'; // Importing social icons
import './HomeFooter.css';

function HomeFooter() {
    return (
        <footer className="home-footer">
            <p>© 2024 X Inc. All rights reserved.</p>
            <div className="social-icons">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="icon" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="icon" />
                </a>
                <a href="mailto:support@xenio.com">
                    <FaEnvelope className="icon" />
                </a>
            </div>
        </footer>
    );
}

export default HomeFooter;
