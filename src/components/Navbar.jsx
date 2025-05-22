import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaSignInAlt, FaUserPlus, FaShoppingCart, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">
                    <img src="/src/assets/logo.jpg" alt="Logo" className="navbar-logo" />
                </Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-link">
                        <FaHome className="nav-icon" />
                        <span>Inicio</span>
                    </Link>
                </li>
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/login" className="nav-link">
                                <FaSignInAlt className="nav-icon" />
                                <span>Iniciar Sesión</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="nav-link">
                                <FaUserPlus className="nav-icon" />
                                <span>Registrarse</span>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/cart" className="nav-link">
                                <FaShoppingCart className="nav-icon" />
                                <span>Carrito</span>
                            </Link>
                        </li>
                        {user && user.role === 'admin' && (
                            <li>
                                <Link to="/admin" className="nav-link">
                                    <FaUserCog className="nav-icon" />
                                    <span>Admin</span>
                                </Link>
                            </li>
                        )}
                        <li>
                            <button onClick={logout} className="logout-btn">
                                <FaSignOutAlt className="nav-icon" />
                                <span>Cerrar Sesión</span>
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;