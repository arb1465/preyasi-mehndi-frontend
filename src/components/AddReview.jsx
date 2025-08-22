import React, { useState } from 'react';
import './AddReview.css'; // We will create this next

const apiUrl = process.env.REACT_APP_API_URL;

function AddReviewPage() {
  // A single state object to hold all form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    reviewText: '',
  });
  
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('No file chosen');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // A specific handler for the file input
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("--- Review Submitted ---");
    console.log("Form Data:", formData);
    console.log("Photo File:", photo);
    //msg to user
    alert("Thank you for your review!");

    setIsSubmitting(true);
    setSubmitMessage('');

    const reviewFormData = new FormData();
    reviewFormData.append('firstName', formData.firstName);
    reviewFormData.append('lastName', formData.lastName);
    reviewFormData.append('email', formData.email);
    reviewFormData.append('phone', formData.phone);
    reviewFormData.append('city', formData.city);
    reviewFormData.append('reviewText', formData.reviewText);

    if (photo) {
      reviewFormData.append('photo', photo);
    }
    
    try {
      console.log("Fetching review data..");
      const response = await fetch(`${apiUrl}/reviews`, {
          method: 'POST',
          body: reviewFormData,
      });

      const result = await response.json();

      console.log("Json response is reviced (correct or incorrect)")
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong while submitting.');
      }

      setSubmitMessage(result.message);
      
      setFormData({ firstName: '', lastName: '', email: '', phone: '', city: '', reviewText: '' });
      setPhoto(null);
      setPhotoName('No file chosen');

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
    <div className="add-review-page">
      <div className="container">
        <div className="review-form-header">
          <h1 className="review-form-main-title">Preyasi Mehndi</h1>
          <h2 className="review-form-sub-title">Add your review</h2>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" id="firstName" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-4">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" id="lastName" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-4">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" id="city" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-4">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="text" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="col-mb-6 mb-4">
              <label htmlFor="photo" className="form-label">Photo (Photo of Mehndi)</label>
              <div className="file-upload-wrapper"> 
                <input type="file" id="photo" name="photo" className="file-upload-input" onChange={handlePhotoChange} accept="image/*" />
                <label htmlFor="photo" className="file-upload-label">Choose File</label>
                <span className="file-upload-name">{photoName}</span>
              </div>
            </div>

            <div className="col-12 mb-4">
              <label htmlFor="reviewText" className="form-label">Your Review</label>
              <textarea id="reviewText" name="reviewText" className="form-control" rows="6" value={formData.reviewText} onChange={handleChange} required></textarea>
            </div>
            
            <div className="col-12 text-center mt-3">
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            {
              submitMessage && (
                <div className="col-12 text-center mt-3 submit-message">
                  {submitMessage}
                </div>
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReviewPage;