import React from 'react';
import Button from './ui/Button';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title,
  description,
  icon,
  action,
  secondaryAction,
  className = ''
}) => {
  const classes = `empty-state ${className}`.trim();

  return (
    <div className={classes}>
      <div className="empty-state-content">
        {icon && <div className="empty-state-icon">{icon}</div>}
        <h2 className="empty-state-title">{title}</h2>
        {description && <p className="empty-state-description">{description}</p>}
        {(action || secondaryAction) && (
          <div className="empty-state-actions">
            {action && (
              <Button variant="primary" onClick={action.onClick}>
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="secondary" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;