import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from "react-router-dom"; 
import { Link as ScrollLink } from "react-scroll"; 

import "./Navbar.css";
import instaLogo from "../assets/instaLogo.jpg";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    
    const navTogglerRef = useRef(null);
    const navbarCollapseRef = useRef(null);
    
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = () => {
        const isMenuOpen = navbarCollapseRef.current.classList.contains('show');

        if (isMenuOpen) {
            navTogglerRef.current.click();
        }
    };

    return (
        <nav className={`custom-navbar navbar navbar-expand-lg ${scrolled ? "navbar-scrolled" : ""}`}>
            <div className="container">
                <RouterLink className="navbar-brand custom-logo" to="/">Preyasi Mehendi</RouterLink>
                
                <button
                    ref={navTogglerRef}
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                {/* --- Add the ref to the collapsible div --- */}
                <div ref={navbarCollapseRef} className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav custom-nav-items">
                        
                        {/* --- Every link inside the menu now calls handleLinkClick --- */}
                        
                        <li className="nav-item">
                            {location.pathname === '/' ? (
                                <ScrollLink className="nav-link" to="home" spy={true} offset={-80} duration={500} onClick={handleLinkClick}>Home</ScrollLink>
                            ) : (
                                <RouterLink className="nav-link" to="/" onClick={handleLinkClick}>Home</RouterLink>
                            )}
                        </li>
                        
                        <li className="nav-item">
                            <RouterLink className="nav-link" to="/admin-ak47" onClick={handleLinkClick}>Admin</RouterLink>
                        </li>

                        <li className="nav-item">
                            <ScrollLink className="nav-link" to="about" spy={true} offset={-60} duration={500} onClick={handleLinkClick}>About</ScrollLink>
                        </li>

                        <li className="nav-item">
                            <ScrollLink className="nav-link" to="specialties" spy={true} offset={-20} duration={500} onClick={handleLinkClick}>Specialties</ScrollLink>
                        </li>

                        <li className="nav-item">
                            <RouterLink className="nav-link" to="/gallery" onClick={handleLinkClick}>Gallery</RouterLink>
                        </li>

                        <li className="nav-item">
                            <ScrollLink className="nav-link" to="reviews" spy={true} offset={-60} duration={500} onClick={handleLinkClick}>Reviews</ScrollLink>
                        </li>

                        <li className="nav-item">
                            <ScrollLink className="nav-link" to="contact" spy={true} offset={-80} duration={500} onClick={handleLinkClick}>Contact</ScrollLink>
                        </li> 

                        <li className="nav-item">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                                <img src={instaLogo} alt="Instagram" className="insta-logo" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;