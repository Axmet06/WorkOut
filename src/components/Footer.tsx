import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">WorkUp</h3>
            <p className="footer-description">
              {t('footer.description')}
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Telegram">
                Telegram
              </a>
              <a href="#" className="social-link" aria-label="VKontakte">
                VK
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                Instagram
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('footer.clients')}</h4>
            <ul className="footer-links">
              <li><Link to="/create-job">{t('footer.postJob')}</Link></li>
              <li><Link to="/how-it-works">{t('footer.howItWorks')}</Link></li>
              <li><Link to="/pricing">{t('footer.pricing')}</Link></li>
              <li><Link to="/support">{t('footer.support')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('footer.executors')}</h4>
            <ul className="footer-links">
              <li><Link to="/jobs">{t('footer.findJob')}</Link></li>
              <li><Link to="/become-executor">{t('footer.becomeExecutor')}</Link></li>
              <li><Link to="/tips">{t('footer.tips')}</Link></li>
              <li><Link to="/success-stories">{t('footer.successStories')}</Link></li>
              <li><Link to="/reviews">{t('footer.reviews')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('footer.company')}</h4>
            <ul className="footer-links">
              <li><Link to="/about">{t('footer.about')}</Link></li>
              <li><Link to="/careers">{t('footer.careers')}</Link></li>
              <li><Link to="/press">{t('footer.press')}</Link></li>
              <li><Link to="/contact">{t('footer.contact')}</Link></li>
              
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('footer.legal')}</h4>
            <ul className="footer-links">
              <li><Link to="/terms">{t('footer.terms')}</Link></li>
              <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
              <li><Link to="/faq">{t('footer.faq')}</Link></li>
              <li><Link to="/dispute">{t('footer.dispute')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              {t('footer.copyright')}
            </p>
            <div className="footer-bottom-links">
              <Link to="/sitemap">{t('footer.sitemap')}</Link>
              <Link to="/api">{t('footer.api')}</Link>
              <Link to="/status">{t('footer.status')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;