import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
  onSlideChange?: (currentIndex: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ 
  items, 
  autoPlay = false,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  className = '',
  onSlideChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto play
  useEffect(() => {
    if (autoPlay && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPaused, items.length, interval]);

  // Notify slide change
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div 
      className={`carousel ${className}`.trim()}
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="carousel-slide">
              {item.content}
            </div>
          ))}
        </div>
      </div>
      
      {showArrows && items.length > 1 && (
        <>
          <button 
            className="carousel-arrow carousel-arrow-prev"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
          <button 
            className="carousel-arrow carousel-arrow-next"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </>
      )}
      
      {showIndicators && items.length > 1 && (
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${
                index === currentIndex ? 'carousel-indicator-active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;