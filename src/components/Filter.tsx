import React, { useState } from 'react';
import Button from './ui/Button';
import './Filter.css';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'select' | 'range';
  options: FilterOption[];
  multiple?: boolean;
}

interface FilterProps {
  groups: FilterGroup[];
  onApply?: (filters: Record<string, string | string[]>) => void;
  onReset?: () => void;
  className?: string;
}

const Filter: React.FC<FilterProps> = ({ 
  groups, 
  onApply,
  onReset,
  className = ''
}) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});

  const handleFilterChange = (groupId: string, value: string, checked?: boolean) => {
    setActiveFilters(prev => {
      const group = groups.find(g => g.id === groupId);
      
      if (!group) return prev;
      
      if (group.type === 'checkbox') {
        const currentValues = Array.isArray(prev[groupId]) ? prev[groupId] as string[] : [];
        
        if (checked) {
          return { ...prev, [groupId]: [...currentValues, value] };
        } else {
          return { ...prev, [groupId]: currentValues.filter(v => v !== value) };
        }
      } else {
        return { ...prev, [groupId]: value };
      }
    });
  };

  const handleApply = () => {
    if (onApply) {
      onApply(activeFilters);
    }
  };

  const handleReset = () => {
    setActiveFilters({});
    if (onReset) {
      onReset();
    }
  };

  const isFilterActive = (groupId: string, value: string): boolean => {
    const filterValue = activeFilters[groupId];
    
    if (Array.isArray(filterValue)) {
      return filterValue.includes(value);
    }
    
    return filterValue === value;
  };

  return (
    <div className={`filter ${className}`.trim()}>
      <div className="filter-content">
        {groups.map(group => (
          <div key={group.id} className="filter-group">
            <h3 className="filter-group-title">{group.title}</h3>
            
            <div className="filter-options">
              {group.options.map(option => (
                <label key={option.value} className="filter-option">
                  <input
                    type={group.type === 'checkbox' ? 'checkbox' : 'radio'}
                    name={group.id}
                    value={option.value}
                    checked={isFilterActive(group.id, option.value)}
                    onChange={(e) => handleFilterChange(group.id, option.value, e.target.checked)}
                    className="filter-option-input"
                  />
                  <span className="filter-option-label">
                    {option.label}
                    {option.count !== undefined && (
                      <span className="filter-option-count">({option.count})</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="filter-actions">
        <Button variant="primary" onClick={handleApply}>
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Filter;