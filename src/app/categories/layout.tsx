"use client";

import { ReactNode, useEffect, useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { Header } from "@/components/layout/header/Header";
import { MenuItem } from "@/types";
import { iconList } from "@/lib/icon-list";

type LayoutProps = {
  readonly children?: ReactNode;
};

export default function IconsLayout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 765);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 Generate category menu dynamically
  const sidebarItems: MenuItem[] = useMemo(() => {
    const categories = Array.from(
      new Set(iconList.map((icon) => icon.category))
    );

    return [
      {
        id: "icons",
        name: "All Icons",
        icon: "Icons",
        path: "/icons",
      },
      {
        id: "categories",
        name: "Categories",
        icon: "Categories",
        path: "",
        children: categories.map((category) => ({
          id: category,
          name: category.charAt(0).toUpperCase() + category.slice(1),
          path: `/categories#${category}`,
        })),
      },
    ];
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-zinc-950 text-black dark:text-white">

      <Header />

      <div className="flex flex-1 min-h-0">

        <aside
          className={`flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-300 dark:border-zinc-800 transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <Sidebar collapsed={collapsed} items={sidebarItems} />
        </aside>

        <main className="flex-1 overflow-y-auto px-10 py-8">
          {children}
        </main>

      </div>
    </div>
  );
}