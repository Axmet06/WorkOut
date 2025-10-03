import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const HowItWorksPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('howItWorks.title')}</h1>
          <p className="page-subtitle">{t('footer.howItWorks')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('howItWorks.howItWorks')}</h2>
          <p>
            {t('howItWorks.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">{t('howItWorks.createJobTitle')}</h3>
              <p className="feature-description">
                {t('howItWorks.createJobDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">{t('howItWorks.searchExecutorsTitle')}</h3>
              <p className="feature-description">
                {t('howItWorks.searchExecutorsDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">{t('howItWorks.communicationTitle')}</h3>
              <p className="feature-description">
                {t('howItWorks.communicationDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('howItWorks.benefits')}</h2>
          <p>
            {t('howItWorks.benefitsDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;