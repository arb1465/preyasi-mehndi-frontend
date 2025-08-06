import React, { useState, useEffect } from "react";

import { Link as RouterLink, useLocation } from "react-router-dom"; 
import { Link as ScrollLink } from "react-scroll"; 

import "./Navbar.css";
import instaLogo from "../assets/instaLogo.jpg";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`custom-navbar navbar navbar-expand-lg ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <a className="navbar-brand custom-logo" href="/">Preyasi Mehndi</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav custom-nav-items">
            
            <li className="nav-item">
              {location.pathname === '/' ? (
                // If we are ON the homepage, this is a ScrollLink
                <ScrollLink className="nav-link" to="home" spy={true} offset={-80} duration={500}>
                  Home
                </ScrollLink>
              ) : (
                // If we are NOT on the homepage, this is a RouterLink
                <RouterLink className="nav-link" to="/">
                  Home
                </RouterLink>
              )}
            </li>

            <li className="nav-item">
              <RouterLink className="nav-link" to="/admin-ak47">Admin</RouterLink>
            </li>

            <li className="nav-item">
              <ScrollLink className="nav-link" to="about" spy={true} offset={-65} duration={500}>
                About
              </ScrollLink>
            </li>

            <li className="nav-item">
              <ScrollLink className="nav-link" to="specialties" spy={true} offset={-10} duration={500}>
                Specialities
              </ScrollLink>
            </li>
            
            <li className="nav-item">
              <RouterLink className="nav-link" to="/gallery">Gallery</RouterLink>
            </li>

            <li className="nav-item">
              <ScrollLink className="nav-link" to="reviews" spy={true} offset={-60} duration={500}>
                Reviews
              </ScrollLink>
            </li>

            <li className="nav-item">
              <ScrollLink className="nav-link" to="contact" spy={true} offset={-80} duration={500}>
                Contact
              </ScrollLink>
            </li> 
            
            <li className="nav-item">
              <a 
                href="https://www.instagram.com/preyasi_mehndi_art/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instaLogo} alt="Instagram" className="insta-logo" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;