// src/components/Header/HomeHeader.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './HomeHeader.css';

function HomeHeader() {
    const location = useLocation();

    return (
        <header className="home-header">
            <div className="header-left">
                <Link to="/">
                    <img src="/logo.png" alt="Xenio Logo" className="logo" />
                </Link>
            </div>
            <div className="header-center">
                <nav className="header-nav">
                    <Link to="/about" className="header-nav-link">About Xenio</Link>
                    <Link to="/contact" className="header-nav-link">Contact Us</Link>
                    <Link to="/how" className="header-nav-link">How Xenio Works</Link>
                    <Link to="/benefits" className="header-nav-link">Exclusive Benefits</Link>
                </nav>
            </div>
            <div className="header-right">
                {location.pathname === '/login' || location.pathname === '/otp' || location.pathname === '/signup' || location.pathname === '/login-otp' ? (
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
