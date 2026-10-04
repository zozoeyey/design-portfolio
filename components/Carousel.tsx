"use client";

import { useEffect, useState } from "react";

/**
 * Small auto-advancing image carousel with dots and arrows.
 * Slides crossfade every `interval` ms; pauses on hover; respects reduced motion.
 */
export default function Carousel({
  images,
  alt = "",
  interval = 3500,
  className = "",
}: {
  images: string[];
  alt?: string;
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [paused, images.length, interval]);

  const go = (d: number) => setI((v) => (v + d + images.length) % images.length);

  return (
    <div
      className={`group/car relative overflow-hidden rounded-lg bg-white ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] w-full">
        {images.map((src, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out ${
              k === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => { e.preventDefault(); go(-1); }}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-sm transition-opacity group-hover/car:opacity-100"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => { e.preventDefault(); go(1); }}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-sm transition-opacity group-hover/car:opacity-100"
          >
            →
          </button>
        </>
      )}

      {/* dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Go to image ${k + 1}`}
              onClick={(e) => { e.preventDefault(); setI(k); }}
              className={`h-1.5 rounded-full transition-[width,background-color] ${
                k === i ? "w-4 bg-accent" : "w-1.5 bg-black/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
