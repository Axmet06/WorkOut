import React from 'react';
import './Loader.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  variant = 'spinner',
  color = 'primary',
  text,
  fullScreen = false,
  className = ''
}) => {
  const baseClasses = 'loader';
  const sizeClass = `loader-${size}`;
  const variantClass = `loader-${variant}`;
  const colorClass = `loader-${color}`;
  const fullScreenClass = fullScreen ? 'loader-fullscreen' : '';

  const classes = [
    baseClasses,
    sizeClass,
    variantClass,
    colorClass,
    fullScreenClass,
    className
  ].filter(Boolean).join(' ');

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className="loader-spinner">
            <div className="spinner-ring"></div>
          </div>
        );
      
      case 'dots':
        return (
          <div className="loader-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className="loader-pulse">
            <div className="pulse-circle"></div>
          </div>
        );
      
      case 'bars':
        return (
          <div className="loader-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={classes}>
      {renderLoader()}
      {text && (
        <div className="loader-text">
          {text}
        </div>
      )}
    </div>
  );
};

export default Loader;
