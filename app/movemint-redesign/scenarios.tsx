"use client";
// Interactive scenario preview: the Final Insights page, whole and live, in an <iframe> so it gets its own
// viewport — breakpoints respond to the chosen device width, not the browser window. The panel picks the
// scenario and the device; the page inside works fully (scroll, Set up, Publish, checkboxes, menus, sticky bar).
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
const DEVICES = [
  { key: "desktop", label: "Desktop", w: 1440 },
  { key: "laptop", label: "Laptop", w: 1024 },
  { key: "tablet", label: "Tablet", w: 768 },
  { key: "phone", label: "Phone", w: 390 },
] as const;
type Device = (typeof DEVICES)[number]["key"];

// Reads ?scn=&long=&large= and puts the shared flow into that state after the page has mounted
// (the page's own useFlow resets the store on mount).
function ScenarioFromUrl() {
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const s = q.get("scn") as Scenario | null;
    if (!s && !q.has("long") && !q.has("large")) return;
    const live = s === "open" || s === "closed";
    // next tick: every useFlow on the page (including the parent's) has reset the store by then
    const t = setTimeout(() => setFlow({
      ...(s ? { ready: s !== "draft", status: live ? "live" : "draft", regClosed: s === "closed" } : {}),
      largeCount: q.get("large") === "1",
      longName: q.get("long") === "1",
    }));
    return () => clearTimeout(t);
  }, []);
  return null;
}

// The Final page itself — also what the Final Design tab renders.
export function LivePage() {
  const flow = useFlow();
  return (
    <Shell pill={<StatusMenu />} url={<EventUrl />} title={flow.name}>
      <Banner />
      <ScenarioFromUrl />
    </Shell>
  );
}

/* ───────────── device frame: an iframe at the device's width, scaled to fit ───────────── */
function Frame({ src, width }: { src: string; width: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 1000, h: 700 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: Math.max(520, window.innerHeight - (el.getBoundingClientRect().top + window.scrollY) - 104) });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const s = Math.min(1, box.w / width);
  const shadow = "shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.08),0_12px_32px_-12px_oklch(0.2_0.015_285/0.25)]";
  return (
    <div ref={ref} className="min-w-0" role="region" aria-label="Insights page preview">
      <div className={`mx-auto overflow-hidden rounded-xl bg-white ${shadow}`} style={{ width: width * s, height: box.h }}>
        <div style={{ width, height: box.h / s, transform: `scale(${s})`, transformOrigin: "0 0" }} className="flex flex-col">
          <div className="flex h-9 shrink-0 items-center gap-3 px-4" style={{ backgroundColor: "oklch(0.95 0.004 285)", borderBottom: `1px solid ${B.line}` }}>
            <span className="flex gap-1.5" aria-hidden="true">
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="size-2.5 rounded-full" style={{ backgroundColor: c }} />)}
            </span>
            <span className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-0.5 text-center text-[12px]" style={{ color: B.muted }}>movemint.cc/events/EevkbfU/admin/insights</span>
          </div>
          <iframe key={src} src={src} title="Movemint Insights page" className="block min-h-0 w-full flex-1 border-0 bg-white" />
        </div>
      </div>
      <p className="mt-2 text-center text-[12px] tabular-nums" style={{ color: B.muted }}>{width}px wide{s < 1 ? ` · shown at ${Math.round(s * 100)}%` : ""}</p>
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
  const [device, setDevice] = useState<Device>("desktop");
  const [base, setBase] = useState("");
  // keep ?key= (the page's access key) for the embedded copy
  useEffect(() => {
    const k = new URLSearchParams(location.search).get("key");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBase(k ? `&key=${encodeURIComponent(k)}` : "");
  }, []);
  const src = `?v=1&bare=1&scn=${s}${long ? "&long=1" : ""}${large ? "&large=1" : ""}${base}`;
  const cur = SCENARIOS.find((x) => x.key === s)!;
  const dev = DEVICES.find((d) => d.key === device)!;
  return (
    <div className="mm-proto min-h-dvh pb-6" style={{ backgroundColor: "oklch(0.965 0.003 285)", color: B.ink, fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 pt-3 sm:px-6 min-[900px]:grid-cols-[280px_minmax(0,1fr)] min-[900px]:items-start">
        <aside className="grid gap-4 rounded-xl bg-white p-4 min-[900px]:sticky min-[900px]:top-3" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }} aria-label="Scenario controls">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: B.muted }}>Interactive scenario preview</p>
          <div>
            <p className="mb-1.5 px-2 text-[13px] font-medium" style={{ color: B.muted }}>Event scenario</p>
            <div role="radiogroup" aria-label="Event scenario" className="grid gap-0.5">
              {SCENARIOS.map((x) => (
                <button key={x.key} type="button" role="radio" aria-checked={x.key === s} onClick={() => setS(x.key)} className="mm-tool flex min-h-9 items-center gap-2.5 rounded-lg px-2 text-left text-[14px] hover:bg-[oklch(0.975_0.004_285)]">
                  <Radio on={x.key === s} /> {x.label}
                </button>
              ))}
            </div>
            <p className="mt-2 px-2 text-[12px] leading-snug [text-wrap:pretty]" style={{ color: B.muted }} aria-live="polite">{cur.note}</p>
          </div>
          <div className="border-t pt-3" style={{ borderColor: B.line }}>
            <p className="mb-1.5 px-2 text-[13px] font-medium" style={{ color: B.muted }}>Screen</p>
            <div role="radiogroup" aria-label="Screen width" className="grid grid-cols-4 gap-0.5 rounded-[10px] p-[3px]" style={{ backgroundColor: B.surface, boxShadow: `inset 0 0 0 1px ${B.line}` }}>
              {DEVICES.map((d) => (
                <button key={d.key} type="button" role="radio" aria-checked={d.key === device} onClick={() => setDevice(d.key)} className="mm-tool flex min-h-9 flex-col items-center justify-center rounded-lg px-1 text-[12px] leading-tight" style={d.key === device ? { backgroundColor: "white", fontWeight: 600, boxShadow: `0 0 0 1px ${B.line}` } : { color: B.muted, fontWeight: 500 }}>
                  {d.label}
                  <span className="text-[11px] font-normal tabular-nums" style={{ color: B.muted }}>{d.w}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-0.5 border-t pt-3" style={{ borderColor: B.line }}>
            <Toggle on={long} label="Long event name" onChange={setLong} />
            <Toggle on={large} label="Large participant count" onChange={setLarge} />
            {large && <p className="px-2 text-[12px]" style={{ color: B.muted }}>1,284 participants once the event is live (a draft can’t have registrations).</p>}
          </div>
          <p className="border-t pt-3 text-[12px] leading-snug" style={{ borderColor: B.line, color: B.muted }}>The page on the right is fully live at the chosen width: scroll it, press Set up and Publish, tick tasks, open the status menu.</p>
        </aside>

        <Frame src={src} width={dev.w} />
      </div>
    </div>
  );
}
