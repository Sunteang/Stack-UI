import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface Action {
  id?: string;
  label: string;
  onClick: () => void;
  className?: string;
}

interface ActionMenuProps {
  readonly actions: Action[];
}

export function ActionMenu({ actions }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 hover:bg-gray-100 rounded"
        aria-label="Open actions menu"
        type="button"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-white border border-gray-200 shadow-lg z-50">
          <div className="py-1">
            {actions.map(({ id, label, onClick, className }) => (
              <button
                key={id || label}
                onClick={() => {
                  onClick();
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm font-medium ${className ?? "text-gray-700 hover:bg-gray-100"}`}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
