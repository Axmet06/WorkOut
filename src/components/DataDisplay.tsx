import React from 'react';
import Card from './Card';
import './DataDisplay.css';

interface DataItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

interface DataDisplayProps {
  title?: string;
  items: DataItem[];
  columns?: number;
  className?: string;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ 
  title,
  items,
  columns = 3,
  className = ''
}) => {
  const classes = `data-display ${className}`.trim();
  const gridClass = `data-display-grid-${columns}`;

  return (
    <Card className={classes} title={title}>
      <div className={`data-display-grid ${gridClass}`}>
        {items.map((item, index) => (
          <div key={index} className="data-display-item">
            {item.icon && (
              <div className="data-display-icon">{item.icon}</div>
            )}
            <div className="data-display-content">
              <div className="data-display-label">{item.label}</div>
              <div className="data-display-value">{item.value}</div>
              {item.trend && item.trendValue && (
                <div className={`data-display-trend data-display-trend-${item.trend}`}>
                  {item.trend === 'up' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,6 12,12 6,6" />
                    </svg>
                  )}
                  {item.trend === 'down' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,18 12,12 18,18" />
                    </svg>
                  )}
                  {item.trendValue}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DataDisplay;