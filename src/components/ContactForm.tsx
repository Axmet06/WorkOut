import React, { useState } from 'react';
import Button from './ui/Button';
import './ContactForm.css';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  onSubmit,
  className = ''
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const classes = `contact-form ${className}`.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      // Handle error if needed
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`${classes} contact-form-success`}>
        <div className="contact-form-success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="8,12 11,15 16,9" />
          </svg>
        </div>
        <h3 className="contact-form-success-title">Thank You!</h3>
        <p className="contact-form-success-message">
          Your message has been sent successfully. We'll get back to you soon.
        </p>
        <Button 
          variant="primary" 
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <div className="contact-form-group">
          <label htmlFor="name" className="contact-form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`contact-form-input ${errors.name ? 'contact-form-input-error' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <div className="contact-form-error">{errors.name}</div>
          )}
        </div>
        
        <div className="contact-form-group">
          <label htmlFor="email" className="contact-form-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`contact-form-input ${errors.email ? 'contact-form-input-error' : ''}`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <div className="contact-form-error">{errors.email}</div>
          )}
        </div>
      </div>
      
      <div className="contact-form-group">
        <label htmlFor="subject" className="contact-form-label">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`contact-form-input ${errors.subject ? 'contact-form-input-error' : ''}`}
          placeholder="Enter subject"
        />
        {errors.subject && (
          <div className="contact-form-error">{errors.subject}</div>
        )}
      </div>
      
      <div className="contact-form-group">
        <label htmlFor="message" className="contact-form-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`contact-form-textarea ${errors.message ? 'contact-form-input-error' : ''}`}
          placeholder="Enter your message"
        />
        {errors.message && (
          <div className="contact-form-error">{errors.message}</div>
        )}
      </div>
      
      <div className="contact-form-actions">
        <Button 
          variant="primary" 
          type="submit" 
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;