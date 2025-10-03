import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, clearError } from '../store/slices/authSlice';
import { RootState } from '../store';
import { User } from '../types';
import SocialLoginButtons from '../components/SocialLoginButtons';
import { useI18n } from '../contexts/I18nContext';
import './AuthPage.css';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggingIn, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useI18n();

  // Перенаправление если уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Очистка ошибок при изменении полей
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [formData, dispatch, error]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      errors.email = t('login.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('login.emailInvalid');
    }

    if (!formData.password) {
      errors.password = t('login.passwordRequired');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Очистка ошибки для конкретного поля
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Имитация успешной авторизации
    const mockUser = {
      id: '1',
      name: 'Иван Иванов',
      email: 'akhmet@example.com',
      role: 'client' as const
    };
    
    dispatch(loginSuccess(mockUser));
    navigate('/');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${t('login.login')} через ${provider}`);
    // Здесь будет логика социального входа
    alert(`${t('login.login')} через ${provider} будет добавлена позже`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-text">WorkUp</span>
          </Link>
          <h1>{t('login.title')}</h1>
          <p>{t('login.subtitle')}</p>
          <Link to="/" className="home-button">
            {t('navbar.home')}
          </Link>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('login.emailPlaceholder')}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="field-error">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('login.passwordPlaceholder')}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="field-error">{formErrors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? t('login.submitting') : t('login.submit')}
          </button>
        </form>

        <SocialLoginButtons
          onGoogleLogin={() => handleSocialLogin('Google')}
          onAppleLogin={() => handleSocialLogin('Apple')}
          onFacebookLogin={() => handleSocialLogin('Facebook')}
          disabled={isLoggingIn}
        />

        <div className="auth-footer">
          <Link to="/forgot-password" className="forgot-password">
            {t('login.forgotPassword')}
          </Link>
          <p>
            {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;