import React, { useState, useEffect } from 'react';
import './GalleryPage.css';

const apiUrl = process.env.REACT_APP_API_URL;

function GalleryPage() {
  const [allImages, setAllImages] = useState([]);

  const [filteredImages, setFilteredImages] = useState([]);

  const [activeFilter, setActiveFilter] = useState('all');

  const [isLoading, setIsLoading] = useState(true);

  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/gallery`); // Use your GET /gallery route
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Store the up-to-date image list from the database in our state
        setAllImages(data);

      }
      catch (error) {
        console.error("Failed to fetch gallery images:", error);
      }
      finally {
        setIsLoading(false); // We're done loading
      }
    };

    fetchGalleryImages();
  }, []); // The empty dependency array [] ensures this runs only once.

  // This effect runs whenever the activeFilter or the allImages list changes.
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredImages(allImages);
    }
    else {
      const newFilteredImages = allImages.filter(image => image.category === activeFilter);
      setFilteredImages(newFilteredImages);
    }
  },
    [activeFilter, allImages]);

  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  // --- RENDER LOGIC ---
  if (isLoading) {
    return <div className="gallery-page-container"><p>Loading Gallery...</p></div>;
  }

  return (
    <div className="gallery-page-container section-bg">
      <div className="container">
        <div className="gallery-header">
          <h1 className="gallery-main-title">Preyasi Mehndi Art Gallery</h1>
          <div className="filter-buttons">
            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
            <button className={`filter-btn ${activeFilter === 'simple' ? 'active' : ''}`} onClick={() => setActiveFilter('simple')}>Simple</button>
            <button className={`filter-btn ${activeFilter === 'bridal' ? 'active' : ''}`} onClick={() => setActiveFilter('bridal')}>Bridal</button>
            <button className={`filter-btn ${activeFilter === 'engagement' ? 'active' : ''}`} onClick={() => setActiveFilter('engagement')}>Engagement</button>
            <button className={`filter-btn ${activeFilter === 'stylish' ? 'active' : ''}`} onClick={() => setActiveFilter('stylish')}>Stylish</button>
          </div>
        </div>

        <div className="row">
          {filteredImages.length > 0 ? (
            filteredImages.map(image => (
              <div className="col-lg-4 col-md-6 mb-4" key={image._id}>
                <div className="gallery-item" onClick={() => handleImageClick(image.imageUrl)}>
                  <img
                    src={image.imageUrl}
                    alt={image.altText}
                    className="img-fluid gallery-image"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No images found for this category.</p>
          )}
        </div>
      </div>

      {zoomedImage && (
        <div className="zoom-overlay" onClick={handleCloseZoom}>
          <img src={zoomedImage} alt="Zoomed in mehendi design" className="zoomed-image" />
        </div>
      )}
    </div>
  );
}

export default GalleryPage;