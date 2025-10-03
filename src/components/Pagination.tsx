import React from 'react';
import Button from './ui/Button';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ''
}) => {
  const classes = `pagination ${className}`.trim();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page, and last page with ellipsis
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push('ellipsis');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show current page with 2 pages on each side
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={classes}>
      <Button
        variant="secondary"
        size="small"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-button pagination-button-prev"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" />
        </svg>
        Назад
      </Button>
      
      <div className="pagination-pages">
        {pageNumbers.map((page, index) => (
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page as number}
              className={`pagination-page ${
                page === currentPage ? 'pagination-page-active' : ''
              }`}
              onClick={() => handlePageClick(page as number)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      <Button
        variant="secondary"
        size="small"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-button pagination-button-next"
      >
        Вперед
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </Button>
    </div>
  );
};

export default Pagination;