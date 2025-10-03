import React from 'react';
import './Alert.css';

interface AlertProps {
  children: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ 
  children,
  type = 'info',
  title,
  closable = false,
  onClose,
  className = ''
}) => {
  const typeClass = `alert-${type}`;
  const classes = `alert ${typeClass} ${className}`.trim();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={classes} role="alert">
      <div className="alert-content">
        <div className="alert-icon">
          {type === 'success' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          )}
          {type === 'error' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          {type === 'warning' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )}
          {type === 'info' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          )}
        </div>
        <div className="alert-message">
          {title && <h4 className="alert-title">{title}</h4>}
          <div className="alert-description">{children}</div>
        </div>
        {closable && (
          <button 
            className="alert-close" 
            onClick={handleClose}
            aria-label="Close alert"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;