import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import FeaturedProducts from "../components/products/FeaturedProducts";
import CollectionHighlights from "../components/home/CollectionHighlights";
import ContactSnippet from "../components/home/ContactSnippet";
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
        <section className="collections-section"> {/* Keep existing class if Home.css uses it for spacing etc. */}
          <CollectionHighlights />
        </section>
        <section className="contact-section"> {/* Keep existing class */}
          <ContactSnippet />
        </section>
      </main>
    </div>
  );
};

export default Home;