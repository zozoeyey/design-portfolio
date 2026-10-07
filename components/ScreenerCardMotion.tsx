"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * ValueGlance Stock Screener work-card motion. The laptop with the real
 * screener is the hero; two floating panels sit over the parts of the
 * screenshot they magnify (the filter sidebar, the results row):
 *   Add filter → tick Gross Margin (pending chip) → the sidebar scrolls →
 *   drag Gross Margin to < 75% (chip applies) → drag ROIC to 20–70%
 *   (results 350 → 266) → switch Value to Today → saved toast.
 * Copy, values and chips come from the product recording. Loops while on
 * screen; reduced motion shows the end state, still.
 */

const T = {
  aimAdd: 300,
  open: 800, //      Add filter menu opens
  aimGM: 1300,
  checkGM: 1700, //  pending "Gross Margin" chip joins the results
  close: 2200, //    menu closes, the new filter opens in the sidebar
  scroll: 2600, //   sidebar scrolls to ROIC / Gross Margin / Value
  aimGMMax: 3300,
  dragGM: 3700, //   Gross Margin max 100 → 75
  gmChip: 4500, //   chip applies: "Gross Margin < 75%"
  aimROIC: 4900,
  dragROIC: 5300, // ROIC max 100 → 70
  results: 6100, //  350 → 266, ROIC chip updates
  aimToday: 6600,
  today: 7000, //    Value: Last quarter → Today
  toast: 7500, //    saved
  toastOut: 9300,
  reset: 9700, //    quick fade, values reset under it
} as const;
const LOOP = 10100;
type Phase = keyof typeof T | "idle";
const ORDER = ["idle", ...Object.keys(T)] as Phase[];

const NAVY = "#1a2253";
const INK = "#121a44";
const MUTED = "#5b6075";
const LINE = "rgba(26, 34, 83, 0.14)";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)"; // strong ease-out: entrances, settles
const MOVE = "cubic-bezier(0.77, 0, 0.175, 1)"; // strong ease-in-out: on-screen movement
const DRAG_MS = 800;
const SCROLL = 15.5; // cqw the sidebar content scrolls

// Animated integer, eased out, so counters roll instead of jumping.
function useCount(target: number, ms: number, instant: boolean) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (instant) {
      from.current = target;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setV(target);
      return;
    }
    const a = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const n = Math.round(a + (target - a) * (1 - Math.pow(1 - p, 3)));
      setV(n);
      from.current = n;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, instant]);
  return v;
}

export default function ScreenerCardMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [still, setStill] = useState(false);
  const [cursor, setCursor] = useState<[number, number]>([30, 52]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStill(true);
      setPhase("toast");
      return;
    }
    let timers: number[] = [];
    let current: Phase = "idle";
    const go = (p: Phase) => {
      current = p;
      setPhase(p);
    };
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
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
    io.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clear();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const i = ORDER.indexOf(phase);
  const past = (p: keyof typeof T) => i >= ORDER.indexOf(p);
  const idle = phase === "idle";
  const menu = past("open") && !past("close");
  const gmOn = past("checkGM");
  const added = past("close");
  const gmMax = past("dragGM") ? 75 : 100;
  const roicMax = past("dragROIC") ? 70 : 100;
  const gmApplied = past("gmChip");
  const updated = past("results");
  const today = past("today");
  const scroll = past("scroll") ? SCROLL : 0;
  const toastOn = past("toast") && !past("toastOut");
  const resetting = phase === "reset";

  const gmShown = useCount(gmMax, DRAG_MS, still || idle);
  const roicShown = useCount(roicMax, DRAG_MS, still || idle);
  const results = useCount(updated ? 266 : 350, 700, still || idle);

  // Cursor targets, measured from the DOM ([data-aim]); drags ride the slider track.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || still) return;
    const b = root.getBoundingClientRect();
    const k = 100 / b.width;
    const pt = (name: string, fx = 0.5, fy = 0.55): [number, number] | null => {
      const el = root.querySelector<HTMLElement>(`[data-aim="${name}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return [(r.left - b.left + r.width * fx) * k, (r.top - b.top + r.height * fy) * k];
    };
    const target: Partial<Record<Phase, [number, number] | null>> = {
      idle: [30, 52],
      aimAdd: pt("add", 0.6), open: pt("add", 0.6),
      aimGM: pt("gm-row", 0.2), checkGM: pt("gm-row", 0.2),
      close: [30, 50],
      aimGMMax: pt("gm-track", 1, 0.5), dragGM: pt("gm-track", 0.75, 0.5), gmChip: pt("gm-track", 0.75, 0.5),
      aimROIC: pt("roic-track", 1, 0.5), dragROIC: pt("roic-track", 0.7, 0.5), results: pt("roic-track", 0.7, 0.5),
      aimToday: pt("today"), today: pt("today"),
    };
    const t = target[phase];
    if (t) setCursor([t[0] + 0.2, t[1] + 0.3]);
  }, [phase, still]);

  const dragging = phase === "dragGM" || phase === "dragROIC";
  const pressing = ["open", "checkGM", "today"].includes(phase) || dragging;
  const cursorT = dragging ? `transform ${DRAG_MS}ms ${MOVE}` : `transform 500ms ${MOVE}`;
  const slide = (on: boolean) => (on && !idle ? `transform ${DRAG_MS}ms ${MOVE}` : "none");

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden [container-type:inline-size]"
      style={{ background: "radial-gradient(120% 100% at 50% 0%, #f1f2fc 0%, #e3e6f7 55%, #d6dbf2 100%)" }}
    >
      {/* the hero: laptop with the real screener */}
      {/* geometry (cqw): screen x 9.9–90.1, y 12.4–54.6; screenshot sidebar column x 14.3–27.1, results row y ≈ 17 */}
      <div className="absolute left-1/2 top-[11.5cqw] w-[82cqw] -translate-x-1/2">
        <div className="rounded-t-[1.6cqw] bg-[#1d1e22] p-[0.9cqw] pb-[1.1cqw] shadow-[0_0_0_0.12cqw_#3a3b40_inset]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/valueglance/screener.jpg" alt="" width={1600} height={841} className="block w-full rounded-[0.7cqw]" />
        </div>
        <div className="relative -mx-[5cqw] h-[1.6cqw] rounded-b-[1.4cqw] bg-gradient-to-b from-[#e4e6ea] to-[#a9adb6] shadow-[0_2cqw_4cqw_-1cqw_rgba(26,34,83,0.35)]">
          <span className="absolute left-1/2 top-0 h-[0.6cqw] w-[11cqw] -translate-x-1/2 rounded-b-[0.6cqw] bg-[#9a9ea8]" />
        </div>
      </div>

      <div style={{ opacity: resetting ? 0 : 1, transition: resetting ? "opacity 200ms ease-out" : `opacity 300ms ${EASE}` }}>
        {/* 1 · filter sidebar — the lead panel; covers the screenshot's whole sidebar column (right edge = the table's left edge) */}
        <Box className="left-[4cqw] top-[16.5cqw] h-[31cqw] w-[23.1cqw] overflow-hidden !p-0">
          <div
            className="px-[1.5cqw] pb-[1.5cqw] pt-[1.5cqw]"
            style={{ transform: `translateY(${-scroll}cqw)`, transition: idle ? "none" : `transform 700ms ${MOVE}`, color: INK }}
          >
            <div className="flex items-baseline justify-between">
              <Label>Screener</Label>
              <span className="text-[1.2cqw] font-semibold" style={{ color: NAVY }}>Save</span>
            </div>
            <Field className="mt-[0.7cqw]">High Quality</Field>
            <span
              data-aim="add"
              className="mt-[1cqw] inline-flex items-center rounded-[0.7cqw] px-[1.1cqw] py-[0.6cqw] text-[1.25cqw] font-semibold text-white"
              style={{ backgroundColor: NAVY, transform: phase === "open" ? "scale(0.96)" : "none", transition: `transform 120ms ${EASE}` }}
            >
              + Add filter
            </span>

            <Label className="mt-[1.6cqw]">Quality</Label>
            <Filter name="ROIC (%)" max={String(roicShown)} min="20" track="roic-track" from={20} to={roicMax} t={slide(phase === "dragROIC")} />
            <Collapse open={added}>
              <Filter
                name="Gross Margin (%)"
                fresh={!past("dragGM")}
                min=""
                max={past("dragGM") ? String(gmShown) : ""}
                track="gm-track"
                from={0}
                to={gmMax}
                t={slide(phase === "dragGM")}
              />
            </Collapse>

            <div className="mt-[1.5cqw] flex items-center justify-between">
              <Label>Value</Label>
              <span className="relative flex rounded-full bg-[#f1f2f8] p-[0.25cqw] text-[1.05cqw]">
                <span
                  className="absolute inset-y-[0.25cqw] left-[0.25cqw] w-[calc(50%-0.25cqw)] rounded-full bg-white shadow-[0_0_0_0.08cqw_rgba(26,34,83,0.12),0_0.2cqw_0.5cqw_-0.2cqw_rgba(26,34,83,0.3)]"
                  style={{ transform: today ? "translateX(100%)" : "none", transition: idle ? "none" : `transform 250ms ${EASE}` }}
                />
                {["Last qtr", "Today"].map((t, n) => (
                  <span
                    key={t}
                    data-aim={n === 1 ? "today" : undefined}
                    className="relative w-[5.2cqw] py-[0.3cqw] text-center"
                    style={{ color: (n === 1) === today ? INK : MUTED, transition: "color 200ms ease" }}
                  >
                    {t}
                  </span>
                ))}
              </span>
            </div>
            <Filter name="Mkt. Cap ($B)" min="0.05" max="" track="mc-track" from={0} to={100} t="none" />
          </div>

          {/* Add filter menu — opens from the button, top-left origin */}
          <div
            className="absolute left-[1.5cqw] top-[10.2cqw] w-[17cqw] rounded-[1cqw] bg-white p-[1.2cqw] text-[1.2cqw] shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.1),0_1.2cqw_2.4cqw_-0.8cqw_rgba(26,34,83,0.35)]"
            style={{
              color: INK,
              transformOrigin: "top left",
              opacity: menu ? 1 : 0,
              transform: menu ? "none" : "scale(0.96) translateY(-0.4cqw)",
              transition: menu ? `opacity 180ms ${EASE}, transform 200ms ${EASE}` : "opacity 140ms ease-out, transform 140ms ease-out",
            }}
          >
            {[
              ["Quality", [["ROIC", true, ""], ["Gross Margin", gmOn, "gm-row"]]],
              ["Value", [["Mkt. Cap", true, ""], ["Earnings Yield", false, ""]]],
            ].map(([group, rows], g) => (
              <div key={group as string} className={g ? "mt-[0.9cqw]" : ""}>
                <Label>{group as string}</Label>
                {(rows as [string, boolean, string][]).map(([name, on, aim]) => (
                  <div key={name} data-aim={aim || undefined} className="mt-[0.5cqw] flex items-center gap-[0.7cqw]">
                    <Check on={on} />
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Box>

        {/* 2 · results — secondary; left edge on the table's left edge, sitting just above the results row it magnifies */}
        <Box className="left-[27.1cqw] top-[4.5cqw] !p-[1.3cqw]" quiet>
          <p className="text-[1.35cqw]" style={{ color: MUTED }}>
            Results: <b className="tabular-nums" style={{ color: INK }}>{results} stocks</b> match your filters
          </p>
          <div className="mt-[0.8cqw] flex gap-[0.5cqw] whitespace-nowrap text-[1.1cqw] tabular-nums" style={{ color: INK }}>
            <Chip>Mkt. Cap &gt; $0.05B</Chip>
            <Chip>
              <span className="relative inline-grid">
                {/* old and new label crossfade in place, a light blur bridging the swap */}
                {["ROIC 20% – 100%", "ROIC 20% – 70%"].map((t, n) => {
                  const on = (n === 1) === updated;
                  return (
                    <span key={t} className="[grid-area:1/1]" style={{ opacity: on ? 1 : 0, filter: on ? "none" : "blur(2px)", transition: idle ? "none" : `opacity 250ms ${EASE}, filter 250ms ${EASE}` }}>
                      {t}
                    </span>
                  );
                })}
              </span>
            </Chip>
            <Chip>11 sectors</Chip>
            {/* new chip goes last, so its reserved slot is trailing space — enters with opacity/scale only */}
            <span
              className="inline-block rounded-full px-[0.9cqw] py-[0.35cqw]"
              style={{
                backgroundColor: gmApplied ? "#eceefb" : "transparent",
                boxShadow: gmApplied ? "none" : "inset 0 0 0 0.1cqw rgba(26,34,83,0.35)",
                color: gmApplied ? INK : MUTED,
                opacity: gmOn ? 1 : 0,
                transform: gmOn ? "none" : "scale(0.95)",
                transformOrigin: "left center",
                transition: idle
                  ? "none"
                  : `opacity 200ms ${EASE}, transform 250ms ${EASE}, background-color 200ms ease, box-shadow 200ms ease, color 200ms ease`,
              }}
            >
              {gmApplied ? "Gross Margin < 75%" : "Gross Margin"}
            </span>
          </div>
        </Box>
      </div>

      {/* 3 · saved toast — bottom-centre of the screen, where the product shows it; slides up, leaves the same way */}
      <div className="absolute bottom-[15.5cqw] left-1/2 -translate-x-1/2">
        <div
          className="flex items-center gap-[1.4cqw] whitespace-nowrap rounded-[1.2cqw] bg-[#44454f] px-[1.8cqw] py-[1.1cqw] text-[1.3cqw] text-white shadow-[0_0_0_0.1cqw_rgba(255,255,255,0.08)_inset,0_1.2cqw_2.4cqw_-1cqw_rgba(0,0,0,0.6)]"
          style={{
            opacity: toastOn ? 1 : 0,
            transform: toastOn ? "none" : "translateY(60%)",
            transition: toastOn ? `opacity 300ms ${EASE}, transform 400ms ${EASE}` : `opacity 200ms ease-out, transform 250ms ${EASE}`,
          }}
        >
          <span>“Large Cap · ROIC 20%+ · Basic Materials” added to My Screeners</span>
          <span className="h-[1.6cqw] w-[0.08cqw] bg-white/20" />
          <span className="font-semibold text-[#c7d7f5]">Undo</span>
        </div>
      </div>

      {/* cursor */}
      {!still && (
        <svg
          viewBox="0 0 24 24"
          className="absolute left-0 top-0 h-[2.4cqw] w-[2.4cqw] drop-shadow-[0_0.2cqw_0.3cqw_rgba(0,0,0,0.35)]"
          style={{
            opacity: resetting ? 0 : 1,
            transform: `translate(${cursor[0]}cqw, ${cursor[1]}cqw) scale(${pressing ? 0.9 : 1})`,
            transition: `${cursorT}, opacity 200ms`,
          }}
        >
          <path d="M4 2.5 19 13l-6.6 1.3L16 21.5l-2.8 1.3-3.6-7.3L4 20Z" fill={INK} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

/* ---------- pieces ---------- */

// Floating panel. Light-mode alpha ring + layered shadow; `quiet` is the secondary panel (lighter lift).
function Box({ className, quiet = false, children }: { className: string; quiet?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute rounded-[1.4cqw] bg-white p-[1.6cqw] ${
        quiet
          ? "shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.08),0_0.4cqw_0.8cqw_-0.4cqw_rgba(26,34,83,0.15),0_1.4cqw_2.8cqw_-1.4cqw_rgba(26,34,83,0.22)]"
          : "shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.08),0_0.6cqw_1.2cqw_-0.6cqw_rgba(26,34,83,0.2),0_2.4cqw_4.8cqw_-2cqw_rgba(26,34,83,0.4)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[1cqw] font-semibold uppercase tracking-[0.1em] ${className}`} style={{ color: MUTED }}>
      {children}
    </p>
  );
}

function Field({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-between rounded-[0.7cqw] px-[1cqw] py-[0.6cqw] text-[1.25cqw] shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.16)] ${className}`}>
      {children}
      <svg viewBox="0 0 24 24" className="h-[1.1cqw] w-[1.1cqw]" fill="none" stroke={MUTED} strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-[#eceefb] px-[0.9cqw] py-[0.35cqw]">{children}</span>;
}

function Check({ on }: { on: boolean }) {
  return (
    <span
      className="flex h-[1.4cqw] w-[1.4cqw] items-center justify-center rounded-[0.3cqw]"
      style={{ backgroundColor: on ? NAVY : "#fff", boxShadow: on ? "none" : `0 0 0 0.1cqw ${LINE}`, transition: "background-color 150ms ease-out" }}
    >
      <svg viewBox="0 0 24 24" className="h-[1cqw] w-[1cqw]" fill="none" stroke="#fff" strokeWidth="3" style={{ opacity: on ? 1 : 0, transition: "opacity 150ms ease-out" }}>
        <path d="M5 12.5 10 17 19 7" />
      </svg>
    </span>
  );
}

// Grid-rows collapse: the new filter opens in place instead of popping in.
// It only clips while closed or opening; once open it stops clipping, so the
// slider handles (which overhang the track) are never cut.
function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettled(false);
      return;
    }
    const t = window.setTimeout(() => setSettled(true), 360);
    return () => clearTimeout(t);
  }, [open]);
  return (
    <div className="grid" style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: `grid-template-rows 350ms ${EASE}` }}>
      <div className="min-h-0" style={{ overflow: settled ? "visible" : "hidden", opacity: open ? 1 : 0, transition: `opacity 250ms ${EASE} ${open ? 100 : 0}ms` }}>
        {children}
      </div>
    </div>
  );
}

function Filter(props: { name: string; fresh?: boolean; min: string; max: string; track: string; from: number; to: number; t: string }) {
  const { name, fresh = false, min, max, track, from, to, t } = props;
  return (
    <div className="pt-[1.1cqw]">
      <div className="flex items-center justify-between text-[1.25cqw]" style={{ color: INK }}>
        <span className="flex items-center gap-[0.5cqw]">
          {name}
          <span
            className="rounded-full bg-[#dcfce7] px-[0.5cqw] text-[0.9cqw] font-bold text-[#15803d]"
            style={{ opacity: fresh ? 1 : 0, transition: "opacity 200ms ease-out" }}
          >
            NEW
          </span>
        </span>
        <span style={{ color: MUTED }}>×</span>
      </div>
      <div className="mt-[0.6cqw] flex justify-between text-[1.2cqw] tabular-nums">
        {[min, max].map((v, n) => (
          <span key={n} className="w-[5.4cqw] rounded-[0.6cqw] px-[0.7cqw] py-[0.35cqw] shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.16)]" style={{ color: v ? INK : "#9aa0b4" }}>
            {v || (n ? "Max" : "Min")}
          </span>
        ))}
      </div>
      {/* inset ≥ handle radius + border, and room below, so handles at 0% / 100% sit inside the block */}
      <div className="px-[1cqw] pb-[0.9cqw] pt-[1.1cqw]">
        <div data-aim={track} className="relative h-[0.45cqw] rounded-full bg-[#e6e8f2]">
          <span
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
            style={{ backgroundColor: NAVY, transform: `translateX(${from}%) scaleX(${(to - from) / 100})`, transition: t }}
          />
          <Handle at={from} />
          <Handle at={to} transition={t} />
        </div>
      </div>
    </div>
  );
}

// A slider handle: a full-width wrapper moved by a % of the track (transform only), the dot at its left edge.
function Handle({ at, transition = "none" }: { at: number; transition?: string }) {
  return (
    <span className="absolute inset-0" style={{ transform: `translateX(${at}%)`, transition }}>
      <span className="absolute top-1/2 h-[1.5cqw] w-[1.5cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.22cqw] border-white shadow-[0_0.2cqw_0.5cqw_rgba(26,34,83,0.35)]" style={{ backgroundColor: NAVY }} />
    </span>
  );
}
