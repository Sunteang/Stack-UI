"use client";

import { useState } from "react";
import { IconGallery } from "@/components/icons-helper/IconGallery";
import { SearchIcon } from "@/dev/icon/icon";
import { Input } from "@/dev/input/input";

export default function IconPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white">
        {/* 🔍 Search at TOP */}
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
      <h1 className="text-2xl font-bold mb-6">All Icons</h1>

      <main className="flex flex-col px-2 sm:px-6 py-2">
        <IconGallery search={search} />
      </main>
    </div>
  );
}