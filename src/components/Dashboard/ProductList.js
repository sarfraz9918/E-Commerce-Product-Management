import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';  

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
            } catch (error) {
                console.error('There was an error fetching the products!', error);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (id) => {
        navigate(`/dashboard/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('There was an error deleting the product!', error);
        }
    };

    // Function to calculate average rating
    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    return (
        <div>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id} className="product-list-item">
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
                            <p className="product-rating">Average Rating: {calculateAverageRating(product.reviews)} / 5</p>
                        </div>
                        <div className="product-actions">
                            <button onClick={() => handleEdit(product.id)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
