"use client";

import React, { useEffect, useRef, useState } from "react";
import { XIcon } from "@/dev/icon/icon";

export interface AutoOption {
  label: string;
  value: string;
}

interface AutocompleteMultiProps {
  options: AutoOption[];
  value: AutoOption[];
  onChange: (value: AutoOption[]) => void;
  placeholder?: string;
  label?:string;
}

const AutocompleteMulti: React.FC<AutocompleteMultiProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
}) => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(input.toLowerCase()) &&
      !value.some((v) => v.value === opt.value)
  );

  const handleSelect = (option: AutoOption) => {
    onChange([...value, option]);
    setInput("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemove = (val: string) => {
    onChange(value.filter((v) => v.value !== val));
  };

  return (
    <div className="relative w-full">
      {label && (
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
      <div
        className="relative w-full flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500"
        ref={wrapperRef}
        onClick={() => setIsOpen(true)}
      >
        {value.map((v) => (
          <span
            key={v.value}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
          >
            {v.label}
            <button
              onClick={() => handleRemove(v.value)}
              className="text-blue-500 hover:text-red-500"
              type="button"
            >
              <XIcon/>
            </button>
          </span>
        ))}

        <input
          type="text"
          placeholder={placeholder}
          className="flex-grow min-w-[120px] p-1 border-none focus:outline-none"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
          }}
        />
      </div>
      {input && filteredOptions.length > 0 && (
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

export  {AutocompleteMulti};
