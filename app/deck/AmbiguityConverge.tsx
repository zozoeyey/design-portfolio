// "Start from ambiguity" (Canmarket): tangled threads → each analysed → one insight.
// Geometry from a fixed seed, so server and client render the same paths.

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

const INK = "oklch(0.25 0.02 260)";
const ACC = "oklch(0.62 0.17 48)";
const Label = ({ x, y, children, fill = INK, anchor = "middle" }: { x: number; y: number; children: string; fill?: string; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize="22" fontWeight="700" letterSpacing="2" style={{ fontFamily: "inherit" }}>
    {children}
  </text>
);

const N = 11;
const TANGLE = (() => {
  const r = rng(7);
  return Array.from({ length: N }, (_, i) => {
    const yEnd = 130 + i * 24;
    // wander from off-left, loop through the left third, then settle at the analysis point
    const p = [[-20, r() * 500], [60 + r() * 120, r() * 500], [40 + r() * 200, r() * 500], [140 + r() * 140, r() * 500]];
    return `M${p[0][0]} ${p[0][1]} C ${p[1][0]} ${p[1][1]}, ${p[2][0]} ${p[2][1]}, ${p[3][0]} ${p[3][1]} S ${360 - r() * 60} ${yEnd}, 400 ${yEnd}`;
  });
})();
export default function AmbiguityConverge() {
  return (
    <svg viewBox="0 0 1000 420" className="mt-[1cqw] min-h-0 w-full flex-1" role="img" aria-label="Tangled threads of ambiguity, each analysed, converging into one insight">
        <g fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.4">
          {TANGLE.map((d, i) => <path key={i} d={d} />)}
        </g>
        <g stroke={ACC} strokeWidth="1.4">
          {Array.from({ length: N }, (_, i) => <line key={i} x1="400" y1={130 + i * 24} x2="720" y2="250" />)}
        </g>
        <g fill={ACC}>{Array.from({ length: N }, (_, i) => <circle key={i} cx="400" cy={130 + i * 24} r="3.5" />)}</g>
        <rect x="720" y="196" width="230" height="108" rx="14" fill="oklch(0.97 0.012 70)" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="740" x2="930" y1={208 + i * 12} y2={208 + i * 12} stroke={ACC} strokeOpacity="0.25" strokeDasharray="2 3" />
        ))}
        <circle cx="720" cy="250" r="6" fill={ACC} />
        <Label x={835} y={258}>CLARITY</Label>
        <Label x={130} y={405} fill="oklch(0.55 0.02 260)">AMBIGUITY</Label>
        <Label x={400} y={405} fill={ACC}>ANALYSIS</Label>
      </svg>
  );
}
