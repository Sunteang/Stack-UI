"use client";

import * as React from "react";
import { Badge } from "@/dev";
import { CloseIcon } from "@/icons";

export type SelectedItem = {
  id: string | number;
  label: React.ReactNode;
};

type SelectedItemsSummaryProps = Readonly<{
  title: React.ReactNode;
  items?: SelectedItem[];
  onRemove: (id: string | number) => void;
  onClearAll: () => void;
  className?: string;
}>;

export function SelectedItemsSummary({
  title,
  items,
  onRemove,
  onClearAll,
  className,
}: SelectedItemsSummaryProps) {
  if (!items?.length) return null;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[16px] font-semibold">
          {title}
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="text-sm font-medium text-brand-red hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item?.id} variant="outline" size="md">
            <span className="flex items-center gap-2">
              <span className="max-w-48 truncate">
                {item?.label}
              </span>

              <button
                type="button"
                onClick={() => onRemove(item?.id)}
                className="shrink-0 text-brand-gray-400 hover:text-brand-gray-700"
              >
                <CloseIcon size={14} stroke="#262626" />
              </button>
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
}