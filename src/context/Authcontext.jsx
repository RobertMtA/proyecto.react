import React, { createContext, useContext, useState } from 'react';

// Creamos y exportamos el contexto
export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (credentials) => {
        try {
            // Simular login - Reemplazar con tu API real
            if (credentials.email === 'admin@example.com') {
                setUser({
                    email: credentials.email,
                    role: 'admin'
                });
            } else {
                setUser({
                    email: credentials.email,
                    role: 'user'
                });
            }
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            // Simular registro - Reemplazar con tu API real
            const isAdmin = userData.email === 'admin@example.com';
            setUser({
                email: userData.email,
                role: isAdmin ? 'admin' : 'user'
            });
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};