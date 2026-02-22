'use client';

import React from 'react';

export interface RadioOption {
  label: string;
  value: string;
  imageUrl?: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
  direction?: 'vertical' | 'horizontal';
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selected,
  onChange,
  direction = 'vertical',
}) => {
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={`flex ${isHorizontal ? 'flex-row flex-wrap gap-8' : 'flex-col gap-3'}`}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-start gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            className="mt-1 accent-blue-600"
          />

          <div className="flex items-start gap-3">
            {opt.imageUrl && (
              <img
                src={opt.imageUrl}
                alt={opt.label}
                className="w-10 h-10 object-cover rounded-md"
              />
            )}

            <div>
              <div className="font-medium">{opt.label}</div>

              {opt.description && (
                <div className="text-sm text-gray-500">{opt.description}</div>
              )}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export {RadioGroup};
