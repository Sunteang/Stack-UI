"use client";

import * as React from "react";
import { CheckIcon } from "@/icons";
import { SelectAllButtonProps } from "./types";

export function SelectAllButton({
  allChecked,
  isIndeterminate,
  selectAllLabel,
  onToggle,
}: SelectAllButtonProps) {
  const id = React.useId();

  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left"
    >
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={allChecked || isIndeterminate}
        readOnly
        onClick={(e) => e.stopPropagation()}
      />

      <span
        aria-hidden="true"
        className="h-4 w-4 rounded border flex items-center justify-center
          border-brand-gray-300 bg-white
          peer-checked:bg-brand-green peer-checked:border-brand-green"
      >
        {allChecked && <CheckIcon stroke="#FFFFFF" size={12} />}
        {isIndeterminate && (
          <span className="w-2.5 h-0.5 bg-white rounded-sm" />
        )}
      </span>

      <div className="flex-1">{selectAllLabel}</div>
    </button>
  );
}