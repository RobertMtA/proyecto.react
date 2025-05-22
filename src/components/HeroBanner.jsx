import React from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>Bienvenidos a R Y R</h1>
        <p>Diseños exclusivos para tu estilo único</p>
        <Link to="/collections" className="hero-button">
          Ver Colecciones
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;