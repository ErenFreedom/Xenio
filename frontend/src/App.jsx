import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Otp from './pages/Otp/Otp';
import SignUp from './pages/SignUp/SignUp';
import PublicPageLoader from './pages/PublicPages/PublicPageLoader'; // Import the dynamic loader

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/public/:pageName" element={<PublicPageLoader />} /> {/* Dynamic route for public pages */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
