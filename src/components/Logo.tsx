import React from 'react';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium',
  className = ''
}) => {
  const sizeClass = `logo-${size}`;
  const classes = `logo ${sizeClass} ${className}`.trim();

  return (
    <div className={classes}>
      <svg 
        viewBox="0 0 100 40" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        {/* Professional "W" shape */}
        <path 
          d="M10 30 L25 10 L40 25 L55 10 L70 30" 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Professional "U" shape */}
        <path 
          d="M80 10 L80 25 Q80 30 85 30 Q90 30 90 25 L90 10" 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Professional dot */}
        <circle 
          cx="95" 
          cy="10" 
          r="2" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default Logo;