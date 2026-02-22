"use client";

import * as React from "react";
import {
  Control,
  FieldValues,
  Path,
} from "react-hook-form";

export type MultiSelectOption<T = unknown> = {
  value: T;
  label: React.ReactNode;
  displayText?: string;
  searchText?: string;
  disabled?: boolean;
};

export type MultiSelectProps<T, TForm extends FieldValues> = Readonly<{
  control: Control<TForm>;
  name: Path<TForm>;

  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;

  options: MultiSelectOption<T>[];
  loading?: boolean;

  placeholder?: string;

  searchable?: boolean;
  searchPlacement?: "inline" | "panel";

  showSelectAll?: boolean;
  selectAllLabel?: React.ReactNode;

  showBadges?: boolean;

  debounceMs?: number;
  onSearch?: (keyword: string) => void | Promise<void>;

  getKey?: (value: T) => string | number;
}>;

export type SelectAllButtonProps = Readonly<{
  allChecked: boolean;
  isIndeterminate: boolean;
  selectAllLabel: React.ReactNode;
  onToggle: () => void;
}>;

export type SelectAllSectionProps = Readonly<{
  showSelectAll: boolean;
  options: MultiSelectOption<unknown>[];
  selectedCount: number;
  selectAllLabel: React.ReactNode;
  onToggle: () => void;
}>;