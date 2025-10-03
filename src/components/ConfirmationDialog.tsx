import React from 'react';
import Modal from './Modal';
import Button from './ui/Button';
import './ConfirmationDialog.css';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ 
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  className = ''
}) => {
  const classes = `confirmation-dialog ${className}`.trim();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      className={classes}
    >
      <div className="confirmation-dialog-content">
        <p className="confirmation-dialog-message">{message}</p>
        <div className="confirmation-dialog-actions">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;