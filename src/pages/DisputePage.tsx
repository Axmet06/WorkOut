import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const DisputePage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('dispute.title')}</h1>
          <p className="page-subtitle">{t('footer.dispute')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('dispute.title')}</h2>
          <p>
            {t('dispute.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">{t('dispute.processTitle')}</h3>
              <p className="feature-description">
                {t('dispute.processDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🧑‍⚖️</div>
              <h3 className="feature-title">{t('dispute.mediationTitle')}</h3>
              <p className="feature-description">
                {t('dispute.mediationDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3 className="feature-title">{t('dispute.arbitrationTitle')}</h3>
              <p className="feature-description">
                {t('dispute.arbitrationDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('dispute.prevention')}</h2>
          <p>
            {t('dispute.preventionDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DisputePage;