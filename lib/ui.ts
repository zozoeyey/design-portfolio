// Shared layout + type primitives. Every page uses these so edges, rhythm and
// labels line up site-wide — tune spacing here, not per page.

// Page container: same max width and gutter as the navbar and footer.
export const container = "mx-auto w-full max-w-[1440px] px-6 sm:px-12 md:px-20";

// Vertical rhythm between top-level sections (also used before the footer).
export const sectionStack = "flex flex-col gap-24 md:gap-32";
export const sectionGap = "mt-24 md:mt-32";

// Small uppercase label above a value or heading.
export const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] text-gray-500";

// Tag-pill colors from a project's accent: a dark ink on a pale wash of the
// same hue, both at fixed OKLCH lightness so every project's label lands at
// ~7:1 contrast no matter how light or dark its accent is.
export function tagColors(rgb: string) {
  const [r, g, b] = (rgb.match(/\d+(\.\d+)?/g) ?? []).map((n) => {
    const c = Number(n) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const chroma = Math.hypot(A, B);
  const hue = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;

  if (chroma < 0.02) {
    return { color: "oklch(0.42 0 0)", backgroundColor: "oklch(0.955 0 0)" };
  }
  // Yellow darkened to text lightness reads olive; shift its ink toward amber.
  const inkHue = hue > 80 && hue < 115 ? 70 : hue;
  return {
    color: `oklch(0.42 ${Math.min(chroma, 0.11).toFixed(3)} ${inkHue.toFixed(1)})`,
    backgroundColor: `oklch(0.955 ${Math.min(chroma * 0.35, 0.045).toFixed(3)} ${hue.toFixed(1)})`,
  };
}
