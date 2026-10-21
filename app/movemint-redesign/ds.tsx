"use client";
// Design-system board for the Movemint redesign, laid out like a Figma library page.
// Every value is read from the tokens in shell.tsx; contrast is computed, not typed in.
import { useState } from "react";
import { B, Icon, Tip } from "./shell";
import { STATUSES } from "./flow";

/* ── color math: oklch → sRGB → WCAG contrast ── */
function parse(v: string) {
  const m = v.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/);
  if (!m) return null;
  return { L: +m[1], C: +m[2], h: +m[3], a: m[4] ? +m[4] : 1 };
}
function toLinear({ L, C, h }: { L: number; C: number; h: number }) {
  const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map((c) => Math.min(1, Math.max(0, c)));
}
const lum = (lin: number[]) => 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
const hex = (lin: number[]) =>
  "#" + lin.map((c) => Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)).toString(16).padStart(2, "0")).join("");
const WHITE = [1, 1, 1];
const ratio = (x: number[], y: number[]) => {
  const [hi, lo] = [lum(x), lum(y)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
};
const INK = toLinear(parse(B.ink)!);

// ui: non-text contrast (WCAG 1.4.11) — shapes and borders need 3:1, there is no AAA
function Grade({ r, large = false, ui = false }: { r: number; large?: boolean; ui?: boolean }) {
  const g = ui ? (r >= 3 ? "AA · UI" : "Fail") : r >= (large ? 4.5 : 7) ? "AAA" : r >= (large ? 3 : 4.5) ? "AA" : "Fail";
  const ok = g !== "Fail";
  return (
    <span className="inline-flex items-center gap-1 tabular-nums">
      <span className="font-medium">{r.toFixed(2)}</span>
      <span className="rounded px-1 text-[12px] font-semibold" style={ok ? { backgroundColor: B.surface, color: B.ink } : { backgroundColor: "oklch(0.95 0.03 25)", color: "oklch(0.5 0.17 25)" }}>{g}</span>
    </span>
  );
}

/* ── layout ── */
function Frame({ title, note, children, className = "" }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      <p className="mb-2 flex items-baseline gap-2 text-[12px] font-medium" style={{ color: "oklch(0.55 0.01 285)" }}>
        <span>{title}</span>
        {note && <span style={{ color: "oklch(0.68 0.01 285)" }}>· {note}</span>}
      </p>
      <div className="rounded-xl bg-white p-6 shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.06),0_1px_2px_oklch(0.2_0.015_285/0.04)] sm:p-8">{children}</div>
    </section>
  );
}
const H = ({ children }: { children: React.ReactNode }) => <h3 className="mb-4 text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: B.muted }}>{children}</h3>;

/* ── color ── */
// checks: the pairs actually used in the UI, as [label, foreground token or "white", background token or "white"]
type Pair = [string, keyof typeof B | "white", keyof typeof B | "white", "ui"?];
const COLORS: { k: keyof typeof B; role: string; text?: boolean; checks?: Pair[] }[] = [
  { k: "ink", role: "Text, dark buttons, tooltips, focus ring", text: true },
  { k: "muted", role: "Secondary text, labels, icons", text: true },
  { k: "faint", role: "Disabled, chevrons — never body text", text: true },
  { k: "accent", role: "Light raspberry · shapes without text: rings, pulse, progress, dots", checks: [["As a shape on white", "accent", "white", "ui"]] },
  { k: "accentStrong", role: "Raspberry · anything with text: buttons (white text), active nav, “Up next”, Create Event, errors", checks: [["White text on it", "white", "accentStrong"], ["As text on white", "accentStrong", "white"], ["As text on accentTint", "accentStrong", "accentTint"]] },
  { k: "accentTint", role: "Active nav, pending checklist row", checks: [["Raspberry text on it", "accentStrong", "accentTint"], ["Ink text on it", "ink", "accentTint"]] },
  { k: "success", role: "Live only", text: true },
  { k: "successBg", role: "Live chip background" },
  { k: "surface", role: "Subtle fills, hover rows, segmented track" },
  { k: "line", role: "Every border and divider (9% ink)" },
];
const linOf = (t: keyof typeof B | "white") => (t === "white" ? WHITE : toLinear(parse(B[t])!));
function Swatch({ k, role, text, checks }: (typeof COLORS)[number]) {
  const value = B[k];
  const p = parse(value)!;
  const lin = toLinear(p);
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
      <button
        type="button"
        aria-label={`Copy ${k}`}
        onClick={() => {
          navigator.clipboard?.writeText(value).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="relative flex h-20 w-full items-end p-2.5 text-left"
        style={{ backgroundColor: value, boxShadow: `inset 0 -1px 0 ${B.line}` }}
      >
        <span className="rounded bg-white/85 px-1.5 py-0.5 text-[12px] font-medium" style={{ color: B.ink }}>{copied ? "Copied" : `B.${k}`}</span>
      </button>
      <div className="grid gap-1.5 p-3 text-[12px]">
        <p className="font-mono text-[12px]" style={{ color: B.muted }}>{value}{p.a === 1 ? ` · ${hex(lin)}` : ""}</p>
        <p style={{ color: B.ink }}>{role}</p>
        {p.a === 1 && (
          <div className="mt-1 grid gap-1" style={{ color: B.muted }}>
            {checks ? (
              checks.map(([l, fg, bg, mode]) => <p key={l} className="flex justify-between">{l} <Grade r={ratio(linOf(fg), linOf(bg))} ui={mode === "ui"} /></p>)
            ) : text ? (
              <p className="flex justify-between">As text on white <Grade r={ratio(lin, WHITE)} /></p>
            ) : (
              <>
                <p className="flex justify-between">White text on it <Grade r={ratio(lin, WHITE)} /></p>
                <p className="flex justify-between">Ink text on it <Grade r={ratio(lin, INK)} /></p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const ACCENTS = [
  { name: "Rejected · original red, white text", v: "oklch(0.673 0.216 19.6)", text: "white", note: "Movemint red #FF4A5D — 3.29:1 fails AA for 14px" },
  { name: "Rejected · crimson", v: "oklch(0.55 0.19 21)", text: "white", note: "Passes, but reads blood-red, off-brand" },
];

const STRONG: { name: string; v: string; note: string; ink?: boolean; current?: boolean }[] = [
  { name: "Ink — Movemint brand-primary", v: "oklch(0.27 0 0)", note: "Rejected: cleanest, but buttons lose the brand color", ink: true },
  { name: "Rose", v: "oklch(0.56 0.17 12)", note: "Rejected: close, but flatter than raspberry" },
  { name: "Raspberry — chosen", v: "oklch(0.54 0.18 5)", current: true, note: "Pinker and more saturated; reads as Movemint’s family" },
  { name: "Plum — from the logo gradient", v: "oklch(0.47 0.14 330)", note: "Rejected: too far from Movemint red" },
  { name: "Crimson", v: "oklch(0.55 0.19 21)", note: "Same hue darkened — reads blood-red. Rejected" },
];

/* ── type ── */
const TYPE: { role: string; spec: string; cls: string; sample: string; serif?: boolean }[] = [
  { role: "display-event", spec: "Instrument Serif 30 / 1.02 · event card only · 2 lines max", cls: "font-serif text-[30px] leading-[1.02]", sample: "Startup Founders Bouldering Meetup", serif: true },
  { role: "page-title", spec: "Inter 30 / 700 · −0.015em · 24 on phones", cls: "text-[30px] font-bold leading-tight tracking-[-0.015em]", sample: "Startup Founders Bouldering Meetup" },
  { role: "stat", spec: "Inter 28 / 600 · tabular · −0.015em", cls: "text-[28px] font-semibold tracking-[-0.015em] tabular-nums", sample: "0 · 4/5 · Closed" },
  { role: "countdown", spec: "Inter 13 / 600 · white/20 chip on the event card", cls: "text-[13px] font-semibold tabular-nums", sample: "23 days to go" },
  { role: "title", spec: "Inter 18 / 600", cls: "text-[18px] font-semibold", sample: "Event checklist" },
  { role: "body", spec: "Inter 14 / 400–500 · 1.45", cls: "text-[14px]", sample: "Pick the date and time participants can start signing up." },
  { role: "small", spec: "Inter 13 / 400–500", cls: "text-[13px]", sample: "Registration isn’t open yet" },
  { role: "label", spec: "Inter 12 / 500 · uppercase · +0.08em", cls: "text-[12px] font-medium uppercase tracking-[0.08em]", sample: "Recommended" },
  { role: "input", spec: "Inter 16 — stops iOS zoom", cls: "text-[16px] font-mono tracking-tight", sample: "sf-founders-bouldering" },
];

// only icons the Final page actually renders, grouped by where they appear
const ICON_SETS: [string, string[]][] = [
  ["Navigation", ["home", "user", "calendar", "users", "layers", "briefcase", "message", "dollar", "settings", "code", "collapse"]],
  ["Header tools", ["search", "users", "dollar", "qr", "copy", "eye", "link", "pencil", "chevronDown"]],
  ["Status", ["circleDashed", "checkCircle", "eyeOff", "mail", "trophy"]],
  ["Timeline & actions", ["check", "lock", "rocket", "megaphone", "flag", "image", "chevron", "sparkle"]],
];

// `embedded`: rendered inside the Design process board — no page background or header, the board supplies both.
export function DesignSystem({ embedded = false }: { embedded?: boolean }) {
  return (
    <div
      className={embedded ? "" : "mm-proto min-h-dvh px-4 pb-32 pt-8 sm:px-10"}
      style={embedded ? { color: B.ink } : { backgroundColor: "oklch(0.955 0.004 285)", color: B.ink, fontFamily: "var(--font-inter), -apple-system, sans-serif" }}
    >
      {!embedded && (
      <header className="mx-auto mb-10 flex max-w-[1240px] flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: B.muted }}>Movemint organizer · Insights redesign</p>
          <h1 className="mt-1 font-serif text-[38px] leading-none">Design system</h1>
        </div>
        <p className="max-w-[46ch] text-[13px]" style={{ color: B.muted }}>
          Cool neutrals tinted toward the logo’s violet, one accent for “do this next”, the logo gradient for brand moments only. Contrast is computed from the tokens (WCAG 2).
        </p>
      </header>
      )}

      <div className="mx-auto grid max-w-[1240px] gap-8">
        <Frame title="01 Color" note="click a swatch to copy">
          <H>Tokens</H>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {COLORS.map((c) => <Swatch key={c.k} {...c} />)}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <H>Accent</H>
              <div className="grid gap-3 sm:grid-cols-3">
                {[{ name: "Raspberry — chosen", v: B.accentStrong, text: "white", note: "Pinker than Movemint red, same family; dark enough for white text", chosen: true }, ...ACCENTS].map((a) => {
                  const lin = toLinear(parse(a.v)!);
                  const fg = a.text === "white" ? WHITE : INK;
                  return (
                    <div key={a.name} className={`rounded-lg p-3 ${"chosen" in a ? "" : "opacity-60"}`} style={{ boxShadow: `inset 0 0 0 ${"chosen" in a ? 2 : 1}px ${"chosen" in a ? B.ink : B.line}` }}>
                      <span className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[14px] font-semibold" style={{ backgroundColor: a.v, color: a.text === "white" ? "white" : B.ink }}>
                        <Icon n="rocket" /> Publish event
                      </span>
                      <p className="mt-3 text-[13px] font-semibold">{a.name}</p>
                      <p className="mt-0.5 text-[12px]" style={{ color: B.muted }}>{a.note}</p>
                      <p className="mt-2 flex items-center justify-between text-[12px]" style={{ color: B.muted }}>
                        <span className="font-mono text-[12px]">{hex(lin)}</span> <Grade r={ratio(lin, fg)} />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <H>Brand gradient</H>
              <div className="h-16 rounded-lg" style={{ backgroundImage: B.gradient }} />
              <div className="mt-2 flex justify-between font-mono text-[12px]" style={{ color: B.muted }}>
                <span>35° coral</span><span>320° pink</span><span>285° violet</span><span>235° blue</span>
              </div>
              <p className="mt-3 text-[13px]" style={{ color: B.muted }}>Max two per screen: the event card and the AI button border. Never on text, buttons or progress.</p>
            </div>
          </div>
        </Frame>

        <Frame title="00 Button color — decided" note="each option shown with the shape color it pairs with · contrast computed">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {STRONG.map((o) => {
              const lin = toLinear(parse(o.v)!);
              const tintLin = toLinear(parse(B.accentTint)!);
              const textOnTint = o.ink ? ratio(INK, tintLin) : ratio(lin, tintLin);
              return (
                <div key={o.name} className="rounded-xl p-4" style={{ boxShadow: `inset 0 0 0 ${o.current ? 2 : 1}px ${o.current ? B.ink : B.line}` }}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[14px] font-semibold">{o.name}</p>
                    <span className="font-mono text-[12px]" style={{ color: B.muted }}>{hex(lin)}</span>
                  </div>
                  <p className="mt-0.5 text-[12px]" style={{ color: B.muted }}>{o.note}</p>
                  {/* mini context: nav item, up-next label, buttons, original red on the progress */}
                  <div className="mt-4 grid gap-3 rounded-lg p-3" style={{ backgroundColor: "white", boxShadow: `inset 0 0 0 1px ${B.line}` }}>
                    <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[14px] font-medium" style={{ backgroundColor: B.accentTint, color: o.ink ? B.ink : o.v, boxShadow: o.ink ? `inset 3px 0 0 ${B.accent}` : undefined }}>
                      <Icon n="calendar" /> Events
                    </div>
                    <p className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: o.ink ? B.ink : o.v }}>
                      {o.ink && <span className="size-1.5 rounded-full" style={{ backgroundColor: B.accent }} />}Up next
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex h-9 items-center rounded-lg px-3.5 text-[14px] font-semibold text-white" style={{ backgroundColor: o.v }}>Set up</span>
                      <span className="inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-[14px] font-semibold text-white" style={{ backgroundColor: o.v }}><Icon n="rocket" /> Publish event</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-4 rounded-full border-2 bg-white" style={{ borderColor: B.accent }} />
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: B.surface }}>
                        <div className="h-full w-1/3 rounded-full" style={{ backgroundColor: B.accent }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-1 text-[12px]" style={{ color: B.muted }}>
                    <p className="flex justify-between">White text on button <Grade r={ratio(WHITE, lin)} /></p>
                    <p className="flex justify-between">Nav text on tint <Grade r={textOnTint} /></p>
                  </div>
                </div>
              );
            })}
          </div>
        </Frame>

        <Frame title="02 Typography" note="Inter for everything · Instrument Serif on the event card title only · weights 400 / 500 / 600 / 700">
          <div className="divide-y" style={{ borderColor: B.line }}>
            {TYPE.map((t) => (
              <div key={t.role} className="grid gap-2 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-baseline md:gap-6" style={{ borderColor: B.line }}>
                <div>
                  <p className="font-mono text-[12px] font-medium">{t.role}</p>
                  <p className="text-[12px]" style={{ color: B.muted }}>{t.spec}</p>
                </div>
                <p className={`${t.cls} min-w-0 truncate`}>{t.sample}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-lg px-3 py-2 text-[12px]" style={{ backgroundColor: B.accentTint, color: B.ink }}>
            Every size in the prototype maps to a role. The Movemint wordmark is their original logo image, never retyped.
          </p>
        </Frame>

        <div className="grid gap-8 lg:grid-cols-2">
          <Frame title="03 Radius">
            <div className="flex flex-wrap items-end gap-5">
              {[["md", 6, "chips, tooltips"], ["lg", 8, "controls"], ["xl", 12, "lists, cards"], ["2xl", 16, "page cards"], ["full", 999, "avatars"]].map(([n, r, u]) => (
                <div key={n as string} className="text-center">
                  <div className="mx-auto size-16" style={{ borderRadius: Math.min(r as number, 32), backgroundColor: B.surface, boxShadow: `inset 0 0 0 1px ${B.line}` }} />
                  <p className="mt-2 font-mono text-[12px]">{n}</p>
                  <p className="text-[12px]" style={{ color: B.muted }}>{r === 999 ? "999" : `${r}px`} · {u}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px]" style={{ color: B.muted }}>Nested: inner radius = outer − padding.</p>
          </Frame>
          <Frame title="04 Size & spacing">
            <div className="flex flex-wrap items-end gap-4">
              {[["32", "status button, segmented"], ["36", "controls (desktop)"], ["40", "controls (touch), rows"], ["44", "hero action"]].map(([h, u]) => (
                <div key={h} className="text-center">
                  <div className="flex w-20 items-center justify-center rounded-lg font-mono text-[12px]" style={{ height: +h, backgroundColor: B.surface, boxShadow: `inset 0 0 0 1px ${B.line}` }}>{h}</div>
                  <p className="mt-2 max-w-20 text-[12px]" style={{ color: B.muted }}>{u}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px]" style={{ color: B.muted }}>Spacing steps 4 · 8 · 12 · 16 · 24 · 32 · 40. Gaps on the parent, not margins on children.</p>
          </Frame>
        </div>

        <Frame title="05 Components" note="the one accent action, everything else quiet">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <H>Buttons</H>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[14px] font-semibold text-white" style={{ backgroundColor: B.accentStrong }}><Icon n="rocket" /> Publish event</span>
                <span className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-[13px] font-semibold" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}><Icon n="eye" /> Preview</span>
                <span className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[14px] font-semibold" style={{ backgroundColor: B.surface, color: B.faint }}><Icon n="rocket" /> Publish event</span>
              </div>
              <ul className="mt-3 grid gap-1 text-[12px]" style={{ color: B.muted }}>
                <li><b style={{ color: B.ink }}>Primary</b> — accent, one per view.</li>
                <li><b style={{ color: B.ink }}>Secondary</b> — line border, the default.</li>
                <li><b style={{ color: B.ink }}>Disabled</b> — faint on surface, with a tooltip saying why.</li>
              </ul>
            </div>
            <div>
              <H>Status & tooltip</H>
              <div className="flex flex-wrap items-center gap-3">
                {STATUSES.slice(0, 2).map((s) => (
                  <span key={s.key} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-white pl-2.5 pr-2 text-[13px] font-medium" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
                    <span style={{ color: s.key === "live" ? B.success : B.muted }}><Icon n={s.icon} className="size-3.5" /></span>{s.label}
                    <span style={{ color: B.faint }}><Icon n="chevronDown" className="size-3.5" /></span>
                  </span>
                ))}
                <Tip label="Download QR code">
                  <button type="button" aria-label="Download QR code" className="flex size-9 items-center justify-center rounded-lg" style={{ color: B.muted, boxShadow: `inset 0 0 0 1px ${B.line}` }}><Icon n="qr" /></button>
                </Tip>
                <span className="rounded-md px-2 py-1 text-[12px] font-medium text-white" style={{ backgroundColor: B.ink }}>Tooltip · hover the icon</span>
              </div>
              <p className="mt-3 text-[12px]" style={{ color: B.muted }}>Status icons are a family: dashed circle = not live, checked circle = live. The pencil is only ever “edit”.</p>
            </div>
            <div className="lg:col-span-2">
              <H>Overview</H>
              <div className="grid gap-3 md:grid-cols-[minmax(0,1.45fr)_minmax(0,3fr)]">
                <div className="flex flex-col justify-between gap-5 rounded-xl px-6 py-5 text-white" style={{ backgroundImage: B.gradientDiag }}>
                  <span className="font-serif text-[30px] leading-[1.02]">Startup Founders Bouldering Meetup</span>
                  <span className="flex items-end justify-between gap-3">
                    <span className="text-[13px] leading-snug text-white/85"><span className="block">Friday, Nov 6, 2026</span><span className="block">San Francisco, CA</span></span>
                    <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-[13px] font-semibold leading-none">23 days to go</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 rounded-xl bg-white" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
                  {[["Participants", "0", "No registrations yet", false], ["Required setup", "4/5", "1 step before publishing", true], ["Registration", "Closed", "Window not set", false]].map(([l, v, d, bar], i) => (
                    <div key={l as string} className="px-5 py-5" style={i ? { borderLeft: `1px solid ${B.line}` } : undefined}>
                      <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: B.muted }}>{l}</p>
                      <p className="mt-3 text-[28px] font-semibold leading-7 tracking-[-0.015em] tabular-nums">{v}</p>
                      {bar && <div className="mt-3 h-1 overflow-hidden rounded-full" style={{ backgroundColor: "oklch(0.2 0.015 285 / 0.07)" }}><div className="h-full w-4/5 rounded-full" style={{ backgroundColor: B.accent }} /></div>}
                      <p className="mt-2.5 text-[13px]" style={{ color: B.muted }}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-[12px]" style={{ color: B.muted }}>The event card opens Preview. Label → value → one line in every fact; the setup bar is the only progress bar on the page.</p>
            </div>
            <div className="lg:col-span-2">
              <H>Checklist rows</H>
              <div className="overflow-hidden rounded-xl bg-white" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
                <div className="flex items-center gap-3 px-4 py-3.5" style={{ backgroundColor: B.accentTint }}>
                  <span className="size-5 shrink-0 rounded-full border-2" style={{ borderColor: B.accent }} />
                  <span className="flex-1"><span className="block text-[14px] font-semibold">Pending required step</span><span className="block text-[13px]" style={{ color: B.muted }}>The one tinted row; leads with its action</span></span>
                  <span className="inline-flex h-9 items-center rounded-lg px-3.5 text-[14px] font-semibold text-white" style={{ backgroundColor: B.accentStrong }}>Set up</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: `1px solid ${B.line}` }}>
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-[4px]" style={{ backgroundColor: "oklch(0.95 0.004 285)", boxShadow: "inset 0 0 0 1.5px oklch(0.86 0.006 285)", color: "oklch(0.55 0.012 285)" }}><Icon n="check" className="size-3" /></span>
                  <span className="flex-1"><span className="block text-[14px] line-through" style={{ color: B.muted }}>Done step</span><span className="block text-[13px]" style={{ color: B.muted }}>Movemint’s completed style: grey box, struck title, description kept</span></span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: `1px solid ${B.line}` }}>
                  <span className="size-4 shrink-0 rounded-[4px] bg-white" style={{ boxShadow: "inset 0 0 0 1.5px oklch(0.83 0.008 285)" }} />
                  <span className="flex-1"><span className="block text-[14px] font-medium">Optional task</span><span className="block truncate text-[13px]" style={{ color: B.muted }}>Tick it yourself; a ticked task glides to the end of its list</span></span>
                  <span style={{ color: B.faint }}><Icon n="chevron" /></span>
                </div>
              </div>
            </div>
            <div>
              <H>Timeline markers</H>
              <div className="flex flex-wrap items-center gap-5">
                {([["done", "check", { backgroundColor: "oklch(0.62 0.01 285)", color: "white" }], ["now", "circleDashed", { backgroundColor: "white", color: B.accentStrong, boxShadow: `inset 0 0 0 1.5px ${B.accent}` }], ["gate", "lock", { backgroundColor: "white", color: B.ink, boxShadow: `inset 0 0 0 1.5px ${B.ink}` }], ["optional", "megaphone", { backgroundColor: "white", color: B.muted, boxShadow: `inset 0 0 0 1.5px ${B.faint}` }]] as const).map(([k, ic, st]) => (
                  <span key={k} className="flex flex-col items-center gap-1.5 text-[12px]" style={{ color: B.muted }}>
                    <span className="flex size-7 items-center justify-center rounded-full" style={st}><Icon n={ic} className="size-3.5" /></span>{k}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[12px]" style={{ color: B.muted }}>One family: 28px, 1.5px stroke; only the color changes. Solid rail to Publish, dashed after.</p>
            </div>
            <div>
              <H>Sticky context bar</H>
              <div className="flex h-12 items-center gap-3 rounded-xl bg-white px-4" style={{ boxShadow: `0 0 0 1px ${B.line}, 0 8px 20px -12px oklch(0.2 0.015 285 / 0.3)` }}>
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundImage: B.gradientDiag }} />
                <span className="min-w-0 truncate text-[14px] font-medium">Startup Founders Bouldering Meetup</span>
                <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-medium" style={{ backgroundColor: B.surface, boxShadow: `inset 0 0 0 1px ${B.line}` }}>Draft</span>
                <span className="ml-auto shrink-0 text-[14px] font-medium">23 days to go</span>
              </div>
              <p className="mt-3 text-[12px]" style={{ color: B.muted }}>Appears once the overview scrolls away. The action (Set up / Publish / Copy link) joins only while its own line is off screen.</p>
            </div>
          </div>
        </Frame>

        <div className="grid gap-8 lg:grid-cols-2">
          <Frame title="06 Motion" note="all off under prefers-reduced-motion">
            <dl className="grid gap-3 text-[13px]">
              {[
                ["Enter / UI", "cubic-bezier(0.23, 1, 0.32, 1)", "menus, tooltips 120–150ms · inline editors 200ms"],
                ["Mobile nav drawer", "cubic-bezier(0.32, 0.72, 0, 1)", "260ms"],
                ["Celebrate", "cubic-bezier(0.34, 1.4, 0.64, 1)", "a check landing, LIVE stamp only"],
                ["Reorder", "cubic-bezier(0.23, 1, 0.32, 1)", "ticked task glides to the end · 260ms (FLIP)"],
                ["Sticky bar", "cubic-bezier(0.23, 1, 0.32, 1)", "fade + 6px drop · 200ms · fade only when reduced"],
                ["Ambient", "linear / ease-out loops", "AI border 6s, current-step pulse 1.8s"],
              ].map(([k, v, u]) => (
                <div key={k} className="grid gap-0.5 sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="font-medium">{k}</dt>
                  <dd><span className="font-mono text-[12px]">{v}</span><span className="block text-[12px]" style={{ color: B.muted }}>{u}</span></dd>
                </div>
              ))}
            </dl>
          </Frame>
          <Frame title="07 Icons" note="every icon on the Final page · 1.75 stroke · 16px in UI · 24px grid">
            <div className="grid gap-4">
              {ICON_SETS.map(([group, names]) => (
                <div key={group}>
                  <p className="mb-1.5 text-[12px]" style={{ color: B.muted }}>{group}</p>
                  <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                    {names.map((n) => (
                      <Tip key={n} label={n}>
                        <span tabIndex={0} className="flex aspect-square w-full items-center justify-center rounded-lg" style={{ backgroundColor: B.surface, color: B.ink }}><Icon n={n} className="size-5" /></span>
                      </Tip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Frame>
        </div>
      </div>
    </div>
  );
}
