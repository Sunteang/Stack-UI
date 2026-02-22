import * as React from 'react';
import { Placement } from "@/dev/form/types";

interface Coords {
  top: number;
  left: number;
  placement: Placement;
}

interface UsePopupPositioningProps {
  open: boolean;
  placement: Placement;
  offset: number;
  width: number;
  anchorRef: React.RefObject<HTMLElement | null>;
  panelRef: React.RefObject<HTMLElement | null>;
  setCoords: (coords: Coords) => void;
}

export function usePopupPositioningV2({
                                      open,
                                      placement,
                                      offset,
                                      width,
                                      anchorRef,
                                      panelRef,
                                      setCoords,
                                    }: UsePopupPositioningProps) {
  React.useLayoutEffect(() => {
    if (!open) return;

    function resolvePlacement(
        placement: Placement,
        enoughBelow: boolean,
        enoughAbove: boolean,
        rect: DOMRect,
        vh: number
    ): Placement {
      if (placement === "auto") {
        if (enoughBelow) return "bottom";
        if (enoughAbove) return "top";
        return vh - rect.bottom > rect.top ? "bottom" : "top";
      }

      if (placement === "bottom" && !enoughBelow && enoughAbove) return "top";
      if (placement === "top" && !enoughAbove && enoughBelow) return "bottom";
      return placement;
    }

    function measure() {
      const a = anchorRef.current;
      const p = panelRef.current;
      if (!a || !p) return;

      const rect = a.getBoundingClientRect();
      p.style.visibility = "hidden";
      p.style.display = "block";
      const popH = p.offsetHeight || 0;
      const popW = width;
      p.style.display = "";
      p.style.visibility = "";

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const enoughBelow = rect.bottom + offset + popH <= vh;
      const enoughAbove = rect.top - offset - popH >= 0;

      const finalPlacement = resolvePlacement(
          placement,
          enoughBelow,
          enoughAbove,
          rect,
          vh
      );

      const margin = 8;
      const left = Math.min(Math.max(rect.left, margin), vw - popW - margin);
      const top =
          finalPlacement === "bottom"
              ? rect.bottom + offset
              : rect.top - offset - popH;

      setCoords({ top: Math.max(top, margin), left, placement: finalPlacement });
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
    };
  }, [open, placement, offset, width, anchorRef, panelRef, setCoords]);
}