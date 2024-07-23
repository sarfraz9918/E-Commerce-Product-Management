import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';  

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="landing-page">
            <div className="landing-container">
                <h1>Welcome to Our E-Commerce Platform</h1>
                <div className="landing-buttons">
                    <button className="btn login-btn" onClick={handleLogin}>Login</button>
                    <button className="btn register-btn" onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
