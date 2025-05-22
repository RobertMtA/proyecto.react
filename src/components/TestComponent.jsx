import React from 'react';
import { useAuth } from '../context/AuthContext';

const TestComponent = () => {
    const { user, isAuthenticated } = useAuth();
    
    return (
        <div>
            <h1>Test Component</h1>
            <p>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
            <p>User: {user ? JSON.stringify(user) : 'No user'}</p>
        </div>
    );
};

export default TestComponent;