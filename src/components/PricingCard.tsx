import React from 'react';
import Button from './ui/Button';
import './PricingCard.css';

interface PricingFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  buttonText?: string;
  onButtonClick?: () => void;
  featured?: boolean;
  className?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title,
  price,
  period,
  description,
  features,
  buttonText = 'Get Started',
  onButtonClick,
  featured = false,
  className = ''
}) => {
  const classes = `pricing-card ${featured ? 'pricing-card-featured' : ''} ${className}`.trim();

  return (
    <div className={classes}>
      {featured && (
        <div className="pricing-card-badge">Most Popular</div>
      )}
      
      <div className="pricing-card-header">
        <h3 className="pricing-card-title">{title}</h3>
        <div className="pricing-card-price">
          <span className="pricing-card-price-amount">{price}</span>
          {period && (
            <span className="pricing-card-price-period">/{period}</span>
          )}
        </div>
        {description && (
          <p className="pricing-card-description">{description}</p>
        )}
      </div>
      
      <ul className="pricing-card-features">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className={`pricing-card-feature ${
              feature.included ? 'pricing-card-feature-included' : 'pricing-card-feature-excluded'
            }`}
            title={feature.description}
          >
            <span className="pricing-card-feature-icon">
              {feature.included ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </span>
            <span className="pricing-card-feature-name">{feature.name}</span>
          </li>
        ))}
      </ul>
      
      <div className="pricing-card-actions">
        <Button 
          variant={featured ? 'primary' : 'secondary'} 
          className="pricing-card-button"
          onClick={onButtonClick}
          fullWidth
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;