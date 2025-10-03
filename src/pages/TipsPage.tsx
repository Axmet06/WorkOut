import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const TipsPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('tips.title')}</h1>
          <p className="page-subtitle">{t('footer.tips')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('tips.title')}</h2>
          <p>
            {t('tips.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-title">{t('tips.qualityProfileTitle')}</h3>
              <p className="feature-description">
                {t('tips.qualityProfileDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3 className="feature-title">{t('tips.deadlinesTitle')}</h3>
              <p className="feature-description">
                {t('tips.deadlinesDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">{t('tips.communicationTitle')}</h3>
              <p className="feature-description">
                {t('tips.communicationDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('tips.skillsDevelopment')}</h2>
          <p>
            {t('tips.skillsDevelopmentDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TipsPage;