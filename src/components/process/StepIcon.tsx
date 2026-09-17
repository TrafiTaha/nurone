const icons = [
  // Fit check: diagnose
  <>
    <circle key="a" cx="11" cy="11" r="6" />
    <path key="b" d="m20 20-4.5-4.5M8.5 11h5M11 8.5v5" />
  </>,
  // Choose the right Lab: route
  <path key="c" d="M6 20V9a3 3 0 0 1 3-3h9M14 2l4 4-4 4M6 20h0M6 14c0-3 4-3 6-3" />,
  // Build with visibility
  <>
    <path key="d" d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle key="e" cx="12" cy="12" r="2.5" />
  </>,
  // Stay accountable
  <path key="f" d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3ZM9 12l2 2 4-4" />,
  // Scale or exit cleanly
  <path key="g" d="M5 19 19 5M9 5h10v10" />,
];

export function StepIcon({ index }: { index: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {icons[index]}
    </svg>
  );
}
