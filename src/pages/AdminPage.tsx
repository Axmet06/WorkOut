import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUsers, setJobs, setReports } from '../store/slices/adminSlice';
import { AdminUser, AdminJob, Report } from '../types';
import Navbar from '../components/Navbar';
import AdminDashboard from '../components/AdminDashboard';
import ModerationPanel from '../components/ModerationPanel';
import UserManagement from '../components/UserManagement';
import ReportsPanel from '../components/ReportsPanel';
import Footer from '../components/Footer';
import { useI18n } from '../contexts/I18nContext';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { t } = useI18n();

  // Моковые данные для админ-панели
  const mockAdminUsers: AdminUser[] = [
    {
      id: '1',
      name: 'Акмат Акматов / Akmat Akmatov',
      email: 'akmat@example.com',
      role: 'client',
      isBlocked: false,
      registrationDate: '2024-01-01',
      lastActivity: '2024-01-15',
      totalJobs: 5,
      completedJobs: 3,
      rating: 4.5
    },
    {
      id: '2',
      name: 'Айгуль Токтосунова / Aigul Toktosunova',
      email: 'aigul@example.com',
      role: 'executor',
      isBlocked: false,
      registrationDate: '2024-01-02',
      lastActivity: '2024-01-14',
      totalJobs: 12,
      completedJobs: 10,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Азамат Бакиров / Azamat Bakirov',
      email: 'azamat@example.com',
      role: 'client',
      isBlocked: true,
      registrationDate: '2024-01-03',
      lastActivity: '2024-01-10',
      totalJobs: 2,
      completedJobs: 0,
      rating: 2.1
    }
  ];

  const mockAdminJobs: AdminJob[] = [
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
      clientId: '1',
      clientName: 'Акмат Акматов / Akmat Akmatov',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      isBlocked: false,
      reportsCount: 0
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
      clientId: '2',
      clientName: 'Айгуль Токтосунова / Aigul Toktosunova',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      isBlocked: false,
      reportsCount: 0
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
      clientId: '3',
      clientName: 'Азамат Бакиров / Azamat Bakirov',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13',
      isBlocked: true,
      reportsCount: 2
    }
  ];

  const mockReports: Report[] = [
    {
      id: '1',
      jobId: '3',
      reporterId: '2',
      reporterName: 'Айгуль Токтосунова / Aigul Toktosunova',
      reason: 'Некорректное содержание',
      description: 'Задание содержит неэтичный контент и нарушает правила платформы.',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      jobId: '3',
      reporterId: '1',
      reporterName: 'Акмат Акматов / Akmat Akmatov',
      reason: 'Спам',
      description: 'Повторяющееся задание, размещенное несколько раз.',
      status: 'reviewed',
      createdAt: '2024-01-14T15:45:00Z',
      reviewedAt: '2024-01-15T09:00:00Z',
      reviewedBy: 'admin'
    }
  ];

  // Проверяем, является ли пользователь администратором
  const isAdmin = user?.role === 'admin' || user?.email === 'admin@example.com';

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      // Загружаем моковые данные
      dispatch(setUsers(mockAdminUsers));
      dispatch(setJobs(mockAdminJobs));
      dispatch(setReports(mockReports));
    }
  }, [dispatch, isAuthenticated, isAdmin]);

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <Navbar />
        <div className="not-authenticated">
          <div className="not-auth-content">
            <h1>{t('admin.accessDenied')}</h1>
            <p>{t('admin.loginRequired')}</p>
            <a href="/login" className="login-link">{t('admin.login')}</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <Navbar />
        <div className="not-authorized">
          <div className="not-auth-content">
            <h1>{t('admin.notAuthorized')}</h1>
            <p>{t('admin.noPermission')}</p>
            <a href="/" className="home-link">{t('admin.returnHome')}</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: t('admin.dashboard'), icon: '📊' },
    { id: 'moderation', label: t('admin.moderation'), icon: '📋' },
    { id: 'users', label: t('admin.userManagement'), icon: '👥' },
    { id: 'reports', label: t('admin.reports'), icon: '⚠️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'moderation':
        return <ModerationPanel />;
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <ReportsPanel />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-sidebar">
          <div className="admin-header">
            <h2>{t('admin.dashboard')}</h2>
            <p>{t('admin.welcome')}, {user?.name}</p>
          </div>
          
          <nav className="admin-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="admin-content">
          {renderTabContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;