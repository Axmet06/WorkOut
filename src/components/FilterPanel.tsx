import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateFilter, setFilters } from '../store/slices/jobsSlice';
import { useI18n } from '../contexts/I18nContext';
import './FilterPanel.css';

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.jobs);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const { t, language } = useI18n();

  const categories = [
    t('filter.allCategories'),
    'IT и программирование',
    'Дизайн',
    'Маркетинг',
    'Копирайтинг',
    'Переводы',
    'Администрирование',
    'Консультации',
    'Другое'
  ];

  const urgencyLevels = [
    { value: '', label: t('filter.anyUrgency') },
    { value: 'low', label: t('filter.low') },
    { value: 'medium', label: t('filter.medium') },
    { value: 'high', label: t('filter.high') }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateFilter({ key: 'search', value: searchTerm }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === t('filter.allCategories') ? undefined : e.target.value;
    dispatch(updateFilter({ key: 'category', value }));
  };

  const handleUrgencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilter({ key: 'urgency', value: e.target.value || undefined }));
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    dispatch(updateFilter({ key: field, value: numValue }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilter({ key: 'location', value: e.target.value || undefined }));
  };

  const clearFilters = () => {
    dispatch(setFilters({}));
    setSearchTerm('');
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="filter-panel">
      <div className="filter-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              placeholder={t('filter.searchPlaceholder')}
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              {t('filter.search')}
            </button>
          </div>
        </form>

        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">{t('filter.category')}</label>
            <select
              value={filters.category || t('filter.allCategories')}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">{t('filter.urgency')}</label>
            <select
              value={filters.urgency || ''}
              onChange={handleUrgencyChange}
              className="filter-select"
            >
              {urgencyLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">{t('filter.priceFrom')}</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">{t('filter.priceTo')}</label>
            <input
              type="number"
              placeholder="∞"
              value={filters.maxPrice || ''}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">{t('filter.location')}</label>
            <input
              type="text"
              placeholder={t('filter.locationPlaceholder')}
              value={filters.location || ''}
              onChange={handleLocationChange}
              className="filter-input"
            />
          </div>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="clear-filters-btn">
              {t('filter.clearFilters')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;