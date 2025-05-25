import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const { cart, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Aquí irá la lógica para procesar el pago
            console.log('Procesando orden:', {
                items: cart,
                total: getTotalPrice(),
                customer: formData
            });

            // Simular éxito
            alert('¡Compra realizada con éxito!');
            clearCart();
            navigate('/');
        } catch (error) {
            console.error('Error al procesar la compra:', error);
            alert('Hubo un error al procesar la compra');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-empty">
                <h2>No hay items en el carrito</h2>
                <button onClick={() => navigate('/')}>Volver a la tienda</button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Finalizar Compra</h2>
            
            <div className="checkout-summary">
                <h3>Resumen de la compra</h3>
                {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="checkout-item">
                        <span>{item.name}</span>
                        <span>Talle: {item.selectedSize}</span>
                        <span>Color: {item.selectedColor}</span>
                        <span>Cantidad: {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="checkout-total">
                    <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
                <h3>Información de envío</h3>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="direccion">Dirección de envío</label>
                    <textarea
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="checkout-buttons">
                    <button type="submit" className="btn-confirmar">
                        Confirmar Compra
                    </button>
                    <button 
                        type="button" 
                        className="btn-cancelar"
                        onClick={() => navigate('/cart')}
                    >
                        Volver al Carrito
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;