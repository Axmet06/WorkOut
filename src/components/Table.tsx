import React from 'react';
import './Table.css';

interface TableProps {
  children: React.ReactNode;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
}

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> & {
  Head: React.FC<TableHeadProps>;
  Body: React.FC<TableBodyProps>;
  Row: React.FC<TableRowProps>;
  Header: React.FC<TableHeaderProps>;
  Cell: React.FC<TableCellProps>;
} = ({ 
  children, 
  className = '',
  striped = false,
  hoverable = false
}) => {
  const stripedClass = striped ? 'table-striped' : '';
  const hoverableClass = hoverable ? 'table-hoverable' : '';
  const classes = `table ${stripedClass} ${hoverableClass} ${className}`.trim();

  return (
    <div className="table-container">
      <table className={classes}>
        {children}
      </table>
    </div>
  );
};

const TableHead: React.FC<TableHeadProps> = ({ children, className = '' }) => {
  const classes = `table-head ${className}`.trim();

  return (
    <thead className={classes}>
      {children}
    </thead>
  );
};

const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
  const classes = `table-body ${className}`.trim();

  return (
    <tbody className={classes}>
      {children}
    </tbody>
  );
};

const TableRow: React.FC<TableRowProps> = ({ children, className = '' }) => {
  const classes = `table-row ${className}`.trim();

  return (
    <tr className={classes}>
      {children}
    </tr>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({ children, className = '' }) => {
  const classes = `table-header ${className}`.trim();

  return (
    <th className={classes}>
      {children}
    </th>
  );
};

const TableCell: React.FC<TableCellProps> = ({ children, className = '' }) => {
  const classes = `table-cell ${className}`.trim();

  return (
    <td className={classes}>
      {children}
    </td>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Header = TableHeader;
Table.Cell = TableCell;

export default Table;