"use client";

import { useMemo, useState } from "react";
import { iconList } from "@/lib/icon-list";
import { IconPreviewModal } from "@/components/icons-helper/IconPreviewModal";

type IconGalleryProps = {
  readonly category?: string;
  readonly search?: string;
};

export function IconGallery({ category, search = "" }: IconGalleryProps) {
  const [selected, setSelected] = useState<null | {
    name: string;
    component: React.ComponentType<any>;
  }>(null);

  const filteredIcons = useMemo(() => {
    return iconList.filter((icon) => {
      const matchesCategory = category
        ? icon.category === category
        : true;

      const matchesSearch =
        icon.name.toLowerCase().includes(search.toLowerCase()) ||
        icon.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <>
      <p className="text-sm text-zinc-500 mb-4">
        {filteredIcons.length} icons found
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {filteredIcons.map((icon) => {
          const Icon = icon.component;

          return (
            <button
              key={icon.name}
              onClick={() => setSelected(icon)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <Icon />
              <span className="text-xs">{icon.name}</span>
            </button>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          No icons found.
        </div>
      )}

      {selected && (
        <IconPreviewModal
          icon={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}