// Portfolio review deck — June 2026. Unlisted: nothing links here and it is
// excluded from search. One long page, one 16:9 card per slide.
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import { DensityIcon, DecisionIcon, SystemIcon } from "./icons";
import "./deck.css";

export const metadata: Metadata = {
  title: "Portfolio review — Zoey Yan",
  robots: { index: false, follow: false },
};

type Theme = "intro" | "vg" | "cm";

const VG_F1 = "/media/t4wUnIveqy01Kg9APLetPug7AE.mp4";
const VG_F2 = "/media/iGL6q5kOpeqTG45TWIQSa4tc.mp4";
const CM_F1 = "/media/zx73D9l4IsZyHitMvZZHkhTOcs.mp4";
const CM_F2 = "/media/YQ93hSvVIr4OcYes8o7KmqEpY.mp4";

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
      <div className="mt-[3cqw] flex min-h-0 flex-1 items-center justify-center gap-[3cqw]">{children}</div>
    </Slide>
  );
}

function ProjectIntro({
  theme,
  n,
  name,
  meta,
  img,
}: {
  theme: Theme;
  n: string;
  name: string;
  meta: [string, string][];
  img: string;
}) {
  return (
    <Slide theme={theme} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-[4cqw]">
      <div className="flex flex-col">
        <p className="s-title !text-gray-300">{n}</p>
        <h2 className="s-display mt-[0.6cqw]">{name}</h2>
        <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-[3cqw] gap-y-[1.6cqw]">
          {meta.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="s-eyebrow self-center">{k}</dt>
              <dd className="s-body !text-[1.55cqw] !text-black">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex items-end">
        <Img src={img} alt={`${name} product screens`} />
      </div>
    </Slide>
  );
}

function Three({ theme, title, items }: { theme: Theme; title: string; items: [string, string][] }) {
  return (
    <Slide theme={theme} className="flex flex-col">
      <h2 className="s-title">{title}</h2>
      <div className="my-auto grid grid-cols-3 gap-[3cqw]">
        {items.map(([icon, label]) => (
          <div key={label}>
            <div className="text-[2.6cqw] font-bold leading-none" style={{ color: "var(--c)" }}>
              {icon}
            </div>
            <p className="s-h mt-[1cqw]">{label}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function Pick({ theme, title, a, b, va, vb }: { theme: Theme; title: string; a: string; b: string; va: string; vb: string }) {
  return (
    <Slide theme={theme} className="flex flex-col">
      <h2 className="s-title">{title}</h2>
      <div className="my-auto grid grid-cols-2 gap-[3cqw]">
        <div className="s-pick">
          <p className="s-body !text-black">{a}</p>
          <div className="mt-[1.4cqw]">
            <Video src={va} />
          </div>
        </div>
        <div className="p-[2cqw] opacity-60">
          <p className="s-body">{b}</p>
          <div className="mt-[1.4cqw]">
            <Video src={vb} />
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default function Deck() {
  return (
    <main className="deck">
      {/* ---------------- Intro ---------------- */}
      <Slide theme="intro" className="grid grid-cols-[1fr_auto] items-center">
        <div className="flex h-full flex-col">
          <p className="s-body !text-black">June 2026</p>
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

      {/* ---------------- 01 · ValueGlance ---------------- */}
      {/* Product intro (Centered): name + one-line problem, then the desktop
          and phone screens at the same height on a tinted band */}
      <Slide theme="vg" className="flex flex-col items-center !p-0 text-center">
        <div className="pt-[4.4cqw]">
          <p className="s-eyebrow">
            01<span className="s-dot">·</span>UX Design Intern<span className="s-dot">·</span>Oct 2025 – Jan 2026
          </p>
          <h2 className="s-display mt-[0.8cqw] !text-[4.4cqw]">ValueGlance</h2>
          <p className="s-sub !mt-[0.4cqw]">Dense financial data, readable on a phone.</p>
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
        ["Feature 1", "Mobile watchlist data visualization tooltip redesign", VG_F1],
        ["Feature 2", "Screener filter redesign", ""],
        ["Feature 3", "Design system revamp & migration", VG_F2],
      ].map(([n, t, src]) => (
        <Slide key={n} theme="vg" className="flex flex-col !px-[5cqw] !py-[3cqw]">
          <p className="s-h">
            <span className="mr-[0.8cqw] text-[var(--c)]">{n}</span>
            {t}
          </p>
          <div className="mt-[1.6cqw] flex min-h-0 flex-1 justify-center">
            {src ? (
              <video className="s-video h-full !w-auto" src={src} autoPlay muted loop playsInline preload="metadata" />
            ) : (
              // TODO: screener filter demo video not added yet
              <div className="flex aspect-video h-full items-center justify-center rounded-[1.2cqw] border-[0.15cqw] border-dashed border-[color-mix(in_oklab,var(--c)_30%,transparent)] bg-[color-mix(in_oklab,var(--c)_5%,var(--white-100))]">
                <p className="s-cap">Demo video goes here</p>
              </div>
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
      <Visual theme="vg" title="Avoid the execution trap" sub={["“Clean up the charts”", "Why / for whom / feasible? — unknown"]}>
        <Img src="s12" alt="Original mobile chart: tooltip covering the chart, 8px text too small" />
      </Visual>
      {/* Pages 12–14: the three discovery questions, one image each (Side caption layout) */}
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
                  className="h-full w-auto rounded-[2cqw] border-[0.5cqw] border-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2cqw_4cqw_-2cqw_rgba(20,30,60,0.35)]"
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
                Mobile watchlist data visualization tooltip redesign
              </p>
              <span className="shrink-0 rounded-full bg-[var(--c)] px-[1cqw] py-[0.35cqw] text-[0.95cqw] font-bold text-white">
                Deep dive
              </span>
            </div>
            <div className="mt-[1.4cqw] flex min-h-0 flex-1 items-center justify-center">
              {/* gray studio bg recolored to this card's tint, so the phones sit directly on it */}
              <video className="block max-h-full w-auto max-w-full" src="/media/valueglance/feature1-tooltip.mp4" autoPlay muted loop playsInline preload="metadata" />
            </div>
          </div>
          <div className="grid min-h-0 grid-rows-2 gap-[2cqw] opacity-60">
            {[
              ["Feature 2", "Screener filter redesign", <Img key="s" src="vg-ship-1" alt="Stock screener on valueglance.com" className="max-h-full" />],
              [
                "Feature 3",
                "Design system revamp & migration",
                <video key="v" className="s-video max-h-full !w-auto max-w-full" src={VG_F2} autoPlay muted loop playsInline preload="metadata" />,
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
            src="/deck/offchart-proto.jpg"
            alt="Off-chart tooltip prototype: the chart above, every metric for the scrubbed date listed below it"
            className="max-h-full w-auto rounded-[1cqw] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2cqw_4cqw_-2cqw_rgba(20,30,60,0.35)]"
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
      <Statement theme="vg" title="Dig into the concern" />
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
      {/* The final solution: V1 (Edit → metric sheet) and V2 (concept: pick metrics on the chart) stacked small on the left,
          the final three screens large on the right. */}
      <Slide theme="vg" className="flex flex-col !pb-[3.4cqw] !pt-[4.2cqw]">
        <h2 className="s-title">The Final Solution</h2>
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
      </Slide>
      <Visual theme="vg" title="Rebuild the components" sub={["Tags", "Tooltip/readout", "Scrolling bar", "Sizes + states + tokens"]}>
        <Img src="s32" alt="Component library: tags, tooltips, readouts and chart sizes" />
      </Visual>
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

      {/* ---------------- 02 · Canmarket.ai ---------------- */}
      <ProjectIntro
        theme="cm"
        n="02"
        name="Canmarket.ai"
        img="s34"
        meta={[
          ["Role", "Founding Product Designer & CPO"],
          ["Timeline", "June 2025 – Feb 2026 (7 months)"],
          ["Type", "B2B Web app"],
          ["Tools", "Figma (MCP), Claude Code"],
        ]}
      />
      <Three
        theme="cm"
        title="Context"
        items={[
          ["🏢", "B2B web app"],
          ["🕴️", "Resource-limited small businesses"],
          ["💹", "End-to-end campaign automation"],
        ]}
      />
      <Visual theme="cm" title="Feature #1: Onboarding Experience">
        <div className="w-[70cqw]">
          <Video src={CM_F1} />
        </div>
      </Visual>
      <Visual theme="cm" title="Feature #2: Campaign Generation Workflow">
        <div className="w-[70cqw]">
          <Video src={CM_F2} />
        </div>
      </Visual>
      <Slide theme="cm" className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-[4cqw]">
        <div>
          <h2 className="s-title">Founding Designer & CPO</h2>
          <ul className="s-sub mt-[2.4cqw] flex list-disc flex-col gap-[0.5cqw] pl-[1.6cqw] marker:text-[var(--c)]">
            <li>0→1, research → frontend</li>
            <li>stakeholder interviews</li>
            <li>competitive analysis</li>
            <li>information architecture</li>
            <li>user flows</li>
            <li>hi-fi</li>
            <li>eng QA</li>
            <li>w/ CTO & CEO</li>
          </ul>
        </div>
        <div className="flex items-end">
          <Img src="s38" alt="Zoey with the Canmarket CTO and CEO" />
        </div>
      </Slide>
      <Visual theme="cm" title="Launched & validated" sub={["Jan 2026 launch", "$200K seed", "20+ paying users (US/China/SG)"]}>
        <figure className="flex min-w-0 flex-1 flex-col items-center">
          <Img src="s39a" alt="Shoppable videos generated for oricultural.com" />
          <figcaption className="s-cap mt-[0.8cqw]">oricultural.com</figcaption>
        </figure>
        <Img src="s39b" alt="Message from the CEO confirming funding and paying users" className="h-full" />
      </Visual>
      <Statement theme="cm" title="Start from ambiguity" sub={["Fast MVP, no PRD", "no marketing background"]} />
      <Slide theme="cm" className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-[4cqw]">
        <div>
          <h2 className="s-title">Build alignment</h2>
          <p className="s-sub">
            <Dots items={["1-on-1s: CEO + CTO", "reviewed notes + decks"]} />
          </p>
        </div>
        <div className="flex h-full min-h-0 flex-col justify-between gap-[2cqw]">
          <Img src="s41a" alt="AI-CMO positioning notes" className="min-h-0" />
          <Img src="s41b" alt="Market pain slide from the pitch deck" className="min-h-0" />
        </div>
      </Slide>
      <Visual theme="cm" title="Find the root problem" sub={["Clients wanted different features", "interviewed SMB owners"]}>
        <Img src="s42" alt="Three client requests converging on one core feature" />
      </Visual>
      <Visual theme="cm" title="Study the market" sub={["Competitive analysis", "opportunity: affordable, end-to-end"]}>
        <Img src="s43" alt="Current solutions and their problems" />
      </Visual>
      <Three
        theme="cm"
        title="Turn ambiguity into 3 pillars"
        items={[
          ["1", "Focused Scope"],
          ["2", "Fast Time-to-Value"],
          ["3", "Trustworthy AI Output"],
        ]}
      />
      <Pick
        theme="cm"
        title="Going deep: onboarding"
        a="Feature #1: Onboarding Experience"
        b="Feature #2: Campaign Generation Workflow"
        va={CM_F1}
        vb={CM_F2}
      />
      <Statement theme="cm" title="Explore the onboarding shape" sub={["Goal: fewest questions → first AI result"]} />
      <Visual theme="cm" title="Research similar tools" sub={["Goal: fewest questions → first AI result"]}>
        <Img src="s47" alt="Onboarding from an AI business builder, HubSpot Website Grader and Looka" />
      </Visual>
      <Visual theme="cm" title="Map the flow" sub={["Goal: fewest questions → first AI result"]}>
        <Img src="s48" alt="Sign up, assessment, AI report (first value), dashboard, campaigns" />
      </Visual>
      <Visual theme="cm" title="Explore two directions">
        <Img src="s49" alt="Direction 1: inline analysis. Direction 2: deferred report" />
      </Visual>
      <Visual theme="cm" title="Choose inline analysis" sub={["Show the work → trust", "live feedback", "users can edit"]}>
        <Img src="s50" alt="Campaign builder with editable core selling points" />
      </Visual>
      <Statement theme="cm" title="Hit real pushback" sub={["CEO: “just give them a result”"]} />
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
      <Statement theme="cm" title="It became the front door" sub={["CTO: “buildable, right signal”", "user: “I’d actually use it”"]} />
      <Statement theme="cm" title="Balancing tradeoffs" sub={["Model needs vs. user effort", "find the smallest thing serving both"]} />
      <Visual theme="cm" title="Own the design system" sub={["design.md", "style guide → Claude Code", "hi-fi → component library → reviewed"]}>
        <Img src="s59" alt="Color system schema, CSS variables and component folders" />
      </Visual>
      <Visual theme="cm" title="Hands-on, not hand-off" sub={["Built + deployed frontend myself", "Figma MCP + Claude Code", "real-time feasibility w/ CTO"]}>
        <Img src="s60" alt="Building the onboarding in VS Code while on a call with the CTO" />
      </Visual>

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
