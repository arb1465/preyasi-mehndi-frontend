// src/components/AddGalleryImage.jsx

import React, { useState } from 'react';
import './AddGalleryImage.css'; // We'll create this CSS
import BackButton from './BackButton';

const apiUrl = process.env.REACT_APP_API_URL;

function AddGalleryImage() {
    // State for the form fields
    const [category, setCategory] = useState('all');
    const [altText, setAltText] = useState('');
    const [imageFile, setImageFile] = useState(null); // To hold the actual file
    const [fileName, setFileName] = useState('No file chosen');

    // State for submission status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            setMessage('Please select an image file to upload.');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        // Create a FormData object to send the file and text data
        const formData = new FormData();
        formData.append('category', category);
        formData.append('altText', altText);
        // IMPORTANT: The key 'galleryImage' must match the one in our backend route
        formData.append('galleryImage', imageFile); 

        const token = localStorage.getItem('admin_token');
        try {
            const response = await fetch(`${apiUrl}/admin-ak47/gallery/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // No 'Content-Type' header needed, browser sets it for FormData
                },
                body: formData
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Upload failed.');
            
            setMessage('Image uploaded successfully!');
            // Reset form
            e.target.reset();
            setFileName('No file chosen');
            setAltText('');

        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-gallery-container">
            <h1 className="page-title">Add New Image to Gallery</h1>

            <form onSubmit={handleSubmit} className="gallery-upload-form">
                <div className="form-group">
                    <div className="file-input-wrapper">
                        <label htmlFor="imageFile">Choose File</label>
                        <input
                            type="file"
                            id="imageFile"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                        />
                        <span className="file-name">{fileName}</span>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} required>
                        <option value="all">All</option>
                        <option value="hand">Hand</option>
                        <option value="feet">Feet</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="altText">Alt Text (Description for SEO)</label>
                    <input type="text" id="altText" value={altText} onChange={e => setAltText(e.target.value)} placeholder="e.g., Intricate bridal design on hand" required/>
                </div>

                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Uploading...' : 'Upload to Gallery'}
                </button>

                {message && <p className="system-message">{message}</p>}
            </form>

            <BackButton />
        </div>
    );
}

export default AddGalleryImage;