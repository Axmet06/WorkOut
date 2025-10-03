import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

interface ThemeSwitcherProps {
  currentTheme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  currentTheme,
  onThemeChange,
  className = ''
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const classes = `theme-switcher ${className}`.trim();

  // Check system preference and current theme
  useEffect(() => {
    const updateDarkMode = () => {
      if (currentTheme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPrefersDark);
      } else {
        setIsDarkMode(currentTheme === 'dark');
      }
    };

    updateDarkMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (currentTheme === 'system') {
        setIsDarkMode(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [currentTheme]);

  const toggleTheme = () => {
    if (currentTheme === 'system') {
      // If system, switch to opposite of system preference
      onThemeChange(isDarkMode ? 'light' : 'dark');
    } else if (currentTheme === 'light') {
      onThemeChange('dark');
    } else {
      onThemeChange('light');
    }
  };

  const getThemeIcon = () => {
    if (currentTheme === 'system') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      );
    }
    
    if (isDarkMode) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    }
    
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  };

  return (
    <button 
      className={classes}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <span className="theme-switcher-icon">{getThemeIcon()}</span>
    </button>
  );
};

export default ThemeSwitcher;