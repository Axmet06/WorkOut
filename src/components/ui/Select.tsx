import React, { forwardRef } from 'react';
import './Select.css';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  onChange?: (value: string | number) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  options,
  placeholder,
  fullWidth = false,
  variant = 'default',
  className = '',
  id,
  onChange,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'select';
  const variantClass = `select-${variant}`;
  const fullWidthClass = fullWidth ? 'select-full-width' : '';
  const errorClass = error ? 'select-error' : '';

  const classes = [
    baseClasses,
    variantClass,
    fullWidthClass,
    errorClass,
    className
  ].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (onChange) {
      // Try to convert to number if it's a valid number
      const numValue = Number(value);
      onChange(isNaN(numValue) ? value : numValue);
    }
  };

  return (
    <div className="select-wrapper">
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
        </label>
      )}
      
      <div className="select-container">
        <select
          ref={ref}
          id={selectId}
          className={classes}
          onChange={handleChange}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="select-arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      {error && (
        <div className="select-error-message">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div className="select-helper-text">
          {helperText}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
