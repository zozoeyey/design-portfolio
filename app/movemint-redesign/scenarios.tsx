"use client";
// Interactive scenario preview: the Final Insights page, whole and live, in a browser frame. The panel on the left
// puts the shared flow into a given state; from there everything on the page works (scroll, Set up, Publish,
// checkboxes, the status menu, the sticky bar).
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { B, Shell } from "./shell";
import { StatusMenu, EventUrl, setFlow, useFlow } from "./flow";
import { Banner } from "./layouts";

type Scenario = "draft" | "ready" | "open" | "closed";
const SCENARIOS: { key: Scenario; label: string; note: string }[] = [
  { key: "draft", label: "Draft · Setup incomplete", note: "4 of 5 required steps done. The open step leads with Set up; Publish is locked." },
  { key: "ready", label: "Ready to publish", note: "Setup is done and collapsed into one line. Publish appears on its own timeline line." },
  { key: "open", label: "Live · Registration open", note: "Status reads Live in one place. The Publish line becomes Copy event link." },
  { key: "closed", label: "Live · Registration closed", note: "The window has ended: Registration reads Closed, everything else stays put." },
];

// Applies the chosen scenario once the page below has mounted (its useFlow resets the store on mount first).
function Apply({ s, long, large }: { s: Scenario; long: boolean; large: boolean }) {
  useEffect(() => {
    const live = s === "open" || s === "closed";
    setFlow({
      ready: s !== "draft",
      status: live ? "live" : "draft",
      regClosed: s === "closed",
      largeCount: large,
      longName: long,
    });
  }, [s, long, large]);
  return null;
}

function Page() {
  const flow = useFlow();
  return (
    <Shell pill={<StatusMenu />} url={<EventUrl />} title={flow.name} canvas>
      <Banner />
    </Shell>
  );
}

/* ───────────── browser frame: the page at desktop width, scaled to fit, scrolling inside ───────────── */
const VW = 1280;
function Frame({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ s: 1, w: VW, h: 760, native: false });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = Math.max(560, window.innerHeight - (el.getBoundingClientRect().top + window.scrollY) - 84); // room for the picker below
      setFit(window.innerWidth >= 900 ? { s: Math.min(1, w / VW), w, h, native: false } : { s: 1, w, h, native: true });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const shadow = "shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.08),0_12px_32px_-12px_oklch(0.2_0.015_285/0.25)]";
  const chrome = (
    <div className="flex h-9 shrink-0 items-center gap-3 px-4" style={{ backgroundColor: "oklch(0.95 0.004 285)", borderBottom: `1px solid ${B.line}` }}>
      <span className="flex gap-1.5" aria-hidden="true">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="size-2.5 rounded-full" style={{ backgroundColor: c }} />)}
      </span>
      <span className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-0.5 text-center text-[12px]" style={{ color: B.muted }}>movemint.cc/events/EevkbfU/admin/insights</span>
    </div>
  );
  // the page's sticky bar sticks to the top of this scroller, not under the prototype picker
  const scroller = { ["--mm-sticky-top" as string]: "0px" };
  return (
    <div ref={ref} className="min-w-0" role="region" aria-label="Insights page preview">
      {fit.native ? (
        <div className={`overflow-hidden rounded-xl bg-white ${shadow}`}>
          {chrome}
          <div data-scroll-root className="relative max-h-[80dvh] overflow-y-auto [transform:translateZ(0)]" style={scroller}>{children}</div>
        </div>
      ) : (
        <div className={`relative overflow-hidden rounded-xl bg-white ${shadow}`} style={{ height: fit.h }}>
          {/* transform keeps position:fixed children (toast, AI button) inside the frame */}
          <div className="absolute left-0 top-0 flex flex-col bg-white" style={{ width: fit.w / fit.s, height: fit.h / fit.s, transform: `scale(${fit.s})`, transformOrigin: "0 0" }}>
            {chrome}
            <div data-scroll-root className="min-h-0 flex-1 overflow-y-auto overscroll-contain" style={scroller}>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────── the panel ───────────── */
function Radio({ on }: { on: boolean }) {
  return <span className="size-4 shrink-0 rounded-full bg-white transition-[box-shadow] duration-150" style={{ boxShadow: `inset 0 0 0 ${on ? 5 : 1.5}px ${on ? B.ink : "oklch(0.78 0.008 285)"}` }} aria-hidden="true" />;
}
function Toggle({ on, label, onChange }: { on: boolean; label: string; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="mm-tool flex min-h-9 items-center gap-2.5 rounded-lg px-2 text-left text-[14px] hover:bg-[oklch(0.975_0.004_285)]">
      <span className="flex size-4 shrink-0 items-center justify-center rounded-[4px] transition-[background-color,box-shadow] duration-150" style={on ? { backgroundColor: B.ink, color: "white" } : { backgroundColor: "white", boxShadow: "inset 0 0 0 1.5px oklch(0.78 0.008 285)" }} aria-hidden="true">
        {on && <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>}
      </span>
      {label}
    </button>
  );
}

export function Scenarios() {
  const [s, setS] = useState<Scenario>("draft");
  const [long, setLong] = useState(false);
  const [large, setLarge] = useState(false);
  const [run, setRun] = useState(0); // remount the page for a clean scroll and fresh state on each scenario
  const pick = (k: Scenario) => {
    setS(k);
    setRun((r) => r + 1);
  };
  const cur = SCENARIOS.find((x) => x.key === s)!;
  return (
    <div className="mm-proto min-h-dvh pb-6" style={{ backgroundColor: "oklch(0.965 0.003 285)", color: B.ink, fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 pt-3 sm:px-6 min-[900px]:grid-cols-[280px_minmax(0,1fr)] min-[900px]:items-start">
        <aside className="grid gap-4 rounded-xl bg-white p-4 min-[900px]:sticky min-[900px]:top-3" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }} aria-label="Scenario controls">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: B.muted }}>Interactive scenario preview</p>
          <div>
            <p className="mb-1.5 px-2 text-[13px] font-medium" style={{ color: B.muted }}>Event scenario</p>
            <div role="radiogroup" aria-label="Event scenario" className="grid gap-0.5">
              {SCENARIOS.map((x) => (
                <button key={x.key} type="button" role="radio" aria-checked={x.key === s} onClick={() => pick(x.key)} className="mm-tool flex min-h-9 items-center gap-2.5 rounded-lg px-2 text-left text-[14px] hover:bg-[oklch(0.975_0.004_285)]">
                  <Radio on={x.key === s} /> {x.label}
                </button>
              ))}
            </div>
            <p className="mt-2 px-2 text-[12px] leading-snug [text-wrap:pretty]" style={{ color: B.muted }} aria-live="polite">{cur.note}</p>
          </div>
          <div className="grid gap-0.5 border-t pt-3" style={{ borderColor: B.line }}>
            <Toggle on={long} label="Long event name" onChange={setLong} />
            <Toggle on={large} label="Large participant count" onChange={setLarge} />
            {large && <p className="px-2 text-[12px]" style={{ color: B.muted }}>1,284 participants once the event is live (a draft can’t have registrations).</p>}
          </div>
          <p className="border-t pt-3 text-[12px] leading-snug" style={{ borderColor: B.line, color: B.muted }}>The page on the right is fully live: scroll it, press Set up and Publish, tick tasks, open the status menu.</p>
        </aside>

        <Frame>
          <div key={run}>
            <Page />
            <Apply s={s} long={long} large={large} />
          </div>
        </Frame>
      </div>
    </div>
  );
}
