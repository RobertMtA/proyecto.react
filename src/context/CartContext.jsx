import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Primero creamos el contexto sin exportar
const CartContext = createContext({
  cart: [],
  addToCart: () => console.warn("No cart provider available"),
  removeFromCart: () => console.warn("No cart provider available"),
  clearCart: () => console.warn("No cart provider available"),
  updateQuantity: () => console.warn("No cart provider available"),
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  isInCart: () => false
});

// 2. Luego exportamos el contexto y el provider
export { CartContext };
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Cargar carrito desde localStorage al iniciar
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Persistir carrito en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart]);

  // Verificar si un producto está en el carrito
  const isInCart = (id, size, color) => {
    return cart.some(item => 
      item.id === id && 
      item.selectedSize === size && 
      item.selectedColor === color
    );
  };

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart(prevCart => {
      // Buscar si el producto ya existe (mismo id, talle y color)
      const existingIndex = prevCart.findIndex(item => 
        item.id === product.id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
      );

      if (existingIndex >= 0) {
        // Actualizar cantidad si ya existe
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + (product.quantity || 1)
        };
        return updatedCart;
      }

      // Agregar nuevo producto
      return [
        ...prevCart,
        {
          ...product,
          quantity: product.quantity || 1
        }
      ];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (id, size, color) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === id && 
          item.selectedSize === size && 
          item.selectedColor === color)
      )
    );
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (id, size, color, change) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0) // Eliminar si cantidad es 0
    );
  };

  // Vaciar carrito completamente
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total de items
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  // Calcular precio total
  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Cancelar compra y vaciar carrito
  const cancelPurchase = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    cancelPurchase
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
      throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};