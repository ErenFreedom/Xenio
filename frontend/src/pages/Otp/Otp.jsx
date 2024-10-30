import React, { useState, useEffect } from 'react';
import './Otp.css';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';

function Otp() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(60);

    // Countdown timer logic
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [timer]);

    // Handle OTP input
    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move focus to the next input box automatically
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const resendOtp = () => {
        setTimer(60); // Reset the timer to 60 seconds
        // Add your resend OTP logic here
        console.log("OTP has been resent");
    };

    return (
        <div className="otp-page">
            <HomeHeader />
            <div className="otp-body">
                <div className="otp-container">
                    <h1 className="otp-heading">A 6-digit OTP has been sent to your registered email</h1>
                    <p className="otp-email">*****.gmail.com</p>
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

                    {/* Resend OTP Button */}
                    <button className="button-81" onClick={resendOtp} disabled={timer > 0}>
                        Resend OTP
                    </button>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}

export default Otp;
