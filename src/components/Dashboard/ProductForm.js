import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/products/${id}`);
                    const product = response.data;
                    setName(product.name);
                    setPrice(product.price);
                    setDescription(product.description);
                } catch (error) {
                    console.error('Failed to fetch product', error);
                }
            };

            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, price, description, userId: JSON.parse(localStorage.getItem('user')).id };

        try {
            if (id) {
                await axios.put(`http://localhost:3001/products/${id}`, productData);
            } else {
                await axios.post('http://localhost:3001/products', productData);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to save product', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">{id ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default ProductForm;
