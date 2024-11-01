// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Otp from './pages/Otp/Otp';
import LoginOtp from './pages/Otp/LoginOtp'; // Import for Login OTP
import SignUp from './pages/SignUp/SignUp';
import PublicPageLoader from './pages/PublicPages/PublicPageLoader'; // Dynamic loader for public pages
import PrivatePageLoader from './pages/PrivatePages/PrivatePageLoader'; // Dynamic loader for private pages
import Dashboard from './pages/Dashboard/Dashboard'; // Import the Dashboard component

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/login-otp" element={<LoginOtp />} /> {/* Route for login OTP verification */}
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/public/:pageName" element={<PublicPageLoader />} /> {/* Dynamic route for public pages */}
                    <Route path="/dashboard/:userId" element={<Dashboard />} /> {/* Dynamic route for the dashboard */}
                    <Route path="/private/:pageName" element={<PrivatePageLoader />} /> {/* Dynamic route for private pages */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
