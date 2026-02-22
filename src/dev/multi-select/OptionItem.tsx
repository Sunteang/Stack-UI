"use client";

import { CheckIcon } from "@/icons";
import * as React from "react";

type OptionItemProps<T> = Readonly<{
  name: string;
  option: any;
  checked: boolean;
  onClick: () => void;
  getKey: (value: T) => string | number;
}>;

export function OptionItem<T>({
  name,
  option,
  checked,
  onClick,
  getKey,
}: OptionItemProps<T>) {
  const checkboxId = `${name}-${String(getKey(option.value))}`;

  return (
    <button
      key={getKey(option.value)}
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left ${
        checked
          ? "bg-brand-gray-50"
          : "hover:bg-brand-gray-50"
      }`}
    >
      <input
        id={checkboxId}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        readOnly
        onClick={(e) => e.stopPropagation()}
      />

      <span
        aria-hidden="true"
        className="h-4 w-4 rounded border flex items-center justify-center
          border-brand-gray-300 bg-white
          peer-checked:bg-brand-green peer-checked:border-brand-green
          peer-focus-visible:ring-2 peer-focus-visible:ring-brand-green/40"
      >
        {checked && (
          <CheckIcon stroke="#FFFFFF" size={12} />
        )}
      </span>

      <div className="flex-1">{option.label}</div>
    </button>
  );
}