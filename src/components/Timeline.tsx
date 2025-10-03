import React from 'react';
import './Timeline.css';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'active' | 'pending';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  variant?: 'vertical' | 'horizontal';
}

const Timeline: React.FC<TimelineProps> = ({ 
  items, 
  className = '',
  variant = 'vertical'
}) => {
  const classes = `timeline timeline-${variant} ${className}`.trim();

  return (
    <div className={classes}>
      {items.map((item, index) => {
        const statusClass = item.status ? `timeline-item-${item.status}` : '';
        const isLast = index === items.length - 1;
        
        return (
          <div 
            key={item.id} 
            className={`timeline-item ${statusClass}`}
          >
            <div className="timeline-item-marker">
              <div className="timeline-item-icon">
                {item.icon || (
                  <div className="timeline-item-dot"></div>
                )}
              </div>
              {!isLast && <div className="timeline-item-line"></div>}
            </div>
            
            <div className="timeline-item-content">
              <div className="timeline-item-header">
                <h3 className="timeline-item-title">{item.title}</h3>
                <span className="timeline-item-date">{item.date}</span>
              </div>
              
              {item.description && (
                <p className="timeline-item-description">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;