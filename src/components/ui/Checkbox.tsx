import React, { forwardRef } from 'react';
import './Checkbox.css';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'filled';
  onChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  helperText,
  fullWidth = false,
  size = 'medium',
  variant = 'default',
  className = '',
  id,
  onChange,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'checkbox';
  const sizeClass = `checkbox-${size}`;
  const variantClass = `checkbox-${variant}`;
  const fullWidthClass = fullWidth ? 'checkbox-full-width' : '';
  const errorClass = error ? 'checkbox-error' : '';

  const classes = [
    baseClasses,
    sizeClass,
    variantClass,
    fullWidthClass,
    errorClass,
    className
  ].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className="checkbox-wrapper">
      <div className="checkbox-container">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className="checkbox-input"
          onChange={handleChange}
          {...props}
        />
        
        <label htmlFor={checkboxId} className={classes}>
          <div className="checkbox-box">
            <div className="checkbox-checkmark">
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                <path
                  d="M1 4.5L4.5 8L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          {label && (
            <span className="checkbox-label-text">
              {label}
            </span>
          )}
        </label>
      </div>
      
      {error && (
        <div className="checkbox-error-message">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div className="checkbox-helper-text">
          {helperText}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
