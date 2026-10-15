"use client";
import { cloneElement, useEffect, useId, useRef, useState } from "react";

// Movemint organizer chrome (brand tokens) + real data, pre-publish state: 4 of 5 required steps done.

// Brand tokens: Movemint red for shapes, raspberry for anything with text, cool neutrals tinted toward the logo gradient's violet.
export const B = {
  accent: "oklch(0.66 0.19 5)", // light raspberry #ec5482 — shapes without text (rings, pulse, progress); 3.43:1 vs white
  accentStrong: "oklch(0.54 0.18 5)", // raspberry #bd3061: anything carrying text — filled buttons (white text 5.59:1) and red-role text
  accentTint: "oklch(0.965 0.02 5)", // #ffeef1, raspberry's hue: active nav, pending row (raspberry text on it 5.00:1)
  gradient: "linear-gradient(90deg, oklch(0.74 0.15 35), oklch(0.66 0.16 320), oklch(0.62 0.15 285), oklch(0.74 0.12 235))",
  gradientDiag: "linear-gradient(135deg, oklch(0.76 0.14 40) 0%, oklch(0.66 0.17 335) 38%, oklch(0.6 0.16 290) 64%, oklch(0.75 0.12 230) 100%)",
  ink: "oklch(0.2 0.015 285)",
  muted: "oklch(0.5 0.015 285)",
  faint: "oklch(0.7 0.01 285)",
  surface: "oklch(0.975 0.004 285)",
  line: "oklch(0.2 0.015 285 / 0.09)",
  success: "oklch(0.52 0.12 155)",
  successBg: "oklch(0.95 0.04 155)",
};

export const EVENT = {
  name: "Startup Founders Bouldering Meetup",
  date: "Nov 6, 2026",
  weekday: "Friday",
  place: "San Francisco, CA",
  daysAway: 23,
  today: "Oct 14",
};

export const REQUIRED: { title: string; desc: string; done: boolean }[] = [
  { title: "Free or paid?", desc: "Tell us whether participants will pay to register.", done: true },
  { title: "Add an event name", desc: "Give your event a public-facing name.", done: true },
  { title: "Add a start date", desc: "Set when your event happens. End date is optional.", done: true },
  { title: "Add at least one sub-event", desc: "A 5K, 10K, or registration tier: anything participants sign up for.", done: true },
  { title: "Set when registration opens", desc: "Pick the date and time participants can start signing up.", done: false },
];

export type Rec = { title: string; desc: string; icon: string; done?: boolean; when: "promote" | "registration" | "raceday" | "after" };
export const RECOMMENDED: Rec[] = [
  { title: "Marketing photos", desc: "Upload photos to showcase your event and feature it on the home page.", icon: "camera", when: "promote" },
  { title: "Turn on performance marketing", desc: "Run ads to drive more registrations to your event.", icon: "megaphone", when: "promote" },
  { title: "Referrals", desc: "Incentivize participants to refer their friends.", icon: "share", when: "promote" },
  { title: "Photo albums", desc: "Upload photos from your event to share with participants.", icon: "image", when: "after" },
  { title: "Strava integration", desc: "Auto-share signup, training, and results to participants’ Strava.", icon: "activity", when: "after" },
  { title: "Add course maps", desc: "Show athletes what they’re signing up for.", icon: "map", when: "raceday" },
  { title: "Invite admins", desc: "Get help from your team.", icon: "userPlus", when: "raceday" },
  { title: "Add merchandise", desc: "Sell t-shirts, hats, and more.", icon: "shirt", when: "registration" },
  { title: "Add donation categories", desc: "Raise more money for your cause.", icon: "heart", when: "registration" },
  { title: "Set up teams", desc: "Let participants form and join teams to compete or fundraise together.", icon: "users", when: "registration" },
  { title: "Coupons and discount codes", desc: "Create discount codes to promote your event.", icon: "ticket", when: "promote" },
  { title: "Manage volunteers", desc: "Recruit and organize volunteers through the platform.", icon: "hand", when: "raceday" },
  { title: "Add tags", desc: "Tag your event so it’s easier to find and group.", icon: "tag", when: "promote" },
  { title: "Set up transfers", desc: "Decide whether participants can transfer their registration, and whether to charge a fee.", icon: "repeat", when: "registration" },
  { title: "Assign bibs", desc: "Assign bib numbers, or set them to auto-assign as registrations come in.", icon: "hash", when: "raceday" },
  { title: "Manage waivers", desc: "Create and manage liability waivers and photo releases for your event participants.", icon: "file", when: "registration" },
  { title: "Add sponsors", desc: "Showcase sponsor logos on your event page.", icon: "award", when: "promote" },
  { title: "Switch to your own payment account", desc: "Funds from this event are being held until you switch the pay-out to your own account.", icon: "wallet", done: true, when: "registration" },
];
export const REQ_DONE = REQUIRED.filter((r) => r.done).length; // 4
export const DONE = REQ_DONE + RECOMMENDED.filter((r) => r.done).length; // 5
export const TOTAL = REQUIRED.length + RECOMMENDED.length; // 23
export const NEXT = REQUIRED.find((r) => !r.done)!;

const P: Record<string, string> = {
  camera: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  megaphone: "M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1zM16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14",
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  image: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  userPlus: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6",
  shirt: "M20.4 6.6 16 4a4 4 0 0 1-8 0L3.6 6.6a1 1 0 0 0-.5 1.2l1 3a1 1 0 0 0 1.1.7L7 11v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-9l1.8.5a1 1 0 0 0 1.1-.7l1-3a1 1 0 0 0-.5-1.2z",
  heart: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  ticket: "M3 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zM13 5v2M13 17v2M13 11v2",
  hand: "M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15",
  tag: "M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4zM7.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z",
  repeat: "m17 2 4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3",
  hash: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15l2 2 4-4",
  award: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.2 13.9 7 23l5-3 5 3-1.2-9.1",
  wallet: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  menu: "M4 6h16M4 12h16M4 18h16",
  circleDashed: "M10.1 2.2a9.9 9.9 0 0 1 3.8 0M17.6 3.7a10 10 0 0 1 2.7 2.7M21.8 10.1a9.9 9.9 0 0 1 0 3.8M20.3 17.6a10 10 0 0 1-2.7 2.7M13.9 21.8a9.9 9.9 0 0 1-3.8 0M6.4 20.3a10 10 0 0 1-2.7-2.7M2.2 13.9a9.9 9.9 0 0 1 0-3.8M3.7 6.4a10 10 0 0 1 2.7-2.7",
  alert: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  checkCircle: "M21.8 10A10 10 0 1 1 17 3.3M9 11l3 3L22 4",
  collapse: "M12 4v16M3 12h6M6 9l-3 3 3 3M21 12h-6M18 9l3 3-3 3",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z",
  play: "M7 5v14l11-7z",
  pause: "M8 5v14M16 5v14",
  eyeOff: "M10.7 5.1A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a18 18 0 0 1-2.2 3.2M6.6 6.6C3.9 8.3 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2M2 2l20 20",
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8M18 2H6v7a6 6 0 0 0 12 0z",
  chevron: "m9 18 6-6-6-6",
  chevronDown: "m6 9 6 6 6-6",
  back: "m15 18-6-6 6-6",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  pencil: "M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  dollar: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  qr: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14v.01M14 20v.01M17 20h4v-3",
  copy: "M9 9h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1",
  home: "M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  layers: "M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  briefcase: "M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  settings: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  code: "m16 18 6-6-6-6M8 6l-6 6 6 6",
  flag: "M4 22V4a1 1 0 0 1 1-1h13l-2 4.5 2 4.5H5",
  rocket: "M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1zM12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2zM9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5",
  sparkle: "M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2zM19 3v4M21 5h-4",
};
export function Icon({ n, className = "size-4" }: { n: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={P[n]} />
    </svg>
  );
}

export const pressable = "transition-[transform,background-color,box-shadow] duration-150 ease-out active:scale-[0.97]";

export function SetUp({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex h-9 shrink-0 items-center rounded-lg px-3.5 text-[14px] font-semibold text-white hover:brightness-95 ${pressable} ${className}`} style={{ backgroundColor: B.accentStrong }}>
      Set up
    </button>
  );
}

const NAV: [string, string][] = [
  ["Dashboard", "home"], ["CRM", "user"], ["Events", "calendar"], ["Groups", "users"], ["Series", "layers"],
  ["Sponsors", "briefcase"], ["Communications", "message"], ["Financials", "dollar"], ["Settings", "settings"], ["API", "code"],
];
const TABS = ["Insights", "Event Page", "Registration", "Promotions", "Commerce", "Communication & Marketing", "Race Day", "Service Fee", "Admin"];
// The real quick actions from the recording, kept and grouped; preview + edit get labels.
// (link + pencil moved next to the event URL under the title)
const TOOLS: [string, string][] = [["search", "Search participants"], ["users", "Participants"], ["dollar", "Financials"], ["qr", "Download QR code"], ["copy", "Duplicate event"]];

// Tooltip: first one waits 400ms, neighbours open instantly while the user is scanning (warm for 300ms).
let lastHide = 0;
export function Tip({ label, children, className = "", side = "bottom", wrap = false }: { label: string; children: React.ReactElement<React.HTMLAttributes<HTMLElement>>; className?: string; side?: "bottom" | "right"; wrap?: boolean }) {
  const [open, setOpenState] = useState(false);
  const isOpen = useRef(false);
  const setOpen = (v: boolean) => {
    isOpen.current = v;
    setOpenState(v);
  };
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();
  const show = (now = false) => {
    clearTimeout(timer.current);
    if (now || Date.now() - lastHide < 300) setOpen(true);
    else timer.current = setTimeout(() => setOpen(true), 400);
  };
  const hide = () => {
    clearTimeout(timer.current);
    if (isOpen.current) lastHide = Date.now();
    setOpen(false);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <span
      className={`relative flex ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={hide}
      onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && show(true)}
      onBlur={hide}
      onKeyDown={(e) => e.key === "Escape" && hide()}
    >
      {cloneElement(children, { "aria-describedby": open ? id : undefined })}
      {open && (
        <span
          id={id}
          role="tooltip"
          className={`pointer-events-none absolute z-40 rounded-md px-2 py-1 text-[12px] font-medium text-white ${wrap ? "w-max max-w-[240px] whitespace-normal leading-snug" : "whitespace-nowrap"} ${side === "right" ? "mm-tip-r left-full top-1/2 ml-2 -translate-y-1/2" : "mm-tip left-1/2 top-full mt-2 -translate-x-1/2"}`}
          style={{ backgroundColor: B.ink }}
        >
          {label}
        </span>
      )}
    </span>
  );
}

function Nav({ compact = false }: { compact?: boolean }) {
  return (
    <nav aria-label="Organizer">
      {NAV.map(([n, ic]) => {
        const link = (
        <a
          key={n}
          href="#"
          aria-current={n === "Events" ? "page" : undefined}
          className={`mb-0.5 flex items-center gap-3 rounded-lg py-2 text-[14px] font-medium ${compact ? "justify-center px-0" : "px-3"}`}
          style={n === "Events" ? { backgroundColor: B.accentTint, color: B.accentStrong } : { color: B.muted }}
        >
          <Icon n={ic} /> <span className={compact ? "sr-only" : ""}>{n}</span>
        </a>
        );
        return compact ? <Tip key={n} label={n} side="right" className="mb-0.5 flex [&>a]:mb-0 [&>a]:w-full">{link}</Tip> : link;
      })}
    </nav>
  );
}

// Desktop: full sidebar. Tablet (md–lg): icon rail. Phone: ☰ opens a drawer.
export function Shell({ children, pill, url, title = EVENT.name }: { children: React.ReactNode; pill: React.ReactNode; url: React.ReactNode; title?: string }) {
  const [menu, setMenu] = useState(false);
  // desktop sidebar can be condensed to the icon rail, like Movemint's own ←|→ toggle
  const [rail, setRail] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [menu]);
  return (
    <div className="min-h-dvh overflow-x-clip bg-white" style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif", color: B.ink }}>
      <header className="flex h-14 items-center justify-between gap-4 px-4 sm:h-16 sm:px-8" style={{ borderBottom: `1px solid ${B.line}` }}>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)} className="-ml-2 flex size-10 items-center justify-center rounded-lg md:hidden" style={{ color: B.ink }}>
            <Icon n="menu" className="size-5" />
          </button>
          {/* Movemint's own wordmark, unchanged */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/movemint-logo.png" alt="Movemint" width={432} height={74} className="h-[22px] w-auto sm:h-[26px]" />
        </div>
        <nav className="flex items-center gap-5 text-[14px] sm:gap-8">
          <span className="hidden lg:inline">Resources</span>
          <span className="hidden lg:inline">Organizer Dashboard</span>
          <span className="font-medium" style={{ color: B.accentStrong }}>Create Event</span>
          <span className="flex size-9 items-center justify-center rounded-full" style={{ backgroundColor: B.surface, color: B.muted }}><Icon n="user" /></span>
        </nav>
      </header>
      <div className="flex">
        <aside className={`hidden w-[68px] shrink-0 px-3 pt-4 md:block ${rail ? "" : "lg:w-[232px]"}`} style={{ borderRight: `1px solid ${B.line}` }}>
          {/* the toggle exists where there's a choice: on tablets the rail is the only option */}
          <div className={`mb-2 hidden lg:flex ${rail ? "justify-center" : "justify-end"}`}>
            <Tip label={rail ? "Expand sidebar" : "Collapse sidebar"} side="right">
              <button
                type="button"
                aria-label={rail ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!rail}
                onClick={() => setRail((r) => !r)}
                className="mm-tool flex size-9 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-[oklch(0.975_0.004_285)]"
                style={{ color: B.muted }}
              >
                <Icon n="collapse" className="size-[18px]" />
              </button>
            </Tip>
          </div>
          <div className={rail ? "" : "lg:hidden"}><Nav compact /></div>
          {!rail && <div className="hidden lg:block"><Nav /></div>}
        </aside>
        {menu && (
          <div className="fixed inset-0 z-50 bg-[oklch(0.2_0.015_285/0.3)] md:hidden" onClick={() => setMenu(false)}>
            <div role="dialog" aria-modal="true" aria-label="Menu" onClick={(e) => e.stopPropagation()} className="mm-drawer absolute inset-y-0 left-0 w-[272px] bg-white px-3 pt-4">
              <div className="mb-4 flex items-center justify-between px-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/deck/movemint-logo.png" alt="Movemint" width={432} height={74} className="h-[22px] w-auto" />
                <button type="button" aria-label="Close menu" onClick={() => setMenu(false)} className="flex size-10 items-center justify-center rounded-lg" style={{ color: B.muted }}><Icon n="x" /></button>
              </div>
              <Nav />
              <div className="mt-4 grid gap-1 px-3 pt-4 text-[14px]" style={{ borderTop: `1px solid ${B.line}`, color: B.muted }}>
                <span className="py-2">Resources</span>
                <span className="py-2">Organizer Dashboard</span>
              </div>
            </div>
          </div>
        )}
        <main className="min-w-0 flex-1 px-4 pb-32 pt-5 sm:px-6 lg:px-10 lg:pt-6">
          <p className="flex items-center gap-1 text-[13px]" style={{ color: B.muted }}><Icon n="back" className="size-3.5" /> All events</p>
          {/* title + status + URL on the left, quick actions on the right (where the original kept its icons); they wrap under it when narrow */}
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="min-w-0 lg:flex-1">
              {/* the status follows the last word of the title, however many lines it wraps to */}
              <div>
                <h1 className="inline text-[24px] font-bold leading-tight tracking-[-0.015em] sm:text-[30px]">{title}</h1>
                <span className="ml-3 inline-block align-[0.3em] sm:align-[0.4em]">{pill}</span>
              </div>
              {url}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex rounded-lg" style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
                {TOOLS.map(([ic, l], i) => (
                  <Tip key={ic} label={l} className="first:[&>button]:rounded-l-lg last:[&>button]:rounded-r-lg">
                    <button type="button" aria-label={l} className="mm-tool flex size-10 items-center justify-center hover:bg-[oklch(0.975_0.004_285)] sm:size-9" style={{ color: B.muted, borderLeft: i ? `1px solid ${B.line}` : undefined }}>
                      <Icon n={ic} />
                    </button>
                  </Tip>
                ))}
              </div>
              <button type="button" className={`inline-flex h-10 items-center gap-2 rounded-lg px-3 text-[13px] font-semibold sm:h-9 ${pressable}`} style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>
                <Icon n="eye" /> Preview
              </button>
            </div>
          </div>
          {/* tabs scroll sideways on narrow screens instead of wrapping */}
          <div className="-mx-4 mt-5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0" style={{ borderBottom: `1px solid ${B.line}` }}>
            <div className="flex w-max gap-6 text-[14px]" style={{ color: B.muted }}>
              {TABS.map((t) => (
                <span key={t} className="whitespace-nowrap pb-2.5" style={t === "Insights" ? { color: B.ink, fontWeight: 600, boxShadow: `inset 0 -2px 0 ${B.ink}` } : undefined}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          {children}
        </main>
      </div>
      <button type="button" aria-label="Movemint AI" className="mm-ai fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 flex items-center gap-2 rounded-full p-3 text-[14px] font-semibold text-white sm:bottom-6 sm:right-6 sm:px-5">
        <span className="mm-ai-icon"><Icon n="sparkle" /></span> <span className="hidden sm:inline">Movemint AI</span>
      </button>
    </div>
  );
}

// Overview / Checkout dashboard, shared by all variants.
export function SubTabs({ cur, onChange }: { cur: number; onChange: (i: number) => void }) {
  return (
    <div role="tablist" aria-label="Insights views" className="mt-5 inline-flex rounded-lg p-1" style={{ backgroundColor: B.surface }}>
      {["Overview", "Checkout dashboard"].map((t, i) => (
        <button
          key={t}
          type="button"
          role="tab"
          aria-selected={cur === i}
          onClick={() => onChange(i)}
          className="h-8 rounded-md px-3 text-[13px] font-medium transition-colors duration-150"
          style={cur === i ? { backgroundColor: "white", boxShadow: `0 1px 2px ${B.line}, 0 0 0 1px ${B.line}` } : { color: B.muted }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
