import React from 'react';
import { Job } from '../types';
import './UserJobCard.css';

interface UserJobCardProps {
  job: Job;
  onAction: (jobId: string, action: string) => void;
}

const UserJobCard: React.FC<UserJobCardProps> = ({ job, onAction }) => {
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
      month: 'short',
      year: 'numeric',
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

  return (
    <div className="user-job-card">
      <div className="job-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.title}</h3>
          <div className="job-meta">
            <span className="job-category">{job.category}</span>
            <span 
              className="job-urgency"
              style={{ color: getUrgencyColor(job.urgency) }}
            >
              {getUrgencyText(job.urgency)}
            </span>
          </div>
        </div>
        <div className="job-price">{formatPrice(job.price, job.currency)}</div>
      </div>

      <p className="job-description">
        {job.description.length > 200 
          ? `${job.description.substring(0, 200)}...` 
          : job.description
        }
      </p>

      <div className="job-details">
        <div className="job-detail">
          <span className="detail-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span className="detail-value">{job.location}</span>
        </div>
        <div className="job-detail">
          <span className="detail-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
          </span>
          <span className="detail-value">до {formatDate(job.deadline)}</span>
        </div>
        <div className="job-detail">
          <span className="detail-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span className="detail-value">создано {formatDate(job.createdAt)}</span>
        </div>
      </div>

      <div className="job-footer">
        <div className="job-status">
          <span 
            className="status-badge"
            style={{ 
              backgroundColor: getStatusColor(job.status),
              color: 'white'
            }}
          >
            {getStatusText(job.status)}
          </span>
        </div>

        <div className="job-actions">
          {job.status === 'open' && (
            <>
              <button 
                className="action-btn edit-btn"
                onClick={() => onAction(job.id, 'edit')}
              >
                Редактировать
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => onAction(job.id, 'delete')}
              >
                Удалить
              </button>
            </>
          )}

          {job.status === 'in_progress' && (
            <button 
              className="action-btn complete-btn"
              onClick={() => onAction(job.id, 'complete')}
            >
              Подтвердить выполнение
            </button>
          )}

          {job.status === 'completed' && (
            <button 
              className="action-btn view-btn"
              onClick={() => onAction(job.id, 'view')}
            >
              Просмотреть результат
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserJobCard;

