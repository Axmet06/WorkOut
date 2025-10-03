import React from 'react';
import './Form.css';

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
}

const Form: React.FC<FormProps> & {
  Field: React.FC<FormFieldProps>;
  Actions: React.FC<FormActionsProps>;
} = ({ children, onSubmit, className = '' }) => {
  const classes = `form ${className}`.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form className={classes} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

const FormField: React.FC<FormFieldProps> = ({ 
  children, 
  label, 
  error, 
  required = false,
  className = '' 
}) => {
  const classes = `form-field ${className}`.trim();

  return (
    <div className={classes}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <div className="form-control">
        {children}
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

const FormActions: React.FC<FormActionsProps> = ({ children, className = '' }) => {
  const classes = `form-actions ${className}`.trim();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Form.Field = FormField;
Form.Actions = FormActions;

export default Form;