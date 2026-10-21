"use client";
// Design process — a vertical FigJam-style board: dotted canvas, labelled sections, sticky notes,
// and screenshots of the current Insights page pasted in with numbered markers.
import { useState } from "react";
import { Rationale } from "./rationale";
import { DesignSystem } from "./ds";
import CaseStudyContents, { type ContentsSection } from "@/components/CaseStudyContents";

const INK = "oklch(0.24 0.015 285)";
const MUTED = "oklch(0.45 0.015 285)";
const RED = "oklch(0.54 0.18 5)"; // accentStrong — markers and stamps
// Four note colors, one meaning each:
// yellow = the content · pink = a problem or pain point · green = what it means for the design ·
// blue = method, open questions and metrics. Older tone names map onto these.
const YELLOW = "oklch(0.95 0.09 95)";
const PINK = "oklch(0.92 0.06 5)";
const GREEN = "oklch(0.93 0.07 155)";
const BLUE = "oklch(0.92 0.05 240)";
const STICKY = {
  yellow: YELLOW,
  pink: PINK,
  green: GREEN,
  blue: BLUE,
  orange: PINK,
  violet: BLUE,
} as const;
type Tone = keyof typeof STICKY;

function Sticky({ tone, title, children, className = "" }: { tone: Tone; title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`pc-sticky relative flex flex-col rounded-[3px] p-5 ${className}`}
      style={{ backgroundColor: STICKY[tone] }}
    >
      {title && <p className="text-[15px] font-semibold leading-snug" style={{ color: INK }}>{title}</p>}
      <div className={`text-[14px] leading-[1.5] [text-wrap:pretty] ${title ? "mt-1.5" : ""}`} style={{ color: "oklch(0.3 0.015 285)" }}>{children}</div>
    </div>
  );
}

function Section({ label, tone, children, id }: { label: string; tone: Tone; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="relative scroll-mt-24 rounded-[20px] bg-white/70 p-5 pt-9 sm:p-8 sm:pt-11" style={{ boxShadow: "inset 0 0 0 1px oklch(0.2 0.015 285 / 0.1)" }}>
      <span className="absolute -top-3.5 left-5 rounded-lg px-3 py-1.5 text-[13px] font-semibold sm:left-8" style={{ backgroundColor: STICKY[tone], color: INK, boxShadow: "0 0 0 1px oklch(0.2 0.015 285 / 0.08)" }}>
        {label}
      </span>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em]" style={{ color: MUTED }}>{children}</h3>;
}

// a screenshot pasted onto the canvas
function Shot({ src, alt, w, h, children }: { src: string; alt: string; w: number; h: number; children?: React.ReactNode }) {
  return (
    <figure className="relative overflow-hidden rounded-lg bg-white" style={{ boxShadow: "0 0 0 1px oklch(0.2 0.015 285 / 0.1), 0 10px 24px -14px oklch(0.2 0.015 285 / 0.35)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="block h-auto w-full" />
      {children}
    </figure>
  );
}

// list number on a sticky: just the figure, quiet
function Stamp({ n }: { n: number }) {
  return <span className="shrink-0 text-[14px] font-semibold tabular-nums" style={{ color: "oklch(0.24 0.015 285 / 0.45)" }}>{String(n).padStart(2, "0")}</span>;
}
// marker that ties a finding to its spot on the screenshot
function Marker({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex h-5 shrink-0 items-center rounded-[5px] px-1.5 text-[11px] font-semibold tabular-nums text-white ${className}`} style={{ backgroundColor: RED }}>
      {String(n).padStart(2, "0")}
    </span>
  );
}

const FINDINGS = [
  {
    title: "Limited hierarchy across summary metrics",
    body: "Event status, participant count, and event date are displayed in three nearly identical cards. Their uniform size, typography, and visual treatment make it difficult to distinguish key metrics from supporting information.",
    opp: "Strengthen typography, numerical emphasis, and card hierarchy to improve scannability.",
    img: { src: "/deck/mm-audit-1.jpg", w: 1900, h: 170, alt: "Current summary cards: Status Draft, Participants 0, Date November 6, 2026, in three identical grey cards" },
    // region on the full screenshot, in %
    box: { left: 19.5, top: 60.5, width: 79, height: 12.5 },
  },
  {
    title: "The checklist is one long list with no hierarchy",
    body: "All 23 tasks sit in a single flat list. Required setup and optional recommendations look the same, nothing says which task to do next, and progress is a small “6 of 23 tasks complete” at the far right of the heading. Organizers have to read every row to find what matters now.",
    opp: "Group tasks by when they matter, separate required from optional, and make the next required step the one thing that stands out.",
    img: { src: "/deck/mm-audit-2.jpg", w: 1900, h: 420, alt: "Current Event Checklist: a flat list under Required and Recommended labels, with “6 of 23 tasks complete” in small grey text at the far right" },
    box: { left: 19.5, top: 72.5, width: 79, height: 27 },
  },
  {
    title: "Dense navigation and inconsistent visual emphasis",
    body: "Global navigation, sidebar navigation, event tabs, secondary tabs, and icon-only controls compete for attention. Active states rely on different visual treatments, making the page feel less cohesive.",
    opp: "Improve spacing, alignment, and consistency of active states while maintaining the existing navigation structure.",
    img: { src: "/deck/mm-audit-3.jpg", w: 2400, h: 480, alt: "Current page top: global nav, sidebar with a red filled active item, event tabs with an underline, and outlined secondary tabs" },
    box: { left: 19.5, top: 24.5, width: 79, height: 12 },
  },
];

const RDHQ = "https://www.racedirectorshq.com/reviews/movemint-2085/";
const COMPETITORS = [
  {
    name: "Luma",
    dot: "oklch(0.55 0.2 350)",
    body: "Luma uses a clean, restrained interface with clearly separated event details and prominent management actions. Its approach to spacing, card groupings, and typography makes event information easy to scan without overwhelming the user.",
    take: "Use whitespace and visual grouping to create clarity.",
    sources: [["Luma Help Center", "https://help.luma.com/p/event-insights"]],
    layout: "",
    shots: [
      { src: "/deck/mm-comp-luma-0.jpg", w: 1400, h: 1299, alt: "Luma's manage-event Overview: three action cards, then the event preview card beside When & Where, with a Location Missing warning", cls: "pc-pin" },
    ],
  },
  {
    name: "Eventbrite",
    dot: "oklch(0.64 0.2 40)",
    body: "Eventbrite organizes performance metrics, event details, and setup tasks into distinct dashboard sections. Its use of prominent numerical values and differentiated content areas provides a useful reference for combining operational progress with high-level event information.",
    take: "Establish a clear visual distinction between summary metrics and actionable tasks.",
    sources: [
      ["Eventbrite official product page", "https://www.eventbrite.com/features/analytics/"],
      ["organizer dashboard (own test event)", "https://www.eventbrite.com/organizations/home"],
    ],
    layout: "",
    shots: [
      { src: "/deck/mm-comp-eb-0.jpg", w: 1400, h: 739, alt: "Eventbrite's event dashboard: a compact event card (name, date, Draft status, Preview) pinned in the left column above a Steps list — Build event page, Add tickets, Publish", cls: "pc-pin" },
    ],
  },
];
const INSIGHTS = [
  {
    title: "Simplicity is essential for organizers of different experience levels.",
    body: "AAPI 5K describes Movemint as intuitive for both first-time and experienced race directors, highlighting how quickly organizers can set up registration pages.",
    imp: "Preserve simplicity and familiarity while refining the visual presentation.",
    who: "AAPI 5K",
    when: "Feb 2025",
  },
  {
    title: "Efficient management is valuable for multi-event organizers.",
    body: "Chris Mcqueen, who manages more than seven races per year, highlights the time saved by using a single platform to manage multiple events.",
    imp: "Make key event information easier to scan and interpret through consistent visual patterns.",
    who: "Chris Mcqueen",
    when: "Feb 2025",
  },
  {
    title: "Ease of use and reliability contribute to organizer confidence.",
    body: "Marin Mile praises Movemint’s organizer usability and the smooth registration experience reported by its participants.",
    imp: "Make visual refinements predictable and consistent without disrupting established workflows.",
    who: "Marin Mile",
    when: "Jul 2025",
  },
];

const QA: [string, string, [string, string][]][] = [
  ["User priorities", "Which information do organizers look for first when reviewing an event?", [
    ["Clarity over complexity", "Organizers prefer a dashboard where event status, registration information, and next steps are immediately visible without unnecessary visual clutter."],
  ]],
  ["Usability challenges", "Which aspects of the current visual presentation create friction during actual organizer workflows?", [
    ["Actionable guidance", "Organizers benefit from knowing what needs attention first, particularly which setup tasks are required versus optional."],
    ["Contextual progress", "Organizers may find it easier to understand event preparation when tasks are visually grouped around the event lifecycle, from initial setup to race day and post-event wrap-up."],
  ]],
  ["Visual constraints", "Which existing design tokens, components, and accessibility standards should guide the redesign?", [
    ["Build on Movemint’s own system", "Reuse Movemint’s existing components, statuses, completed-task style and brand red, with WCAG AA contrast as the floor."],
  ]],
];
const METRICS = [
  { title: "Time to identify next action", body: "Reduce the time it takes organizers to locate their next required setup task.", dir: "down" },
  { title: "Task prioritization accuracy", body: "Increase the percentage of organizers who can correctly distinguish required tasks from optional recommendations.", dir: "up" },
  { title: "Perceived visual clarity", body: "Improve user ratings of information hierarchy, readability, and ease of scanning compared with the original interface.", dir: "up" },
];
const PRINCIPLES = [
  {
    title: "Prioritize action over information",
    body: "Make the next required action immediately recognizable, while keeping secondary metrics and optional tasks accessible but visually less prominent.",
    app: "Highlight incomplete required setup tasks with a clear CTA and differentiate required and optional checklist sections.",
    img: { src: "/deck/mm-r-07.jpg", w: 1640, h: 3186, alt: "Redesign: the next required step highlighted with a Set up button, under a Required 4 of 5 tag", frame: "aspect-[4/3]" },
  },
  {
    title: "Make progress visible and meaningful",
    body: "Use visual hierarchy and structured grouping to help organizers understand where they are in the event preparation process and what comes next.",
    app: "Organize existing checklist tasks into a timeline-inspired event lifecycle, with clear progress and completion states.",
    img: { src: "/deck/mm-r-08.jpg", w: 1304, h: 502, alt: "Redesign: the lifecycle rail, from setup to Publish to Fill the start list, with Required and Optional tags", frame: "" },
  },
  {
    title: "Balance brand expression with usability",
    body: "Create a distinctive, engaging interface without compromising readability, consistency, or operational efficiency.",
    app: "A single expressive event card — the event name in Movemint’s serif on the logo gradient — paired with restrained, consistent UI components everywhere else on the dashboard.",
    img: { src: "/deck/mm-r-05.jpg", w: 664, h: 814, alt: "Redesign: the poster-style event card in Movemint’s logo gradient", frame: "mx-auto w-full max-w-[300px]" },
  },
];

// a screenshot in a fixed-height window you can scroll through, pinned to the board
function Peek({ src, alt, h, tall = false }: { src: string; alt: string; h: number; tall?: boolean }) {
  return (
    <div
      tabIndex={0}
      aria-label={`${alt} (scrollable)`}
      className={`pc-pin overflow-y-auto overscroll-contain rounded-lg bg-white ${tall ? "max-h-[520px]" : "max-h-[400px]"}`}
      style={{ boxShadow: "0 0 0 1px oklch(0.2 0.015 285 / 0.1), 0 10px 24px -14px oklch(0.2 0.015 285 / 0.35)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={1200} height={h} className="block h-auto w-full" />
    </div>
  );
}
const ROUND1: [string, string, string, number][] = [
  ["V1 · Refined", "Same structure, cleaner hierarchy", "/deck/mm-iter1-v1.jpg", 1583],
  ["V2 · Progress-first", "Next step up front", "/deck/mm-iter1-v2.jpg", 1250],
  ["V3 · Split view", "Stepper + event snapshot", "/deck/mm-iter1-v3.jpg", 1292],
  ["V4 · Compact table", "Dense, scannable", "/deck/mm-iter1-v4.jpg", 1250],
];
const ROUND3: [string, string, string, number, number, boolean][] = [
  ["Combined", "Poster column + timeline (round 2)", "/deck/mm-iter3-combined.jpg", 1250, 5, false],
  ["Banner", "Poster as a short band, full-width timeline", "/deck/mm-iter3-banner.jpg", 1250, 1, true],
  ["Stages", "One stage of tasks at a time", "/deck/mm-iter3-stages.jpg", 1250, 9, false],
  ["Board", "The lifecycle as columns", "/deck/mm-iter3-board.jpg", 1250, 10, false],
];
const ROUND2 = [
  { name: "Start Line", lead: "Progress as a journey", body: "Used a race-inspired progress visualization to connect event preparation with Movemint’s athletic identity.", src: "/deck/mm-iter2-startline.jpg", h: 1110, v: 6, final: false },
  { name: "Poster", lead: "Event identity & action", body: "Introduced an editorial, poster-inspired layout to strengthen event context and emphasize the next required action.", src: "/deck/mm-iter2-poster.jpg", h: 1250, v: 7, final: false },
  { name: "Timeline", lead: "Structured preparation", body: "Reorganized existing checklist tasks around the event lifecycle to improve hierarchy and scannability.", src: "/deck/mm-iter2-timeline.jpg", h: 1250, v: 8, final: false },
  { name: "Combined", lead: "Expression meets clarity", body: "Integrated the poster’s visual identity with the timeline’s structured task organization, supported by a concise operational overview.", src: "/deck/mm-iter2-combined.jpg", h: 1250, v: 5, final: true },
];

const CONTENTS: ContentsSection[] = [
  { id: "brief", label: "Brief", level: 1 },
  { id: "problem", label: "01 Problem definition", level: 1 },
  { id: "discovery", label: "02 Discovery", level: 1 },
  { id: "audit", label: "UX audit", level: 2 },
  { id: "competitors", label: "Competitor scan", level: 2 },
  { id: "users", label: "User understanding", level: 2 },
  { id: "framing", label: "03 Framing", level: 1 },
  { id: "assumptions", label: "Assumptions", level: 2 },
  { id: "principles", label: "Design principles", level: 2 },
  { id: "final", label: "04 Final design", level: 1 },
  { id: "iterations", label: "05 Design iterations", level: 1 },
  { id: "round1", label: "Round 1 — First versions", level: 2 },
  { id: "round2", label: "Round 2 — Four directions", level: 2 },
  { id: "decision", label: "Round 2 decision", level: 2 },
  { id: "round3", label: "Round 3 — Layout", level: 2 },
  { id: "system", label: "06 Design system", level: 1 },
  { id: "rationale", label: "07 Design rationale", level: 1 },
  { id: "next", label: "08 Takeaways & next steps", level: 1 },
];

// switch the picker to another tab, keeping ?key= and the rest of the query
function go(v: number) {
  const u = new URL(location.href);
  u.searchParams.set("v", String(v));
  u.hash = "";
  location.href = u.toString();
}
const TAKEAWAYS: [string, string][] = [
  ["Hierarchy came from subtraction", "The biggest gains came from removing repetition — “Draft” appeared three times — which freed the space for the next step to lead."],
  ["The constraint sharpened the work", "With no new features allowed, every improvement had to come from hierarchy, grouping and type — the same components, used more deliberately."],
];
const NEXT: [string, string][] = [
  ["Validate with organizers", "Run a short usability test against the original, using the three success metrics: time to find the next required task, required-vs-optional accuracy, and perceived clarity."],
  ["Pressure-test the whole lifecycle", "Check the layout after publishing, on race day and after the event — the Scenarios tab is a starting point for those reviews."],
  ["Fold it into Movemint’s design system", "Map the raspberry accent and type roles onto existing components with engineering, then apply the same patterns to other organizer pages."],
  ["Measure after launch", "Track time from event creation to publish and checklist completion rates to see whether the clearer hierarchy changes behavior."],
];

export function Process() {
  const [hot, setHot] = useState<number | null>(null);
  return (
    <div className="pc-board mm-proto min-h-dvh px-4 pb-24 pt-6 sm:px-8" style={{ color: INK, fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
      <div className="mx-auto grid max-w-[1360px] gap-14">
        {/* ── title + brief ── */}
        <header id="brief" className="scroll-mt-24">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: MUTED }}>Visual Design Challenge · Organizer Dashboard · October 2026</p>
          <h1 className="mt-1 font-serif text-[38px] leading-none [text-wrap:balance]">Movemint — Event Insights Redesign</h1>
          <div className="mt-8 grid max-w-[760px] gap-5 sm:grid-cols-2">
            <Sticky tone="yellow" title="Project goal" className="lg:col-span-1">
              Improve the visual clarity, hierarchy, and consistency of Movemint’s Event Insights page while preserving its existing functionality.
            </Sticky>
            <Sticky tone="green" title="Focus area">Event overview and event preparation checklist.</Sticky>
          </div>
        </header>

        {/* ── 01 ── */}
        <Section label="01  Problem definition" tone="yellow" id="problem">
          <div>
            <div>
              <Label>What’s the challenge?</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <Sticky tone="pink" title="Information complexity">The organizer dashboard combines event details, registration information, and preparation tasks, requiring clear visual organization.</Sticky>
                <Sticky tone="pink" title="At-a-glance clarity">Organizers should be able to quickly identify their event’s status, participation, and preparation progress.</Sticky>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 02 ── */}
        <Section label="02  Discovery" tone="green" id="discovery">
          <div className="scroll-mt-24" id="audit">
            <h2 className="text-[20px] font-semibold tracking-[-0.01em]">Step 1 — UX audit</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Sticky tone="blue" title="Objective">Identify visual design opportunities through a heuristic evaluation of Movemint’s existing Event Insights interface.</Sticky>
              <Sticky tone="blue" title="Method">Reviewed the provided organizer dashboard screen, focusing on information hierarchy, readability, consistency, and visual density.</Sticky>
            </div>

            {/* the whole current screen, with the three findings marked */}
            <div className="mt-10">
              <Label>Current Event Insights screen</Label>
              <Shot src="/deck/mm-insights-current.jpg" alt="The current Movemint Event Insights page" w={2400} h={1289}>
                {FINDINGS.map((f, i) => (
                  <a
                    key={f.title}
                    href={`#finding-${i + 1}`}
                    aria-label={`Finding ${i + 1}: ${f.title}`}
                    onMouseEnter={() => setHot(i)}
                    onMouseLeave={() => setHot(null)}
                    onFocus={() => setHot(i)}
                    onBlur={() => setHot(null)}
                    className="absolute rounded-md transition-[background-color,box-shadow] duration-150"
                    style={{
                      left: `${f.box.left}%`, top: `${f.box.top}%`, width: `${f.box.width}%`, height: `${f.box.height}%`,
                      boxShadow: `0 0 0 2px ${RED}`,
                      backgroundColor: hot === i ? "oklch(0.54 0.18 5 / 0.12)" : "transparent",
                    }}
                  >
                    <Marker n={i + 1} className="absolute -left-3 -top-3" />
                  </a>
                ))}
              </Shot>
            </div>

            <div className="mt-12">
              <Label>Key findings</Label>
              <ol className="grid gap-16">
                {FINDINGS.map((f, i) => (
                  <li key={f.title} id={`finding-${i + 1}`} className="scroll-mt-24" onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)}>
                    <p className="mb-3 flex items-center gap-3 text-[15px] font-semibold">
                      <Marker n={i + 1} /> {f.title}
                    </p>
                    <Shot src={f.img.src} alt={f.img.alt} w={f.img.w} h={f.img.h} />
                    {/* stickies pinned under the screenshot */}
                    <div className="relative mt-5 grid gap-4 px-2 sm:px-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-start">
                      <Sticky tone="orange">{f.body}</Sticky>
                      <Sticky tone="green" className="md:mt-8">
                        <b className="font-semibold" style={{ color: INK }}>Design opportunity: </b>
                        {f.opp}
                      </Sticky>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-14">
              <Sticky tone="yellow" className="mx-auto max-w-[760px]">
                <span className="text-[17px] leading-[1.5]">
                  <b className="font-semibold" style={{ color: INK }}>Audit takeaway: </b>
                  The screen contains the information organizers need, but its visual presentation could more clearly communicate what matters most: event status, participation, and preparation progress.
                </span>
              </Sticky>
            </div>
          </div>

          {/* ── Step 2B ── */}
          <div className="mt-14 scroll-mt-24 border-t pt-10" style={{ borderColor: "oklch(0.2 0.015 285 / 0.1)" }} id="competitors">
            <h2 className="text-[20px] font-semibold tracking-[-0.01em]">Step 2 — Competitor scan</h2>
            <div className="mt-6 max-w-[620px]">
              <Sticky tone="blue" title="Objective">Understand how other event management platforms establish information hierarchy and organize event-related information.</Sticky>
            </div>
            <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-10">
              {COMPETITORS.map((c) => (
                <article key={c.name} className="grid content-start gap-5">
                  <h3 className="flex items-center gap-2.5 text-[18px] font-semibold">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: c.dot }} />
                    {c.name}
                  </h3>
                  <div className={`relative ${c.layout}`}>
                    {c.shots.map((sh) => (
                      <div key={sh.src} className={sh.cls}>
                        <Shot src={sh.src} alt={sh.alt} w={sh.w} h={sh.h} />
                      </div>
                    ))}
                  </div>
                  <Sticky tone="yellow">{c.body}</Sticky>
                  <Sticky tone="green" className="sm:ml-8">
                    <b className="font-semibold" style={{ color: INK }}>Takeaway: </b>
                    {c.take}
                  </Sticky>
                  <p className="text-[13px]" style={{ color: MUTED }}>
                    Source:{" "}
                    {c.sources.map(([label, href], k) => (
                      <span key={href}>
                        {k > 0 && " · "}
                        <a href={href} target="_blank" rel="noreferrer" className="underline decoration-[oklch(0.2_0.015_285/0.3)] underline-offset-2 hover:decoration-current">{label}</a>
                      </span>
                    ))}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* ── Step 2C ── */}
          <div className="mt-14 scroll-mt-24 border-t pt-10" style={{ borderColor: "oklch(0.2 0.015 285 / 0.1)" }} id="users">
            <h2 className="text-[20px] font-semibold tracking-[-0.01em]">Step 3 — User understanding</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Sticky tone="blue" title="Objective">Understand what organizers value in an event management platform and identify priorities that should inform the visual redesign.</Sticky>
              <Sticky tone="blue" title="Method">
                Secondary research using four publicly available organizer reviews on{" "}
                <a href={RDHQ} target="_blank" rel="noreferrer" className="underline underline-offset-2">Race Directors HQ</a>.
              </Sticky>
            </div>

            <div className="mt-10">
              <Label>Three key insights</Label>
              <ol className="grid gap-10">
                {INSIGHTS.map((x, i) => (
                  <li key={x.title} className="grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-start">
                    <Sticky tone="yellow">
                      <span className="mb-2 flex items-center gap-2.5 text-[15px] font-semibold leading-snug" style={{ color: INK }}>
                        <Stamp n={i + 1} /> {x.title}
                      </span>
                      {x.body}
                      <span className="mt-3 flex items-center gap-2 text-[12px] font-medium" style={{ color: MUTED }}>
                        <span className="grid size-5 place-items-center rounded-full bg-white/70 text-[10px] font-bold" style={{ color: INK }}>{x.who[0]}</span>
                        {x.who} · {x.when}
                      </span>
                    </Sticky>
                    <Sticky tone="green" className="md:mt-6">
                      <b className="font-semibold" style={{ color: INK }}>Design implication: </b>
                      {x.imp}
                    </Sticky>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mx-auto mt-10 max-w-[760px] rounded-lg bg-white/80 px-4 py-3 text-[13px] leading-relaxed" style={{ color: MUTED, boxShadow: "inset 0 0 0 1px oklch(0.2 0.015 285 / 0.1)" }}>
              Source:{" "}
              <a href={RDHQ} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2" style={{ color: INK }}>Race Directors HQ — Movemint Reviews</a>. These are organizer testimonials, not usability tests of the Insights page. The design implications are hypotheses derived from the reviews.
            </p>
            <div className="mt-8">
              <Sticky tone="yellow" className="mx-auto max-w-[760px]">
                <span className="text-[17px] leading-[1.5]">
                  <b className="font-semibold" style={{ color: INK }}>User understanding takeaway: </b>
                  Organizers value simplicity, efficiency, and reliability. The redesign should improve information clarity while preserving the ease of use that users already appreciate.
                </span>
              </Sticky>
            </div>
          </div>
        </Section>

        {/* ── 03 ── */}
        <Section label="03  Framing" tone="violet" id="framing">
          <h2 id="assumptions" className="scroll-mt-24 text-[20px] font-semibold tracking-[-0.01em]">Step 4 — Assumptions</h2>
          <p className="mt-2 max-w-[68ch] text-[15px]" style={{ color: MUTED }}>Since I couldn’t run user interviews within this time-box, each open question got a working assumption, drawn from the audit, the competitor benchmarks and the reviews.</p>
          <div className="mt-8">
            <div className="mb-3 hidden grid-cols-[minmax(0,5fr)_24px_minmax(0,7fr)] gap-4 md:grid">
              <Label>What we didn’t know</Label><span /><Label>What I assumed</Label>
            </div>
            <ol className="grid gap-5">
              {QA.map(([q, qd, as]) => (
                <li key={q} className="grid gap-3 md:grid-cols-[minmax(0,5fr)_24px_minmax(0,7fr)] md:items-start md:gap-4">
                  <Sticky tone="violet" title={q}>{qd}</Sticky>
                  <span aria-hidden="true" className="hidden pt-5 text-center text-[18px] md:block" style={{ color: MUTED }}>→</span>
                  <div className="grid gap-3">
                    {as.map(([t, d]) => <Sticky key={t} tone="yellow" title={t}>{d}</Sticky>)}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10">
            <Label>Success metrics · hypothetical</Label>
            <div className="grid gap-4 md:grid-cols-3">
              {METRICS.map((m) => (
                <Sticky key={m.title} tone="blue">
                  <span className="mb-2 flex items-start justify-between gap-3">
                    <span className="text-[15px] font-semibold leading-snug" style={{ color: INK }}>{m.title}</span>
                    <span className="shrink-0 rounded-md bg-white/70 px-1.5 py-0.5 text-[12px] font-semibold tabular-nums" style={{ color: INK }} aria-label={m.dir === "down" ? "lower is better" : "higher is better"}>{m.dir === "down" ? "↓" : "↑"}</span>
                  </span>
                  {m.body}
                </Sticky>
              ))}
            </div>
            <p className="mt-4 text-[13px] italic" style={{ color: MUTED }}>These are proposed evaluation metrics, not measured outcomes.</p>
          </div>

          <div className="mt-14 border-t pt-10" style={{ borderColor: "oklch(0.2 0.015 285 / 0.1)" }}>
            <h2 id="principles" className="scroll-mt-24 text-[20px] font-semibold tracking-[-0.01em]">Step 5 — Design principles</h2>
            <p className="mt-2 max-w-[68ch] text-[15px]" style={{ color: MUTED }}>To align with PMs and stakeholders, I usually define a set of high-level design principles to guide decisions and evaluate trade-offs throughout the design process.</p>
            {/* three columns, one per principle: the principle on top, how it shows up in the design underneath */}
            <ol className="mt-8 grid gap-5 md:grid-cols-3">
              {PRINCIPLES.map((x, i) => (
                <li key={x.title} className="flex flex-col overflow-hidden rounded-[6px] shadow-[0_1px_2px_oklch(0.2_0.015_285/0.08),0_8px_18px_-10px_oklch(0.2_0.015_285/0.35)]">
                  <div className="flex-1 p-5" style={{ backgroundColor: "oklch(0.95 0.09 95)" }}>
                    <Stamp n={i + 1} />
                    <p className="mt-2 text-[17px] font-semibold leading-snug [text-wrap:balance]" style={{ color: INK }}>{x.title}</p>
                    <p className="mt-2 text-[14px] leading-[1.5] [text-wrap:pretty]" style={{ color: "oklch(0.3 0.015 285)" }}>{x.body}</p>
                  </div>
                  <div className="p-5" style={{ backgroundColor: "oklch(0.93 0.07 155)" }}>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: "oklch(0.38 0.08 155)" }}>In the design</p>
                    <p className="mt-1.5 text-[14px] leading-[1.5] [text-wrap:pretty]" style={{ color: "oklch(0.3 0.015 285)" }}>{x.app}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ── 04 ── */}
        <Section label="04  Final design" tone="pink" id="final">
          <p className="max-w-[68ch] text-[15px]" style={{ color: MUTED }}>The same page, the same state (draft, ready to publish) and the same data as the audit screenshot — redesigned.</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-6">
            {[
              ["Before", "/deck/mm-insights-current.jpg", "The original Movemint Insights page"],
              ["After", "/deck/mm-after-setup.jpg", "The redesigned Insights page, before publishing"],
            ].map(([k, src, alt]) => (
              <div key={k}>
                <p className="mb-3 inline-flex rounded-md px-2 py-0.5 text-[12px] font-semibold uppercase tracking-[0.08em]" style={k === "After" ? { backgroundColor: RED, color: "white" } : { backgroundColor: "white", color: MUTED, boxShadow: "inset 0 0 0 1px oklch(0.2 0.015 285 / 0.12)" }}>{k}</p>
                <Shot src={src} alt={alt} w={2400} h={1289} />
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-center">
            <div>
              <Label>After publishing</Label>
              <Shot src="/deck/mm-after-live.jpg" alt="The redesigned Insights page once the event is live" w={2400} h={1289} />
            </div>
            <div className="grid gap-3">
              <Sticky tone="yellow">Once the event is live, status reads Live in one place, the completed setup folds into one row, and the Publish line becomes Copy event link.</Sticky>
              <div className="mt-2 grid gap-2 sm:ml-6">
                {([["Try the interactive prototype", 1], ["Walk through the scenarios", 3], ["See the design system", 2]] as const).map(([t, v]) => (
                  <a key={t} href={`?v=${v}`} onClick={(e) => { e.preventDefault(); go(v); }} className="inline-flex min-h-11 items-center justify-between gap-3 rounded-[10px] bg-white px-4 text-[14px] font-semibold transition-transform duration-150 active:scale-[0.98]" style={{ boxShadow: "inset 0 0 0 1px oklch(0.2 0.015 285 / 0.12)" }}>
                    {t} <span aria-hidden="true" style={{ color: MUTED }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── 05 ── */}
        <Section label="05  Design iterations" tone="orange" id="iterations">
          <h2 id="round1" className="scroll-mt-24 text-[20px] font-semibold tracking-[-0.01em]">Round 1 — First versions</h2>
          <p className="mt-2 max-w-[68ch] text-[15px]" style={{ color: MUTED }}>Four layouts that kept the existing structure and tuned hierarchy, density and ordering.</p>
          <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {ROUND1.map(([t, d, src, h]) => (
              <figure key={t} className="grid content-start gap-3">
                <Peek src={src} alt={`${t}: ${d}`} h={h} />
                <figcaption>
                  <p className="text-[14px] font-semibold">{t}</p>
                  <p className="text-[13px]" style={{ color: MUTED }}>{d}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Sticky tone="pink" title="What I saw">Each one was cleaner than the original, but all four read as generic SaaS: nothing in them was specific to Movemint or to athletic events.</Sticky>
            <Sticky tone="green" title="What I did next">Pushed for more creative, brand-led directions, each built around one idea about the organizer’s experience.</Sticky>
          </div>

          <div className="mt-14 border-t pt-10" style={{ borderColor: "oklch(0.2 0.015 285 / 0.1)" }}>
            <h2 id="round2" className="scroll-mt-24 text-[20px] font-semibold tracking-[-0.01em]">Round 2 — Four visual directions</h2>
            <p className="mt-2 max-w-[68ch] text-[15px]" style={{ color: MUTED }}>I explored four visual directions, each emphasizing a different aspect of the organizer experience.</p>
            <ol className="mt-10 grid gap-14">
              {ROUND2.map((x, i) => (
                <li key={x.name} className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-10">
                  <Peek src={x.src} alt={`${x.name}: ${x.lead}`} h={x.h} tall />
                  <div className="grid gap-3">
                    <Sticky tone="yellow">
                      <span className="mb-2 flex flex-wrap items-center gap-2.5 text-[17px] font-semibold leading-snug" style={{ color: INK }}>
                        <Stamp n={i + 1} /> {x.name}
                        {x.final && <span className="rounded-md px-2 py-0.5 text-[12px] font-medium" style={{ backgroundColor: "white", color: INK, boxShadow: "inset 0 0 0 1px oklch(0.2 0.015 285 / 0.15)" }}>Picked for round 3</span>}
                      </span>
                      <b className="font-semibold" style={{ color: INK }}>{x.lead}. </b>
                      {x.body}
                    </Sticky>
                    <a href={`?v=${x.v}`} onClick={(e) => { e.preventDefault(); go(x.v); }} className="inline-flex min-h-11 items-center justify-between gap-3 rounded-[10px] bg-white px-4 text-[14px] font-semibold transition-transform duration-150 active:scale-[0.98] sm:ml-6" style={{ boxShadow: "inset 0 0 0 1px oklch(0.2 0.015 285 / 0.12)" }}>
                      Open {x.name} <span aria-hidden="true" style={{ color: MUTED }}>→</span>
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 border-t pt-10" style={{ borderColor: "oklch(0.2 0.015 285 / 0.1)" }}>
            <h2 id="decision" className="scroll-mt-24 text-[20px] font-semibold tracking-[-0.01em]">Round 2 decision: Combined</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Sticky tone="yellow" title="Why Combined">I selected Combined because it best balances three priorities: communicating event identity, surfacing essential information, and guiding organizers through event preparation.</Sticky>
              <Sticky tone="yellow" title="How it works">The poster creates a stronger connection to the event itself, while the timeline transforms a dense checklist into clearly differentiated preparation stages. Prominent required actions and consistent task components help establish a clearer hierarchy between immediate priorities and optional activities.</Sticky>
              <Sticky tone="green" title="The result">A more expressive yet structured organizer experience, designed to improve visual clarity while preserving existing functionality.</Sticky>
            </div>
          </div>

          <div className="mt-14 border-t pt-10" style={{ borderColor: "oklch(0.2 0.015 285 / 0.1)" }}>
            <h2 id="round3" className="scroll-mt-24 text-[20px] font-semibold tracking-[-0.01em]">Round 3 — Giving the tasks room</h2>
            <p className="mt-2 max-w-[68ch] text-[15px]" style={{ color: MUTED }}>Review feedback on Combined: the poster column took a third of the width, so the tasks — the actual work — wrapped into narrow cards. Organizers can also tick optional tasks off themselves now, as in the original. Same content, four layouts:</p>
            <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {ROUND3.map(([t, d, src, h, v, chosen]) => (
                <figure key={t} className="grid content-start gap-3">
                  <Peek src={src} alt={`${t}: ${d}`} h={h} />
                  <figcaption className="flex items-start justify-between gap-4">
                    <span>
                      <span className="flex items-center gap-2 text-[14px] font-semibold">{t}{chosen && <span className="rounded-md px-2 py-0.5 text-[11px] font-medium" style={{ backgroundColor: "white", color: INK, boxShadow: "inset 0 0 0 1px oklch(0.2 0.015 285 / 0.15)" }}>Picked for polish</span>}</span>
                      <span className="block text-[13px]" style={{ color: MUTED }}>{d}</span>
                    </span>
                    <a href={`?v=${v}`} onClick={(e) => { e.preventDefault(); go(v); }} className="shrink-0 text-[13px] font-semibold underline underline-offset-2">Open</a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Sticky tone="yellow" title="Picked: Banner">The poster shrinks to a short band above the facts, and the timeline runs the full width — about a third more room for every task.</Sticky>
              <Sticky tone="pink" title="Why not Stages or Board">Stages hides tasks behind tabs and Board scrolls sideways and implies a fixed order — both change how the page works, not just how it looks.</Sticky>
              <Sticky tone="green" title="What Banner keeps">The same order as the original page (event, facts, checklist) and all three principles: action first, visible progress, and brand with restraint.</Sticky>
            </div>
          </div>

        </Section>

        {/* ── 06 ── */}
        <Section label="06  Design system" tone="yellow" id="system">
          <p className="mb-8 max-w-[68ch] text-[15px]" style={{ color: MUTED }}>Cool neutrals tinted toward the logo’s violet, one accent for “do this next”, the logo gradient for brand moments only. Contrast is computed from the tokens (WCAG 2).</p>
          <DesignSystem embedded />
        </Section>

        {/* ── 07 ── */}
        <Section label="07  Design rationale" tone="blue" id="rationale">
          <p className="mb-8 max-w-[68ch] text-[15px]" style={{ color: MUTED }}>What changed from the original, why, and where it shows up in the redesign.</p>
          <Rationale embedded />
        </Section>

        {/* ── 08 ── */}
        <Section label="08  Takeaways & next steps" tone="green" id="next">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Label>Takeaways</Label>
              <div className="grid gap-4">
                {TAKEAWAYS.map(([t, d]) => (
                  <Sticky key={t} tone="yellow" title={t}>{d}</Sticky>
                ))}
              </div>
            </div>
            <div>
              <Label>Suggested next steps</Label>
              <ol className="grid gap-4">
                {NEXT.map(([t, d], i) => (
                  <li key={t}>
                    <Sticky tone="green">
                      <span className="mb-1.5 flex items-center gap-2.5 text-[15px] font-semibold leading-snug" style={{ color: INK }}>
                        <Stamp n={i + 1} /> {t}
                      </span>
                      {d}
                    </Sticky>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>
      </div>
      <CaseStudyContents sections={CONTENTS} />
      <style>{`
        .pc-board {
          background-color: oklch(0.965 0.002 285);
          background-image: radial-gradient(oklch(0.2 0.015 285 / 0.16) 1px, transparent 1.2px);
          background-size: 22px 22px;
        }
        .pc-sticky {
          box-shadow: 0 1px 2px oklch(0.2 0.015 285 / 0.08), 0 8px 18px -10px oklch(0.2 0.015 285 / 0.35);
          transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .pc-sticky:hover { transform: translateY(-2px); box-shadow: 0 2px 4px oklch(0.2 0.015 285 / 0.08), 0 14px 28px -12px oklch(0.2 0.015 285 / 0.4); }
        }
        @media (prefers-reduced-motion: reduce) { .pc-sticky { transition: none; } }
      `}</style>
    </div>
  );
}
