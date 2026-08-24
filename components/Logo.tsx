// ZY monogram, halftone edition — the Z and Y strokes screened into a dot
// grid: dots swell where the letters are and shrink to pinpricks around them.
// Pure SVG, no font dependency; `color` defaults to currentColor.

const SEGS: [number, number, number, number][] = [
  [16, 26, 54, 26], [54, 26, 16, 74], [16, 74, 54, 74], // Z
  [52, 26, 70, 52], [70, 52, 88, 26], [70, 52, 70, 74], // Y
];

function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const vx = bx - ax, vy = by - ay, wx = px - ax, wy = py - ay;
  const l = vx * vx + vy * vy || 1;
  const t = Math.max(0, Math.min(1, (wx * vx + wy * vy) / l));
  return Math.hypot(px - (ax + vx * t), py - (ay + vy * t));
}

// Build the dot list once at module load (deterministic, ~200 circles).
const SPACING = 6.25;
const DOTS: { cx: number; cy: number; r: number }[] = [];
for (let y = SPACING / 2; y < 100; y += SPACING) {
  for (let x = SPACING / 2; x < 100; x += SPACING) {
    let d = Infinity;
    for (const s of SEGS) d = Math.min(d, segDist(x, y, ...s));
    const v = 0.1 + 0.9 * Math.exp(-(d * d) / (2 * 6.5 * 6.5));
    const r = Math.min(SPACING / 2, v * (SPACING / 2));
    if (r >= 0.6) DOTS.push({ cx: x, cy: y, r: +r.toFixed(2) });
  }
}

export default function Logo({
  size = 30,
  color = "currentColor",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Zoey Yan" className={className}>
      <g fill={color}>
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} />
        ))}
      </g>
    </svg>
  );
}
