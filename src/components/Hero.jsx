// src/components/Hero.jsx

import React from "react";
import "./Hero.css";
import heroBg from "../assets/BGimage.jpg"; // adjust path if needed
import { Link as RouterLink } from "react-router-dom";

function Hero() {
  return (
    <section id="home" className="hero-container">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      <div className="hero-content">
        <h1>Mehndi By Preyasi</h1>
        <RouterLink to="/booking" className="btn-review-nav" id="request-to-book">
              Request for book
        </RouterLink>
      </div>
    </section>
  );
}

export default Hero;  