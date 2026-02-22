import * as React from 'react';

export function useClickOutside(
    refs: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement | null>[],
    active: boolean,
    onOutsideClick?: () => void,
    enabled: boolean = true
) {
  React.useEffect(() => {
    if (!enabled || !active) return;
    const refArray = Array.isArray(refs) ? refs : [refs];

    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      const clickedInside = refArray.some(ref => ref.current?.contains(target));
      if (!clickedInside && typeof onOutsideClick === 'function') {
        onOutsideClick();
      }
    }

    if (active) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [active, refs, onOutsideClick]);
}


export function useScrollIntoView<T extends HTMLElement>(
    index: number,
    shouldScroll: boolean,
    refs: React.RefObject<(T | null)[]>
) {
  React.useEffect(() => {
    if (shouldScroll && refs.current[index]) {
      refs.current[index]?.scrollIntoView({ block: "start" });
    }
  }, [shouldScroll, index, refs]);
}
