import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Job } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './JobDetail.css';

interface JobDetailProps {
  job: Job;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { formatName } = useI18n();

  const formatPrice = (price: number, currency: string) => {
    // Handle invalid or unsupported currency codes
    let validCurrency = currency;
    
    // Map common currency names to valid ISO codes
    switch (currency.toLowerCase()) {
      case 'сом':
      case 'som':
        validCurrency = 'KGS';
        break;
      case 'руб':
      case 'rub':
        validCurrency = 'RUB';
        break;
      case 'usd':
      case '$':
        validCurrency = 'USD';
        break;
      case 'eur':
      case '€':
        validCurrency = 'EUR';
        break;
      default:
        // If currency is not recognized, default to KGS
        validCurrency = 'KGS';
    }

    try {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: validCurrency,
        minimumFractionDigits: 0,
      }).format(price);
    } catch (error) {
      // Fallback if currency is still invalid
      return `${price} ${currency}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#28a745';
      case 'in_progress': return '#ffc107';
      case 'completed': return '#17a2b8';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Открыто';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'Высокая';
      case 'medium': return 'Средняя';
      case 'low': return 'Низкая';
      default: return 'Не указана';
    }
  };

  const isJobOwner = user?.id === job.clientId;
  const canApply = user?.role === 'executor' && !isJobOwner && job.status === 'open';

  return (
    <div className="job-detail">
      <div className="job-detail-header">
        <div className="job-title-section">
          <h1 className="job-title">{job.title}</h1>
          <div className="job-meta">
            <span className="job-category">{job.category}</span>
            <span 
              className="job-urgency"
              style={{ color: getUrgencyColor(job.urgency) }}
            >
              {getUrgencyText(job.urgency)}
            </span>
            <span 
              className="job-status"
              style={{ 
                backgroundColor: getStatusColor(job.status),
                color: 'white'
              }}
            >
              {getStatusText(job.status)}
            </span>
          </div>
        </div>
        <div className="job-price-section">
          <div className="job-price">{formatPrice(job.price, job.currency)}</div>
          <div className="job-deadline">
            <span className="deadline-label">Срок выполнения:</span>
            <span className="deadline-value">{formatDate(job.deadline)}</span>
          </div>
        </div>
      </div>

      <div className="job-detail-content">
        <div className="job-description-section">
          <h2>Описание задания</h2>
          <div className="job-description">
            {job.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="job-info-section">
          <div className="info-card">
            <h3>Информация о задании</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">📍 Местоположение</span>
                <span className="info-value">{job.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">👤 Заказчик</span>
                <span className="info-value">{formatName(job.clientName)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">📅 Создано</span>
                <span className="info-value">{formatDate(job.createdAt)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">🔄 Обновлено</span>
                <span className="info-value">{formatDate(job.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="location-card">
            <h3>Местоположение</h3>
            <div className="map-placeholder">
              <div className="map-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p>Карта для {job.location}</p>
              <small>Интеграция с картами будет добавлена позже</small>
            </div>
          </div>
        </div>
      </div>

      <div className="job-detail-footer">
        <div className="job-actions">
          {canApply && (
            <button className="apply-btn primary">
              Откликнуться на задание
            </button>
          )}
          
          {isJobOwner && job.status === 'open' && (
            <div className="owner-actions">
              <button className="action-btn edit">
                Редактировать
              </button>
              <button className="action-btn delete">
                Удалить
              </button>
            </div>
          )}

          {isJobOwner && job.status === 'in_progress' && (
            <button className="action-btn complete">
              Подтвердить выполнение
            </button>
          )}

          <button className="action-btn chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Написать сообщение
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;