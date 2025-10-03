import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value,
  max = 100,
  label,
  showPercentage = false,
  size = 'medium',
  color = 'primary',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const sizeClass = `progress-${size}`;
  const colorClass = `progress-${color}`;
  const classes = `progress-bar ${sizeClass} ${colorClass} ${className}`.trim();

  return (
    <div className={classes}>
      {(label || showPercentage) && (
        <div className="progress-label">
          {label && <span className="progress-text">{label}</span>}
          {showPercentage && (
            <span className="progress-percentage">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;