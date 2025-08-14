// src/components/Footer.jsx

import React from 'react';

// 1. IMPORT THE NECESSARY LINK COMPONENTS AND THE HOOK
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import './Footer.css';

function Footer() {
  // 2. GET THE CURRENT LOCATION OBJECT AT THE TOP OF THE COMPONENT
  const location = useLocation();

  return (
    <footer id="contact" className="site-footer">
      <div className="main-footer">
        <div className="container">
          <div className="row">
            
            {/* Column 1: Additional Links */}
            <div className="col-lg-4 col-md-6 footer-column">
              <h5 className="footer-title">Additional Links</h5>
              <ul className="footer-links">
                <li><a href="https://instagram.com/mrs._payal_chauhan/" target="_blank" rel="noopener noreferrer">instagram.com</a></li>
                <li><a href="mailto:preyasi28@gmail.com">gmail.com</a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-column footer-brand-col">
              {location.pathname === '/' ? (
                // IF we are on the homepage, render a ScrollLink
                <ScrollLink 
                  to="home"
                  duration={1000} 
                  className="footer-brand-link"
                >
                  Preyasi<br/>Mehndi
                </ScrollLink>
              ) : (
                // OTHERWISE, render a RouterLink to navigate home
                <RouterLink to="/" className="footer-brand-link">
                  Preyasi<br/>Mehndi
                </RouterLink>
              )}
            </div>

            {/* Column 3: Contact Us */}
            <div className="col-lg-4 col-md-12 footer-column">
              <h5 className="footer-title">Contact Us</h5>
              <address className="footer-contact-info">
                "Preyasi", 3 - Nehrunagar private,<br/>
                Maldhari chowk, Nana mava road,<br/>Rajkot - 360004<br/>
                +91 84697 52853
              </address>
            </div>
          </div>
        </div>
      </div>
      
      <div className="copyright-bar">
        <p>© Copyright Preyasi Mehendi | Designed by &nbsp;
          <a href="https://portfolio-arb.vercel.app" target="_blank" rel="noopener noreferrer">Aasutosh Baraiya</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;