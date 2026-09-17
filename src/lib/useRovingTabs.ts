"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

/**
 * WAI-ARIA tabs with roving tabindex. Arrow keys (both axes), Home and End
 * move selection; returns prop getters so markup stays free-form.
 */
export function useRovingTabs(count: number, initial = 0) {
  const [active, setActive] = useState(initial);
  const refs = useRef<Array<HTMLElement | null>>([]);
  const baseId = useId();

  const select = useCallback((index: number, focus = false) => {
    setActive(index);
    if (focus) refs.current[index]?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const last = count - 1;
      const keyMap: Record<string, number> = {
        ArrowDown: active === last ? 0 : active + 1,
        ArrowRight: active === last ? 0 : active + 1,
        ArrowUp: active === 0 ? last : active - 1,
        ArrowLeft: active === 0 ? last : active - 1,
        Home: 0,
        End: last,
      };
      if (!(e.key in keyMap)) return;
      e.preventDefault();
      select(keyMap[e.key], true);
    },
    [active, count, select],
  );

  const tabProps = (index: number) => ({
    id: `${baseId}-tab-${index}`,
    role: "tab" as const,
    type: "button" as const,
    "aria-selected": index === active,
    "aria-controls": `${baseId}-panel`,
    tabIndex: index === active ? 0 : -1,
    ref: (el: HTMLElement | null) => {
      refs.current[index] = el;
    },
    onClick: () => select(index),
    onKeyDown,
  });

  const panelProps = {
    id: `${baseId}-panel`,
    role: "tabpanel" as const,
    "aria-labelledby": `${baseId}-tab-${active}`,
  };

  return { active, select, tabProps, panelProps };
}
