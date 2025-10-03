import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Job } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './SimilarJobs.css';

interface SimilarJobsProps {
  currentJob: Job;
  onJobClick: (jobId: string) => void;
}

const SimilarJobs: React.FC<SimilarJobsProps> = ({ currentJob, onJobClick }) => {
  const { list } = useSelector((state: RootState) => state.jobs);
  const { formatName } = useI18n();

  // Фильтруем похожие задания
  const similarJobs = list
    .filter(job => 
      job.id !== currentJob.id && 
      (job.category === currentJob.category || 
       job.location === currentJob.location) &&
      job.status === 'open'
    )
    .slice(0, 4); // Показываем максимум 4 похожих задания

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

  if (similarJobs.length === 0) {
    return null;
  }

  return (
    <div className="similar-jobs">
      <div className="similar-jobs-header">
        <h2>Похожие задания</h2>
        <p>Другие задания в категории "{currentJob.category}"</p>
      </div>

      <div className="similar-jobs-grid">
        {similarJobs.map(job => (
          <div 
            key={job.id} 
            className="similar-job-card"
            onClick={() => onJobClick(job.id)}
          >
            <div className="job-header">
              <h3 className="job-title">{job.title}</h3>
              <div className="job-price">{formatPrice(job.price, job.currency)}</div>
            </div>
            
            <div className="job-meta">
              <span className="job-category">{job.category}</span>
              <span 
                className="job-urgency"
                style={{ color: getUrgencyColor(job.urgency) }}
              >
                {getUrgencyText(job.urgency)}
              </span>
            </div>
            
            <p className="job-description">
              {job.description.length > 100 
                ? `${job.description.substring(0, 100)}...` 
                : job.description
              }
            </p>
            
            <div className="job-details">
              <div className="job-detail">
                <span className="detail-label">📍</span>
                <span className="detail-value">{job.location}</span>
              </div>
              <div className="job-detail">
                <span className="detail-label">⏰</span>
                <span className="detail-value">до {formatDate(job.deadline)}</span>
              </div>
              <div className="job-detail">
                <span className="detail-label">👤</span>
                <span className="detail-value">{formatName(job.clientName)}</span>
              </div>
            </div>
            
            <div className="job-footer">
              <span className="status-badge status-open">Открыто</span>
              <button className="view-btn">
                Посмотреть →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="similar-jobs-footer">
        <button className="view-all-btn">
          Посмотреть все задания в категории "{currentJob.category}"
        </button>
      </div>
    </div>
  );
};

export default SimilarJobs;