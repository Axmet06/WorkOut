import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import './CookieConsent.css';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
  onCustomize?: () => void;
  className?: string;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ 
  onAccept,
  onDecline,
  onCustomize,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const classes = `cookie-consent ${className}`.trim();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    if (onDecline) onDecline();
  };

  const handleCustomize = () => {
    if (onCustomize) onCustomize();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={classes}>
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h3 className="cookie-consent-title">We use cookies</h3>
          <p className="cookie-consent-description">
            We use cookies to improve your experience on our website, 
            analyze traffic, and for marketing purposes. You can choose 
            which cookies to accept or decline.
          </p>
        </div>
        
        <div className="cookie-consent-actions">
          <Button 
            variant="secondary" 
            onClick={handleCustomize}
            className="cookie-consent-button"
          >
            Customize
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleDecline}
            className="cookie-consent-button"
          >
            Decline
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAccept}
            className="cookie-consent-button"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;