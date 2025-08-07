import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reviews.css'; // Assuming you have this CSS file

const apiUrl = process.env.REACT_APP_API_URL;

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApprovedReviews = async () => {
            try {
                const response = await fetch(`${apiUrl}/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews.');
                }
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
        <section id="reviews" className="reviews-section section-bg">
            <div className="container">
                <h2 className="reviews-heading">Reviews</h2>

                {isLoading ? (
                    <p>Loading Reviews...</p>
                ) : (
                    <div className="row">
                        {reviews.length > 0 ? (
                            // --- THIS IS THE KEY ---
                            // We use .slice(0, 4) to create a new array containing only the first 4 items.
                            // We then map over this shorter array.
                            reviews.slice(0, 4).map(review => (
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
                            <p>No reviews yet. Be the first to add one!</p>
                        )}
                    </div>
                )}

                <div className="review-nav-container">
                    <div className="review-nav-buttons">
                        {/* This button links to our new "All Reviews" page */}
                        <Link to="/all-reviews" className="btn-review-nav" id="see-all-reviews">
                            See All Reviews
                        </Link>
                        <Link to="/reviews" className="btn-review-nav" id="add-your-review">
                            Add your Review
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reviews;