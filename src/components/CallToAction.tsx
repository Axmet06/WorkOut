import React from 'react';
import Button from './ui/Button';
import './CallToAction.css';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
}

interface CallToActionProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  testimonials?: Testimonial[];
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

const CallToAction: React.FC<CallToActionProps> = ({ 
  title,
  description,
  primaryAction,
  secondaryAction,
  testimonials,
  className = '',
  variant = 'default'
}) => {
  const variantClass = `cta-${variant}`;
  const classes = `cta ${variantClass} ${className}`.trim();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg 
        key={index}
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill={index < rating ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <polygon 
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" 
          data-testid={`star-${index < rating ? 'filled' : 'empty'}`}
        />
      </svg>
    ));
  };

  return (
    <div className={classes}>
      <div className="cta-content">
        <h2 className="cta-title">{title}</h2>
        {description && <p className="cta-description">{description}</p>}
        
        {testimonials && testimonials.length > 0 && (
          <div className="cta-testimonials">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="cta-actions">
          {primaryAction && (
            <Button 
              variant="primary" 
              size="large" 
              onClick={primaryAction.onClick}
              className="cta-button"
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button 
              variant="secondary" 
              size="large" 
              onClick={secondaryAction.onClick}
              className="cta-button"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallToAction;