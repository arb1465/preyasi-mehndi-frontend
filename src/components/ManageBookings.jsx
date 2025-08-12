import React, { useState, useEffect } from 'react';
import './ManageBookings.css'; // We'll create this CSS next
import { Link } from 'react-router-dom';
import BackButton from './BackButton';

const apiUrl = process.env.REACT_APP_API_URL;

function ManageBookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    // --- Fetch all booking requests when the component loads ---
    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('admin_token');
            try {
                const response = await fetch(`${apiUrl}/admin-ak47/bookings`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Failed to fetch bookings.');
                setBookings(result.data);
            } catch (err) {
                setMessage(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, []);

    // --- Handler to delete a booking ---
    const handleDelete = async (bookingId) => {
        if (!window.confirm('Are you sure you want to delete this booking request?')) return;
        
        const token = localStorage.getItem('admin_token');
        try {
            const response = await fetch(`${apiUrl}/admin-ak47/bookings/delete/${bookingId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to delete booking.');
            
            setMessage('Booking deleted successfully!');
            // Update the state to remove the deleted booking from the table instantly
            setBookings(currentBookings => 
                currentBookings.filter(booking => booking._id !== bookingId)
            );
        } catch (err) {
            setMessage(err.message);
        }
    };

    if (isLoading) return <p>Loading booking requests...</p>;

    return (
        <div className="manage-bookings-container">
            
            <Link to="/admin-ak47/dashboard" className="page-title-link">
                <h1 className="page-title">Manage Booking Requests</h1>
            </Link>
            {message && <p className="system-message">{message}</p>}

            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Date of Event</th>
                            <th>Booking Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>{booking.firstName} {booking.lastName}</td>
                                    <td>{booking.phone}</td>
                                    <td>{booking.address1}</td>
                                    <td>{booking.city}</td>
                                    <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                                    <td>{booking.bookingType}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleDelete(booking._id)} 
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>No booking requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <BackButton />
        </div>
    );
}

export default ManageBookings;