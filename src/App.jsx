import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LoadingProvider } from './context/LoadingContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Loading from './components/ui/Loading';
import ErrorMessage from './components/ErrorMessage';

// Page imports
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Collections from './pages/Collections';
import BabyBear from './pages/BabyBear';
import BearAndBunny from './pages/BearAndBunny';
import EricDesigns from './pages/EricDesigns';
import AdminPanel from './pages/AdminPanel';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

// Auth
import PrivateRoute from './auth/PrivateRoute';

function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <Router>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <div className="app-wrapper" style={{ minHeight: '100vh' }}>
              <Navbar />
              <Loading />
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