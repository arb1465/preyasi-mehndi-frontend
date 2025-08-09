// src/components/ManageReviewsPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageReviews.css';
import BackButton from './BackButton';


const apiUrl = process.env.REACT_APP_API_URL;

function ManageReviewsPage() {
    const [pendingReviews, setPendingReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState(''); 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null); // The review we are working on
    const [galleryCategory, setGalleryCategory] = useState('all'); // Default category

    // Reusable function to fetch pending reviews from the backend
    const fetchPendingReviews = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin-ak47/login');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/admin-ak47/manage-reviews/pending`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 401) navigate('/admin-ak47/login'); // Token is invalid or expired
            if (!response.ok) throw new Error('Failed to fetch reviews.');
            
            const data = await response.json();
            setPendingReviews(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // This effect runs only once when the component is first loaded
    useEffect(() => {
        fetchPendingReviews();
    }, [fetchPendingReviews]);

    // Function to handle the approval process
    const handleApprove = async (reviewId, hasPhoto) => {
        const token = localStorage.getItem('admin_token');

        try {
            const response = await fetch(`${apiUrl}/admin-ak47/manage-reviews/approve/${reviewId}`, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({})
            });
            
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            
            setMessage('Review approved successfully!');
            setPendingReviews(reviews => reviews.filter(r => r._id !== reviewId));
        } 
        catch (err) {
            setMessage(err.message);
        }
    };
    
    
    // Function to handle deleting a review
    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to permanently delete this review? This cannot be undone.")) {
            return;
        }
        const token = localStorage.getItem('admin_token');
        try {
            const response = await fetch(`${apiUrl}/admin-ak47/manage-reviews/${reviewId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Failed to delete the review.");

            alert("Review deleted successfully.");
            fetchPendingReviews();
        } 
        catch (err) { 
            console.error("Failed to delete review:", err);
            console.log(err)
            alert("Error: " + err.message);
        }
    };

    
    const openAddToGalleryModal = (review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };
    
    const handleAddToGallerySubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('admin_token');
        try {
            const response = await fetch(`${apiUrl}/admin-ak47/gallery/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    imageUrl: selectedReview.photo,
                    category: galleryCategory,
                    altText: `A mehendi design from a review by ${selectedReview.firstName}`
                })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);

            setMessage('Image successfully added to gallery!');
            setIsModalOpen(false); // Close the modal on success
        } 
        catch (err) {
            setMessage(err.message);
        }
    };

    if (isLoading) return <div className="loading-container"><p>Loading pending reviews...</p></div>;
    if (error) return <div className="loading-container"><p>Error: {error}</p></div>;

    return (
        <div className="manage-reviews-container">
            <h1 className="page-title">Manage Pending Reviews</h1>
            {message && <p className="system-message">{message}</p>}

            <div className="reviews-list">
                {pendingReviews.length === 0 ? (
                    <p>No pending reviews found.</p>
                ) : (
                    pendingReviews.map(review => (
                        <div key={review._id} className="review-card">
                            <div className="review-info">
                                <p><strong>Name:</strong> {review.firstName} {review.lastName}</p>
                                <p><strong>City:</strong> {review.city}</p>
                                <p><strong>Date:</strong> {new Date(review.submittedAt).toLocaleDateString()}</p>
                            </div>
                            <img src={review.photo} alt="User review submission" className="review-photo" />
                            <div className="review-text-box">
                                <p>"{review.reviewText}"</p>
                            </div>
                            <div className="review-actions">
                                <button onClick={() => handleApprove(review._id)} className="btn-approve">Approve</button>
                                <button onClick={() => openAddToGalleryModal(review)} className="btn-gallery">Add to Gallery</button>
                                <button onClick={() => handleDelete(review._id)} className="btn-delete">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* --- THE "ADD TO GALLERY" MODAL --- */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add to Gallery</h2>
                        <img src={selectedReview.photo} alt="Selected for gallery" className="modal-photo-preview" />
                        <form onSubmit={handleAddToGallerySubmit}>
                            <div className="form-group">
                                <label htmlFor="category">Select Category:</label>
                                <select id="category" value={galleryCategory} onChange={e => setGalleryCategory(e.target.value)}>
                                    <option value="hand">All</option>
                                    <option value="hand">Hand</option>
                                    <option value="feet">Feet</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="btn-approve">Save to Gallery</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-delete">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <BackButton />
        </div>
    );
}

export default ManageReviewsPage;