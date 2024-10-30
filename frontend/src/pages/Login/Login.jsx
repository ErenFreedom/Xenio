import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa'; // Importing social media icons
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import './Login.css';

function Login() {
    return (
        <div className="login-page">
            <HomeHeader />
            <div className="login-body">
                {/* Left Black Side */}
                <div className="login-left">
                    <h1 className="welcome-text">Welcome Back!</h1>
                    <p className="login-description">
                        To keep connected with us, please login with your current account.
                    </p>
                </div>

                {/* Right White Side */}
                <div className="login-right">
                    <div className="login-form">
                        <h1 className="login-heading">Login</h1>

                        {/* Social media login options */}
                        <div className="social-login">
                            <FaFacebook className="social-icon" />
                            <FaGoogle className="social-icon" />
                            <FaTwitter className="social-icon" />
                        </div>

                        {/* "or" separator */}
                        <div className="separator">or</div>

                        {/* Login form inputs */}
                        <input type="text" className="login-input" placeholder="Email/Username" />
                        <input type="password" className="login-input" placeholder="Password" />

                        {/* Login button */}
                        <button className="button-27">Login</button>
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}

export default Login;
