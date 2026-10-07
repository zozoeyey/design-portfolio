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

/** Focused scope — a frame narrowing onto one point. */
export function FocusIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" opacity="0.45" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

/** Fast time-to-value — a clock face with a forward bolt. */
export function SpeedIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" opacity="0.45" />
      <path d="M13 6.5 9 12.5h3.5L11 17.5l4-6h-3.5z" />
    </svg>
  );
}

/** Trustworthy AI output — a shield with a check. */
export function TrustIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 5 6v5.5c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6z" />
      <path d="M9.4 12.2l1.8 1.8 3.4-3.6" opacity="0.7" />
    </svg>
  );
}
