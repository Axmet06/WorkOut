import React from 'react';
import Card from './Card';
import Button from './ui/Button';
import './FeatureComparison.css';

interface Feature {
  name: string;
  description?: string;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: Record<string, boolean | string>;
  featured?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

interface FeatureComparisonProps {
  plans: Plan[];
  features: Feature[];
  className?: string;
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ 
  plans, 
  features,
  className = ''
}) => {
  const classes = `feature-comparison ${className}`.trim();

  const getFeatureValue = (plan: Plan, featureId: string) => {
    const value = plan.features[featureId];
    if (typeof value === 'boolean') {
      return value ? '✓' : '✗';
    }
    return value || '';
  };

  return (
    <div className={classes}>
      <div className="feature-comparison-header">
        <div className="feature-comparison-placeholder"></div>
        {plans.map(plan => (
          <Card 
            key={plan.id} 
            className={`feature-comparison-plan ${plan.featured ? 'feature-comparison-plan-featured' : ''}`}
            padding="large"
          >
            {plan.featured && (
              <div className="feature-comparison-plan-badge">Most Popular</div>
            )}
            <div className="feature-comparison-plan-header">
              <h3 className="feature-comparison-plan-name">{plan.name}</h3>
              <div className="feature-comparison-plan-price">
                <span className="feature-comparison-plan-price-amount">{plan.price}</span>
                {plan.period && (
                  <span className="feature-comparison-plan-price-period">/{plan.period}</span>
                )}
              </div>
              {plan.description && (
                <p className="feature-comparison-plan-description">{plan.description}</p>
              )}
            </div>
            <Button 
              variant={plan.featured ? 'primary' : 'secondary'} 
              className="feature-comparison-plan-button"
              onClick={plan.onButtonClick}
            >
              {plan.buttonText || 'Get Started'}
            </Button>
          </Card>
        ))}
      </div>
      
      <div className="feature-comparison-body">
        {features.map((feature, index) => (
          <div key={index} className="feature-comparison-row">
            <div className="feature-comparison-feature">
              <div className="feature-comparison-feature-name">{feature.name}</div>
              {feature.description && (
                <div className="feature-comparison-feature-description">{feature.description}</div>
              )}
            </div>
            {plans.map(plan => (
              <div key={plan.id} className="feature-comparison-cell">
                {getFeatureValue(plan, feature.name)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureComparison;