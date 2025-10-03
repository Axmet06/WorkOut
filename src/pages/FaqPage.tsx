import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const FaqPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('faq.title')}</h1>
          <p className="page-subtitle">{t('footer.faq')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('faq.title')}</h2>
          <p>
            {t('faq.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3 className="feature-title">{t('faq.paymentsTitle')}</h3>
              <p className="feature-description">
                {t('faq.paymentsDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">{t('faq.securityTitle')}</h3>
              <p className="feature-description">
                {t('faq.securityDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3 className="feature-title">{t('faq.supportTitle')}</h3>
              <p className="feature-description">
                {t('faq.supportDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('faq.notFound')}</h2>
          <p>
            {t('faq.notFoundDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;