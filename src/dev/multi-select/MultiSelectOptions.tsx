"use client";

import * as React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { AsteriskIcon, ArrowDownIcon, CloseIcon } from "@/icons";
import { Badge } from "@/dev";

import { MultiSelectProps } from "./types";
import { defaultGetKey } from "./utils/helper";
import { SelectAllSection } from "./SelectAllSection";
import { OptionItem } from "./OptionItem";

export function MultiSelectOptions<T, TForm extends FieldValues>({
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

  const isInlineSearch = searchable && searchPlacement === "inline";

  // Close when clicking outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounce search
  const lastKeywordRef = React.useRef<string>("");

  React.useEffect(() => {
    if (!onSearch || !open) return;

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
        const value: T[] = Array.isArray(field.value) ? field.value : [];

        const valueKeySet = new Set(value.map(getKey));

        const selectedOptions = options.filter((o) =>
          valueKeySet.has(getKey(o.value)),
        );

        function toggleOption(opt: any) {
          if (opt.disabled) return;

          const k = getKey(opt.value);
          const next = new Map(value.map((v) => [getKey(v), v] as const));

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
                  .includes(query.toLowerCase()),
              )
            : options;

        const selectedText = selectedOptions
          .map(
            (o) =>
              o.displayText ??
              (typeof o.label === "string" || typeof o.label === "number"
                ? String(o.label)
                : ""),
          )
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
                  <span className="max-w-48 truncate">{opt.label}</span>

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
          triggerContent = <span className="text-sm">{selectedText}</span>;
        } else {
          triggerContent = (
            <span className="text-[#99A1AF] text-sm font-normal">
              {placeholder}
            </span>
          );
        }

        return (
          <div ref={wrapperRef} className="relative w-full">
            {/* LABEL */}
            {label && (
              <label className="flex items-center gap-1 text-md font-medium">
                {label}
                {required && (
                  <AsteriskIcon size={8} fill="#E7000B" className="-mt-2" />
                )}
              </label>
            )}

            {/* TRIGGER */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => !disabled && setOpen((v) => !v)}
              className="mt-2 w-full min-h-11 border rounded-xl px-3 py-2 text-left bg-white flex flex-wrap gap-2 items-center"
            >
              {triggerContent}

              <span className="ml-auto text-gray-400">
                <ArrowDownIcon size={14} fill="#A1A1A1" />
              </span>
            </button>

            {/* DROPDOWN */}
            {open && !disabled && (
              <div className="absolute z-30 mt-2 w-full bg-white border rounded-xl p-3 shadow">
                <SelectAllSection
                  showSelectAll={showSelectAll}
                  options={options}
                  selectedCount={value.length}
                  selectAllLabel={selectAllLabel}
                  onToggle={toggleSelectAll}
                />

                <div className="max-h-60 overflow-auto mt-2 space-y-1">
                  {loading && (
                    <div className="text-sm text-gray-500 p-2">Loading...</div>
                  )}

                  {!loading &&
                    filteredOptions.map((opt) => {
                      const checked = valueKeySet.has(getKey(opt.value));

                      return (
                        <OptionItem
                          key={getKey(opt.value)}
                          name={name}
                          option={opt}
                          checked={checked}
                          onClick={() => toggleOption(opt)}
                          getKey={getKey}
                        />
                      );
                    })}
                </div>
              </div>
            )}

            {errorMessage && (
              <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
            )}
          </div>
        );
      }}
    />
  );
}
