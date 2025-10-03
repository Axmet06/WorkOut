import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { blockUser, unblockUser, deleteUser } from '../store/slices/adminSlice';
import { AdminUser } from '../types';
import './UserManagement.css';

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state: RootState) => state.admin);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'blocked' && user.isBlocked) ||
                         (statusFilter === 'active' && !user.isBlocked);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleBlockUser = (userId: string) => {
    dispatch(blockUser(userId));
  };

  const handleUnblockUser = (userId: string) => {
    dispatch(unblockUser(userId));
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      dispatch(deleteUser(userId));
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'client': return 'Клиент';
      case 'executor': return 'Исполнитель';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'client': return '#2196F3';
      case 'executor': return '#4CAF50';
      default: return '#666';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  if (isLoading) {
    return (
      <div className="user-management">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="panel-header">
        <h2>Управление пользователями</h2>
        <p>Просмотр и управление профилями пользователей</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все роли</option>
            <option value="client">Клиенты</option>
            <option value="executor">Исполнители</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все пользователи</option>
            <option value="active">Активные</option>
            <option value="blocked">Заблокированные</option>
          </select>
        </div>
      </div>

      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <div className="no-users">
            <p>Пользователи не найдены</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className={`user-card ${user.isBlocked ? 'blocked' : ''}`}>
              <div className="user-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="user-info">
                <div className="user-header">
                  <h3 className="user-name">{user.name}</h3>
                  <div className="user-status">
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(user.role) }}
                    >
                      {getRoleText(user.role)}
                    </span>
                    {user.isBlocked && (
                      <span className="blocked-badge">Заблокирован</span>
                    )}
                  </div>
                </div>

                <div className="user-details">
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{user.email}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Регистрация:</span>
                    <span className="detail-value">{formatDate(user.registrationDate)}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Последняя активность:</span>
                    <span className="detail-value">{formatDate(user.lastActivity)}</span>
                  </div>

                  <div className="stats-row">
                    <div className="stat-item">
                      <span className="stat-label">Всего заданий:</span>
                      <span className="stat-value">{user.totalJobs}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Завершено:</span>
                      <span className="stat-value">{user.completedJobs}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Рейтинг:</span>
                      <span className="stat-value rating">
                        {getRatingStars(user.rating)} ({user.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="user-actions">
                {user.isBlocked ? (
                  <button
                    onClick={() => handleUnblockUser(user.id)}
                    className="action-btn unblock-btn"
                  >
                    Разблокировать
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockUser(user.id)}
                    className="action-btn block-btn"
                  >
                    Заблокировать
                  </button>
                )}
                
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="action-btn delete-btn"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;
