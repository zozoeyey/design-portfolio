/* eslint-disable @next/next/no-img-element */
// "Explore two directions" (Canmarket): Review & Refine vs Guided Questions — the two screens carry
// the slide, each with its caption and flow (the middle step is the one that differs).
// Decided from /proto/directions (deleted).

// Direction 1 = the campaign-builder screen, the left half of s49 (3116 × 1566).
function D1Shot({ className = "" }: { className?: string }) {
  const c = { x: 187, y: 483, cw: 1322, ch: 855 };
  return (
    <div className={`relative w-full overflow-hidden bg-white ${className}`} style={{ aspectRatio: `${c.cw}/${c.ch}` }}>
      <img src="/deck/s49.jpg" alt="Review & Refine: AI-drafted core selling points the user can edit" className="absolute max-w-none" style={{ width: `${(3116 / c.cw) * 100}%`, left: `${(-c.x / c.cw) * 100}%`, top: `${(-c.y / c.ch) * 100}%` }} />
    </div>
  );
}
function D2Shot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden bg-white ${className}`} style={{ aspectRatio: "1322/855" }}>
      <img src="/deck/cm-guided-questions.jpg" alt="Guided Questions: Brand Analysis, one question at a time" className="absolute inset-0 h-full w-full object-cover object-top" />
    </div>
  );
}

const I = {
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z",
  edit: "M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5M16.5 3.5l4 4L12 16H8v-4l8.5-8.5Z",
  list: "M4 6.5l1.5 1.5L8 5.5M4 12.5l1.5 1.5L8 11.5M4 18.5h4M11.5 7h8.5M11.5 13h8.5M11.5 18.5h8.5",
  doc: "M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 9h8M8 16h5",
};
function Icon({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const DIRS = [
  {
    n: "01", name: "Review & Refine",
    steps: [["Sources", I.globe], ["Editable Profile", I.edit], ["Report", I.doc]] as const,
    cap: "Review AI-generated business context",
    Shot: D1Shot,
  },
  {
    n: "02", name: "Guided Questions",
    steps: [["Sources", I.globe], ["Goals & Budget", I.list], ["Report", I.doc]] as const,
    cap: "Provide intent instead of correcting details",
    Shot: D2Shot,
  },
];

const TAKEAWAY = "Same inputs. Same output. Different user effort.";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 10" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 5h13M10.5 1.5 14 5l-3.5 3.5" />
    </svg>
  );
}

const SHOT = "overflow-hidden rounded-[0.8cqw] shadow-[0_0_0_1px_rgb(40_30_20/0.12)]";

export default function TwoDirections() {
  return (
    <>
      <div className="my-auto grid grid-cols-2 gap-x-[3cqw]">
        {DIRS.map(({ n, name }) => (
          <p key={n} className="text-[1.5cqw] font-bold text-[var(--ink)]">
            <span className="tabular-nums text-[var(--c)]">{n}</span> · {name}
          </p>
        ))}
        {DIRS.map(({ n, Shot }) => (
          <div key={n} className={`mt-[1cqw] self-start ${SHOT}`}><Shot /></div>
        ))}
        {DIRS.map(({ n, steps, cap }) => (
          <div key={n} className="mt-[1cqw] flex items-center justify-between gap-[1.4cqw]">
            <p className="text-[1.2cqw] text-[var(--gray-700)]">{cap}</p>
            <span className="flex shrink-0 items-center gap-[0.5cqw] text-[0.95cqw] text-[var(--gray-700)]">
              {steps.map(([t, d], i) => (
                <span key={t} className="flex items-center gap-[0.5cqw]">
                  {i > 0 && <Arrow className="w-[0.7cqw] text-[var(--gray-500)]" />}
                  <Icon d={d} className={`h-[1.2cqw] w-[1.2cqw] ${i === 1 ? "text-[var(--c)]" : "text-[var(--ink)]"}`} />
                  <span className={i === 1 ? "font-bold text-[var(--ink)]" : ""}>{t}</span>
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-[1.6cqw] text-center text-[1.5cqw] font-semibold text-[var(--ink)]">{TAKEAWAY}</p>
    </>
  );
}
