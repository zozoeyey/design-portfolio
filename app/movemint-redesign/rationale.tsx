"use client";
/* eslint-disable @next/next/no-img-element */
// Design rationale for the Movemint Insights redesign: what changed from the original page, and why.
import { B } from "./shell";

const muted = { color: B.muted };

function Shot({ src, alt, caption, tone }: { src: string; alt: string; caption: string; tone: "before" | "after" }) {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.08),0_8px_24px_-12px_oklch(0.2_0.015_285/0.25)]">
        <img src={src} alt={alt} className="block aspect-[2400/1289] w-full object-cover object-top" />
      </div>
      <figcaption className="mt-3 flex items-center gap-2 text-[13px]" style={muted}>
        <span
          className="rounded-md px-2 py-0.5 text-[12px] font-semibold"
          style={tone === "after" ? { backgroundColor: B.accentTint, color: B.accentStrong } : { backgroundColor: B.surface, color: B.ink }}
        >
          {tone === "after" ? "After" : "Before"}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

const DECISIONS: { title: string; before: string; after: string; why: string; principle: string; media?: React.ReactNode }[] = [
  {
    title: "One status, one place",
    before: "“Draft” appeared three times: the pill next to the title, the green “Ready to publish” banner, and a Status card.",
    after: "A single status menu next to the title, with Movemint’s five real statuses (Live, Draft, Unlisted, Landing Page, Past Event). The poster stamp mirrors it; nothing else repeats it.",
    why: "Saying the same thing three times costs space and attention and adds no information. The banner also pushed the actual work below the fold.",
    principle: "Hierarchy is subtraction",
  },
  {
    title: "One primary action — always the next step",
    before: "Brand red on Create Event, the active nav item, the progress bar, Publish and the AI button, all at equal weight. Publish sat small inside a banner.",
    after: "Only the action that moves the event forward is filled: Set up, then Publish. Before setup is done the left column says what’s left and links straight to it; after publishing it offers “Copy event link”.",
    why: "When everything is red, nothing is primary. A large grey disabled button reads as broken; telling the organizer what’s left — with a link — is the shorter path.",
    principle: "One primary action per view",
  },
  {
    title: "The brand red, made legible",
    before: "Movemint red #FF4A5D with white text and as text: 3.29:1, fails WCAG AA. A red progress bar read as an error. Pure greys everywhere.",
    after: "Raspberry #bd3061 for anything with text (buttons 5.59:1, red text 5.59:1 on white, 5.00:1 on its tint). Light raspberry #ec5482 for shapes only (3.43:1, above the 3:1 non-text bar). Green means Live and nothing else. Neutrals tinted toward the logo’s violet.",
    why: "Keeps Movemint’s red family while passing contrast. Giving each color one meaning makes the page readable at a glance.",
    principle: "Restraint reads as intent · contrast is a floor",
  },
  {
    title: "Type with a voice",
    before: "Inter only, seven ad-hoc sizes (12–30px). Stat values were barely larger than their labels.",
    after: "Inter for every piece of UI — the event title included — on a nine-role scale; dashboard figures share one “stat” style (Inter 24/600, tabular). Instrument Serif, which echoes the wordmark, appears only on the poster card. The Movemint logo is their original wordmark image.",
    why: "One family keeps the working UI calm and scannable; the serif is saved for the single brand moment, so it actually stands out.",
    principle: "Restraint · every size from a scale",
  },
  {
    title: "The event as the hero",
    before: "The page opened on settings: a banner and three grey boxes.",
    after: "A poster card in the logo gradient: event name, when, where, and a countdown, with the status stamped on it. It stays in view while the checklist scrolls.",
    why: "Organizers think in events, not settings. The countdown answers the question behind every task — how much time is left.",
    principle: "Name things by the user’s mental model",
  },
  {
    title: "Numbers that lead — and lead somewhere",
    before: "Three grey cards; 16px values; only Participants had an affordance, a bare arrow.",
    after: "One strip with three facts. Participants → “View all” (the way into the attendee list and analytics). Required setup → 4/5 plus the optional count. Registration → Open/Closed with its window and a “Set window / Edit” link.",
    why: "Each figure answers a question and links to where you act on it. Participants is the entry point to attendee analytics, so it gets a labelled link, not a guessable arrow.",
    principle: "Specific beats generic",
  },
  {
    title: "The checklist as a timeline",
    before: "23 identical bordered rows in two flat lists. “5 of 23 tasks complete” sat next to a separate “80%”.",
    after: "Today (required setup) → Publish → Before race day → Race day → After — the “before, during, and after” the page’s own description already promised. One progress number and bar.",
    why: "Tasks have a natural order in time; showing it tells organizers what matters now and what can wait. Two different percentages for one checklist were confusing.",
    principle: "Structure over flat lists",
  },
  {
    title: "Required vs optional, impossible to miss",
    before: "A small “Required” heading, then “Recommended”; every optional task said “Not applicable”.",
    after: "Required steps carry an ink “Required · 4 of 5” tag; optional groups a grey “Optional · 1 of 18”. The rail is solid along the required path (setup → publish) and dashed after it.",
    why: "Three signals — tag, count and line style — so it reads even at a glance. “Not applicable” was both vague and wrong for tasks the organizer simply hadn’t done.",
    principle: "Never rely on a single cue",
  },
  {
    title: "Done steps get out of the way",
    before: "Completed rows kept full weight, with strikethrough, a lock icon and “Completed” on every row.",
    after: "A thin muted check, no strikethrough, no green. Once everything required is done the list collapses into one row (“All 5 required steps done”), automatically after publishing.",
    why: "Finished work is history. Quiet done-states let the one open step stand out.",
    principle: "Done should recede, not shout",
  },
  {
    title: "Optional tasks you can scan",
    before: "18 full-width bordered rows, one per task.",
    after: "Grouped by purpose — Get found, Registration, On the day, After the race — in a two-column grid, each with an icon, title and its one-line description, inside one container per group.",
    why: "Grouping turns a long list into four short decisions; shared rows keep the grid tidy while every task keeps its explanation.",
    principle: "Group with progressive structure",
  },
  {
    title: "Hidden features made visible",
    before: "A row of unlabeled icons; the pencil (“Edit event URL handle”) only explained itself on hover. An “Insights” sub-tab sat inside the Insights tab.",
    after: "The event URL is shown under the title with Copy link and Edit URL; editing happens in place with live validation (Enter saves, Esc cancels). Every remaining icon keeps its feature and gets a designed tooltip. The sub-tab is “Overview”.",
    why: "If a feature needs a hover to be discovered, most people never find it. Repeating the tab name made the navigation feel circular.",
    principle: "Visible beats discoverable",
  },
];

const KEPT = [
  "Every feature and every piece of data — no additions, no removals",
  "Navigation: sidebar, event tabs, Checkout dashboard",
  "All 23 checklist tasks and Movemint’s own copy",
  "Quick actions: search, participants, financials, QR code, duplicate, preview",
  "Movemint AI — restyled, same entry point",
];

const REJECTED: [string, string][] = [
  ["Refined / Launch panel / Hero layouts", "Cleaner, but generic SaaS — nothing about Movemint"],
  ["Start line (setup drawn as a race course)", "Memorable, but only 7 checkpoints fit; optional tasks fell off the metaphor"],
  ["Poster or Timeline alone", "Each had one strong idea; the combination keeps both"],
  ["Crimson, ink, rose, plum, burnt coral accents", "Off-brand, or buttons lost the brand color"],
  ["Amber status pill", "Read as a generic, generated component"],
  ["Modals and side sheets", "Hide the page the decision is about"],
];

/* ── examples for each decision ── */
function Img({ src, alt, max = "max-w-[820px]" }: { src: string; alt: string; max?: string }) {
  return <img src={src} alt={alt} className={`block h-auto w-full ${max}`} />;
}
function Steps() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        ["/deck/mm-r-02a.jpg", "Before setup is done", "Says what’s left — and links to it"],
        ["/deck/mm-r-02b.jpg", "Ready", "The one filled button"],
        ["/deck/mm-r-02c.jpg", "Live", "Next step: share the link"],
      ].map(([src, k, v]) => (
        <figure key={k}>
          <div className="overflow-hidden rounded-lg bg-white"><Img src={src} alt={`${k}: ${v}`} /></div>
          <figcaption className="mt-2 text-[13px]"><span className="font-semibold">{k}</span> <span style={muted}>· {v}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}
function ColorExample() {
  const rows: [string, string, string, string][] = [
    ["Movemint red, original", "#FF4A5D", "white", "3.29:1 · fails"],
    ["Raspberry · text & buttons", "#bd3061", "white", "5.59:1 · AA"],
    ["Light raspberry · shapes only", "#ec5482", "none", "3.43:1 · AA (UI)"],
    ["Green · Live only", "#187c49", "white", "5.20:1 · AA"],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {rows.map(([name, hex, fg, ratio], i) => (
        <div key={name} className={`rounded-lg bg-white p-3 ${i === 0 ? "opacity-70" : ""}`} style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
          <div className="flex h-12 items-center justify-center rounded-md text-[14px] font-semibold" style={{ backgroundColor: hex, color: fg === "white" ? "white" : "transparent" }}>
            {fg === "white" ? (i === 0 ? "Set up" : i === 3 ? "Live" : "Set up") : ""}
          </div>
          <p className="mt-2 text-[13px] font-semibold">{name}</p>
          <p className="flex justify-between font-mono text-[12px]" style={muted}><span>{hex}</span><span style={i === 0 ? { color: B.accentStrong } : undefined}>{ratio}</span></p>
        </div>
      ))}
    </div>
  );
}
function TypeExample() {
  return (
    <div className="grid gap-4 rounded-lg bg-white p-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
      <div className="grid gap-3">
        <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={muted}>Inter — the UI</p>
        <p className="text-[30px] font-bold leading-tight tracking-[-0.015em]">Startup Founders Bouldering Meetup</p>
        <p className="flex items-baseline gap-4"><span className="text-[24px] font-semibold tabular-nums tracking-[-0.01em]">4<span style={{ color: B.faint }}>/5</span></span><span className="text-[18px] font-semibold">Event checklist</span></p>
        <p className="text-[14px]" style={muted}>Pick the date and time participants can start signing up.</p>
      </div>
      <div className="grid content-start gap-3 rounded-lg p-4 text-white" style={{ backgroundImage: B.gradientDiag }}>
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-white/70">Serif — poster only</p>
        <img src="/deck/movemint-logo.png" alt="Movemint" className="h-[18px] w-auto self-start brightness-0 invert" />
        <p className="font-serif text-[38px] leading-[0.98]">Startup Founders Bouldering Meetup</p>
      </div>
    </div>
  );
}

const MEDIA: Record<number, React.ReactNode> = {
  0: <Img src="/deck/mm-r-01.jpg" alt="Status menu next to the title with Movemint’s five statuses" max="max-w-[720px]" />,
  1: <Steps />,
  2: <ColorExample />,
  3: <TypeExample />,
  4: <Img src="/deck/mm-r-05.jpg" alt="Poster card in the logo gradient" max="max-w-[300px]" />,
  5: <Img src="/deck/mm-r-06.jpg" alt="Stat strip: Participants with View all, Required setup, Registration with Set window" />,
  6: <Img src="/deck/mm-r-07.jpg" alt="The checklist as a timeline from today to after the race" max="max-w-[620px]" />,
  7: <Img src="/deck/mm-r-08.jpg" alt="Required and Optional tags with a solid then dashed rail" max="max-w-[600px]" />,
  8: <Img src="/deck/mm-r-09.jpg" alt="Completed required steps with quiet checks, collapsible" max="max-w-[720px]" />,
  9: <Img src="/deck/mm-r-10.jpg" alt="Optional tasks grouped in a two-column grid with descriptions" max="max-w-[720px]" />,
  10: <Img src="/deck/mm-r-11.jpg" alt="Event URL under the title with Copy and Edit URL, and a designed tooltip" />,
};

export function Rationale() {
  return (
    <div className="mm-proto min-h-dvh px-4 pb-32 pt-8 sm:px-10" style={{ backgroundColor: "oklch(0.955 0.004 285)", color: B.ink, fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
      <div className="mx-auto max-w-[1240px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={muted}>Movemint organizer · Insights redesign</p>
            <h1 className="mt-1 font-serif text-[38px] leading-none">Design rationale</h1>
          </div>
          <p className="max-w-[56ch] text-[14px] [text-wrap:pretty]" style={muted}>
            A visual redesign of the Insights page an organizer lands on after creating an event. Brief: improve the visuals, add no features, keep the data — about two to three hours.
          </p>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <Shot src="/deck/mm-insights-current.jpg" alt="Original Movemint Insights page" caption="Draft, ready to publish — as shipped" tone="before" />
          <Shot src="/deck/mm-after-setup.jpg" alt="Redesigned Insights page" caption="Same state, same data, redesigned" tone="after" />
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["Say each thing once", "One status, one number per fact, one place for the next step."],
            ["Make the next step obvious", "Required before optional, now before later, one filled button."],
            ["Bring the brand into the product", "The wordmark’s serif, the logo gradient and Movemint’s red family — used with restraint."],
          ].map(([t, d], i) => (
            <div key={t} className="rounded-xl bg-white p-6 shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.06)]">
              <p className="font-serif text-[32px] leading-none" style={{ color: B.accentStrong }}>{i + 1}</p>
              <p className="mt-3 text-[18px] font-semibold">{t}</p>
              <p className="mt-1 text-[14px] [text-wrap:pretty]" style={muted}>{d}</p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <h2 className="text-[18px] font-semibold">What changed, and why</h2>
          <ol className="mt-5 grid gap-4">
            {DECISIONS.map((d, i) => (
              <li key={d.title} className="grid gap-x-8 gap-y-4 rounded-xl bg-white p-6 shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.06)] sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div>
                  <p className="text-[13px] font-medium tabular-nums" style={muted}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-[18px] font-semibold leading-snug [text-wrap:balance]">{d.title}</h3>
                  <p className="mt-3 inline-flex rounded-md px-2 py-0.5 text-[12px] font-medium" style={{ backgroundColor: B.surface, color: B.muted }}>{d.principle}</p>
                </div>
                <dl className="grid gap-4 text-[14px] leading-relaxed md:grid-cols-3">
                  {[
                    ["Before", d.before],
                    ["After", d.after],
                    ["Why", d.why],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: k === "After" ? B.accentStrong : B.muted }}>{k}</dt>
                      <dd className="mt-1 [text-wrap:pretty]" style={k === "Before" ? muted : undefined}>{v}</dd>
                    </div>
                  ))}
                </dl>
                {MEDIA[i] && (
                  <div className="rounded-lg p-4 sm:p-5 lg:col-span-2" style={{ backgroundColor: B.surface }}>
                    <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em]" style={muted}>In the redesign</p>
                    {MEDIA[i]}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.06)] sm:p-8">
            <h2 className="text-[18px] font-semibold">Kept on purpose</h2>
            <ul className="mt-4 grid gap-2.5 text-[14px]">
              {KEPT.map((k) => (
                <li key={k} className="flex gap-2.5"><span aria-hidden="true" style={muted}>—</span>{k}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.06)] sm:p-8">
            <h2 className="text-[18px] font-semibold">Explored and rejected</h2>
            <dl className="mt-4 grid gap-3 text-[14px]">
              {REJECTED.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-medium">{k}</dt>
                  <dd style={muted}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[18px] font-semibold">After publishing</h2>
          <p className="mt-1 max-w-[65ch] text-[14px]" style={muted}>The same page once the event is live: status reads Live in one place, setup has collapsed, and the left column offers the next useful step — sharing the link.</p>
          <div className="mt-5 max-w-[820px]">
            <Shot src="/deck/mm-after-live.jpg" alt="Redesigned Insights page after publishing" caption="Live — setup collapsed, next step is sharing" tone="after" />
          </div>
        </section>
      </div>
    </div>
  );
}
