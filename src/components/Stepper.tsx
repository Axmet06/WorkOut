import React from 'react';
import './Stepper.css';

interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  variant?: 'horizontal' | 'vertical';
  onStepChange?: (stepIndex: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ 
  steps, 
  currentStep,
  className = '',
  variant = 'horizontal',
  onStepChange
}) => {
  const classes = `stepper stepper-${variant} ${className}`.trim();

  const handleStepClick = (index: number) => {
    if (onStepChange) {
      onStepChange(index);
    }
  };

  return (
    <div className={classes}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;
        const statusClass = isCompleted 
          ? 'stepper-step-completed' 
          : isCurrent 
            ? 'stepper-step-current' 
            : 'stepper-step-pending';
        
        return (
          <div 
            key={step.id} 
            className={`stepper-step ${statusClass}`}
          >
            <div 
              className="stepper-step-marker"
              onClick={() => handleStepClick(index)}
            >
              {isCompleted ? (
                <div className="stepper-step-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
              ) : (
                <div className="stepper-step-number">{index + 1}</div>
              )}
            </div>
            
            <div className="stepper-step-content">
              <h3 className="stepper-step-title">{step.title}</h3>
              {step.description && (
                <p className="stepper-step-description">{step.description}</p>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className="stepper-step-connector"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;