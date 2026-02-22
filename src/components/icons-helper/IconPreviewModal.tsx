"use client";

import { useEffect } from "react";

type Props = Readonly<{
  icon: {
    name: string;
    component: React.ComponentType<any>;
  };
  onClose: () => void;
}>;

export function IconPreviewModal({ icon, onClose }: Props) {
  const Icon = icon.component;

  const importCode = `import { ${icon.name} } from "@/dev/icon/icon"`;

  // close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    globalThis.addEventListener("keydown", handleEsc);
    return () => globalThis.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-[50%] rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl p-10">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ✕
        </button>

        {/* BIG ICON PREVIEW SECTION */}
        <div className="flex flex-col items-center justify-center rounded-xl bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 p-16 mb-10">
          <Icon className="w-40 h-40 text-black dark:text-white" />
          <p className="mt-6 text-lg font-medium">{icon.name}</p>
        </div>

        {/* CODE BLOCK */}
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg text-sm overflow-auto">
          <code>{importCode}</code>
        </div>
      </div>
    </div>
  );
}