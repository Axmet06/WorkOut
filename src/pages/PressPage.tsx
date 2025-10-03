import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const PressPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('press.title')}</h1>
          <p className="page-subtitle">{t('footer.press')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('press.title')}</h2>
          <p>
            {t('press.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">📰</div>
              <h3 className="feature-title">{t('press.releasesTitle')}</h3>
              <p className="feature-description">
                {t('press.releasesDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3 className="feature-title">{t('press.mediaTitle')}</h3>
              <p className="feature-description">
                {t('press.mediaDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3 className="feature-title">{t('press.contactsTitle')}</h3>
              <p className="feature-description">
                {t('press.contactsDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('press.achievements')}</h2>
          <p>
            {t('press.achievementsDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PressPage;