import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './EarningsHistoryTab.css';

const EarningsHistoryTab: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { userJobs } = useSelector((state: RootState) => state.jobs);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Фильтруем только завершенные задания
  const completedJobs = userJobs.filter(job => job.status === 'completed');

  // Подсчитываем статистику
  const totalEarnings = completedJobs.reduce((sum, job) => sum + job.price, 0);
  const averageEarnings = completedJobs.length > 0 ? totalEarnings / completedJobs.length : 0;

  // Группируем по месяцам для графика
  const monthlyEarnings = completedJobs.reduce((acc, job) => {
    const month = new Date(job.updatedAt).toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'short' 
    });
    acc[month] = (acc[month] || 0) + job.price;
    return acc;
  }, {} as Record<string, number>);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getMaxEarnings = () => {
    return Math.max(...Object.values(monthlyEarnings), 0);
  };

  const maxEarnings = getMaxEarnings();

  return (
    <div className="earnings-history-tab">
      <div className="earnings-header">
        <h2>История заработка</h2>
        <div className="period-selector">
          <button
            className={`period-btn ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            Неделя
          </button>
          <button
            className={`period-btn ${period === 'month' ? 'active' : ''}`}
            onClick={() => setPeriod('month')}
          >
            Месяц
          </button>
          <button
            className={`period-btn ${period === 'year' ? 'active' : ''}`}
            onClick={() => setPeriod('year')}
          >
            Год
          </button>
        </div>
      </div>

      <div className="earnings-stats">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">{formatPrice(totalEarnings)}</div>
            <div className="stat-label">Общий заработок</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{formatPrice(averageEarnings)}</div>
            <div className="stat-label">Средний чек</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{completedJobs.length}</div>
            <div className="stat-label">Завершенных заданий</div>
          </div>
        </div>
      </div>

      <div className="earnings-chart">
        <h3>График заработка по месяцам</h3>
        {Object.keys(monthlyEarnings).length === 0 ? (
          <div className="empty-chart">
            <div className="empty-icon">📈</div>
            <p>Пока нет данных для отображения</p>
          </div>
        ) : (
          <div className="chart-container">
            {Object.entries(monthlyEarnings).map(([month, earnings]) => {
              const height = maxEarnings > 0 ? (earnings / maxEarnings) * 100 : 0;
              return (
                <div key={month} className="chart-bar">
                  <div 
                    className="bar-fill"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="bar-label">{month}</div>
                  <div className="bar-value">{formatPrice(earnings)}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="recent-earnings">
        <h3>Последние заработки</h3>
        {completedJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💼</div>
            <p>У вас пока нет завершенных заданий</p>
          </div>
        ) : (
          <div className="earnings-list">
            {completedJobs.slice(0, 5).map(job => (
              <div key={job.id} className="earning-item">
                <div className="earning-info">
                  <h4 className="earning-title">{job.title}</h4>
                  <p className="earning-date">
                    {new Date(job.updatedAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className="earning-amount">
                  {formatPrice(job.price)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsHistoryTab;

