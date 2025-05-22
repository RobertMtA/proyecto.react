import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xjkvywrw', {
        method: 'POST',
        body: new FormData(e.target),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
      } else {
        alert('Hubo un error al enviar el mensaje. Por favor, intente nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="contact-container">
      <h2>Contacto</h2>
      
      {submitted ? (
        <div className="success-message">
          <h3>¡Gracias por tu mensaje!</h3>
          <p>Nos pondremos en contacto contigo pronto.</p>
          <button onClick={() => setSubmitted(false)}>Enviar otro mensaje</button>
        </div>
      ) : (
        <>
          <p className="contact-intro">
            ¿Tienes alguna pregunta o comentario? Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
          </p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Enviar Mensaje</button>
          </form>
        </>
      )}
      
      <div className="contact-info">
        <h3>Información de Contacto</h3>
        <p><strong>Email:</strong> robertogaona1985@gmail.com</p>
        <p><strong>Teléfono:</strong> +54 11 4176-6377</p>
        <p><strong>Dirección:</strong> Av. Siempreviva 742, Springfield</p>
        <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 18:00</p>
      </div>
    </div>
  );
};

export default Contact;