import React from 'react';
import './Divider.css';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: 'default' | 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
}

const Divider: React.FC<DividerProps> = ({ 
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color = 'default',
  className = '',
  children
}) => {
  const orientationClass = `divider-${orientation}`;
  const variantClass = `divider-${variant}`;
  const thicknessClass = `divider-${thickness}`;
  const colorClass = `divider-${color}`;
  const classes = `divider ${orientationClass} ${variantClass} ${thicknessClass} ${colorClass} ${className}`.trim();

  if (children) {
    return (
      <div className={classes}>
        <div className="divider-line divider-line-before"></div>
        <div className="divider-content">{children}</div>
        <div className="divider-line divider-line-after"></div>
      </div>
    );
  }

  return <div className={classes}></div>;
};

export default Divider;