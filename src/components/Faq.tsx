import React, { useState } from 'react';
import './Faq.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
  title?: string;
  className?: string;
}

const Faq: React.FC<FaqProps> = ({ 
  items, 
  title,
  className = ''
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const classes = `faq ${className}`.trim();

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className={classes}>
      {title && <h2 className="faq-title">{title}</h2>}
      
      <div className="faq-list">
        {items.map(item => {
          const isOpen = openItems[item.id];
          
          return (
            <div 
              key={item.id} 
              className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-question-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              
              <div 
                className="faq-answer"
                style={{ maxHeight: isOpen ? '1000px' : '0' }}
              >
                <div className="faq-answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;