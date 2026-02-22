"use client";

import {
  ComponentIcon,
  PreviewIcon,
  Icons,
  CategoryIcon,
} from "@/dev/icon/icon";
import React, { useEffect, useState } from "react";
import { MenuItem } from "@/types/index";
import {
  ChevronDown,
  ChevronRight,
  FolderCode,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  collapsed: boolean;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  items,
}) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const pathname = usePathname();

  // Auto open parent if child is active
  useEffect(() => {
    const activeParents: string[] = [];

    items.forEach((item) => {
      if (item.children?.some((child) => child.path === pathname)) {
        activeParents.push(item.id);
      }
    });

    setOpenKeys(activeParents);
  }, [pathname, items]);

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const iconMap: Record<string, React.ReactNode> = {
    Dashboard: <LayoutDashboard size={18} />,
    Components: <ComponentIcon />,
    Previews: <PreviewIcon />,
    Settings: <Settings size={18} />,
    Icons: <Icons />,
    Categories: <CategoryIcon />,
    Developments: <FolderCode size={18} />,
  };

  const renderItems = (menuItems: MenuItem[]) => {
    return menuItems.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = pathname === item.path;
      const isOpen = openKeys.includes(item.id);

      return (
        <div key={item.id}>
          {hasChildren ? (
            <>
              <button
                onClick={() => toggleOpen(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded transition font-medium ${
                  isOpen
                    ? "bg-gray-100 text-black"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon && iconMap[item.icon]}
                {!collapsed && <span>{item.name}</span>}
                {!collapsed && (
                  <span className="ml-auto">
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                )}
              </button>

              {isOpen && !collapsed && (
                <div className="ml-6 mt-1">
                  {renderItems(item.children!)}
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.path || "#"}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded transition font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon && iconMap[item.icon]}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <nav className="flex flex-col gap-2 p-3 overflow-y-auto h-full">
      {renderItems(items)}
    </nav>
  );
};