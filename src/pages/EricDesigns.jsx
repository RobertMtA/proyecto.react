import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './EricDesigns.css';

const EricDesigns = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 'eric-cartman',
    name: "Eric Cartman By R Y R",
    price: 9999,
    stock: 10,
    description: "¡Vístete con el carisma de Eric Cartman con nuestra línea de remeras y buzos! Descubre también nuestras opciones oversized para un estilo cómodo y lleno de actitud.",
    images: {
      front: "/img/oversizedfrenteericknegra.jpg",
      back: "/img/oversizederickatras.jpg"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Gris"]
  };

  const images = [product.images.front, product.images.back];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor selecciona un talle y un color');
      return;
    }

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[currentImage], // Corregido: estaba mal escrito 'curren/img/eric-cartman.jpgectedSize'
      selectedSize,
      selectedColor,
      quantity: quantity
    };

    addToCart(productToAdd);
    navigate('/cart'); // Redirige al carrito después de agregar
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => {
      const newQuantity = prev + change;
      if (newQuantity < 1) return 1;
      if (newQuantity > product.stock) return product.stock;
      return newQuantity;
    });
  };

  return (
    <div className="design-page">
      <div className="product-container">
        <div className="product-item">
          <div className="carousel">
            <button className="carousel-btn prev" onClick={prevImage}>❮</button>
            <img 
              src={images[currentImage]} 
              alt={product.name} 
              className="product-image"
            />
            <button className="carousel-btn next" onClick={nextImage}>❯</button>
          </div>

          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toLocaleString()}</p>
            <p className="product-description">{product.description}</p>
            <p className="stock-info">Stock disponible: {product.stock}</p>

            <div className="quantity-selector">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <div className="size-selector">
              <div 
                className="selector-header"
                onClick={() => setIsSizeOpen(!isSizeOpen)}
              >
                <h4>Talles</h4>
                <span className={`dropdown-icon ${isSizeOpen ? 'open' : ''}`}>▼</span>
              </div>
              <div className={`selector-content ${isSizeOpen ? 'open' : ''}`}>
                <div className="size-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="color-selector">
              <div 
                className="selector-header"
                onClick={() => setIsColorOpen(!isColorOpen)}
              >
                <h4>Colores</h4>
                <span className={`dropdown-icon ${isColorOpen ? 'open' : ''}`}>▼</span>
              </div>
              <div className={`selector-content ${isColorOpen ? 'open' : ''}`}>
                <div className="color-buttons">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      <div className="back-btn-container">
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default EricDesigns;