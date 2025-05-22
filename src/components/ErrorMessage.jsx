import React from 'react';
import { useLoading } from '../context/LoadingContext';
import './ErrorMessage.css';

const ErrorMessage = () => {
    const { error, clearError } = useLoading();

    if (!error) return null;

    return (
        <div className="error-message">
            <div className="error-content">
                <span className="error-text">{error}</span>
                <button 
                    onClick={clearError} 
                    className="error-close"
                    aria-label="Cerrar mensaje de error"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;