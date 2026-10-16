"use client";
/* eslint-disable @next/next/no-img-element */
// Design rationale for the Movemint Insights redesign: what changed from the original page, and why.
import { B } from "./shell";

const muted = { color: B.muted };

function Shot({ src, alt, caption, tone }: { src: string; alt: string; caption: string; tone: "before" | "after" }) {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.08),0_8px_24px_-12px_oklch(0.2_0.015_285/0.25)]">
        <img src={src} alt={alt} width={2400} height={1289} loading="lazy" decoding="async" className="block aspect-[2400/1289] w-full object-cover object-top" />
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

const DECISIONS: { title: string; before: string; after: string; user: string; business: string; principle: string; media?: React.ReactNode }[] = [
  {
    title: "One status, in one place",
    before: "“Draft” appeared three times: a pill, a green banner and a Status card.",
    after: "One status menu next to the title; the banner and Status card are gone.",
    user: "Where the event stands is clear at a glance, and the freed space goes to the work itself.",
    business: "Fewer “is my event live?” questions to support.",
    principle: P1,
  },
  {
    title: "One action, on the line it belongs to",
    before: "Brand red on five things at equal weight; Publish sat small inside a banner.",
    after: "Only the next action is filled, on its own step: Set up, then Publish, then Copy event link.",
    user: "No hunting for what to do next — the path from draft to live is a straight line.",
    business: "Shorter time to publish — the first success metric, and the moment an event starts earning.",
    principle: P1,
  },
  {
    title: "An overview you read in one line",
    before: "Three identical grey cards; only Participants had an affordance, a bare arrow.",
    after: "The event card beside three facts — Participants, Required setup, Registration — each with a link to act on.",
    user: "The three questions organizers bring are answered before scrolling.",
    business: "A labelled way into attendee analytics, one of the product’s core features.",
    principle: P2,
  },
  {
    title: "A checklist with a shape",
    before: "One long list: 23 equal rows, required and optional alike, done rows still at full weight.",
    after: "Stages on a timeline; the one open required step tinted with Set up; finished steps in Movemint’s completed style, folded once done.",
    user: "What matters now, what’s optional and what’s finished are visible without reading all 23.",
    business: "Fewer events stuck in Draft — the second success metric (required-vs-optional accuracy).",
    principle: P2,
  },
  {
    title: "Optional tasks you can tick off",
    before: "18 full-width bordered rows in one list.",
    after: "Short lists grouped by purpose and stage, each with a checkbox.",
    user: "Easy to browse, and organizers can keep their own checklist, as in the original.",
    business: "More use of the revenue features — merchandise, donations, performance marketing, referrals.",
    principle: P2,
  },
  {
    title: "Context that follows you down the page",
    before: "Scroll past the top and the event, its status and the countdown are gone.",
    after: "A slim sticky bar with the event, status and days to go; the next action joins only when its own line is off screen.",
    user: "Organizers running several races never lose track of which one they’re editing.",
    business: "Supports multi-event organizers — the efficiency they praised in the reviews.",
    principle: P1,
  },
  {
    title: "One visual system",
    before: "Movemint red with white text failed contrast (3.29:1); seven ad-hoc type sizes.",
    after: "A raspberry from the same red family (5.59:1), green for Live only, Inter on a fixed scale, the serif saved for the event name.",
    user: "Readable for everyone, and each color means one thing.",
    business: "Meets WCAG AA while staying recognisably Movemint.",
    principle: P3,
  },
];

/* ── examples for each decision ── */
// intrinsic sizes so each image reserves its space before it loads
const DIMS: Record<string, [number, number]> = {
  "/deck/mm-r-01.jpg": [2304, 194], "/deck/mm-r-05.jpg": [2304, 360], "/deck/mm-r-07.jpg": [2304, 2874], "/deck/mm-r-08.jpg": [2304, 906],
  "/deck/mm-r-09.jpg": [2304, 320], "/deck/mm-r-02a.jpg": [1944, 176], "/deck/mm-r-02b.jpg": [2296, 262], "/deck/mm-r-02c.jpg": [2296, 254], "/deck/mm-r-10.jpg": [980, 888], "/deck/mm-r-11.jpg": [2312, 152],
};
function Img({ src, alt, max = "max-w-[820px]" }: { src: string; alt: string; max?: string }) {
  const [w, h] = DIMS[src] ?? [];
  return <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className={`block h-auto w-full ${max}`} />;
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
  2: <Img src="/deck/mm-r-05.jpg" alt="Overview: the event card beside Participants, Required setup and Registration" />,
  3: <Img src="/deck/mm-r-08.jpg" alt="Finish the setup: the one tinted open step with Set up above the completed steps" max="max-w-[760px]" />,
  4: <Img src="/deck/mm-r-10.jpg" alt="Get found: optional tasks with checkboxes, titles and one-line descriptions" max="max-w-[420px]" />,
  5: <Img src="/deck/mm-r-11.jpg" alt="Sticky bar: event name, status, date and days to go" />,
  6: <div className="grid gap-4"><ColorExample /><TypeExample /></div>,
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
                <dl className="grid gap-x-6 gap-y-4 text-[14px] leading-relaxed md:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Before", d.before],
                    ["After", d.after],
                    ["For organizers", d.user],
                    ["For Movemint", d.business],
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
