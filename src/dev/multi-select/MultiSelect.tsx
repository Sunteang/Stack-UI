"use client";

import { AsteriskIcon, ArrowDownIcon, CheckIcon, CloseIcon } from "@/icons";
import { Badge } from "@/dev";
import * as React from "react";
import {
  Control,
  Controller,
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

export function defaultGetKey<T>(v: T): string | number {
  if (typeof v === "string" || typeof v === "number") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

export type SelectAllButtonProps = Readonly<{
  allChecked: boolean;
  isIndeterminate: boolean;
  selectAllLabel: React.ReactNode;
  onToggle: () => void;
}>;

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
      className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left`}
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
        className={[
          "h-4 w-4 rounded border flex items-center justify-center",
          "border-brand-gray-300 bg-white",
          "peer-checked:bg-brand-green peer-checked:border-brand-green",
        ].join(" ")}
      >
        {allChecked && (
          <CheckIcon stroke="#FFFFFF" size={12} />
        )}

        {isIndeterminate && (
          <span className="w-2.5 h-0.5 bg-white rounded-sm" />
        )}
      </span>

      <div className="flex-1">
        {selectAllLabel}
      </div>
    </button>
  );
}

export type SelectAllSectionProps = Readonly<{
  showSelectAll: boolean;
  options: MultiSelectOption<unknown>[];
  selectedCount: number;
  selectAllLabel: React.ReactNode;
  onToggle: () => void;
}>;

function SelectAllSection({
  showSelectAll,
  options,
  selectedCount,
  selectAllLabel,
  onToggle,
}: SelectAllSectionProps) {
  if (!showSelectAll) return null;

  const total = options.length;
  const allChecked = total > 0 && selectedCount === total;
  const isIndeterminate =
    selectedCount > 0 && selectedCount < total;

  return (
    <SelectAllButton
      allChecked={allChecked}
      isIndeterminate={isIndeterminate}
      selectAllLabel={selectAllLabel}
      onToggle={onToggle}
    />
  );
}

export function MultiSelect<T, TForm extends FieldValues>({
  control,
  name,

  label,
  required = false,
  disabled = false,
  errorMessage,

  options,
  loading = false,

  placeholder = "Select...",
  searchable = false,
  searchPlacement = "panel",

  showSelectAll = false,
  selectAllLabel = "Select All",

  showBadges = false,

  debounceMs = 500,
  onSearch,

  getKey = defaultGetKey,
}: MultiSelectProps<T, TForm>) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const isInlineSearch =
    searchable && searchPlacement === "inline";

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  const lastKeywordRef = React.useRef<string>("");

  React.useEffect(() => {
    if (!onSearch) return;
    if (!open) return;

    const keyword = query.trim();
    if (lastKeywordRef.current === keyword) return;

    const t = setTimeout(() => {
      lastKeywordRef.current = keyword;
      onSearch(keyword);
    }, debounceMs);

    return () => clearTimeout(t);
  }, [query, open, debounceMs, onSearch]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value: T[] = Array.isArray(field.value)
          ? field.value
          : [];

        const valueKeySet = new Set(
          value.map(getKey)
        );

        const selectedOptions = options.filter((o) =>
          valueKeySet.has(getKey(o.value))
        );

        function toggleOption(opt: MultiSelectOption<T>) {
          if (opt.disabled) return;

          const k = getKey(opt.value);
          const next = new Map(
            value.map((v) => [getKey(v), v] as const)
          );

          if (next.has(k)) next.delete(k);
          else next.set(k, opt.value);

          field.onChange(Array.from(next.values()));

          if (isInlineSearch) {
            setQuery("");
            inputRef.current?.focus();
          }
        }

        function toggleSelectAll() {
          if (value.length === options.length) {
            field.onChange([]);
          } else {
            field.onChange(options.map((o) => o.value));
          }
        }

        const filteredOptions =
          searchable && !onSearch && query.trim()
            ? options.filter((o) =>
                (o.searchText ?? "")
                  .toLowerCase()
                  .includes(query.toLowerCase())
              )
            : options;

            const selectedText = selectedOptions
              .map((o) => {
                if (o.displayText) return o.displayText;

                if (typeof o.label === "string" || typeof o.label === "number") {
                  return String(o.label);
                }

                return "";
              })
              .filter(Boolean)
              .join(", ");

        function removeValueByKey(key: string | number) {
          const next = value.filter((v) => getKey(v) !== key);
          field.onChange(next);
        }

        let triggerContent: React.ReactNode;

        if (showBadges && selectedOptions.length > 0) {
          triggerContent = selectedOptions.map((opt) => {
            const key = getKey(opt.value);

            return (
              <Badge key={key} variant="outline" size="md">
                <span className="flex items-center gap-2">
                  <span className="max-w-48 truncate">
                    {opt.label}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!disabled) removeValueByKey(key);
                    }}
                    disabled={disabled}
                    className="shrink-0 text-brand-gray-400 hover:text-brand-gray-700 disabled:opacity-50"
                    aria-label="Remove"
                  >
                    <CloseIcon size={14} stroke="#262626" />
                  </button>
                </span>
              </Badge>
            );
          });
        } else if (isInlineSearch) {
          triggerContent = (
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-sm"
              placeholder={placeholder}
            />
          );
        } else if (selectedOptions.length > 0) {
          triggerContent = (
            <span className="text-sm">
              {selectedText}
            </span>
          );
        } else {
          triggerContent = (
            <span className="text-[#99A1AF] text-sm font-normal">
              {placeholder}
            </span>
          );
        }

        return ( 
          <div ref={wrapperRef} className="relative w-full">
            {label && (
              <label className="flex items-center gap-1 text-md font-medium">
                {label}
                {required && (
                  <AsteriskIcon
                    size={8}
                    fill="#E7000B"
                    className="-mt-2"
                  />
                )}
              </label>
            )}
            
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                if (!disabled) setOpen((v) => !v);
              }}
              className="mt-2 w-full min-h-11 border rounded-xl px-3 py-2 text-left bg-white flex flex-wrap gap-2 items-center"
            >
              {triggerContent}

              <span className="ml-auto text-gray-400">
                <ArrowDownIcon fill="#A1A1A1" size={14} />
              </span>
            </button>

            {open && !disabled && (
              <div className="absolute z-30 mt-2 w-full bg-white border rounded-xl p-3 shadow">
                {searchable &&
                  searchPlacement === "panel" && (
                    <input
                      value={query}
                      onChange={(e) =>
                        setQuery(e.target.value)
                      }
                      placeholder="Search"
                      className="w-full mb-2 border rounded px-2 py-1 text-sm"
                    />
                  )}

                <SelectAllSection
                  showSelectAll={showSelectAll}
                  options={options}
                  selectedCount={value.length}
                  selectAllLabel={selectAllLabel}
                  onToggle={toggleSelectAll}
                />

                <div className="max-h-60 overflow-auto mt-2 space-y-1">
                  {loading && (
                    <div className="text-sm text-gray-500 p-2">
                      Loading...
                    </div>
                  )}

                  {!loading &&
                    filteredOptions.length === 0 && (
                      <div className="text-sm text-gray-500 p-2">
                        No options
                      </div>
                    )}

                  {!loading &&
                    filteredOptions.map((opt) => {
                      const checked = valueKeySet.has(getKey(opt.value));
                      const checkboxId = `${name}-${String(getKey(opt.value))}`;

                      return (
                        <button
                          key={getKey(opt.value)}
                          type="button"
                          onClick={() => toggleOption(opt)}
                          className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left ${
                            checked ? "bg-brand-gray-50" : "hover:bg-brand-gray-50"
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
                            className={[
                              "h-4 w-4 rounded border flex items-center justify-center",
                              "border-brand-gray-300 bg-white",
                              "peer-checked:bg-brand-green peer-checked:border-brand-green",
                              "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-green/40",
                            ].join(" ")}
                          >
                            {checked && <CheckIcon stroke="#FFFFFF" size={12} />}
                          </span>

                          <div className="flex-1">
                            {opt.label}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {errorMessage && (
              <p className="text-xs text-red-500 mt-1">
                {errorMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}