import React from 'react';
import { useLoading } from '../../context/LoadingContext';
import './Loading.css';

const Loading = () => {
    const { isLoading } = useLoading();

    return (
        <div className={`loading-overlay ${isLoading ? 'active' : ''}`}>
            <div className="loading-spinner"></div>
        </div>
    );
};

export default Loading;