"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating "Contents" pill for case studies (bottom-right). Shows where you
 * are ("4 / 10 · Feature #2"); opens a panel listing every section, with
 * features and story chapters indented. Sections come from the page as
 * { id, label, level } — each id must exist on a heading in the page.
 */
export type ContentsSection = { id: string; label: string; level: 1 | 2 };

const READING_LINE = 0.3; // fraction of the viewport height

export default function CaseStudyContents({ sections }: { sections: ContentsSection[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Track the section under the reading line.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id));
    const onScroll = () => {
      const line = window.innerHeight * READING_LINE;
      let idx = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  // Esc / outside click close; focus the current item on open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!panel.current?.contains(e.target as Node) && !btn.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    panel.current?.querySelector<HTMLButtonElement>("[aria-current]")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const go = (i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(sections[i].id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setOpen(false);
  };

  if (!sections.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open && (
        <div
          ref={panel}
          id="case-study-contents"
          className="contents-panel glass absolute bottom-14 right-0 max-h-[60vh] w-72 origin-bottom-right overflow-y-auto rounded-3xl p-2 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]"
        >
          <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">On this page</p>
          <ol>
            {sections.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={on ? "location" : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl py-2 pr-3 text-left transition-colors duration-150 hover:bg-white/80 ${
                      s.level === 2 ? "pl-7 text-sm text-gray-500" : "pl-3 text-base text-gray-700"
                    } ${on ? "bg-white font-bold text-black" : ""}`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: on ? "var(--accent-strong)" : "transparent" }}
                    />
                    <span className="truncate">{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}
      <button
        ref={btn}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="case-study-contents"
        aria-label={`Contents — currently ${sections[active]?.label}`}
        className="glass inline-flex min-h-11 items-center gap-2.5 rounded-full py-2 pl-4 pr-5 text-sm text-black shadow-[0_6px_20px_-10px_rgba(0,0,0,0.25)] transition-transform duration-150 active:scale-[0.97]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h10M4 17h13" />
        </svg>
        <span className="tabular-nums text-gray-500">
          {active + 1} / {sections.length}
        </span>
        <span className="max-w-[12rem] truncate font-medium">{sections[active]?.label}</span>
      </button>
    </div>
  );
}
