"use client";

import { useEffect, useRef } from "react";

/**
 * Static halftone glow: a soft elliptical "light" rendered as a dot grid,
 * used behind the dark footer. Dots are largest in the center and fade to
 * nothing at the edges. Renders once (and on resize) — no animation.
 */
export default function HalftoneGlow({
  color = "rgb(132, 108, 212)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 13;

    function draw() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width, h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = w * 0.5, cy = h * 0.5;
      const rx = w * 0.38, ry = h * 0.6;
      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = color;
      for (let y = SPACING / 2; y < h; y += SPACING) {
        for (let x = SPACING / 2; x < w; x += SPACING) {
          const nx = (x - cx) / rx, ny = (y - cy) / ry;
          const v = Math.exp(-(nx * nx + ny * ny) * 2.2);
          if (v < 0.03) continue;
          ctx!.globalAlpha = 0.2 + 0.65 * v;
          ctx!.beginPath();
          ctx!.arc(x, y, v * SPACING * 0.4, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [color]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
