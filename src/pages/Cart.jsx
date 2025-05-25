import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import './cart.css';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    getTotalItems,
    cancelPurchase
  } = useContext(CartContext);
  
  const navigate = useNavigate();

  // Debug: Ver contenido del carrito
  useEffect(() => {
    console.log("Current cart contents:", cart);
  }, [cart]);

  if (!cart) {
    return <div>Cargando carrito...</div>;
  }

  const handleCheckout = () => {
    // Lógica para manejar el checkout
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = 'img/oversizedfrenteericknegra.jpg'; // Imagen de respaldo
                  }}
                />
                
                <div className="cart-item-details">
                  <h3>{item.name || 'Producto sin nombre'}</h3>
                  <p>Precio unitario: ${item.price?.toFixed(2) || '0.00'}</p>
                  
                  {item.selectedSize && <p>Talle: {item.selectedSize}</p>}
                  {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                  
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <p>Subtotal: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                  className="remove-btn"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Resumen ({getTotalItems()} items)</h3>
            <p>Total: ${getTotalPrice().toFixed(2)}</p>
            <div className="cart-buttons">
              <button 
                className="checkout-btn" 
                onClick={handleCheckout}
              >
                Finalizar Compra
              </button>
              <button 
                className="btn-cancelar" 
                onClick={() => {
                  cancelPurchase();
                  navigate('/');
                }}
              >
                Cancelar Compra
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <Link to="/collections" className="continue-shopping">
            Continuar Comprando
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;