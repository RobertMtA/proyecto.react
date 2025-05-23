import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('Procesando suscripción...');

    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el servidor');
      }

      setMessage(data.message);
      setEmail('');

    } catch (error) {
      setMessage(error.message || 'Error al conectar con el servidor');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="newsletter-section">
          <h3>Recibe nuestro boletín</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Suscribirse'}
            </button>
          </form>
          {message && (
            <p className={`message ${!isLoading ? 'visible' : ''}`}>
              {message}
            </p>
          )}
        </div>
        <div className="footer-section">
          <h3>Acerca de</h3>
          <ul className="footer-links">
            <li><a href="/about">Nuestra Historia</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Ayuda</h3>
          <ul className="footer-links">
            <li><a href="/faq">Preguntas Frecuentes</a></li>
            <li><a href="/shipping">Envíos</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-links">
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 |Roberto Gaona. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;