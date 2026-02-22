'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, XIcon } from '@/dev/icon/icon';

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
  label?: string;
}

const MultiSelectOption: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase()) &&
      !value.some((v) => v.value === opt.value)
  );

  const toggleSelect = (option: Option) => {
    onChange([...value, option]);
    setQuery('');
  };

  const removeOption = (option: Option) => {
    onChange(value.filter((v) => v.value !== option.value));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {label && (
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="min-h-[44px] flex flex-wrap items-center gap-1 px-2 py-1 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500"
      >
        {value.map((item) => (
          <div
            key={item.value}
            className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
          >
            {item.label}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeOption(item);
              }}
              className="ml-1 hover:text-red-500"
            >
              <XIcon />
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-1 min-w-[100px] border-none focus:outline-none"
          placeholder={value.length === 0 ? placeholder : ''}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <ChevronDownIcon />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white border border-gray-300 shadow-md">
          {filteredOptions.map((opt) => (
            <li
              key={opt.value}
              onClick={() => toggleSelect(opt)}
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

export { MultiSelectOption };
