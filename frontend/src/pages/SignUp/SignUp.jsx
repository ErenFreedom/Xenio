import React, { useState } from 'react';
import './SignUp.css';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        dob: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Signup successful! Please complete the OTP process.");

                // Store email in local storage for OTP verification
                localStorage.setItem('registrationEmail', formData.email);

                // Delay navigation to give time for the toast to show
                setTimeout(() => {
                    navigate('/otp');
                }, 2000);
            } else {
                toast.error(result.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error during signup. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <HomeHeader />
            <div className="signup-body">
                <div className="signup-left">
                    <h1 className="already-signed-in">Already signed in?</h1>
                    <Link to="/login">
                        <button className="button-81">Login</button>
                    </Link>
                </div>
                <div className="signup-right">
                    <div className="signup-form">
                        <h2 className="signup-heading">SignUp Today</h2>
                        <div className="social-signup">
                            <FaFacebook className="social-icon" />
                            <FaGoogle className="social-icon" />
                            <FaTwitter className="social-icon" />
                        </div>
                        <p className="separator">or</p>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            className="signup-input"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            className="signup-input"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            className="signup-input"
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            name="dob"
                            className="signup-input"
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="signup-input"
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="signup-input"
                            onChange={handleInputChange}
                        />
                        <button className="button-27" onClick={handleSignUp}>SignUp</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <HomeFooter />
        </div>
    );
}

export default SignUp;
