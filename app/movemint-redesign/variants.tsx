"use client";
import { useState } from "react";
import { B, EVENT, REQUIRED, RECOMMENDED, TOTAL, NEXT, Icon, SetUp, SubTabs, pressable, type Rec } from "./shell";
import { useFlow, PublishButton, StatusPill, Toast, STATUSES, type Flow } from "./flow";

const label = "text-[12px] font-medium uppercase tracking-[0.08em]";

function Frame({ flow, children }: { flow: Flow; children: React.ReactNode }) {
  const [sub, setSub] = useState(0);
  return (
    <>
      <SubTabs cur={sub} onChange={setSub} />
      {children}
      <Toast flow={flow} />
    </>
  );
}

// Done is quiet: a thin muted check, no fill. Green is reserved for "Live".
function Check({ size = "size-5" }: { size?: string }) {
  return (
    <span className={`mm-pop flex ${size} shrink-0 items-center justify-center`} style={{ color: B.muted }}>
      <Icon n="check" className="size-4" />
    </span>
  );
}

// Required steps: done ones quiet, the open one leads with its action. Once all are done the list
// collapses behind a summary row: open while you finish (so the last check lands), closed after publishing.
function RequiredList({ flow }: { flow: Flow }) {
  const allDone = flow.stage !== "setup";
  const [override, setOverride] = useState<boolean | null>(null);
  const open = !allDone || (override ?? flow.stage !== "live");
  const rows = REQUIRED.map((r) => ({ ...r, done: r.done || allDone }));
  return (
    <div className="overflow-hidden rounded-xl" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
      {allDone && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls="required-steps"
          onClick={() => setOverride(!open)}
          className="mm-tool flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-150 hover:bg-[oklch(0.975_0.004_285)]"
        >
          <Check />
          <span className="flex-1 text-[14px] font-medium">All {REQUIRED.length} required steps done</span>
          <span className="text-[13px]" style={{ color: B.muted }}>{open ? "Hide" : "Show"}</span>
          <span style={{ color: B.faint }}><Icon n="chevronDown" className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} /></span>
        </button>
      )}
      {/* grid-rows 0fr → 1fr animates to the content's real height */}
      <div
        id="required-steps"
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        inert={!open}
      >
        <ul className="min-h-0 overflow-hidden">
          {[...rows].sort((a, b) => Number(a.done) - Number(b.done)).map((r, i) => (
            <li key={r.title} style={i || allDone ? { borderTop: `1px solid ${B.line}` } : undefined}>
              {r.done ? (
                <div className="flex items-center gap-3 px-4 py-2.5 text-[14px]">
                  <Check />
                  <span className="flex-1" style={{ color: B.muted }}>{r.title}</span>
                  <span className="text-[13px]" style={{ color: B.faint }}>{r.title === NEXT.title ? flow.regLine : "Done"}</span>
                </div>
              ) : (
                <div style={{ backgroundColor: B.accentTint }}>
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <span className="size-5 shrink-0 rounded-full" style={{ boxShadow: `inset 0 0 0 2px ${B.accent}` }} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold">{r.title}</span>
                      <span className="block text-[13px]" style={{ color: B.muted }}>{r.desc}</span>
                    </span>
                    <SetUp onClick={flow.openSetup} />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TaskRow({ r }: { r: Rec }) {
  return (
    <button type="button" className="group flex w-full items-center gap-3.5 px-4 py-3 text-left transition-colors duration-150 hover:bg-[oklch(0.975_0.004_285)]">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: B.surface, color: B.muted }}>
        <Icon n={r.done ? "check" : r.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-medium" style={r.done ? { color: B.muted } : undefined}>{r.title}</span>
        <span className="block truncate text-[13px]" style={{ color: B.muted }} title={r.desc}>{r.desc}</span>
      </span>
      <span style={{ color: B.faint }} className="transition-transform duration-150 group-hover:translate-x-0.5"><Icon n="chevron" /></span>
    </button>
  );
}

function RecommendedList({ cols = 1, initial = 6 }: { cols?: 1 | 2; initial?: number }) {
  const [all, setAll] = useState(false);
  const list = [...RECOMMENDED].sort((a, b) => Number(!!a.done) - Number(!!b.done));
  const shown = all ? list : list.slice(0, initial);
  return (
    <div className="overflow-hidden rounded-xl" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
      <ul className={`grid grid-cols-1 gap-px ${cols === 2 ? "lg:grid-cols-2" : ""}`} style={{ backgroundColor: B.line }}>
        {shown.map((r) => (
          <li key={r.title} className="bg-white">
            <TaskRow r={r} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => setAll((a) => !a)} className="flex h-10 w-full items-center justify-center gap-1 text-[13px] font-medium" style={{ borderTop: `1px solid ${B.line}`, backgroundColor: B.surface, color: B.muted }}>
        {all ? "Show less" : `Show ${list.length - initial} more`}
        <Icon n="chevronDown" className={`size-3.5 transition-transform duration-200 ${all ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}

/* ───────────── 1 · Start line: setup drawn as a race course ───────────── */
const W = 1000;
const yAt = (x: number) => 58 + 22 * Math.sin((x / W) * Math.PI * 3 + 0.4);
const STOPS = [
  ...REQUIRED.map((r, i) => ({ x: 50 + i * 118, kind: "req" as const, label: r.title })),
  { x: 720, kind: "publish" as const, label: "Publish" },
  { x: 950, kind: "finish" as const, label: "Race day · Nov 6" },
];
// progress along the curve has to use arc length, not x — the sine makes the path longer where it climbs
const ARC = (() => {
  const out = [0];
  for (let i = 1; i <= 1000; i++) out.push(out[i - 1] + Math.hypot(1, yAt(i) - yAt(i - 1)));
  return out;
})();
const along = (x: number) => ARC[Math.round(x)] / ARC[1000];
const pathD = Array.from({ length: 101 }, (_, i) => {
  const x = (i / 100) * W;
  return `${i ? "L" : "M"}${x.toFixed(1)},${yAt(x).toFixed(1)}`;
}).join(" ");

export function StartLine() {
  const flow = useFlow();
  const reached = flow.stage === "setup" ? 3 : flow.stage === "ready" ? 4 : 5; // last checkpoint passed
  const cur = STOPS[reached + 1];
  const progress = along(STOPS[reached].x);
  return (
    <Frame flow={flow}>
      <section className="mt-6 overflow-hidden rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 px-5 pt-5 sm:px-7 sm:pt-6">
          <div>
            <StatusPill flow={flow} />
            <p className="mt-2 font-serif text-[38px] leading-[0.95] tracking-[-0.01em] sm:text-[52px]">
              {EVENT.daysAway} days <span style={{ color: B.muted }}>to the start line</span>
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px]" style={{ color: B.muted }}>
              <span className="flex items-center gap-1.5"><Icon n="calendar" /> {EVENT.weekday}, {EVENT.date}</span>
              <span className="flex items-center gap-1.5"><Icon n="pin" /> {EVENT.place}</span>
            </p>
          </div>
          <PublishButton flow={flow} big />
        </div>

        <div className="relative mx-5 mt-4 h-[150px] sm:mx-7">
          <svg viewBox={`0 0 ${W} 120`} preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[120px] w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="course" x1="0" x2="1">
                <stop offset="0" stopColor="oklch(0.74 0.15 35)" />
                <stop offset="0.35" stopColor="oklch(0.66 0.16 320)" />
                <stop offset="0.65" stopColor="oklch(0.62 0.15 285)" />
                <stop offset="1" stopColor="oklch(0.74 0.12 235)" />
              </linearGradient>
            </defs>
            <path d={pathD} fill="none" stroke={B.faint} strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path
              d={pathD}
              fill="none"
              stroke="url(#course)"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - progress}
              className="transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
            />
          </svg>
          {STOPS.map((s, i) => {
            const passed = i <= reached;
            const isCur = s === cur;
            return (
              <div key={s.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(s.x / W) * 100}%`, top: yAt(s.x) }}>
                {s.kind === "finish" ? (
                  <span className="flex size-9 items-center justify-center rounded-full text-white" style={{ backgroundImage: B.gradientDiag }}><Icon n="flag" /></span>
                ) : s.kind === "publish" ? (
                  <span
                    className={`flex size-8 items-center justify-center rounded-full ${isCur ? "mm-pulse" : ""}`}
                    style={passed ? { backgroundColor: B.ink, color: "white" } : { backgroundColor: "white", color: isCur ? B.accent : B.faint, border: `2px solid ${isCur ? B.accent : B.line}` }}
                  >
                    <Icon n="rocket" />
                  </span>
                ) : passed ? (
                  <span className="mm-pop block size-3 rounded-full border-2 bg-white" style={{ borderColor: B.ink }} />
                ) : (
                  <button type="button" aria-label={`Set up: ${s.label}`} onClick={flow.openSetup} className="mm-pulse block size-6 rounded-full border-[3px] bg-white" style={{ borderColor: B.accent }} />
                )}
                <span className={`absolute left-1/2 top-full mt-2 w-28 -translate-x-1/2 text-center text-[12px] leading-tight ${isCur ? "" : s.kind === "finish" ? "!left-auto right-0 translate-x-0 text-right" : "hidden lg:block"}`} style={{ color: isCur ? B.ink : B.muted, fontWeight: isCur ? 600 : 400 }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-7" style={{ borderTop: `1px solid ${B.line}`, backgroundColor: B.surface }}>
          {flow.stage === "setup" ? (
            <>
              <p className="text-[14px]"><span className="font-semibold">Next checkpoint · {NEXT.title}.</span> <span style={{ color: B.muted }}>{NEXT.desc}</span></p>
              <SetUp onClick={flow.openSetup} />
            </>
          ) : flow.stage === "ready" ? (
            <p className="text-[14px]"><span className="font-semibold">All 5 required checkpoints passed.</span> <span style={{ color: B.muted }}>Publish to put your event on the map.</span></p>
          ) : (
            <p className="text-[14px]"><span className="font-semibold" style={{ color: B.success }}>You’re live.</span> <span style={{ color: B.muted }}>{flow.participantsLine}. Next stop: race day.</span></p>
          )}
        </div>
      </section>

      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ["Participants", "0", flow.participantsLine],
          ["Checklist", `${flow.done}/${TOTAL}`, `${flow.reqDone} of 5 required`],
          ["Registration", flow.stage === "live" && flow.opens.mode === "publish" ? "Open" : "Closed", flow.stage === "setup" ? "Window not set" : flow.regLine],
        ].map(([k, v, s]) => (
          <div key={k} className="rounded-xl px-5 py-4" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
            <dt className={label} style={{ color: B.muted }}>{k}</dt>
            <dd className="mt-1 font-serif text-[32px] leading-none tabular-nums">{v}</dd>
            <dd className="mt-1 text-[13px]" style={{ color: B.muted }}>{s}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[18px] font-semibold">Recommended <span className="font-normal" style={{ color: B.muted }}>· optional, skip what doesn’t fit</span></h2>
          <span className="text-[13px] tabular-nums" style={{ color: B.muted }}>1 of 18 done</span>
        </div>
        <RecommendedList cols={2} initial={8} />
      </section>
    </Frame>
  );
}

// The event as its own brand card (shared by Poster and Combined).
function PosterCard({ flow, registered = true }: { flow: Flow; registered?: boolean }) {
  const live = flow.stage === "live";
  return (
    <article className="relative flex aspect-[4/5] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl p-6 text-white sm:aspect-[16/10] sm:max-w-none lg:aspect-[4/5]" style={{ backgroundImage: B.gradientDiag }}>
      <div aria-hidden="true" className="absolute inset-0 opacity-40 mix-blend-soft-light" style={{ backgroundImage: "radial-gradient(circle at 20% 15%, white 0, transparent 45%), radial-gradient(circle at 85% 90%, black 0, transparent 50%)" }} />
      <div className="relative flex items-start justify-between">
        {/* the real wordmark, knocked out to white */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/deck/movemint-logo.png" alt="Movemint" width={432} height={74} className="h-[18px] w-auto brightness-0 invert" />
        <span
          key={flow.status}
          className="mm-stamp rotate-[-8deg] rounded-md px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.14em]"
          style={{ boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.9)", backgroundColor: live ? "white" : "transparent", color: live ? B.success : "white" }}
        >
          {STATUSES.find((x) => x.key === flow.status)!.label}
        </span>
      </div>
      <h2 className="relative mt-auto font-serif text-[38px] leading-[0.98] tracking-[-0.01em] [text-wrap:balance]">{EVENT.name}</h2>
      <div className="relative mt-5 grid grid-cols-2 gap-3 border-t border-white/30 pt-4 text-[13px]">
        <p><span className="block text-white/70">When</span>{EVENT.weekday.slice(0, 3)}, {EVENT.date}</p>
        <p><span className="block text-white/70">Where</span>{EVENT.place}</p>
        {registered && <p><span className="block text-white/70">Registered</span><span className="font-serif text-[32px] leading-none">0</span></p>}
        <p><span className="block text-white/70">Countdown</span><span className="font-serif text-[32px] leading-none">{EVENT.daysAway}</span> days</p>
      </div>
    </article>
  );
}

/* ───────────── 2 · Poster: the event as its own brand card, plus the one thing to do next ───────────── */
export function Poster() {
  const flow = useFlow();
  const live = flow.stage === "live";
  return (
    <Frame flow={flow}>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <PosterCard flow={flow} />

        <div className="flex flex-col gap-4">
          <section className="flex flex-1 flex-col rounded-2xl p-6" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
            <p className={label} style={{ color: B.accentStrong }}>Up next</p>
            {flow.stage === "setup" && (
              <>
                <h3 className="mt-2 font-serif text-[32px] leading-tight">{NEXT.title}</h3>
                <p className="mt-1 max-w-[52ch] text-[14px]" style={{ color: B.muted }}>{NEXT.desc} It’s the last required step before you can publish.</p>
                <div className="mt-auto flex items-center gap-3 pt-6">
                  <SetUp onClick={flow.openSetup} />
                  <PublishButton flow={flow} />
                </div>
              </>
            )}
            {flow.stage === "ready" && (
              <>
                <h3 className="mt-2 font-serif text-[32px] leading-tight">Publish your event</h3>
                <p className="mt-1 max-w-[52ch] text-[14px]" style={{ color: B.muted }}>
                  Everything required is set. Registration {flow.opens.mode === "publish" ? "opens the moment you publish" : flow.regLine.toLowerCase()}.
                </p>
                <div className="mt-auto pt-6"><PublishButton flow={flow} big /></div>
              </>
            )}
            {live && (
              <>
                <h3 className="mt-2 font-serif text-[32px] leading-tight">Get the word out</h3>
                <p className="mt-1 max-w-[52ch] text-[14px]" style={{ color: B.muted }}>Your event is live. {flow.participantsLine}. Share the link or the QR code to start filling the start list.</p>
                <div className="mt-auto flex gap-2 pt-6">
                  <button type="button" className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[14px] font-semibold text-white ${pressable}`} style={{ backgroundColor: B.ink }}><Icon n="link" /> Copy event link</button>
                  <button type="button" className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[14px] font-semibold ${pressable}`} style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}><Icon n="qr" /> QR code</button>
                </div>
              </>
            )}
          </section>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl p-5" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
              <p className={label} style={{ color: B.muted }}>Required</p>
              <p className="mt-1 font-serif text-[32px] leading-none tabular-nums">{flow.reqDone}<span style={{ color: B.faint }}>/5</span></p>
              <div className="mt-3 flex gap-1">
                {REQUIRED.map((r, i) => (
                  <span key={r.title} className="h-1.5 flex-1 rounded-full transition-colors duration-500" style={{ backgroundColor: i < flow.reqDone ? B.ink : B.surface }} />
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
              <p className={label} style={{ color: B.muted }}>Recommended</p>
              <p className="mt-1 font-serif text-[32px] leading-none tabular-nums">1<span style={{ color: B.faint }}>/18</span></p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: B.surface }}>
                <div className="h-full rounded-full" style={{ width: `${100 / 18}%`, backgroundImage: B.gradient, backgroundSize: "1800% 100%" }} />
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <div>
          <h2 className="text-[18px] font-semibold">Event checklist</h2>
          <p className="mt-1 text-[13px] tabular-nums" style={{ color: B.muted }}>{flow.done} of {TOTAL} complete</p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <div>
            <p className={`${label} mb-2`} style={{ color: B.muted }}>Required</p>
            <RequiredList flow={flow} />
          </div>
          <div>
            <p className={`${label} mb-2`} style={{ color: B.muted }}>Recommended</p>
            <RecommendedList initial={6} />
          </div>
        </div>
      </section>
    </Frame>
  );
}

/* ───────────── 3 · Timeline: the checklist laid out before, during and after the event ───────────── */
const GROUPS: { key: Rec["when"]; title: string }[] = [
  { key: "promote", title: "Get found" },
  { key: "registration", title: "Registration" },
];
function Node({ state, icon }: { state: "done" | "now" | "later"; icon?: string }) {
  return (
    <span
      className={`relative z-10 flex size-8 items-center justify-center rounded-full ${state === "now" ? "mm-pulse" : ""}`}
      style={
        state === "done"
          ? { backgroundColor: B.surface, color: B.muted, border: `1px solid ${B.line}` }
          : state === "now"
            ? { backgroundColor: "white", color: B.accent, border: `2px solid ${B.accent}` }
            : { backgroundColor: "white", color: B.faint, boxShadow: `inset 0 0 0 1px ${B.line}` }
      }
    >
      <Icon n={state === "done" ? "check" : icon ?? "calendar"} className="size-3.5" />
    </span>
  );
}
function Step({ when, title, node, children, last = false, tag, dashed = false }: { when: string; title: string; node: React.ReactNode; children?: React.ReactNode; last?: boolean; tag?: React.ReactNode; dashed?: boolean }) {
  return (
    <li className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-4 sm:grid-cols-[96px_32px_minmax(0,1fr)] sm:gap-x-5">
      <p className="hidden pt-1.5 text-right text-[13px] font-medium tabular-nums sm:block" style={{ color: B.muted }}>{when}</p>
      <div className="relative flex justify-center">
        {node}
        {!last && <span aria-hidden="true" className="absolute bottom-0 top-8 w-0" style={{ borderLeft: `${dashed ? 2 : 1}px ${dashed ? "dashed" : "solid"} ${dashed ? B.line : B.faint}` }} />}
      </div>
      <div className="min-w-0 pb-10">
        <p className="text-[12px] font-medium tabular-nums sm:hidden" style={{ color: B.muted }}>{when}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
          <h3 className="text-[18px] font-semibold">{title}</h3>
          {tag}
        </div>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </li>
  );
}
function Group({ items }: { items: Rec[] }) {
  return (
    <ul className="overflow-hidden rounded-xl" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
      {items.map((r, i) => (
        <li key={r.title} style={i ? { borderTop: `1px solid ${B.line}` } : undefined}><TaskRow r={r} /></li>
      ))}
    </ul>
  );
}

export function Timeline() {
  const flow = useFlow();
  const st = flow.stage;
  const by = (k: Rec["when"]) => RECOMMENDED.filter((r) => r.when === k);
  return (
    <Frame flow={flow}>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-2xl px-5 py-5 sm:px-6" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <StatusPill flow={flow} />
          <p><span className="font-serif text-[32px] leading-none tabular-nums">{EVENT.daysAway}</span> <span className="text-[14px]" style={{ color: B.muted }}>days to go</span></p>
          <p><span className="font-serif text-[32px] leading-none tabular-nums">0</span> <span className="text-[14px]" style={{ color: B.muted }}>participants</span></p>
          <p><span className="font-serif text-[32px] leading-none tabular-nums">{flow.done}</span><span className="text-[14px]" style={{ color: B.muted }}>/{TOTAL} tasks</span></p>
        </div>
        <PublishButton flow={flow} />
      </div>

      <ol className="mt-10">
        <Step when={`Today · ${EVENT.today}`} title={st === "setup" ? "Finish the required setup" : "Required setup complete"} node={<Node state={st === "setup" ? "now" : "done"} icon="circleDashed" />}>
          <RequiredList flow={flow} />
        </Step>
        <Step when={st === "live" ? `Live · ${EVENT.today}` : "When ready"} title={st === "live" ? "Published" : "Publish your event"} node={<Node state={st === "live" ? "done" : st === "ready" ? "now" : "later"} icon="rocket" />}>
          {st === "live" ? (
            <p className="text-[14px]" style={{ color: B.muted }}>{flow.participantsLine}. Your event page is visible to everyone.</p>
          ) : (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <PublishButton flow={flow} />
              <p className="text-[14px]" style={{ color: B.muted }}>{st === "ready" ? `Registration ${flow.regLine.toLowerCase()}.` : "Unlocks once the required setup is done."}</p>
            </div>
          )}
        </Step>
        <Step when="Before race day" title="Fill the start list" node={<Node state="later" icon="megaphone" />}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {GROUPS.map((g) => (
              <div key={g.key}>
                <p className={`${label} mb-2`} style={{ color: B.muted }}>{g.title}</p>
                <Group items={by(g.key)} />
              </div>
            ))}
          </div>
        </Step>
        <Step
          when={`${EVENT.weekday.slice(0, 3)} · Nov 6`}
          title="Race day"
          node={<span className="relative z-10 flex size-8 items-center justify-center rounded-full text-white" style={{ backgroundImage: B.gradientDiag }}><Icon n="flag" className="size-3.5" /></span>}
        >
          <Group items={by("raceday")} />
        </Step>
        <Step when="After" title="Wrap up" node={<Node state="later" icon="image" />} last>
          <Group items={by("after")} />
        </Step>
      </ol>
    </Frame>
  );
}

/* ───────────── 0 · Combined: poster + stat cards + timeline, required vs optional made explicit ───────────── */
function Tag({ kind, children }: { kind: "required" | "optional"; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex h-6 items-center rounded-md px-2 text-[12px] font-medium"
      style={kind === "required" ? { boxShadow: `inset 0 0 0 1px ${B.ink}`, color: B.ink } : { backgroundColor: B.surface, color: B.muted }}
    >
      {children}
    </span>
  );
}

// Card link: labelled, 40px hit area via a pseudo-element, arrow nudges on hover. The card itself is not one big <a>.
function CardLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative -mr-1 inline-flex items-center gap-1 rounded-md px-1 text-[13px] font-medium before:absolute before:-inset-x-2 before:-inset-y-3"
      style={{ color: B.ink }}
    >
      {children}
      <span className="transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: B.muted }}><Icon n="chevron" className="size-3.5" /></span>
    </button>
  );
}

// Optional task as a borderless tile: icon, title and its short description (no box, no truncation).
function TaskTile({ r }: { r: Rec }) {
  return (
    <button
      type="button"
      className="mm-tool group flex w-full min-w-0 items-start gap-3 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-[oklch(0.975_0.004_285)]"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: B.surface, color: B.muted }}><Icon n={r.done ? "check" : r.icon} /></span>
      <span className="min-w-0 flex-1 pt-px">
        <span className="flex items-center gap-1 text-[14px] font-medium" style={r.done ? { color: B.muted } : undefined}>
          {r.title}
          {r.done && <span className="text-[12px] font-normal" style={{ color: B.faint }}>· Done</span>}
          <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" style={{ color: B.faint }}><Icon n="chevron" className="size-3.5" /></span>
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug [text-wrap:pretty]" style={{ color: B.muted }}>{r.desc}</span>
      </span>
    </button>
  );
}
function TileGroup({ title, items }: { title: string; items: Rec[] }) {
  return (
    <div>
      <p className={`${label} mb-2`} style={{ color: B.muted }}>{title}</p>
      {/* one container per group, hairline dividers between tiles (gap-px over the line color) — cells in a row share a height */}
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl sm:grid-cols-2" style={{ backgroundColor: B.line, boxShadow: `0 0 0 1px ${B.line}` }}>
        {items.map((r) => (
          <li key={r.title} className="flex min-w-0 bg-white"><TaskTile r={r} /></li>
        ))}
        {items.length % 2 === 1 && <li aria-hidden="true" className="hidden bg-white sm:block" />}
      </ul>
    </div>
  );
}

// Timeline step without a date gutter: the date sits above the title, so the whole right column shares one left edge.
function Stage({ when, title, tag, node, dashed = false, last = false, compact = false, children }: { when: string; title: string; tag?: React.ReactNode; node: React.ReactNode; dashed?: boolean; last?: boolean; compact?: boolean; children?: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-4">
      <div className="relative flex justify-center">
        {node}
        {!last && <span aria-hidden="true" className="absolute bottom-0 top-8 w-0" style={{ borderLeft: `${dashed ? 2 : 1}px ${dashed ? "dashed" : "solid"} ${dashed ? B.line : B.faint}` }} />}
      </div>
      <div className={`min-w-0 ${compact ? "pb-6" : "pb-10"}`}>
        <p className="text-[12px] font-medium" style={{ color: B.muted }}>{when}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-[18px] font-semibold">{title}</h3>
          {tag}
        </div>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </li>
  );
}

// Dashboard figures: one voice for all three (Inter 24/600, tabular). Serif stays on the poster and the title.
const statValue = "mt-1.5 text-[24px] font-semibold leading-none tracking-[-0.01em] tabular-nums";

export function Combined() {
  const flow = useFlow();
  const st = flow.stage;
  const by = (k: Rec["when"]) => RECOMMENDED.filter((r) => r.when === k);
  const recDone = RECOMMENDED.filter((r) => r.done).length;
  const regOpen = st === "live" && flow.opens.mode === "publish";
  return (
    <Frame flow={flow}>
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
        {/* left: the event, and the one action, always in view */}
        <aside className="grid gap-4 lg:sticky lg:top-6">
          <PosterCard flow={flow} registered={false} />
          {st === "setup" ? (
            // no grey placeholder button: say what's left and link straight to it
            <p className="text-[14px] [text-wrap:pretty]" style={{ color: B.muted }}>
              1 step left before you can publish:{" "}
              <button type="button" onClick={flow.openSetup} className="font-medium underline decoration-from-font underline-offset-2" style={{ color: B.accentStrong }}>
                {NEXT.title.toLowerCase()}
              </button>
            </p>
          ) : st === "ready" ? (
            <>
              <PublishButton flow={flow} big className="w-full" />
              <p className="text-center text-[13px]" style={{ color: B.muted }}>Everything required is set</p>
            </>
          ) : (
            // live: the stamp + status menu already say "Live" — offer the next step instead of a third "Live"
            <>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText("https://movemint.cc/events/EevkbfU").catch(() => {});
                  flow.notify("Link copied");
                }}
                className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-[14px] font-semibold ${pressable}`}
                style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}
              >
                <Icon n="link" /> Copy event link
              </button>
              <p className="text-center text-[13px]" style={{ color: B.muted }}>Share it to start filling the start list</p>
            </>
          )}
        </aside>

        <div className="min-w-0">
          {/* one strip, three facts: dividers instead of three boxes; serif only for numbers */}
          <dl className="grid grid-cols-1 rounded-xl sm:grid-cols-3" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
            <div className="group px-5 py-4">
              <dt className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: B.muted }}>Participants</span>
                <CardLink onClick={() => flow.notify("Opens Participants")}>View all</CardLink>
              </dt>
              <dd className={statValue}>0</dd>
              <dd className="mt-1 text-[13px]" style={{ color: B.muted }}>{st === "live" ? "Registration is open" : "No registrations yet"}</dd>
            </div>
            <div className="px-5 py-4 max-sm:border-t sm:border-l" style={{ borderColor: B.line }}>
              <dt className="text-[13px] font-medium" style={{ color: B.muted }}>Required setup</dt>
              <dd className={statValue}>{flow.reqDone}<span style={{ color: B.faint }}>/5</span></dd>
              <dd className="mt-1 text-[13px] tabular-nums" style={{ color: B.muted }}>{recDone} of {RECOMMENDED.length} optional done</dd>
            </div>
            <div className="group px-5 py-4 max-sm:border-t sm:border-l" style={{ borderColor: B.line }}>
              <dt className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: B.muted }}>Registration</span>
                <CardLink onClick={flow.openSetup}>{st === "setup" ? "Set window" : "Edit"}</CardLink>
              </dt>
              <dd className={`${statValue} flex items-center gap-2`}>
                <span className="size-2 rounded-full" style={{ backgroundColor: regOpen ? B.success : B.faint }} />
                {regOpen ? "Open" : "Closed"}
              </dd>
              <dd className="mt-1 text-[13px]" style={{ color: B.muted }}>{st === "setup" ? "Window not set" : flow.regLine}</dd>
            </div>
          </dl>

          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
              <h2 className="text-[18px] font-semibold">Event checklist</h2>
              <div className="flex w-full items-center gap-3 sm:w-auto" role="progressbar" aria-label="Tasks complete" aria-valuemin={0} aria-valuemax={TOTAL} aria-valuenow={flow.done}>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full sm:w-32 sm:flex-none" style={{ backgroundColor: B.surface }}>
                  <div className="h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none" style={{ width: `${(flow.done / TOTAL) * 100}%`, backgroundColor: B.accent }} />
                </div>
                <span className="text-[13px] tabular-nums" style={{ color: B.muted }}><span className="font-semibold" style={{ color: B.ink }}>{flow.done}</span> of {TOTAL} tasks complete</span>
              </div>
            </div>
            <p className="mt-1 text-[14px] [text-wrap:pretty]" style={{ color: B.muted }}>A list of tasks to complete before, during, and after your event, from setup to post‑race wrap‑up.</p>
          </div>

          <ol className="mt-8">
            <Stage
              when={`Today · ${EVENT.today}`}
              title={st === "setup" ? "Finish the setup" : "Setup complete"}
              tag={<Tag kind="required">Required · {flow.reqDone} of 5</Tag>}
              node={<Node state={st === "setup" ? "now" : "done"} icon="circleDashed" />}
            >
              <RequiredList flow={flow} />
            </Stage>
            {/* publish is a milestone, not a section: one line */}
            <Stage
              when={st === "live" ? `Live · ${EVENT.today}` : st === "ready" ? "Ready now" : "After setup"}
              title={st === "live" ? "Published" : "Publish"}
              tag={<Tag kind="required">Required</Tag>}
              node={<Node state={st === "live" ? "done" : st === "ready" ? "now" : "later"} icon="rocket" />}
              dashed
              compact
            />
            <Stage when="Before race day" title="Fill the start list" tag={<Tag kind="optional">Optional · {recDone} of {RECOMMENDED.length}</Tag>} node={<Node state="later" icon="megaphone" />} dashed>
              <div className="grid gap-5">
                {GROUPS.map((g) => (
                  <TileGroup key={g.key} title={g.title} items={by(g.key)} />
                ))}
              </div>
            </Stage>
            <Stage
              when={`${EVENT.weekday.slice(0, 3)} · Nov 6`}
              title="Race day"
              tag={<Tag kind="optional">Optional</Tag>}
              node={<span className="relative z-10 flex size-8 items-center justify-center rounded-full text-white" style={{ backgroundImage: B.gradientDiag }}><Icon n="flag" className="size-3.5" /></span>}
              dashed
            >
              <TileGroup title="On the day" items={by("raceday")} />
            </Stage>
            <Stage when="After" title="Wrap up" tag={<Tag kind="optional">Optional</Tag>} node={<Node state="later" icon="image" />} last>
              <TileGroup title="After the race" items={by("after")} />
            </Stage>
          </ol>
        </div>
      </div>
    </Frame>
  );
}
