/** True when the user asked the OS for less motion. Safe to call only in the browser. */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True for a precise pointer that can hover (mouse / trackpad). */
export function hasFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Cross-component event: select a case study from anywhere on the page. */
export const CASE_EVENT = "nurone:select-case";

export function selectCase(id: string) {
  window.dispatchEvent(new CustomEvent<string>(CASE_EVENT, { detail: id }));
}
