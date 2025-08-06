import React from 'react';

import Hero from './components/Hero';
import Artist from './components/Artist';
import GalleryNav from './components/GalleryNav';
import Reviews from './components/Reviews';
import Specialties from './components/Specialities';

function HomePage() {
  return (
    // You can use a main tag or a React Fragment (<>)
    <main>
      <Hero />
      <Artist />
      <Specialties />
      <GalleryNav />
      <Reviews />
    </main>
  );
}

export default HomePage;