// Halftone-dot arrow: dots grow toward a chevron. Horizontal on desktop,
// rotated to point down on mobile. Used by MindsetShift.
export function Connector({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 56 24"
      aria-hidden="true"
      className="mx-auto h-6 w-14 rotate-90 md:rotate-0"
    >
      <circle cx="6" cy="12" r="1.6" fill={color} opacity="0.45" />
      <circle cx="16" cy="12" r="2.2" fill={color} opacity="0.65" />
      <circle cx="26" cy="12" r="2.8" fill={color} opacity="0.85" />
      <circle cx="36" cy="12" r="3.4" fill={color} />
      <path d="M44 5.5 L52 12 L44 18.5" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
