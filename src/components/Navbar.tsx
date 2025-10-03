import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { useI18n } from '../contexts/I18nContext';
import Logo from './Logo';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useI18n();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const switchLanguage = () => {
    setLanguage(language === 'ru' ? 'ky' : 'ru');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Logo size="medium" />
        </Link>
        
        <div className="navbar-menu" ref={dropdownRef}>
          
          {/* Clients Dropdown */}
          <div className="navbar-dropdown">
            <button 
              className="navbar-link dropdown-toggle"
              onClick={() => toggleDropdown('clients')}
            >
              {t('footer.clients')}
            </button>
            {activeDropdown === 'clients' && (
              <div className="dropdown-menu">
                <Link to="/create-job" className="dropdown-link">
                  {t('footer.postJob')}
                </Link>
                <Link to="/how-it-works" className="dropdown-link">
                  {t('footer.howItWorks')}
                </Link>
                <Link to="/pricing" className="dropdown-link">
                  {t('footer.pricing')}
                </Link>
                <Link to="/support" className="dropdown-link">
                  {t('footer.support')}
                </Link>
              </div>
            )}
          </div>
          
          {/* Executors Dropdown */}
          <div className="navbar-dropdown">
            <button 
              className="navbar-link dropdown-toggle"
              onClick={() => toggleDropdown('executors')}
            >
              {t('footer.executors')}
            </button>
            {activeDropdown === 'executors' && (
              <div className="dropdown-menu">
                <Link to="/jobs" className="dropdown-link">
                  {t('footer.findJob')}
                </Link>
                <Link to="/become-executor" className="dropdown-link">
                  {t('footer.becomeExecutor')}
                </Link>
                <Link to="/tips" className="dropdown-link">
                  {t('footer.tips')}
                </Link>
                <Link to="/success-stories" className="dropdown-link">
                  {t('footer.successStories')}
                </Link>
              </div>
            )}
          </div>
          
          {/* Company Dropdown */}
          <div className="navbar-dropdown">
            <button 
              className="navbar-link dropdown-toggle"
              onClick={() => toggleDropdown('company')}
            >
              {t('footer.company')}
            </button>
            {activeDropdown === 'company' && (
              <div className="dropdown-menu">
                <Link to="/about" className="dropdown-link">
                  {t('footer.about')}
                </Link>
                <Link to="/careers" className="dropdown-link">
                  {t('footer.careers')}
                </Link>
                <Link to="/press" className="dropdown-link">
                  {t('footer.press')}
                </Link>
                <Link to="/contact" className="dropdown-link">
                  {t('footer.contact')}
                </Link>
                
              </div>
            )}
          </div>
          
          {/* Legal Dropdown */}
          <div className="navbar-dropdown">
            <button 
              className="navbar-link dropdown-toggle"
              onClick={() => toggleDropdown('legal')}
            >
              {t('footer.legal')}
            </button>
            {activeDropdown === 'legal' && (
              <div className="dropdown-menu">
                <Link to="/terms" className="dropdown-link">
                  {t('footer.terms')}
                </Link>
                <Link to="/privacy" className="dropdown-link">
                  {t('footer.privacy')}
                </Link>
                <Link to="/faq" className="dropdown-link">
                  {t('footer.faq')}
                </Link>
                <Link to="/dispute" className="dropdown-link">
                  {t('footer.dispute')}
                </Link>
              </div>
            )}
          </div>
          
          {isAuthenticated && (
            <Link to="/profile" className="navbar-link">
              {t('navbar.profile')}
            </Link>
          )}
          
          {isAuthenticated && (
            <Link to="/create-job" className="navbar-link">
              {t('navbar.createJob')}
            </Link>
          )}
          
          {isAuthenticated && (
            <Link to="/chat" className="navbar-link">
              {t('navbar.chat')}
            </Link>
          )}
          
          {isAuthenticated && (user?.role === 'admin' || user?.email === 'admin@example.com') && (
            <Link to="/admin" className="navbar-link admin-link">
              {t('navbar.admin')}
            </Link>
          )}
        </div>
        
        <div className="navbar-auth">
          <button onClick={switchLanguage} className="language-switcher">
            {language === 'ru' ? 'KG' : 'RU'}
          </button>
          
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀'}
          </button>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">{t('navbar.hello')}, {user?.name}!</span>
              <button onClick={handleLogout} className="logout-btn">
                {t('navbar.logout')}
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">
                {t('navbar.login')}
              </Link>
              <Link to="/register" className="auth-btn register-btn">
                {t('navbar.register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;