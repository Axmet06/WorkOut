import React from 'react';
import Avatar from './Avatar';
import Rating from './Rating';
import './Testimonial.css';

interface TestimonialProps {
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
  date?: string;
  className?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  name,
  role,
  company,
  avatar,
  content,
  rating,
  date,
  className = ''
}) => {
  const classes = `testimonial ${className}`.trim();

  return (
    <div className={classes}>
      <div className="testimonial-header">
        <div className="testimonial-avatar">
          <Avatar 
            src={avatar} 
            name={name} 
            size="medium" 
          />
        </div>
        <div className="testimonial-info">
          <div className="testimonial-name">{name}</div>
          {(role || company) && (
            <div className="testimonial-position">
              {role}{role && company && ' at '}{company}
            </div>
          )}
          {rating !== undefined && (
            <div className="testimonial-rating">
              <Rating value={rating} readonly size="small" />
            </div>
          )}
        </div>
      </div>
      
      <div className="testimonial-content">
        <p className="testimonial-text">"{content}"</p>
      </div>
      
      {date && (
        <div className="testimonial-footer">
          <div className="testimonial-date">{date}</div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;