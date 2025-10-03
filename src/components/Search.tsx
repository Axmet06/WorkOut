import React, { useState, useRef, useEffect } from 'react';
import './Search.css';

interface SearchOption {
  value: string;
  label: string;
  category?: string;
}

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  options?: SearchOption[];
  loading?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'filled' | 'outlined';
  showSuggestions?: boolean;
}

const Search: React.FC<SearchProps> = ({ 
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  options = [],
  loading = false,
  className = '',
  size = 'medium',
  variant = 'default',
  showSuggestions = true
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeClass = `search-${size}`;
  const variantClass = `search-${variant}`;
  const classes = `search ${sizeClass} ${variantClass} ${className}`.trim();

  // Filter options based on search value
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (onChange) onChange(newValue);
    setIsOpen(showSuggestions && newValue.length > 0);
    setFocusedIndex(-1);
  };

  // Handle search submission
  const handleSearch = (searchTerm?: string) => {
    const term = searchTerm || searchValue;
    if (onSearch) onSearch(term);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  // Handle option selection
  const handleOptionSelect = (option: SearchOption) => {
    setSearchValue(option.label);
    if (onChange) onChange(option.label);
    handleSearch(option.label);
    if (inputRef.current) inputRef.current.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleOptionSelect(filteredOptions[focusedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  // Focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={classes} ref={searchRef}>
      <div className="search-input-container">
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(showSuggestions && searchValue.length > 0)}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />
        <button 
          className="search-button"
          onClick={() => handleSearch()}
          disabled={loading}
        >
          {loading ? (
            <span className="search-loading">...</span>
          ) : (
            <span className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          )}
        </button>
      </div>
      
      {isOpen && filteredOptions.length > 0 && (
        <div className="search-suggestions">
          <ul className="search-suggestions-list">
            {filteredOptions.map((option, index) => (
              <li 
                key={option.value}
                className={`search-suggestion-item ${
                  index === focusedIndex ? 'search-suggestion-item-focused' : ''
                }`}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <span className="search-suggestion-label">{option.label}</span>
                {option.category && (
                  <span className="search-suggestion-category">{option.category}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;