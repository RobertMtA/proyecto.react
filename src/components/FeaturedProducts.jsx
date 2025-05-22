import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Remera Baby Bear',
      price: 29.99,
      image: '/img/ovesizedosoencantadorblancofrente.jpg'
    },
    {
      id: 2,
      name: 'Buzo Eric Designs',
      price: 49.99,
      image: '/img/oversizedbabybearfrente.jpg'
    },
    {
      id: 3,
      name: 'Remera Bear & Bunny',
      price: 34.99,
      image: '/img/oversizedbabybearfrente.jpg'
    }
  ];

  return (
    <div className="featured-products">
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`} className="view-btn">
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;