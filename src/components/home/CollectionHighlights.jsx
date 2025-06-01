import React from 'react';
import { Link } from 'react-router-dom';
import './CollectionHighlights.css'; // We'll create this CSS file next

const CollectionHighlights = () => {
  return (
    <div className="collection-highlights-section">
      <h2 className="collection-highlights-title">Nuestras Colecciones</h2>
      <div className="featured-collections-grid">
        <Link to="/bearandbunny" className="collection-highlight-card">
          <img src="/img/diseñobearybunny.jpg" alt="Colección Bear & Bunny" />
          <div className="collection-highlight-content">
            <h3>"Bear & Bunny" By R Y R</h3>
            <p>Ternura y encanto en diseños exclusivos.</p>
            <span className="view-collection-btn-highlight">Ver Colección</span>
          </div>
        </Link>

        <Link to="/ericdesigns" className="collection-highlight-card">
          <img src="/img/diseñoerick.jpg" alt="Diseños Eric Cartman" />
          <div className="collection-highlight-content">
            <h3>"Eric Cartman" By R Y R</h3>
            <p>Carisma y estilo con un toque de South Park.</p>
            <span className="view-collection-btn-highlight">Ver Colección</span>
          </div>
        </Link>

        <Link to="/babybear" className="collection-highlight-card">
          <img src="/img/diseñobabybear.jpg" alt="Colección Baby Bear" />
          <div className="collection-highlight-content">
            <h3>"Baby Bear" By R Y R</h3>
            <p>Adorables osos para un look mimoso.</p>
            <span className="view-collection-btn-highlight">Ver Colección</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CollectionHighlights;
