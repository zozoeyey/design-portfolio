"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// Deck controls. Two decks in one page (ValueGlance / Canmarket) and two views:
//  - Present (default): one slide fills the window; ←/→, Space, PageUp/Down, Home/End, swipe; F = fullscreen.
//  - Scroll: every slide stacked, as before (handy for printing or html-to-design).
// State lives in the URL — ?deck=vg|cm, ?view=scroll, #<slide> — so any slide has its own link.
// Slide changes are instant on purpose: they're keyboard-driven and happen dozens of times a talk.
const TABS = [
  ["vg", "ValueGlance"],
  ["cm", "Canmarket.ai"],
] as const;
type Tab = (typeof TABS)[number][0];
const SHOW_TABS = false;
type View = "present" | "scroll";

function slidesFor(tab: Tab): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>(".deck section.slide")].filter((s) => {
    const part = s.closest<HTMLElement>("[data-part]")?.dataset.part;
    return !part || part === tab;
  });
}

export default function DeckTabs() {
  const [tab, setTab] = useState<Tab | null>(null);
  const [view, setView] = useState<View>("present");
  const [idx, setIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [idle, setIdle] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const pill = useRef<HTMLSpanElement>(null);
  const bc = useRef<BroadcastChannel | null>(null);
  const last = useRef<object | null>(null);

  // initial state from the URL
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const n = parseInt(location.hash.slice(1), 10);
    /* eslint-disable react-hooks/set-state-in-effect */
    setTab(q.get("deck") === "cm" ? "cm" : "vg");
    setView(q.get("view") === "scroll" ? "scroll" : "present");
    if (n > 0) setIdx(n - 1);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // apply tab + view + current slide to the DOM and the URL
  useLayoutEffect(() => {
    if (!tab) return;
    const deck = document.querySelector<HTMLElement>(".deck");
    if (!deck) return;
    deck.dataset.show = tab;
    deck.dataset.mode = view;
    deck.dataset.ready = "";
    const list = slidesFor(tab);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(list.length);
    const i = Math.min(idx, list.length - 1);
    document.querySelectorAll(".deck section.slide[data-current]").forEach((s) => s.removeAttribute("data-current"));
    list.forEach((s, k) => s.querySelector(".slide-no")?.setAttribute("data-n", String(k + 1)));
    list[i]?.setAttribute("data-current", "");
    const url = new URL(location.href);
    url.searchParams.set("deck", tab);
    if (view === "scroll") url.searchParams.set("view", "scroll");
    else url.searchParams.delete("view");
    url.hash = view === "present" ? String(i + 1) : "";
    history.replaceState(null, "", url);
    last.current = { type: "state", tab, i, count: list.length, key: slideKey(list[i], tab), title: slideTitle(list[i]), next: slideTitle(list[i + 1]) };
    bc.current?.postMessage(last.current);
    const el = refs.current[TABS.findIndex(([k]) => k === tab)];
    if (el && pill.current) {
      pill.current.style.width = `${el.offsetWidth}px`;
      pill.current.style.transform = `translateX(${el.offsetLeft}px)`;
    }
  }, [tab, view, idx]);

  const go = useCallback((d: number | "first" | "last") => {
    setIdx((i) => {
      const max = Math.max(0, count - 1);
      if (d === "first") return 0;
      if (d === "last") return max;
      return Math.min(max, Math.max(0, i + d));
    });
  }, [count]);

  // presenter notes window: same-origin channel; it can drive the deck and asks for state when it opens
  useEffect(() => {
    const ch = new BroadcastChannel("zy-deck");
    bc.current = ch;
    ch.onmessage = (e) => {
      const m = e.data;
      if (m?.type === "go") go(m.d);
      if (m?.type === "hello" && last.current) ch.postMessage(last.current);
    };
    return () => ch.close();
  }, [go]);

  // Auto-hide, Keynote/video-player style: the bar comes back when the mouse
  // moves and fades out two seconds after it stops. A plain :hover would need
  // either an invisible strip along the bottom edge — which swallows clicks on
  // slide content — or a bar at opacity 0 that nobody can find.
  // Deliberately NOT woken by slide changes: arrow keys fire dozens of times
  // in a talk, and the slide carries its own number (.slide-no) anyway.
  useEffect(() => {
    if (view !== "present") return;
    let t: ReturnType<typeof setTimeout>;
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 2000);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") wake();
    };
    wake();
    window.addEventListener("pointermove", onMove);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointermove", onMove);
    };
  }, [view]);

  // keyboard + swipe (present view only)
  useEffect(() => {
    if (view !== "present") return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(1); }
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === "Home") { e.preventDefault(); go("first"); }
      else if (e.key === "End") { e.preventDefault(); go("last"); }
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
      else if (e.key === "n" || e.key === "N") openNotes();
    };
    let x0: number | null = null;
    const down = (e: PointerEvent) => { if (e.pointerType !== "mouse") x0 = e.clientX; };
    const up = (e: PointerEvent) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
    };
  }, [view, go]);

  const choose = (k: Tab) => {
    if (k === tab) return;
    setTab(k);
    setIdx(0);
    window.scrollTo({ top: 0 });
  };
  const switchView = () => {
    setView((v) => (v === "present" ? "scroll" : "present"));
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="deck-bar" data-view={view} data-idle={idle ? "" : undefined}>
      {view === "present" && (
        <div className="deck-bar-group">
          <button type="button" className="deck-icon-btn" aria-label="Previous slide" onClick={() => go(-1)} disabled={idx === 0}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <span className="deck-count" aria-live="polite">
            {Math.min(idx + 1, count)} <span className="opacity-50">/ {count}</span>
          </span>
          <button type="button" className="deck-icon-btn" aria-label="Next slide" onClick={() => go(1)} disabled={idx >= count - 1}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
      {/* Deck switch hidden for now; ?deck=cm still opens the Canmarket deck. Flip SHOW_TABS to bring it back. */}
      {SHOW_TABS && (
      <nav aria-label="Choose deck" className="deck-tabs">
        <span ref={pill} aria-hidden="true" className="deck-tabs-pill" />
        {TABS.map(([k, label], i) => (
          <button
            key={k}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            aria-pressed={tab === k}
            data-active={tab === k ? "" : undefined}
            onClick={() => choose(k)}
            className="deck-tabs-item"
          >
            {label}
          </button>
        ))}
      </nav>
      )}
      <div className="deck-bar-group">
        {view === "present" && (
          <button type="button" className="deck-icon-btn" aria-label="Fullscreen (F)" title="Fullscreen (F)" onClick={toggleFullscreen}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
          </button>
        )}
        <button
          type="button"
          className="deck-icon-btn"
          aria-label={view === "present" ? "Show all slides" : "Present one slide at a time"}
          title={view === "present" ? "Show all slides" : "Present"}
          onClick={switchView}
        >
          {view === "present" ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v5H4zM4 14h16v5H4z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM10 9.5v5l4.5-2.5z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}

// Slide identity for notes: deck + the slide's own heading (stable even when slides are reordered).
export function slideTitle(el?: HTMLElement) {
  if (!el) return "";
  // skip decorative copies (e.g. the blurred board behind the V1/V2/Final focus slides)
  const h = [...el.querySelectorAll("h2, .s-h, .s-display")].find((n) => !n.closest('[aria-hidden="true"]'));
  // join child nodes with spaces so "<span>Feature 1</span>Title" reads "Feature 1 Title"
  return Array.from(h?.childNodes ?? []).map((n) => n.textContent).join(" ").replace(/\s+/g, " ").trim();
}
function slideKey(el: HTMLElement | undefined, tab: Tab) {
  if (!el) return "";
  const part = el.closest<HTMLElement>("[data-part]")?.dataset.part ?? "shared";
  const title = slideTitle(el);
  // repeated titles (e.g. two "Iterate to final version") get #2, #3 …
  const same = slidesFor(tab).filter((s) => (s.closest<HTMLElement>("[data-part]")?.dataset.part ?? "shared") === part && slideTitle(s) === title);
  const n = same.indexOf(el) + 1;
  return `${part}:${title}${n > 1 ? ` #${n}` : ""}`;
}

function openNotes() {
  window.open("/deck/notes", "zy-deck-notes", "popup,width=720,height=820");
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  else document.documentElement.requestFullscreen().catch(() => {});
}
