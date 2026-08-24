"use client";

import { useEffect, useRef } from "react";

/**
 * Halftone "connecting the dots" canvas.
 *
 * A grid of halftone dots whose size is driven by a field made of:
 *  - a few drifting "nodes" (soft blobs),
 *  - the segments that connect those nodes (so the connecting lines are
 *    themselves drawn out of halftone dots — no vector strokes),
 *  - the cursor, which becomes an extra node that links to its nearest
 *    neighbours, so visitors literally connect the dots.
 *
 * Respects prefers-reduced-motion (renders one static frame).
 */
export default function HalftoneHero({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SPACING = 14; // px between dot centers
    const MAX_R = SPACING * 0.5;

    type Node = {
      x: number; y: number;     // normalized 0..1
      ax: number; ay: number;   // drift amplitude
      fx: number; fy: number;   // drift frequency
      px: number; py: number;   // phase
      ox: number; oy: number;   // orbit center
      s: number;                // strength (ramps 0→1 for freshly placed nodes)
      user?: boolean;           // placed by a click → not dimmed under the headline
    };
    const MAX_USER_NODES = 12;

    let w = 0, h = 0, dpr = 1, cols = 0, rows = 0;
    let raf = 0;
    let running = true;
    const mouse = { x: -1, y: -1, active: false, t: 0 };
    let lastTime = 0;

    // hand-placed orbit centers so the constellation spreads across the right side
    const ORBITS: [number, number][] = [
      [0.58, 0.58], [0.70, 0.24], [0.82, 0.46],
      [0.93, 0.18], [0.66, 0.86], [0.89, 0.80],
      [0.26, 0.86], [0.42, 0.70],
    ];
    const nodes: Node[] = ORBITS.map(([ox, oy], i) => {
      const s = (i + 1) * 0.618;
      return {
        x: 0, y: 0, ox, oy, s: 1,
        ax: 0.03 + ((s * 5.1) % 1) * 0.04,
        ay: 0.04 + ((s * 2.9) % 1) * 0.05,
        fx: 0.00012 + ((s * 1.7) % 1) * 0.0001,
        fy: 0.0001 + ((s * 4.3) % 1) * 0.0001,
        px: s * 10,
        py: s * 20,
      };
    });

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / SPACING) + 1;
      rows = Math.ceil(h / SPACING) + 1;
      if (reduceMotion) draw(0);
    }

    function segDist2(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
      const vx = bx - ax, vy = by - ay;
      const wx = px - ax, wy = py - ay;
      const len2 = vx * vx + vy * vy || 1;
      let t = (wx * vx + wy * vy) / len2;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const dx = px - (ax + vx * t), dy = py - (ay + vy * t);
      return dx * dx + dy * dy;
    }

    function draw(time: number) {
      lastTime = time;
      // move nodes
      for (const n of nodes) {
        n.x = (n.ox + Math.sin(time * n.fx + n.px) * n.ax) * w;
        n.y = (n.oy + Math.cos(time * n.fy + n.py) * n.ay) * h;
        if (n.s < 1) n.s = Math.min(1, n.s + 0.06);
      }

      // ease the cursor influence in/out
      mouse.t += ((mouse.active ? 1 : 0) - mouse.t) * 0.08;

      // build the list of points and the segments connecting them
      const pts: { x: number; y: number; s: number; user: boolean }[] =
        nodes.map((n) => ({ x: n.x, y: n.y, s: n.s, user: !!n.user }));
      const segs: { ax: number; ay: number; bx: number; by: number; s: number; user: boolean }[] = [];

      // connect each node to its 2 nearest neighbours (a loose constellation)
      const seen = new Set<string>();
      for (let i = 0; i < nodes.length; i++) {
        nodes
          .map((m, j) => ({ j, d: (m.x - nodes[i].x) ** 2 + (m.y - nodes[i].y) ** 2 }))
          .filter((o) => o.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
          .forEach(({ j }) => {
            const key = i < j ? `${i}-${j}` : `${j}-${i}`;
            if (seen.has(key)) return;
            seen.add(key);
            segs.push({ ax: nodes[i].x, ay: nodes[i].y, bx: nodes[j].x, by: nodes[j].y, s: Math.min(nodes[i].s, nodes[j].s), user: !!(nodes[i].user || nodes[j].user) });
          });
      }

      // cursor node: links to its 3 nearest nodes
      if (mouse.t > 0.01) {
        pts.push({ x: mouse.x, y: mouse.y, s: mouse.t * 1.3, user: true });
        nodes
          .map((m) => ({ m, d: (m.x - mouse.x) ** 2 + (m.y - mouse.y) ** 2 }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 3)
          .forEach(({ m }) => segs.push({ ax: mouse.x, ay: mouse.y, bx: m.x, by: m.y, s: mouse.t, user: true }));
      }

      const NODE_SIG2 = (SPACING * 3.2) ** 2;
      const LINE_SIG2 = (SPACING * 0.9) ** 2;

      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = "rgb(167, 139, 250)"; // light purple

      for (let r = 0; r < rows; r++) {
        const y = r * SPACING;
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;

          // base halftone texture: faint, with a slow breathing gradient
          let v = 0.05 + 0.04 * Math.sin(time * 0.0004 + x * 0.01 + y * 0.006);
          let vu = 0; // contributions from user-placed nodes / cursor (never faded)

          for (const p of pts) {
            const d2 = (x - p.x) ** 2 + (y - p.y) ** 2;
            const c = 0.85 * p.s * Math.exp(-d2 / NODE_SIG2);
            if (p.user) vu += c; else v += c;
          }
          for (const s of segs) {
            const d2 = segDist2(x, y, s.ax, s.ay, s.bx, s.by);
            const c = 0.42 * s.s * Math.exp(-d2 / LINE_SIG2);
            if (s.user) vu += c; else v += c;
          }

          // fade the ambient field out towards the left where the headline sits
          // (keeps ~40% strength even at the far left so the constellation never vanishes)
          const edge = Math.min(1, Math.max(0, (x / w - 0.12) / 0.4));
          v = v * (0.4 + 0.6 * edge) + vu;

          if (v < 0.02) continue;
          const rad = Math.min(MAX_R, v * MAX_R);
          ctx!.globalAlpha = Math.min(0.85, 0.2 + v * 0.6);
          ctx!.beginPath();
          ctx!.arc(x, y, rad, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    function loop(t: number) {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= w && mouse.y <= h;
    }
    function onLeave() { mouse.active = false; }

    // click anywhere in the hero (not on a link/button/nav) to place a new node
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, header, input, textarea")) return;
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > w || y > h) return;
      const k = nodes.length * 0.618;
      nodes.push({
        x, y, s: 0, user: true,
        ox: x / w, oy: y / h,
        ax: 0.01 + ((k * 5.1) % 1) * 0.02,
        ay: 0.01 + ((k * 2.9) % 1) * 0.02,
        fx: 0.00012 + ((k * 1.7) % 1) * 0.0001,
        fy: 0.0001 + ((k * 4.3) % 1) * 0.0001,
        px: -lastTime * (0.00012 + ((k * 1.7) % 1) * 0.0001), py: Math.PI / 2 - lastTime * (0.0001 + ((k * 4.3) % 1) * 0.0001), // start exactly at the click point
      });
      // keep the six seed nodes; drop the oldest user-placed node beyond the cap
      if (nodes.length > ORBITS.length + MAX_USER_NODES) nodes.splice(ORBITS.length, 1);
      if (reduceMotion) draw(0);
    }

    // pause when offscreen
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !running) { running = true; raf = requestAnimationFrame(loop); }
      if (!visible && running) { running = false; cancelAnimationFrame(raf); }
    });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("click", onClick);
    if (!reduceMotion) {
      io.observe(canvas);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        // soft fade at the bottom (and a touch at the top) so the field dissolves into the next section
        maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 72%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 72%, transparent 100%)",
      }}
    />
  );
}
