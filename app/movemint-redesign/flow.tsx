"use client";
// The clickable path every variant shares: 4/5 required → set when registration opens → ready → publish → live.
// State lives in a tiny store so the status menu in the header and the page body stay in sync.
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { B, Icon, Tip, pressable, RECOMMENDED, REQUIRED } from "./shell";

export type Stage = "setup" | "ready" | "live";
export type Status = "live" | "draft" | "unlisted" | "landing" | "past";
type Opens = { mode: "publish" | "schedule"; date: string; time: string };
type State = { ready: boolean; status: Status; opens: Opens; toast: string; handle: string; urlEditing: boolean; checked: string[]; largeCount: boolean; regClosed: boolean; longName: boolean };

const INITIAL: State = { ready: false, status: "draft", opens: { mode: "publish", date: "2026-10-20", time: "09:00" }, toast: "", handle: "EevkbfU", urlEditing: false, checked: RECOMMENDED.filter((r) => r.done).map((r) => r.title), largeCount: false, regClosed: false, longName: false };
let state = INITIAL;
const subs = new Set<() => void>();
const set = (p: Partial<State>) => {
  state = { ...state, ...p };
  subs.forEach((f) => f());
};
const subscribe = (f: () => void) => {
  subs.add(f);
  return () => subs.delete(f);
};
const useStore = () => useSyncExternalStore(subscribe, () => state, () => INITIAL);

// The real status options from Movemint's menu.
export const STATUSES: { key: Status; label: string; desc: string; icon: string }[] = [
  { key: "live", label: "Live", desc: "Event is visible and open for registration", icon: "checkCircle" },
  { key: "draft", label: "Draft", desc: "Event is still being set up", icon: "circleDashed" },
  { key: "unlisted", label: "Unlisted", desc: "Hidden from public, accessible via link", icon: "eyeOff" },
  { key: "landing", label: "Landing Page", desc: "Coming soon page with email signup", icon: "mail" },
  { key: "past", label: "Past Event", desc: "A race that already happened — no registration", icon: "trophy" },
];

// Scenarios tab: put the shared store into a given state (after the page has mounted and reset itself).
export const setFlow = (p: Partial<State>) => set(p);
export const LONG_NAME = "2026 Bay Area Startup Founders & Friends Winter Bouldering Social at Mission Cliffs";

export function useFlow() {
  const s = useStore();
  // each variant (and each replay) starts from the recorded state
  useEffect(() => set(INITIAL), []);
  useEffect(() => {
    if (!s.toast) return;
    const t = setTimeout(() => set({ toast: "" }), 3200);
    return () => clearTimeout(t);
  }, [s.toast]);
  const stage: Stage = s.status === "live" ? "live" : s.ready ? "ready" : "setup";
  const regLine =
    s.opens.mode === "publish"
      ? "Opens when you publish"
      : `Opens ${new Date(`${s.opens.date}T${s.opens.time}`).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`;
  return {
    stage,
    status: s.status,
    reqDone: s.ready ? 5 : 4,
    participants: s.status === "live" && s.largeCount ? 1284 : 0,
    regClosed: s.regClosed,
    name: s.longName ? LONG_NAME : "Startup Founders Bouldering Meetup",
    // optional tasks the organizer has ticked off themselves (like the original's checkboxes)
    recDone: s.checked.length,
    isChecked: (title: string) => s.checked.includes(title),
    toggle: (title: string) => set({ checked: state.checked.includes(title) ? state.checked.filter((t) => t !== title) : [...state.checked, title] }),
    done: (s.ready ? REQUIRED.length : REQUIRED.length - 1) + s.checked.length,
    opens: s.opens,
    regLine,
    toast: s.toast,
    // mockup: "Set up" completes the step straight away (registration opens on publish); once done, "Edit" just points at settings
    openSetup: () => set(state.ready ? { toast: "Opens registration settings" } : { ready: true, toast: "Registration opens when you publish" }),
    publish: () => set({ status: "live", toast: "Your event is live" }),
    notify: (m: string) => set({ toast: m }),
    participantsLine: stage === "live" ? (s.opens.mode === "publish" ? "Registration is open" : regLine) : s.ready ? regLine : "Registration isn’t open yet",
  };
}

// Status control next to the event title: same surface as the other header buttons, opens the real menu.
export function StatusMenu() {
  const s = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  const cur = STATUSES.find((x) => x.key === s.status)!;
  const choose = (k: Status) => {
    setOpen(false);
    if (k === s.status) return;
    set(k === "live" ? { status: "live", toast: "Your event is live" } : { status: k, toast: `Status changed to ${STATUSES.find((x) => x.key === k)!.label}` });
  };
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-8 items-center gap-1.5 rounded-lg bg-white pl-2.5 pr-2 text-[13px] font-medium hover:bg-[oklch(0.975_0.004_285)] ${pressable}`}
        style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}
      >
        <span style={{ color: s.status === "live" ? B.success : B.muted }}><Icon n={cur.icon} className="size-3.5" /></span>
        {cur.label}
        <span style={{ color: B.faint }}><Icon n="chevronDown" className={`size-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`} /></span>
      </button>
      {open && (
        <div
          role="menu"
          className="mm-menu absolute left-0 top-full z-40 mt-1.5 w-[320px] origin-top-left rounded-xl bg-white p-1.5 shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.08),0_12px_32px_-8px_oklch(0.2_0.015_285/0.25)]"
        >
          {STATUSES.map((x) => {
            const locked = x.key === "live" && !s.ready;
            const on = x.key === s.status;
            return (
              <button
                key={x.key}
                type="button"
                role="menuitemradio"
                aria-checked={on}
                disabled={locked}
                onClick={() => choose(x.key)}
                className="flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left enabled:hover:bg-[oklch(0.975_0.004_285)] disabled:cursor-not-allowed"
              >
                <span className="mt-0.5" style={{ color: locked ? B.faint : x.key === "live" ? B.success : B.muted }}><Icon n={x.icon} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium" style={{ color: locked ? B.faint : B.ink }}>{x.label}</span>
                  <span className="block text-[12px]" style={{ color: B.muted }}>{locked ? "Finish the required setup first" : x.desc}</span>
                </span>
                {on && <span className="mt-0.5" style={{ color: B.ink }}><Icon n="check" /></span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
export type Flow = ReturnType<typeof useFlow>;

export function PublishButton({ flow, className = "", big = false }: { flow: Flow; className?: string; big?: boolean }) {
  if (flow.stage === "live")
    return (
      <span className={`inline-flex items-center gap-2 rounded-lg px-4 font-semibold ${big ? "h-11 text-[14px]" : "h-10 text-[14px]"} ${className}`} style={{ backgroundColor: B.successBg, color: B.success }}>
        <Icon n="check" /> Live
      </span>
    );
  const ready = flow.stage === "ready";
  return (
    <button
      type="button"
      disabled={!ready}
      onClick={flow.publish}
      title={ready ? undefined : "Finish the required steps first"}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 font-semibold ${big ? "h-11 text-[14px]" : "h-10 text-[14px]"} ${ready ? `text-white hover:brightness-95 ${pressable}` : "cursor-not-allowed"} ${className}`}
      style={ready ? { backgroundColor: B.accentStrong } : { backgroundColor: B.surface, color: B.faint }}
    >
      <Icon n="rocket" /> Publish event
    </button>
  );
}

export function StatusPill({ flow }: { flow: Flow }) {
  const live = flow.stage === "live";
  const st = STATUSES.find((x) => x.key === flow.status)!;
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: live ? B.success : B.muted }}>
      <Icon n={st.icon} className="size-3.5" />
      {live ? "Live" : `${st.label}${flow.stage === "ready" ? " · ready to publish" : ""}`}
    </span>
  );
}

// The live region is always mounted (an element inserted with its text isn't reliably announced); only the pill shows/hides.
export function Toast({ flow }: { flow: Flow }) {
  return (
    <div role="status" aria-live="polite">
      {flow.toast && (
        <div className="mm-toast fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-medium text-white" style={{ backgroundColor: B.ink }}>
          <span style={{ color: "oklch(0.8 0.12 155)" }}><Icon n="check" /></span> {flow.toast}
        </div>
      )}
    </div>
  );
}

// The event URL under the title. Replaces two unlabeled toolbar icons (link, pencil = "Edit event URL handle").
// Edited in place: the line turns into an input (Enter saves, Esc cancels) — no side sheet.
export function EventUrl() {
  const s = useStore();
  if (s.urlEditing) return <UrlForm initial={s.handle} />;
  return (
    <div className="mt-2 flex items-center gap-1 text-[13px]" style={{ color: B.muted }}>
      <span className="font-mono tracking-tight">movemint.cc/events/<span style={{ color: B.ink }}>{s.handle}</span></span>
      <Tip label="Copy event link" className="ml-1">
        <button
          type="button"
          aria-label="Copy event link"
          onClick={() => {
            navigator.clipboard?.writeText(`https://movemint.cc/events/${s.handle}`).catch(() => {});
            set({ toast: "Link copied" });
          }}
          className="flex size-7 items-center justify-center rounded-md hover:bg-[oklch(0.975_0.004_285)]"
        >
          <Icon n="link" className="size-3.5" />
        </button>
      </Tip>
      <button type="button" onClick={() => set({ urlEditing: true })} className="flex h-7 items-center gap-1 rounded-md px-1.5 font-medium hover:bg-[oklch(0.975_0.004_285)]" style={{ color: B.ink }}>
        <Icon n="pencil" className="size-3.5" /> Edit URL
      </button>
    </div>
  );
}

const HANDLE_RE = /^[a-z0-9_-]+$/;
function UrlForm({ initial }: { initial: string }) {
  const [v, setV] = useState(initial);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus();
    input.current?.select();
  }, []);
  const err = !v ? "Add a handle." : !HANDLE_RE.test(v) ? "Use lowercase letters, numbers, hyphens and underscores only." : "";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!err) set({ handle: v, urlEditing: false, toast: "Event URL updated" });
      }}
      onKeyDown={(e) => e.key === "Escape" && set({ urlEditing: false })}
      className="mt-2"
    >
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="handle" className="sr-only">Event URL handle</label>
        <div className="flex h-9 min-w-0 max-w-full items-center overflow-hidden rounded-lg focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[oklch(0.2_0.015_285)]" style={{ boxShadow: `inset 0 0 0 ${err ? 2 : 1}px ${err ? B.accent : B.line}` }}>
          <span className="flex h-full items-center px-2.5 font-mono text-[13px] tracking-tight" style={{ backgroundColor: B.surface, color: B.muted }}>movemint.cc/events/</span>
          <input
            id="handle"
            ref={input}
            value={v}
            onChange={(e) => setV(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-invalid={!!err}
            aria-describedby="handle-help"
            className="h-full w-56 min-w-0 px-2 font-mono text-[16px] tracking-tight outline-none [@media(pointer:fine)]:text-[13px]"
          />
        </div>
        <button type="submit" disabled={!!err} className={`h-9 rounded-lg bg-white px-3 text-[13px] font-semibold disabled:cursor-not-allowed ${pressable}`} style={{ boxShadow: `inset 0 0 0 1px ${B.line}`, color: err ? B.faint : B.ink }}>Save</button>
        <button type="button" onClick={() => set({ urlEditing: false })} className="h-9 rounded-lg px-2 text-[13px] font-medium" style={{ color: B.muted }}>Cancel</button>
      </div>
      <p id="handle-help" className="mt-1.5 flex items-center gap-1.5 text-[12px]" style={{ color: err ? B.accentStrong : B.muted }}>
        {err ? <><Icon n="alert" className="size-3.5 shrink-0" /> {err}</> : "Lowercase letters, numbers, hyphens and underscores · Enter to save, Esc to cancel"}
      </p>
    </form>
  );
}
