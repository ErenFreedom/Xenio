import React from 'react';
import './SignUp.css';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

function SignUp() {
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
                        <input type="text" placeholder="First Name" className="signup-input" />
                        <input type="text" placeholder="Last Name" className="signup-input" />
                        <input type="text" placeholder="Username" className="signup-input" />
                        <input type="date" placeholder="Date of Birth" className="signup-input" />
                        <input type="email" placeholder="Email" className="signup-input" />
                        <input type="password" placeholder="Password" className="signup-input" />
                        <button className="button-27">SignUp</button>
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}

export default SignUp;
