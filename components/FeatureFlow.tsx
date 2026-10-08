"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Feature 1 demo — the shipped mobile flow, told the way the old video did:
 * tap a control, an arrow draws to the next screen, the screen appears.
 *   1 chart with metrics above it → tap "Edit chart metrics"
 *   2 Edit chart metrics sheet    → tap "Metric definitions"
 *   3 All Metrics reference
 * Everything is in cqw of this component (100 = its width), so it scales to
 * whatever box it's placed in. Reduced motion shows all three screens, still.
 */

const T = {
  aim1: 500,
  press1: 1100,
  arrow1: 1250, // draws 500ms
  show2: 1650,
  aim2: 2500,
  press2: 3100,
  arrow2: 3250,
  show3: 3650,
  reset: 6600, // fade back to screen 1
} as const;
const LOOP = 7200;
type Phase = keyof typeof T | "idle";
const ORDER = ["idle", ...Object.keys(T)] as Phase[];

const H = 60.84; // height in cqw: phones are 28 wide at 590:1282, gaps 8
const PHONES = [
  ["vg-final-1", 0, "Chart with the metric values above it and an Edit chart metrics bar at the bottom"],
  ["vg-final-2", 36, "Edit chart metrics sheet: save a custom view, toggle metrics by Quality, Value and Growth"],
  ["vg-final-3", 72, "All Metrics: each metric expands to its formula, definition and an example"],
] as const;
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";
const NAVY = "rgb(26, 34, 83)";

// cursor targets (cqw): the Edit chart metrics bar on screen 1, Metric definitions on screen 2
const CURSOR: Partial<Record<Phase, [number, number]>> = {
  idle: [18, 44], aim1: [9, 58.2], press1: [9, 58.2], arrow1: [9, 58.2], show2: [9, 58.2],
  aim2: [58.5, 30.2], press2: [58.5, 30.2], arrow2: [58.5, 30.2], show3: [58.5, 30.2], reset: [18, 44],
};

export default function FeatureFlow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStill(true);
      setPhase("show3");
      return;
    }
    let timers: number[] = [];
    let current: Phase = "idle";
    const go = (p: Phase) => { current = p; setPhase(p); };
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const run = (from: Phase) => {
      clear();
      const t0 = from === "idle" ? 0 : T[from];
      (Object.keys(T) as (keyof typeof T)[]).forEach((p) => {
        if (T[p] > t0) timers.push(window.setTimeout(() => go(p), T[p] - t0));
      });
      timers.push(window.setTimeout(() => { go("idle"); run("idle"); }, LOOP - t0));
    };
    // Play while on screen; pause off screen and resume from the same step.
    let playing = false;
    let visible = false;
    const sync = () => {
      const should = visible && document.visibilityState === "visible";
      if (should && !playing) run(current);
      if (!should && playing) clear();
      playing = should;
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.4 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { clear(); io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  const i = ORDER.indexOf(phase);
  const past = (p: keyof typeof T) => i >= ORDER.indexOf(p) && phase !== "reset";
  const fading = phase === "reset";
  const shown = [true, past("show2"), past("show3")];
  const drawn = [past("arrow1"), past("arrow2")];
  const [cx, cy] = CURSOR[phase] ?? [18, 44];
  const pressing = phase === "press1" || phase === "press2";

  return (
    <div ref={ref} className={`relative [container-type:inline-size] ${className}`} style={{ aspectRatio: `100 / ${H}` }}>
      {PHONES.map(([src, x, alt], n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={`/deck/${src}.jpg`}
          alt={alt}
          width={590}
          height={1282}
          className="absolute top-0 h-full w-[28cqw] rounded-[2.2cqw] object-cover object-top shadow-[0_0_0_0.18cqw_rgba(26,34,83,0.12)]"
          style={{
            left: `${x}cqw`,
            opacity: shown[n] ? 1 : 0,
            transform: shown[n] ? "none" : "translateX(-2cqw) scale(0.97)",
            transition: still || n === 0 ? "none" : shown[n] ? `opacity 350ms ${EASE}, transform 450ms ${EASE}` : `opacity 300ms ease-out, transform 0s 300ms`,
          }}
        />
      ))}

      {/* arrows draw from the tapped control to the next screen */}
      <svg viewBox={`0 0 100 ${H}`} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" fill="none" stroke={NAVY} strokeWidth="0.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {[
          // Edit chart metrics bar (screen 1) → sheet header (screen 2)
          { dot: [27.2, 58.2], d: "M27.2 58.2H31a1 1 0 0 0 1-1V12.6a1 1 0 0 1 1-1H35.6", head: "M34.4 10.4l1.2 1.2-1.2 1.2" },
          // Metric definitions (screen 2) → All Metrics header (screen 3)
          { dot: [63.2, 30.1], d: "M63.2 30.1H67a1 1 0 0 0 1-1V3.2a1 1 0 0 1 1-1H71.6", head: "M70.4 1l1.2 1.2-1.2 1.2" },
        ].map((a, n) => {
          const on = drawn[n];
          const t = still ? "none" : on ? `stroke-dashoffset 500ms ${MOVE}` : "stroke-dashoffset 0s 300ms";
          return (
            <g key={n} style={{ opacity: on || still ? 1 : 0, transition: on ? "opacity 100ms" : "opacity 300ms ease-out" }}>
              <circle cx={a.dot[0]} cy={a.dot[1]} r="0.7" fill={NAVY} stroke="none" />
              <path d={a.d} pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: on || still ? 0 : 1, transition: t }} />
              <path d={a.head} style={{ opacity: on || still ? 1 : 0, transition: on && !still ? "opacity 150ms ease-out 450ms" : "none" }} />
            </g>
          );
        })}
      </svg>

      {/* cursor */}
      {!still && (
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-0 top-0 h-[3.2cqw] w-[3.2cqw] drop-shadow-[0_0.2cqw_0.4cqw_rgba(0,0,0,0.3)]"
          style={{
            opacity: fading ? 0 : 1,
            transform: `translate(${cx}cqw, ${cy}cqw) scale(${pressing ? 0.88 : 1})`,
            transition: pressing ? `transform 120ms ${EASE}` : `transform 550ms ${MOVE}, opacity 300ms ease-out`,
          }}
          aria-hidden="true"
        >
          <path d="M4 2.5 19 13l-6.6 1.3L16 21.5l-2.8 1.3-3.6-7.3L4 20Z" fill="#121a44" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
