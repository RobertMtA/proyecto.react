import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { fetchProductById } from "../services/api";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Usamos los datos pasados por estado primero
  const [product, setProduct] = useState(location.state?.productData || null);
  const [loading, setLoading] = useState(!location.state?.productData);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Negro", "Blanco", "Gris"];

  useEffect(() => {
    // Solo hacemos fetch si no recibimos los datos por estado
    if (!location.state?.productData) {
      const getProduct = async () => {
        try {
          const data = await fetchProductById(id);
          if (data) {
            setProduct(data);
          } else {
            setError("No se encontró el producto");
          }
        } catch (err) {
          console.error("Error fetching product:", err);
          setError("Error al cargar el producto");
        } finally {
          setLoading(false);
        }
      };

      getProduct();
    }
  }, [id, location.state]);

  // Resto del código permanece igual...
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Por favor seleccione talle y color");
      return;
    }

    addToCart({
      ...product,
      id: product.id || Number(id),
      selectedSize,
      selectedColor,
      quantity,
      totalPrice: product.price * quantity,
    });

    navigate("/cart");
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Producto no encontrado</div>;

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Volver
      </button>
      
      <div className="product-detail-content">
        <img src={product.image} alt={product.title} className="product-image" />
        
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="category">{product.category}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>

          <div className="product-options">
            <div className="option-group">
              <h3>Talles</h3>
              <div className="size-buttons">
                {sizes.map(size => (
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

            <div className="option-group">
              <h3>Colores</h3>
              <div className="color-buttons">
                {colors.map(color => (
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

            <div className="option-group">
              <h3>Cantidad</h3>
              <div className="quantity-controls">
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
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;