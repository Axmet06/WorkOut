import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const PrivacyPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('privacy.title')}</h1>
          <p className="page-subtitle">{t('footer.privacy')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('privacy.title')}</h2>
          <p>
            {t('privacy.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">{t('privacy.dataCollectionTitle')}</h3>
              <p className="feature-description">
                {t('privacy.dataCollectionDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3 className="feature-title">{t('privacy.dataProtectionTitle')}</h3>
              <p className="feature-description">
                {t('privacy.dataProtectionDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">{t('privacy.updatesTitle')}</h3>
              <p className="feature-description">
                {t('privacy.updatesDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('privacy.rights')}</h2>
          <p>
            {t('privacy.rightsDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;