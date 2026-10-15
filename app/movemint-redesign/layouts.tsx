"use client";
// Layout round for the Combined direction: same content, same flow, same checkboxes — the tasks get the full width.
//  Banner · the poster becomes a short band on top; one full-width timeline below.
//  Stages · a stage stepper; one stage's tasks at a time, full width.
//  Board  · the lifecycle as columns, left to right.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { B, EVENT, RECOMMENDED, TOTAL, NEXT, Icon, SetUp, pressable, type Rec } from "./shell";
import { useFlow, PublishButton, STATUSES, type Flow } from "./flow";
import { Frame, RequiredList, GROUPS, Tag, Mark, Stage, CardLink, TileGroup, CheckTile, statValue, label, doneBox, emptyBox } from "./variants";

const by = (k: Rec["when"]) => RECOMMENDED.filter((r) => r.when === k);

// The one next action, wherever a layout puts it.
function NextAction({ flow, className = "" }: { flow: Flow; className?: string }) {
  if (flow.stage === "setup") return <SetUp onClick={flow.openSetup} className={className} />;
  if (flow.stage === "ready") return <PublishButton flow={flow} className={className} />;
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText("https://movemint.cc/events/EevkbfU").catch(() => {});
        flow.notify("Link copied");
      }}
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-white px-3.5 text-[13px] font-semibold ${pressable} ${className}`}
      style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}
    >
      <Icon n="link" /> Copy event link
    </button>
  );
}
const nextLine = (flow: Flow) =>
  flow.stage === "setup" ? `Next: ${NEXT.title.toLowerCase()}` : flow.stage === "ready" ? "Everything required is set — publish when ready" : "Share the link to start filling the start list";

function Stamp({ flow }: { flow: Flow }) {
  const live = flow.stage === "live";
  return (
    <span
      key={flow.status}
      className="mm-stamp inline-block rotate-[-6deg] rounded-md px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.14em]"
      style={{ boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.9)", backgroundColor: live ? "white" : "transparent", color: live ? B.success : "white" }}
    >
      {STATUSES.find((x) => x.key === flow.status)!.label}
    </span>
  );
}

// Three facts, one strip: uppercase label, the figure, one supporting line. Setup progress gets a bar.
function Facts({ flow, dense = false }: { flow: Flow; dense?: boolean }) {
  const st = flow.stage;
  const regOpen = st === "live" && flow.opens.mode === "publish";
  const cell = dense ? "px-5 py-4" : "px-5 py-5";
  const head = (t: string, link?: React.ReactNode) => (
    <dt className="flex items-center justify-between">
      <span className={label} style={{ color: B.muted }}>{t}</span>
      {link}
    </dt>
  );
  const sub = `${dense ? "mt-1.5" : "mt-2"} text-[13px] [text-wrap:pretty]`;
  return (
    <dl className="grid grid-cols-1 rounded-xl sm:grid-cols-3" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
      <div className={`group ${cell}`}>
        {head("Participants", <CardLink onClick={() => flow.notify("Opens Participants")}>View all</CardLink>)}
        <dd className={statValue}>0</dd>
        <dd className={sub} style={{ color: B.muted }}>No registrations yet</dd>
      </div>
      <div className={`${cell} max-sm:border-t sm:border-l`} style={{ borderColor: B.line }}>
        {head("Required setup")}
        <dd className={statValue}>{flow.reqDone}<span style={{ color: B.muted }}>/5</span></dd>
        <dd className={`${dense ? "mt-2.5 h-1" : "mt-3 h-1.5"} overflow-hidden rounded-full`} style={{ backgroundColor: B.surface, boxShadow: `inset 0 0 0 1px ${B.line}` }} aria-hidden="true">
          <div className="h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none" style={{ width: `${(flow.reqDone / 5) * 100}%`, backgroundColor: B.accent }} />
        </dd>
        <dd className={sub} style={{ color: B.muted }}>{st === "setup" ? `${5 - flow.reqDone} step before publishing` : st === "ready" ? "Ready to publish" : "All done"}</dd>
      </div>
      <div className={`group ${cell} max-sm:border-t sm:border-l`} style={{ borderColor: B.line }}>
        {head("Registration", st !== "setup" ? <CardLink onClick={flow.openSetup}>Edit</CardLink> : undefined)}
        <dd className={`${statValue} flex items-center gap-2`}>
          <span className="size-2.5 rounded-full" style={{ backgroundColor: regOpen ? B.success : B.faint }} />
          {regOpen ? "Open" : "Closed"}
        </dd>
        <dd className={sub} style={{ color: B.muted }}>{st === "setup" ? "Window not set" : st === "live" && flow.opens.mode === "publish" ? `Opened ${EVENT.today} at publish` : flow.regLine}</dd>
      </div>
    </dl>
  );
}

// Overall progress is text only: one bar on the page (Required setup) is enough.
function Progress({ flow }: { flow: Flow }) {
  return (
    <p className="text-[13px] tabular-nums" style={{ color: B.muted }}>
      <span className="font-semibold" style={{ color: B.ink }}>{flow.done}</span> of {TOTAL} tasks complete
    </p>
  );
}

function ChecklistHead({ flow }: { flow: Flow }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
        <h2 className="text-[18px] font-semibold">Event checklist</h2>
        <Progress flow={flow} />
      </div>
      <p className="mt-1 max-w-[72ch] text-[14px] [text-wrap:pretty]" style={{ color: B.muted }}>A list of tasks to complete before, during, and after your event, from setup to post‑race wrap‑up.</p>
    </div>
  );
}

/* ───────────── A · Banner: the poster as a short band; the timeline gets the full width ───────────── */
// Overview: four cells on one row grid — label (16px) · value (28px) · one supporting line. The event card
// is the first cell (gradient, serif title on one line); the three facts follow. Same rows everywhere, so
// every label, value and line shares a baseline across the strip.
function Overview({ flow, ref }: { flow: Flow; ref?: React.Ref<HTMLDivElement> }) {
  const st = flow.stage;
  const regOpen = st === "live" && flow.opens.mode === "publish" && !flow.regClosed;
  const live = st === "live";
  const stamp = STATUSES.find((x) => x.key === flow.status)!.label;
  const cell = "min-w-0 px-5 py-4";
  const row1 = "flex h-4 items-center justify-between gap-3";
  const row2 = "mt-2 flex h-7 items-center gap-3";
  const row3 = "mt-2 truncate text-[13px] leading-5";
  const labelC = `${label} leading-4`;
  return (
    <div ref={ref} className="@container mt-6">
      <div className="grid gap-3 @5xl:grid-cols-[minmax(0,1.45fr)_minmax(0,3fr)]">
      {/* the event card previews the public page, so clicking it opens Preview (Luma) */}
      <button type="button" onClick={() => flow.notify("Opens your event page preview")} aria-label={`Preview the event page for ${flow.name}`} className={`${cell} group/ev rounded-xl text-left text-white transition-[filter,transform] duration-150 hover:brightness-[1.04] active:scale-[0.99]`} style={{ backgroundImage: B.gradientDiag }}>
        <span className={row1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/movemint-logo.png" alt="Movemint" width={432} height={74} className="h-[13px] w-auto brightness-0 invert" />
          <span
            key={flow.status}
            className="mm-stamp rotate-[-4deg] rounded-[4px] px-1.5 py-px text-[10px] font-bold uppercase leading-[14px] tracking-[0.12em]"
            style={{ boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.9)", backgroundColor: live ? "white" : "transparent", color: live ? B.success : "white" }}
          >
            {stamp}
          </span>
        </span>
        <span className={`${row2} font-serif text-[24px]`}><span className="truncate" title={flow.name}>{flow.name}</span></span>
        <span className={`block ${row3} text-white/85`}>{EVENT.weekday.slice(0, 3)}, {EVENT.date} · {EVENT.place} · <span className="font-semibold text-white">{EVENT.daysAway} days</span></span>
      </button>

      <dl className="grid grid-cols-1 rounded-xl bg-white sm:grid-cols-3">
        <div className={`group ${cell}`}>
          <dt className={row1}><span className={labelC} style={{ color: B.muted }}>Participants</span><CardLink onClick={() => flow.notify("Opens Participants")}>View all</CardLink></dt>
          <dd className={`${row2} text-[28px] font-semibold tracking-[-0.015em] tabular-nums`}>{flow.participants.toLocaleString("en-US")}</dd>
          <dd className={row3} style={{ color: B.muted }}>{flow.participants ? "Registered" : "No registrations yet"}</dd>
        </div>
        <div className={`${cell} max-sm:border-t sm:border-l`} style={{ borderColor: B.line }}>
          <dt className={row1}><span className={labelC} style={{ color: B.muted }}>Required setup</span></dt>
          <dd className={row2}>
            <span className="text-[28px] font-semibold tracking-[-0.015em] tabular-nums">{flow.reqDone}<span style={{ color: B.muted }}>/5</span></span>
            {/* the bar shares the value's row, so this cell keeps the same three rows as the others */}
            <span className="h-1 min-w-0 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: "oklch(0.2 0.015 285 / 0.07)" }} aria-hidden="true">
              <span className="block h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none" style={{ width: `${(flow.reqDone / 5) * 100}%`, backgroundColor: B.accent }} />
            </span>
          </dd>
          <dd className={row3} style={{ color: B.muted }}>{st === "setup" ? `${5 - flow.reqDone} step before publishing` : st === "ready" ? "Ready to publish" : "All done"}</dd>
        </div>
        <div className={`group ${cell} max-sm:border-t sm:border-l`} style={{ borderColor: B.line }}>
          <dt className={row1}><span className={labelC} style={{ color: B.muted }}>Registration</span>{st !== "setup" && <CardLink onClick={flow.openSetup}>Edit</CardLink>}</dt>
          <dd className={`${row2} text-[28px] font-semibold tracking-[-0.015em]`}>
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: regOpen ? B.success : B.faint }} />
            {regOpen ? "Open" : "Closed"}
          </dd>
          <dd className={row3} style={{ color: B.muted }}>{st === "setup" ? "Window not set" : st === "live" && flow.regClosed ? "Window has ended" : st === "live" && flow.opens.mode === "publish" ? `Opened ${EVENT.today} at publish` : flow.regLine}</dd>
        </div>
      </dl>
    </div>
    </div>
  );
}

// Optional tasks in the required list’s surface: white, one hairline-divided list, title + one-line
// description + chevron (no icon) — with a checkbox in front so organizers can tick them off themselves.
function LinedRow({ r, flow }: { r: Rec; flow: Flow }) {
  const on = flow.isChecked(r.title);
  return (
    <div className="group flex items-center transition-colors duration-150 hover:bg-[oklch(0.985_0.003_285)]">
      <button
        type="button"
        role="checkbox"
        aria-checked={on}
        aria-label={r.title}
        onClick={() => flow.toggle(r.title)}
        className="mm-tool relative ml-4 flex size-4 shrink-0 items-center justify-center rounded-[4px] transition-[background-color,box-shadow,color] duration-150 before:absolute before:-inset-3"
        style={on ? doneBox : emptyBox}
      >
        {on && <span key="on" className="mm-pop flex"><Icon n="check" className="size-3" /></span>}
      </button>
      <button type="button" onClick={() => flow.notify(`Opens ${r.title}`)} className="mm-tool flex min-w-0 flex-1 items-center gap-3.5 py-3 pl-3 pr-4 text-left">
        <span className="min-w-0 flex-1">
          <span className={`block text-[14px] font-medium ${on ? "line-through decoration-[oklch(0.5_0.015_285/0.6)]" : ""}`} style={on ? { color: B.muted } : undefined}>{r.title}</span>
          <span className="block truncate text-[13px]" style={{ color: B.muted }} title={r.desc}>{r.desc}</span>
        </span>
        <span className="transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: B.faint }}><Icon n="chevron" /></span>
      </button>
    </div>
  );
}
function LinedList({ title, items, flow }: { title?: string; items: Rec[]; flow: Flow }) {
  // ticked tasks drop to the end of their list, like Movemint's own checklist; rows glide to their new place (FLIP)
  const sorted = [...items].sort((a, b) => Number(flow.isChecked(a.title)) - Number(flow.isChecked(b.title)));
  const rows = useRef(new Map<string, HTMLLIElement>());
  const last = useRef(new Map<string, number>());
  const order = sorted.map((r) => r.title).join("|");
  useLayoutEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    rows.current.forEach((el, k) => {
      const top = el.offsetTop; // relative to the list, so page scrolling never reads as movement
      const prev = last.current.get(k);
      if (!reduce && prev !== undefined && prev !== top) {
        el.animate([{ transform: `translateY(${prev - top}px)` }, { transform: "none" }], { duration: 260, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
      }
      last.current.set(k, top);
    });
  }, [order]);
  return (
    <div className="min-w-0">
      {title && <p className={`${label} mb-2`} style={{ color: B.muted }}>{title}</p>}
      <ul className="relative overflow-hidden rounded-xl bg-white">
        {sorted.map((r, i) => (
          <li
            key={r.title}
            ref={(el) => {
              if (el) rows.current.set(r.title, el);
              else rows.current.delete(r.title);
            }}
            className="relative bg-white"
            style={i ? { borderTop: `1px solid ${B.line}` } : undefined}
          >
            <LinedRow r={r} flow={flow} />
          </li>
        ))}
      </ul>
    </div>
  );
}
// stages without sub-groups: split into two lists so they sit like the groups above
function Split({ items, flow }: { items: Rec[]; flow: Flow }) {
  const half = Math.ceil(items.length / 2);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <LinedList items={items.slice(0, half)} flow={flow} />
      {items.length > 1 && <LinedList items={items.slice(half)} flow={flow} />}
    </div>
  );
}

// Sticky context bar: once the overview scrolls away, a slim bar keeps "which event, where it stands, what's next"
// in view — Combined's always-visible context without giving the poster a permanent column.
function ContextBar({ flow, watch }: { flow: Flow; watch: React.RefObject<HTMLDivElement | null> }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = watch.current;
    if (!el) return;
    // show once the overview's bottom edge has passed under the bar's line; inside the Scenarios frame the
    // page scrolls in its own container, so observe against that instead of the window
    const root = el.closest("[data-scroll-root]");
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting && e.boundingClientRect.top < (e.rootBounds?.top ?? 0)), { root, rootMargin: root ? "0px" : "-12px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [watch]);
  // the bar's button only appears when its task (the open setup row, or the Publish line) is out of view
  const [taskAway, setTaskAway] = useState(false);
  useEffect(() => {
    const el = document.querySelector(`[data-ctx-anchor="${flow.stage === "setup" ? "setup" : "publish"}"]`);
    if (!el) return;
    const root = el.closest("[data-scroll-root]");
    const io = new IntersectionObserver(([e]) => setTaskAway(!e.isIntersecting), { root, rootMargin: root ? "-56px 0px 0px 0px" : "-64px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [flow.stage]);
  const st = STATUSES.find((x) => x.key === flow.status)!;
  return (
    // zero-height sticky wrapper: the bar floats over the content instead of pushing it down
    <div className="sticky z-20 h-0" style={{ top: "var(--mm-sticky-top, 0px)" }}>
      <div
        role="region"
        aria-label="Event summary"
        aria-hidden={!shown}
        inert={!shown}
        className="mm-ctx flex h-12 items-center gap-3 rounded-xl px-4 backdrop-blur-md"
        data-shown={shown ? "" : undefined}
        style={{ backgroundColor: "oklch(1 0 0 / 0.86)", boxShadow: `0 0 0 1px ${B.line}, 0 8px 20px -12px oklch(0.2 0.015 285 / 0.3)` }}
      >
        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundImage: B.gradientDiag }} aria-hidden="true" />
        <span className="block min-w-0 truncate text-[14px] font-medium">{flow.name}</span>
        <span className="hidden shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-medium sm:inline" style={flow.status === "live" ? { backgroundColor: B.successBg, color: B.success } : { backgroundColor: B.surface, color: B.ink, boxShadow: `inset 0 0 0 1px ${B.line}` }}>
          {st.label}
        </span>
        <span className="hidden shrink-0 text-[13px] tabular-nums md:inline" style={{ color: B.muted }}>{EVENT.date}</span>
        <span className="ml-auto shrink-0 text-[14px] font-medium tabular-nums">{EVENT.daysAway} days to go</span>
        {taskAway && <span key={flow.stage} className="mm-pop flex shrink-0"><NextAction flow={flow} /></span>}
      </div>
    </div>
  );
}

// stage tags as quiet text: the lock, the raspberry row and the Set up button already carry "required"
const Kind = ({ children }: { children: React.ReactNode }) => <span className="text-[13px]" style={{ color: B.muted }}>· {children}</span>;

export function Banner() {
  const flow = useFlow();
  const st = flow.stage;
  const overviewRef = useRef<HTMLDivElement>(null);
  return (
    <Frame flow={flow}>
      <Overview flow={flow} ref={overviewRef} />
      <ContextBar flow={flow} watch={overviewRef} />

      <div className="mt-12"><ChecklistHead flow={flow} /></div>
      <ol className="mt-8">
        <Stage calm when={`Today · ${EVENT.today}`} title={st === "setup" ? "Finish the setup" : "Setup complete"} tag={<Kind>Required</Kind>} node={<Mark calm state={st === "setup" ? "now" : "done"} icon="circleDashed" />}>
          <div data-ctx-anchor="setup"><RequiredList flow={flow} quiet /></div>
        </Stage>
        <Stage calm when={st === "live" ? `Live · ${EVENT.today}` : st === "ready" ? "Ready now" : "After setup"} title={st === "live" ? "Published" : "Publish"} tag={<Kind>Required</Kind>} node={<Mark calm state={st === "live" ? "done" : st === "ready" ? "now" : "gate"} icon={st === "setup" ? "lock" : "rocket"} />} dashed compact>
          {st === "setup" ? (
            <p className="text-[14px]" style={{ color: B.muted }}>Unlocks once the required setup is done.</p>
          ) : (
            // the button appears right on the line it belongs to
            <div key={st} data-ctx-anchor="publish" className="mm-pop flex flex-wrap items-center gap-x-4 gap-y-2">
              <NextAction flow={flow} />
              <p className="text-[14px]" style={{ color: B.muted }}>{st === "ready" ? "Everything required is set." : "Share it to start filling the start list."}</p>
            </div>
          )}
        </Stage>
        <Stage calm when="Before race day" title="Fill the start list" tag={<Kind>Optional, any order</Kind>} node={<Mark calm state="anytime" icon="megaphone" />} dashed>
          <div className="grid gap-5 lg:grid-cols-2">
            {GROUPS.map((g) => <LinedList key={g.key} title={g.title} items={by(g.key)} flow={flow} />)}
          </div>
        </Stage>
        <Stage calm when={`${EVENT.weekday.slice(0, 3)} · Nov 6`} title="Race day" tag={<Kind>Optional</Kind>} node={<Mark calm state="anytime" icon="flag" />} dashed>
          <Split items={by("raceday")} flow={flow} />
        </Stage>
        <Stage calm when="After" title="Wrap up" tag={<Kind>Optional</Kind>} node={<Mark calm state="anytime" icon="image" />} last>
          <Split items={by("after")} flow={flow} />
        </Stage>
      </ol>
    </Frame>
  );
}

/* ───────────── B · Stages: a stepper across the top; one stage's tasks at a time ───────────── */
type StageKey = "setup" | "publish" | "promote" | "raceday" | "after";
export function Stages() {
  const flow = useFlow();
  const st = flow.stage;
  const [cur, setCur] = useState<StageKey>("setup");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const optDone = (items: Rec[]) => items.filter((r) => flow.isChecked(r.title)).length;
  const promote = [...by("promote"), ...by("registration")];
  const STEPS: { key: StageKey; title: string; when: string; meta: string; state: "done" | "now" | "gate" | "anytime"; icon: string }[] = [
    { key: "setup", title: "Setup", when: "Today", meta: `${flow.reqDone} of 5 required`, state: st === "setup" ? "now" : "done", icon: "circleDashed" },
    { key: "publish", title: "Publish", when: st === "live" ? "Live" : "After setup", meta: st === "live" ? "Published" : st === "ready" ? "Ready" : "Locked", state: st === "live" ? "done" : st === "ready" ? "now" : "gate", icon: st === "setup" ? "lock" : "rocket" },
    { key: "promote", title: "Fill the start list", when: "Before race day", meta: `${optDone(promote)} of ${promote.length} optional`, state: "anytime", icon: "megaphone" },
    { key: "raceday", title: "Race day", when: "Fri · Nov 6", meta: `${optDone(by("raceday"))} of ${by("raceday").length} optional`, state: "anytime", icon: "flag" },
    { key: "after", title: "Wrap up", when: "After", meta: `${optDone(by("after"))} of ${by("after").length} optional`, state: "anytime", icon: "image" },
  ];
  const i = STEPS.findIndex((s) => s.key === cur);
  // arrow keys move between tabs (instant: keyboard navigation doesn't animate)
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + STEPS.length) % STEPS.length;
    setCur(STEPS[n].key);
    tabs.current[n]?.focus();
  };
  return (
    <Frame flow={flow}>
      <div className="mt-6 grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* the poster, shrunk to a ticket */}
        <article className="relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-xl p-5 text-white" style={{ backgroundImage: B.gradientDiag }}>
          <div className="flex items-start justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deck/movemint-logo.png" alt="Movemint" width={432} height={74} className="h-[14px] w-auto brightness-0 invert" />
            <Stamp flow={flow} />
          </div>
          <div>
            <p className="font-serif text-[26px] leading-[1] [text-wrap:balance]">{EVENT.name}</p>
            <p className="mt-2 text-[12px] text-white/80">{EVENT.weekday.slice(0, 3)}, {EVENT.date} · {EVENT.place} · <span className="font-semibold tabular-nums text-white">{EVENT.daysAway} days</span></p>
          </div>
        </article>
        <Facts flow={flow} />
      </div>

      <div className="mt-10"><ChecklistHead flow={flow} /></div>
      <div role="tablist" aria-label="Checklist stages" onKeyDown={onKey} className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-5">
        {STEPS.map((s, k) => {
          const on = s.key === cur;
          return (
            <button
              key={s.key}
              ref={(el) => { tabs.current[k] = el; }}
              type="button"
              role="tab"
              id={`stage-tab-${s.key}`}
              aria-selected={on}
              aria-controls="stage-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setCur(s.key)}
              className="mm-tool relative flex items-start gap-3 rounded-xl p-3 text-left transition-[background-color,box-shadow] duration-150 hover:bg-[oklch(0.975_0.004_285)]"
              style={on ? { backgroundColor: "white", boxShadow: `inset 0 0 0 1.5px ${B.ink}` } : { boxShadow: `inset 0 0 0 1px ${B.line}` }}
            >
              <Mark state={s.state} icon={s.icon} />
              <span className="min-w-0">
                <span className="block text-[12px] font-medium" style={{ color: B.muted }}>{s.when}</span>
                <span className="block text-[14px] font-semibold leading-snug">{s.title}</span>
                <span className="mt-0.5 block text-[12px] tabular-nums" style={{ color: s.state === "now" ? B.accentStrong : B.muted }}>{s.meta}</span>
              </span>
            </button>
          );
        })}
      </div>

      <section id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${cur}`} className="mt-6 min-h-[320px]">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-[18px] font-semibold">{STEPS[i].title}</h3>
          <Tag kind={cur === "setup" || cur === "publish" ? "required" : "optional"}>{cur === "setup" || cur === "publish" ? "Required" : "Optional"}</Tag>
        </div>
        {cur === "setup" && <RequiredList flow={flow} />}
        {cur === "publish" && (
          <div className="flex flex-wrap items-center gap-4 rounded-xl px-5 py-5" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
            {st === "setup" ? (
              <>
                <p className="flex-1 text-[14px]" style={{ color: B.muted }}>Publishing unlocks once the required setup is done — 1 step left.</p>
                <button type="button" onClick={() => setCur("setup")} className={`inline-flex h-9 items-center rounded-lg bg-white px-3.5 text-[13px] font-semibold ${pressable}`} style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>Go to setup</button>
              </>
            ) : (
              <>
                <p className="flex-1 text-[14px]" style={{ color: B.muted }}>{nextLine(flow)}</p>
                <NextAction flow={flow} />
              </>
            )}
          </div>
        )}
        {cur === "promote" && (
          <div className="grid gap-6">
            {GROUPS.map((g) => (
              <div key={g.key}>
                <p className={`${label} mb-2`} style={{ color: B.muted }}>{g.title}</p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {by(g.key).map((r) => <li key={r.title} className="flex min-w-0"><CheckTile r={r} flow={flow} /></li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
        {(cur === "raceday" || cur === "after") && (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {by(cur).map((r) => <li key={r.title} className="flex min-w-0"><CheckTile r={r} flow={flow} /></li>)}
          </ul>
        )}
        {i < STEPS.length - 1 && (
          <button type="button" onClick={() => setCur(STEPS[i + 1].key)} className="mt-6 inline-flex items-center gap-1 rounded-md text-[13px] font-medium" style={{ color: B.muted }}>
            Next: {STEPS[i + 1].title} <Icon n="chevron" className="size-3.5" />
          </button>
        )}
      </section>
    </Frame>
  );
}

/* ───────────── C · Board: the lifecycle as columns, read left to right ───────────── */
function Column({ title, when, tag, mark, count, children }: { title: string; when: string; tag: React.ReactNode; mark: React.ReactNode; count?: string; children: React.ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col rounded-2xl p-3" style={{ backgroundColor: "white", boxShadow: `inset 0 0 0 1px ${B.line}` }}>
      <header className="flex items-start gap-3 px-1 pb-3">
        {mark}
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium" style={{ color: B.muted }}>{when}</p>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-semibold">{title}</h3>
            {tag}
          </div>
        </div>
        {count && <span className="pt-4 text-[12px] tabular-nums" style={{ color: B.muted }}>{count}</span>}
      </header>
      <div className="grid gap-2">{children}</div>
    </section>
  );
}
export function Board() {
  const flow = useFlow();
  const st = flow.stage;
  const optDone = (items: Rec[]) => `${items.filter((r) => flow.isChecked(r.title)).length}/${items.length}`;
  const promote = [...by("promote"), ...by("registration")];
  return (
    <Frame flow={flow}>
      {/* header: a thin poster strip + the three facts, side by side */}
      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <section className="relative flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-xl px-6 py-5 text-white" style={{ backgroundImage: B.gradientDiag }}>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/deck/movemint-logo.png" alt="Movemint" width={432} height={74} className="h-[14px] w-auto brightness-0 invert" />
              <Stamp flow={flow} />
            </div>
            <p className="mt-3 font-serif text-[30px] leading-[1] [text-wrap:balance]">{EVENT.name}</p>
          </div>
          <p className="text-[13px] text-white/85">{EVENT.weekday.slice(0, 3)}, {EVENT.date}<br />{EVENT.place}<br /><span className="text-[15px] font-semibold tabular-nums text-white">{EVENT.daysAway} days</span></p>
        </section>
        <Facts flow={flow} />
      </div>

      <div className="mt-10"><ChecklistHead flow={flow} /></div>
      {/* fixed-width columns: the board scrolls sideways rather than squeezing the text */}
      <div className="mt-6 -mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin]">
        <div className="grid w-max grid-cols-[360px_340px_300px_300px] items-start gap-3">
          <Column title={st === "setup" ? "Finish the setup" : "Setup complete"} when={`Today · ${EVENT.today}`} tag={<Tag kind="required">Required</Tag>} mark={<Mark state={st === "setup" ? "now" : "done"} icon="circleDashed" />} count={`${flow.reqDone}/5`}>
            <RequiredList flow={flow} />
            {/* publish closes the required column */}
            <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
              <Mark state={st === "live" ? "done" : st === "ready" ? "now" : "gate"} icon={st === "setup" ? "lock" : "rocket"} />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold">{st === "live" ? "Published" : "Publish"}</p>
                <p className="text-[12px]" style={{ color: B.muted }}>{st === "setup" ? "Unlocks when setup is done" : st === "ready" ? "Ready now" : `Live · ${EVENT.today}`}</p>
              </div>
              {st !== "setup" && <NextAction flow={flow} />}
            </div>
          </Column>
          <Column title="Fill the start list" when="Anytime before race day" tag={<Tag kind="optional">Optional</Tag>} mark={<Mark state="anytime" icon="megaphone" />} count={optDone(promote)}>
            {GROUPS.map((g) => <TileGroup key={g.key} title={g.title} items={by(g.key)} flow={flow} cols={1} />)}
          </Column>
          <Column title="Race day" when={`${EVENT.weekday.slice(0, 3)} · Nov 6`} tag={<Tag kind="optional">Optional</Tag>} mark={<Mark state="anytime" icon="flag" />} count={optDone(by("raceday"))}>
            <TileGroup items={by("raceday")} flow={flow} cols={1} />
          </Column>
          <Column title="Wrap up" when="After" tag={<Tag kind="optional">Optional</Tag>} mark={<Mark state="anytime" icon="image" />} count={optDone(by("after"))}>
            <TileGroup items={by("after")} flow={flow} cols={1} />
          </Column>
        </div>
      </div>
    </Frame>
  );
}
