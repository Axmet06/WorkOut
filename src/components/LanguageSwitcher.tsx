import React, { useState, useRef, useEffect } from 'react';
import './LanguageSwitcher.css';

interface LanguageOption {
  code: string;
  name: string;
  flag?: string;
}

interface LanguageSwitcherProps {
  languages: LanguageOption[];
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  languages, 
  currentLanguage,
  onLanguageChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const classes = `language-switcher ${className}`.trim();

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (languageCode: string) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={classes} ref={dropdownRef}>
      <button 
        className="language-switcher-button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {currentLang.flag && <span className="language-switcher-flag">{currentLang.flag}</span>}
        <span className="language-switcher-text">{currentLang.name}</span>
        <span className="language-switcher-arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      
      {isOpen && (
        <div className="language-switcher-dropdown">
          {languages.map(language => (
            <button
              key={language.code}
              className={`language-switcher-option ${
                language.code === currentLanguage ? 'language-switcher-option-active' : ''
              }`}
              onClick={() => selectLanguage(language.code)}
            >
              {language.flag && <span className="language-switcher-option-flag">{language.flag}</span>}
              <span className="language-switcher-option-text">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;