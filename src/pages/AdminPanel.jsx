import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario es administrador
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Aquí deberías hacer la llamada a tu backend para obtener las órdenes
    const fetchOrders = async () => {
      try {
        const response = await fetch('TU_URL_API/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error al cargar las órdenes:', error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <div className="orders-list">
        <h3>Órdenes de Compra</h3>
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <p>Orden ID: {order.id}</p>
            <p>Cliente: {order.userName}</p>
            <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
            <p>Total: ${order.total}</p>
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <p>{item.productName} x {item.quantity}</p>
                  <p>${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
