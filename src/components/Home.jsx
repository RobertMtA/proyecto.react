import React from 'react';
// Removemos la importación de Navbar ya que está en App.jsx
import HeroBanner from './HeroBanner';
import FeaturedProducts from './FeaturedProducts';
import Collections from './Collections';
import Contact from './Contact';

import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <main>
        <HeroBanner />
        <section className="featured-section">
          <h2>Productos Destacados</h2>
          <FeaturedProducts />
        </section>
        <section className="collections-section">
          <Collections />
        </section>
        <section className="contact-section">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Home;