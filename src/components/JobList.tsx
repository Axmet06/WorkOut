import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { Job } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './JobList.css';

interface JobListProps {
  onApply: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ onApply }) => {
  const { list } = useSelector((state: RootState) => state.jobs);
  const navigate = useNavigate();
  const { t, formatName } = useI18n();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return t('jobList.high');
      case 'medium': return t('jobList.medium');
      case 'low': return t('jobList.low');
      default: return urgency;
    }
  };

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
        maximumFractionDigits: 0,
      }).format(price);
    } catch (error) {
      // Fallback if currency is still invalid
      return `${price} ${currency}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleJobClick = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  // if (isLoading) {
  //   return (
  //     <div className="job-list">
  //       <div className="loading">
  //         <div className="loading-spinner"></div>
  //         <p>Загрузка заданий...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (list.length === 0) {
    return (
      <div className="job-list">
        <div className="no-jobs">
          <div className="no-jobs-icon">📋</div>
          <h3>{t('jobList.noJobs')}</h3>
          <p>{t('jobList.noJobsDescription')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="job-list">
      <div className="job-list-header">
        <h2>{t('jobList.availableJobs')}</h2>
        <p>{t('jobList.jobsFound')}: {list.length}</p>
      </div>

      <div className="jobs-grid">
        {list.map((job) => (
          <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
            <div className="job-header">
              <h3 className="job-title">{job.title}</h3>
              <div className="job-meta">
                <span 
                  className="urgency-badge"
                  style={{ backgroundColor: getUrgencyColor(job.urgency) }}
                >
                  {getUrgencyText(job.urgency)}
                </span>
                <span className="job-date">{formatDate(job.createdAt)}</span>
              </div>
            </div>

            <div className="job-content">
              <p className="job-description">{job.description}</p>
              
              <div className="job-details">
                <div className="detail-row">
                  <span className="detail-label">{t('jobList.category')}:</span>
                  <span className="detail-value">{job.category}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{t('jobList.price')}:</span>
                  <span className="detail-value price">{formatPrice(job.price, job.currency)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{t('jobList.deadline')}:</span>
                  <span className="detail-value">{formatDate(job.deadline)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{t('jobList.location')}:</span>
                  <span className="detail-value">{job.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{t('jobList.client')}:</span>
                  <span className="detail-value">{formatName(job.clientName)}</span>
                </div>
              </div>
            </div>

            <div className="job-actions">
              <button
                onClick={() => onApply(job.id)}
                className="apply-btn"
              >
                {t('jobList.apply')}
              </button>
              <button className="save-btn">
                {t('jobList.save')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Пагинация удалена из JobsState */}
    </div>
  );
};

export default JobList;