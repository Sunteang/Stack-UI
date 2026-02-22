import React, { useEffect, useState } from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength?: number;
  label?: string;
  description?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  maxLength = 250,
  className = '',
  label,
  description,
  value: propValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(propValue?.toString() || '');

  useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue.toString());
    }
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        maxLength={maxLength}
        value={value}
        placeholder={description}
        onChange={handleChange}
        className={`
          w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm
          ${className}
        `}
        {...props}
      />

      <div className="text-sm text-right text-gray-500 mt-1">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export { Textarea };
