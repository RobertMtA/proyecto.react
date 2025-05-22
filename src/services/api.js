// Mock API service for product data
const mockProducts = [
  {
    id: 1,
    title: "Camiseta Baby Bear",
    price: 29.99,
    description: "Camiseta de algodón con estampado de Baby Bear, perfecta para el día a día.",
    category: "Baby Bear",
    image: "/img/oversizedbabybearfrente.jpg",
    stock: 13  // Added stock field
  },
  {
    id: 2,
    title: "Sudadera Eric Designs",
    price: 49.99,
    description: "Sudadera con capucha diseñada por Eric, cómoda y con estilo único.",
    category: "Eric Designs",
    image: "/img/oversizedfrenteericknegra.jpg",
    stock: 13  // Added stock field
  },
  {
    id: 3,
    title: "Pantalón Bear and Bunny",
    price: 39.99,
    description: "Pantalón con estampado de osos y conejos, ideal para los más pequeños.",
    category: "Bear And Bunny",
    image: "/img/ovesizedosoencantadorblancofrente.jpg",
    stock: 13  // Added stock field
  }
];

// Simulate API fetch delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async () => {
  await delay(800); // Simulate network delay
  return mockProducts;
};

export const fetchProductById = async (id) => {
  await delay(500); // Simulate network delay
  const numericId = parseInt(id);
  return mockProducts.find(product => product.id === numericId) || null;
};