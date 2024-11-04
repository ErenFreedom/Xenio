import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Otp from './pages/Otp/Otp';
import LoginOtp from './pages/Otp/LoginOtp';
import SignUp from './pages/SignUp/SignUp';
import PublicPageLoader from './pages/PublicPages/PublicPageLoader';
import PrivatePageLoader from './pages/PrivatePages/PrivatePageLoader';
import Dashboard from './pages/Dashboard/Dashboard';
import AboutXenio from './pages/Extras/AboutXenio';
import ContactUs from './pages/Extras/ContactUs';
import HowXenioWorks from './pages/Extras/HowXenioWorks';
import ExclusiveBenefits from './pages/Extras/ExclusiveBenefits';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/login-otp" element={<LoginOtp />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/public/:pageName" element={<PublicPageLoader />} />
                    <Route path="/dashboard/:userId" element={<Dashboard />} />
                    <Route path="/private/:pageName" element={<PrivatePageLoader />} />
                    <Route path="/about" element={<AboutXenio />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/how" element={<HowXenioWorks />} />
                    <Route path="/benefits" element={<ExclusiveBenefits />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
