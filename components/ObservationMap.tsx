/**
 * "What I observed → what users said" mapping, drawn in code (ValueGlance
 * case study, story 1) — replaces an exported image. Two columns of cards
 * joined by halftone-dot connectors; user quotes set in the site's serif
 * italic. Server component, no state.
 */

const LAVENDER = "rgb(139, 115, 220)";

const PAIRS = [
  {
    obs: "Mobile tooltip covers chart data and is sometimes off the screen",
    quote:
      "The info box that pops up with data from specific dates is a challenge to see and often off the screen.",
  },
  {
    obs: "Timeline labels overlap on mobile",
    quote: "The 'jump to today' button is right over the area of the current information.",
  },
  {
    obs: "Information hierarchy on mobile is unclear",
    quote: "Make data visualization easier to understand on mobile.",
  },
];

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

function ColumnLabel({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dot }} />
      <span className="text-sm font-bold uppercase tracking-[0.14em] text-gray-700">{children}</span>
    </div>
  );
}

export default function ObservationMap({ color }: { color: string }) {
  const label = (c: string) => `color-mix(in oklab, ${c} 45%, var(--gray-700))`;
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10">
      {/* column headers (desktop) */}
      <div className="mb-8 hidden items-center gap-6 md:grid md:grid-cols-[1fr_3.5rem_1fr]">
        <ColumnLabel dot={color}>What I observed</ColumnLabel>
        <span />
        <ColumnLabel dot={LAVENDER}>What users said</ColumnLabel>
      </div>

      <div className="flex flex-col gap-8 md:gap-6">
        {PAIRS.map((p) => (
          <div
            key={p.obs}
            className="grid items-center gap-2 md:grid-cols-[1fr_3.5rem_1fr] md:gap-6"
          >
            {/* observation */}
            <div
              className="h-full rounded-2xl border bg-white/75 p-4 sm:p-5"
              style={{ borderColor: `color-mix(in oklab, ${color} 30%, transparent)` }}
            >
              <span
                className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] md:hidden"
                style={{ color: label(color) }}
              >
                What I observed
              </span>
              <p className="text-base font-medium leading-relaxed text-gray-700">{p.obs}</p>
            </div>

            <Connector color={color} />

            {/* user quote */}
            <div
              className="h-full rounded-2xl border bg-white/75 p-4 sm:p-5"
              style={{ borderColor: `color-mix(in oklab, ${LAVENDER} 35%, transparent)` }}
            >
              <span
                className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] md:hidden"
                style={{ color: label(LAVENDER) }}
              >
                What users said
              </span>
              <p className="font-serif text-lg italic leading-relaxed text-gray-700">
                &ldquo;{p.quote}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
