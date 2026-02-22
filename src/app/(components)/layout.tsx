"use client";

import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { Header } from "@/components/layout/header/Header";
import { MenuItem } from "@/types";

export const sidebarItems: MenuItem[] = [
  {
    id: "components",
    name: "Components",
    icon: "Components",
    path: "",
    children: [
      {
        id: "inputs",
        name: "Inputs",
        path: "/components/input",
        icon: "Inputs",
      },
      {
        id: "calendar",
        name: "Calendar",
        path: "/components/calendar",
        icon: "Calendar",
      },
      {
        id: "fileinput",
        name: "File Input",
        path: "/components/file-input",
        icon: "FileInput",
      },
      {
        id: "buttons",
        name: "Buttons",
        path: "/components/button",
        icon: "Buttons",
      },
    ],
  },
  {
    id: "previews",
    name: "Previews",
    icon: "Previews",
    path: "",
    children: [
      {
        id: "previewContent",
        name: "Preview Content",
        path: "/previews",
        icon: "PreviewContent",
      },
      {
        id: "createRole",
        name: "Create Role",
        path: "/previews/create-role",
        icon: "SystemRole",
      },
    ],
  },
];


type LayoutProps = {
  readonly children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
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
      <Header />

      <div className="flex flex-1 min-h-0">
        <aside
          className={`flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-300 dark:border-zinc-800 transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <Sidebar collapsed={collapsed} items={sidebarItems} />
        </aside>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}