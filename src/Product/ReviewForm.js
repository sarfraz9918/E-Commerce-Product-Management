import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ReviewForm.css';

const ReviewForm = ({ existingReview }) => {
    const { id } = useParams();  
    const navigate = useNavigate();
    const [review, setReview] = useState(existingReview ? existingReview.review : '');
    const [rating, setRating] = useState(existingReview ? existingReview.rating : 1);
    const [reviewId, setReviewId] = useState(existingReview ? existingReview.id : null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const productUpdate = reviewId
                ? await axios.patch(`http://localhost:3001/products/${id}`, {
                      $set: {
                          "reviews.$[review].review": review,
                          "reviews.$[review].rating": rating
                      }
                  }, {
                      arrayFilters: [{ "review.id": reviewId }]
                  })
                : await axios.patch(`http://localhost:3001/products/${id}`, {
                      $push: {
                          reviews: {
                              review,
                              rating,
                              userId: JSON.parse(localStorage.getItem('user')).id,
                              id: Date.now()
                          }
                      }
                  });
            navigate(`/products/${id}`);
        } catch (error) {
            console.error('There was an error submitting the review!', error);
        }
    };

    return (
        <div className="review-form">
            <h2>{reviewId ? 'Edit Review' : 'Leave a Review'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        min="1"
                        max="5"
                        required
                    />
                </label>
                <label>
                    Review:
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">{reviewId ? 'Update Review' : 'Submit Review'}</button>
            </form>
        </div>
    );
};

export default ReviewForm;
