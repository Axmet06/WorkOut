import React from 'react';
import Card from './Card';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon,
  trend,
  trendValue,
  className = ''
}) => {
  const classes = `stat-card ${className}`.trim();

  return (
    <Card className={classes}>
      <div className="stat-card-content">
        {icon && <div className="stat-card-icon">{icon}</div>}
        <div className="stat-card-info">
          <h3 className="stat-card-title">{title}</h3>
          <p className="stat-card-value">{value}</p>
          {description && <p className="stat-card-description">{description}</p>}
        </div>
        {trend && trendValue && (
          <div className={`stat-card-trend stat-card-trend-${trend}`}>
            {trend === 'up' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18,6 12,12 6,6" />
              </svg>
            )}
            {trend === 'down' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,18 12,12 18,18" />
              </svg>
            )}
            {trendValue}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;