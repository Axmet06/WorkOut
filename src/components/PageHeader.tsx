import React from 'react';
import Breadcrumb from './Breadcrumb';
import './PageHeader.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: {
    label: string;
    path?: string;
    active?: boolean;
  }[];
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title,
  subtitle,
  breadcrumbs,
  actions,
  className = ''
}) => {
  const classes = `page-header ${className}`.trim();

  return (
    <div className={classes}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="page-header-breadcrumbs">
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}
      
      <div className="page-header-content">
        <div className="page-header-text">
          <h1 className="page-header-title">{title}</h1>
          {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
        </div>
        
        {actions && (
          <div className="page-header-actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;