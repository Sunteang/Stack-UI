import { MenuItem } from "@/types";

export function searchSidebarItems(
  items: MenuItem[],
  searchTerm: string
): MenuItem[] {
  const filtered: MenuItem[] = [];

  for (const item of items) {
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      filtered.push(item);
    } else if (item.children) {
      const filteredChildren = searchSidebarItems(item.children, searchTerm);
      if (filteredChildren.length > 0) {
        filtered.push({
          ...item,
          children: filteredChildren,
        });
      }
    }
  }

  return filtered;
}