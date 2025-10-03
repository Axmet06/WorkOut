import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './ProfileHeader.css';

const ProfileHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { userJobs } = useSelector((state: RootState) => state.jobs);

  if (!user) return null;

  // Подсчет статистики
  const completedJobs = userJobs.filter(job => job.status === 'completed').length;
  const totalEarnings = userJobs
    .filter(job => job.status === 'completed')
    .reduce((sum, job) => sum + job.price, 0);

  // Имитация рейтинга (в реальном приложении это будет приходить с сервера)
  const rating = 4.8;
  const reviewsCount = 127;

  const getRoleDisplayName = (role: string) => {
    return role === 'client' ? 'Работодатель' : 'Исполнитель';
  };

  const getRoleIcon = (role: string) => {
    return role === 'client' ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  };

  return (
    <div className="profile-header">
      <div className="profile-avatar">
        <div className="avatar-placeholder">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <button className="edit-avatar-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>

      <div className="profile-info">
        <div className="profile-main">
          <h1 className="profile-name">{user.name}</h1>
          <div className="profile-role">
            <span className="role-icon">{getRoleIcon(user.role)}</span>
            <span className="role-text">{getRoleDisplayName(user.role)}</span>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">{rating}</div>
            <div className="stat-label">
              <span className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </span>
              <span className="rating-text">({reviewsCount} отзывов)</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-value">{completedJobs}</div>
            <div className="stat-label">Выполнено заданий</div>
          </div>

          {user.role === 'executor' && (
            <div className="stat-item">
              <div className="stat-value">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0,
                }).format(totalEarnings)}
              </div>
              <div className="stat-label">Заработано</div>
            </div>
          )}
        </div>
      </div>

      <div className="profile-actions">
        <button className="action-btn primary">
          Редактировать профиль
        </button>
        <button className="action-btn secondary">
          Поделиться профилем
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;

