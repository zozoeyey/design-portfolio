/**
 * "Did it ship? → Did it reduce team work?" (ValueGlance case study, story 3).
 * One sentence edited in place: the old measure struck out, the new one
 * written in the project color, with the reuse proof underneath.
 */

const ROSE = "oklch(0.52 0.13 5)";
const COMPONENTS = ["Tag", "Tooltip", "Scrolling Bar"];

export default function MindsetShift({ color }: { color: string }) {
  return (
    <div className="glass-card rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">How I measure my work</p>
      <p className="mt-6 text-[clamp(1.9rem,1.2rem+3vw,3.4rem)] font-bold leading-[1.15] tracking-tight text-black">
        Did it{" "}
        <span aria-hidden="true" className="relative inline-block text-gray-500">
          ship
          <span
            className="absolute inset-x-[-0.08em] top-[55%] h-[0.09em] -rotate-3 rounded-full"
            style={{ backgroundColor: ROSE }}
          />
        </span>{" "}
        <span style={{ color }}>reduce team work</span>?
      </p>
      <p className="sr-only">Old question: did it ship? New question: did it reduce team work?</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
        {COMPONENTS.map((c) => (
          <span
            key={c}
            className="rounded-full px-3 py-1 font-bold"
            style={{ color, backgroundColor: `color-mix(in oklab, ${color} 10%, white)` }}
          >
            {c}
          </span>
        ))}
        <span className="text-gray-700">
          → reused across <b className="text-black">3+ pages</b> by other designers
        </span>
      </div>
    </div>
  );
}
