import React, { useState } from 'react';
import Button from './ui/Button';
import './NewsletterSignup.css';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  title = 'Stay Updated',
  description = 'Subscribe to our newsletter to receive updates and news.',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  onSubmit,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const classes = `newsletter-signup ${className}`.trim();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(email);
      }
      
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`${classes} newsletter-signup-success`}>
        <div className="newsletter-signup-success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="8,12 11,15 16,9" />
          </svg>
        </div>
        <h3 className="newsletter-signup-success-title">Thank You!</h3>
        <p className="newsletter-signup-success-message">
          You've been successfully subscribed to our newsletter.
        </p>
      </div>
    );
  }

  return (
    <div className={classes}>
      <div className="newsletter-signup-content">
        <h3 className="newsletter-signup-title">{title}</h3>
        {description && (
          <p className="newsletter-signup-description">{description}</p>
        )}
        
        <form className="newsletter-signup-form" onSubmit={handleSubmit}>
          <div className="newsletter-signup-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className={`newsletter-signup-input ${error ? 'newsletter-signup-input-error' : ''}`}
              disabled={isSubmitting}
            />
            <Button 
              variant="primary" 
              type="submit" 
              loading={isSubmitting}
              disabled={isSubmitting}
              className="newsletter-signup-button"
            >
              {buttonText}
            </Button>
          </div>
          {error && (
            <div className="newsletter-signup-error">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;