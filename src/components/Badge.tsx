import React from 'react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children,
  variant = 'primary',
  size = 'medium',
  className = ''
}) => {
  const variantClass = `badge-${variant}`;
  const sizeClass = `badge-${size}`;
  const classes = `badge ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;