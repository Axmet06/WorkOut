import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import '../components/PageTemplate.css';

const AboutPage: React.FC = () => {
  const { t } = useI18n();



  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('about.title')}</h1>
          <p className="page-subtitle">{t('footer.about')}</p>
        </div>
        
        <div className="page-body">
          <h2>{t('about.title')}</h2>
          <p>
            {t('about.description')}
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">{t('about.missionTitle')}</h3>
              <p className="feature-description">
                {t('about.missionDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👁️</div>
              <h3 className="feature-title">{t('about.goalTitle')}</h3>
              <p className="feature-description">
                {t('about.goalDescription')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">{t('about.valuesTitle')}</h3>
              <p className="feature-description">
                {t('about.valuesDescription')}
              </p>
            </div>
          </div>
          
          <h2>{t('about.history')}</h2>
          <p>
            {t('about.historyDescription')}
          </p>
          
          <CallToAction
            title="Станьте частью нашей истории"
            description="Присоединяйтесь к тысячам пользователей, которые уже достигли успеха с WorkUp"
            primaryAction={{
              label: 'Зарегистрироваться',
              onClick: () => console.log('Register clicked')
            }}
            secondaryAction={{
              label: 'Узнать больше',
              onClick: () => console.log('Learn more clicked')
            }}
            variant="default"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;