import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure, clearError } from '../store/slices/authSlice';
import { RootState } from '../store';
import { User } from '../types';
import SocialLoginButtons from '../components/SocialLoginButtons';
import { useI18n } from '../contexts/I18nContext';
import './AuthPage.css';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'executor' as 'client' | 'executor'
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRegistering, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
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

    if (!formData.name.trim()) {
      errors.name = t('register.nameRequired');
    } else if (formData.name.trim().length < 2) {
      errors.name = t('register.nameMinLength');
    }

    if (!formData.email.trim()) {
      errors.email = t('register.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('register.emailInvalid');
    }

    if (!formData.password) {
      errors.password = t('register.passwordRequired');
    } else if (formData.password.length < 6) {
      errors.password = t('register.passwordMinLength');
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = t('register.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('register.passwordsMismatch');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch(registerStart());

    // Имитация регистрации
    setTimeout(() => {
      // Имитация возможной ошибки
      if (formData.email === 'error@test.com') {
        dispatch(registerFailure(t('register.error')));
        return;
      }

      const mockUser: User = {
        id: '1',
        name: formData.name,
        email: formData.email,
        role: formData.role
      };
      
      dispatch(registerSuccess(mockUser));
      navigate('/');
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${t('register.login')} через ${provider}`);
    // Здесь будет логика социального входа
    alert(`${t('register.login')} через ${provider} будет добавлена позже`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-text">WorkUp</span>
          </Link>
          <h1>{t('register.title')}</h1>
          <p>{t('register.subtitle')}</p>
          <Link to="/" className="home-button">
            {t('navbar.home')}
          </Link>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">{t('register.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('register.namePlaceholder')}
              className={formErrors.name ? 'error' : ''}
            />
            {formErrors.name && <span className="field-error">{formErrors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('register.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('register.emailPlaceholder')}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="field-error">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">{t('register.role')}</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="executor">{t('register.executor')}</option>
              <option value="client">{t('register.client')}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('register.password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('register.passwordPlaceholder')}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="field-error">{formErrors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t('register.confirmPassword')}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('register.confirmPasswordPlaceholder')}
              className={formErrors.confirmPassword ? 'error' : ''}
            />
            {formErrors.confirmPassword && <span className="field-error">{formErrors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isRegistering}
          >
            {isRegistering ? t('register.submitting') : t('register.submit')}
          </button>
        </form>

        <SocialLoginButtons
          onGoogleLogin={() => handleSocialLogin('Google')}
          onAppleLogin={() => handleSocialLogin('Apple')}
          onFacebookLogin={() => handleSocialLogin('Facebook')}
          disabled={isRegistering}
        />

        <div className="auth-footer">
          <p>
            {t('register.hasAccount')} <Link to="/login">{t('register.login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;