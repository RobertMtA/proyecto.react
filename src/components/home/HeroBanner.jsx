import React from 'react';
import { Link } from 'react-router-dom';
import { FaStarOfLife } from 'react-icons/fa';
import { BsCollectionFill } from 'react-icons/bs';
import { GiTShirt } from 'react-icons/gi';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>
          <FaStarOfLife className="icon-title" /> 
          Bienvenidos a <span className="brand-name">RYR</span>
          <FaStarOfLife className="icon-title" />
        </h1>
        <p>
          <GiTShirt className="icon-text" />
          Diseños exclusivos para tu estilo único
        </p>
        <Link to="/collections" className="hero-button">
          <BsCollectionFill className="button-icon" />
          Ver Colecciones
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;