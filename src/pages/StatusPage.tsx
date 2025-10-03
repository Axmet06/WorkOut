import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const StatusPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('status.title')}</h1>
          <p className="page-subtitle">{t('footer.status')}</p>
        </div>
        
        <div className="page-body">
          <h2>Кызмат статусу</h2>
          <p>
            Биздин платформанын бардык компоненттеринин учурдагы иштөө абалы.
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3 className="feature-title">Бардык системалар иштеп жатат</h3>
              <p className="feature-description">
                Платформанын бардык негизги кызматтары туруктуу иштеп жатат, үзгүлтүксүз.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Пландаштырылган кароо</h3>
              <p className="feature-description">
                Пландаштырылган техникалык кароо жана жаңыртуулар жөнүндө маалымат.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3 className="feature-title">Инциденттер</h3>
              <p className="feature-description">
                Учурдагы же жакында болгон инциденттер жана аларды чечүү чаралары.
              </p>
            </div>
          </div>
          
          <h2>Инциденттердин тарыхы</h2>
          <p>
            Платформанын иштөөсүнүн ачыктыгы үчүн өткөн инциденттердин архиви жана аларды чечүү убактысы жөнүндө маалымат.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatusPage;