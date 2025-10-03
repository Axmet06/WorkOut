import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useI18n } from '../contexts/I18nContext';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useI18n();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('hero.title')}
          </h1>
          <p className="hero-description">
            {t('hero.description')}
          </p>
          <div className="hero-buttons">
            <Link to="/jobs" className="hero-btn primary-btn">
              {t('hero.findJob')}
            </Link>
            {isAuthenticated ? (
              <Link to="/create-job" className="hero-btn secondary-btn">
                {t('hero.postJob')}
              </Link>
            ) : (
              <Link to="/register" className="hero-btn secondary-btn">
                {t('hero.getStarted')}
              </Link>
            )}
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">{t('hero.activeJobs')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">{t('hero.executors')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">{t('hero.successfulProjects')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;