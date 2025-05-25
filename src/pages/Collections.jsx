import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import './Collections.css';

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log('Productos recibidos:', data); // Para debugging
        if (data) {
          setProducts(data);
        } else {
          setError('No se encontraron productos');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos: ' + (err.message || 'Error desconocido'));
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div className="loading-container">Cargando productos...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="collections-section">
      <h2 className="collections-title">Nuestras Colecciones</h2>
      
      {/* Colecciones destacadas */}
      <div className="featured-collections">
        {/* Each collection card is now a clickable Link */}
        <Link to="/bearandbunny" className="collection-card">
          <div className="collection-content">
            <img src="/img/diseñobearybunny.jpg" alt="Colección Bear & Bunny" />
            <h3>"Bear & Bunny" By R Y R</h3>
            <p>¡Dale un abrazo a la ternura con nuestro diseño exclusivo de Bear & Bunny! Este adorable dúo es perfecto para agregar un toque de encanto a tus remeras y buzos.</p>
            <span className="view-collection-btn">Ver Colección</span>
          </div>
        </Link>

        <Link to="/ericdesigns" className="collection-card">
          <div className="collection-content">
            <img src="/img/diseñoerick.jpg" alt="Diseños Eric Cartman" />
            <h3>"Eric Cartman" By R Y R</h3>
            <p>¡Vístete con el carisma de Eric Cartman con nuestra línea de remeras y buzos! Descubre también nuestras opciones oversized.</p>
            <span className="view-collection-btn">Ver Colección</span>
          </div>
        </Link>

        <Link to="/babybear" className="collection-card">
          <div className="collection-content">
            <img src="/img/diseñobabybear.jpg" alt="Colección Baby Bear" />
            <h3>"Baby Bear" By R Y R</h3>
            <p>¡Sorprende con ternura! Descubre nuestras exclusivas remeras y buzos de "Oso Mimoso", perfectos para los amantes de lo adorable.</p>
            <span className="view-collection-btn">Ver Colección</span>
          </div>
        </Link>
      </div>
      
      {/* Productos de la API */}
      <div className="products-section">
        <h2 className="collections-title">Todos los Productos</h2>
        <div className="products-grid">
          {products.map(product => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="product-card"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-image" 
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price?.toFixed(2)}</p>
              <span className="view-product-btn">Ver Detalles</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;