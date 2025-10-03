import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setJobs, deleteJob, blockJob, unblockJob } from '../store/slices/adminSlice';
import { AdminJob } from '../types';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { useI18n } from '../contexts/I18nContext';
import './ModerationPanel.css';

const ModerationPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.admin);
  const { formatName } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<AdminJob | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    currency: 'RUB',
    deadline: '',
    location: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    status: 'open' as 'open' | 'in_progress' | 'completed' | 'cancelled'
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || job.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleBlockJob = (jobId: string) => {
    dispatch(blockJob(jobId));
  };

  const handleUnblockJob = (jobId: string) => {
    dispatch(unblockJob(jobId));
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить это задание?')) {
      dispatch(deleteJob(jobId));
    }
  };

  const handleEditJob = (job: AdminJob) => {
    setCurrentJob(job);
    setEditForm({
      title: job.title,
      description: job.description,
      category: job.category,
      price: job.price.toString(),
      currency: job.currency,
      deadline: job.deadline,
      location: job.location,
      urgency: job.urgency,
      status: job.status
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Since there's no updateJob action, we'll just close the modal for now
    setIsEditModalOpen(false);
    setCurrentJob(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setCurrentJob(null);
    setEditForm({
      title: '',
      description: '',
      category: '',
      price: '',
      currency: 'RUB',
      deadline: '',
      location: '',
      urgency: 'medium',
      status: 'open'
    });
  };

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

  const urgencyOptions = [
    { value: 'low', label: 'Низкая' },
    { value: 'medium', label: 'Средняя' },
    { value: 'high', label: 'Высокая' }
  ];

  const statusOptions = [
    { value: 'open', label: 'Открыто' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'completed', label: 'Завершено' },
    { value: 'cancelled', label: 'Отменено' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#4CAF50';
      case 'in_progress': return '#FF9800';
      case 'completed': return '#2196F3';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Открыто';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return status;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#666';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'Низкая';
      case 'medium': return 'Средняя';
      case 'high': return 'Высокая';
      default: return urgency;
    }
  };

  useEffect(() => {
    dispatch(setJobs([
      {
        id: '1',
        title: 'Разработка сайта',
        description: 'Необходимо разработать корпоративный сайт для компании.',
        category: 'IT и программирование',
        price: 15000,
        currency: 'RUB',
        deadline: '2023-12-31',
        location: 'Москва',
        urgency: 'medium',
        status: 'open',
        clientId: 'client1',
        clientName: 'Иван Иванов / Ivan Ivanov',
        reportsCount: 0,
        isBlocked: false,
        createdAt: '2023-10-01T10:00:00Z',
        updatedAt: '2023-10-01T10:00:00Z'
      },
      {
        id: '2',
        title: 'Дизайн логотипа',
        description: 'Необходимо создать логотип для нового бренда.',
        category: 'Дизайн',
        price: 7000,
        currency: 'RUB',
        deadline: '2023-11-15',
        location: 'Санкт-Петербург',
        urgency: 'high',
        status: 'in_progress',
        clientId: 'client2',
        clientName: 'Мария Петрова / Maria Petrova',
        reportsCount: 1,
        isBlocked: true,
        createdAt: '2023-10-02T10:00:00Z',
        updatedAt: '2023-10-02T10:00:00Z'
      },
      {
        id: '3',
        title: 'Перевод текста',
        description: 'Необходимо перевести текст с английского на русский.',
        category: 'Переводы',
        price: 3000,
        currency: 'RUB',
        deadline: '2023-10-30',
        location: 'Удаленно',
        urgency: 'low',
        status: 'completed',
        clientId: 'client3',
        clientName: 'Алексей Сидоров / Alexey Sidorov',
        reportsCount: 0,
        isBlocked: false,
        createdAt: '2023-10-03T10:00:00Z',
        updatedAt: '2023-10-03T10:00:00Z'
      },
      {
        id: '6',
        title: 'Разработка мобильного приложения',
        description: 'Необходимо разработать мобильное приложение для платформы.',
        category: 'IT и программирование',
        price: 150000,
        currency: 'RUB',
        deadline: '2024-03-31',
        location: 'Бишкек',
        urgency: 'high',
        status: 'open',
        clientId: 'client6',
        clientName: 'Иван Иванов / Ivan Ivanov',
        reportsCount: 0,
        isBlocked: false,
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z'
      }
    ]));
  }, [dispatch]);

  return (
    <div className="moderation-panel">
      <div className="panel-header">
        <h2>Модерация заданий</h2>
        <div className="panel-controls">
          <Input
            placeholder="Поиск заданий..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Select
            options={[
              { value: '', label: 'Все категории' },
              ...categories.map(cat => ({ value: cat, label: cat }))
            ]}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value as string)}
          />
        </div>
      </div>

      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <div className="no-jobs">
            <div className="no-jobs-icon">📋</div>
            <h3>Задания не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-title-section">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-tags">
                    {job.isBlocked && (
                      <span className="tag blocked">Заблокировано</span>
                    )}
                    {job.reportsCount > 0 && (
                      <span className="tag reported">Жалоб: {job.reportsCount}</span>
                    )}
                  </div>
                </div>
                <div className="job-meta">
                  <span className={`status-badge status-${job.status}`}>
                    {getStatusText(job.status)}
                  </span>
                  <span 
                    className="urgency-badge"
                    style={{ color: getUrgencyColor(job.urgency) }}
                  >
                    {getUrgencyText(job.urgency)}
                  </span>
                </div>
              </div>

              <div className="job-content">
                <p className="job-description">{job.description}</p>
                
                <div className="job-details">
                  <div className="detail-item">
                    <span className="detail-label">Категория:</span>
                    <span className="detail-value">{job.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Цена:</span>
                    <span className="detail-value">{job.price.toLocaleString()} {job.currency}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Срок:</span>
                    <span className="detail-value">{new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Клиент:</span>
                    <span className="detail-value">{formatName(job.clientName)}</span>
                  </div>
                  {job.reportsCount > 0 && (
                    <div className="detail-item">
                      <span className="detail-label">Жалоб:</span>
                      <span className="detail-value reports-count">{job.reportsCount}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="job-actions">
                <button
                  onClick={() => handleEditJob(job)}
                  className="action-btn edit-btn"
                >
                  ✏️ Редактировать
                </button>
                
                {job.isBlocked ? (
                  <button
                    onClick={() => handleUnblockJob(job.id)}
                    className="action-btn unblock-btn"
                  >
                    Разблокировать
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockJob(job.id)}
                    className="action-btn block-btn"
                  >
                    Заблокировать
                  </button>
                )}
                
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="action-btn delete-btn"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Модальное окно редактирования */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCancelEdit}
        title="Редактировать задание"
        size="large"
      >
        <div className="edit-job-form">
          <div className="form-row">
            <Input
              label="Название задания"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              fullWidth
            />
          </div>

          <div className="form-row">
            <label className="form-label">Описание</label>
            <textarea
              className="form-textarea"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="form-row">
            <Select
              label="Категория"
              options={categories.map(cat => ({ value: cat, label: cat }))}
              value={editForm.category}
              onChange={(value) => setEditForm({ ...editForm, category: value as string })}
              fullWidth
            />
          </div>

          <div className="form-row">
            <Input
              label="Цена (RUB)"
              type="number"
              value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            />
            <Input
              label="Местоположение"
              value={editForm.location}
              onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
            />
          </div>

          <div className="form-row">
            <Input
              label="Срок выполнения"
              type="date"
              value={editForm.deadline}
              onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
            />
            <Select
              label="Срочность"
              options={urgencyOptions}
              value={editForm.urgency}
              onChange={(value) => setEditForm({ ...editForm, urgency: value as 'low' | 'medium' | 'high' })}
            />
            <Select
              label="Статус"
              options={statusOptions}
              value={editForm.status}
              onChange={(value) => setEditForm({ ...editForm, status: value as 'open' | 'in_progress' | 'completed' | 'cancelled' })}
            />
          </div>

          <div className="form-actions">
            <Button
              variant="secondary"
              onClick={handleCancelEdit}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveEdit}
            >
              Сохранить изменения
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModerationPanel;
