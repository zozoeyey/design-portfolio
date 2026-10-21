/* eslint-disable @next/next/no-img-element */
// "Understand the product & business context" (ValueGlance): vision · usage · system, each pillar with
// its evidence shown whole (object-contain) on a tint panel. Decided from /proto/context (deleted).

function Target({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.6" />
    </svg>
  );
}
function Bars({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 20v-3M9.5 20v-6M14 20v-8M18.5 20V9M4 12l5-4 4 2.5L19.5 5" />
    </svg>
  );
}
function Stack({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="3.5" width="12.5" height="12.5" rx="2.5" /><path d="M16 16v2a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18v-7.5A2.5 2.5 0 0 1 6 8h2" />
    </svg>
  );
}

const SHOT = "block h-auto max-h-full w-auto max-w-full min-h-0 rounded-[0.5cqw] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]";

const DOCS = [
  ["vg-doc-glossary", "Data visualization graphing & glossary doc"],
  ["vg-doc-research", "User research doc: what problems do we need to solve?"],
  ["vg-doc-backtester", "Backtester feature deck"],
  ["vg-doc-conditions", "“Good” conditions in data viz deck"],
] as const;

const PILLARS = [
  {
    n: "01", name: "Understand the vision", src: "CEO’s investing seminars", Icon: Target,
    visual: <img src="/deck/s13.jpg" alt="My notes from the CEO's investing seminars" className={SHOT} />,
  },
  {
    n: "02", name: "Analyze usage", src: "Google Analytics 4", Icon: Bars,
    visual: <img src="/deck/vg-ga4.jpg" alt="Google Analytics 4: page views by path over the last 90 days" className={SHOT} />,
  },
  {
    n: "03", name: "Understand the system", src: "Feature docs & UX audits", Icon: Stack,
    visual: (
      <div className="grid w-full grid-cols-2 gap-[0.6cqw]">
        {DOCS.map(([src, alt]) => (
          <img key={src} src={`/deck/${src}.jpg`} alt={alt} className="block h-auto w-full rounded-[0.4cqw] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
        ))}
      </div>
    ),
  },
];

function Head({ p }: { p: (typeof PILLARS)[number] }) {
  const { Icon } = p;
  return (
    <>
      <p className="flex items-center gap-[0.6cqw] text-[1cqw] font-bold tabular-nums tracking-[0.1em] text-[var(--c)]">
        <Icon className="h-[2cqw] w-[2cqw]" />
        {p.n}
      </p>
      <p className="mt-[0.7cqw] text-[1.45cqw] font-bold leading-tight text-black">{p.name}</p>
      <p className="mt-[0.3cqw] text-[1.1cqw] text-[var(--gray-500)]">{p.src}</p>
    </>
  );
}

const PANEL = "flex min-h-0 items-center justify-center rounded-[1.2cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] p-[1cqw]";

// Left: vision and usage stacked as two rows (label beside its image). Right: the four system docs, 2×2.
export default function ContextPillars() {
  const [vision, usage, system] = PILLARS;
  return (
    <div className="mt-[2.2cqw] grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[2.4cqw]">
      <ol className="grid min-h-0 grid-rows-2 gap-[1.6cqw]">
        {[vision, usage].map((p) => (
          <li key={p.n} className="grid min-h-0 grid-cols-[12cqw_minmax(0,1fr)] items-center gap-[1.4cqw]">
            <div><Head p={p} /></div>
            <div className={`h-full ${PANEL}`}>{p.visual}</div>
          </li>
        ))}
      </ol>
      <div className="flex min-h-0 flex-col">
        <Head p={system} />
        <div className={`mt-[1.2cqw] flex-1 ${PANEL}`}>{system.visual}</div>
      </div>
    </div>
  );
}
