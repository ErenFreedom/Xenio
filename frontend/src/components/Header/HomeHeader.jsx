import React from 'react';
import './HomeHeader.css';

function HomeHeader() {
    return (
        <header className="home-header">
            <div className="header-left">
                <img src="/logo.png" alt="Xenio Logo" className="logo" />
            </div>
            <div className="header-center">
                <nav className="header-nav">
                    <a href="#about">About Xenio</a>
                    <a href="#contact">Contact Us</a>
                    <a href="#how">How Xenio Works</a>
                    <a href="#benefits">Exclusive Benefits</a>
                </nav>
            </div>
            <div className="header-right">
                <button className="button-81">Login</button> {/* Removed redundant role */}
            </div>
        </header>
    );
}

export default HomeHeader;
