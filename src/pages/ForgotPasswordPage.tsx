import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../store/slices/authSlice';
import { RootState } from '../store';
import { useI18n } from '../contexts/I18nContext';
import './AuthPage.css';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useI18n();

  // Перенаправление если уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError(t('forgotPassword.emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('forgotPassword.emailInvalid'));
      return;
    }

    setIsLoading(true);
    setError(null);

    // Имитация отправки письма
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null);
    }
  };

  if (isSubmitted) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <span className="logo-text">WorkUp</span>
            </Link>
            <h1>{t('forgotPassword.successTitle')}</h1>
            <p>{t('forgotPassword.successSubtitle')}</p>
            <Link to="/" className="home-button">
              {t('navbar.home')}
            </Link>
          </div>

          <div className="success-message">
            <div className="success-icon">📧</div>
            <h3>{t('forgotPassword.instructionsSent')}</h3>
            <p>
              {t('forgotPassword.successMessage1')} <strong>{email}</strong>
            </p>
            <p>
              {t('forgotPassword.successMessage2')}
              <button 
                onClick={() => setIsSubmitted(false)}
                className="resend-link"
              >
                {t('forgotPassword.resend')}
              </button>
            </p>
          </div>

          <div className="auth-footer">
            <p>
              <Link to="/login">{t('forgotPassword.backToLogin')}</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-text">WorkUp</span>
          </Link>
          <h1>{t('forgotPassword.title')}</h1>
          <p>{t('forgotPassword.subtitle')}</p>
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
            <label htmlFor="email">{t('forgotPassword.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={t('forgotPassword.emailPlaceholder')}
              className={error ? 'error' : ''}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? t('forgotPassword.submitting') : t('forgotPassword.submit')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <Link to="/login">{t('forgotPassword.backToLogin')}</Link>
          </p>
          <p>
            {t('forgotPassword.noAccount')} <Link to="/register">{t('forgotPassword.register')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;