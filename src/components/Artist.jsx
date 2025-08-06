import React from 'react';
import './Artist.css';
import artistPhoto from '../assets/artist.jpg';

function Artist() {
  return (
    // Use the 'section-bg' class for the background color
    <section id="about" className="artist-section section-bg">
      <div className="container">
        <div className="row align-items">
          
          {/* Column 1: Text Content (As per your design) */}
          <div className="col-lg-6">
            <div className="artist-text-content">
              <h2 className="section-subtitle">About the Artist</h2>
              <h3 className="artist-name">Payal Chauhan</h3>

              <div className="desc-box">
                <p>
                  This is where the description of the artist will go. You can write a few paragraphs here about your passion for mehendi, your experience, and what makes your art special. This text is inside the light grey placeholder.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Artist Image Placeholder (As per your design) */}
          <div className="col-lg-6">
            <div className="artist-image-placeholder">
              <img src={artistPhoto} alt="Artist Payal Chauhan" className="artist-photo" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Artist;