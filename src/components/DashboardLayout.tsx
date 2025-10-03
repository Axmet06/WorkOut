import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useI18n } from '../contexts/I18nContext';
import Logo from './Logo';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebar = true }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useI18n();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarLinks = user?.role === 'admin' 
    ? [
        { path: '/admin', label: t('admin.dashboard'), icon: '📊' },
        { path: '/admin/users', label: t('admin.users'), icon: '👥' },
        { path: '/admin/jobs', label: t('admin.jobs'), icon: '💼' },
        { path: '/admin/categories', label: t('admin.categories'), icon: '📂' },
        { path: '/admin/reports', label: t('admin.reports'), icon: '📈' },
        { path: '/admin/settings', label: t('admin.settings'), icon: '⚙️' },
      ]
    : [
        { path: '/profile', label: t('profile.dashboard'), icon: '🏠' },
        { path: '/profile/jobs', label: t('profile.myJobs'), icon: '💼' },
        { path: '/profile/applications', label: t('profile.myApplications'), icon: '📝' },
        { path: '/profile/messages', label: t('profile.messages'), icon: '💬' },
        { path: '/profile/payments', label: t('profile.payments'), icon: '💰' },
        { path: '/profile/settings', label: t('profile.settings'), icon: '⚙️' },
      ];

  return (
    <div className="dashboard-layout">
      {sidebar && (
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <Link to="/" className="sidebar-logo">
              <Logo size="small" />
            </Link>
          </div>
          
          <nav className="sidebar-nav">
            <ul className="sidebar-menu">
              {sidebarLinks.map((link) => (
                <li key={link.path} className="sidebar-item">
                  <Link 
                    to={link.path} 
                    className={`sidebar-link ${isActive(link.path) ? 'sidebar-link-active' : ''}`}
                  >
                    <span className="sidebar-icon">{link.icon}</span>
                    <span className="sidebar-text">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="sidebar-user-info">
                <span className="sidebar-user-name">{user?.name}</span>
                <span className="sidebar-user-role">
                  {user?.role === 'admin' ? t('admin.role') : t('user.role')}
                </span>
              </div>
            </div>
          </div>
        </aside>
      )}
      
      <main className={`dashboard-main ${sidebar ? 'dashboard-main-with-sidebar' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;