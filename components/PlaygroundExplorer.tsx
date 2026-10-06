"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getProject, type PlaygroundItem } from "@/lib/data";
import CaseStudy from "@/components/CaseStudy";
import DemoVideo from "@/components/DemoVideo";
import { HalftoneMark } from "@/components/SectionLabel";
import { tagColors } from "@/lib/ui";

/**
 * Playground on large screens: a list of pieces on the left (name, tag/year,
 * and room for a description), a big preview on the right. Click or ↑/↓
 * selects (hover only previews the affordance). Pieces with an internal case study render it right in
 * the preview (scrollable, expandable to near-fullscreen); pieces with an
 * `embed` URL show the live page; the rest show their image.
 */

const CATEGORIES: { key: PlaygroundItem["category"]; title: string }[] = [
  { key: "product-design", title: "Product design" },
  { key: "physical-ai", title: "Physical AI" },
  { key: "coding", title: "Coding" },
  { key: "graphic-design", title: "Graphic design" },
];

// "/work/mixvox" → case study; external → host + path, like a browser bar
function address(link: string) {
  if (link.startsWith("/")) return `Case study · ${link}`;
  try {
    const u = new URL(link);
    const path = u.pathname.replace(/\/$/, "");
    return u.host + (path && path.length < 24 ? path : "");
  } catch {
    return link;
  }
}

export default function PlaygroundExplorer({ items, intro }: { items: PlaygroundItem[]; intro?: React.ReactNode }) {
  // list order = category order, so ↑/↓ follow what's on screen
  const ordered = CATEGORIES.flatMap((c) => items.filter((i) => i.category === c.key));
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const item = ordered[active];
  const internal = item.link.startsWith("/");
  const caseStudy = internal ? getProject(item.link.replace(/^\/work\//, "")) : undefined;

  // Expanded = the preview grows to (nearly) fill the window. Esc collapses;
  // page scroll is locked meanwhile.
  const [expanded, setExpanded] = useState(false);
  const expandBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
        expandBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  // Mount the live embed only after the selection has rested for a moment,
  // so sweeping the cursor down the list doesn't fire a page load per row.
  const [settled, setSettled] = useState<string | null>(null);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!item.embed) return;
    const t = setTimeout(() => setSettled(item.slug), 300);
    return () => clearTimeout(t);
  }, [item.slug, item.embed]);
  const showEmbed = !!item.embed && settled === item.slug;

  // Embeds render at a desktop width and are scaled down to fit the stage,
  // so sites built for a full browser window aren't cropped.
  const EMBED_WIDTH = 1600; // the Dream sketch draws at fixed x up to ~1560px
  const stage = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scale = box.w ? box.w / EMBED_WIDTH : 1;
  // Phone frame: a 390×844 viewport scaled to fit the stage height.
  const PHONE = { w: 390, h: 844 };
  const phoneScale = box.h ? Math.min(1, (box.h - 64) / PHONE.h) : 1;
  const phone = item.embedFrame === "phone";
  const embedLoaded = loadedFor === item.slug;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowDown" ? 1 : -1) + ordered.length) % ordered.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,7fr)] items-start gap-10">
      {/* Title + list */}
      <div>
        {intro}
        <div onKeyDown={onKeyDown} className={intro ? "mt-12" : ""}>
        {CATEGORIES.map((c) => {
          const group = ordered.map((it, i) => ({ it, i })).filter(({ it }) => it.category === c.key);
          if (!group.length) return null;
          return (
            <div key={c.key} className="mt-10 first:mt-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{c.title}</p>
              <ul className="mt-3 flex flex-col gap-1">
                {group.map(({ it, i }) => {
                  const on = i === active;
                  return (
                    <li key={it.slug}>
                      <button
                        ref={(el) => {
                          buttons.current[i] = el;
                        }}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={on}
                        aria-controls="playground-preview"
                        className={`group relative w-full rounded-2xl py-5 pl-10 pr-5 text-left outline-offset-2 transition-[background-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-accent-strong active:scale-[0.99] ${
                          on
                            ? "bg-[color-mix(in_oklab,var(--accent)_10%,var(--white-100))]"
                            : "hover:bg-black/[0.025]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute left-4 top-[1.55rem] transition-opacity duration-200 ${on ? "opacity-100" : "opacity-0"}`}
                        >
                          <HalftoneMark size={14} />
                        </span>
                        <span className="flex items-baseline justify-between gap-4">
                          <span className={`text-lg font-bold leading-snug tracking-tight transition-colors duration-150 ${on ? "text-black" : "text-gray-700 group-hover:text-black"}`}>{it.name}</span>
                          <span className="shrink-0 text-sm tabular-nums text-gray-500">{it.year}</span>
                        </span>
                        <span className="mt-2 block max-w-[52ch] text-base leading-relaxed text-gray-500">
                          {it.summary}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        </div>
      </div>

      {/* Preview (expanded: fixed over the page with a dimmed backdrop) */}
      {expanded && (
        <div aria-hidden="true" className="fixed inset-0 z-[60] bg-black/20" onClick={() => setExpanded(false)} />
      )}
      <div
        id="playground-preview"
        aria-live="polite"
        role={expanded ? "dialog" : undefined}
        aria-modal={expanded || undefined}
        aria-label={expanded ? item.name : undefined}
        className={`glass-card flex flex-col overflow-hidden rounded-[2rem] ${
          expanded
            ? "fixed inset-3 z-[61] bg-white sm:inset-5"
            : "sticky top-28 h-[calc(100dvh-8.5rem)] min-h-[32rem]"
        }`}
      >
        {/* address bar */}
        <div className="flex items-center gap-2 border-b border-black/5 py-3 pl-3 pr-6">
          <button
            ref={expandBtn}
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Exit full screen" : "Expand to full screen"}
            title={expanded ? "Exit full screen (Esc)" : "Expand"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-700 transition-colors duration-150 hover:bg-white hover:text-black"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {expanded ? (
                <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
              ) : (
                <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
              )}
            </svg>
          </button>
          <span className="flex-1 truncate text-sm tabular-nums text-gray-500">{item.video ? `${item.name} · demo video` : address(item.link)}</span>
          {!item.video && (
          <a
            href={item.link}
            target={internal ? undefined : "_blank"}
            rel={internal ? undefined : "noopener noreferrer"}
            aria-label={`Open ${item.name}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-700 transition-colors duration-150 hover:bg-white hover:text-black"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
          )}
        </div>

        {/* stage: live embed (with a terminal-style loading line), or the image on a tinted plate */}
        <div
          ref={stage}
          className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden p-8"
          style={{
            backgroundColor: item.embed ? "var(--white-100)" : `color-mix(in oklab, ${item.color} 12%, var(--white-100))`,
          }}
        >
          {item.video ? (
            <DemoVideo key={item.slug} src={item.video} poster={item.image} color={item.color} label={`${item.name} demo`} />
          ) : caseStudy ? (
            <div key={item.slug} className="playground-swap absolute inset-0 overflow-y-auto bg-[var(--background)]">
              <CaseStudy project={caseStudy} embedded />
            </div>
          ) : item.embed ? (
            <>
              {!embedLoaded && (
                <p className="font-mono text-sm text-gray-500" role="status">
                  &gt; loading the live site<span className="terminal-cursor">_</span>
                </p>
              )}
              {showEmbed && !phone && (
                <iframe
                  key={item.embed}
                  src={item.embed}
                  title={`${item.name}, live`}
                  onLoad={() => setLoadedFor(item.slug)}
                  allow="fullscreen; autoplay"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`absolute left-0 top-0 origin-top-left bg-white transition-opacity duration-300 ${
                    embedLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    width: EMBED_WIDTH,
                    height: box.h / scale,
                    transform: `scale(${scale})`,
                  }}
                />
              )}
              {showEmbed && phone && (
                <div
                  className={`relative shrink-0 overflow-hidden rounded-[2.75rem] border-[8px] border-white bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_48px_-20px_rgba(20,30,40,0.35)] transition-opacity duration-300 ${
                    embedLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ width: PHONE.w * phoneScale + 16, height: PHONE.h * phoneScale + 16 }}
                >
                  <iframe
                    key={item.embed}
                    src={item.embed}
                    title={`${item.name}, live`}
                    onLoad={() => setLoadedFor(item.slug)}
                    className="absolute left-0 top-0 origin-top-left bg-white"
                    style={{ width: PHONE.w, height: PHONE.h, transform: `scale(${phoneScale})` }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(${item.color} 1.1px, transparent 1.3px)`,
                  backgroundSize: "14px 14px",
                  WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%)",
                  maskImage: "radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%)",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={item.slug}
                src={item.image}
                alt={item.name}
                className="playground-swap relative max-h-full max-w-full rounded-2xl object-contain shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_48px_-20px_rgba(20,20,40,0.35)]"
              />
            </>
          )}
        </div>

        {/* footer: name, tag, one action (embeds open from the address bar instead) */}
        {!item.embed && !caseStudy && !item.video && (
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="truncate font-bold text-black">{item.name}</span>
            <span className="shrink-0 rounded-full px-3 py-1 text-xs font-bold" style={tagColors(item.color)}>
              {item.tag}
            </span>
          </div>
          {internal ? (
            <Link
              href={item.link}
              className="glass-dark inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm text-white transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
            >
              Read case study →
            </Link>
          ) : (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm text-white transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
            >
              View project ↗
            </a>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
