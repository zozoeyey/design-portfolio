"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A project demo video for the Playground preview: plays muted on a loop
 * with a control bar — play/pause, a draggable timeline, and the time.
 * Respects reduced motion by starting paused.
 */

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export default function DemoVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  color?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const wasPlaying = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {});
  }, []);

  // Smooth progress: read currentTime every frame while playing.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      if (ref.current) setTime(ref.current.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const seek = (t: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = t;
    setTime(t);
  };

  const pct = duration ? (time / duration) * 100 : 0;

  return (
    <div className="absolute inset-0 bg-black">
      <div className="playground-swap relative h-full w-full">
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onSeeked={(e) => setTime(e.currentTarget.currentTime)}
          className="block h-full w-full cursor-pointer object-cover"
        />

        {/* control bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-full bg-black/45 py-1.5 pl-1.5 pr-4 text-white backdrop-blur-md">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-150 hover:bg-white/15 active:scale-[0.94]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {playing ? (
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              ) : (
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
              )}
            </svg>
          </button>

          {/* timeline: native range for drag + keyboard, styled track on top */}
          <div className="group relative flex h-9 flex-1 items-center rounded-full outline-offset-4 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-white/80">
            <div className="pointer-events-none absolute inset-x-0 h-1 overflow-hidden rounded-full bg-white/25 transition-[height] duration-150 group-hover:h-1.5">
              <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.4)] transition-transform duration-150 group-hover:scale-110"
              style={{ left: `${pct}%` }}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={time}
              aria-label="Seek"
              aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
              onPointerDown={() => {
                wasPlaying.current = !!ref.current && !ref.current.paused;
                ref.current?.pause();
              }}
              onPointerUp={() => {
                if (wasPlaying.current) ref.current?.play().catch(() => {});
              }}
              onChange={(e) => seek(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>

          <span className="shrink-0 text-xs tabular-nums text-white/85">
            {fmt(time)} / {fmt(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
