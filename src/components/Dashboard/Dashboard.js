import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('authToken'); 
        
        
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <nav className="dashboard-nav">
                <Link to="/dashboard">Product List</Link>
                <Link to="/dashboard/add">Add Product</Link>
            </nav>
            <div className="dashboard-content">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add" element={<ProductForm />} />
                    <Route path="/edit/:id" element={<ProductForm />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
