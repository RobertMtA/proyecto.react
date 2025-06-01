import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && (!user || user.role !== 'admin')) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;