import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUserJobs } from '../store/slices/jobsSlice';
import { setNotifications } from '../store/slices/notificationsSlice';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import Footer from '../components/Footer';
import { Job, Notification } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useI18n();

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

  // Моковые данные для уведомлений
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Новое сообщение',
      message: 'Вы получили новое сообщение от клиента по заданию "Разработка лендинга"',
      type: 'info',
      isRead: false,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Задание завершено',
      message: 'Задание "Дизайн логотипа для кафе" успешно завершено',
      type: 'success',
      isRead: true,
      createdAt: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      title: 'Новый отзыв',
      message: 'Клиент оставил отзыв о вашей работе',
      type: 'success',
      isRead: false,
      createdAt: '2024-01-13T09:20:00Z'
    }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      // Загружаем пользовательские задания
      dispatch(setUserJobs(mockUserJobs));
      
      // Загружаем уведомления
      dispatch(setNotifications(mockNotifications));
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="not-authenticated">
          <div className="not-auth-content">
            <h1>{t('profile.accessDenied')}</h1>
            <p>{t('profile.loginRequired')}</p>
            <a href="/login" className="login-link">{t('profile.login')}</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <ProfileHeader />
        <ProfileTabs />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;