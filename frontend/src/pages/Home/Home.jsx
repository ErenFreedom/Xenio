import React, { useState, useEffect } from 'react';
import './Home.css';
import { FaSearch } from 'react-icons/fa';
import HomeHeader from '../../components/Header/HomeHeader';
import HomeFooter from '../../components/Footer/HomeFooter';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Home() {
    const navigate = useNavigate(); // Initialize useNavigate

    // Slideshow data: array of images and text
    const slides = [
        { image: '/image2.png', text: 'Innovative Banking Solutions' },
        { image: '/image3.png', text: 'Secure and Trusted' },
        { image: '/image4.png', text: 'Effortless Transactions' },
        { image: '/image5.png', text: 'Next-Generation Payment Systems' },
        { image: '/image6.png', text: 'Personalized Financial Services' },
        { image: '/image7.png', text: 'Banking at Your Fingertips' }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change image and text every 3 seconds
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="home">
            <HomeHeader />
            <div className="home-body">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input type="text" className="search-bar" placeholder="Search..." />
                </div>
                <div className="home-content">
                    {/* Left side content */}
                    <div className="left-text">
                        <h1>Your Money,</h1>
                        <h1>to The Power of <span className="highlight">Xenio</span>.</h1>
                        <p>Discover the reloadable mobile wallet that gives you the best of a debit card, offering discounts on travel, multi-currency features, loyalty rewards, and more.</p>
                        <p>No credit, no interest, no annual fees.</p>
                        {/* Get Early Access Section */}
                        <div className="early-access">
                            <h2>Get Early Access</h2>
                            <button className="button-81" onClick={() => navigate('/signup')}>Register Now</button>
                        </div>
                    </div>

                    {/* Right side content (slideshow) */}
                    <div className="right-content">
                        <div className="image-right">
                            <img src={slides[currentIndex].image} alt="Slideshow" className="right-image" />
                            <p className="slide-text">{slides[currentIndex].text}</p> {/* Text below image */}
                        </div>
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}

export default Home;
