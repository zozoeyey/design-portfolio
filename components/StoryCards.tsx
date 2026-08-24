"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pick-a-card intro board.
 *
 * Big greeting + the active story in the middle; around it, chapters rendered
 * as halftone icons — each emoji is drawn to an offscreen canvas and rebuilt
 * as a grid of accent-colored dots (same treatment as the About portrait),
 * with its label underneath. No card chrome.
 */

type Card = {
  id: string;
  emoji: string;
  /** optional image to halftone instead of the emoji glyph */
  icon?: string;
  label: string;
  sub: string;
  color: string;
  rotate: string; // resting tilt
  spacing: number; // halftone dot pitch (px) — varies per icon
  title: string;
  body: string;
};

const CARDS: Card[] = [
  {
    id: "startup",
    emoji: "🚀",
    label: "Founding Designer",
    sub: "AI startup",
    color: "rgb(110, 106, 220)",
    rotate: "4deg",
    spacing: 4,
    title: "The zero-to-one chapter",
    body:
      "As the founding designer at an AI startup, I owned everything from brand to onboarding flows. No design system, no process, no safety net — the fastest design education I've ever had.",
  },
  {
    id: "nonprofit",
    emoji: "🌱",
    label: "Design Lead",
    sub: "nonprofit",
    color: "rgb(44, 131, 127)",
    rotate: "-7deg",
    spacing: 5,
    title: "Designing for good",
    body:
      "Leading design at a nonprofit taught me to do a lot with very little — and that the best design decisions are the ones volunteers can maintain after you leave the room.",
  },
  {
    id: "stanford",
    emoji: "🌲",
    icon: "/about/stanford.png",
    label: "Stanford",
    sub: "LDT",
    color: "rgb(140, 21, 21)",
    rotate: "6deg",
    spacing: 5,
    title: "The Stanford chapter",
    body:
      "At Stanford's Learning, Design & Technology program I got to study how people actually learn — and to prototype, test, and exhibit products with real learners at the LDT Expo.",
  },
  {
    id: "ship",
    emoji: "🛠️",
    label: "Ships to prod",
    sub: "Figma → code",
    color: "rgb(214, 134, 60)",
    rotate: "-4deg",
    spacing: 4,
    title: "I ship my own files",
    body:
      "I don't hand off and hope. This portfolio is Next.js I maintain myself — I like following a design from a Figma frame all the way into production.",
  },
  {
    id: "wellesley",
    emoji: "🎓",
    icon: "/about/wellesley.png",
    label: "Wellesley",
    sub: "undergrad",
    color: "rgb(1, 66, 164)",
    rotate: "7deg",
    spacing: 4,
    title: "The Wellesley chapter",
    body:
      "Wellesley College is where I learned to think before I make — and where a liberal-arts habit of connecting unrelated ideas became the way I approach design.",
  },
];

/** Draws an emoji as a halftone dot grid in a single accent color. */
function HalftoneGlyph({
  glyph,
  src,
  color,
  size = 104,
  spacing = 5,
}: {
  glyph: string;
  src?: string;
  color: string;
  size?: number;
  spacing?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // sample at grid resolution
    const cols = Math.ceil(size / spacing);
    const rows = cols;
    const off = document.createElement("canvas");
    off.width = cols;
    off.height = rows;
    const octx = off.getContext("2d")!;

    const render = () => {
      const data = octx.getImageData(0, 0, cols, rows).data;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = color;
      const maxR = spacing * 0.55;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.08) continue;
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          // keep light areas visible: floor the dot size for any opaque pixel
          const v = a * (0.3 + 0.7 * (1 - lum));
          const rad = Math.sqrt(v) * maxR;
          ctx.beginPath();
          ctx.arc(c * spacing + spacing / 2, r * spacing + spacing / 2, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // fit-contain the image in the square sampling grid
        const scale = Math.min(cols / img.naturalWidth, rows / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        octx.clearRect(0, 0, cols, rows);
        octx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
        render();
      };
    } else {
      octx.font = `${Math.floor(cols * 0.88)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(glyph, cols / 2, rows / 2 + rows * 0.04);
      render();
    }
  }, [glyph, src, color, size, spacing]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="block"
    />
  );
}

function Sticker({ c, isActive, onClick }: { c: Card; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      style={{ "--tilt": c.rotate } as React.CSSProperties}
      className={`story-card group flex flex-col items-center gap-0.5 transition-all duration-300 ease-[cubic-bezier(.2,.9,.3,1.2)] ${
        isActive
          ? "z-10 rotate-0 scale-110 opacity-100"
          : "rotate-[var(--tilt)] opacity-70 hover:rotate-0 hover:scale-105 hover:opacity-100"
      }`}
    >
      <HalftoneGlyph glyph={c.emoji} src={c.icon} color={c.color} spacing={c.spacing} />
      <span className="text-sm font-bold leading-tight text-black">{c.label}</span>
      <span
        className="text-xs font-semibold leading-tight"
        style={{ color: `color-mix(in oklab, ${c.color} 45%, var(--gray-700))` }}
      >
        {c.sub}
      </span>
    </button>
  );
}

export default function StoryCards() {
  const [activeId, setActiveId] = useState(CARDS[0].id);
  const active = CARDS.find((c) => c.id === activeId)!;

  return (
    <div>
      {/* Greeting on top, halftone icons in one line, story below */}
      <div>
        <p className="mb-10 text-center font-serif text-4xl italic text-black sm:text-5xl">
          Nice to meet you &mdash; I&apos;m Zoey!
        </p>
        <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-5 md:flex-nowrap md:justify-between md:gap-x-2">
          {CARDS.map((c) => (
            <Sticker key={c.id} c={c} isActive={c.id === activeId} onClick={() => setActiveId(c.id)} />
          ))}
        </div>

        {/* centered story */}
        <div
          aria-live="polite"
          className="relative mx-auto mt-10 max-w-[52ch] text-center"
        >
          <div key={active.id} className="story-swap">
            <p className="text-[16px] leading-relaxed text-gray-700">{active.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
