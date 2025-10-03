import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const BecomeExecutorPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('becomeExecutor.title')}</h1>
          <p className="page-subtitle">{t('footer.becomeExecutor')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('becomeExecutor.title')}</h2>
          <p>
            {t('becomeExecutor.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">{t('becomeExecutor.registrationTitle')}</h3>
              <p className="feature-description">
                {t('becomeExecutor.registrationDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">{t('becomeExecutor.searchJobsTitle')}</h3>
              <p className="feature-description">
                {t('becomeExecutor.searchJobsDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">{t('becomeExecutor.earningsTitle')}</h3>
              <p className="feature-description">
                {t('becomeExecutor.earningsDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('becomeExecutor.benefits')}</h2>
          <p>
            {t('becomeExecutor.benefitsDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeExecutorPage;