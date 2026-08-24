"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders an image as a halftone: a grid of dots whose size follows the
 * image's darkness. Lavender dots by default, transparent background, so it
 * sits on any page color. Re-renders on resize.
 */
export default function HalftoneImage({
  src,
  alt = "",
  color = "rgb(139, 115, 220)",
  spacing = 7,
  className = "",
  fill = false,
}: {
  src: string;
  alt?: string;
  color?: string;
  spacing?: number;
  className?: string;
  /** Size to the element's own box (e.g. absolute inset-0 h-full) instead of deriving height from the image aspect. */
  fill?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    function draw() {
      if (!img.naturalWidth) return;
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width;
      const h = fill ? rect.height : (rect.width * img.naturalHeight) / img.naturalWidth;
      if (!fill) canvas!.style.height = `${h}px`;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // sample the image at grid resolution
      const cols = Math.ceil(w / spacing), rows = Math.ceil(h / spacing);
      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = color;
      const maxR = spacing * 0.55;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.05) continue;
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          const v = (1 - lum) * a; // darker → bigger dot
          if (v < 0.06) continue;
          const rad = Math.sqrt(v) * maxR;
          ctx!.beginPath();
          ctx!.arc(c * spacing + spacing / 2, r * spacing + spacing / 2, rad, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      setReady(true);
    }

    img.onload = draw;
    if (img.complete) draw();
    // Redraw whenever the element's own box changes (column resizes, not just window)
    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [src, color, spacing, fill]);

  return (
    <canvas
      ref={ref}
      role={alt ? "img" : "presentation"}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`block w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
