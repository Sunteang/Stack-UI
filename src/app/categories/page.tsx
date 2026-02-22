"use client";

import { useState } from "react";
import { IconGallery } from "@/components/icons-helper/IconGallery";
import { iconList } from "@/lib/icon-list";
import { Input } from "@/dev/input/input";
import { SearchIcon } from "@/dev/icon/icon";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  // Get unique categories
  const categories = Array.from(
    new Set(iconList.map((icon) => icon.category))
  );

  return (
    <div className="space-y-20">
      <div className="relative mb-8 w-full bg-gray-100 dark:bg-zinc-800 rounded-md">
        <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
        <Input
          type="text"
          placeholder="Search icons by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm rounded-md"
        />
      </div>

      {/* Dynamic Categories */}
      {categories.map((category) => (
        <section key={category} id={category}>
          <h2 className="text-2xl font-semibold mb-6 capitalize">
            {category}
          </h2>
          <IconGallery category={category} search={search} />
        </section>
      ))}

    </div>
  );
}