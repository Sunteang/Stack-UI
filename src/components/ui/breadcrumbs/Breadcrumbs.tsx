import clsx from "clsx";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  const lastIndex = items.length - 1;

  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === lastIndex;

    const nonLastClasses = "truncate text-[#303133] font-semibold";
    const lastClasses = "truncate text-[#606266] font-medium";

    if (isLast) {
      return (
        <span aria-current="page" className={clsx(lastClasses)}>
          {item.label}
        </span>
      );
    }

    const commonClassName = clsx("transition-colors", nonLastClasses, "hover:text-[#303133]");

    if (item.onClick) {
      return (
        <button type="button" onClick={item.onClick} className={commonClassName}>
          {item.label}
        </button>
      );
    }

    if (item.href) {
      return (
        <Link href={item.href} className={commonClassName}>
          {item.label}
        </Link>
      );
    }

    return <span className={clsx(nonLastClasses)}>{item.label}</span>;
  };

  return (
    <nav aria-label="Breadcrumb" className={clsx("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((item, index) => {
          const isLast = index === lastIndex;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-x-2">
              {renderItem(item, index)}
              {!isLast && <span className="text-slate-400/70 select-none">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
