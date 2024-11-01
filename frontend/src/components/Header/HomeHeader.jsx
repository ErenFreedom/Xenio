// src/components/Header/HomeHeader.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './HomeHeader.css';

function HomeHeader() {
    const location = useLocation();

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
