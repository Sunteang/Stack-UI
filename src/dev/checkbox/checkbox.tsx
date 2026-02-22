"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";

type CheckboxVariant = "primary" | "wing";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  imageUrl?: string;
  variant?: CheckboxVariant;
  indeterminate?: boolean; // for minus state
}

const variantStyles: Record<CheckboxVariant, string> = {
  primary: "bg-blue-600 border-blue-600",
  wing: "bg-[#66B105] border-[#66B105]",
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  imageUrl,
  variant = "primary",
  indeterminate = false,
  className,
  checked,
  disabled,
  ...props
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Handle indeterminate (minus state)
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isActive = checked || indeterminate;

  return (
    <label
      className={clsx(
        "flex items-start gap-3 w-full cursor-pointer text-sm sm:text-base",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {/* Hidden native input */}
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="sr-only peer"
        {...props}
      />

      {/* Custom checkbox UI */}
      <div
        className={clsx(
          "relative mt-1 h-5 w-5 rounded border flex items-center justify-center transition-all duration-200",
          isActive
            ? variantStyles[variant]
            : "border-gray-300 bg-white",
          disabled && "bg-gray-200 border-gray-300"
        )}
      >
        {/* Check icon */}
        {checked && !indeterminate && (
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}

        {/* Minus icon */}
        {indeterminate && (
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 12h14" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="checkbox icon"
              className="w-6 h-6 object-cover rounded"
            />
          )}
          {label && <span className="font-medium">{label}</span>}
        </div>

        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    </label>
  );
};

export default Checkbox;