"use client";

import { useState } from "react";

/**
 * Hobby "polaroid": a slightly tilted photo card that flips on hover (or tap)
 * to reveal the story on a lavender halftone back. Each card owns its own
 * state, so cards flip independently.
 */
export default function HobbyCard({
  name,
  body,
  images,
  index,
}: {
  name: string;
  body: string;
  images: string[];
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const flipped = hover || pinned;
  const tilt = index % 2 === 0 ? -2 : 1.5;

  return (
    <button
      type="button"
      aria-pressed={pinned}
      aria-label={`${name} — flip to read more`}
      onClick={() => setPinned((p) => !p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="block w-full text-left outline-none transition-transform duration-500"
      style={{
        perspective: "1400px",
        transform: `rotate(${flipped ? 0 : tilt}deg)`,
      }}
    >
      <div
        className="relative aspect-[4/5] w-full transition-transform sm:aspect-[4/3] lg:aspect-[16/10] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front: photo with a polaroid-ish bottom strip */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white-50 p-3 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="relative flex-1 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[0]} alt={name} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex items-end justify-between px-2 pb-0.5 pt-3">
            <span className="font-serif text-heading italic text-black">{name}</span>
            <span className="mb-1 text-xs uppercase tracking-[0.14em] text-accent-strong">flip ↻</span>
          </div>
        </div>

        {/* Back: story on lavender halftone */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-accent/40 bg-[rgb(246,243,255)] p-6 sm:p-8"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(var(--accent) 1.1px, transparent 1.3px)",
              backgroundSize: "12px 12px",
              maskImage: "radial-gradient(80% 60% at 80% 100%, #000 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(80% 60% at 80% 100%, #000 0%, transparent 100%)",
            }}
          />
          <span className="relative font-serif text-heading italic text-black">{name}</span>
          <p className="relative mt-3 overflow-y-auto pr-1 text-base leading-relaxed text-gray-700 lg:max-w-[60ch]">
            {body}
          </p>
        </div>
      </div>
    </button>
  );
}
