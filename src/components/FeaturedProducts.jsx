import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api'; // Adjust path if necessary
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        if (fetchedProducts) {
          setProducts(fetchedProducts.slice(0, 3)); // Assuming we want the first 3 as featured
        } else {
          setError('No products found.');
        }
      } catch (err) {
        setError('Failed to fetch products: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading featured products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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