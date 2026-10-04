"use client";

import { useEffect, useRef } from "react";

// Halftone meadow for the footer: ~1 flower per 34px of width, three head shapes
// (rose, daisy, tulip cup), varied heights and sizes, over a dotted grass
// bed. Seeded, so it's the same garden on every load.
const ACCENT = "rgb(167, 139, 250)";
const LILAC = "rgb(203, 189, 253)";
const DEEP = "rgb(139, 115, 220)";

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

type F = { x: number; y: number; R: number; k: number; rot: number; kind: 0 | 1 | 2; tone: number };

export default function HalftoneMeadow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    function draw() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width, h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      const rand = rng(7);
      const flowers: F[] = [];
      const n = Math.round(w / 34);
      for (let i = 0; i < n; i++) {
        const big = rand() < 0.3;
        flowers.push({
          x: ((i + 0.2 + rand() * 0.6) / n) * w,
          y: h * (big ? 0.2 + rand() * 0.25 : 0.42 + rand() * 0.35),
          R: big ? 18 + rand() * 12 : 8 + rand() * 9,
          k: 4 + Math.floor(rand() * 4),
          rot: rand() * Math.PI,
          kind: (Math.floor(rand() * 3) as 0 | 1 | 2),
          tone: rand(),
        });
      }

      const SP = 7;
      const maxR = SP * 0.5;
      for (let y = SP / 2; y < h; y += SP) {
        for (let x = SP / 2; x < w; x += SP) {
          let v = 0, color = LILAC;

          // grass bed: rises toward the bottom with uneven blade tips
          const tip = 0.72 + 0.08 * Math.sin(x * 0.21) + 0.05 * Math.sin(x * 0.053 + 1.7);
          const g = (y / h - tip) / (1 - tip);
          if (g > 0) { v = 0.35 + g * 0.6; color = g > 0.5 ? ACCENT : LILAC; }

          for (const f of flowers) {
            const dx = x - f.x, dy = y - f.y;
            // stem
            if (dy > 0 && Math.abs(dx - Math.sin(dy * 0.03 + f.rot) * 3) < SP * 0.55) {
              if (v < 0.42) { v = 0.42; color = LILAC; }
            }
            const r = Math.hypot(dx, dy);
            if (r > f.R * 1.1) continue;
            const th = Math.atan2(dy, dx) + f.rot;
            let edge: number;
            if (f.kind === 0) edge = f.R * (0.55 + 0.45 * Math.abs(Math.cos((f.k * th) / 2)));
            else if (f.kind === 1) edge = f.R * (0.75 + 0.25 * Math.cos(f.k * 2 * th));
            else edge = dy < 0 ? f.R * (0.7 + 0.3 * Math.abs(Math.cos(1.5 * (th - f.rot)))) : f.R * 0.75;
            if (r < edge) {
              const center = r < f.R * 0.28;
              const fv = center ? 1 : 0.55 + 0.45 * (1 - r / edge);
              if (fv > v) {
                v = fv;
                color = center ? DEEP : f.tone > 0.5 ? ACCENT : LILAC;
              }
            }
          }

          if (v < 0.08) continue;
          ctx!.fillStyle = color;
          ctx!.beginPath();
          ctx!.arc(x, y, Math.min(1, v) * maxR, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
