import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img 
        src="/src/assets/img-error-404.jpg"  // La imagen debe estar en la carpeta public
        alt="404 Error" 
        className="not-found-image"
      />
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className="back-home">
        <FaHome className="home-icon" />
        <span>Volver al inicio</span>
      </Link>
    </div>
  );
};

export default NotFound;