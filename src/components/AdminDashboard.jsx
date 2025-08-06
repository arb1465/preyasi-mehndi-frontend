// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

const apiUrl = process.env.REACT_APP_API_URL;

function AdminDashboard() {
    // State to hold the counts from our backend
    const [reviewCount, setReviewCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);

    const navigate = useNavigate();

    // This effect runs once when the component loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the count of pending reviews
                const reviewsResponse = await fetch(`${apiUrl}/reviews/pending/count`);
                const reviewsData = await reviewsResponse.json();
                if (reviewsResponse.ok) setReviewCount(reviewsData.count);

                // Fetch the count of booking requests
                const bookingsResponse = await fetch(`${apiUrl}/bookings/count`);
                const bookingsData = await bookingsResponse.json();
                if (bookingsResponse.ok) setBookingCount(bookingsData.count);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('admin_token');
        // Redirect to the login page
        navigate('/');
    };

    return (
        <div className="admin-dashboard-container section-bg">
            <div className="admin-header">
                <button onClick={handleLogout} className="btn-logout">Log Out</button>
            </div>
            
            <div className="container">
                <div className="dashboard-header-text">
                    <h1 className="main-title">Preyasi Mehendi Art Gallery</h1>
                    <h2 className="sub-title">Admin Dashboard</h2>
                </div>

                <div className="dashboard-nav-buttons">
                    {/* These will be links to the management pages we build next */}
                    <Link to="/admin-ak47/manage-reviews" className="nav-button">
                        Reviews <span className="count-badge">{reviewCount}</span>
                    </Link>
                    <Link to="/admin-ak47/manage-bookings" className="nav-button">
                        Booking Req <span className="count-badge">{bookingCount}</span>
                    </Link>
                    <Link to="/admin-ak47/add-gallery-image" className="nav-button">
                        Add Gallery Image
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;