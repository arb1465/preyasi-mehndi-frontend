// src/components/AdminDashboard.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

const apiUrl = process.env.REACT_APP_API_URL;

function AdminDashboard() {
    // State to hold the counts from our backend
    const [reviewCount, setReviewCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);

    const navigate = useNavigate();
    const handleLogout = useCallback(() => {
        localStorage.removeItem('admin_token');
        navigate('/admin-ak47');
    }, [navigate]); // The dependency is navigate

    useEffect(() => {
        const token = localStorage.getItem('admin_token');

        const fetchData = async () => {
            const headers = { 'Authorization': `Bearer ${token}` };
            try {
                // Use the apiUrl variable
                const reviewsResponse = await fetch(`${apiUrl}/admin-ak47/reviews/pending/count`, { headers });
                const reviewsData = await reviewsResponse.json();
                if (reviewsResponse.ok) setReviewCount(reviewsData.count);

                // Use the apiUrl variable
                const bookingsResponse = await fetch(`${apiUrl}/admin-ak47/bookings/count`, { headers });
                const bookingsData = await bookingsResponse.json();
                if (bookingsResponse.ok) setBookingCount(bookingsData.count);

            } 
            catch (error) {
                console.error("Error fetching dashboard data:", error);
                // Call the stable handleLogout function
                handleLogout(); 
            }
        };

        if (token) {
            fetchData();
        } else {
            console.log("No token found, redirecting to login.");
            navigate('/admin-ak47');
        }
        // 3. Add handleLogout to the dependency array
    }, [navigate, handleLogout]); 


    return (
        <div className="admin-dashboard-container section-bg">
            <div className="admin-header">
                <button onClick={handleLogout} className="btn-logout">Log Out</button>
            </div>
            
            <div className="container">
                <div className="dashboard-header-text">
                    <h1 className="main-title">Preyasi Mehndi Art Gallery</h1>
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