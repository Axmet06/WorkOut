import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './ApplyButton.css';

interface ApplyButtonProps {
  jobId: string;
  onApply: (jobId: string, applicationData: ApplicationData) => void;
}

interface ApplicationData {
  message: string;
  proposedPrice?: number;
  estimatedTime: string;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ jobId, onApply }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationData>({
    message: '',
    proposedPrice: undefined,
    estimatedTime: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'proposedPrice' ? (value ? parseFloat(value) : undefined) : value
    }));

    // Очистка ошибки при изменении
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    if (!formData.estimatedTime.trim()) {
      newErrors.estimatedTime = 'Укажите срок выполнения';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Имитация отправки заявки
    setTimeout(() => {
      onApply(jobId, formData);
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({
        message: '',
        proposedPrice: undefined,
        estimatedTime: ''
      });
      setErrors({});
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      message: '',
      proposedPrice: undefined,
      estimatedTime: ''
    });
    setErrors({});
  };

  if (!user || user.role !== 'executor') {
    return null;
  }

  return (
    <>
      <button 
        className="apply-button"
        onClick={() => setIsModalOpen(true)}
      >
        Откликнуться на задание
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Отклик на задание</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-group">
                <label htmlFor="message">
                  Ваше сообщение заказчику *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Расскажите о своем опыте и почему вы подходите для этого задания..."
                  rows={4}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="proposedPrice">
                  Предлагаемая цена (руб.)
                </label>
                <input
                  type="number"
                  id="proposedPrice"
                  name="proposedPrice"
                  value={formData.proposedPrice || ''}
                  onChange={handleInputChange}
                  placeholder="Оставьте пустым, если согласны с указанной ценой"
                  min="0"
                  step="100"
                />
                <small>Если не указано, будет использована цена из задания</small>
              </div>

              <div className="form-group">
                <label htmlFor="estimatedTime">
                  Срок выполнения *
                </label>
                <input
                  type="text"
                  id="estimatedTime"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleInputChange}
                  placeholder="Например: 3 дня, 1 неделя, 2 недели"
                  className={errors.estimatedTime ? 'error' : ''}
                />
                {errors.estimatedTime && <span className="field-error">{errors.estimatedTime}</span>}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить отклик'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyButton;

