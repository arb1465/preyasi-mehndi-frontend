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
                <p>I’m a passionate Mehendi artist with a love for blending tradition and creativity. What began as a hobby soon turned into a deep-rooted passion, allowing me to bring joy and beauty to countless hands. With years of experience, I specialize in crafting elegant, customized designs for every occasion — from weddings to festivals. Every pattern I create is unique, detailed, and made with care using natural, skin-safe henna.</p>
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