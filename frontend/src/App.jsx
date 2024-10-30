import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing for routing
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Otp from './pages/Otp/Otp'; // Importing OTP page

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp" element={<Otp />} /> {/* Added OTP route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
