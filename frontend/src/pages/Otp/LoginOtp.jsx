// src/pages/LoginOtp/LoginOtp.jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import
import './Otp.css';
import DashboardHeader from '../../components/Header/DashboardHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginOtp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(120);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [timer]);

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const verifyOtp = async () => {
        const otpCode = otp.join('');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: localStorage.getItem('userEmail'), otp: otpCode }), // Use email from localStorage
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Login successful! Redirecting to your dashboard.");

                // Save JWT token and decode it
                const token = result.token;
                localStorage.setItem('jwtToken', token);

                // Decode the token to get userId
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;

                // Redirect to dashboard with userId
                setTimeout(() => {
                    navigate(`/dashboard/${userId}`);
                }, 2000);
            } else {
                toast.error(result.message || 'OTP verification failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error during OTP verification. Please try again.');
        }
    };

    const resendOtp = () => {
        setTimer(120); // Reset the timer to 2 minutes
        console.log("OTP has been resent");
        // Add resend OTP logic here
    };

    return (
        <div className="otp-page">
            <DashboardHeader />
            <div className="otp-body">
                <div className="otp-container">
                    <h1 className="otp-heading">Enter the 6-digit OTP sent to your registered email</h1>
                    <div className="otp-inputs">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={(e) => handleOtpChange(e.target, index)}
                                className="otp-box"
                            />
                        ))}
                    </div>
                    <p className="otp-timer">OTP expires in: {timer}s</p>

                    <button className="button-81" onClick={verifyOtp} disabled={timer <= 0}>
                        Verify OTP
                    </button>

                    <button className="button-81" onClick={resendOtp} disabled={timer > 0}>
                        Resend OTP
                    </button>
                </div>
            </div>
            <ToastContainer />
            <HomeFooter />
        </div>
    );
}

export default LoginOtp;
