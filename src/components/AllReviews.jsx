import React, { useState, useEffect } from 'react';
import './AllReviews.css'; // You can create a CSS file for this page

const apiUrl = process.env.REACT_APP_API_URL;

function AllReviews() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApprovedReviews = async () => {
            try {
                // It calls the exact same backend endpoint!
                const response = await fetch(`${apiUrl}/reviews`);
                if (!response.ok) throw new Error('Failed to fetch reviews.');
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApprovedReviews();
    }, []);

    return (
        <div className="all-reviews-container section-bg">
            <div className="container">
                <h1 className="all-reviews-title">All Customer Reviews</h1>
                
                {isLoading ? (
                    <p>Loading Reviews...</p>
                ) : (
                    <div className="reviews-grid">
                      <div className="row">
                         {reviews.length > 0 ? (
                            // Here, we map over the FULL array of reviews
                            reviews.map(review => (
                                // We can use a different card style for this page if we want
                                <div className="col-lg-3 col-md-6 mb-4" key={review._id}>
                                    <div className="review-card">
                                        <div className="review-avatar">
                                            {review.firstName.charAt(0)}
                                        </div>
                                        <h5 className="reviewer-name">{review.firstName} {review.lastName}</h5>
                                        <p className="review-text">"{review.reviewText}"</p>
                                        <div className="quote-icon">“</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews have been submitted yet.</p>
                        )}
                      </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllReviews;