import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const ApiPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('api.title')}</h1>
          <p className="page-subtitle">{t('footer.api')}</p>
        </div>
        
        <div className="page-body">
          <h2>WorkUp API</h2>
          <p>
            Биздин платформаны өзүңүздүн колдонмолоруңуз менен кызматтарыңыз менен бириктириңиз.
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">🔌</div>
              <h3 className="feature-title">Документация</h3>
              <p className="feature-description">
                Бардык жеткиликтүү API ыкмалары жана колдонуу мисалдары менен толук документация.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Аутентификация</h3>
              <p className="feature-description">
                APIге кирүү үчүн коопсуз аутентификация жана авторизация.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Чектөөлөр</h3>
              <p className="feature-description">
                APIни колдонууга квоталар жана чектөөлөр, кызматтын туруктуулугун камсыздоо үчүн.
              </p>
            </div>
          </div>
          
          <h2>Ишке киришүү</h2>
          <p>
            Профилиңизде API ачкычын алыңыз жана биздин платформа менен бириктириүүнү бүгүнкүнөн баштаңыз.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApiPage;