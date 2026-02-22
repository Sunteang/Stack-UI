"use client";

import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { Header } from "@/components/layout/header/Header";
import { MenuItem } from "@/types";

export const sidebarItems: MenuItem[] = [
  {
    id: "introduction",
    name: "Introduction",
    path: "/introduction",
    icon: "Dashboard",
  },
  {
    id: "development",
    name: "Development",
    path: "/development",
    icon: "Developments",
  },
];

type LayoutProps = {
  readonly children?: ReactNode;
};

export function IntroductionLayout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 765);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-zinc-950 text-black dark:text-white">

      {/* Header */}
      <Header />

      <div className="flex flex-1 min-h-0">

        {/* Sidebar */}
        <aside
          className={`flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-300 dark:border-zinc-800 transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <Sidebar collapsed={collapsed} items={sidebarItems} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-10 py-8">
          {children}
        </main>

      </div>
    </div>
  );
}