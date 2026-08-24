"use client";

import { useEffect, useRef } from "react";

/**
 * Halftone garden: flowers (polar "rose" petal shapes) growing from the bottom
 * edge, rendered as a dot grid — dot size follows how deep inside a petal or
 * stem the sample point is. Static; re-renders on resize.
 */
type Flower = { x: number; y: number; r: number; k: number; rot: number; tone: number; stem: number };

export default function HalftoneGarden({
  colors = ["rgb(167, 139, 250)", "rgb(196, 181, 253)"],
  className = "",
}: {
  colors?: [string, string];
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const SP = 11;

    // x/y as fractions of width/height; r as fraction of height; k = petal count
    const FLOWERS: Flower[] = [
      { x: 0.06, y: 0.62, r: 0.20, k: 5, rot: 0.3, tone: 0, stem: 0.9 },
      { x: 0.17, y: 0.78, r: 0.13, k: 6, rot: 1.1, tone: 1, stem: 0.6 },
      { x: 0.30, y: 0.50, r: 0.26, k: 5, rot: 2.0, tone: 0, stem: 1.0 },
      { x: 0.42, y: 0.82, r: 0.11, k: 4, rot: 0.6, tone: 1, stem: 0.5 },
      { x: 0.55, y: 0.66, r: 0.18, k: 7, rot: 1.7, tone: 1, stem: 0.8 },
      { x: 0.68, y: 0.46, r: 0.28, k: 5, rot: 0.9, tone: 0, stem: 1.0 },
      { x: 0.80, y: 0.80, r: 0.12, k: 6, rot: 2.4, tone: 1, stem: 0.5 },
      { x: 0.92, y: 0.60, r: 0.22, k: 5, rot: 1.4, tone: 0, stem: 0.9 },
    ];

    function draw() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width, h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      const fl = FLOWERS.map((f) => ({ ...f, cx: f.x * w, cy: f.y * h, R: f.r * h }));

      for (let y = SP / 2; y < h; y += SP) {
        for (let x = SP / 2; x < w; x += SP) {
          let v0 = 0, v1 = 0;
          for (const f of fl) {
            const dx = x - f.cx, dy = y - f.cy;
            const d = Math.hypot(dx, dy);
            const th = Math.atan2(dy, dx) + f.rot;
            const edge = f.R * (0.55 + 0.45 * Math.cos(f.k * th));
            let c = 0;
            if (d < edge) c = 0.35 + 0.65 * (1 - d / edge);
            if (d < f.R * 0.18) c = 0.15; // flower "eye" — lighter
            const stemTop = f.cy + f.R * 0.3;
            if (y > stemTop && y < h && Math.abs(dx) < SP * 0.9) {
              const t = (y - stemTop) / (h - stemTop);
              c = Math.max(c, 0.55 * f.stem * (1 - 0.35 * t));
            }
            if (f.tone === 0) v0 = Math.max(v0, c); else v1 = Math.max(v1, c);
          }
          const v = Math.max(v0, v1);
          if (v < 0.05) continue;
          ctx!.fillStyle = v1 > v0 ? colors[1] : colors[0];
          ctx!.globalAlpha = 0.3 + 0.45 * v;
          ctx!.beginPath();
          ctx!.arc(x, y, Math.min(SP * 0.48, v * SP * 0.5), 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors[0], colors[1]]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 w-full ${className}`}
      style={{ height: "100%" }}
    />
  );
}
