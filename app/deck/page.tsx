// Portfolio review deck — October 2026. Unlisted: nothing links here and it is
// excluded from search. One long page, one 16:9 card per slide.
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import { DensityIcon, DecisionIcon, SystemIcon, FocusIcon, SpeedIcon, TrustIcon } from "./icons";
import FeatureFlow from "./FeatureFlow";
import DeckTabs from "./DeckTabs";
import AmbiguityConverge from "./AmbiguityConverge";
import RootOverlap from "./RootOverlap";
import "./deck.css";

export const metadata: Metadata = {
  title: "Portfolio review — Zoey Yan",
  robots: { index: false, follow: false },
};

type Theme = "intro" | "vg" | "cm";

// deck copies cropped to the app window (no baked blue gradient), shown on the warm panel
const CM_F1 = "/deck/cm-f1.mp4";
const CM_F2 = "/deck/cm-f2.mp4";

function Slide({
  theme,
  className = "",
  children,
}: {
  theme: Theme;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section data-theme={theme} className={`slide glass-card ${className}`}>
      <span className="slide-no" aria-hidden="true" />
      {children}
    </section>
  );
}

// "a · b · c" with tinted separators
function Dots({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t, i) => (
        <span key={t}>
          {i > 0 && <span className="s-dot">·</span>}
          {t}
        </span>
      ))}
    </>
  );
}

function Img({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/deck/${src}.jpg`} alt={alt} loading="lazy" className={`s-img ${className}`} />;
}

function Video({ src }: { src: string }) {
  return <video className="s-video" src={src} autoPlay muted loop playsInline preload="metadata" />;
}

// Title-only "chapter" slide, vertically centered.
function Statement({ theme, title, sub }: { theme: Theme; title: string; sub?: string[] }) {
  return (
    <Slide theme={theme} className="flex flex-col justify-center">
      <h2 className="s-title">{title}</h2>
      {sub && (
        <p className="s-sub">
          <Dots items={sub} />
        </p>
      )}
    </Slide>
  );
}

// Title + subtitle at the top, visual filling the rest.
function Visual({
  theme,
  title,
  sub,
  children,
}: {
  theme: Theme;
  title: string;
  sub?: string[];
  children: React.ReactNode;
}) {
  return (
    <Slide theme={theme} className="flex flex-col">
      <h2 className="s-title">{title}</h2>
      {sub && (
        <p className="s-sub">
          <Dots items={sub} />
        </p>
      )}
      <div className={`mt-[3cqw] flex min-h-0 flex-1 items-center justify-center gap-[3cqw] ${theme === "cm" ? "cm-panel" : ""}`}>{children}</div>
    </Slide>
  );
}

// Three tinted cards (same as the VG "strategic pillars" slide); optional line icon per card.
function Cards({
  theme,
  title,
  items,
}: {
  theme: Theme;
  title: string;
  items: [string, string, ((p: { className?: string }) => React.ReactNode)?][];
}) {
  return (
    <Slide theme={theme} className="flex flex-col">
      <h2 className="s-title">{title}</h2>
      <ol className="mt-[3cqw] grid flex-1 grid-cols-3 gap-[1.8cqw]">
        {items.map(([kicker, name, Icon]) => (
          <li key={name} className="flex flex-col rounded-[1.6cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] p-[2.6cqw]">
            {Icon && (
              <span className="flex h-[9cqw] w-[9cqw] items-center justify-center rounded-full bg-white text-[var(--c)] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
                <Icon className="h-[4.8cqw] w-[4.8cqw]" />
              </span>
            )}
            <p className="mt-auto text-[1cqw] font-bold uppercase tabular-nums tracking-[0.14em] text-gray-500">{kicker}</p>
            <p className="mt-[0.6cqw] text-[2.2cqw] font-bold leading-tight tracking-tight text-black">{name}</p>
          </li>
        ))}
      </ol>
    </Slide>
  );
}

// "Going deep": the feature I present on a filled tint with a Deep dive pill, the other dimmed (VG deep-dive style).
function Pick({ theme, title, a, b, va, vb }: { theme: Theme; title: string; a: string; b: string; va: string; vb: string }) {
  return (
    <Slide theme={theme} className="flex flex-col">
      <h2 className="s-title">{title}</h2>
      <div className="mt-[2.4cqw] grid min-h-0 flex-1 grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-[2cqw]">
        <div className="flex min-h-0 flex-col rounded-[1.6cqw] bg-[color-mix(in_oklab,var(--c)_7%,var(--white-100))] p-[2cqw]">
          <div className="flex items-start justify-between gap-[1.4cqw]">
            <p className="s-body !text-black">{a}</p>
            <span className="shrink-0 rounded-full bg-[var(--c)] px-[1cqw] py-[0.35cqw] text-[0.95cqw] font-bold text-white">Deep dive</span>
          </div>
          <div className="mt-[1.4cqw] flex min-h-0 flex-1 items-center justify-center">
            <Video src={va} />
          </div>
        </div>
        <div className="flex min-h-0 flex-col p-[0.6cqw] opacity-60">
          <p className="s-cap !text-gray-700">{b}</p>
          <div className="mt-[0.8cqw] flex min-h-0 flex-1 items-center justify-center">
            <Video src={vb} />
          </div>
        </div>
      </div>
    </Slide>
  );
}

// "The Iteration": V1 + V2 on the left, the final three screens on the right. Also drawn blurred behind
// the V1 / V2 focus slides that follow it.
function IterationBoard() {
  return (
    <>
    <h2 className="s-title">The Iteration</h2>
    <div className="mt-[2cqw] flex min-h-0 flex-1 items-center justify-center gap-[2.6cqw]">
      <div className="flex w-[30cqw] flex-col gap-[1.4cqw]">
        <figure className="flex flex-col gap-[0.6cqw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deck/vg-v1-white.jpg"
            alt="V1: the chart with an Edit button, linked to the metric picker sheet it opens"
            className="aspect-[1793/1725] w-full rounded-[0.8cqw] bg-white object-contain shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.1)]"
          />
          <figcaption className="text-[1.1cqw] text-[var(--gray-700)]">
            <b className="text-[var(--c)]">V1</b> · Edit opens a metric sheet
          </figcaption>
        </figure>
        <figure className="flex items-end gap-[1cqw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deck/vg-v2.jpg"
            alt="V2 concept sketch: metric chips above the chart, values shown for the scrubbed date"
            className="aspect-[816/752] w-[13cqw] rounded-[0.6cqw] object-contain shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.1)]"
          />
          <figcaption className="text-[1.1cqw] leading-snug text-[var(--gray-700)]">
            <b className="text-[var(--c)]">V2</b> · Concept:
            <br />
            pick metrics on the chart
          </figcaption>
        </figure>
      </div>
      <span className="w-[0.1cqw] self-stretch bg-[color-mix(in_oklch,var(--c)_15%,transparent)]" aria-hidden="true" />
      <div className="flex flex-col gap-[1cqw]">
        <p className="text-[1.2cqw] font-bold uppercase tracking-[0.08em] text-[var(--c)]">Final</p>
        <div className="relative">
        <ol className="flex gap-[3cqw]">
          {[
            ["vg-final-1", "Metrics above the chart", "Final chart: a metric strip above the chart shows values for the scrubbed date, with an Edit chart metrics drawer below"],
            ["vg-final-2", "Edit chart metrics", "Edit chart metrics sheet: save a custom view and toggle metrics by Quality, Value and Growth"],
            ["vg-final-3", "All Metrics reference", "All Metrics page: each metric expands to its formula, definition and an example"],
          ].map(([src, label, alt], i) => (
            <li key={src} className="flex flex-col gap-[0.8cqw]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/deck/${src}.jpg`}
                alt={alt}
                className="aspect-[590/1282] h-[42cqw] max-w-none shrink-0 rounded-[1.2cqw] object-cover object-top shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.12),0_1.2cqw_2.4cqw_-1.2cqw_rgba(26,34,83,0.3)]"
              />
              <span className="flex items-center gap-[0.6cqw] text-[1.15cqw] text-[var(--gray-700)]">
                <span className="flex h-[1.6cqw] w-[1.6cqw] shrink-0 items-center justify-center rounded-full bg-[var(--c)] text-[0.9cqw] font-bold text-white">{i + 1}</span>
                {label}
              </span>
            </li>
          ))}
        </ol>
        {/* Flow arrows, drawn at a 40-unit phone height (18.41 wide, 2.857 gaps) and scaled to the 42cqw phones / 3cqw gaps.
            Edit chart metrics (1) → the sheet it opens (2); Metric definitions (2) → All Metrics (3). */}
        <svg
          viewBox="0 0 60.944 40"
          className="pointer-events-none absolute left-0 top-0 h-[42cqw] w-[63.99cqw] overflow-visible"
          fill="none"
          stroke="var(--c)"
          strokeWidth="0.22"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18.2" cy="38.5" r="0.4" fill="var(--c)" />
          <path d="M18.2 38.5H19.34a0.5 0.5 0 0 0 .5-.5V8.1a0.5 0.5 0 0 1 .5-.5H21.77M21.07 6.9l.7.7-.7.7" />
          <circle cx="39.41" cy="19.8" r="0.4" fill="var(--c)" />
          <path d="M39.41 19.8H40.6a0.5 0.5 0 0 0 .5-.5V2.4a0.5 0.5 0 0 1 .5-.5H43.03M42.33 1.2l.7.7-.7.7" />
        </svg>
        </div>
      </div>
    </div>
    </>
  );
}

// Focus slide: the iteration board blurred behind, one version enlarged on top.
function IterationFocus({ v, label, src = "", ratio = "", alt = "", bare = false, children }: { v: string; label: string; src?: string; ratio?: string; alt?: string; bare?: boolean; children?: React.ReactNode }) {
  return (
    <Slide theme="vg" className="flex flex-col items-center justify-center !py-[1.6cqw]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col px-[6.75cqw] pb-[3.4cqw] pt-[4.2cqw] opacity-50 blur-[0.5cqw]">
        <IterationBoard />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[color-mix(in_oklab,var(--white-100)_55%,transparent)]" />
      <figure className="relative flex flex-col items-center">
        {children ?? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/deck/${src}`}
          alt={alt}
          className={
            bare
              ? "h-[46cqw] w-auto max-w-[86cqw] shrink-0 object-contain drop-shadow-[0_1.4cqw_2cqw_rgba(26,34,83,0.25)]"
              : "h-[38cqw] w-auto max-w-[80cqw] rounded-[1.2cqw] bg-white object-contain shadow-[0_0_0_0.1cqw_rgba(26,34,83,0.1),0_2cqw_4cqw_-2cqw_rgba(26,34,83,0.35)]"
          }
          style={{ aspectRatio: ratio }}
        />
        )}
        <figcaption>
          <h2 className={`${bare ? "mt-[1cqw]" : "mt-[1.6cqw]"} text-center text-[1.8cqw] font-bold text-black`}>
            <span className="mr-[0.6cqw] text-[var(--c)]">{v}</span>
            {label}
          </h2>
        </figcaption>
      </figure>
    </Slide>
  );
}

export default function Deck() {
  return (
    <main className="deck" data-show="vg" data-mode="present">
      <DeckTabs />
      {/* ---------------- Intro ---------------- */}
      {/* intro (cover, agenda, about me) opens the ValueGlance deck only */}
      <div data-part="vg" className="contents">
      <Slide theme="intro" className="grid grid-cols-[1fr_auto] items-center">
        <div className="flex h-full flex-col">
          <p className="s-body !text-black">October 2026</p>
          <div className="my-auto">
            <span className="text-[var(--c)]">
              <Logo size={88} />
            </span>
            <h1 className="s-display mt-[1.6cqw] !text-[4.6cqw]">Hi, I’m Zoey :)</h1>
          </div>
          <p className="s-body !text-black">Product Designer</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/deck/portrait.jpg" alt="Zoey Yan" className="aspect-square w-[31.5cqw] rounded-full object-cover object-top" />
      </Slide>

      {/* Agenda: one picture per chapter, no descriptions */}
      <Slide theme="intro" className="flex flex-col">
        <h2 className="s-title">Agenda</h2>
        <ol className="mt-auto grid grid-cols-4 gap-[2cqw]">
          {[
            ["01", "About me", "/deck/portrait.jpg", ""],
            ["02", "ValueGlance", "/deck/mark-valueglance.png", "rgb(26, 34, 83)"],
            ["03", "Canmarket.ai", "/deck/mark-canmarket.png", "rgb(21, 93, 252)"],
            ["04", "Q & A", "", ""],
          ].map(([n, t, src, bg]) => (
            <li key={n} className="flex flex-col">
              <div
                className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.4cqw] bg-[color-mix(in_oklab,var(--c)_8%,var(--white-100))]"
                style={bg ? { backgroundColor: `color-mix(in oklab, ${bg} 9%, white)` } : undefined}
              >
                {src && bg ? (
                  // company logo straight on a pale wash of its brand color
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={`${t} logo`} className="h-[48%] w-auto object-contain" />
                ) : src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt="" className="h-full w-full object-cover object-top" />
                ) : (
                  <span className="text-[var(--c)]">
                    <Logo size={96} />
                  </span>
                )}
              </div>
              <p className="s-h mt-[1.2cqw]">
                <span className="mr-[0.6cqw] tabular-nums" style={{ color: "color-mix(in oklab, var(--c) 45%, white)" }}>
                  {n}
                </span>
                {t}
              </p>
            </li>
          ))}
        </ol>
      </Slide>

      {/* About me: superpower + schools on the left, what I love on the right */}
      <Slide theme="intro" className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[4cqw]">
        <div className="flex flex-col">
          <h2 className="s-title">About me</h2>
          <p className="s-eyebrow mt-[3.4cqw]">My superpower</p>
          <p className="mt-[1cqw] font-serif text-[4cqw] italic leading-[1.08] text-black">
            I connect dots <span className="text-[var(--c)]">others don’t see</span>.
          </p>
          <div className="mt-auto grid grid-cols-2 gap-[1.4cqw]">
            {[
              ["🌲", "Stanford University", "MS, Learning, Design & Technology", "2025 – 2026"],
              ["💙", "Wellesley College", "BA, HCI + Mathematics", "2021 – 2025"],
            ].map(([icon, school, degree, years]) => (
              <div key={school} className="flex flex-col rounded-[1.4cqw] bg-[color-mix(in_oklab,var(--c)_7%,var(--white-100))] p-[1.8cqw]">
                <span className="text-[2.6cqw] leading-none">{icon}</span>
                <p className="s-cap mt-[1.4cqw] tabular-nums">{years}</p>
                <p className="mt-[0.3cqw] text-[1.9cqw] font-bold leading-tight tracking-tight text-black">{school}</p>
                <p className="s-cap mt-[0.3cqw] !text-gray-700">{degree}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-h-0 flex-col">
          <p className="s-eyebrow">I love…</p>
          <div className="mt-[1.2cqw] grid min-h-0 flex-1 grid-rows-2 gap-[1.4cqw]">
            {[
              ["cats", "My cats :)", "50% 62%"],
              ["bouldering", "Bouldering", "50% 30%"],
            ].map(([src, label, pos]) => (
              <figure key={src} className="relative min-h-0 overflow-hidden rounded-[1.4cqw]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/deck/${src}.jpg`} alt={label} className="h-full w-full object-cover" style={{ objectPosition: pos }} />
                <figcaption className="glass absolute bottom-[1.2cqw] left-[1.2cqw] rounded-full px-[1.2cqw] py-[0.5cqw] text-[1.3cqw] font-bold text-black">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Slide>

      </div>
      <div data-part="vg" className="contents">
      {/* ---------------- 01 · ValueGlance ---------------- */}
      {/* Product intro (Centered): name + one-line problem, then the desktop
          and phone screens at the same height on a tinted band */}
      <Slide theme="vg" className="flex flex-col items-center !p-0 text-center">
        <div className="pt-[4.4cqw]">
          <p className="s-eyebrow">
            01<span className="s-dot">·</span>Product Design/Engineering Intern<span className="s-dot">·</span>Oct 2025 – Jan 2026, Jun – Sep 2026
          </p>
          <h2 className="s-display mt-[0.8cqw] !text-[4.4cqw]">ValueGlance</h2>
          <p className="s-sub !mt-[0.4cqw]">Fintech Webapp ｜ Figma, Claude Code, Linear</p>
        </div>
        <div className="mt-[3cqw] flex w-full flex-1 items-center justify-center gap-[1.6cqw] bg-[color-mix(in_oklab,var(--c)_7%,var(--white-100))]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deck/vg-desktop.jpg"
            alt="ValueGlance data visualization on desktop"
            className="h-[33cqw] w-auto rounded-[0.8cqw]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deck/vg-mobile.jpg"
            alt="ValueGlance data visualization on mobile"
            className="h-[33cqw] w-auto rounded-[0.8cqw]"
          />
        </div>
      </Slide>

      {/* Features: the demo fills the slide */}
      {[
        ["Feature 1", "Mobile watchlist data visualization redesign", "flow"],
        ["Feature 2", "Screener filter redesign", "laptop"],
        ["Feature 3", "Design system revamp & migration", "tokens"],
      ].map(([n, t, src]) => (
        <Slide key={n} theme="vg" className="flex flex-col !px-[5cqw] !py-[3cqw]">
          <p className="s-h">
            <span className="mr-[0.8cqw] text-[var(--c)]">{n}</span>
            {t}
          </p>
          <div className="mt-[1.6cqw] flex min-h-0 flex-1 justify-center">
            {src === "flow" ? (
              // the shipped flow, coded: tap → arrow → next screen
              <FeatureFlow className="w-[78cqw] self-center" />
            ) : src === "laptop" || src === "tokens" ? (
              // Product recordings on a static laptop. Screener: click-through (browser chrome cropped).
              // Tokens: six design-tokens page walkthroughs joined with fades through white, each with a chapter pill.
              <div className={`${src === "tokens" ? "w-[68cqw]" : "w-[79.8cqw]"} self-center`}>
                <div className="rounded-t-[1.6cqw] bg-[#1d1e22] p-[0.9cqw] pb-[1.1cqw] shadow-[0_0_0_0.12cqw_#3a3b40_inset]">
                  <video
                    className={`block w-full rounded-[0.7cqw] bg-white ${src === "tokens" ? "aspect-[1600/1004]" : "aspect-[1600/804]"}`}
                    src={src === "tokens" ? "/media/valueglance/design-tokens.mp4" : "/media/valueglance/screener-flow.mp4"}
                    poster={src === "tokens" ? "/media/valueglance/design-tokens-poster.jpg" : "/media/valueglance/screener-flow-poster.jpg"}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="relative -mx-[4cqw] h-[1.6cqw] rounded-b-[1.4cqw] bg-gradient-to-b from-[#e4e6ea] to-[#a9adb6] shadow-[0_2cqw_4cqw_-1.2cqw_rgba(26,34,83,0.35)]">
                  <span className="absolute left-1/2 top-0 h-[0.6cqw] w-[11cqw] -translate-x-1/2 rounded-b-[0.6cqw] bg-[#9a9ea8]" />
                </div>
              </div>
            ) : (
              <video className="s-video h-full !w-auto" src={src} autoPlay muted loop playsInline preload="metadata" />
            )}
          </div>
        </Slide>
      ))}

      {/* Role & scope: four proof points, each shown with the real artifact */}
      <Slide theme="vg" className="flex flex-col !pb-[3.4cqw] !pt-[3.6cqw]">
        <h2 className="s-title">My role & scope</h2>
        <div className="mt-[2cqw] grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-[1.6cqw]">
          {([
            ["100+", "points completed", "vg-linear", "Linear issues assigned to me, completed", [["linear", "Linear"]]],
            ["30+", "PRs created", "vg-prs", "Merged GitHub pull requests I authored", [["github", "GitHub"]]],
            ["10+", "components migrated", "vg-migration", "Figma canvases: WIP components, explorations, mobile data views", [["figma", "Figma"], ["claude", "Claude Code"]]],
            ["20+", "user survey responses", "vg-survey", "User survey responses table, blurred for privacy", [["microsoftexcel", "Excel"]]],
          ] as [string, string, string, string, string[][]][]).map(([big, small, src, alt, tools]) => (
            <div key={src} className="flex min-h-0 flex-col overflow-hidden rounded-[1.4cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))]">
              <p className="px-[1.8cqw] pt-[1.4cqw] text-[1.5cqw] leading-tight">
                <span className="font-bold text-[var(--c)]">{big}</span>{" "}
                <span className="text-gray-700">{small}</span>
              </p>
              <div className="relative mt-[1cqw] min-h-0 flex-1 overflow-hidden px-[1.8cqw]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/deck/${src}.jpg`}
                  alt={alt}
                  className={`h-full w-full rounded-t-[0.8cqw] ${
                    src === "vg-migration" ? "bg-[#1e1e1e] object-contain" : "bg-white object-cover object-left-top"
                  }`}
                />
                {/* the tool behind each number, on a frosted chip in the corner */}
                <span className="absolute bottom-[1cqw] right-[2.8cqw] flex items-center gap-[1cqw] rounded-[0.9cqw] bg-white/75 px-[1.1cqw] py-[0.8cqw] shadow-[0_0_0_0.06cqw_rgba(26,34,83,0.08),0_0.4cqw_1.2cqw_-0.4cqw_rgba(26,34,83,0.25)] backdrop-blur-md">
                  {tools.map(([logo, name]) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={logo} src={`/deck/logos/${logo}.svg`} alt={name} className="h-[2.6cqw] w-auto" />
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Slide>
      {/* Impact: the five shipped redesigns, shown; the release message is the receipt */}
      <Slide theme="vg" className="flex flex-col !pb-[3.4cqw] !pt-[3.6cqw]">
        <div className="flex items-end justify-between gap-[4cqw]">
          <div>
            <p className="s-eyebrow">Impact</p>
            <h2 className="s-title mt-[0.8cqw]">Shipped to production</h2>
          </div>
          <p className="text-[2.2cqw] font-bold tracking-tight text-black">
            <span className="text-[var(--c)]">5 redesigns</span> in one release
          </p>
        </div>
        <ol className="mt-[2cqw] grid min-h-0 flex-1 grid-cols-4 grid-rows-2 gap-x-[1.6cqw] gap-y-[1.2cqw]">
          {[
            ["vg-ship-1", "Screener redesign", "Stock screener on valueglance.com/screener", "col-span-2"],
            ["vg-ship-2", "Mobile chart tooltip redesign", "Mobile Quality & Value chart with metric readout", ""],
            ["vg-ship-3", "Backtester mobile redesign", "Mobile backtester performance chart", ""],
            ["vg-ship-4", "Reusable UI components", "Tooltip component page in the design-token docs", "col-span-2"],
            ["vg-ship-5", "Design token system", "tokens.json color tokens", "col-span-2"],
          ].map(([src, label, alt, span]) => (
            <li key={src} className={`flex min-h-0 flex-col ${span}`}>
              {/* whole screenshot, fitted inside a pale tile with breathing room */}
              <div className="flex min-h-0 flex-1 items-center justify-center rounded-[1cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] p-[1cqw]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/deck/${src}.jpg`}
                  alt={alt}
                  className="max-h-full max-w-full rounded-[0.5cqw] object-contain shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
                />
              </div>
              <p className="mt-[0.8cqw] text-[1.15cqw] font-medium leading-tight text-black">{label}</p>
            </li>
          ))}
        </ol>
        <div className="mt-[1.6cqw] rounded-[1cqw] bg-white px-[1.4cqw] py-[0.8cqw] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deck/vg-release-slack.png"
            alt="Slack message from Fiona, Sept 8: after so many bug fixes, we finally deployed to production"
            className="mx-auto w-[62%]"
          />
        </div>
      </Slide>
      {/* Discovery opener: a vague ask (blurred) → what I owned (in focus) */}
      <Slide theme="vg">
        <p className="s-eyebrow absolute left-[6.75cqw] top-[5cqw]">Discovery</p>
        <div className="absolute inset-0 flex items-center justify-center gap-[6cqw]">
          <div className="relative flex aspect-square w-[26cqw] items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-[0.8cqw] border-[color-mix(in_oklab,var(--c)_22%,transparent)] blur-[0.6cqw]"
            />
            <span className="text-[2.6cqw] font-bold uppercase tracking-[0.06em] text-[color-mix(in_oklab,var(--c)_45%,white)]">
              Execution
            </span>
          </div>
          <svg viewBox="0 0 40 12" className="w-[5cqw] text-[var(--c)]" aria-hidden="true">
            <path d="M0 6 H36 M30 1 L36 6 L30 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex aspect-square w-[26cqw] items-center justify-center rounded-full border-[0.25cqw] border-[var(--c)]">
            <span className="text-[2.6cqw] font-bold uppercase tracking-[0.06em] text-[var(--c)]">Ownership</span>
          </div>
        </div>
        <h2 className="sr-only">Discovery: from execution to ownership</h2>
      </Slide>
      {/* Pages 11–13: the three discovery questions, one image each (Side caption layout) */}
      {[
        {
          q: "Why?",
          title: "Understand the business",
          line: "The CEO’s investing seminars showed the goal: revamp the system, not polish charts.",
          visual: <Img src="s13" alt="My notes from the CEO's investing seminars" />,
        },
        {
          q: "For whom?",
          title: "Validate with real users",
          line: "What I flagged in my audit matched what investors reported.",
          visual: (
            // static phone mockup with the three problem spots pinned, findings beside it
            <div className="flex h-full items-center gap-[2.4cqw]">
              <div className="relative h-full shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/valueglance/mobile-chart-issues.png"
                  alt="ValueGlance mobile chart before the redesign, with three problems pinned"
                  className="h-full w-auto rounded-[2cqw] border-[0.5cqw] border-white"
                />
                {[
                  ["39%", "78%"],
                  ["95.5%", "77%"],
                  ["7.6%", "42%"],
                ].map(([top, left], i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="absolute flex h-[2.4cqw] w-[2.4cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--c)] text-[1.1cqw] font-bold text-white shadow-[0_0_0_0.3cqw_white,0_0.4cqw_1cqw_-0.3cqw_rgba(0,0,0,0.35)]"
                    style={{ top, left }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <ol className="flex min-w-0 flex-col gap-[1.6cqw]">
                {[
                  ["Tooltip covers the chart, sometimes off screen", "“The info box … is a challenge to see and often off the screen.”"],
                  ["Timeline labels overlap", "“The ‘jump to today’ button is right over the current information.”"],
                  ["Unclear hierarchy on mobile", "“Make data visualization easier to understand on mobile.”"],
                ].map(([obs, quote], i) => (
                  <li key={obs} className="flex gap-[1cqw]">
                    <span className="flex h-[2cqw] w-[2cqw] shrink-0 items-center justify-center rounded-full bg-[var(--c)] text-[0.95cqw] font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[1.2cqw] font-bold leading-snug text-black">{obs}</p>
                      <p className="mt-[0.4cqw] font-serif text-[1.25cqw] italic leading-snug text-gray-700">{quote}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ),
        },
        {
          q: "Is it feasible?",
          title: "Check it with engineering",
          line: "Walked the chart in DevTools with the CTO and front-end engineers.",
          visual: <Img src="s15" alt="Reviewing the chart in DevTools with the CTO over Zoom" />,
        },
      ].map((p, i) => (
        <Slide key={p.q} theme="vg" className="grid grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] gap-[3.6cqw] !pr-[3cqw]">
          <div className="flex flex-col justify-center">
            <p className="s-eyebrow">
              <span className="tabular-nums text-[var(--c)]">0{i + 1}</span>
              <span className="s-dot">·</span>
              {p.q}
            </p>
            <h2 className="s-title mt-[1cqw]">{p.title}</h2>
            <p className="s-body mt-[1.4cqw]">{p.line}</p>
          </div>
          <div className="flex min-h-0 items-center justify-center rounded-[1.4cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] p-[2.4cqw]">
            {p.visual}
          </div>
        </Slide>
      ))}
      {/* Strategic pillars: three cards with custom line icons */}
      <Slide theme="vg" className="flex flex-col">
        <h2 className="s-title">Define three strategic pillars</h2>
        <ol className="mt-[3cqw] grid flex-1 grid-cols-3 gap-[1.8cqw]">
          {[
            { name: "Readable density", Icon: DensityIcon },
            { name: "Decision-first", Icon: DecisionIcon },
            { name: "Reusable system", Icon: SystemIcon },
          ].map(({ name, Icon }, i) => (
            <li key={name} className="flex flex-col rounded-[1.6cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] p-[2.6cqw]">
              <span className="flex h-[9cqw] w-[9cqw] items-center justify-center rounded-full bg-white text-[var(--c)] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
                <Icon className="h-[4.8cqw] w-[4.8cqw]" />
              </span>
              <p className="mt-auto text-[1cqw] font-bold tabular-nums tracking-[0.14em] text-gray-500">0{i + 1}</p>
              <p className="mt-[0.6cqw] text-[2.2cqw] font-bold leading-tight tracking-tight text-black">{name}</p>
            </li>
          ))}
        </ol>
      </Slide>
      {/* Feature deep dive: the one I present (left, full opacity) vs. the two I skip (right, dimmed) */}
      <Slide theme="vg" className="flex flex-col">
        <h2 className="s-title">Feature deep dive</h2>
        <div className="mt-[2.4cqw] grid min-h-0 flex-1 grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-[2cqw]">
          {/* selected: filled tint + a "Deep dive" tag instead of an outline */}
          <div className="flex min-h-0 flex-col rounded-[1.6cqw] bg-[color-mix(in_oklab,var(--c)_7%,var(--white-100))] p-[2cqw]">
            <div className="flex items-start justify-between gap-[1.4cqw]">
              <p className="s-body !text-black">
                <span className="mr-[0.6cqw] font-bold text-[var(--c)]">Feature 1</span>
                Mobile watchlist data visualization redesign
              </p>
              <span className="shrink-0 rounded-full bg-[var(--c)] px-[1cqw] py-[0.35cqw] text-[0.95cqw] font-bold text-white">
                Deep dive
              </span>
            </div>
            <div className="mt-[1.4cqw] flex min-h-0 flex-1 items-center justify-center">
              <FeatureFlow className="w-full" />
            </div>
          </div>
          <div className="grid min-h-0 grid-rows-2 gap-[2cqw] opacity-60">
            {[
              [
                "Feature 2",
                "Screener filter redesign",
                <video key="s" className="s-video max-h-full !w-auto max-w-full" src="/media/valueglance/screener-flow.mp4" poster="/media/valueglance/screener-flow-poster.jpg" autoPlay muted loop playsInline preload="metadata" />,
              ],
              [
                "Feature 3",
                "Design system revamp & migration",
                <video key="v" className="s-video max-h-full !w-auto max-w-full" src="/media/valueglance/design-tokens.mp4" poster="/media/valueglance/design-tokens-poster.jpg" autoPlay muted loop playsInline preload="metadata" />,
              ],
            ].map(([n, t, media]) => (
              <div key={n as string} className="flex min-h-0 flex-col p-[0.6cqw]">
                <p className="s-cap !text-gray-700">
                  <span className="mr-[0.5cqw] font-bold">{n}</span>
                  {t}
                </p>
                <div className="mt-[0.8cqw] flex min-h-0 flex-1 items-center justify-center">{media}</div>
              </div>
            ))}
          </div>
        </div>
      </Slide>
      {/* Design · question the scope: the tooltip sits inside a chart, a page, a system (navy ramp from VG tokens) */}
      <Slide theme="vg">
        <div className="relative z-10 flex h-full max-w-[34cqw] flex-col justify-center">
          <p className="s-eyebrow">Design</p>
          <h2 className="s-title mt-[1cqw]">Question the scope</h2>
        </div>
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMaxYMax slice"
          className="absolute bottom-0 right-0 h-full w-[62%]"
          role="img"
          aria-label="Scope widening out from the tooltip to the chart, the page, and the system"
        >
          <path d="M0 1000 C 0 620, 160 330, 400 240 C 530 190, 560 70, 700 45 C 830 25, 880 150, 1000 180 L1000 1000 Z" fill="#d3d5e8" />
          <path d="M190 1000 C 190 720, 340 500, 560 440 C 700 405, 820 390, 1000 470 L1000 1000 Z" fill="#8088b2" />
          <path d="M330 1000 C 330 810, 430 650, 590 625 C 690 610, 730 565, 830 585 C 930 605, 965 700, 1000 720 L1000 1000 Z" fill="#454d77" />
          <path d="M455 1000 C 455 885, 525 795, 625 790 C 705 786, 725 748, 805 757 C 885 766, 905 865, 915 1000 Z" fill="#121a44" />
          <g fontFamily="inherit" fontWeight="700" textAnchor="middle" fontSize="40">
            <text x="700" y="320" fill="#121a44">System</text>
            <text x="740" y="530" fill="#ffffff">Page</text>
            <text x="745" y="690" fill="#ffffff">Chart</text>
            <text x="685" y="900" fill="#ffffff">Tooltip</text>
          </g>
        </svg>
      </Slide>
      {/* Competitors mid-scrub: three phones side by side, one takeaway */}
      <Slide theme="vg" className="flex flex-col">
        <h2 className="s-title">Research competitor patterns</h2>
        <div className="mt-[2.4cqw] grid min-h-0 flex-1 grid-cols-3 gap-[2.4cqw]">
          {[
            ["comp-robinhood", "Robinhood"],
            ["s19a", "TradingView"],
            ["s19b", "Yahoo Finance"],
          ].map(([src, label]) => (
            <figure key={src} className="flex min-h-0 flex-col items-center">
              <div className="flex min-h-0 flex-1 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/deck/${src}.jpg`}
                  alt={`${label} chart while dragging a finger across it`}
                  className="max-h-full w-auto rounded-[1.4cqw] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
                />
              </div>
              <figcaption className="s-h mt-[1cqw] !text-[1.4cqw]">{label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="s-cap mt-[1.6cqw] text-center">Readout is never under the finger</p>
      </Slide>
      {/* Map what matters: the metric system as four layers, wider + lighter going down,
          each labelled with how visible it is in the product */}
      <Slide theme="vg" className="flex flex-col !pb-[3cqw] !pt-[3.6cqw]">
        <h2 className="s-title">Map what matters</h2>
        <div className="mt-[2cqw] grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_17cqw] gap-[2cqw]">
          <div className="flex h-full flex-col items-center justify-between gap-[0.8cqw]">
            {/* 1 · Decision */}
            <div className="flex w-[46%] flex-1 items-center justify-center gap-[1cqw] rounded-[1.2cqw] bg-[#121a44] px-[2cqw]">
              {["Good Quality", "Overvalued"].map((t) => (
                <span key={t} className="rounded-full bg-white/15 px-[0.8cqw] py-[0.25cqw] text-[0.95cqw] font-medium text-white">
                  {t}
                </span>
              ))}
              <span className="text-white/60">→</span>
              <span className="text-[1.2cqw] font-bold tracking-[0.06em] text-white">BUY · TRIM · SELL</span>
            </div>
            {/* 2 · What drives it */}
            <div className="grid w-[64%] flex-1 grid-cols-2 items-center gap-[2cqw] rounded-[1.2cqw] bg-[#454d77] px-[2cqw] text-center">
              {[
                ["ROIC vs WACC", "→ Quality"],
                ["Hype Factor vs Eq. Hype", "→ Value"],
              ].map(([a, b]) => (
                <div key={a}>
                  <p className="text-[1.3cqw] font-bold leading-tight text-white">{a}</p>
                  <p className="text-[1cqw] text-white/70">{b}</p>
                </div>
              ))}
            </div>
            {/* 3 · Supporting */}
            <div className="flex w-[82%] flex-1 flex-wrap content-center justify-center gap-[0.5cqw] rounded-[1.2cqw] bg-[#abb0d2] px-[2cqw]">
              {[
                "Gross Margin", "ROE", "Debt / IC", "FCF Yield", "VC Yield", "Earnings Yield", "Dividend Yield",
                "Shares", "Net Income", "Revenue", "Invested Capital", "Market Cap", "Price", "Hype Rank",
              ].map((m) => (
                <span key={m} className="rounded-full bg-white px-[0.8cqw] py-[0.25cqw] text-[0.95cqw] font-medium text-[#121a44]">
                  {m}
                </span>
              ))}
            </div>
            {/* 4 · Learn */}
            <div className="flex w-full flex-1 items-center justify-center rounded-[1.2cqw] bg-[#e6e8f6] px-[2cqw]">
              <p className="text-center text-[1.05cqw] leading-snug text-[#454d77]">
                <b className="text-[#121a44]">ROIC</b> = NOPAT / IC · <i>“20% ROIC turns $1 into $1.20 in a year.”</i>
              </p>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between gap-[0.8cqw]">
            {[
              ["Decision", "Always visible"],
              ["What drives it", "Visible by default"],
              ["Supporting", "On demand"],
              ["Learn", "One tap away"],
            ].map(([layer, vis]) => (
              <div key={layer} className="flex flex-1 items-center gap-[0.8cqw]">
                <span className="h-px w-[2cqw] bg-[#8088b2]" />
                <div>
                  <p className="text-[0.85cqw] font-bold uppercase tracking-[0.14em] text-[#8088b2]">{layer}</p>
                  <p className="text-[1.15cqw] font-bold leading-tight text-[#121a44]">{vis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>
      {/* Explore: AI-assisted exploration of where the readout lives (screenshot from Claude) */}
      <Slide theme="vg" className="flex flex-col !pb-[3cqw] !pt-[3.6cqw]">
        <p className="s-eyebrow">
          <svg viewBox="0 0 24 24" className="mr-[0.5cqw] inline-block h-[1.1cqw] w-[1.1cqw] align-[-0.15em] text-[#d97757]" fill="currentColor" aria-hidden="true">
            <path d="M12 2l1.6 6.2L20 6l-4.4 4.8L22 12l-6.4 1.2L20 18l-6.4-2.2L12 22l-1.6-6.2L4 18l4.4-4.8L2 12l6.4-1.2L4 6l6.4 2.2z" />
          </svg>
          Explored with Claude
        </p>
        <h2 className="s-title mt-[0.8cqw]">Explore design directions</h2>
        <div className="mt-[2cqw] flex min-h-0 flex-1 items-center justify-center">
          {/* screenshot with the two chosen directions called out (positions are % of the screenshot) */}
          <div className="relative aspect-[3016/1486] h-full max-w-full overflow-hidden rounded-[1cqw] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1.6cqw_3.2cqw_-1.6cqw_rgba(20,30,60,0.3)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/deck/vg-ai-explore.jpg"
              alt="Claude design canvas, 'Mobile Tooltip Redesign': five phone mockups exploring where the chart readout goes. Directions 1 (on-chart tooltip) and 2 (off-chart readout) are highlighted."
              className="block h-full w-full"
            />
            {/* dim the other three explorations */}
            <span aria-hidden="true" className="absolute bg-white/65" style={{ left: "42.5%", top: "30%", width: "47%", height: "63.5%" }} />
            {[
              { left: "12%", label: "Direction 1 · On-chart tooltip" },
              { left: "27.7%", label: "Direction 2 · Off-chart tooltip" },
            ].map((d) => (
              <span
                key={d.label}
                className="absolute flex items-end justify-center rounded-[0.6cqw] border-[0.25cqw] border-[var(--c)]"
                style={{ left: d.left, top: "34.4%", width: "13.6%", height: "58.2%" }}
              >
                <span className="mb-[-1.1cqw] whitespace-nowrap rounded-full bg-[var(--c)] px-[0.9cqw] py-[0.3cqw] text-[0.95cqw] font-bold text-white">
                  {d.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Slide>
      {/* Chosen direction: off-chart tooltip, prototyped (side-caption layout, like slides 12–14) */}
      <Slide theme="vg" className="grid grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] gap-[3.6cqw] !pr-[3cqw]">
        <div className="flex flex-col justify-center">
          <p className="s-eyebrow flex items-center gap-[0.6cqw]">
            <span className="flex h-[1.6cqw] w-[1.6cqw] items-center justify-center rounded-full bg-[var(--c)] text-white">
              <svg viewBox="0 0 24 24" className="h-[1cqw] w-[1cqw]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            Chosen direction
          </p>
          <h2 className="s-title mt-[1cqw]">Off-chart tooltip</h2>
          <p className="s-body mt-[1.4cqw]">The readout moves below the chart, so the finger never covers the data and nothing runs off screen.</p>
          <div className="mt-[2.4cqw] flex items-center gap-[1cqw] rounded-[1cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] px-[1.4cqw] py-[1.1cqw]">
            <svg viewBox="0 0 24 24" className="h-[1.8cqw] w-[1.8cqw] shrink-0 text-[var(--c)]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
              <path d="M10.5 18.5h3" />
              <path d="M9 9l2.5 2.5L15 8" />
            </svg>
            <p className="text-[1.15cqw] leading-snug text-[var(--c)]">
              <b>Prototyped</b> on mobile to test it with a real finger before committing.
            </p>
          </div>
        </div>
        <div className="flex min-h-0 items-center justify-center rounded-[1.4cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] p-[2.4cqw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deck/offchart-proto-clean.jpg"
            alt="Off-chart tooltip prototype: the chart above, every metric for the scrubbed date listed below it"
            className="max-h-full w-auto rounded-[1cqw] bg-white"
          />
        </div>
      </Slide>
      {/* First pushback: the CTO (abstract avatar) and their words in a speech bubble */}
      <Slide theme="vg" className="flex flex-col">
        <p className="s-eyebrow">Design review</p>
        <h2 className="s-title mt-[0.8cqw]">The first pushback</h2>
        <div className="my-auto flex items-end gap-[3cqw] pl-[2cqw]">
          <figure className="flex shrink-0 flex-col items-center">
            <svg viewBox="0 0 120 120" className="h-[12cqw] w-[12cqw]" role="img" aria-label="The CTO">
              <circle cx="60" cy="60" r="60" fill="color-mix(in oklab, var(--c) 8%, white)" />
              <circle cx="60" cy="46" r="20" fill="var(--c)" />
              <path d="M22 112 C 24 84, 42 72, 60 72 C 78 72, 96 84, 98 112 Z" fill="var(--c)" />
            </svg>
            <figcaption className="mt-[1cqw] text-[1.3cqw] font-bold text-black">CTO</figcaption>
          </figure>
          <blockquote className="relative mb-[4cqw] rounded-[2cqw] rounded-bl-[0.4cqw] bg-[color-mix(in_oklab,var(--c)_7%,var(--white-100))] px-[3cqw] py-[2.6cqw] font-serif text-[2.1cqw] italic leading-snug text-black">
            <span
              aria-hidden="true"
              className="absolute -left-[1.4cqw] bottom-0 h-[1.6cqw] w-[1.6cqw] bg-[color-mix(in_oklab,var(--c)_7%,var(--white-100))]"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
            “Now that the tooltip’s at the bottom, the metric-picking still lives in a separate section further down. So if a
            user just wants to swap one metric, they have to leave the chart, scroll to that section, pick, and scroll back.
            That’s a lot of steps.”
          </blockquote>
        </div>
      </Slide>
      {/* Validate the concern: the round trip to swap one metric, walked through as a 4-frame storyboard.
          Frames outline the area each step happens in; regions are % of each screenshot. */}
      <Slide theme="vg" className="flex flex-col !pb-[3cqw] !pt-[3.6cqw]">
        <p className="s-eyebrow">Swapping one metric, step by step</p>
        <h2 className="s-title mt-[0.8cqw]">Validate the concern</h2>
        <ol className="mt-[2cqw] grid min-h-0 flex-1 grid-cols-4 gap-[2cqw]">
          {[
            { label: "Leave the chart", src: "pushback-step1", ratio: "1501/3270", top: "14%", h: "52%", arrow: "" },
            { label: "Scroll down", src: "pushback-scroll", ratio: "1160/2520", top: "45.5%", h: "19%", arrow: "↓" },
            { label: "Pick a metric", src: "pushback-scroll", ratio: "1160/2520", top: "65.5%", h: "25.5%", arrow: "" },
            { label: "Scroll back", src: "pushback-step1", ratio: "1501/3270", top: "14%", h: "52%", arrow: "↑" },
          ].map((f, i) => (
            <li key={f.label} className="flex min-h-0 flex-col items-center">
              <div className="relative min-h-0 flex-1" style={{ aspectRatio: f.ratio }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/deck/${f.src}.jpg`}
                  alt={`Step ${i + 1}: ${f.label}`}
                  className="absolute inset-0 h-full w-full rounded-[1.4cqw] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[2%] rounded-[1cqw] border-[0.25cqw] border-[var(--c)]"
                  style={{ top: f.top, height: f.h }}
                />
                {f.arrow && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[1.6cqw] flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-full bg-[var(--c)] text-[1.4cqw] font-bold text-white shadow-[0_0_0_0.3cqw_white]"
                    style={{ top: `calc(${f.top} + ${f.h} / 2 - 1.3cqw)` }}
                  >
                    {f.arrow}
                  </span>
                )}
              </div>
              <p className="mt-[1cqw] text-[1.2cqw] font-bold text-black">
                <span className="mr-[0.5cqw] text-[var(--c)]">{i + 1}</span>
                {f.label}
              </p>
            </li>
          ))}
        </ol>
      </Slide>
      {/* Reframe the problem: the reframe as it was shared on the call — a Zoom desktop window (macOS),
          Zoey sharing the FigJam board, Fiona and Nuti in the side-by-side speaker strip, cameras off. */}
      <Slide theme="vg" className="flex flex-col !pb-[2.6cqw] !pt-[3.6cqw]">
        <h2 className="s-title">Reframe the problem</h2>
        <div className="mt-[1.8cqw] flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.9cqw] bg-[#1a1a1a] shadow-[0_0_0_0.06cqw_rgba(0,0,0,0.5),0_1.6cqw_3.2cqw_-1.6cqw_rgba(20,30,60,0.5)]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}>
          {/* macOS title bar */}
          <div className="relative flex items-center bg-[#2b2b2b] px-[0.9cqw] py-[0.55cqw]">
            <span className="flex gap-[0.45cqw]">
              <span className="h-[0.75cqw] w-[0.75cqw] rounded-full bg-[#ff5f57]" />
              <span className="h-[0.75cqw] w-[0.75cqw] rounded-full bg-[#febc2e]" />
              <span className="h-[0.75cqw] w-[0.75cqw] rounded-full bg-[#28c840]" />
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 text-[0.85cqw] font-medium text-white/85">Zoom Meeting</span>
          </div>
          {/* meeting header: security + info, share banner, view */}
          <div className="relative flex items-center justify-between px-[0.9cqw] py-[0.45cqw]">
            <span className="flex items-center gap-[0.5cqw]">
              <svg viewBox="0 0 24 24" className="h-[1.1cqw] w-[1.1cqw]" aria-hidden="true">
                <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" fill="#23d959" />
                <path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg viewBox="0 0 24 24" className="h-[1.05cqw] w-[1.05cqw]" fill="none" stroke="#bdbdbd" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v6M12 7.5v.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[0.9cqw] rounded-[0.4cqw] bg-[#23d959] px-[0.9cqw] py-[0.25cqw] text-[0.82cqw] font-semibold text-[#0b2a14]">
              You are viewing Zoey Yan&rsquo;s screen
              <span className="flex items-center gap-[0.25cqw] font-medium">
                View Options
                <svg viewBox="0 0 24 24" className="h-[0.8cqw] w-[0.8cqw]" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </span>
            </span>
            <span className="flex items-center gap-[0.35cqw] text-[0.82cqw] text-white/85">
              <svg viewBox="0 0 24 24" className="h-[0.95cqw] w-[0.95cqw]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              View
            </span>
          </div>
          {/* shared screen + side-by-side speaker strip */}
          <div className="flex min-h-0 flex-1 gap-[0.3cqw]">
            <div className="flex min-h-0 flex-1 items-center justify-center bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/deck/vg-reframe-figjam.jpg"
                alt="Shared FigJam board. Old problem: how might we stop the tooltip from covering the chart? New framing: how might we let investors read and adjust metrics smoothly, so they can decide faster?"
                className="max-h-full max-w-full"
              />
            </div>
            <ul className="flex w-[14cqw] flex-col gap-[0.3cqw] pr-[0.3cqw]">
              {(
                [
                  ["Zoey Yan", true, false],
                  ["Fiona", false, true],
                  ["Nuti", false, true],
                ] as const
              ).map(([name, speaking, muted]) => (
                <li
                  key={name}
                  className={`relative flex aspect-video items-center justify-center rounded-[0.3cqw] bg-[#242424] ${speaking ? "shadow-[inset_0_0_0_0.16cqw_#23d959]" : ""}`}
                >
                  <span className="text-[1.25cqw] font-medium text-white">{name}</span>
                  <span className="absolute bottom-[0.35cqw] left-[0.35cqw] flex items-center gap-[0.25cqw] rounded-[0.2cqw] bg-black/60 px-[0.35cqw] py-[0.1cqw] text-[0.7cqw] text-white">
                    <svg viewBox="0 0 24 24" className="h-[0.75cqw] w-[0.75cqw]" fill="none" stroke={muted ? "#ff4d4f" : "#ffffff"} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3" />
                      {muted && <path d="M4 4l16 16" />}
                    </svg>
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* meeting controls */}
          <div className="flex items-end justify-between bg-[#1a1a1a] px-[1.2cqw] pb-[0.5cqw] pt-[0.6cqw] text-[0.72cqw] text-white/90" aria-hidden="true">
            <span className="flex gap-[1.4cqw]">
              {[
                ["Mute", <path key="m" d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3" />],
                ["Start Video", <path key="v" d="M3 7h12v10H3zM15 10l6-3v10l-6-3M3 3l18 18" />],
              ].map(([label, icon]) => (
                <span key={label as string} className="flex flex-col items-center gap-[0.2cqw]">
                  <svg viewBox="0 0 24 24" className="h-[1.35cqw] w-[1.35cqw]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                  {label}
                </span>
              ))}
            </span>
            <span className="flex gap-[1.4cqw]">
              {[
                ["Participants", <path key="p" d="M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.3M18.5 14.6A6.5 6.5 0 0 1 21 20" />, "3"],
                ["Chat", <path key="c" d="M4 5h16v11H9l-5 4z" />],
                ["React", <path key="r" d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />],
                ["Share", <path key="s" d="M4 4h16v16H4zM12 16V8M8.5 11.5 12 8l3.5 3.5" />, undefined, true],
                ["Record", <><circle key="o" cx="12" cy="12" r="8" /><circle key="i" cx="12" cy="12" r="3" fill="currentColor" /></>],
                ["Apps", <path key="a" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />],
                ["More", <path key="d" d="M6 12h.01M12 12h.01M18 12h.01" strokeWidth="3" />],
              ].map(([label, icon, badge, green]) => (
                <span key={label as string} className="relative flex flex-col items-center gap-[0.2cqw]">
                  <svg viewBox="0 0 24 24" className={`h-[1.35cqw] w-[1.35cqw] ${green ? "text-[#23d959]" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                  {label}
                  {badge && <span className="absolute top-0 left-[calc(50%+0.8cqw)] text-[0.62cqw] font-semibold leading-none">{badge}</span>}
                </span>
              ))}
            </span>
            <span className="mb-[0.3cqw] rounded-[0.35cqw] bg-[#e02828] px-[1cqw] py-[0.35cqw] text-[0.8cqw] font-semibold text-white">End</span>
          </div>
        </div>
      </Slide>
      {/* The iteration: V1 and V2 small on the left, the final three screens large on the right;
          then V1 and V2 each enlarged over the blurred board */}
      <Slide theme="vg" className="flex flex-col !pb-[3.4cqw] !pt-[4.2cqw]">
        <IterationBoard />
      </Slide>
      <IterationFocus v="V1" label="Edit opens a metric sheet" src="vg-v1-screens.png" ratio="1526/1462" bare alt="V1: the chart with an Edit button, linked to the metric picker sheet it opens" />
      <IterationFocus v="V2" label="Concept: pick metrics on the chart" src="vg-v2.jpg" ratio="816/752" alt="V2 concept sketch: metric chips above the chart, values shown for the scrubbed date" />
      {/* Final version: the shipped flow (tap → arrow → next screen) over the blurred board */}
      <IterationFocus v="Final" label="Metrics above the chart → Edit chart metrics → All Metrics">
        <FeatureFlow className="w-[74cqw]" />
      </IterationFocus>
      {/* Rebuild the components: the whole library board as one artifact, stats as the headline */}
      <Slide theme="vg" className="flex flex-col !pb-[3cqw] !pt-[3.6cqw]">
        <div className="flex items-end justify-between">
          <div>
            <p className="s-eyebrow">Design system</p>
            <h2 className="s-title mt-[0.8cqw]">Rebuild the components</h2>
          </div>
        </div>
        <div className="mt-[2cqw] flex min-h-0 flex-1 items-center justify-center rounded-[1.6cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] p-[1.6cqw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deck/vg-components.jpg"
            alt="Mobile data visualization component library: foundations and 8 components with their states"
            className="max-h-full max-w-full rounded-[0.8cqw] bg-white shadow-[0_0_0_1px_rgba(26,34,83,0.08)]"
          />
        </div>
      </Slide>
      {/* Handoff = the PR. Close-up: #1334 (title, before/after, changes; thread: handed off → review → approved & merged).
          Mid shot: the count — 25 merged PRs authored by zoeyyanvg in fpp-admin/financial-tool. */}
      <Slide theme="vg" className="flex flex-col !pb-[3cqw] !pt-[3.6cqw]">
        <div className="flex items-end justify-between">
          <h2 className="s-title">Drive the handoff</h2>
          <p className="flex items-baseline gap-[0.8cqw] leading-none">
            <span className="text-[3.6cqw] font-bold tracking-tight text-[var(--c)]">25</span>
            <span className="text-[1.5cqw] font-medium text-[var(--gray-700)]">PRs merged</span>
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/deck/handoff-title.jpg"
          alt="VG-2677: Redesign chart tooltips on mobile #1334 — Merged by fiona-fpp into staging on Aug 11"
          className="mt-[1.4cqw] w-[62cqw] mix-blend-multiply"
        />
        <div className="mt-[1.4cqw] flex min-h-0 flex-1 gap-[3cqw]">
          <div className="flex w-[42.9cqw] shrink-0 flex-col gap-[1.4cqw] self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/deck/handoff-changes.jpg"
              alt="Changes made: slide your finger on a chart and a crosshair, colored dots and a date pill follow; values show in a spot that's always visible"
              className="w-full rounded-[0.6cqw] bg-white shadow-[0_0_0_0.08cqw_rgba(26,34,83,0.12)]"
            />
            <div className="flex items-end gap-[1.2cqw]">
              {[
                ["Before", "handoff-before", "Before: a floating tooltip card covers the chart while scrubbing"],
                ["After", "handoff-after", "After: values sit in metric tiles above the chart; only a crosshair and date pill on the chart"],
              ].map(([label, src, alt]) => (
                <figure key={src} className="flex flex-col gap-[0.5cqw]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/deck/${src}.jpg`} alt={alt} className="h-[23cqw] w-auto max-w-none rounded-[0.6cqw] bg-white shadow-[0_0_0_0.08cqw_rgba(26,34,83,0.12)]" />
                  <figcaption className="text-[1cqw] font-semibold uppercase tracking-[0.08em] text-[var(--gray-500)]">{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <ol className="relative flex min-w-0 flex-1 flex-col gap-[1cqw] self-start pl-[2cqw] before:absolute before:bottom-[1cqw] before:left-[0.55cqw] before:top-[1cqw] before:w-[0.12cqw] before:bg-[color-mix(in_oklch,var(--c)_20%,transparent)]">
            {[
              ["Handed off · Jul 23", "handoff-desc", "zoeyyanvg opened the PR: floating tooltip cards don't work well on touch; all four charts now share one simple pattern. Linear ticket VG-2677."],
              ["Review", "handoff-comment", "fiona-fpp: Thank you @zoeyyanvg, really great work! A popup on top of another popup, maybe we should change this?"],
              ["Approved · merged", "handoff-approve", "fiona-fpp approved these changes (Great improvement from what we had!) and merged into staging on Aug 11"],
            ].map(([label, src, alt]) => (
              <li key={src} className="relative">
                <span className="absolute -left-[1.85cqw] top-[0.35cqw] h-[0.9cqw] w-[0.9cqw] rounded-full border-[0.15cqw] border-[var(--c)] bg-white" />
                <p className="mb-[0.4cqw] text-[1cqw] font-semibold uppercase tracking-[0.08em] text-[var(--gray-500)]">{label}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/deck/${src}.jpg`} alt={alt} className="w-full rounded-[0.6cqw] bg-white shadow-[0_0_0_0.08cqw_rgba(26,34,83,0.12)]" />
              </li>
            ))}
          </ol>
        </div>
      </Slide>

      {/* Reflection: the takeaway as a serif statement, the two lessons as a numbered column */}
      <Slide theme="vg" className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[5cqw]">
        <div className="relative flex flex-col justify-center">
          <svg viewBox="0 0 400 400" className="pointer-events-none absolute -left-[4cqw] top-1/2 w-[34cqw] -translate-y-1/2" aria-hidden="true">
            {[190, 150, 110, 70].map((r, i) => (
              <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="var(--c)" strokeOpacity={0.06 + i * 0.05} strokeWidth="1.5" />
            ))}
          </svg>
          <p className="s-eyebrow relative">Reflection</p>
          <h2 className="relative mt-[1.4cqw] font-serif text-[4.6cqw] italic leading-[1.05] text-[var(--c)]">Ownership means looking beyond the initial request.</h2>
        </div>
        <ol className="flex flex-col justify-center gap-[2.4cqw]">
          {(
            [
              ["Look beyond the component", "A tooltip problem revealed a disconnected workflow."],
              ["Understand the concern behind feedback", "Walking through the interaction turned feedback into a clearer design direction."],
            ] as const
          ).map(([t, d], i) => (
            <li key={t} className="border-t-[0.15cqw] pt-[1.6cqw]" style={{ borderColor: "color-mix(in oklab, var(--c) 25%, var(--white-100))" }}>
              <p className="text-[1.2cqw] font-bold tabular-nums text-[var(--c)]">0{i + 1}</p>
              <p className="mt-[0.5cqw] text-[2cqw] font-bold leading-tight text-black">{t}</p>
              <p className="mt-[0.7cqw] text-[1.4cqw] leading-snug text-gray-600">{d}</p>
            </li>
          ))}
        </ol>
      </Slide>
      </div>
      <div data-part="cm" className="contents">
      {/* ---------------- 02 · Canmarket.ai ---------------- */}
      {/* Product intro (Centered), same template as ValueGlance */}
      <Slide theme="cm" className="flex flex-col items-center !p-0 text-center">
        <div className="pt-[4.4cqw]">
          <p className="s-eyebrow">
            02<span className="s-dot">·</span>Founding Product Designer &amp; CPO<span className="s-dot">·</span>Jun 2025 – Feb 2026
          </p>
          <h2 className="s-display mt-[0.8cqw] !text-[4.4cqw]">Canmarket.ai</h2>
          <p className="s-sub !mt-[0.4cqw]">B2B AI Marketing Webapp ｜ Figma (MCP), Claude Code</p>
        </div>
        <div className="mt-[3cqw] flex w-full flex-1 items-center justify-center gap-[1.6cqw] overflow-hidden bg-[var(--cm-tint)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/cm-screen-campaigns.jpg" alt="Canmarket.ai campaign overview" className="h-[30cqw] w-auto rounded-[0.8cqw] shadow-[0_0_0_1px_rgb(40_30_20/0.08)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/cm-screen-onboarding.jpg" alt="Canmarket.ai onboarding: company business model" className="h-[30cqw] w-auto rounded-[0.8cqw] shadow-[0_0_0_1px_rgb(40_30_20/0.08)]" />
        </div>
      </Slide>
      {/* Features: same header + demo layout as the VG feature slides */}
      {[
        ["Feature 1", "Onboarding experience", CM_F1],
        ["Feature 2", "Campaign generation workflow", CM_F2],
      ].map(([n, t, src]) => (
        <Slide key={n} theme="cm" className="flex flex-col !px-[5cqw] !py-[3cqw]">
          <p className="s-h">
            <span className="mr-[0.8cqw] text-[var(--c)]">{n}</span>
            {t}
          </p>
          <div className="cm-panel mt-[1.6cqw] flex min-h-0 flex-1 justify-center">
            <video className="s-video h-full !w-auto" src={src} autoPlay muted loop playsInline preload="metadata" />
          </div>
        </Slide>
      ))}
      {/* Role & scope (Bento): the strongest proof big, the rest as smaller tiles; hats without a photo on the accent tile */}
      <Slide theme="cm" className="flex flex-col !pb-[3cqw] !pt-[3.6cqw]">
        <div className="flex items-end justify-between">
          <div>
            <p className="s-eyebrow">Role &amp; scope</p>
            <h2 className="s-title mt-[0.8cqw]">Founding Designer &amp; CPO</h2>
          </div>
          <p className="text-[1.4cqw] font-semibold text-[var(--ink)]">0 → 1 · research → frontend</p>
        </div>
        <div className="mt-[2cqw] grid min-h-0 flex-1 grid-cols-4 grid-rows-2 gap-[1.2cqw]">
          {(
            [
              ["cm-ia-blur", "AI CMO workflow (blurred)", "IA", "+ user flows", "col-span-2", "bg-white object-contain p-[1cqw]"],
              ["cm-whiteboard", "Whiteboarding the agent's functions", "Planning", "w/ CEO + CTO", "", "object-cover"],
              ["cm-team", "Working session with the CEO and CTO", "Team", "CEO · CTO · me", "row-span-2", "object-cover object-[50%_30%]"],
              ["cm-wireframes", "Wireframes board", "Wireframes", "→ hi-fi", "", "object-cover object-left-top"],
              ["s60", "Building the frontend in VS Code", "Frontend", "+ eng QA", "", "object-cover object-left-top"],
            ] as const
          ).map(([src, alt, k, t, span, fit]) => (
            <figure key={src} className={`relative min-h-0 overflow-hidden rounded-[1.2cqw] bg-[var(--cm-tint)] shadow-[0_0_0_1px_rgb(40_30_20/0.08)] ${span}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/deck/${src}.jpg`} alt={alt} className={`h-full w-full ${fit}`} />
              <figcaption className="absolute bottom-[0.8cqw] left-[0.8cqw] rounded-full bg-white/90 px-[0.9cqw] py-[0.3cqw] text-[1.05cqw] font-semibold text-[var(--ink)] shadow-[0_0_0_1px_rgb(40_30_20/0.06)] backdrop-blur">
                <span className="text-[var(--c)]">{k}</span> {t}
              </figcaption>
            </figure>
          ))}
          <div className="flex flex-col justify-center gap-[0.8cqw] rounded-[1.2cqw] bg-[var(--c)] p-[1.8cqw] text-white">
            {["Stakeholder interviews", "Competitive analysis", "Information architecture"].map((t) => (
              <p key={t} className="flex items-center gap-[0.6cqw] text-[1.3cqw] font-semibold">
                <span className="h-[0.5cqw] w-[0.5cqw] shrink-0 rounded-full bg-white/80" />
                {t}
              </p>
            ))}
          </div>
        </div>
      </Slide>
      {/* Impact (Showcase): the live product leads, numbers under it; the CTO's WeChat confirmation as the receipt —
          original screenshot behind, an English translation in front (same messages, no names or photos) */}
      <Slide theme="cm" className="flex flex-col !pb-[3cqw] !pt-[3.6cqw]">
        <p className="s-eyebrow">Impact</p>
        <h2 className="s-title mt-[0.8cqw]">Launched &amp; validated</h2>
        <div className="mt-[2cqw] grid min-h-0 flex-1 grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)] gap-[2cqw]">
          <figure className="flex min-h-0 flex-col justify-center rounded-[1.6cqw] bg-[var(--cm-tint)] p-[2cqw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deck/s39a.jpg" alt="AI-generated shoppable product videos live on oricultural.com" className="w-full rounded-[1cqw] bg-white shadow-[0_0_0_1px_rgb(40_30_20/0.08)]" />
            <figcaption className="mt-[1cqw] text-[1.2cqw] text-gray-500">
              <b className="text-[var(--ink)]">Live on oricultural.com</b> · AI-generated shoppable videos
            </figcaption>
            <dl className="mt-[1.8cqw] grid grid-cols-4 gap-[1.2cqw]">
              {[
                ["Jan 2026", "Launched"],
                ["$200K", "Seed raised"],
                ["21", "Paying customers"],
                ["3", "Markets · US, China, SG"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-[2.4cqw] font-bold leading-none text-[var(--ink)] tabular-nums">{n}</dt>
                  <dd className="mt-[0.5cqw] text-[1cqw] font-semibold text-gray-500">{l}</dd>
                </div>
              ))}
            </dl>
          </figure>
          <div className="relative min-h-0">
            {/* original */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/deck/s39b.jpg"
              alt="Original WeChat thread with the CTO, in Chinese"
              className="absolute left-0 top-0 w-[62%] -rotate-3 rounded-[1cqw] shadow-[0_0_0_1px_rgb(40_30_20/0.1),0_1cqw_2cqw_-1cqw_rgb(40_30_20/0.35)]"
            />
            <span className="absolute left-[2%] top-[1%] z-10 rounded-full bg-white/90 px-[0.7cqw] py-[0.2cqw] text-[0.85cqw] font-semibold text-gray-600">Original</span>
            {/* English translation */}
            <figure
              className="absolute bottom-0 right-0 w-[78%] overflow-hidden rounded-[1.2cqw] bg-[#ededed] shadow-[0_0_0_1px_rgb(40_30_20/0.08),0_1.2cqw_2.4cqw_-1cqw_rgb(40_30_20/0.4)]"
              style={{ fontSize: "0.92cqw" }}
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] bg-[#f7f7f7] px-[1.2em] py-[0.7em] text-[#191919]">
                <span>‹</span>
                <span className="font-semibold">Chat with CTO</span>
                <span>···</span>
              </div>
              <div className="flex flex-col gap-[0.6em] px-[1em] py-[0.9em]">
                {(
                  [
                    ["time", "Mar 23, 12:04 PM"],
                    ["me", "Quick metrics question: roughly how much funding and how many users do we have now?"],
                    ["time", "Mar 23, 8:50 PM"],
                    ["cto", "200K"],
                    ["cto", "21"],
                    ["cto", "customers: China, US, Singapore"],
                    ["time", "Mar 25, 6:03 PM"],
                    ["me", "Paying users?"],
                    ["cto", "Yep"],
                  ] as const
                ).map(([who, text], i) =>
                  who === "time" ? (
                    <p key={i} className="text-center text-[0.8em] text-[#b2b2b2]">{text}</p>
                  ) : (
                    <div key={i} className={`flex items-start gap-[0.5em] ${who === "me" ? "flex-row-reverse" : ""}`}>
                      <span className={`flex h-[2.2em] w-[2.2em] shrink-0 items-center justify-center rounded-[0.5em] text-[0.75em] font-bold text-white ${who === "me" ? "bg-[var(--c)]" : "bg-[var(--ink)]"}`}>
                        {who === "me" ? "Me" : "CTO"}
                      </span>
                      <p className={`max-w-[78%] rounded-[0.4em] px-[0.75em] py-[0.5em] leading-snug text-[#191919] ${who === "me" ? "bg-[#95ec69]" : "bg-white"}`}>{text}</p>
                    </div>
                  ),
                )}
              </div>
              <figcaption className="border-t border-black/[0.06] bg-[#f7f7f7] px-[1.2em] py-[0.5em] text-[0.75em] text-[#8a8a8a]">
                WeChat with the CTO, Mar 2026 · translated
              </figcaption>
            </figure>
          </div>
        </div>
      </Slide>
      {/* Discovery opener: tangled threads of ambiguity, each analysed, converging into one clear direction */}
      <Slide theme="cm" className="flex flex-col">
        <p className="s-eyebrow">Discovery</p>
        <h2 className="s-title mt-[0.8cqw]">Start from ambiguity</h2>
        <p className="s-sub">Fast MVP, no PRD · no marketing background</p>
        <AmbiguityConverge />
      </Slide>
      {/* Build alignment: the CEO's vision notes and the pitch deck feed one shared definition */}
      <Slide theme="cm" className="flex flex-col">
        <p className="s-eyebrow">Discovery</p>
        <h2 className="s-title mt-[0.8cqw]">Build alignment</h2>
      <div className="mt-[2.4cqw] grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_5cqw_minmax(0,0.8fr)] items-center">
        <div className="flex min-h-0 flex-col gap-[1.4cqw]">
          {[
            ["s41a", "CEO's vision notes", "AI-CMO positioning notes"],
            ["s41b", "Pitch deck", "Market pain slide from the pitch deck"],
          ].map(([src, label, alt]) => (
            <figure key={src} className="flex items-center gap-[1.4cqw] rounded-[1.4cqw] bg-[var(--cm-tint)] p-[1.2cqw]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/deck/${src}.jpg`} alt={alt} className="h-[11cqw] w-auto rounded-[0.6cqw] bg-white shadow-[0_0_0_1px_rgb(40_30_20/0.08)]" />
              <figcaption className="text-[1.3cqw] font-bold text-[var(--ink)]">{label}</figcaption>
            </figure>
          ))}
        </div>
        <svg viewBox="0 0 50 100" className="h-[60%] w-full" fill="none" stroke="var(--c)" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" preserveAspectRatio="none">
          <path d="M0 25 C 30 25, 25 50, 48 50" vectorEffect="non-scaling-stroke" />
          <path d="M0 75 C 30 75, 25 50, 48 50" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="rounded-[1.6cqw] bg-[var(--c)] p-[2.6cqw] text-white">
          <p className="text-[1.1cqw] font-bold uppercase tracking-[0.12em] text-white/75">Shared definition</p>
          <p className="mt-[1cqw] text-[2.6cqw] font-bold leading-tight">An AI CMO that does the work, end to end</p>
          <p className="mt-[1.2cqw] text-[1.35cqw] leading-snug text-white/85">Not more tools: one agent that plans, creates, runs and measures campaigns.</p>
        </div>
      </div>
      </Slide>
      {/* Find the root problem: the three clients' asks overlap in one need */}
      <Slide theme="cm" className="flex flex-col">
        <p className="s-eyebrow">Discovery</p>
        <h2 className="s-title mt-[0.8cqw]">Find the root problem</h2>
        <RootOverlap />
      </Slide>
      {/* Study the market: current solution → its problem (same row language as "Dig into the concern") */}
      <Slide theme="cm" className="flex flex-col !pt-[4cqw]">
        <h2 className="s-title">Study the market</h2>
        <p className="s-sub">
          <Dots items={["Competitive analysis", "opportunity: affordable, end-to-end"]} />
        </p>
        <div className="my-auto grid grid-cols-[minmax(0,0.85fr)_4cqw_minmax(0,1.3fr)] items-center gap-x-[1.6cqw] gap-y-[1.3cqw] pb-[1cqw]">
          <p className="s-eyebrow">Current solution</p>
          <span />
          <p className="s-eyebrow">Problem</p>
          {[
            ["Expensive agencies", "Slow, costly, don’t understand performance"],
            ["AI content tools", "Fast but random, no memory"],
            ["In-house team", "Can’t do both brand + performance well"],
            ["Founder doing it all", "No time, no system, inconsistent"],
          ].map(([who, problem]) => (
            <div key={who} className="contents">
              <p className="rounded-[1.2cqw] bg-[color-mix(in_oklab,var(--c)_6%,var(--white-100))] px-[2cqw] py-[1.4cqw] text-[1.9cqw] font-bold text-black">{who}</p>
              <svg viewBox="0 0 40 12" className="w-full" fill="none" stroke="var(--c)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 6h34M31 1.5 36 6l-5 4.5" />
              </svg>
              <p className="font-serif text-[2.1cqw] leading-snug text-[var(--gray-700)]">{problem}</p>
            </div>
          ))}
        </div>
      </Slide>
      <Cards
        theme="cm"
        title="Turn ambiguity into 3 pillars"
        items={[
          ["01", "Focused scope", FocusIcon],
          ["02", "Fast time-to-value", SpeedIcon],
          ["03", "Trustworthy AI output", TrustIcon],
        ]}
      />
      <Pick
        theme="cm"
        title="Going deep: onboarding"
        a="Feature 1  Onboarding experience"
        b="Feature 2  Campaign generation workflow"
        va={CM_F1}
        vb={CM_F2}
      />
      <Visual theme="cm" title="Research similar tools" sub={["Goal: fewest questions → first AI result"]}>
        <Img src="s47" alt="Onboarding from an AI business builder, HubSpot Website Grader and Looka" />
      </Visual>
      {/* Map the flow: rebuilt in the deck palette — the stretch before first value is the part to keep short */}
      <Slide theme="cm" className="flex flex-col">
        <p className="s-eyebrow">Explore the onboarding shape</p>
        <h2 className="s-title mt-[0.8cqw]">Map the flow</h2>
        <p className="s-sub">Goal: fewest questions → first AI result</p>
        <div className="cm-panel mt-[3cqw] flex flex-1 flex-col justify-center">
          <ol className="flex items-center justify-center gap-[1.2cqw]">
            {[
              ["Sign up", ""],
              ["Assessment", "URL + 8 Qs"],
              ["AI report", "first value"],
              ["Dashboard", ""],
              ["Campaigns", ""],
            ].map(([t, sub], i, all) => (
              <li key={t} className="flex items-center gap-[1.2cqw]">
                <span
                  className={`flex h-[7cqw] w-[11cqw] flex-col items-center justify-center rounded-[1cqw] text-center text-[1.5cqw] font-bold ${
                    i === 2 ? "bg-[var(--c)] text-white" : i < 2 ? "bg-white text-[var(--ink)] shadow-[0_0_0_1px_rgb(40_30_20/0.1)]" : "bg-white/60 text-gray-500 shadow-[0_0_0_1px_rgb(40_30_20/0.06)]"
                  }`}
                >
                  {t}
                  {sub && <span className={`mt-[0.3cqw] text-[1.05cqw] font-medium ${i === 2 ? "text-white/85" : "text-gray-500"}`}>{sub}</span>}
                </span>
                {i < all.length - 1 && (
                  <svg viewBox="0 0 24 12" className="w-[1.8cqw]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--c)" }}>
                    <path d="M1 6h20M16 1.5 21 6l-5 4.5" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-[1.6cqw] grid w-[63.4cqw] grid-cols-[38.4cqw_1fr] gap-[3cqw] text-[1.25cqw]">
            <p className="border-t-[0.2cqw] border-[var(--c)] pt-[0.8cqw] text-center font-bold text-[var(--c)]">The gap to first value — keep it short</p>
            <p className="border-t-[0.2cqw] border-gray-300 pt-[0.8cqw] text-center text-gray-500">Core product</p>
          </div>
        </div>
      </Slide>
      <Visual theme="cm" title="Explore two directions">
        <Img src="s49" alt="Direction 1: inline analysis. Direction 2: deferred report" />
      </Visual>
      <Visual theme="cm" title="Choose inline analysis" sub={["Show the work → trust", "live feedback", "users can edit"]}>
        <Img src="s50" alt="Campaign builder with editable core selling points" />
      </Visual>
      {/* Pushback: the CEO (abstract avatar) and their words in a speech bubble (same as VG "The first pushback") */}
      <Slide theme="cm" className="flex flex-col">
        <p className="s-eyebrow">Design review</p>
        <h2 className="s-title mt-[0.8cqw]">Hit real pushback</h2>
        <div className="my-auto flex items-end gap-[3cqw] pl-[2cqw]">
          <figure className="flex shrink-0 flex-col items-center">
            <svg viewBox="0 0 120 120" className="h-[12cqw] w-[12cqw]" role="img" aria-label="The CEO">
              <circle cx="60" cy="60" r="60" fill="color-mix(in oklab, var(--c) 8%, white)" />
              <circle cx="60" cy="46" r="20" fill="var(--c)" />
              <path d="M22 112 C 24 84, 42 72, 60 72 C 78 72, 96 84, 98 112 Z" fill="var(--c)" />
            </svg>
            <figcaption className="mt-[1cqw] text-[1.3cqw] font-bold text-black">CEO</figcaption>
          </figure>
          <blockquote className="relative mb-[4cqw] rounded-[2cqw] rounded-bl-[0.4cqw] bg-[color-mix(in_oklab,var(--c)_7%,var(--white-100))] px-[3cqw] py-[2.6cqw] font-serif text-[2.8cqw] italic leading-snug text-black">
            <span aria-hidden="true" className="absolute -left-[1.4cqw] bottom-0 h-[1.6cqw] w-[1.6cqw] bg-[color-mix(in_oklab,var(--c)_7%,var(--white-100))]" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
            “Just give them a result.”
          </blockquote>
        </div>
      </Slide>
      <Statement theme="cm" title="Dig into the concern" />
      <Statement theme="cm" title="Validate with users" />
      <Statement theme="cm" title="Reframe the problem" />
      <Visual theme="cm" title="Iterate to final version">
        <Img src="s55" alt="Step navigation simplified into a guided brand analysis" />
      </Visual>
      <Visual theme="cm" title="Iterate to final version">
        <Img src="s56a" alt="Campaign pressure test report" />
        <Img src="s56b" alt="Key selling points and key competitors cards" />
      </Visual>
      {/* It became the front door: the two reactions, as quote cards */}
      <Slide theme="cm" className="flex flex-col">
        <p className="s-eyebrow">Result</p>
        <h2 className="s-title mt-[0.8cqw]">It became the front door</h2>
        <div className="my-auto grid grid-cols-2 gap-[2.4cqw]">
          {[
            ["CTO", "“Buildable, right signal.”"],
            ["User", "“I’d actually use it.”"],
          ].map(([who, q]) => (
            <figure key={who} className="cm-panel !p-[3cqw]">
              <blockquote className="font-serif text-[3.2cqw] italic leading-tight text-[var(--ink)]">{q}</blockquote>
              <figcaption className="mt-[1.6cqw] text-[1.2cqw] font-bold uppercase tracking-[0.12em] text-[var(--c)]">{who}</figcaption>
            </figure>
          ))}
        </div>
      </Slide>
      {/* Balancing tradeoffs: two forces, one overlap */}
      <Slide theme="cm" className="flex flex-col">
        <h2 className="s-title">Balancing tradeoffs</h2>
        <div className="relative my-auto flex items-center justify-center">
          <div className="flex h-[24cqw] w-[24cqw] items-center justify-center rounded-full bg-[var(--cm-tint)] pr-[7cqw] text-center text-[1.7cqw] font-bold text-[var(--ink)]">Model<br />needs</div>
          <div className="-ml-[9cqw] flex h-[24cqw] w-[24cqw] items-center justify-center rounded-full border-[0.2cqw] border-[var(--c)] pl-[7cqw] text-center text-[1.7cqw] font-bold text-[var(--ink)]">User<br />effort</div>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--c)] px-[1.2cqw] py-[0.5cqw] text-[1.15cqw] font-bold text-white">Smallest thing serving both</span>
        </div>
      </Slide>
      <Visual theme="cm" title="Own the design system" sub={["design.md", "style guide → Claude Code", "hi-fi → component library → reviewed"]}>
        <Img src="s59" alt="Color system schema, CSS variables and component folders" />
      </Visual>
      <Visual theme="cm" title="Hands-on, not hand-off" sub={["Built + deployed frontend myself", "Figma MCP + Claude Code", "real-time feasibility w/ CTO"]}>
        <Img src="s60" alt="Building the onboarding in VS Code while on a call with the CTO" />
      </Visual>

      </div>
      {/* ---------------- Close ---------------- */}
      {["Q & A", "Thank you!"].map((t) => (
        <Slide key={t} theme="intro" className="flex flex-col justify-center">
          <span className="text-[var(--c)]">
            <Logo size={88} />
          </span>
          <h2 className="s-display mt-[1.6cqw] !text-[4.6cqw]">{t}</h2>
        </Slide>
      ))}
    </main>
  );
}
