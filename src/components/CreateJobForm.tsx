import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addJob, addUserJob } from '../store/slices/jobsSlice';
import { Job } from '../types';
import './CreateJobForm.css';

interface CreateJobFormProps {
  onSuccess?: () => void;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    currency: 'RUB',
    deadline: '',
    location: '',
    description: '',
    urgency: 'medium' as 'low' | 'medium' | 'high'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    'IT и программирование',
    'Дизайн',
    'Маркетинг',
    'Копирайтинг',
    'Переводы',
    'Администрирование',
    'Консультации',
    'Другое'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Низкая' },
    { value: 'medium', label: 'Средняя' },
    { value: 'high', label: 'Высокая' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.title.trim()) {
      newErrors.title = 'Название задания обязательно';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Название должно содержать минимум 5 символов';
    }

    if (!formData.category) {
      newErrors.category = 'Выберите категорию';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Укажите цену';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = 'Цена должна быть положительным числом';
      } else if (price < 100) {
        newErrors.price = 'Минимальная цена 100 рублей';
      }
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Укажите срок выполнения';
    } else {
      const deadline = new Date(formData.deadline);
      const now = new Date();
      if (deadline <= now) {
        newErrors.deadline = 'Срок выполнения должен быть в будущем';
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Укажите местоположение';
    } else if (formData.location.trim().length < 2) {
      newErrors.location = 'Местоположение должно содержать минимум 2 символа';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание задания обязательно';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Описание должно содержать минимум 20 символов';
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

    // Имитация создания задания
    setTimeout(() => {
      const newJob: Job = {
        id: `job_${Date.now()}`,
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        currency: formData.currency,
        deadline: formData.deadline,
        location: formData.location.trim(),
        urgency: formData.urgency,
        status: 'open',
        clientId: user?.id || '1',
        clientName: user?.name || 'Неизвестный',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Добавляем задание в общий список и в пользовательские задания
      dispatch(addJob(newJob));
      dispatch(addUserJob(newJob));

      setIsSubmitting(false);
      setSuccess(true);

      // Сброс формы
      setFormData({
        title: '',
        category: '',
        price: '',
        currency: 'RUB',
        deadline: '',
        location: '',
        description: '',
        urgency: 'medium'
      });

      // Вызываем callback успеха
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    }, 1500);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="success-message">
        <div className="success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="8,12 11,15 16,9" />
          </svg>
        </div>
        <h2>Задание успешно создано!</h2>
        <p>Ваше задание опубликовано и доступно исполнителям.</p>
        <div className="success-actions">
          <button 
            className="view-jobs-btn"
            onClick={() => window.location.href = '/profile'}
          >
            Посмотреть мои задания
          </button>
          <button 
            className="create-another-btn"
            onClick={() => setSuccess(false)}
          >
            Создать еще одно
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-job-form">
      <div className="form-header">
        <h1>Создать новое задание</h1>
        <p>Опишите ваше задание, и исполнители смогут на него откликнуться</p>
      </div>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-section">
          <h2>Основная информация</h2>
          
          <div className="form-group">
            <label htmlFor="title">Название задания *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Краткое и понятное название"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Категория *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={errors.category ? 'error' : ''}
              >
                <option value="">Выберите категорию</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <span className="field-error">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="urgency">Срочность</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
              >
                {urgencyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Условия выполнения</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Цена *</label>
              <div className="price-input-group">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="100"
                  step="100"
                  className={errors.price ? 'error' : ''}
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                >
                  <option value="RUB">₽</option>
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                </select>
              </div>
              {errors.price && <span className="field-error">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Срок выполнения *</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                min={getMinDate()}
                className={errors.deadline ? 'error' : ''}
              />
              {errors.deadline && <span className="field-error">{errors.deadline}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Местоположение *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Город, адрес или 'Удаленно'"
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <span className="field-error">{errors.location}</span>}
            <small>Укажите город, конкретный адрес или "Удаленно"</small>
          </div>
        </div>

        <div className="form-section">
          <h2>Описание задания</h2>
          
          <div className="form-group">
            <label htmlFor="description">Подробное описание *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Опишите детали задания, требования, ожидаемый результат..."
              rows={6}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
            <small>Минимум 20 символов. Чем подробнее описание, тем лучше исполнители поймут задачу.</small>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Отмена
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Создание...' : 'Создать задание'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;

