/* eslint-disable @next/next/no-img-element */
// "Map the path to first value" (Canmarket): an onboarding service blueprint. Five stages across;
// lanes for user actions (with decision points and proposed branches), AI / system responsibilities
// (conceptual, not a technical architecture) and design decisions. Stage 03 is the first value moment.
// Decided from /proto/firstvalue (deleted).

type Flow = { kind: "node"; t: string; sub?: string } | { kind: "diamond"; id: string; q: string };
type Stage = {
  n: string;
  name: string;
  thumb: React.ReactNode;
  label: string; // what the thumbnail is
  flow: Flow[];
  branch?: { t: string; back?: string }; // proposed "No" path from the stage's decision
  ai: string[];
  dec: string[];
  exit?: boolean; // primary flow continues into the next stage
};

// Shows the region (x, y, cw, ch) of an image of size w × h.
function Crop({ src, w, x, y, cw, ch, alt }: { src: string; w: number; x: number; y: number; cw: number; ch: number; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: `${cw}/${ch}` }}>
      <img src={src} alt={alt} className="absolute max-w-none" style={{ width: `${(w / cw) * 100}%`, left: `${(-x / cw) * 100}%`, top: `${(-y / ch) * 100}%` }} />
    </div>
  );
}

// No real asset for these two screens, so they're drawn and labelled "Schematic".
function Schematic({ variant }: { variant: "signup" | "campaign" }) {
  return (
    <div className="flex h-full w-full flex-col bg-white p-[0.5cqw]">
      <div className="flex items-center gap-[0.25cqw]">
        <span className="h-[0.5cqw] w-[0.5cqw] rounded-full bg-[#2f6bff]" />
        <span className="h-[0.3cqw] w-[2.2cqw] rounded-full bg-black/15" />
      </div>
      {variant === "signup" ? (
        <div className="mx-auto mt-[0.5cqw] flex w-[60%] flex-col gap-[0.3cqw]">
          <span className="h-[0.35cqw] w-[50%] rounded-full bg-black/25" />
          <span className="h-[0.75cqw] rounded-[0.15cqw] border border-black/15" />
          <span className="h-[0.75cqw] rounded-[0.15cqw] border border-black/15" />
          <span className="h-[0.75cqw] rounded-[0.15cqw] bg-[#2f6bff]" />
        </div>
      ) : (
        <div className="mt-[0.4cqw] flex flex-1 gap-[0.35cqw]">
          <div className="flex w-[30%] flex-col gap-[0.25cqw]">
            {[1, 2, 3].map((i) => (
              <span key={i} className="flex items-center gap-[0.2cqw]">
                <span className="h-[0.45cqw] w-[0.45cqw] rounded-full border border-[#2f6bff]" />
                <span className="h-[0.25cqw] flex-1 rounded-full bg-black/15" />
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-[0.25cqw] rounded-[0.15cqw] border border-black/10 p-[0.3cqw]">
            <span className="h-[0.3cqw] w-[60%] rounded-full bg-black/25" />
            <span className="h-[0.25cqw] rounded-full bg-black/10" />
            <span className="h-[0.25cqw] w-[80%] rounded-full bg-black/10" />
            <span className="mt-auto h-[0.6cqw] w-[35%] self-end rounded-[0.15cqw] bg-[#2f6bff]" />
          </div>
        </div>
      )}
    </div>
  );
}

const STAGES: Stage[] = [
  {
    n: "01", name: "Sign up", label: "Schematic",
    thumb: <Schematic variant="signup" />,
    flow: [{ kind: "node", t: "Create account" }, { kind: "node", t: "Enter workspace" }],
    ai: ["Initialize the business workspace"],
    dec: ["Minimize entry friction", "No setup before it’s needed"],
    exit: true,
  },
  {
    n: "02", name: "Business assessment", label: "Product screen",
    thumb: <Crop src="/deck/cm-screen-onboarding.jpg" alt="Canmarket onboarding: company business model" w={1548} x={0} y={0} cw={1548} ch={956} />,
    flow: [
      { kind: "node", t: "Add website URL" },
      { kind: "node", t: "Answer 8 questions", sub: "e.g. business model, positioning, competitors, audiences" },
      { kind: "diamond", id: "D1", q: "Enough context?" },
    ],
    branch: { t: "Ask for missing info", back: "re-ask" },
    ai: ["Collect structured inputs", "Organize business context"],
    dec: ["Balance needed input vs. effort", "Guided questions structure complex info", "Reduce cognitive load"],
    exit: true,
  },
  {
    n: "03", name: "AI analysis & report", label: "Design mock",
    thumb: <Crop src="/deck/s49.jpg" alt="Canmarket assessment results: readiness score and priority actions" w={3116} x={1630} y={485} cw={1200} ch={855} />,
    flow: [
      { kind: "node", t: "Receive AI assessment" },
      { kind: "node", t: "Review insights" },
      { kind: "diamond", id: "D2", q: "Reflects my business?" },
    ],
    branch: { t: "Correct inputs", back: "back to 02" },
    ai: ["Analyze business info", "Generate initial assessment", "Produce actionable insights"],
    dec: ["Make AI insights understandable", "Show why it matters", "Support trust and informed review"],
    exit: true,
  },
  {
    n: "04", name: "Dashboard", label: "Product screen",
    thumb: <Crop src="/deck/cm-screen-campaigns.jpg" alt="Canmarket campaigns workspace" w={1296} x={0} y={0} cw={1296} ch={918} />,
    flow: [
      { kind: "node", t: "Enter workspace" },
      { kind: "node", t: "Find next action" },
      { kind: "diamond", id: "D3", q: "Ready to create?" },
    ],
    branch: { t: "Explore workflows" },
    ai: ["Surface relevant analysis", "Entry points to workflows"],
    dec: ["Continuity from onboarding", "One clear next step"],
    exit: true,
  },
  {
    n: "05", name: "Campaign creation", label: "Schematic",
    thumb: <Schematic variant="campaign" />,
    flow: [{ kind: "node", t: "Start a campaign" }, { kind: "node", t: "Plan & execute" }],
    ai: ["Use business context for the campaign"],
    dec: ["Tie business understanding to action", "Onboarding feels like product value"],
  },
];

const COLS = "grid-cols-[6.4cqw_minmax(0,12fr)_minmax(0,22fr)_minmax(0,21fr)_minmax(0,17fr)_minmax(0,14fr)]";

const NODE = {
  user: "rounded-[0.35cqw] bg-white shadow-[0_0_0_1px_rgb(40_30_20/0.16)] font-semibold",
  ai: "rounded-[0.35cqw] bg-[oklch(0.95_0.03_240)] shadow-[inset_0_0_0_1px_oklch(0.85_0.06_240)]",
  dec: "rounded-[0.15cqw] bg-[oklch(0.94_0.045_60)] shadow-[0_0.08cqw_0.2cqw_rgb(60_40_10/0.12)]",
  branch: "rounded-[0.35cqw] bg-white/70 outline-dashed outline-1 outline-[rgb(40_30_20/0.35)] text-[var(--gray-700)]",
};
const LINE = "rgb(60 50 40 / 0.55)";
const RULE = "border-t border-[rgb(40_30_20/0.1)]";

function Node({ kind, children, className = "" }: { kind: keyof typeof NODE; children: React.ReactNode; className?: string }) {
  return <div className={`px-[0.55cqw] py-[0.4cqw] text-[0.84cqw] leading-[1.25] ${NODE[kind]} ${className}`}>{children}</div>;
}

function Line({ dashed, className = "" }: { dashed?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 40 10" preserveAspectRatio="none" className={`h-[0.7cqw] ${className}`} aria-hidden="true">
      <path d="M0 5h34" stroke={LINE} strokeWidth="1.3" strokeDasharray={dashed ? "3 2.5" : undefined} vectorEffect="non-scaling-stroke" />
      <path d="M33 1.5 39 5l-6 3.5z" fill={LINE} />
    </svg>
  );
}

function Diamond({ id, q }: { id: string; q: string }) {
  return (
    <div className="relative flex w-[4.4cqw] shrink-0 justify-center">
      <svg viewBox="0 0 40 40" className="h-[2.3cqw] w-[2.3cqw]" aria-hidden="true">
        <path d="M20 2 38 20 20 38 2 20z" fill="white" stroke="var(--c)" strokeWidth="1.6" />
        <text x="20" y="24.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--c)">{id}</text>
      </svg>
      <p className="absolute inset-x-0 top-full mt-[0.1cqw] text-center text-[0.74cqw] font-semibold leading-tight">{q}</p>
    </div>
  );
}

function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-[0.58cqw] font-bold uppercase tracking-[0.08em] ${className}`}>{children}</span>;
}

function Lane({ label }: { label: string }) {
  return (
    <div className={`flex flex-col justify-center pr-[0.6cqw] ${RULE}`}>
      <span className="text-[0.72cqw] font-bold uppercase tracking-[0.12em] text-[var(--gray-500)]">{label}</span>
    </div>
  );
}

function Legend() {
  const sw = (kind: keyof typeof NODE) => <span className={`inline-block h-[0.75cqw] w-[1.1cqw] ${NODE[kind]}`} />;
  return (
    <div className="flex flex-wrap items-center justify-end gap-x-[1cqw] gap-y-[0.3cqw] text-[0.66cqw] text-[var(--gray-700)]">
      <span className="flex items-center gap-[0.3cqw]"><Line className="w-[1.4cqw]" />Documented journey</span>
      <span className="flex items-center gap-[0.3cqw]"><Line dashed className="w-[1.4cqw]" />Proposed</span>
      <span className="flex items-center gap-[0.3cqw]">
        <svg viewBox="0 0 40 40" className="h-[0.9cqw] w-[0.9cqw]" aria-hidden="true"><path d="M20 2 38 20 20 38 2 20z" fill="white" stroke="var(--c)" strokeWidth="3" /></svg>
        Decision
      </span>
      <span className="flex items-center gap-[0.3cqw]">{sw("ai")}AI / system (conceptual)</span>
      <span className="flex items-center gap-[0.3cqw]">{sw("dec")}Design decision</span>
    </div>
  );
}

export function FirstValueHeader() {
  return (
    <div>
      <div>
        <p className="s-eyebrow">Design exploration · Experience architecture</p>
        <h2 className="s-title mt-[0.4cqw] !text-[2.1cqw]">Map the path to first value</h2>
        <p className="mt-[0.5cqw] text-[1.3cqw] leading-snug text-[var(--gray-700)]">
          How might we collect enough business context for useful AI output without overwhelming users before they see value?
        </p>
      </div>
    </div>
  );
}

export default function FirstValue() {
  return (
    <div className="mt-[1cqw] flex min-h-0 flex-1 flex-col justify-center">
      <div className="mb-[0.6cqw]"><Legend /></div>
      <div className="relative">
        {/* first-value column tint, behind the grid */}
        <div className={`pointer-events-none absolute inset-0 grid ${COLS} grid-rows-[2.4cqw_1fr]`}>
          <div className="col-start-4 row-start-2 rounded-[0.5cqw] bg-[color-mix(in_oklab,var(--c)_6%,transparent)]" />
        </div>
        <div className={`relative grid ${COLS} grid-rows-[2.6cqw_7.4cqw_11.6cqw_7.2cqw_7.8cqw] text-[var(--ink)]`}>
          {/* row 1 · phase band */}
          <span />
          <div className="col-span-2 flex flex-col justify-end pb-[0.35cqw] pr-[0.6cqw]">
            <div className="flex items-baseline justify-between">
              <Tag className="text-[var(--gray-500)]">Time-to-value gap</Tag>
              <span className="text-[0.62cqw] text-[var(--gray-500)]">setup before any AI output</span>
            </div>
            <div className="mt-[0.25cqw] h-[0.5cqw] border-x border-t border-[rgb(40_30_20/0.35)]" />
          </div>
          <div className="col-span-3 flex flex-col justify-end pb-[0.35cqw] pl-[0.3cqw]">
            <div className="flex items-baseline justify-between">
              <span className="flex items-baseline gap-[0.5cqw]">
                <Tag className="text-[var(--c)]">First value moment</Tag>
                <span className="text-[0.62cqw] text-[var(--gray-700)]">Users receive an initial AI-powered understanding of their business</span>
              </span>
              <Tag className="text-[var(--gray-500)]">Core product experience</Tag>
            </div>
            <div className="mt-[0.25cqw] h-[0.5cqw] border-x border-t border-[var(--c)]" />
          </div>

          {/* row 2 · stage headers with thumbnails */}
          <span />
          {STAGES.map((s, i) => (
            <div key={s.n} className="flex min-h-0 gap-[0.6cqw] px-[0.5cqw] pt-[0.4cqw]">
              <div className="w-[5.4cqw] shrink-0">
                <p className={`text-[0.7cqw] font-bold tabular-nums ${i === 2 ? "text-[var(--c)]" : "text-[var(--gray-500)]"}`}>{s.n}</p>
                <p className="mt-[0.1cqw] text-[0.92cqw] font-bold leading-[1.15]">{s.name}</p>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-hidden rounded-[0.3cqw] shadow-[0_0_0_1px_rgb(40_30_20/0.14)]">{s.thumb}</div>
                <span className="mt-[0.15cqw] text-right text-[0.52cqw] text-[var(--gray-500)]">{s.label}</span>
              </div>
            </div>
          ))}

          {/* row 3 · user actions — every stage's main path sits on the same line; decisions branch below */}
          <Lane label="User actions" />
          {STAGES.map((s) => (
            <div key={s.n} className={`min-h-0 px-[0.5cqw] pt-[1.2cqw] ${RULE}`}>
              <div className="relative flex h-[4.2cqw] items-center">
                {s.flow.map((f, j) => (
                  <div key={j} className="contents">
                    {j > 0 && <Line className="w-[1cqw] shrink-0" />}
                    {f.kind === "node" ? (
                      <Node kind="user" className="min-w-0 flex-1">
                        {f.t}
                        {f.sub && <span className="mt-[0.15cqw] block text-[0.64cqw] font-normal leading-snug text-[var(--gray-500)]">{f.sub}</span>}
                      </Node>
                    ) : (
                      <Diamond id={f.id} q={f.q} />
                    )}
                  </div>
                ))}
                {s.exit && (
                  <span className="relative -mr-[0.5cqw] flex shrink-0 items-center">
                    <Line className="w-[1.4cqw]" />
                    {s.branch && <span className="absolute left-1/2 top-full -translate-x-1/2 text-[0.52cqw] font-bold text-[var(--gray-500)]">Yes</span>}
                  </span>
                )}
                {s.branch && (
                  <div className="absolute right-[1.4cqw] top-full flex flex-col items-end pt-[1.7cqw]">
                    <div className="flex w-[4.4cqw] items-center justify-center gap-[0.2cqw]">
                      <svg viewBox="0 0 10 20" className="h-[0.9cqw] w-[0.45cqw]" aria-hidden="true">
                        <path d="M5 0v14" stroke={LINE} strokeWidth="1.3" strokeDasharray="2.5 2" />
                        <path d="M1.5 13 5 19l3.5-6z" fill={LINE} />
                      </svg>
                      <span className="text-[0.52cqw] font-bold text-[var(--gray-500)]">No</span>
                    </div>
                    <div className="flex items-center gap-[0.35cqw] whitespace-nowrap">
                      {s.branch.back && <span className="text-[0.56cqw] text-[var(--gray-500)]">← {s.branch.back}</span>}
                      <Node kind="branch" className="!py-[0.25cqw]">
                        {s.branch.t}
                        <Tag className="ml-[0.35cqw] text-[var(--gray-500)]">Proposed</Tag>
                      </Node>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* row 4 · AI / system */}
          <Lane label="AI / system" />
          {STAGES.map((s) => (
            <div key={s.n} className={`flex min-h-0 flex-col justify-center px-[0.5cqw] ${RULE}`}>
              <div className="flex flex-wrap items-center gap-[0.35cqw]">
                {s.ai.map((t, j) => (
                  <div key={t} className="contents">
                    {j > 0 && <Line className="w-[0.8cqw] shrink-0" />}
                    <Node kind="ai" className="min-w-0 flex-1">{t}</Node>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* row 5 · design decisions */}
          <Lane label="Design decisions" />
          {STAGES.map((s) => (
            <div key={s.n} className={`flex min-h-0 items-center px-[0.5cqw] ${RULE}`}>
              <div className="grid w-full gap-[0.35cqw]" style={{ gridTemplateColumns: `repeat(${s.dec.length === 3 ? 3 : 2}, minmax(0,1fr))` }}>
                {s.dec.map((t) => <Node key={t} kind="dec">{t}</Node>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[1.2cqw] flex items-baseline gap-[1cqw] border-t border-[rgb(40_30_20/0.12)] pt-[0.9cqw]">
        <Tag className="text-[var(--c)]">Design opportunity</Tag>
        <p className="text-[1.15cqw] font-semibold leading-snug">Move users from business setup to meaningful AI insights with the least necessary upfront effort.</p>
      </div>
    </div>
  );
}
