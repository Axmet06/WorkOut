import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateUser } from '../store/slices/authSlice';
import './ProfileSettingsTab.css';

const ProfileSettingsTab: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeSection, setActiveSection] = useState<'profile' | 'password' | 'notifications'>('profile');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    location: '',
    website: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    messageAlerts: true,
    weeklyDigest: true
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибки при изменении
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const validateProfile = () => {
    const newErrors: {[key: string]: string} = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: {[key: string]: string} = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Текущий пароль обязателен';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Новый пароль обязателен';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Пароль должен содержать минимум 6 символов';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (validateProfile()) {
      dispatch(updateUser(profileData));
      alert('Профиль успешно обновлен!');
    }
  };

  const handleChangePassword = () => {
    if (validatePassword()) {
      // Здесь будет логика смены пароля
      alert('Пароль успешно изменен!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleSaveNotifications = () => {
    // Здесь будет логика сохранения настроек уведомлений
    alert('Настройки уведомлений сохранены!');
  };

  return (
    <div className="profile-settings-tab">
      <div className="settings-header">
        <h2>Настройки профиля</h2>
        <div className="settings-nav">
          <button
            className={`nav-btn ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            👤 Личные данные
          </button>
          <button
            className={`nav-btn ${activeSection === 'password' ? 'active' : ''}`}
            onClick={() => setActiveSection('password')}
          >
            🔒 Безопасность
          </button>
          <button
            className={`nav-btn ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            🔔 Уведомления
          </button>
        </div>
      </div>

      <div className="settings-content">
        {activeSection === 'profile' && (
          <div className="settings-section">
            <h3>Личные данные</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Местоположение</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                  placeholder="Город, страна"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="website">Веб-сайт</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profileData.website}
                  onChange={handleProfileChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="bio">О себе</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows={4}
                  placeholder="Расскажите о себе, своих навыках и опыте..."
                />
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveProfile}>
              Сохранить изменения
            </button>
          </div>
        )}

        {activeSection === 'password' && (
          <div className="settings-section">
            <h3>Смена пароля</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="currentPassword">Текущий пароль *</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={errors.currentPassword ? 'error' : ''}
                />
                {errors.currentPassword && <span className="field-error">{errors.currentPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">Новый пароль *</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={errors.newPassword ? 'error' : ''}
                />
                {errors.newPassword && <span className="field-error">{errors.newPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Подтвердите пароль *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            <button className="save-btn" onClick={handleChangePassword}>
              Изменить пароль
            </button>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="settings-section">
            <h3>Настройки уведомлений</h3>
            <div className="notifications-list">
              <div className="notification-item">
                <div className="notification-info">
                  <h4>Email уведомления</h4>
                  <p>Получать уведомления на email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={notifications.emailNotifications}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <h4>Push уведомления</h4>
                  <p>Получать push уведомления в браузере</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    checked={notifications.pushNotifications}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <h4>SMS уведомления</h4>
                  <p>Получать уведомления по SMS</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={notifications.smsNotifications}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <h4>Уведомления о новых заданиях</h4>
                  <p>Получать уведомления о подходящих заданиях</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="jobAlerts"
                    checked={notifications.jobAlerts}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <h4>Уведомления о сообщениях</h4>
                  <p>Получать уведомления о новых сообщениях</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="messageAlerts"
                    checked={notifications.messageAlerts}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <h4>Еженедельная сводка</h4>
                  <p>Получать еженедельную сводку активности</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="weeklyDigest"
                    checked={notifications.weeklyDigest}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveNotifications}>
              Сохранить настройки
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettingsTab;

