'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface AutoOption {
  label: string;
  value: string;
}

interface AutocompleteSingleProps {
  options: AutoOption[];
  value: AutoOption | null;
  onChange: (value: AutoOption | null) => void;
  placeholder?: string;
  label?:string;
}

const AutocompleteSingle: React.FC<AutocompleteSingleProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
}) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (option: AutoOption) => {
    onChange(option);
    setInput(option.label);
    setIsOpen(false);
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
    <div className="relative w-full" ref={wrapperRef}>
      {label && (
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
      <input
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={(e) => {
          setInput(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && input && filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white mt-1 w-full max-h-40 overflow-y-auto rounded-md shadow">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export {AutocompleteSingle};
