// "Decide what users should do" (Canmarket): one spectrum from "AI infers" to "Users decide"; the
// cut point is the design decision. Decided from /proto/userwork (deleted).

const AI = ["Business description", "Public brand context", "Products & services", "Public social presence"];
const USER = ["Marketing goals", "Campaign budget", "Business priorities", "Strategic preferences"];
const TAKEAWAY = "Automate what can be inferred. Ask what requires intent.";
const BLUE = "oklch(0.55 0.15 255)";

function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3.5c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
      <circle cx="18.5" cy="5" r="1.5" />
    </svg>
  );
}
function Person({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6" />
    </svg>
  );
}

export default function UserWork() {
  return (
    <>
      <div className="my-auto">
        <div className="flex justify-between text-[1.1cqw] font-bold uppercase tracking-[0.1em]">
          <span className="flex items-center gap-[0.6cqw]" style={{ color: BLUE }}><Sparkle className="h-[1.5cqw] w-[1.5cqw]" />AI infers</span>
          <span className="flex items-center gap-[0.6cqw] text-[var(--c)]">Users decide<Person className="h-[1.5cqw] w-[1.5cqw]" /></span>
        </div>
        <div className="relative mt-[1.6cqw] h-[0.7cqw] rounded-full" style={{ background: `linear-gradient(90deg, oklch(0.75 0.1 255), oklch(0.9 0.03 255) 48%, color-mix(in oklab, var(--c) 30%, white) 52%, var(--c))` }}>
          <span className="absolute left-1/2 top-1/2 h-[3.4cqw] w-[0.2cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)]" />
        </div>
        <p className="mt-[2cqw] text-center text-[1cqw] text-[var(--gray-500)]">where we drew the line</p>
        <div className="mt-[2cqw] grid grid-cols-2 gap-[6cqw]">
          <ul className="grid grid-cols-2 gap-[1.4cqw]">
            {AI.map((t, i) => (
              <li key={t} className="flex items-center gap-[0.8cqw] text-[1.6cqw] text-[var(--gray-700)]">
                <span className="h-[0.9cqw] w-[0.9cqw] shrink-0 rounded-full" style={{ background: `oklch(${0.72 + i * 0.05} ${0.1 - i * 0.02} 255)` }} />{t}
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-2 gap-[1.4cqw]">
            {USER.map((t, i) => (
              <li key={t} className="flex items-center gap-[0.8cqw] text-[1.6cqw] font-semibold text-[var(--ink)]">
                <span className="h-[0.9cqw] w-[0.9cqw] shrink-0 rounded-full" style={{ background: `color-mix(in oklab, var(--c) ${40 + i * 20}%, white)` }} />{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-[2cqw] text-center text-[1.6cqw] font-semibold text-[var(--ink)]">{TAKEAWAY}</p>
    </>
  );
}
