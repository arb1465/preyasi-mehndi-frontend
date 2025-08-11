
import React, { useState } from 'react';
import './BookingPage.css';

const apiUrl = process.env.REACT_APP_API_URL;

const bookingTypes = [
    'Bridal Mehndi',
    'Engagement Mehndi',
    'Kanku-Pagla Mehndi',
    'Floral Mehndi',
    'Traditional Mehndi',
    'Baby Shower Mehndi',
    'Festival Mehndi',
    'Other'
];

function BookingPage() {
    const [bookingData, setBookingData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        pincode: '',
        city: '',
        eventDate: '',
        bookingType: bookingTypes[0] // Default to the first option
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("\n--- New Booking Request ---");
        alert("Thank you for your request! We will get back to you shortly.");
        
        setIsSubmitting(true);
        setSubmitMessage('');
        
        try {
            const response = await fetch(`${apiUrl}/booking/submit-req`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Tell the server we're sending JSON
                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong while submitting.');
            }

            setSubmitMessage("Request submitted successfully! We'll be in touch.");
        
            setBookingData({ firstName: '', lastName: '', email: '', phone: '', address1: '', address2: '', eventDate: '', pincode: '', city: '', bookingType: bookingTypes[0]});
            e.target.reset();
        }
        catch (error) {
            setSubmitMessage(error.message);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="booking" className="booking-page-container">
                <div className="container">
                    <div className="booking-form-header">
                        <h1 className="booking-main-title">Preyasi Mehndi</h1>
                        <h2 className="booking-sub-title">Request to book</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="booking-form">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" id="firstName" name="firstName" className="form-control" onChange={handleChange} value={bookingData.firstName} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" id="lastName" name="lastName" className="form-control" onChange={handleChange} value={bookingData.lastName} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" id="email" name="email" className="form-control" onChange={handleChange} value={bookingData.email} />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="tel" id="phone" name="phone" className="form-control" onChange={handleChange} value={bookingData.phone} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="address1" className="form-label">Address Line 1</label>
                                <input type="text" id="address1" name="address1" className="form-control" onChange={handleChange} value={bookingData.address1} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="address2" className="form-label">Address Line 2</label>
                                <input type="text" id="address2" name="address2" className="form-control" onChange={handleChange} value={bookingData.address2} />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" id="city" name="city" className="form-control" onChange={handleChange} value={bookingData.city} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="pincode" className="form-label">Pincode</label>
                                <input type="text" id="pincode" name="pincode" className="form-control" onChange={handleChange} value={bookingData.pincode} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="eventDate" className="form-label">Date of <b>Event Only</b></label>
                                <input type="date" id="eventDate" name="eventDate" className="form-control" onChange={handleChange} value={bookingData.eventDate} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="bookingType" className="form-label">Type of Booking</label>
                                <select id="bookingType" name="bookingType" className="form-control" onChange={handleChange} value={bookingData.bookingType} required>
                                    {
                                        bookingTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="col-12 text-center mt-3">
                                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                                </div>
                                    {
                                        submitMessage && (
                                            <div className="col-12 text-center mt-3">
                                                <p className="submit-message">{submitMessage}</p>
                                            </div>
                                        )
                                    }
                            </div>
                    </form>
                </div>
        </section>
    );
}

export default BookingPage;