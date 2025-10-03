import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const CareersPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('careers.title')}</h1>
          <p className="page-subtitle">{t('footer.careers')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('careers.title')}</h2>
          <p>
            {t('careers.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3 className="feature-title">{t('careers.vacanciesTitle')}</h3>
              <p className="feature-description">
                {t('careers.vacanciesDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3 className="feature-title">{t('careers.developmentTitle')}</h3>
              <p className="feature-description">
                {t('careers.developmentDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎉</div>
              <h3 className="feature-title">{t('careers.cultureTitle')}</h3>
              <p className="feature-description">
                {t('careers.cultureDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('careers.whyUs')}</h2>
          <p>
            {t('careers.whyUsDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareersPage;