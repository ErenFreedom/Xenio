import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Added Link for navigation and useLocation for conditionally rendering
import './HomeHeader.css';

function HomeHeader() {
    const location = useLocation(); // Get the current location

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
                {location.pathname === '/login' || location.pathname === '/otp' ? (
                    <Link to="/">
                        <button className="button-81">Home</button>
                    </Link>
                ) : (
                    <Link to="/login">
                        <button className="button-81">Login</button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default HomeHeader;
