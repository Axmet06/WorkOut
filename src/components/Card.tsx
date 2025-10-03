import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({ 
  children,
  title,
  subtitle,
  className = '',
  variant = 'default',
  padding = 'medium',
  shadow = 'medium'
}) => {
  const variantClass = `card-${variant}`;
  const paddingClass = `card-padding-${padding}`;
  const shadowClass = `card-shadow-${shadow}`;
  const classes = `card ${variantClass} ${paddingClass} ${shadowClass} ${className}`.trim();

  return (
    <div className={classes}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;