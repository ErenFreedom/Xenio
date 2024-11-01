// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login/initiate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailOrUsername, password }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Login successful, please verify your OTP.");
                // Save email or username in localStorage for OTP verification
                localStorage.setItem('userEmail', emailOrUsername);

                // Redirect to OTP page for login verification
                setTimeout(() => {
                    navigate('/login-otp');
                }, 2000);
            } else {
                toast.error(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error during login. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <HomeHeader />
            <div className="login-body">
                <div className="login-left">
                    <h1 className="welcome-text">Welcome Back!</h1>
                    <p className="login-description">
                        To keep connected with us, please login with your current account.
                    </p>
                </div>

                <div className="login-right">
                    <div className="login-form">
                        <h1 className="login-heading">Login</h1>

                        <div className="social-login">
                            <FaFacebook className="social-icon" />
                            <FaGoogle className="social-icon" />
                            <FaTwitter className="social-icon" />
                        </div>

                        <div className="separator">or</div>

                        <input
                            type="text"
                            className="login-input"
                            placeholder="Email/Username"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="button-27" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <HomeFooter />
        </div>
    );
}

export default Login;
