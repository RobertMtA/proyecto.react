import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Actualizada la ruta
import { fetchProductById } from "../../services/api"; // Actualizada la ruta
import "./ProductDetail.css";

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Tamaños y colores de ejemplo (puedes adaptarlos según tus necesidades)
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Negro", "Blanco", "Gris"];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("No se encontró el producto");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          "Error al cargar el producto: " + (err.message || "Error desconocido")
        );
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => {
      const newQuantity = prev + change;
      if (newQuantity < 1) return 1;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Por favor seleccione talle y color");
      return;
    }

    const itemToAdd = {
      ...product,
      id: Number(id), // Asegurarse que el ID sea un número
      selectedSize,
      selectedColor,
      quantity,
      totalPrice: product.price * quantity,
    };

    addToCart(itemToAdd);
    alert("Producto agregado al carrito");
    navigate("/cart");
  };

  if (loading) return <div className="loading-container">Cargando...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!product)
    return <div className="error-container">Producto no encontrado</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </div>

        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-category">Categoría: {product.category}</p>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>

          <div className="product-options">
            <div className="size-selector">
              <h4>Talles</h4>
              <div className="size-buttons">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="color-selector">
              <h4>Colores</h4>
              <div className="color-buttons">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <h4>Cantidad</h4>
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

          <div className="product-actions">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </button>
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;