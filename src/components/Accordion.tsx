import React, { useState } from 'react';
import './Accordion.css';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'accordion-item-open' : ''}`}>
      <button 
        className="accordion-header"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div 
        className="accordion-content"
        style={{ maxHeight: isOpen ? '1000px' : '0' }}
      >
        <div className="accordion-panel">
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>;
} = ({ children, className = '' }) => {
  const classes = `accordion ${className}`.trim();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Accordion.Item = AccordionItem;

export default Accordion;