import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { useLoading } from '../context/LoadingContext';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showLoading, hideLoading, setErrorMessage } = useLoading();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            showLoading();
            const result = await login(credentials);
            
            if (result.success) {
                navigate('/');
            } else {
                setErrorMessage('Credenciales inválidas');
            }
        } catch (error) {
            setErrorMessage('Error al iniciar sesión: ' + error.message);
        } finally {
            hideLoading();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default Login;