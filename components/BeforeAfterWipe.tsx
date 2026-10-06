"use client";

import { useState } from "react";

/**
 * Canmarket.ai story 2 ("Less polish. More principle."): drag-to-compare
 * before/after of the onboarding. Before is clipped over After; a full-size
 * invisible range input drives it (pointer + arrow keys).
 */

const BEFORE = {
  img: "/media/canmarket/onboarding-before.jpg",
  alt: "Before: a campaign builder asking for five long, free-text core selling points",
  caption: "Five free-text selling points to write before anything happens.",
};
const AFTER = {
  img: "/media/canmarket/onboarding-after.jpg",
  alt: "After: pick one of seven business models with a single tap",
  caption: "One tap to pick a business model, then straight to the first AI result.",
};
export default function BeforeAfterWipe({ color }: { color: string }) {
  const [pos, setPos] = useState(50);
  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2),0_24px_48px_-24px_rgba(0,0,0,0.5)] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AFTER.img} alt={AFTER.alt} className="block w-full select-none" draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BEFORE.img} alt={BEFORE.alt} draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
          </span>
        </div>
        <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">Before</span>
        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: color }}>After</span>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare before and after" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
      </div>
      <figcaption className="mt-5 grid gap-4 text-[rgb(198,198,210)] md:grid-cols-2">
        <p><span className="font-bold text-white">Before.</span> {BEFORE.caption}</p>
        <p><span className="font-bold text-white">After.</span> {AFTER.caption}</p>
      </figcaption>
    </figure>
  );
}
