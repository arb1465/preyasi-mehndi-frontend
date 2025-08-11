import React from 'react';
import './GalleryNav.css';
import { Link } from 'react-router-dom';

function GalleryNav() {
  return (
    // The id="gallery" allows the link in your main Navbar to scroll to this section.
    <section id="gallery" className="gallery-nav-section">
      <Link to="/gallery" className="gallery-nav-link">
        <div className="container">
          <h2 className="gallery-title">Gallery</h2>
          <p id='tapToView'>(Tap to view)</p>
        </div>
      </Link>
    </section>
  );
}

export default GalleryNav;