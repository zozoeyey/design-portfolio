"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Canmarket.ai work-card motion: a coded replay of the real product flow.
 * The Budget Ballers Challenge campaign card is clicked and flips over; its
 * back grows into the app — Campaign Overview → Start Uploading SKU Assets →
 * upload a SKU image → Generate calendar → the AI fills two weeks of posts →
 * open one in Content Preview. Loops while
 * on screen; reduced motion shows the finished state, still.
 *
 * Everything is sized in cqw of the plate, so it stays sharp at any card size.
 * Post titles, dates, times and counts are taken from the product recording.
 */

type Kind = "image" | "video";
const DAYS: { dow: string; date: string; posts: [string, string, Kind][] }[] = [
  { dow: "Wed", date: "Dec 25", posts: [["New Year Teaser", "10:00 AM", "image"], ["Product Rev…", "2:00 PM", "video"]] },
  { dow: "Thu", date: "Dec 26", posts: [["Benefits Highlight", "9:00 AM", "image"]] },
  { dow: "Fri", date: "Dec 27", posts: [["Customer S…", "11:00 AM", "video"], ["Quick Tips", "4:00 PM", "image"]] },
  { dow: "Sat", date: "Dec 28", posts: [] },
  { dow: "Sun", date: "Dec 29", posts: [["Weekend Sale", "10:00 AM", "image"]] },
  { dow: "Mon", date: "Dec 30", posts: [["How it Works", "1:00 PM", "video"]] },
  { dow: "Tue", date: "Dec 31", posts: [["Year End S…", "8:00 AM", "image"], ["2026 Previ…", "11:59 PM", "video"]] },
  { dow: "Wed", date: "Jan 1", posts: [["New Year Launch", "12:00 AM", "image"]] },
  { dow: "Thu", date: "Jan 2", posts: [["Resolution Ready", "2:00 PM", "video"]] },
  { dow: "Fri", date: "Jan 3", posts: [["Feature Friday", "10:00 AM", "image"]] },
  { dow: "Sat", date: "Jan 4", posts: [] },
  { dow: "Sun", date: "Jan 5", posts: [["User Testimonial", "3:00 PM", "video"]] },
  { dow: "Mon", date: "Jan 6", posts: [["Monday Motivation", "10:00 AM", "image"]] },
  { dow: "Tue", date: "Jan 7", posts: [["Behind the Scenes", "1:00 PM", "video"]] },
];

// Phases and when they start (ms). The loop restarts after the last one.
// 0–3: the campaign card; 4: one continuous flip + grow into the app; 5–15: the flow.
const TIMELINE = [
  0, //    0 campaign card, tilted
  350, //  1 sheen sweeps across
  850, //  2 cursor → card
  1350, // 3 press (120ms)
  1470, // 4 flip + grow (900ms) → 1. Campaign Overview
  2500, // 5 cursor → Start Uploading SKU Assets
  3050, // 6 press button
  3250, // 7 2. SKU Upload & Style, empty slot
  3650, // 8 cursor → upload slot
  4050, // 9 image lands
  4450, // 10 cursor → Generate Calendar
  4850, // 11 press: Generating…
  5350, // 12 3. Creative Calendar, posts fill in
  6350, // 13 cursor → New Year Teaser
  6750, // 14 Content Preview opens
  8550, // 15 fade out, then restart
];
const LOOP = 9000;
const FINAL = 14;
const S0 = 0.55; // flipper scale while it's a card (the back is the app at this size)

// cursor position (cqw from the plate's top-left) per phase; null = hidden
const CURSOR: (readonly [number, number] | null)[] = [
  [78, 60], [78, 60], [53, 43], [53, 43], null,
  [79, 42.5], [79, 42.5], [80, 58], [36, 40], [36, 40],
  [83, 24.5], [83, 24.5], [62, 50], [30, 34.5], [30, 34.5], [30, 34.5],
];
const PRESS = [3, 6, 9, 11, 14];

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const BLUE = "#155dfc";

export default function CanmarketCardMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStill(true);
      setPhase(FINAL);
      return;
    }
    let timers: number[] = [];
    let at = 0; // last phase reached — leaving the viewport pauses here, coming back resumes
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const go = (i: number) => {
      at = i;
      setPhase(i);
    };
    const run = (from: number) => {
      clear();
      const t0 = TIMELINE[from];
      TIMELINE.forEach((t, i) => {
        if (i > from) timers.push(window.setTimeout(() => go(i), t - t0));
      });
      timers.push(window.setTimeout(() => { go(0); run(0); }, LOOP - t0));
    };
    // Only play while the card is on screen and the tab is visible.
    let visible = false;
    let playing = false;
    const sync = () => {
      const should = visible && document.visibilityState === "visible";
      if (should && !playing) run(at);
      if (!should && playing) clear();
      playing = should;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    }, { threshold: 0.25 });
    io.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clear();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const overview = phase < 7;
  const upload = phase >= 7 && phase < 12;
  const calendar = phase >= 12;
  const hasImage = phase >= 9;
  const pressing = phase === 11;
  const preview = phase >= 14;
  const leaving = phase === 15;
  const cursor = CURSOR[phase];
  const step = calendar ? 2 : upload ? 1 : 0;
  const flipT =
    phase <= 1 ? `rotateY(-16deg) rotateX(8deg) scale(${S0})`
    : phase === 2 ? `rotateY(-8deg) rotateX(4deg) scale(${S0})`
    : phase === 3 ? `rotateY(-8deg) rotateX(4deg) scale(${S0 * 0.96})`
    : "rotateY(180deg) scale(1)";
  // One transition rotates and grows together, so the card never stops between
  // the flip and the zoom, and the compositor rasterizes once at full scale.
  const flipTransition =
    phase === 0 ? "none"
    : phase === 3 ? `transform 120ms ${EASE}`
    : phase === 4 ? "transform 900ms cubic-bezier(0.32, 0.72, 0, 1)"
    : `transform 500ms ${EASE}`;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden [container-type:inline-size]"
      style={{ background: "radial-gradient(120% 90% at 100% 0%, #3b82f6 0%, #9cc3ff 38%, #e6f0ff 75%)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          perspective: "140cqw",
          opacity: leaving ? 0 : 1,
          transform: leaving ? "scale(0.98)" : "none",
          transition: leaving ? `opacity 400ms ${EASE}, transform 400ms ${EASE}` : `opacity 300ms ${EASE}`,
        }}
      >
        {/* flipper: the campaign card on the front, the app window on the back */}
        <div
          className="absolute bottom-[-2cqw] left-[5cqw] right-[5cqw] top-[6cqw]"
          style={{ transformStyle: "preserve-3d", transform: flipT, transition: flipTransition }}
        >
        {/* front — the Budget Ballers Challenge card from the campaign list, drawn 1.2× and counter-scaled by S0 */}
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
          <div style={{ transform: `scale(${1.2 / S0})` }}>
            <CampaignCard sheen={phase >= 1} />
          </div>
        </div>
        {/* back — app window; bleeds off the bottom so it reads close-up */}
        <div className="absolute inset-0 flex overflow-hidden rounded-[2cqw] bg-[#f7f8fa] shadow-[0_0_0_0.12cqw_rgba(21,93,252,0.12),0_3cqw_6cqw_-2cqw_rgba(21,60,160,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {/* sidebar */}
          <div className="w-[17cqw] shrink-0 px-[1.6cqw] pt-[2cqw] text-[1.25cqw] text-[#334155]">
            <div className="flex items-center gap-[0.7cqw] font-bold" style={{ color: BLUE }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/deck/mark-canmarket.png" alt="" className="h-[2.2cqw] w-[2.2cqw] object-contain" />
              Canmarket.AI
            </div>
            <div className="relative mt-[3cqw] flex flex-col gap-[0.5cqw]">
              <span
                className="absolute inset-x-0 top-0 h-[2.6cqw] rounded-[0.7cqw] bg-[#e8f0ff]"
                style={{ transform: `translateY(${step * 3.1}cqw)`, transition: `transform 500ms ${EASE}` }}
              />
              {["1. Campaign Overview", "2. SKU Upload & Style", "3. Creative Calendar"].map((s, i) => (
                <span
                  key={s}
                  className="relative flex h-[2.6cqw] items-center whitespace-nowrap px-[0.7cqw]"
                  style={{ color: i === step ? BLUE : undefined, transition: "color 300ms" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* main panel */}
          <div className="relative my-[1cqw] mr-[1cqw] flex-1 rounded-[1.6cqw] bg-white px-[3cqw] pt-[2cqw]">
            <p className="text-[1.1cqw] text-[#64748b]">← Back to Campaigns</p>
            <h4 className="mt-[0.8cqw] font-serif text-[4.4cqw] leading-none text-[#0f172a]">Budget Ballers Challenge</h4>
            <p className="mt-[0.6cqw] h-[1.8cqw] text-[1.25cqw] text-[#475569]">
              {calendar
                ? "Your AI-generated creative content calendar is ready."
                : upload
                  ? "Upload product images for each SKU, and we will generate a content calendar."
                  : "Campaign details and execution plan"}
            </p>

            {/* step 1 — Campaign Overview (copy verbatim from the product) */}
            <div
              className="absolute left-[3cqw] right-[3cqw] top-[13.4cqw] flex gap-[1.5cqw]"
              style={{
                opacity: overview ? 1 : 0,
                transform: overview ? "none" : "translateY(-1cqw)",
                transition: `opacity 250ms ${EASE}, transform 250ms ${EASE}`,
              }}
            >
              <div className="flex-1 rounded-[1.2cqw] border border-black/10 p-[1.6cqw] text-[0.95cqw] leading-snug text-[#334155]">
                <p className="text-[1.35cqw] font-bold text-[#0f172a]">Campaign Description</p>
                <p className="mt-[1.2cqw]">
                  <b className="text-[#0f172a]">Goals:</b> Position Veidoorn as the value choice for hoopers, increase basketball and accessory sales by 25%, drive UGC from local courts.
                </p>
                <p className="mt-[1cqw] font-bold text-[#0f172a]">Strategy:</p>
                <ul className="mt-[0.4cqw] flex list-disc flex-col gap-[0.45cqw] pl-[1.6cqw]">
                  {[
                    ["Offer stack", "\u201CBudget Baller Pack\u201D (basketball + grip socks/wrist support) with 15% off and a chance to win a team pack for local courts."],
                    ["Channels", "Instagram, TikTok (seeded via micro-creators), partnerships with local community courts and school teams."],
                    ["Social launch", "Launch video of pickup game featuring Veidoorn ball, challenge hashtag #BudgetBallersSG, reshare every tagged game clip."],
                    ["Creative angles", "\u201CCourt-ready on a student budget\u201D, slow-mo handles and dunks, side-by-side bounce/durability tests vs old balls."],
                    ["Execution", "Recruit 5\u201310 micro-creators to post their #BudgetBallersSG clips in week 1, repost top clips daily, highlight weekly MVP and court of the week."],
                    ["Measurement", "Number of hashtag posts, total UGC pieces, pack sales, referral code performance by creator, website traffic to basketball SKUs."],
                  ].map(([k, v]) => (
                    <li key={k}>
                      <b className="text-[#0f172a]">[{k}]:</b> {v}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-[25cqw] shrink-0 flex-col gap-[1.2cqw]">
                <div className="rounded-[1.2cqw] border border-black/10 p-[1.4cqw] text-[1.05cqw] text-[#334155]">
                  <p className="text-[1.25cqw] font-bold text-[#0f172a]">Campaign Period</p>
                  <p className="mt-[1cqw]">January 4, 2026 - January 18, 2026</p>
                  <p className="mt-[0.9cqw] rounded-full bg-[#f1f5f9] px-[0.8cqw] py-[0.25cqw] text-[0.9cqw]">(2 weeks)</p>
                </div>
                <div className="rounded-[1.2cqw] p-[1.4cqw] text-white" style={{ backgroundColor: "#2f62f0" }}>
                  <p className="text-[1.25cqw] font-bold">Next Steps</p>
                  <p className="mt-[0.9cqw] text-[0.9cqw] leading-snug text-white/80">
                    Upload SKU product assets and images, we will generate 7 batches of creative content calendar for you
                  </p>
                  <p
                    className="mt-[1.4cqw] rounded-[0.7cqw] bg-white py-[0.7cqw] text-center text-[1cqw] font-semibold text-[#0f172a]"
                    style={{ transform: phase === 6 ? "scale(0.96)" : "scale(1)", transition: `transform 120ms ${EASE}` }}
                  >
                    ⇪&nbsp; Start Uploading SKU Assets
                  </p>
                </div>
              </div>
            </div>

            {/* step 2 — SKU upload */}
            <div
              className="absolute left-[3cqw] right-[3cqw] top-[13.4cqw]"
              style={{
                visibility: upload || calendar ? "visible" : "hidden",
                opacity: upload ? 1 : 0,
                transform: upload ? "none" : "translateY(1cqw)",
                transition: `opacity 250ms ${EASE}, transform 250ms ${EASE}`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-black/10 px-[1cqw] py-[0.4cqw] text-[1.1cqw] text-[#334155]">
                  Dec 25, 2025 – Jan 8, 2026
                </span>
                <span
                  className="flex items-center gap-[0.6cqw] rounded-full px-[1.4cqw] py-[0.6cqw] text-[1.2cqw] font-bold text-white"
                  style={{
                    backgroundColor: BLUE,
                    transform: pressing ? "scale(0.96)" : "scale(1)",
                    transition: `transform 160ms ${EASE}`,
                  }}
                >
                  {pressing ? (
                    <>
                      <span className="h-[1.1cqw] w-[1.1cqw] animate-spin rounded-full border-[0.2cqw] border-white/40 border-t-white" />
                      Generating…
                    </>
                  ) : (
                    "✦ Generate Calendar"
                  )}
                </span>
              </div>
              <div className="mt-[1.6cqw] w-[22cqw] rounded-[1.2cqw] border border-black/10 p-[1.2cqw]">
                <p className="text-[1.3cqw] font-bold text-[#0f172a]">SKU 1</p>
                <p className="mt-[0.8cqw] text-[1cqw] text-[#64748b]">Upload image(s)</p>
                <div className="relative mt-[0.5cqw] h-[15cqw] overflow-hidden rounded-[0.8cqw] border border-dashed border-black/15 bg-[#f8fafc]">
                  <span className="absolute inset-0 flex items-center justify-center text-[1.1cqw] text-[#94a3b8]">Click to upload</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/media/canmarket/hoop.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      opacity: hasImage ? 1 : 0,
                      transform: hasImage ? "scale(1)" : "scale(0.94)",
                      transition: `opacity 350ms ${EASE}, transform 450ms ${EASE}`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* step 3 — the generated calendar */}
            <div className="absolute left-[3cqw] right-[3cqw] top-[13.4cqw]" style={{ visibility: calendar ? "visible" : "hidden" }}>
              <div className="flex gap-[0.7cqw] text-[1.05cqw] font-bold">
                {[
                  ["✦ 15 Posts Generated", "#e0ebff", BLUE],
                  ["10 Instagram", "#f3e8ff", "#7e22ce"],
                  ["5 TikTok", "#f1f5f9", "#475569"],
                ].map(([t, bg, fg], i) => (
                  <span
                    key={t}
                    className="rounded-[0.6cqw] px-[0.9cqw] py-[0.45cqw]"
                    style={{
                      backgroundColor: bg,
                      color: fg,
                      opacity: calendar ? 1 : 0,
                      transform: calendar ? "none" : "translateY(0.6cqw)",
                      transition: `opacity 300ms ${EASE} ${still ? 0 : 700 + i * 80}ms, transform 400ms ${EASE} ${still ? 0 : 700 + i * 80}ms`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-[1.4cqw] grid grid-cols-7 gap-[0.7cqw]">
                {DAYS.map((d, i) => {
                  const delay = still ? 0 : i * 45;
                  return (
                    <div
                      key={d.date}
                      className="h-[13.5cqw] overflow-hidden rounded-[0.8cqw] border p-[0.6cqw]"
                      style={{
                        borderColor: d.posts.length ? "#bfd7f5" : "rgba(0,0,0,0.06)",
                        backgroundColor: d.posts.length ? "#fff" : "#f5f7f9",
                        opacity: calendar ? 1 : 0,
                        transform: calendar ? "none" : "translateY(1cqw) scale(0.97)",
                        transition: `opacity 300ms ${EASE} ${delay}ms, transform 450ms ${EASE} ${delay}ms`,
                      }}
                    >
                      <p className="text-[0.85cqw] leading-tight text-[#64748b]">{d.dow}</p>
                      <p className="text-[1cqw] font-bold leading-tight text-[#0f172a]">{d.date}</p>
                      <div className="mt-[0.5cqw] flex flex-col gap-[0.4cqw]">
                        {d.posts.map(([title, time, kind], k) => {
                          const hot = i === 0 && k === 0;
                          const pDelay = still ? 0 : 250 + i * 45 + k * 10;
                          return (
                            <div
                              key={title}
                              className="flex gap-[0.35cqw] rounded-[0.5cqw] border px-[0.35cqw] py-[0.35cqw]"
                              style={{
                                borderColor: hot && preview ? BLUE : "rgba(0,0,0,0.08)",
                                boxShadow: hot && preview ? `0 0 0 0.12cqw ${BLUE}` : "none",
                                opacity: calendar ? 1 : 0,
                                transform: calendar ? "none" : "scale(0.95)",
                                transition: `opacity 250ms ${EASE} ${pDelay}ms, transform 350ms ${EASE} ${pDelay}ms, box-shadow 200ms`,
                              }}
                            >
                              <span
                                className="mt-[0.1cqw] h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-[0.25cqw]"
                                style={{ backgroundColor: kind === "image" ? "#dbe8ff" : "#eceff3" }}
                              />
                              <span className="min-w-0">
                                <span className="block truncate text-[0.8cqw] leading-tight text-[#0f172a]">{title}</span>
                                <span className="block text-[0.7cqw] leading-tight text-[#64748b]">{time}</span>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Preview panel */}
          <div
            className="absolute bottom-0 right-[1cqw] top-[1cqw] w-[23cqw] rounded-t-[1.6cqw] bg-white px-[1.4cqw] pt-[1.6cqw] shadow-[0_0_0_0.1cqw_rgba(0,0,0,0.06),-1.5cqw_0_3cqw_-1.5cqw_rgba(15,23,42,0.25)]"
            style={{
              opacity: preview ? 1 : 0,
              transform: preview ? "none" : "translateX(4cqw)",
              transition: `opacity 300ms ${EASE}, transform 500ms ${EASE}`,
            }}
          >
            <p className="text-[1.3cqw] font-bold text-[#0f172a]">Content Preview</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/canmarket/hoop.jpg" alt="" className="mt-[1.2cqw] aspect-[172/165] w-full rounded-[1cqw] object-cover" />
            <p className="mt-[1.2cqw] text-[0.9cqw] text-[#64748b]">Title</p>
            <p className="text-[1.2cqw] font-bold text-[#0f172a]">New Year Teaser</p>
            <div className="mt-[0.8cqw] flex gap-[0.5cqw] text-[0.95cqw]">
              <span className="rounded-full bg-[#f3e8ff] px-[0.7cqw] py-[0.2cqw] text-[#7e22ce]">Instagram</span>
              <span className="rounded-full border border-black/10 px-[0.7cqw] py-[0.2cqw] text-[#334155]">10:00 AM</span>
            </div>
            <p className="mt-[1.4cqw] rounded-[0.8cqw] py-[0.7cqw] text-center text-[1.1cqw] font-bold text-white" style={{ backgroundColor: BLUE }}>
              Edit Content
            </p>
          </div>
        </div>
        </div>

        {/* cursor */}
        {!still && (
          <svg
            viewBox="0 0 24 24"
            className="absolute left-0 top-0 h-[2.6cqw] w-[2.6cqw] drop-shadow-[0_0.2cqw_0.3cqw_rgba(0,0,0,0.3)]"
            style={{
              opacity: cursor ? 1 : 0,
              transform: `translate(${(cursor ?? CURSOR[3]!)[0]}cqw, ${(cursor ?? CURSOR[3]!)[1]}cqw) scale(${PRESS.includes(phase) ? 0.88 : 1})`,
              transition: "transform 550ms cubic-bezier(0.65, 0, 0.35, 1), opacity 200ms",
            }}
          >
            <path d="M4 2.5 19 13l-6.6 1.3L16 21.5l-2.8 1.3-3.6-7.3L4 20Z" fill="#0f172a" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

function CampaignCard({ sheen }: { sheen: boolean }) {
  return (
    <div className="relative w-[38cqw] overflow-hidden rounded-[2.4cqw] border border-[#e2e8f0] bg-white p-[2.6cqw] text-[#0f172a] shadow-[0_2.4cqw_4.8cqw_-2cqw_rgba(21,60,160,0.45)]">
      <div className="flex items-start justify-between">
        <span className="flex h-[5cqw] w-[5cqw] items-center justify-center rounded-[1.2cqw] border border-[#dbe3ee]">
          <svg viewBox="0 0 24 24" className="h-[2.6cqw] w-[2.6cqw]" fill="none" stroke="#7b8aa0" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5.5" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </span>
        <span className="rounded-full border border-[#bbf7d0] bg-[#ecfdf3] px-[1.1cqw] py-[0.35cqw] text-[1.15cqw] font-semibold tracking-[0.04em] text-[#15803d]">
          CARDS COMPLETE
        </span>
      </div>
      <p className="mt-[2cqw] font-serif text-[3.6cqw] leading-[1.05]">Budget Ballers Challenge</p>
      <p className="mt-[1cqw] line-clamp-2 text-[1.3cqw] leading-snug text-[#64748b]">
        <b className="text-[#475569]">Goals:</b> Position Veidoorn as the value choice for hoopers, increase basketball and accessory sales by 25%
      </p>
      <div className="mt-[1.8cqw] flex gap-[0.8cqw]">
        {[0, 1, 2, 3].map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={`/media/canmarket/thumb-${i}.jpg`} alt="" className="h-[5.2cqw] w-[5.2cqw] rounded-[1.2cqw] object-cover" />
        ))}
        <span className="flex h-[5.2cqw] w-[5.2cqw] items-center justify-center rounded-[1.2cqw] bg-[#f1f5f9] text-[1.3cqw] text-[#64748b]">+18</span>
      </div>
      <div className="mt-[2cqw] flex flex-col gap-[0.6cqw] border-t border-[#eef2f6] pt-[1.6cqw] text-[1.3cqw] text-[#64748b]">
        {[
          ["Dec 25", "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"],
          ["16 posts", "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6"],
        ].map(([t, d]) => (
          <span key={t} className="flex items-center gap-[0.8cqw]">
            <svg viewBox="0 0 24 24" className="h-[1.6cqw] w-[1.6cqw]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d={d} />
            </svg>
            {t}
          </span>
        ))}
      </div>
      {/* sheen sweep */}
      <span
        className="pointer-events-none absolute inset-y-[-20%] left-0 w-[30%] -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        style={{
          transform: sheen ? "translateX(420%)" : "translateX(-160%)",
          transition: sheen ? "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)" : "none",
        }}
      />
    </div>
  );
}
