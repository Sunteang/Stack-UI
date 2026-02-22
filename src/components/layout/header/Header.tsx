"use client";

import Link from "next/link";
import { Search, Moon, Sun } from "lucide-react";
import { Input } from "@/dev/input/input";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

type HeaderProps = {
  className?: string;
  position?: "static" | "fixed" | "sticky";
};

export const Header = ({ className, position = "sticky" }: HeaderProps) => {
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

  let positionClasses = "";
  if (position === "fixed") {
    positionClasses = "fixed top-0 left-0 right-0 z-20";
  } else if (position === "sticky") {
    positionClasses = "sticky top-0 z-20";
  }

  return (
    <header className={`h-20 bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 shadow-sm flex items-center justify-between pr-6 ${positionClasses} ${className}`}>
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center group"
        >
          <Image
            src="/logo.png"
            alt="Stack UI Logo"
            width={190}
            height={60}
            priority
            className="transition-opacity group-hover:opacity-80"
          />

          <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-md">
            v1.0.0
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center relative w-96 border border-gray-200 rounded-md">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/introduction"
            className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition"
          >
            Docs
          </Link>

          <Link
            href="/components/input"
            className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition"
          >
            Components
          </Link>

          <Link
            href="/icons"
            className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition"
          >
            Icons
          </Link>
        </nav>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>

        <Link
          href="https://github.com/sunteang"
          target="_blank"
          className="p-2 hover:bg-gray-100 rounded-md transition"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </Link>
      </div>
    </header>
  );
};