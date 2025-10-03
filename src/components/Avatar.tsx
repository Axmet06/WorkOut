import React from 'react';
import './Avatar.css';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square' | 'rounded';
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src,
  alt = '',
  name,
  size = 'medium',
  shape = 'circle',
  className = '',
  onClick
}) => {
  const sizeClass = `avatar-${size}`;
  const shapeClass = `avatar-${shape}`;
  const classes = `avatar ${sizeClass} ${shapeClass} ${className}`.trim();

  // Generate initials from name
  const getInitials = (name?: string) => {
    if (!name) return '?';
    
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    const firstName = names[0];
    const lastName = names[names.length - 1];
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Generate background color based on name
  const getBackgroundColor = (name?: string) => {
    if (!name) return '#cbd5e1';
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      '#dbeafe', '#dcfce7', '#fef3c7', '#ffe4e6', '#f0f9ff',
      '#ecfdf5', '#fffbeb', '#f0fdf4', '#fdf2f8', '#f5f3ff'
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (src) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={classes}
        onClick={handleClick}
      />
    );
  }

  return (
    <div 
      className={classes}
      style={{ backgroundColor: getBackgroundColor(name) }}
      onClick={handleClick}
    >
      <span className="avatar-initials">
        {getInitials(name)}
      </span>
    </div>
  );
};

export default Avatar;