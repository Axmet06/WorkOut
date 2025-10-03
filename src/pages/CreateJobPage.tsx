import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Navbar from '../components/Navbar';
import CreateJobForm from '../components/CreateJobForm';
import Footer from '../components/Footer';
import { useI18n } from '../contexts/I18nContext';
import './CreateJobPage.css';

const CreateJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useI18n();

  useEffect(() => {
    // Проверяем авторизацию
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Проверяем роль пользователя
    if (user?.role !== 'client') {
      navigate('/');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const handleSuccess = () => {
    // После успешного создания задания перенаправляем на профиль
    navigate('/profile');
  };

  if (!isAuthenticated || user?.role !== 'client') {
    return (
      <div className="create-job-page">
        <Navbar />
        <div className="access-denied">
          <div className="access-denied-content">
            <h1>{t('createJob.accessDenied')}</h1>
            <p>{t('createJob.clientOnly')}</p>
            <div className="access-actions">
              <button 
                className="back-btn"
                onClick={() => navigate('/')}
              >
                {t('createJob.returnHome')}
              </button>
              <button 
                className="profile-btn"
                onClick={() => navigate('/profile')}
              >
                {t('createJob.goToProfile')}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="create-job-page">
      <Navbar />
      
      <div className="create-job-container">
        <CreateJobForm onSuccess={handleSuccess} />
      </div>

      <Footer />
    </div>
  );
};

export default CreateJobPage;