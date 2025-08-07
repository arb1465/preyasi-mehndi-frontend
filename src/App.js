import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // The component we just created
import ScrollToTop from './components/ScrollTop';

import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import ManageReviewsPage from './components/ManageReviews';
import ManageBookings from './components/ManageBookings';
import AddGalleryImage from './components/AddGalleryImage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GalleryPage from './components/GalleryPage'; // The gallery page we planned
import AddReviewPage from './components/AddReview';
import BookingPage from './components/BookingPage'
import AllReviews from './components/AllReviews';

import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="App" style={{ backgroundColor: "rgb(255, 201, 167)", minHeight: "100vh" }}>
        
        <Navbar /> 

        <Routes>
          <Route path="/admin-ak47" element={<LoginPage />} />
          
          <Route path="/admin-ak47/dashboard" element={<AdminDashboard />} />

          <Route path="/admin-ak47/manage-reviews" element={<ManageReviewsPage />} />

          <Route path="/admin-ak47/manage-bookings" element={<ManageBookings />} />

          <Route path="/admin-ak47/add-gallery-image" element={<AddGalleryImage />} />

          <Route path="/" element={<HomePage />} />

          <Route path="/booking" element={<BookingPage />} />
          
          <Route path="/gallery" element={<GalleryPage />} />

          <Route path="/reviews" element={<AddReviewPage />} />

          <Route path="/all-reviews" element={<AllReviews />} />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;