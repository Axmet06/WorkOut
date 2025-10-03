import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const PricingPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('pricing.title')}</h1>
          <p className="page-subtitle">{t('footer.pricing')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('pricing.freePlanTitle')}</h2>
          <p>
            {t('pricing.freePlanDescription')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">🆓</div>
              <h3 className="feature-title">{t('pricing.premiumPlanTitle')}</h3>
              <p className="feature-description">
                {t('pricing.premiumPlanDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-title">{t('pricing.businessPlanTitle')}</h3>
              <p className="feature-description">
                {t('pricing.businessPlanDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3 className="feature-title">{t('pricing.additionalServices')}</h3>
              <p className="feature-description">
                {t('pricing.additionalServicesDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('pricing.additionalServices')}</h2>
          <p>
            {t('pricing.additionalServicesDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;