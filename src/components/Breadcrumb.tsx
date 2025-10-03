import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const classes = `breadcrumb ${className}`.trim();

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.active ? (
              <span className="breadcrumb-link breadcrumb-link-active">
                {item.label}
              </span>
            ) : item.path ? (
              <Link to={item.path} className="breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb-link">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="breadcrumb-separator">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;