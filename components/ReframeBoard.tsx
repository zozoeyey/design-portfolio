/* eslint-disable @next/next/no-img-element */
// ValueGlance story 2 ("Listen closely. Reframe thoughtfully."): the CTO's concern walked through as a
// 4-step storyboard (from the deck's "Validate the concern"), beside the old → new question as FigJam
// stickies (the deck's "Reframe the problem"), on a dotted board. Replaces the old before/after charts.
// Outline regions are % of each screenshot.

const STEPS = [
  { label: "Leave the chart", src: "pushback-step1", ratio: "1501/3270", top: "14%", h: "52%", arrow: "" },
  { label: "Scroll down", src: "pushback-scroll", ratio: "1160/2520", top: "45.5%", h: "19%", arrow: "↓" },
  { label: "Pick a metric", src: "pushback-scroll", ratio: "1160/2520", top: "65.5%", h: "25.5%", arrow: "" },
  { label: "Scroll back", src: "pushback-step1", ratio: "1501/3270", top: "14%", h: "52%", arrow: "↑" },
];

const eyebrow = "text-xs font-bold uppercase tracking-[0.14em]";

function Sticky({ label, text, bg, ink, rotate }: { label: string; text: string; bg: string; ink: string; rotate: string }) {
  return (
    <div
      className={`rounded-sm p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_6px_16px_-6px_rgba(0,0,0,0.18)] ${rotate}`}
      style={{ backgroundColor: bg }}
    >
      <p className={eyebrow} style={{ color: ink }}>{label}</p>
      <p className="mt-2 text-lg font-medium leading-snug text-black [text-wrap:pretty]">{text}</p>
      <p className="mt-6 text-xs text-black/50">Zoey Yan</p>
    </div>
  );
}

export default function ReframeBoard({ color }: { color: string }) {
  return (
    <div
      className="rounded-3xl bg-[rgb(247,247,249)] p-6 sm:p-10"
      style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
        <section>
          <p className="text-xl font-bold text-black">What the CTO saw</p>
          <p className="mt-1 max-w-[52ch] text-gray-600">
            Changing one metric took four steps and two scrolls away from the chart.
          </p>
          <ol className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={i}>
                <div className="relative" style={{ aspectRatio: s.ratio }}>
                  <img
                    src={`/deck/${s.src}.jpg`}
                    alt={`Step ${i + 1}: ${s.label}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[2%] rounded-xl border-[3px]"
                    style={{ top: s.top, height: s.h, borderColor: color }}
                  />
                  {s.arrow && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 flex size-7 items-center justify-center rounded-full text-sm font-bold text-white shadow-[0_0_0_3px_white]"
                      style={{ top: `calc(${s.top} + ${s.h} / 2 - 14px)`, backgroundColor: color }}
                    >
                      {s.arrow}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-bold text-black">
                  <span className="mr-1" style={{ color }}>{i + 1}</span>
                  {s.label}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="flex flex-col">
          <p className="text-xl font-bold text-black">How I reframed it</p>
          <p className="mt-1 max-w-[44ch] text-gray-600">Reading and adjusting were one task, so I rewrote the question.</p>
          <div className="mt-6 flex flex-1 flex-col justify-center gap-3">
            <Sticky
              label="Old problem"
              text="How might we stop the tooltip from covering the chart?"
              bg="rgb(214,231,252)"
              ink="rgb(60,86,130)"
              rotate="-rotate-1"
            />
            <svg viewBox="0 0 40 48" className="mx-auto h-10 w-8 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M20 4c-4 12 4 22 0 38M11 33l9 10 9-10" />
            </svg>
            <Sticky
              label="New framing"
              text="How might we let investors read and adjust metrics smoothly, so they can decide faster?"
              bg="rgb(196,234,228)"
              ink="rgb(24,92,88)"
              rotate="rotate-1"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
