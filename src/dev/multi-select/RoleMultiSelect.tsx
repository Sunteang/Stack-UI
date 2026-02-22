"use client";

import * as React from "react";
import {
  Control,
  Controller,
  Path,
  type FieldValues,
} from "react-hook-form";
import { ArrowDownIcon, CheckIcon, CloseIcon } from "@/icons";
import { Badge, Label } from "@/dev";

export type RoleItem = { id: number; name: string };

export type RoleMultiSelectProps<TForm extends FieldValues> = Readonly<{
  control: Control<TForm>;
  name: Path<TForm>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;

  initialSelected?: RoleItem[];

  roles: RoleItem[];
  loading?: boolean;

  searchable?: boolean;
  onSearch?: (keyword: string) => void | Promise<void>;
  debounceMs?: number;
  placeholder?: string;
}>;

const toggleOne = (value: number[], id: number): number[] =>
  value.includes(id) ? value.filter((x) => x !== id) : [...value, id];

export function RoleMultiSelect<TForm extends FieldValues>({
  control,
  name,
  label = "Role",
  required = true,
  disabled = false,
  errorMessage,
  initialSelected = [],
  roles,
  loading = false,

  searchable = true,
  onSearch,
  debounceMs = 600,
  placeholder = "Select role",
}: RoleMultiSelectProps<TForm>) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const inputId = React.useId();
  const panelId = React.useId();

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const labelMap = React.useMemo(() => {
    const m = new Map<number, string>();
    for (const r of initialSelected) m.set(r.id, r.name);
    for (const r of roles) m.set(r.id, r.name);
    return m;
  }, [initialSelected, roles]);

  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const hasLoadedAllRef = React.useRef(false);
  const lastKeywordRef = React.useRef<string>("__none__");

  React.useEffect(() => {
    if (!open) return;
    if (!searchable) return;
    if (!onSearch) return;

    const keyword = query.trim();

    if (!hasLoadedAllRef.current) {
      hasLoadedAllRef.current = true;
      lastKeywordRef.current = "";
      onSearch("");
      return;
    }

    if (lastKeywordRef.current === keyword) return;

    const t = globalThis.setTimeout(() => {
      lastKeywordRef.current = keyword;
      onSearch(keyword);
    }, debounceMs ?? 600);

    return () => globalThis.clearTimeout(t);
  }, [open, query, searchable, onSearch, debounceMs]);

  const focusInputAndOpen = () => {
    if (disabled) return;
    setOpen(true);
    globalThis.setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = Array.isArray(field.value) ? (field.value as number[]) : [];
        const selected = value
          .map((id) => ({ id, label: labelMap.get(id) ?? String(id) }))
          .sort((a, b) => a.label.localeCompare(b.label));

        const onRemove = (id: number) => {
          field.onChange(value.filter((x) => x !== id));
        };

        const onToggle = (id: number) => {
          const next = toggleOne(value, id);
          field.onChange(next);

          if (searchable) {
            setQuery("");
          }
          
          inputRef.current?.focus();
        };

        const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
          if (e.key === "Escape") {
            setOpen(false);
            return;
          }

          if (e.key === "ArrowDown") {
            setOpen(true);
            return;
          }

          if (e.key === "Backspace" && query.length === 0 && selected.length > 0) {
            const last = selected.at(-1);
            if (last) onRemove(last.id);
          }
        };

        let rolesContent: React.ReactNode;
        if (loading) {
          rolesContent = (
            <div className="flex items-center gap-2 text-sm text-brand-gray-500 p-2">
              <span className="animate-spin rounded-full border-b-2 border-brand-black h-4 w-4" />
              <span>Loading roles…</span>
            </div>
          );
        } else if (roles.length === 0) {
          rolesContent = (
            <p className="text-sm text-brand-gray-500 p-2">No roles found.</p>
          );
        } else {
          rolesContent = (
            <div className="space-y-1">
              {roles.map((r) => {
                const checked = value.includes(r.id);
                const checkboxId = `${panelId}-role-${r.id}`;
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={[
                      "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left",
                      checked ? "bg-brand-gray-50" : "hover:bg-brand-gray-50",
                    ].join(" ")}
                    onClick={() => onToggle(r.id)}
                  >
                    <input
                      id={checkboxId}
                      type="checkbox"
                      className="peer sr-only"
                      checked={checked}
                      onChange={() => onToggle(r.id)}
                      onClick={(ev) => ev.stopPropagation()}
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
                      <CheckIcon stroke="#FFFFFF"/>
                    </span>

                    <Label htmlFor={checkboxId} className="cursor-pointer">
                      {r.name}
                    </Label>
                  </button>
                );
              })}
            </div>
          );
        }

        const fallbackPlaceholderNode =
          !searchable && selected.length === 0 ? (
            <span className="text-sm text-brand-gray-400 py-1">{placeholder}</span>
          ) : null;

        return (
          <div ref={wrapperRef} className="relative">
            <Label htmlFor={inputId} required={required}>
              {label}
            </Label>

            <div
              className={[
                "mt-2 w-full min-h-11 rounded-xl border border-brand-gray-200 bg-white px-3 py-2",
                "relative",
                disabled ? "opacity-60" : "",
              ].join(" ")}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => focusInputAndOpen()}
                className={[
                  "absolute inset-0 rounded-xl",
                  disabled ? "cursor-not-allowed" : "cursor-text",
                  "focus:outline-none focus:ring-1",
                ].join(" ")}
                aria-expanded={open}
                aria-controls={panelId}
                aria-label="Toggle roles dropdown"
              />

              <div className="relative z-10 flex items-start gap-2 flex-wrap text-left pr-8">
                {selected.map((s) => (
                  <Badge key={s.id} variant="outline" size="md">
                    <span className="flex items-center gap-2">
                      <span className="max-w-[240px] truncate">{s.label}</span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!disabled) onRemove(s.id);
                        }}
                        disabled={disabled}
                        className="shrink-0 text-brand-gray-400 hover:text-brand-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Remove ${s.label}`}
                      >
                        <CloseIcon size={14} stroke="#262626" />
                      </button>
                    </span>
                  </Badge>
                ))}

                {searchable ? (
                  <input
                    id={inputId}
                    ref={inputRef}
                    value={query}
                    disabled={disabled}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (!open) setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={onKeyDown}
                    className="min-w-[120px] flex-1 outline-none text-sm py-1"
                    placeholder={selected.length === 0 ? placeholder : ""}
                  />
                ) : (
                  fallbackPlaceholderNode
                )}
                <button
                  type="button"
                  disabled={disabled}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (disabled) return;
                    setOpen((v) => !v);
                    inputRef.current?.focus();
                  }}
                  aria-label="Toggle dropdown"
                >
                  <ArrowDownIcon fill="#A1A1A1" size={14} />
                </button>
              </div>
            </div>

            {open && !disabled && (
              <div
                id={panelId}
                className="absolute z-30 mt-2 w-full rounded-xl border border-brand-gray-200 bg-white p-3 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-brand-gray-100 pb-2">
                  <p className="text-sm font-semibold text-brand-gray-800">Roles</p>
                  <p className="text-xs text-brand-gray-500">
                    Selected: {selected.length}
                  </p>
                </div>

                <div className="mt-3 max-h-[260px] overflow-auto rounded-xl border border-brand-gray-100 p-2">
                  {rolesContent}
                </div>
              </div>
            )}

            {errorMessage ? (
              <p className="mt-1 text-xs text-brand-red">{errorMessage}</p>
            ) : null}
          </div>
        );
      }}
    />
  );
}
