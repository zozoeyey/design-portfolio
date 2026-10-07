"use client";

import { useEffect, useRef } from "react";

/**
 * A video that reliably autoplays. Browsers only allow autoplay when muted,
 * and server-rendered React doesn't always emit the `muted` attribute — so we
 * set it imperatively before calling play(), retry when the tab becomes
 * visible again, and (re)play whenever the video scrolls into view (some
 * browsers pause offscreen videos and don't resume them).
 */
export default function AutoVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Reduced motion: keep the poster, don't autoplay.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.autoplay = false;
      v.pause();
      return;
    }

    const tryPlay = () => {
      v.muted = true;
      v.defaultMuted = true;
      if (v.paused) v.play().catch(() => {});
    };

    tryPlay();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
      },
      { threshold: 0.1 },
    );
    io.observe(v);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
