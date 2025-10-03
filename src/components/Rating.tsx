import React, { useState } from 'react';
import './Rating.css';

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'small' | 'medium' | 'large';
  count?: number;
  className?: string;
  showValue?: boolean;
}

const Rating: React.FC<RatingProps> = ({ 
  value = 0,
  onChange,
  readonly = false,
  size = 'medium',
  count = 5,
  className = '',
  showValue = false
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const sizeClass = `rating-${size}`;
  const classes = `rating ${sizeClass} ${className}`.trim();

  const handleClick = (ratingValue: number) => {
    if (!readonly && onChange) {
      onChange(ratingValue);
    }
  };

  const handleMouseEnter = (ratingValue: number) => {
    if (!readonly) {
      setHoverValue(ratingValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(0);
    }
  };

  const renderStars = () => {
    return Array.from({ length: count }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (hoverValue || value);
      
      return (
        <button
          key={index}
          className={`rating-star ${isFilled ? 'rating-star-filled' : ''}`}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          aria-label={`Rate ${starValue} out of ${count}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      );
    });
  };

  return (
    <div className={classes}>
      <div className="rating-stars">
        {renderStars()}
      </div>
      {showValue && (
        <span className="rating-value">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;