import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageGallery.css'; // We'll create this CSS next
import BackButton from './BackButton';

const apiUrl = process.env.REACT_APP_API_URL;

function ManageGallery() {
    const [galleryImages, setGalleryImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    // --- Fetch all img requests when the component loads ---
    useEffect(() => {
        const fetchGalleryImages = async () => {
            const token = localStorage.getItem('admin_token');
            try {
                const response = await fetch(`${apiUrl}/admin-ak47/gallery/all`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = await response.json();

                if (!response.ok) throw new Error(result.error || 'Failed to fetch gallery images.');

                setGalleryImages(result.data);
            } 
            catch (err) {
                setMessage(err.message);
            } 
            finally {
                setIsLoading(false);
            }
        };
        fetchGalleryImages();
    }, []);

    const handleAddOrNot = async (imageId) => {
        const token = localStorage.getItem('admin_token');
        
        try {
            const response = await fetch(`${apiUrl}/admin-ak47/gallery/toggle/${imageId}`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();

            if (!response.ok) throw new Error(result.message || 'Failed to update status.');
            
            setMessage(result.message);
            
            setGalleryImages(currentImages =>
                currentImages.map(image =>
                    image._id === imageId ? result.data : image // Replace the updated image in the array
                )
            );

        } catch (err) {
            setMessage(err.message);
        }
    };

    if (isLoading) return <p>Loading image requests...</p>;

    return (
        <div className="manage-gallery-container">
            <Link to="/admin-ak47/dashboard" className="page-title-link">
                <h1 className="page-title">Manage Gallery Images</h1>
            </Link>
            {message && <p className="system-message">{message}</p>}

            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Text</th>
                            <th>Photo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleryImages.length > 0 ? (
                            galleryImages.map(img => (
                                <tr key={img._id}>
                                    <td>{img.category}</td>
                                    <td>{img.altText}</td>
                                    <td>
                                        <img
                                            src={img.imageUrl}
                                            alt={img.altText}
                                            className="gallery-thumbnail"
                                            id='photoHere'
                                        />
                                    </td>
                                    <td>
                                        {img.isOnGallery === true ? (
                                            <button 
                                                onClick={() => handleAddOrNot(img._id)} 
                                                className="btn-remove"
                                            >
                                                Remove
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleAddOrNot(img._id)} 
                                                className="btn-add"
                                            >
                                                Add
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>No images found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <BackButton />
        </div>
    );
}

export default ManageGallery;