import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Sidebar.css';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  items?: SidebarItem[];
  badge?: string | number;
}

interface SidebarProps {
  items: SidebarItem[];
  logo?: boolean;
  logoText?: string;
  className?: string;
  collapsible?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  logo = true,
  logoText = 'Dashboard',
  className = '',
  collapsible = false
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const classes = `sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${className}`.trim();

  const toggleCollapse = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const renderItems = (items: SidebarItem[], level = 0) => {
    return items.map(item => {
      const hasChildren = item.items && item.items.length > 0;
      const isOpen = openItems[item.id];
      const itemClasses = `sidebar-item sidebar-item-level-${level} ${
        isActive(item.path) ? 'sidebar-item-active' : ''
      } ${hasChildren && isOpen ? 'sidebar-item-open' : ''}`;

      return (
        <div key={item.id} className={itemClasses}>
          {item.path ? (
            <Link 
              to={item.path} 
              className="sidebar-link"
              title={collapsed ? item.label : undefined}
            >
              {item.icon && <span className="sidebar-icon">{item.icon}</span>}
              {!collapsed && <span className="sidebar-text">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </Link>
          ) : (
            <button 
              className="sidebar-button"
              onClick={() => toggleItem(item.id)}
              title={collapsed ? item.label : undefined}
            >
              {item.icon && <span className="sidebar-icon">{item.icon}</span>}
              {!collapsed && <span className="sidebar-text">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
              {!collapsed && hasChildren && (
                <span className={`sidebar-arrow ${isOpen ? 'sidebar-arrow-open' : ''}`}>
                  ▼
                </span>
              )}
            </button>
          )}
          
          {hasChildren && isOpen && !collapsed && (
            <div className="sidebar-submenu">
              {renderItems(item.items!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={classes}>
      {logo && (
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <Logo size={collapsed ? 'small' : 'medium'} />
            {!collapsed && <span className="sidebar-logo-text">{logoText}</span>}
          </Link>
          {collapsible && (
            <button 
              className="sidebar-collapse-button"
              onClick={toggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? '»' : '«'}
            </button>
          )}
        </div>
      )}
      
      <nav className="sidebar-nav">
        {renderItems(items)}
      </nav>
    </div>
  );
};

export default Sidebar;