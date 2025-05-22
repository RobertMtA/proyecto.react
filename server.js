/* global process */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Ajusta según tu frontend
  credentials: true
}));
app.use(express.json());

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando',
    mailchimp: {
      apiKey: process.env.MAILCHIMP_API_KEY ? 'Configurado' : 'No configurado',
      listId: process.env.MAILCHIMP_LIST_ID ? 'Configurado' : 'No configurado'
    }
  });
});

// Ruta de suscripción
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  try {
    const serverPrefix = process.env.MAILCHIMP_API_KEY.split('-')[1];
    const response = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed'
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.title || 'Error en Mailchimp');
    }

    res.json({ success: true, message: '¡Suscripción exitosa!' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Error al procesar la suscripción'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
  console.log('🔑 Variables de entorno cargadas:', {
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY ? 'Configurado' : 'Falta',
    MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID ? 'Configurado' : 'Falta'
  });
});