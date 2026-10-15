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

// principle tags = the three design principles from Step 5
const P1 = "01 Prioritize action over information";
const P2 = "02 Make progress visible and meaningful";
const P3 = "03 Balance brand expression with usability";

const DECISIONS: { title: string; before: string; after: string; why: string; principle: string; media?: React.ReactNode }[] = [
  {
    title: "One status, in one place",
    before: "“Draft” appeared three times: a pill next to the title, a green “Ready to publish” banner, and a Status card.",
    after: "One status menu next to the title, with Movemint’s five real statuses (Live, Draft, Unlisted, Landing Page, Past Event). The banner and the Status card are gone; the event URL sits under the title with Copy and Edit URL.",
    why: "Saying the same thing three times costs space and attention and adds nothing. The banner also pushed the actual work below the fold.",
    principle: P1,
  },
  {
    title: "One action, on the line it belongs to",
    before: "Brand red on Create Event, the active nav, the progress bar, Publish and the AI button, all at equal weight. Publish sat small inside a banner.",
    after: "Only the action that moves the event forward is filled, and it appears where its task is: Set up on the open setup step, then Publish on the Publish line, then Copy event link once live.",
    why: "When everything is red, nothing is primary. Putting the button on its own step answers “what do I do next?” and “why?” in the same place.",
    principle: P1,
  },
  {
    title: "The brand red, made legible",
    before: "Movemint red #FF4A5D with white text and as text: 3.29:1, fails WCAG AA. A red progress bar read as an error.",
    after: "Raspberry #bd3061 for anything with text (buttons 5.59:1). Light raspberry #ec5482 for shapes only (3.43:1, above the 3:1 non-text bar). Green means Live and nothing else. Neutrals tinted toward the logo’s violet.",
    why: "Keeps Movemint’s red family while passing contrast. Giving each color one meaning makes the page readable at a glance.",
    principle: P3,
  },
  {
    title: "Type with one voice, one brand moment",
    before: "Inter only, seven ad-hoc sizes (12–30px). Figures were barely larger than their labels.",
    after: "Inter for every piece of UI on a fixed role scale; the three overview figures share one stat style (28/600, tabular). Instrument Serif, which echoes the wordmark, appears once — the event name on the event card.",
    why: "One family keeps the working UI calm and scannable; saving the serif for a single moment is what makes it feel like the brand.",
    principle: P3,
  },
  {
    title: "An overview you read in one line",
    before: "Three identical grey cards (Status, Participants, Date); 16px values; only Participants had an affordance, a bare arrow.",
    after: "The event card — name in serif, date, place and a “23 days to go” chip — opens the attendee preview. Beside it, three facts in one card: Participants (View all), Required setup (4/5 with the page’s only progress bar), Registration (Open/Closed and its window).",
    why: "The card is the event at a glance; each fact answers one question and links to where you act on it. Label → value → one line in every cell keeps it scannable.",
    principle: P2,
  },
  {
    title: "The checklist as a timeline",
    before: "One long list with no hierarchy: 23 rows under small Required / Recommended labels, with “6 of 23 tasks complete” at the far right.",
    after: "Stages on a rail — Today (required setup) → Publish → Before race day → Race day → After — the “before, during, and after” the page’s own description promised. Solid rail up to Publish, dashed after; one marker family whose color says done, now, locked or optional.",
    why: "Tasks have a natural order in time. Showing it tells organizers what matters now and what can wait, without reading all 23.",
    principle: P2,
  },
  {
    title: "Required vs optional, impossible to miss",
    before: "Required and optional rows looked the same; every optional task read “Not applicable”.",
    after: "The one open required step is the only tinted row, with its Set up button. Publish shows a lock until setup is done. Optional stages say “Optional, any order”.",
    why: "Several quiet signals — tint, lock, label, rail style — make the split readable at a glance without adding loud badges.",
    principle: P1,
  },
  {
    title: "Done looks like Movemint’s done",
    before: "Done rows kept full weight, plus a lock icon and “Completed” on every row.",
    after: "Movemint’s own completed style — grey checked box, muted struck-through title, description kept — without the lock and label. Once every required step is done, the list folds into one “All 5 required steps done” row.",
    why: "Finished work is history. Reusing the product’s existing completed state keeps it familiar; folding it lets the next step lead.",
    principle: P2,
  },
  {
    title: "Optional tasks you can tick off",
    before: "18 full-width bordered rows in one list.",
    after: "Grouped by purpose and stage — Get found, Registration, On the day, After the race — as two-column lists with a title, one-line description and a checkbox. A ticked task glides to the end of its list.",
    why: "Grouping turns one long list into short, browsable sets; letting organizers mark tasks themselves matches how the original worked.",
    principle: P2,
  },
  {
    title: "Context that follows you down the page",
    before: "Scroll past the top and the event, its status and the countdown are gone.",
    after: "A slim sticky bar slides in once the overview scrolls away: event, status, date and days to go. It shows the next action only while that task’s own line is off screen.",
    why: "Keeps “which event, where it stands” in view without giving it a permanent column — a persistent action earns its place only when the real one can’t be seen.",
    principle: P1,
  },
];

const KEPT = [
  "Every feature and every piece of data — no additions, no removals",
  "Navigation: sidebar (now collapsible, as in the original), event tabs, Checkout dashboard",
  "All 23 checklist tasks and Movemint’s own copy",
  "Quick actions: search, participants, financials, QR code, duplicate, preview",
  "Movemint’s completed-task style and its five statuses",
  "Movemint AI — restyled, same entry point",
];

const REJECTED: [string, string][] = [
  ["Refined / Progress-first / Split / Table (round 1)", "Cleaner, but generic SaaS — nothing about Movemint"],
  ["Start line (setup drawn as a race course)", "Memorable, but optional tasks fell off the metaphor"],
  ["Combined (poster column + timeline)", "Kept context in view, but the column squeezed every task"],
  ["Stages and Board layouts", "Hid tasks behind tabs, or scrolled sideways and implied a fixed order"],
  ["Grey canvas with borderless cards", "Flattened the page into competing surfaces"],
  ["Crimson, ink, rose, plum, burnt coral accents", "Off-brand, or buttons lost the brand color"],
  ["Modals and side sheets", "Hide the page the decision is about"],
];

/* ── examples for each decision ── */
function Img({ src, alt, max = "max-w-[820px]" }: { src: string; alt: string; max?: string }) {
  return <img src={src} alt={alt} className={`block h-auto w-full ${max}`} />;
}
function Steps() {
  return (
    <div className="grid gap-3">
      {[
        ["/deck/mm-r-02a.jpg", "Setup", "the open step carries Set up"],
        ["/deck/mm-r-02b.jpg", "Ready", "Publish appears on the Publish line"],
        ["/deck/mm-r-02c.jpg", "Live", "the same line becomes Copy event link"],
      ].map(([src, k, v]) => (
        <figure key={k} className="grid gap-1.5 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-center sm:gap-4">
          <figcaption className="text-[13px]"><span className="font-semibold">{k}</span> <span className="block" style={muted}>{v}</span></figcaption>
          <div className="overflow-hidden rounded-lg bg-white"><Img src={src} alt={`${k}: ${v}`} /></div>
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
        <p className="flex items-baseline gap-4"><span className="text-[28px] font-semibold tabular-nums tracking-[-0.015em]">4<span style={muted}>/5</span></span><span className="text-[18px] font-semibold">Event checklist</span></p>
        <p className="text-[14px]" style={muted}>Pick the date and time participants can start signing up.</p>
      </div>
      <div className="flex flex-col justify-between gap-5 rounded-lg px-5 py-4 text-white" style={{ backgroundImage: B.gradientDiag }}>
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-white/70">Serif — the event card only</p>
        <p className="font-serif text-[30px] leading-[1.02]">Startup Founders Bouldering Meetup</p>
      </div>
    </div>
  );
}

const MEDIA: Record<number, React.ReactNode> = {
  0: <Img src="/deck/mm-r-01.jpg" alt="Title with the status menu, the event URL with Copy and Edit URL, and the quick-action tools" />,
  1: <Steps />,
  2: <ColorExample />,
  3: <TypeExample />,
  4: <Img src="/deck/mm-r-05.jpg" alt="Overview: the event card beside Participants, Required setup and Registration" />,
  5: <Img src="/deck/mm-r-07.jpg" alt="The checklist as a timeline from today to after the race" max="max-w-[560px]" />,
  6: <Img src="/deck/mm-r-08.jpg" alt="Finish the setup: the one tinted open step with Set up above the completed steps" max="max-w-[760px]" />,
  7: <Img src="/deck/mm-r-09.jpg" alt="Setup complete: all five required steps folded into one row" max="max-w-[760px]" />,
  8: <Img src="/deck/mm-r-10.jpg" alt="Get found: optional tasks with checkboxes, titles and one-line descriptions" max="max-w-[420px]" />,
  9: <Img src="/deck/mm-r-11.jpg" alt="Sticky bar: event name, status, date and days to go" />,
};

// `embedded`: rendered inside the Design process board — no page chrome, no before/after or summary (the board has both)
export function Rationale({ embedded = false }: { embedded?: boolean }) {
  const body = (
    <>
        <section className={embedded ? "" : "mt-14"}>
          {!embedded && <h2 className="text-[18px] font-semibold">What changed, and why</h2>}
          <ol className={`grid gap-4 ${embedded ? "" : "mt-5"}`}>
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

        {!embedded && <section className="mt-14">
          <h2 className="text-[18px] font-semibold">After publishing</h2>
          <p className="mt-1 max-w-[65ch] text-[14px]" style={muted}>The same page once the event is live: status reads Live in one place, setup has collapsed, and the left column offers the next useful step — sharing the link.</p>
          <div className="mt-5 max-w-[820px]">
            <Shot src="/deck/mm-after-live.jpg" alt="Redesigned Insights page after publishing" caption="Live — setup collapsed, next step is sharing" tone="after" />
          </div>
        </section>}
    </>
  );
  if (embedded) return <div style={{ color: B.ink }}>{body}</div>;
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
        {body}
      </div>
    </div>
  );
}
