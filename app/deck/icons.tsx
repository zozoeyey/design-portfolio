// Pillar icons: one family — 24px grid, 1.6 stroke, round caps, currentColor.
type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Readable density — rows of data, one row brought into focus. */
export function DensityIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5.5h16M4 18.5h16" opacity="0.45" />
      <rect x="3" y="9.5" width="18" height="5" rx="1.6" />
      <path d="M6.5 12h5.5M15 12h2.5" />
    </svg>
  );
}

/** Decision-first — a target with a check at its center. */
export function DecisionIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" opacity="0.45" />
      <path d="M9.6 12.1l1.7 1.7 3.2-3.4" />
    </svg>
  );
}

/** Reusable system — stacked modules. */
export function SystemIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4" opacity="0.7" />
      <path d="M4 16.5l8 4 8-4" opacity="0.45" />
    </svg>
  );
}
