import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading debe usarse dentro de LoadingProvider');
    }
    return context;
};

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);
    const setErrorMessage = (message) => setError(message);
    const clearError = () => setError(null);

    return (
        <LoadingContext.Provider value={{
            isLoading,
            error,
            showLoading,
            hideLoading,
            setErrorMessage,
            clearError
        }}>
            {children}
        </LoadingContext.Provider>
    );
};