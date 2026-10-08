/* eslint-disable @next/next/no-img-element */
// Connect Link story 1 ("Ambiguity is my starting point"): the three platforms studied, converging into
// one design direction. Replaces an exported image.

const SRC = [
  { name: "Reddit", logo: "reddit", gives: "Topic communities" },
  { name: "Quora", logo: "quora", gives: "Question-first threads" },
  { name: "Product Hunt", logo: "producthunt", gives: "Lightweight discovery" },
];
const INSIGHT = "Topic-driven discussions with lightweight, navigable knowledge sharing";
function Logo({ k, className = "h-7 w-7" }: { k: string; className?: string }) {
  return <img src={`/media/connectlink/logos/${k}.svg`} alt="" className={className} />;
}

export default function CompetitorConverge({ color }: { color: string }) {
  const ys = [16.7, 50, 83.3];
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,2fr)_minmax(0,5fr)] md:gap-0">
        <ul className="grid gap-4">
          {SRC.map((s) => (
            <li key={s.name} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
              <Logo k={s.logo} className="h-7 w-7 shrink-0" />
              <span>
                <span className="block text-base font-bold text-black">{s.name}</span>
                <span className="block text-sm text-gray-500">{s.gives}</span>
              </span>
            </li>
          ))}
        </ul>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden h-full min-h-[14rem] w-full md:block" fill="none" stroke={color} strokeWidth="1.4" aria-hidden="true">
          {ys.map((y) => (
            <path key={y} d={`M0 ${y} C 55 ${y}, 45 50, 100 50`} vectorEffect="non-scaling-stroke" strokeOpacity="0.55" />
          ))}
        </svg>
        <div className="rounded-3xl p-7 text-white" style={{ backgroundColor: color }}>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Design direction</p>
          <p className="mt-2 text-heading font-bold leading-tight tracking-tight text-balance">{INSIGHT}</p>
        </div>
      </div>
    </div>
  );
}
