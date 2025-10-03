import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUserJobs } from '../store/slices/jobsSlice';
import { Job } from '../types';
import UserJobCard from './UserJobCard';
import './UserJobsTab.css';

const UserJobsTab: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userJobs } = useSelector((state: RootState) => state.jobs);
  const [filter, setFilter] = useState<'all' | 'open' | 'in_progress' | 'completed'>('all');

  // Моковые данные для пользовательских заданий
  const mockUserJobs: Job[] = [
    {
      id: '1',
      title: 'Разработка лендинга для стартапа',
      description: 'Нужен современный лендинг для IT-стартапа. Требования: адаптивный дизайн, быстрая загрузка, интеграция с CRM.',
      category: 'IT и программирование',
      price: 50000,
      currency: 'RUB',
      deadline: '2024-02-15',
      location: 'Москва',
      urgency: 'high',
      status: 'in_progress',
      clientId: user?.id || '1',
      clientName: user?.name || 'Вы',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Дизайн логотипа для кафе',
      description: 'Создание логотипа для нового кафе в центре города. Стиль: современный, минималистичный.',
      category: 'Дизайн',
      price: 15000,
      currency: 'RUB',
      deadline: '2024-02-20',
      location: 'Санкт-Петербург',
      urgency: 'medium',
      status: 'completed',
      clientId: user?.id || '1',
      clientName: user?.name || 'Вы',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Написание статей для блога',
      description: 'Нужен копирайтер для написания 10 статей на тему "Здоровый образ жизни".',
      category: 'Копирайтинг',
      price: 25000,
      currency: 'RUB',
      deadline: '2024-02-25',
      location: 'Удаленно',
      urgency: 'low',
      status: 'open',
      clientId: user?.id || '1',
      clientName: user?.name || 'Вы',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13'
    }
  ];

  useEffect(() => {
    // Загружаем пользовательские задания
    dispatch(setUserJobs(mockUserJobs));
  }, [dispatch]);

  const filteredJobs = userJobs.filter(job => {
    if (filter === 'all') return true;
    return job.status === filter;
  });

  const getStatusCount = (status: string) => {
    return userJobs.filter(job => job.status === status).length;
  };

  const handleJobAction = (jobId: string, action: string) => {
    console.log(`Действие ${action} для задания ${jobId}`);
    // Здесь будет логика обработки действий
  };

  return (
    <div className="user-jobs-tab">
      <div className="jobs-header">
        <h2>Мои задания</h2>
        <div className="jobs-stats">
          <div className="stat-item">
            <span className="stat-number">{getStatusCount('open')}</span>
            <span className="stat-label">Открытые</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getStatusCount('in_progress')}</span>
            <span className="stat-label">В работе</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getStatusCount('completed')}</span>
            <span className="stat-label">Завершенные</span>
          </div>
        </div>
      </div>

      <div className="jobs-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Все ({userJobs.length})
        </button>
        <button
          className={`filter-btn ${filter === 'open' ? 'active' : ''}`}
          onClick={() => setFilter('open')}
        >
          Открытые ({getStatusCount('open')})
        </button>
        <button
          className={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}
          onClick={() => setFilter('in_progress')}
        >
          В работе ({getStatusCount('in_progress')})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Завершенные ({getStatusCount('completed')})
        </button>
      </div>

      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>Задания не найдены</h3>
            <p>
              {filter === 'all' 
                ? 'У вас пока нет заданий' 
                : `Нет заданий со статусом "${filter}"`
              }
            </p>
            {user?.role === 'client' && (
              <button className="create-job-btn">
                Создать первое задание
              </button>
            )}
          </div>
        ) : (
          filteredJobs.map(job => (
            <UserJobCard
              key={job.id}
              job={job}
              onAction={handleJobAction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserJobsTab;

