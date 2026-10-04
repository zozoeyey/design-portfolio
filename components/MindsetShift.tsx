import { Connector } from "@/components/Connector";

/**
 * "Did it ship? → Did it reduce team work?" mindset-shift graphic, in code
 * (ValueGlance case study, story 3) — replaces an exported image. Old framing
 * struck through with a halftone dot line; new framing in the project accent.
 */

const ROSE = "rgb(196, 92, 120)";

function StrikeDots() {
  // diagonal strike made of halftone dots, bottom-left → top-right
  const dots = Array.from({ length: 14 }, (_, i) => i / 13);
  return (
    <svg viewBox="0 0 100 60" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
      {dots.map((t) => (
        <circle
          key={t}
          cx={6 + t * 88}
          cy={54 - t * 48}
          r={1.4 + Math.sin(t * Math.PI) * 1.3}
          fill={ROSE}
          opacity={0.85}
        />
      ))}
    </svg>
  );
}

export default function MindsetShift({ color }: { color: string }) {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10">
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_4rem_1fr] md:gap-6">
        {/* Old framing */}
        <div className="relative rounded-2xl border border-black/10 bg-white/60 px-6 py-10 text-center sm:py-14">
          <span className="absolute -top-3 right-5 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
            Old
          </span>
          <p className="text-heading font-bold tracking-tight text-gray-500">
            Did it ship?
          </p>
          <StrikeDots />
        </div>

        <div className="self-center">
          <Connector color={color} />
        </div>

        {/* New framing */}
        <div
          className="relative rounded-2xl border-2 px-6 py-10 text-center sm:py-14"
          style={{
            borderColor: color,
            backgroundColor: `color-mix(in oklab, ${color} 8%, var(--white))`,
          }}
        >
          <span
            className="absolute -top-3 right-5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: color }}
          >
            New
          </span>
          <p className="text-heading font-bold tracking-tight text-black">
            Did it reduce team&nbsp;work?
          </p>
        </div>
      </div>

      {/* footnote */}
      <p className="mx-auto mt-8 w-fit rounded-full border border-black/10 bg-white/70 px-5 py-2 text-center text-sm text-gray-700">
        Tag / Tooltip / Scrolling Bar{" "}
        <span className="font-bold" style={{ color: `color-mix(in oklab, ${color} 45%, var(--gray-700))` }}>
          → reused across 3+ pages by other designers
        </span>
      </p>
    </div>
  );
}
