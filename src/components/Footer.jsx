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
        <p>© 2025 Desarrollador | Roberto Gaona</p>
      </div>
    </footer>
  );
};

export default Footer;