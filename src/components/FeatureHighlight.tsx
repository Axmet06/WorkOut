import React from 'react';
import Button from './ui/Button';
import './FeatureHighlight.css';

interface FeatureHighlightProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  reverse?: boolean;
  className?: string;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ 
  title,
  description,
  image,
  imageAlt = '',
  features,
  primaryAction,
  secondaryAction,
  reverse = false,
  className = ''
}) => {
  const classes = `feature-highlight ${reverse ? 'feature-highlight-reverse' : ''} ${className}`.trim();

  return (
    <div className={classes}>
      <div className="feature-highlight-content">
        <div className="feature-highlight-text">
          <h2 className="feature-highlight-title">{title}</h2>
          <p className="feature-highlight-description">{description}</p>
          
          <div className="feature-highlight-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-highlight-feature">
                <div className="feature-highlight-feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-highlight-feature-content">
                  <h3 className="feature-highlight-feature-title">{feature.title}</h3>
                  <p className="feature-highlight-feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {(primaryAction || secondaryAction) && (
            <div className="feature-highlight-actions">
              {primaryAction && (
                <Button 
                  variant="primary" 
                  size="large" 
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button 
                  variant="secondary" 
                  size="large" 
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="feature-highlight-image">
          {image ? (
            <img src={image} alt={imageAlt} className="feature-highlight-image-element" />
          ) : (
            <div className="feature-highlight-image-placeholder">
              <div className="feature-highlight-image-placeholder-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <div className="feature-highlight-image-placeholder-text">Feature Image</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlight;