import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: 'Remera Baby Bear',
      price: 29.99,
      image: '/img/ovesizedosoencantadorblancofrente.jpg',
      description: 'Remera 100% algodón con estampado de oso',
      category: 'Remeras'
    },
    {
      id: 2,
      title: 'Buzo Eric Designs',
      price: 49.99,
      image: '/img/oversizedbabybearfrente.jpg',
      description: 'Buzo oversize con capucha y bolsillo canguro',
      category: 'Buzos'
    },
    {
      id: 3,
      title: 'Remera Bear & Bunny',
      price: 34.99,
      image: '/img/oversizedbabybearfrente.jpg',
      description: 'Remera con estampado de oso y conejo',
      category: 'Remeras'
    }
  ];

  return (
    <div className="featured-products">
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <Link 
              to={`/product/${product.id}`}
              state={{ productData: product }} // Pasamos los datos completos del producto
              className="view-btn"
            >
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;