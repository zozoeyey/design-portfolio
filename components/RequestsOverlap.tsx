/**
 * Canmarket.ai story 1 ("Not every need is a direction"): three clients'
 * requests as overlapping circles; the shared middle is what got built.
 * Replaces an exported image. Server component, no state.
 */

const REQUESTS = [
  { client: "Client A", ask: "Brand sentiment monitoring" },
  { client: "Client B", ask: "UGC-driven content" },
  { client: "Client C", ask: "Sales-driven content generation" },
];
const ROOT = "No affordable way to run professional-grade campaigns";
const CORE = "End-to-end campaign automation";

export default function RequestsOverlap({ color }: { color: string }) {
  const label = `color-mix(in oklab, ${color} 45%, var(--gray-700))`;
  // circle centers (percent of the square stage)
  const C = [
    { cx: 35, cy: 36, lx: 24, ly: 28 },
    { cx: 65, cy: 36, lx: 76, ly: 28 },
    { cx: 50, cy: 62, lx: 50, ly: 76 },
  ];
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
          {C.map((c, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="absolute aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply"
              style={{
                left: `${c.cx}%`,
                top: `${c.cy}%`,
                backgroundColor: `color-mix(in oklab, ${color} 16%, white)`,
                boxShadow: `inset 0 0 0 1.5px color-mix(in oklab, ${color} 35%, transparent)`,
              }}
            />
          ))}
          {/* request labels in each circle's own (non-shared) part */}
          {REQUESTS.map((r, i) => (
            <p
              key={r.client}
              className="absolute w-[8.5rem] -translate-x-1/2 -translate-y-1/2 text-center text-xs leading-snug sm:w-[10rem] sm:text-sm"
              style={{ left: `${C[i].lx}%`, top: `${C[i].ly}%` }}
            >
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{r.client}</span>
              <span className="font-medium text-gray-700">{r.ask}</span>
            </p>
          ))}
          {/* the shared middle */}
          <span
            className="absolute left-1/2 top-[45%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white "
            style={{ backgroundColor: color, boxShadow: `0 8px 20px -8px color-mix(in oklab, ${color} 70%, transparent)` }}
            aria-label="Shared core"
            role="img"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: label }}>Where they overlap</p>
          <p className="mt-3 text-heading font-bold tracking-tight text-black">{ROOT}</p>
          <div className="mt-8 flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
            <p className="text-lg text-gray-700">
              So we built <span className="font-bold text-black">{CORE.toLowerCase()}</span>, not three separate tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
