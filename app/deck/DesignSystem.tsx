/* eslint-disable @next/next/no-img-element */
// "Turn the design system into code" (Canmarket): design rules → system translation → code output,
// shown as the artifacts themselves. Crops and values come from s59; design.md is a placeholder
// recreation until a real screenshot exists. Decided from /proto/dsys (deleted).

const S59 = { src: "/deck/s59.jpg", w: 2826, h: 1278 };
const CROPS = {
  json: { x: 0, y: 90, cw: 720, ch: 1180, alt: "Color system as software schema (JSON)" },
  css: { x: 742, y: 90, cw: 1264, ch: 660, alt: "CSS variables for developers: typefaces, weights, scale" },
  tree: { x: 2091, y: 0, cw: 680, ch: 1278, alt: "Component folders in the codebase" },
};

function Crop({ c, className = "" }: { c: (typeof CROPS)[keyof typeof CROPS]; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-white ${className}`} style={{ aspectRatio: `${c.cw}/${c.ch}` }}>
      <img
        src={S59.src}
        alt={c.alt}
        className="absolute max-w-none"
        style={{ width: `${(S59.w / c.cw) * 100}%`, left: `${(-c.x / c.cw) * 100}%`, top: `${(-c.y / c.ch) * 100}%` }}
      />
    </div>
  );
}

const SWATCHES = [
  ["canvas", "#FAFAFA"], ["surface", "#FFFFFF"], ["border", "#E5E5E5"], ["text", "#171717"],
  ["brand", "#18181B"], ["interactive", "#2563EB"], ["success", "#16A34A"], ["warning", "#CA8A04"], ["error", "#DC2626"],
];
const RULES = [
  ["max_saturated_colors", "1"],
  ["interactive_max_area", "15%"],
  ["gradients_allowed", "false"],
  ["wcag_level", "AA"],
];

const COLS = [
  {
    n: "01", name: "Design rules",
    items: ["Color tokens", "Typography scale", "Spacing rules", "Component states"],
  },
  {
    n: "02", name: "System translation",
    items: ["design.md", "Naming rules", "Usage logic", "Implementation guidance"],
  },
  {
    n: "03", name: "Code output",
    items: ["Component library", "CSS variables / tokens", "Code structure", "Shipped reusable components"],
  },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 12" className={className} fill="none" stroke="var(--c)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 6h20M16 1.5 21 6l-5 4.5" />
    </svg>
  );
}

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`absolute right-[0.5cqw] top-[0.5cqw] rounded-full bg-[rgb(40_30_20/0.06)] px-[0.5cqw] py-[0.1cqw] text-[0.55cqw] font-bold uppercase tracking-[0.08em] text-[var(--gray-500)] ${className}`}>{label}</span>
  );
}

// Built from the token values in s59.
// Built from the token values in s59.
function Swatches({ size = 1.6 }: { size?: number }) {
  return (
    <div className="flex flex-wrap gap-[0.35cqw]">
      {SWATCHES.map(([n, c]) => (
        <span key={n} className="flex flex-col items-center gap-[0.15cqw]">
          <span className="rounded-[0.3cqw] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]" style={{ background: c, width: `${size}cqw`, height: `${size}cqw` }} />
          <span className="text-[0.5cqw] text-[var(--gray-500)]">{n}</span>
        </span>
      ))}
    </div>
  );
}

function DesignMd({ big = false, className = "" }: { big?: boolean; className?: string }) {
  const t = big ? 1.15 : 1;
  return (
    <div className={`relative overflow-hidden rounded-[0.5cqw] bg-white font-mono shadow-[0_0_0_1px_rgb(40_30_20/0.12)] ${className}`} style={{ fontSize: `${0.66 * t}cqw` }}>
      <div className="flex items-center gap-[0.4cqw] border-b border-[rgb(40_30_20/0.08)] bg-[#f7f7f7] px-[0.7cqw] py-[0.35cqw] font-sans text-[0.6cqw] text-[var(--gray-500)]">
        <span className="h-[0.45cqw] w-[0.45cqw] rounded-full bg-[#e2e2e2]" />
        <span className="h-[0.45cqw] w-[0.45cqw] rounded-full bg-[#e2e2e2]" />
        <span className="ml-[0.4cqw] font-semibold text-[var(--ink)]">design.md</span>
      </div>
      <Placeholder label="Placeholder" className="top-[2.1cqw]" />
      <div className="space-y-[0.35cqw] p-[0.8cqw] leading-[1.45] text-[#333]">
        <p className="font-bold text-[#171717]"># Color</p>
        {RULES.map(([k, v]) => (
          <p key={k}>- <span className="text-[#2563EB]">{k}</span>: {v}</p>
        ))}
        <p className="pt-[0.3cqw] font-bold text-[#171717]"># Naming</p>
        <p>- tokens by role, not value: <span className="text-[#2563EB]">text.secondary</span></p>
        <p className="pt-[0.3cqw] font-bold text-[#171717]"># Usage</p>
        <p>- one primary action per view</p>
      </div>
    </div>
  );
}

export default function DesignSystem() {
  return (
      <div className="mt-[2cqw] grid min-h-0 flex-1 grid-cols-[minmax(0,0.9fr)_2.4cqw_minmax(0,0.9fr)_2.4cqw_minmax(0,1.2fr)] grid-rows-[minmax(0,1fr)_auto]">
        {/* artifacts */}
        <div className="relative min-h-0 overflow-hidden rounded-[0.8cqw] bg-white shadow-[0_0_0_1px_rgb(40_30_20/0.12)]">
          <Crop c={CROPS.json} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent p-[0.8cqw] pt-[2.4cqw]"><Swatches size={1.4} /></div>
        </div>
        <div className="flex items-center justify-center"><Arrow className="w-[1.8cqw]" /></div>
        <div className="min-h-0 overflow-hidden"><DesignMd big className="h-full" /></div>
        <div className="flex items-center justify-center"><Arrow className="w-[1.8cqw]" /></div>
        <div className="grid min-h-0 grid-cols-[1.5fr_1fr] items-start gap-[0.6cqw] overflow-hidden">
          <Crop c={CROPS.css} className="rounded-[0.8cqw] shadow-[0_0_0_1px_rgb(40_30_20/0.12)]" />
          <Crop c={CROPS.tree} className="rounded-[0.8cqw] shadow-[0_0_0_1px_rgb(40_30_20/0.12)]" />
        </div>
        {/* captions */}
        {COLS.map((c, i) => (
          <div key={c.n} className="contents">
            {i > 0 && <span />}
            <div className="pt-[1cqw]">
              <p className="flex items-baseline gap-[0.5cqw]">
                <span className="text-[0.85cqw] font-bold tabular-nums text-[var(--c)]">{c.n}</span>
                <span className="text-[1.35cqw] font-bold text-[var(--ink)]">{c.name}</span>
              </p>
              <p className="mt-[0.3cqw] text-[0.95cqw] leading-snug text-[var(--gray-700)]">{c.items.join(" · ")}</p>
            </div>
          </div>
        ))}
      </div>
  );
}

