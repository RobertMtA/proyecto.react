import React from 'react';
import { Link } from 'react-router-dom';
import './ContactSnippet.css'; // We'll create this CSS file next
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';


const ContactSnippet = () => {
  return (
    <div className="contact-snippet-section">
      <h2 className="contact-snippet-title">Contáctanos</h2>
      <p className="contact-snippet-intro">
        ¿Tienes preguntas? Estamos aquí para ayudarte.
      </p>
      <div className="contact-snippet-info">
        <p><FaEnvelope className="contact-icon" /> robertogaona1985@gmail.com</p>
        <p><FaPhone className="contact-icon" /> +54 11 4176-6377</p>
        <p><FaMapMarkerAlt className="contact-icon" /> Av. Siempreviva 742, Springfield</p>
        <p><FaClock className="contact-icon" /> Lunes a Viernes de 9:00 a 18:00</p>
      </div>
      <Link to="/contact" className="contact-snippet-button">
        Formulario de Contacto
      </Link>
    </div>
  );
};

export default ContactSnippet;
