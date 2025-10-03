import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import '../components/PageTemplate.css';

const SuccessStoriesPage: React.FC = () => {
  const { t } = useI18n();



  const handleJoinPlatform = () => {
    // Scroll to registration section or navigate to registration page
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('successStories.title')}</h1>
          <p className="page-subtitle">{t('footer.successStories')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('successStories.title')}</h2>
          <p>
            {t('successStories.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">👨‍💻</div>
              <h3 className="feature-title">{t('successStories.alexanderTitle')}</h3>
              <p className="feature-description">
                {t('successStories.alexanderDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👩‍🎨</div>
              <h3 className="feature-title">{t('successStories.mariaTitle')}</h3>
              <p className="feature-description">
                {t('successStories.mariaDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👨‍💼</div>
              <h3 className="feature-title">{t('successStories.dmitryTitle')}</h3>
              <p className="feature-description">
                {t('successStories.dmitryDescription')}
              </p>
            </div>
          </div>
          
          <CallToAction
            title={t('successStories.joinUs')}
            description={t('successStories.joinUsDescription')}
            primaryAction={{
              label: 'Присоединиться',
              onClick: handleJoinPlatform
            }}
            secondaryAction={{
              label: 'Узнать больше',
              onClick: () => console.log('Learn more clicked')
            }}
            variant="primary"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;