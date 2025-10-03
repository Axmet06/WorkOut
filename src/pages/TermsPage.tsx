import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const TermsPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('terms.title')}</h1>
          <p className="page-subtitle">{t('footer.terms')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('terms.title')}</h2>
          <p>
            {t('terms.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">📜</div>
              <h3 className="feature-title">{t('terms.generalTitle')}</h3>
              <p className="feature-description">
                {t('terms.generalDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">{t('terms.privacyTitle')}</h3>
              <p className="feature-description">
                {t('terms.privacyDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3 className="feature-title">{t('terms.responsibilityTitle')}</h3>
              <p className="feature-description">
                {t('terms.responsibilityDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('terms.changesTitle')}</h2>
          <p>
            {t('terms.changesDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;