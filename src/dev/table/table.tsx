'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  size?: 'small' | 'medium' | 'large';
  alignRow?: 'left' | 'center' | 'right';
  alignHeader?: 'left' | 'center' | 'right';
  hasBorder?: boolean;
  stripedTable?: boolean;
  onRowClick?: (row: T) => void;
  onRowSelectionsChange?: (selectedRows: T[]) => void;
  showCheckbox?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  resetTable?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Table = <T extends { id: string | number }>({
  columns,
  data,
  className,
  size = 'medium',
  alignRow = 'left',
  alignHeader = 'left',
  hasBorder = true,
  stripedTable = true,
  onRowClick,
  onRowSelectionsChange,
  showCheckbox = true,
  loading = false,
  emptyMessage = 'No data found.',
  resetTable = false,
  header,
  footer,
}: TableProps<T>) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (resetTable) {
      setSelectedIds([]);
    }
  }, [resetTable]);

  useEffect(() => {
    if (onRowSelectionsChange) {
      const selectedRows = data.filter((row) => selectedIds.includes(row.id));
      onRowSelectionsChange(selectedRows);
    }
  }, [selectedIds, data, onRowSelectionsChange]);

  const handleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((row) => row.id));
    }
  };

  const handleSelectOne = (id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rowSizeClasses = {
    small: 'text-xs py-2',
    medium: 'text-sm py-3',
    large: 'text-base py-4',
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={clsx('rounded-md w-full', className)}>
      {header && (
  <div className="border-x border-t border-gray-300 rounded-t-md p-2 bg-white">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-full">
      {header}
    </div>
  </div>
)}


      <div className="overflow-x-auto w-full">
        <table
          className={clsx(
            'min-w-full table-fixed border-collapse text-gray-800',
            hasBorder && 'border border-gray-200 shadow-sm',
            size === 'small' && 'text-xs',
            size === 'medium' && 'text-sm',
            size === 'large' && 'text-base'
          )}
        >
          <thead
            className={clsx(
              'bg-gray-50 text-gray-600',
              textAlignClasses[alignHeader]
            )}
          >
            <tr>
              {showCheckbox && (
                <th
                  className={clsx(
                    'px-3 py-3 w-[40px] min-w-[40px]',
                    textAlignClasses['center']
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="accent-blue-600 cursor-pointer h-4 w-4"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={clsx(
                    'px-4 py-3 whitespace-nowrap',
                    textAlignClasses[alignHeader]
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (showCheckbox ? 1 : 0)}
                  className="px-4 py-4 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showCheckbox ? 1 : 0)}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={row.id}
                  className={clsx(
                    stripedTable && i % 2 === 1 && 'bg-gray-50',
                    'hover:bg-gray-100 transition cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {showCheckbox && (
                    <td
                      className={clsx(
                        'px-3 py-3 w-[40px] min-w-[40px] text-center'
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelectOne(row.id)}
                        className="accent-blue-600 cursor-pointer h-4 w-4"
                        aria-label={`Select row ${row.id}`}
                      />
                    </td>
                  )}
                  {columns.map((col, i) => (
                    <td
                      key={i}
                      className={clsx(
                        'px-4 whitespace-nowrap',
                        rowSizeClasses[size],
                        textAlignClasses[alignRow]
                      )}
                    >
                      {col.render
                        ? col.render((row as any)[col.key], row)
                        : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {footer && (
        <div className="border-x border-b border-gray-300 rounded-b-md p-2 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-full">
            {footer}
          </div>
        </div>
      )}
    </div>
  );
};

export { Table };
