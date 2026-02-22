import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/dev/button/button";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  loading?: boolean;
  size?: "small" | "medium"; // for styling
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalEntries,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
  loading = false,
  size = "medium",
}) => {
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  const getPageNumbers = () => {
  const pages: (number | "ellipsis")[] = [];
  const total = totalPages;
  const current = currentPage;

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current > 4) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 3) {
      pages.push("ellipsis");
    }

    pages.push(total);
  }

  return pages;
};


  const pageNumbers = getPageNumbers();

  const btnSizeClass = size === "small" ? "text-xs px-2 py-1" : "text-sm px-3 py-1";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full text-gray-600">
      <div className="flex items-center gap-2">
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))}
          disabled={loading}
          aria-label="Select page size"
        >
          <option value={10}>10/page</option>
          <option value={25}>25/page</option>
          <option value={50}>50/page</option>
        </select>

        <div>
          Showing {startEntry} to {endEntry} of {totalEntries} entries
        </div>
      </div>

      <div className="flex gap-1 items-center flex-wrap">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1 || loading}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className={btnSizeClass}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        {pageNumbers.map((page, idx) =>
          page === "ellipsis" ? (
            <span key={"ellipsis-" + idx} className="px-2 select-none">
              &hellip;
            </span>
          ) : (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? "primary" : "outline"}
              onClick={() => onPageChange(page)}
              disabled={loading}
              aria-current={page === currentPage ? "page" : undefined}
              className={btnSizeClass}
            >
              {page}
            </Button>
          )
        )}

        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages || loading}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className={btnSizeClass}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
