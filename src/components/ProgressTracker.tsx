import React from 'react';
import './ProgressTracker.css';

interface ProgressStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'active' | 'pending';
  icon?: React.ReactNode;
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showDescription?: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  steps, 
  className = '',
  variant = 'horizontal',
  showDescription = false
}) => {
  const classes = `progress-tracker progress-tracker-${variant} ${className}`.trim();

  const getStatusText = (status: 'completed' | 'active' | 'pending') => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'active': return 'In Progress';
      case 'pending': return 'Pending';
      default: return '';
    }
  };

  return (
    <div className={classes}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const statusClass = `progress-step-${step.status}`;
        
        return (
          <div key={step.id} className={`progress-step ${statusClass}`}>
            <div className="progress-step-marker">
              <div className="progress-step-icon">
                {step.status === 'completed' ? (
                  step.icon || (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  )
                ) : step.status === 'active' ? (
                  step.icon || (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5" />
                    </svg>
                  )
                ) : (
                  step.icon || (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5" />
                    </svg>
                  )
                )}
              </div>
              {!isLast && <div className="progress-step-line"></div>}
            </div>
            
            <div className="progress-step-content">
              <div className="progress-step-header">
                <h3 className="progress-step-title">{step.title}</h3>
                <span className="progress-step-status">
                  {getStatusText(step.status)}
                </span>
              </div>
              
              {showDescription && step.description && (
                <p className="progress-step-description">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;