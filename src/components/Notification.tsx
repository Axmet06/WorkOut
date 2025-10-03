import React, { useEffect } from 'react';
import './Notification.css';

interface NotificationProps {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
  className?: string;
}

const Notification: React.FC<NotificationProps> = ({ 
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  onClose,
  className = ''
}) => {
  const typeClass = `notification-${type}`;
  const classes = `notification ${typeClass} ${className}`.trim();

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const handleClose = () => {
    onClose(id);
  };

  return (
    <div className={classes} role="alert">
      <div className="notification-content">
        <div className="notification-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✗'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </div>
        <div className="notification-message">
          <h4 className="notification-title">{title}</h4>
          {message && <p className="notification-description">{message}</p>}
        </div>
        <button 
          className="notification-close" 
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;