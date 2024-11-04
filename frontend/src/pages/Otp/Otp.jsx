import React, { useState, useEffect } from 'react';
import './Otp.css';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Otp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(120);

    // Retrieve the email from local storage (set during registration)
    const email = localStorage.getItem('registrationEmail');

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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otpCode }), // Dynamically use email from local storage
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Registration successful! You can now login.");
                
                // Clear the email from local storage after successful registration
                localStorage.removeItem('registrationEmail');
                
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error(result.message || 'OTP verification failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error during OTP verification. Please try again.');
        }
    };

    const resendOtp = async () => {
        setTimer(120); // Reset the timer to 2 minutes

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }), // Use email from local storage
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("OTP has been resent. Please check your email.");
            } else {
                toast.error(result.message || 'Failed to resend OTP');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error during OTP resend. Please try again.');
        }
    };

    return (
        <div className="otp-page">
            <HomeHeader />
            <div className="otp-body">
                <div className="otp-container">
                    <h1 className="otp-heading">A 6-digit OTP has been sent to your registered email</h1>
                    <p className="otp-email">{email ? email.replace(/(.{2})(.*)(?=@)/, "$1****") : 'Not available'}</p> {/* Mask email for privacy */}
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

export default Otp;
