import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';

const SitemapPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('sitemap.title')}</h1>
          <p className="page-subtitle">{t('footer.sitemap')}</p>
        </div>
        
        <div className="page-body">
          <h2>Сайт картасы</h2>
          <p>
            Ыңгайлуу навигация үчүн биздин веб-сайттын толук түзүлүшү.
          </p>
          
          <div className="page-features">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3 className="feature-title">Башкы бет</h3>
              <p className="feature-description">
                Платформа жөнүндө жана жеткиликтүү тапшырмалар жөнүндө маалымат камтылган негизги бет.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3 className="feature-title">Колдонуучу профили</h3>
              <p className="feature-description">
                Жөндөөлөр, тапшырмалар жана статистика менен жеке кабинет.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3 className="feature-title">Тапшырмалар</h3>
              <p className="feature-description">
                Платформада тапшырмаларды түзүү, издөө жана башкаруу.
              </p>
            </div>
          </div>
          
          <h2>Кошумча бөлүмдөр</h2>
          <p>
            Ыңгайлуулугуңуз үчүн биздин веб-сайттын бардык башка беттери жана бөлүмдөрү.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SitemapPage;