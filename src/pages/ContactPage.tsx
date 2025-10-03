import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const ContactPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('contact.title')}</h1>
          <p className="page-subtitle">{t('footer.contact')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('contact.title')}</h2>
          <p>
            {t('contact.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3 className="feature-title">{t('contact.officeTitle')}</h3>
              <p className="feature-description">
                {t('contact.officeDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3 className="feature-title">{t('contact.phoneTitle')}</h3>
              <p className="feature-description">
                {t('contact.phoneDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3 className="feature-title">{t('contact.emailTitle')}</h3>
              <p className="feature-description">
                {t('contact.emailDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('contact.form')}</h2>
          <p>
            {t('contact.formDescription')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;