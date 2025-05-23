import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LoadingProvider } from './context/LoadingContext';
import Navbar from './components/common/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Contact from './components/Contact';
import Cart from './components/cart/Cart';
import ProductDetail from './components/products/ProductDetail';
import Collections from './components/Collections';
import BabyBear from './components/BabyBear';
import BearAndBunny from './components/BearAndBunny';
import EricDesigns from './components/EricDesigns';
import AdminPanel from './components/AdminPanel';
import Footer from './components/common/Footer';
import Checkout from './components/Checkout';
import PrivateRoute from './auth/PrivateRoute';
import NotFound from './components/NotFound';
import Loading from './components/ui/Loading';
import ErrorMessage from './components/ErrorMessage';

function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  console.log('App rendering');

  return (
    <Router>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <div className="app-wrapper" style={{ minHeight: '100vh' }}>
              <Navbar />
              <Loading />  {/* Asegúrate de que el componente esté incluido aquí */}
              <ErrorMessage />
              <main className="main-content" style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/babybear" element={<BabyBear />} />
                  <Route path="/bearandbunny" element={<BearAndBunny />} />
                  <Route path="/ericdesigns" element={<EricDesigns />} />
                  <Route 
                    path="/admin" 
                    element={
                      <PrivateRoute requireAdmin={true}>
                        <AdminPanel />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="/checkout" element={<Checkout />} />
                  {/* Ruta NotFound - debe ir al final */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;