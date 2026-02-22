'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@/dev/icon/icon';

export interface Option {
  label: string;
  value: string;
}

interface SingleSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
  placeholder?: string;
  label?: string;
  defaultValue?: Option;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value === null && defaultValue) {
      onChange(defaultValue);
    }
  }, [value, defaultValue, onChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white"
      >
        <span className={!value ? 'text-gray-400' : ''}>
          {value?.label || placeholder}
        </span>
        <ChevronDownIcon />
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white border border-gray-300 shadow-md">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { SingleSelect };
