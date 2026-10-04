"use client";

import { useState } from "react";

/**
 * "What I observed → what users said" (ValueGlance case study, story 1).
 * The real mobile chart screenshot carries numbered pins beside each problem;
 * the list next to it pairs each observation with the user quote that
 * confirmed it. Hovering or clicking a finding or a pin highlights both.
 */

const LAVENDER = "rgb(139, 115, 220)";
const label = (c: string) => `color-mix(in oklab, ${c} 45%, var(--gray-700))`;

const PAIRS = [
  {
    obs: "Mobile tooltip covers chart data and is sometimes off the screen",
    quote:
      "The info box that pops up with data from specific dates is a challenge to see and often off the screen.",
  },
  {
    obs: "Timeline labels overlap on mobile",
    quote: "The 'jump to today' button is right over the area of the current information.",
  },
  {
    obs: "Information hierarchy on mobile is unclear",
    quote: "Make data visualization easier to understand on mobile.",
  },
];

// pin positions over the real screenshot (percent of the image)
const PINS = [
  { top: "39%", left: "78%" }, // tooltip box covering the chart
  { top: "95.5%", left: "77%" }, // just under the overlapping 5Y / 3Y / Latest labels
  { top: "7.6%", left: "42%" }, // summary card: unclear hierarchy
];

function Pin({ n, active, color, onSelect }: { n: number; active: boolean; color: string; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Finding ${n}: ${PAIRS[n - 1].obs}`}
      aria-pressed={active}
      className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5"
      style={PINS[n - 1]}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white transition-[transform,box-shadow] duration-200 ${
          active ? "scale-110" : ""
        }`}
        style={{
          backgroundColor: color,
          boxShadow: active
            ? `0 0 0 4px white, 0 0 0 7px color-mix(in oklab, ${color} 40%, transparent)`
            : "0 0 0 3px white, 0 4px 10px -4px rgba(0,0,0,0.35)",
        }}
      >
        {n}
      </span>
    </button>
  );
}

function Screenshot({ active, color, setActive }: { active: number; color: string; setActive: (i: number) => void }) {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[290px]">
      <div className="overflow-hidden rounded-[2.4rem] border-[7px] border-white bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_48px_-20px_rgba(20,30,40,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/valueglance/mobile-chart-issues.png"
          alt="ValueGlance mobile chart before the redesign: a tooltip covering the chart, overlapping timeline labels, and a crowded summary card"
          width={723}
          height={1244}
          className="block h-auto w-full"
        />
      </div>
      {PAIRS.map((_, i) => (
        <Pin key={i} n={i + 1} active={active === i} color={color} onSelect={() => setActive(i)} />
      ))}
    </div>
  );
}

export default function ObservationMap({ color }: { color: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <Screenshot active={active} color={color} setActive={setActive} />

        <ol className="flex flex-col gap-3">
          {PAIRS.map((p, i) => {
            const on = active === i;
            return (
              <li key={p.obs}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex w-full gap-4 rounded-2xl p-4 text-left transition-[background-color,box-shadow] duration-200 sm:p-5 ${
                    on ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-14px_rgba(0,0,0,0.2)]" : "hover:bg-white/60"
                  }`}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-opacity duration-200"
                    style={{ backgroundColor: color, opacity: on ? 1 : 0.55 }}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-[0.14em]" style={{ color: label(color) }}>
                      I observed
                    </span>
                    <span className="mt-1 block text-base font-bold leading-snug text-black">{p.obs}</span>
                    <span className="mt-3 block border-l-2 pl-4" style={{ borderColor: `color-mix(in oklab, ${LAVENDER} 55%, white)` }}>
                      <span className="block text-xs font-bold uppercase tracking-[0.14em]" style={{ color: label(LAVENDER) }}>
                        Users said
                      </span>
                      <span className="mt-1 block font-serif text-lg italic leading-snug text-gray-700">&ldquo;{p.quote}&rdquo;</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
