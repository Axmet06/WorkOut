import React, { useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  children, 
  isOpen, 
  onClose, 
  title,
  size = 'medium',
  className = ''
}) => {
  const sizeClass = `modal-${size}`;
  const classes = `modal ${sizeClass} ${className} ${isOpen ? 'modal-open' : ''}`.trim();

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={classes}>
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;