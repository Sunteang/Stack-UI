'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from "@/hooks/useClickOutside";
import {cn} from '@/lib/utils';
import {Placement} from "@/dev/form/types";
import {usePopupPositioningV2} from "@/hooks/usePopupPositionV2";

type PopoverProps = {
  anchorRef: React.RefObject<HTMLElement | null>;
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  width?: number;
  placement?: Placement;
  offset?: number;
  className?: string;
  disableClickOutside?: boolean;
};

export function Popover({
                          anchorRef,
                          open,
                          onClose,
                          children,
                          width = 360,
                          placement = 'auto',
                          offset = 8,
                          className="",
                          disableClickOutside=false
                        }: Readonly<PopoverProps>) {
  const [mounted, setMounted] = React.useState(false);
  const [coords, setCoords] = React.useState<{top:number; left:number; placement:Placement} | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setMounted(true), []);

  useClickOutside([panelRef, anchorRef], open, onClose, !disableClickOutside);

  usePopupPositioningV2({
    open,
    placement,
    offset,
    width,
    anchorRef,
    panelRef,
    setCoords,
  });

  if (!mounted || !open) return null;

  return createPortal(
      <div
          ref={panelRef}
          className={cn(
              "z-[1000] rounded-xl border border-gray-200 bg-white shadow-xl",
              className
          )}
          style={{
            position: coords ? 'fixed' : 'absolute',
            top: coords?.top ?? 0,
            left: coords?.left ?? 0,
            width,
            visibility: coords ? 'visible' : 'hidden',
          }}
          role="dialog"
          aria-modal="true"
      >
        {children}
      </div>,
      document.body
  );
}