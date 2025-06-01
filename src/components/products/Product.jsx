import React, { useState } from 'react'
import './Product.css'

const Product = ({ product, addToCart }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  const images = [product.images.front, product.images.back];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor seleccione talle y color');
      return;
    }
    addToCart({ ...product, selectedSize, selectedColor });
  };

  return (
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
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>

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
        >
          Agregar al carrito
        </button>
      </div>
      <div className={`product-stock ${
        product.stock === 0 ? 'out-of-stock' : 
        product.stock < 5 ? 'low-stock' : ''
      }`}>
        {product.stock === 0 ? 'Agotado' : `Stock disponible: ${product.stock}`}
      </div>
    </div>
  );
};

export default Product