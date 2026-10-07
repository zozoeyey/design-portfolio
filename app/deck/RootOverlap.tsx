// "Find the root problem" (Canmarket deck): three clients' asks overlap in one need — the Venn from the
// case study (components/RequestsOverlap) in the deck's ink + tangerine.

const REQ = [
  { client: "Client A", ask: "Brand sentiment monitoring", cx: 35, cy: 36, lx: 24, ly: 28 },
  { client: "Client B", ask: "UGC-driven content", cx: 65, cy: 36, lx: 76, ly: 28 },
  { client: "Client C", ask: "Sales-driven content generation", cx: 50, cy: 62, lx: 50, ly: 76 },
];

function Venn({ w = "34cqw", text = 1 }: { w?: string; text?: number }) {
  return (
    <div className="relative aspect-square shrink-0" style={{ width: w }}>
      {REQ.map((c) => (
        <div
          key={c.client}
          aria-hidden="true"
          className="absolute aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply"
          style={{
            left: `${c.cx}%`,
            top: `${c.cy}%`,
            backgroundColor: "color-mix(in oklab, var(--c) 14%, white)",
            boxShadow: "inset 0 0 0 0.12cqw color-mix(in oklab, var(--c) 40%, transparent)",
          }}
        />
      ))}
      {REQ.map((c) => (
        <p key={c.client} className="absolute w-[30%] -translate-x-1/2 -translate-y-1/2 text-center leading-snug" style={{ left: `${c.lx}%`, top: `${c.ly}%`, fontSize: `${1.15 * text}cqw` }}>
          <span className="block text-[0.85em] font-bold uppercase tracking-[0.14em] text-gray-500">{c.client}</span>
          <span className="font-medium text-[var(--ink)]">{c.ask}</span>
        </p>
      ))}
      <span
        role="img"
        aria-label="Shared core"
        className="absolute left-1/2 top-[45%] flex h-[12%] w-[12%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--c)] text-white shadow-[0_0.8cqw_1.6cqw_-0.6cqw_color-mix(in_oklab,var(--c)_70%,transparent)]"
      >
        <svg viewBox="0 0 24 24" className="h-[45%] w-[45%]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
    </div>
  );
}
export default function RootOverlap() {
  return (
    <div className="my-auto grid grid-cols-[auto_minmax(0,1fr)] items-center gap-[5cqw]">
      <Venn w="33cqw" />
      <div>
        <Root />
      </div>
    </div>
  );
}

function Root({ big = "3cqw" }: { big?: string }) {
  return (
  <>
    <p className="s-eyebrow !text-[var(--c)]">Where they overlap</p>
    <p className="mt-[1cqw] font-bold leading-[1.1] tracking-tight text-[var(--ink)]" style={{ fontSize: big }}>No affordable way to run professional-grade campaigns</p>
    <p className="mt-[2cqw] flex items-baseline gap-[0.9cqw] text-[1.5cqw] leading-snug text-gray-600">
      <span className="h-[0.8cqw] w-[0.8cqw] shrink-0 translate-y-[-0.1cqw] rounded-full bg-[var(--c)]" />
      <span>So we built <b className="text-[var(--ink)]">end-to-end campaign automation</b>, not three separate tools.</span>
    </p>
  </>

  );
}
