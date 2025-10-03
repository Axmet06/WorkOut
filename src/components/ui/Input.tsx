import React, { forwardRef } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  variant = 'default',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'input';
  const variantClass = `input-${variant}`;
  const fullWidthClass = fullWidth ? 'input-full-width' : '';
  const errorClass = error ? 'input-error' : '';
  const iconLeftClass = leftIcon ? 'input-with-left-icon' : '';
  const iconRightClass = rightIcon ? 'input-with-right-icon' : '';

  const classes = [
    baseClasses,
    variantClass,
    fullWidthClass,
    errorClass,
    iconLeftClass,
    iconRightClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      
      <div className="input-container">
        {leftIcon && (
          <div className="input-icon input-icon-left">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={classes}
          {...props}
        />
        
        {rightIcon && (
          <div className="input-icon input-icon-right">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <div className="input-error-message">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div className="input-helper-text">
          {helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
