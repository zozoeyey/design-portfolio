/**
 * Tammy-style before/after: two screenshots framed in code — accent underline
 * bar, colored Before/After heading, caption text. (ValueGlance, story 2;
 * screenshots cropped from the original composite export.)
 */


function Panel({
  img,
  label,
  labelColor,
  caption,
  alt,
  dark = false,
}: {
  img: string;
  label: string;
  labelColor: string;
  caption: string;
  alt: string;
  dark?: boolean;
}) {
  return (
    <figure className="flex h-full flex-col">
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={alt} loading="lazy" className="w-full" />
        <div className="h-1.5 w-full" style={{ backgroundColor: labelColor }} />
      </div>
      <figcaption className="mt-4">
        <div className="text-lg font-bold" style={{ color: labelColor }}>
          {label}
        </div>
        <p className={`mt-1 max-w-[52ch] leading-relaxed ${dark ? "text-[rgb(198,198,210)]" : "text-gray-700"}`}>{caption}</p>
      </figcaption>
    </figure>
  );
}

export default function BeforeAfter({ color, dark = false }: { color: string; dark?: boolean }) {
  return (
    <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
      <Panel
        img="/media/valueglance-before-desktop.png"
        label="Before"
        labelColor={dark ? "oklch(0.78 0.1 5)" : "oklch(0.52 0.13 5)"}
        dark={dark}
        alt="Original desktop-first chart with wide controls and dense axes"
        caption="The charts were desktop-first — dense double axes, wide range sliders, and controls with no answer for a small screen."
      />
      <Panel
        img="/media/valueglance-after-mobile.png"
        label="After"
        labelColor={dark ? `color-mix(in oklab, ${color} 55%, white)` : `color-mix(in oklab, ${color} 80%, black)`}
        dark={dark}
        alt="Chart redesigned for mobile with compact controls and clear hierarchy"
        caption="Redesigned within mobile constraints: compact controls, a tighter hierarchy, and charts that stay legible at phone width."
      />
    </div>
  );
}
