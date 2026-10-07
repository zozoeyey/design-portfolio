"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Two decks in one page: a segmented toggle swaps which project's slides show.
// The choice lives in the URL (?deck=vg | ?deck=cm), so each tab has its own link.
const TABS = [
  ["vg", "ValueGlance"],
  ["cm", "Canmarket.ai"],
] as const;
type Tab = (typeof TABS)[number][0];

export default function DeckTabs() {
  const [tab, setTab] = useState<Tab | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const pill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("deck");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTab(q === "cm" ? "cm" : "vg");
  }, []);

  useLayoutEffect(() => {
    if (!tab) return;
    document.querySelector(".deck")?.setAttribute("data-show", tab);
    const url = new URL(location.href);
    url.searchParams.set("deck", tab);
    history.replaceState(null, "", url);
    const el = refs.current[TABS.findIndex(([k]) => k === tab)];
    if (el && pill.current) {
      pill.current.style.width = `${el.offsetWidth}px`;
      pill.current.style.transform = `translateX(${el.offsetLeft}px)`;
    }
  }, [tab]);

  const choose = (k: Tab) => {
    if (k === tab) return;
    setTab(k);
    window.scrollTo({ top: 0 });
  };

  return (
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
  );
}
