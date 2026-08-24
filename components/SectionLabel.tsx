// Section title: a small lavender halftone mark, the title in large italic
// serif, and a hairline that runs out to the right edge and fades.
// Used on every page, so this is the one place to tune section headings.

function HalftoneMark() {
  // a tiny dot cluster — the same dot language as the hero / logo
  const dots = [
    [9, 2, 1.6], [4, 6, 2.2], [14, 6, 2.2],
    [9, 9, 3.4],
    [4, 14, 2.2], [14, 14, 2.2], [9, 17, 1.6],
  ];
  return (
    <svg
      viewBox="0 0 18 19"
      width="22"
      height="22"
      aria-hidden="true"
      className="shrink-0 text-[rgb(167,139,250)]"
    >
      {dots.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" />
      ))}
    </svg>
  );
}

export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <HalftoneMark />
      <h2 className="font-serif text-4xl italic leading-none text-black sm:text-5xl">
        {children}
      </h2>
      <div
        aria-hidden="true"
        className="ml-2 h-px flex-1"
        style={{
          background:
            "linear-gradient(to right, rgba(167,139,250,0.6), rgba(128,128,140,0.3) 40%, transparent)",
        }}
      />
    </div>
  );
}
