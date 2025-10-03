import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const { statistics } = useSelector((state: RootState) => state.admin);

  const statsCards = [
    {
      title: 'Всего пользователей',
      value: statistics.totalUsers,
      color: '#89F336',
      icon: '👥'
    },
    {
      title: 'Активных пользователей',
      value: statistics.activeUsers,
      color: '#4CAF50',
      icon: '✅'
    },
    {
      title: 'Заблокированных',
      value: statistics.blockedUsers,
      color: '#F44336',
      icon: '🚫'
    },
    {
      title: 'Всего заданий',
      value: statistics.totalJobs,
      color: '#2196F3',
      icon: '📋'
    },
    {
      title: 'Завершенных заданий',
      value: statistics.completedJobs,
      color: '#4CAF50',
      icon: '✅'
    },
    {
      title: 'Заблокированных заданий',
      value: statistics.blockedJobs,
      color: '#F44336',
      icon: '🚫'
    },
    {
      title: 'Жалоб',
      value: statistics.totalReports,
      color: '#FF9800',
      icon: '⚠️'
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Панель администратора</h2>
        <p>Общая статистика системы</p>
      </div>
      
      <div className="stats-grid">
        {statsCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Активность пользователей</h3>
          <div className="chart-placeholder">
            <p>График активности пользователей</p>
            <div className="chart-bars">
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar" style={{ height: '80%' }}></div>
              <div className="bar" style={{ height: '45%' }}></div>
              <div className="bar" style={{ height: '90%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '85%' }}></div>
              <div className="bar" style={{ height: '75%' }}></div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3>Статус заданий</h3>
          <div className="chart-placeholder">
            <div className="status-pie">
              <div className="pie-segment open" style={{ '--percentage': '40%' } as React.CSSProperties}>
                <span>Открытые (40%)</span>
              </div>
              <div className="pie-segment in-progress" style={{ '--percentage': '35%' } as React.CSSProperties}>
                <span>В работе (35%)</span>
              </div>
              <div className="pie-segment completed" style={{ '--percentage': '25%' } as React.CSSProperties}>
                <span>Завершенные (25%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
