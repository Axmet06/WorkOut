import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const SupportPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('support.title')}</h1>
          <p className="page-subtitle">{t('footer.support')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('support.title')}</h2>
          <p>
            {t('support.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">❓</div>
              <h3 className="feature-title">{t('support.faqTitle')}</h3>
              <p className="feature-description">
                {t('support.faqDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">{t('support.onlineChatTitle')}</h3>
              <p className="feature-description">
                {t('support.onlineChatDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3 className="feature-title">{t('support.emailTitle')}</h3>
              <p className="feature-description">
                {t('support.emailDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('support.guides')}</h2>
          <p>
            {t('support.guidesDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;