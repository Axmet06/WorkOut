import React, { useState } from 'react';
import Modal from './Modal';
import './ImageGallery.css';

interface Image {
  src: string;
  alt: string;
  thumbnail?: string;
  title?: string;
}

interface ImageGalleryProps {
  images: Image[];
  className?: string;
  thumbnailSize?: 'small' | 'medium' | 'large';
  showTitle?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  className = '',
  thumbnailSize = 'medium',
  showTitle = false
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sizeClass = `image-gallery-${thumbnailSize}`;
  const classes = `image-gallery ${sizeClass} ${className}`.trim();

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => {
        if (prev === null) return 0;
        return (prev > 0 ? prev - 1 : images.length - 1);
      });
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => {
        if (prev === null) return 0;
        return (prev < images.length - 1 ? prev + 1 : 0);
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <>
      <div className={classes}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className="image-gallery-item"
            onClick={() => handleImageClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleImageClick(index);
              }
            }}
          >
            <img 
              src={image.thumbnail || image.src} 
              alt={image.alt} 
              className="image-gallery-thumbnail"
            />
            {showTitle && image.title && (
              <div className="image-gallery-title">{image.title}</div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="large"
        className="image-gallery-modal"
      >
        <div 
          className="image-gallery-modal-content"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {selectedImage !== null && (
            <>
              <div className="image-gallery-modal-nav">
                <button 
                  className="image-gallery-modal-button image-gallery-modal-prev"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </button>
                <button 
                  className="image-gallery-modal-button image-gallery-modal-next"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
                <button 
                  className="image-gallery-modal-button image-gallery-modal-close"
                  onClick={handleCloseModal}
                  aria-label="Close gallery"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              
              <div className="image-gallery-modal-image-container">
                <img 
                  src={images[selectedImage].src} 
                  alt={images[selectedImage].alt}
                  className="image-gallery-modal-image"
                />
                <div className="image-gallery-modal-info">
                  <div className="image-gallery-modal-title">
                    {images[selectedImage].title}
                  </div>
                  <div className="image-gallery-modal-counter">
                    {selectedImage + 1} / {images.length}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageGallery;