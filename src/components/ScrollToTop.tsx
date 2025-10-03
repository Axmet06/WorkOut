import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  threshold = 300,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const classes = `scroll-to-top ${isVisible ? 'scroll-to-top-visible' : ''} ${className}`.trim();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={classes}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <span className="scroll-to-top-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    </button>
  );
};

export default ScrollToTop;