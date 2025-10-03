import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  type?: 'text' | 'circle' | 'rect' | 'avatar';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  duration?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  type = 'text',
  width,
  height,
  className = '',
  count = 1,
  duration = 1.5
}) => {
  const typeClass = `skeleton-${type}`;
  const classes = `skeleton ${typeClass} ${className}`.trim();

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  // For text skeleton, we want to show multiple lines
  if (type === 'text' && count > 1) {
    return (
      <div className="skeleton-text-group">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={classes}
            style={index === count - 1 ? { ...style, width: style.width ? `calc(${style.width} * 0.7)` : '70%' } : style}
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={classes} 
      style={style}
    />
  );
};

export default Skeleton;