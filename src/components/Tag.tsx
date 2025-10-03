import React from 'react';
import './Tag.css';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ 
  children,
  variant = 'default',
  size = 'medium',
  closable = false,
  onClose,
  className = ''
}) => {
  const variantClass = `tag-${variant}`;
  const sizeClass = `tag-${size}`;
  const classes = `tag ${variantClass} ${sizeClass} ${className}`.trim();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <span className={classes}>
      <span className="tag-content">{children}</span>
      {closable && (
        <button 
          className="tag-close" 
          onClick={handleClose}
          aria-label="Remove tag"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Tag;