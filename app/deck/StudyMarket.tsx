// "Study the market" (Canmarket): the market research shown as a screenshot of the working FigJam
// affinity wall — who we serve → what they use today → what's broken → the opportunity.
// Ratings in the table are gut-check hypotheses, not data. Decided from /proto/market (deleted).

const CONSTRAINTS = [
  "Limited budgets + small teams",
  "Not much marketing expertise or time",
  "Need strategy AND execution",
  "Juggling too many tools",
  "Need results they can measure",
];

const ALTS = [
  {
    id: "B", name: "Agencies",
    plus: ["Strategic guidance", "Professional execution", "Full-service support"],
    minus: ["High ongoing costs", "Slower turnaround", "Communication overhead", "Hard for small SMBs to sustain"],
  },
  {
    id: "C", name: "AI content tools",
    plus: ["Fast content", "Affordable", "Easy access to AI"],
    minus: ["Fragmented workflows", "Generic, no business context", "No continuity across campaigns", "Weak end-to-end execution"],
  },
  {
    id: "D", name: "In-house / freelancers",
    plus: ["Brand control", "Dedicated expertise", "Custom workflows"],
    minus: ["Hiring + coordination costs", "Hard to cover brand AND performance", "Resource-intensive"],
  },
  {
    id: "E", name: "Founder-led",
    plus: ["Knows the business", "Direct control", "Low external spend"],
    minus: ["Limited time", "Inconsistent execution", "No repeatable process", "Hard to measure"],
  },
];

const SHORTCOMINGS = [
  { t: "Too costly to sustain", from: "B, D" },
  { t: "Strategy OR execution, rarely both", from: "C, D, E" },
  { t: "No continuity / repeatable process", from: "C, E" },
];

const OPPS = [
  "Connect plan → create → execute → measure",
  "Reduce tool fragmentation",
  "Lower effort to launch a campaign",
  "Keep business context across workflows",
  "Actionable, trustworthy AI output",
  "Repeatable marketing process",
];

// typed into a FigJam table, so plain characters
const MATRIX: [string, string, string, string, string][] = [
  ["Agencies", "○", "●", "●", "◐"],
  ["AI content tools", "●", "○", "◐", "○"],
  ["In-house / freelancers", "◐", "◐", "●", "◐"],
  ["Founder-led", "●", "◐", "○", "○"],
  ["Canmarket (target)", "●", "●", "●", "●"],
];

/* ---------- FigJam materials ---------- */

const UI = "font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',sans-serif] text-[#1e1e1e] antialiased";
const STICKY = {
  yellow: "#FFE8A3",
  green: "#B3EFBD",
  red: "#FFC7C2",
  orange: "#FFC470",
  gray: "#E6E6E6",
  blue: "#BDE3FF",
};

function Sticky({
  color, children, rot = 0, className = "", author = true, style,
}: { color: keyof typeof STICKY; children: React.ReactNode; rot?: number; className?: string; author?: boolean; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative flex flex-col p-[0.6cqw] pb-[1.1cqw] text-[0.74cqw] leading-[1.3] shadow-[0_0.04cqw_0.1cqw_rgba(0,0,0,0.12),0_0.25cqw_0.5cqw_-0.15cqw_rgba(0,0,0,0.18)] ${className}`}
      style={{ background: STICKY[color], transform: rot ? `rotate(${rot}deg)` : undefined, borderRadius: "0.12cqw", ...style }}
    >
      {children}
      {author && <span className="absolute bottom-[0.3cqw] left-[0.6cqw] text-[0.45cqw] text-black/40">Zoey Yan</span>}
    </div>
  );
}

function Cursor({ name, color, className = "" }: { name: string; color: string; className?: string }) {
  return (
    <div className={`pointer-events-none absolute z-10 ${className}`}>
      <svg viewBox="0 0 16 20" className="h-[1.2cqw] w-[1cqw]" aria-hidden="true">
        <path d="M1 1l13 8.5-6 1.2L5 18z" fill={color} stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span className="ml-[0.7cqw] -mt-[0.2cqw] block rounded-[0.25cqw] px-[0.4cqw] py-[0.12cqw] text-[0.62cqw] font-medium text-white" style={{ background: color }}>{name}</span>
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1cqw] w-[1.1cqw]" fill="none" stroke="#1e1e1e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// The app around the board: top bar + floating bottom toolbar, dot-grid canvas.
function FigJam({ file, zoom, children }: { file: string; zoom: string; children: React.ReactNode }) {
  return (
    <div className={`relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.6cqw] shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_0.6cqw_1.6cqw_-0.6cqw_rgba(0,0,0,0.25)] ${UI}`}>
      <div className="flex h-[2.5cqw] shrink-0 items-center justify-between border-b border-black/10 bg-white px-[0.9cqw]">
        <div className="flex items-center gap-[0.7cqw]">
          <span className="flex h-[1.5cqw] w-[1.5cqw] items-center justify-center rounded-[0.3cqw] bg-[#1e1e1e]">
            <svg viewBox="0 0 24 24" className="h-[0.9cqw] w-[0.9cqw]" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="#fff" /></svg>
          </span>
          <span className="text-[0.75cqw] text-black/45">Drafts /</span>
          <span className="-ml-[0.4cqw] text-[0.75cqw] font-semibold">{file}</span>
          <svg viewBox="0 0 12 12" className="-ml-[0.3cqw] h-[0.6cqw] w-[0.6cqw]" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="#1e1e1e" strokeWidth="1.4" /></svg>
        </div>
        <div className="flex items-center gap-[0.8cqw]">
          <span className="flex -space-x-[0.35cqw]">
            {[["ZY", "#9747ff"]].map(([n, c]) => (
              <span key={n} className="flex h-[1.4cqw] w-[1.4cqw] items-center justify-center rounded-full border-[0.12cqw] border-white text-[0.5cqw] font-bold text-white" style={{ background: c }}>{n}</span>
            ))}
          </span>
          <span className="rounded-[0.3cqw] bg-[#0d99ff] px-[0.7cqw] py-[0.3cqw] text-[0.7cqw] font-semibold text-white">Share</span>
          <span className="text-[0.7cqw] text-black/60">{zoom}</span>
        </div>
      </div>
      <div
        className="relative min-h-0 flex-1 bg-[#f5f5f5]"
        style={{ backgroundImage: "radial-gradient(#d4d4d4 0.07cqw, transparent 0.08cqw)", backgroundSize: "1.1cqw 1.1cqw" }}
      >
        {children}
        <div className="absolute bottom-[0.7cqw] left-1/2 flex -translate-x-1/2 items-center gap-[0.9cqw] rounded-[0.6cqw] bg-white px-[1cqw] py-[0.45cqw] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_0.3cqw_0.8cqw_-0.2cqw_rgba(0,0,0,0.2)]">
          <span className="rounded-[0.3cqw] bg-[#0d99ff] p-[0.2cqw]">
            <svg viewBox="0 0 24 24" className="h-[1.1cqw] w-[1.1cqw]" aria-hidden="true"><path d="M6 4l12 8-5.5 1.2L10 19z" fill="white" /></svg>
          </span>
          <Icon d="M4 20l4-1 11-11-3-3L5 16z" />
          <Icon d="M4 4h16v16H4z" />
          <span className="h-[1.3cqw] w-[1.3cqw] rounded-[0.1cqw] bg-[#FFE8A3] shadow-[0_0.05cqw_0.15cqw_rgba(0,0,0,0.25)]" />
          <Icon d="M6 6h12M12 6v12" />
          <Icon d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
          <Icon d="M4 5h16v14H4zM4 10h16M10 5v14" />
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="rounded-[0.2cqw] bg-white text-[0.68cqw] shadow-[0_0_0_0.06cqw_#c4c4c4]">
      <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] border-b border-[#c4c4c4] bg-[#E6E6E6] font-semibold">
        {["", "Affordable", "Strategy", "Execution", "Repeatable"].map((h, i) => (
          <span key={i} className={`px-[0.45cqw] py-[0.3cqw] ${i ? "border-l border-[#c4c4c4] text-center" : ""}`}>{h}</span>
        ))}
      </div>
      {MATRIX.map((row, r) => (
        <div key={row[0]} className={`grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] ${r < MATRIX.length - 1 ? "border-b border-[#c4c4c4]" : ""} ${r === MATRIX.length - 1 ? "bg-[#FFE0B8] font-semibold" : ""}`}>
          {row.map((c, i) => (
            <span key={i} className={`px-[0.45cqw] py-[0.22cqw] ${i ? "border-l border-[#c4c4c4] text-center text-[0.8cqw] leading-none" : ""}`}>{c}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Marker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[1.15cqw] font-extrabold leading-tight tracking-[-0.01em] ${className}`}>{children}</p>;
}

export default function StudyMarket() {
  return (
      <FigJam file="Canmarket discovery (messy)" zoom="47%">
        <div className="absolute inset-[1.2cqw] bottom-[3.4cqw]">
          {/* who */}
          <div className="absolute left-0 top-0 w-[13cqw]">
            <Marker>who are we building for?</Marker>
            <div className="mt-[0.6cqw] grid grid-cols-2 gap-[0.35cqw]">
              {CONSTRAINTS.map((t, i) => (
                <Sticky key={t} color="yellow" rot={[-2, 1.5, 1, -1.5, 2][i]} className="aspect-square" style={{ marginTop: i % 2 ? "0.6cqw" : 0 }}>{t}</Sticky>
              ))}
            </div>
          </div>
          {/* hand arrow who → today */}
          <svg viewBox="0 0 60 40" className="absolute left-[13.4cqw] top-[6cqw] w-[3.4cqw]" fill="none" stroke="#f24822" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M3 30C18 8 36 6 54 14M45 7l9 7-10 5" />
          </svg>

          {/* today */}
          <div className="absolute left-[17.5cqw] top-0 w-[49cqw]">
            <Marker>what do they use today?</Marker>
            <div className="mt-[0.6cqw] grid grid-cols-4 gap-[0.9cqw]">
              {ALTS.map((a, i) => (
                <div key={a.id} className="relative">
                  <Sticky color="blue" rot={[-1, 1.2, -0.6, 0.8][i]} author={false} className="!text-[0.85cqw] !font-bold">{a.name}</Sticky>
                  <Sticky color="green" rot={[1.4, -1, 0.6, -1.4][i]} className="-mt-[0.3cqw] ml-[0.6cqw]">
                    {a.plus.map((p) => <span key={p}>+ {p}</span>)}
                  </Sticky>
                  <Sticky color="red" rot={[-1.2, 0.8, -1.5, 1][i]} className="-mt-[0.2cqw] mr-[0.4cqw]">
                    {a.minus.map((m) => <span key={m}>– {m}</span>)}
                  </Sticky>
                </div>
              ))}
            </div>
          </div>

          {/* so what's broken */}
          <div className="absolute bottom-0 left-0 w-[33cqw]">
            <Marker>so... what&apos;s broken?</Marker>
            <div className="relative mt-[0.6cqw] flex gap-[0.6cqw]">
              {SHORTCOMINGS.map((s, i) => (
                <Sticky key={s.t} color="red" rot={[1.5, -1, 2][i]} className="aspect-square w-[9.5cqw]">
                  <span className="font-medium">{s.t}</span>
                  <span className="mt-auto pb-[0.2cqw] text-[0.62cqw] text-black/55">seen in {s.from}</span>
                </Sticky>
              ))}
              {/* marker ring around the middle note */}
              <svg viewBox="0 0 120 120" className="pointer-events-none absolute left-[8.4cqw] -top-[1.2cqw] w-[12.5cqw]" fill="none" stroke="#f24822" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M62 6C30 4 8 24 7 58c-1 34 24 56 56 55 34-1 52-26 51-56C113 26 92 7 58 9" />
              </svg>
            </div>
            <p className="mt-[0.7cqw] max-w-[30cqw] text-[0.85cqw] font-semibold leading-snug">
              ← every option trades off affordability vs. strategy vs. execution
            </p>
          </div>

          {/* gut-check table */}
          <div className="absolute bottom-[1cqw] left-[36cqw] w-[30cqw]">
            <p className="mb-[0.4cqw] text-[0.75cqw] font-semibold">gut-check (hypothesis, not data)</p>
            <Table />
          </div>

          {/* opportunity */}
          <div className="absolute right-0 top-0 w-[22cqw]">
            <Marker className="text-[#f24822]">opportunity!!</Marker>
            <Sticky color="orange" rot={-1} className="mt-[0.6cqw] !text-[1.05cqw] !font-bold !leading-[1.2]">An affordable AI CMO for resource-limited SMBs</Sticky>
            <div className="mt-[0.5cqw] grid grid-cols-2 gap-[0.4cqw]">
              {OPPS.map((o, i) => <Sticky key={o} color="orange" rot={[1.5, -1, -1.6, 1.2, 0.8, -1.4][i]}>{o}</Sticky>)}
            </div>
          </div>
          {/* hand arrow broken → opportunity */}
          <svg viewBox="0 0 80 60" className="absolute bottom-[12cqw] right-[23cqw] w-[4.5cqw]" fill="none" stroke="#f24822" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M4 52C30 50 52 34 70 8M60 10l10-3 1 11" />
          </svg>
<Cursor name="Zoey Yan" color="#9747ff" className="right-[8cqw] top-[13cqw]" />
        </div>
      </FigJam>
  );
}
