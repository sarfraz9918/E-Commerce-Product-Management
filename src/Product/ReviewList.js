import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products/${productId}`);
                setReviews(response.data.reviews || []);
            } catch (error) {
                console.error('Failed to fetch reviews', error);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleEdit = (review) => {
        navigate(`/products/${productId}/reviews/edit/${review.id}`);
    };

    return (
        <div>
            <h3>Reviews</h3>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <p>{review.review}</p>
                        <p>Rating: {review.rating}</p>
                        <button onClick={() => handleEdit(review)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
