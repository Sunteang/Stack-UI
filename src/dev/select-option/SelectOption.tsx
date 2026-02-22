"use client";

import React, { ReactNode, useMemo, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon, CloseIcon, SearchIcon } from "@/icons/index";
import { cn } from "@/lib/utils";
import FieldWrapper from "@/dev/form/field-wrapper";
import { DefaultProps, Option } from "@/dev/form/types";
import { useDebouncedAsyncOptions } from "@/hooks/useDebouncedAsyncOptions";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Popover } from "@/dev/popover/popover";
import { Input } from "@/dev/form/input";

export type SelectProps<T> = DefaultProps & {
  suffixIcon?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  options: Array<Option<T>>;
  asyncOptions?: (values?: T | T[]) => Promise<Array<Option<T>>>;
  debounceMs?: number;
  getKey?: (value: T) => string | number;
  renderOptionPrefix?: (opt: Option<T>, selected: boolean) => React.ReactNode;
  showCheckboxInMultiple?: boolean;
  searchable?: boolean;
  maxPanelHeight?: number;
  multiple?: boolean;
  value: T | T[];
  onChange: (...v: T[]) => void;
  title?:string;
  customSelectedLabels?: ReactNode;
  clearable?: boolean;
  roundedSize?: number;
  searchPlacement?: "panel" | "inline";
  autoHighlightFirst?: boolean;
  itemPanelWidth?: number;
  displaySelectedCheckIcon?: boolean;
};

function defaultGetKey<T>(v: T): string | number {
  if (typeof v === "string" || typeof v === "number") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

export function SelectOption<T>(props: SelectProps<T>) {
  const {
    name,
    label,
    description,
    required = false,
    multiple,
    placeholder = "Select...",
    disabled = false,
    getKey = defaultGetKey,
    renderOptionPrefix,
    showCheckboxInMultiple = true,
    searchable = false,
    className,
    maxPanelHeight = 240,
    error,
    icon,
    suffixIcon,
    iconPosition = "left",
    value,
    onChange,
    title,
    customSelectedLabels,
    clearable = true,
    roundedSize = 6,
    searchPlacement = "panel",
    autoHighlightFirst = true,
    itemPanelWidth,
    displaySelectedCheckIcon=true,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [query, setQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isInlineSearch = searchable && searchPlacement === "inline" && !multiple;

  const EMPTY_OPTIONS = React.useMemo(() => [] as Array<Option<T>>, []);

  const memoizedDefaultOptions = useMemo(() => rest.options, [rest.options]);

  const effectiveDefaultOptions = useMemo(() => {
    return searchable && query.trim()
        ? memoizedDefaultOptions.filter(o =>
        o.value === query.trim().toLowerCase()
        || (o.value as string).toLowerCase().includes(query.trim().toLowerCase())
        || o.label.toLowerCase().includes(query.trim().toLowerCase())
    ) ?? EMPTY_OPTIONS : memoizedDefaultOptions;
  }, [query]);

  const {options, loading} = useDebouncedAsyncOptions<T>({
    search: query as T,
    defaultOptions: effectiveDefaultOptions,
    asyncOptions: rest?.asyncOptions,
    debounceMs: rest.debounceMs,
  });

  const closeDropdown = () => {
    setOpen(false);
    setQuery("");
  };

  useClickOutside([panelRef, buttonRef], open, closeDropdown);

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, searchable]);

  // Keyboard navigation
  function moveHighlight(delta: number) {
    if (!filtered.length) return;
    let i = highlightIndex;
    for (const el of filtered) {
      i = (i + delta + filtered.length) % filtered.length;
      if (!filtered[i]?.disabled) {
        setHighlightIndex(i);
        break;
      }
    }
  }

  const isSelected = (opt: Option<T>): boolean => {
    if (multiple) {
      const current = value as T[] ?? [];
      const keySet = new Set(current.map(getKey));
      return keySet.has(getKey(opt.value));
    }
    const v = value as T;
    return v != null && getKey(v) === getKey(opt.value);
  }

  function toggleOption(opt: Option<T>) {
    if (opt.disabled) return;

    if (multiple) {
      const current = new Map((value as T[] ?? []).map((v: T) => [getKey(v), v] as const));
      const k = getKey(opt.value);
      if (current.has(k)) {
        current.delete(k);
      } else {
        current.set(k, opt.value);
      }
      (onChange as (v: T[]) => void)(Array.from(current.values()));
    } else {
      const selected = isSelected(opt) ? null : opt.value;
      (onChange as (v: T | null) => void)(selected);
      setOpen(false);
      setQuery("");
    }
  }

  function clearSelection(e?: React.MouseEvent) {
    e?.stopPropagation();
    if (disabled) return;
    if (multiple) {
      (onChange as (v: T[]) => void)([]);
    } else {
      (onChange as (v: T | null) => void)(null);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    switch (e.key) {
      case " ":
      case "Enter":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setTimeout(() => {
            setHighlightIndex(0);
            if (isInlineSearch) inputRef.current?.focus();
          }, 0);
        } else if (highlightIndex >= 0 && filtered[highlightIndex]) {
          toggleOption(filtered[highlightIndex]);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        moveHighlight(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) setOpen(true);
        moveHighlight(-1);
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      default:
        break;
    }
  }

  const selectedLabels = useMemo(() => {
    if (multiple) {
      const current = value as T[] ?? [];
      const keySet = new Set(current.map(getKey));
      return options
        .filter((o) => keySet.has(getKey(o.value)))
        .map((o) => o.label);
    } else {
      const v = value as T;
      if (v == null) return [];
      if (!options) return [];
      const found = options.find((o) => getKey(o.value) === getKey(v));
      return found ? [found?.label] : [];
    }
  }, [value, options, getKey, multiple]);

  const selectedSingleLabel = !multiple ? (selectedLabels[0] ?? "") : "";
  const inlinePlaceholder = selectedSingleLabel || placeholder;

  const showClear =
    !disabled && (multiple ? (value as T[]).length > 0 : value !== null);

  const renderPrefix = (opt: Option<T>, selected: boolean) => {
    if (!(multiple && showCheckboxInMultiple)) return;
    return (
        <span aria-hidden className={
          cn("mr-2 inline-flex h-4 w-4 items-center justify-center rounded border",
          selected ? "border-[#66B105] bg-[#66B105]" : "border-gray-300 bg-white",
              opt.disabled && "opacity-50",
        )}
      >
        {selected && (<CheckIcon size={10} stroke="#FFFFFF" />)}
      </span>
    );
  };

  const renderSearchInput = () => {
    if (!searchable) return;
    if (isInlineSearch) return null;

    return (
        <Input
            className="w-full mb-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#A1A1A1]"
            autoFocus
            placeholder={"Search"}
            icon={<SearchIcon stroke="#99A1AF" size={16} />}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightIndex(0);
            }}
            aria-label={"Search"}
        />
    )

    /*return (
      <div className="border-b p-2">
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightIndex(0);
          }}
          placeholder="Search..."
          className="w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#A1A1A1]"
        />
      </div>
    )*/
  };

  const renderSelectedItem = () => {
    if (selectedLabels.length === 0)
      return <span className="truncate w-full block text-gray-400">{placeholder}</span>;
    if (!multiple) return <span className="truncate w-full block">{selectedLabels[0]}</span>;
    return (
      <div className="flex gap-1 overflow-hidden w-full">
        {selectedLabels.map((item, idx) => (
          <span key={"chip-" + idx} className="truncate w-full block">
            {item}
          </span>
        ))}
      </div>
    );
  };

  const renderFilterOption = () => {
    if (!filtered) return;
    return filtered.map((opt, i) => {
      const selected = isSelected(opt);
      const highlighted = i === highlightIndex;

      return (
        <button
          key={`${String(getKey(opt.value))}`}
          type="button"
          aria-disabled={opt.disabled || undefined}
          onMouseEnter={() => setHighlightIndex(i)}
              onMouseDown={(e) => e.preventDefault()} // prevent button blur
          onClick={() => toggleOption(opt)}
          className={cn(
            "w-full flex justify-between text-[#737373] cursor-pointer select-none rounded-lg items-center hover:bg-[#0A0A0A1A] p-2 text-sm",
            highlighted ? "bg-[#0A0A0A1A]" : "",
            opt.disabled ? "cursor-not-allowed opacity-50" : ""
          )}
        >
          <div className="w-full flex justify-start gap-1 items-center">
            {renderPrefix(opt, selected)}
            <span className="truncate">{opt.label}</span>
          </div>
          {selected && displaySelectedCheckIcon && (<CheckIcon size={16} stroke="#66B105"/>)}
        </button>
      );
    });
  }

  return (
    <FieldWrapper
      label={label}
      description={description}
      required={required}
      error={error}
      className={className}
    >
      <div className={cn("w-full relative", className)}>
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <div className="w-full">
            <button
              ref={buttonRef}
              name={name}
              type="button"
              disabled={disabled}
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => {
                if (disabled) return;

                const next = !open;
                setOpen(next);

                if (next) {
                  setQuery("");
                  setTimeout(() => {
                    // update setHighlightIndex
                    setHighlightIndex(autoHighlightFirst ? 0 : -1);
                    if (isInlineSearch) inputRef.current?.focus();
                  }, 0);
                } else {
                  setQuery("");
                }
              }}
              onKeyDown={onKeyDown}
              className={cn(
                `w-full min-h-10 text-left border bg-white border-[#D4D4D4] rounded-[${roundedSize}px] px-3 py-2 flex items-center justify-between`,
                disabled
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "cursor-pointer hover:border-[#A1A1A1] focus:outline-none focus:shadow",
                className
              )}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex-1 min-w-0">
                  {title && <p>{title}</p>}
                  <span className="flex items-center gap-2 w-full min-w-0">
                    {loading && <div className="animate-spin rounded-full h-4 w-4" />}
                    {isInlineSearch && open ? (
                      <input
                        ref={inputRef}
                        value={query}
                        placeholder={inlinePlaceholder}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setHighlightIndex(autoHighlightFirst ? 0 : -1);
                        }}
                        className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
                      />
                    ) : customSelectedLabels ? (
                        customSelectedLabels
                    ) : (
                        renderSelectedItem()
                    )}
                </span>
                </div>
                <div className="flex items-center gap-2">
                  {showClear && clearable && (
                      <span
                          aria-label="Clear selection"
                          onClick={clearSelection}
                          className="hover:bg-[#B2B2B224]"
                      >
                    <CloseIcon stroke="#A1A1A1" size={10} />
                  </span>
                  )}
                  <ChevronDownIcon size={10} fill="#A1A1A1" />
                </div>
              </div>
            </button>
          </div>
        </div>

        <Popover
            anchorRef={buttonRef}
            open={open}
            width={itemPanelWidth}
            placement={'auto'}
            className="p-4">
          <div
              ref={panelRef}
              role="listbox"
              aria-multiselectable={!!multiple}
              tabIndex={-1}
              className="w-full"
          >
            {renderSearchInput()}
            <div
                className={cn(
                    "max-h-60 overflow-auto p-1",
                    `max-h[${maxPanelHeight}px]`
                )}
                onKeyDown={(e) => {
                  // Allow arrow navigation when search is not focused
                  if ((e.target as HTMLElement).tagName.toLowerCase() === "input")
                    return;
                  onKeyDown(e as unknown as React.KeyboardEvent);
                }}
            >
              {(!filtered || filtered.length === 0) && (
                  <div className="p-2 text-sm text-gray-500">No options</div>
              )}
              {renderFilterOption()}
            </div>
          </div>
        </Popover>
      </div>
    </FieldWrapper>
  );
}
