import React from 'react';
import './LoadingOverlay.css';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  fullscreen?: boolean;
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading,
  message,
  fullscreen = false,
  className = ''
}) => {
  if (!isLoading) {
    return null;
  }

  const classes = `loading-overlay ${fullscreen ? 'loading-overlay-fullscreen' : ''} ${className}`.trim();

  return (
    <div className={classes}>
      <div className="loading-overlay-content">
        <div className="loading-overlay-spinner">
          <div className="loading-overlay-spinner-ring"></div>
          <div className="loading-overlay-spinner-ring"></div>
          <div className="loading-overlay-spinner-ring"></div>
          <div className="loading-overlay-spinner-ring"></div>
        </div>
        {message && <p className="loading-overlay-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingOverlay;