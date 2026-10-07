import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import { tagColors } from "@/lib/ui";

/**
 * Shared "tinted plate" card used by Work (ProjectCard) and Playground.
 *
 * The image/video fills a rounded plate (tinted with the item's accent color
 * as a loading/fallback background). Metadata sits under the plate in a fixed
 * order: name → one-liner → tag / year. Hover gently zooms the media.
 */
export default function PlateCard({
  href,
  external = false,
  name,
  line,
  tag,
  year,
  color,
  image,
  video,
  motion,
}: {
  href: string;
  external?: boolean;
  name: string;
  line: string;
  tag: string;
  year: string;
  color: string; // e.g. "rgb(44, 131, 127)"
  image?: string | null;
  video?: string | null;
  /** A coded animation that replaces the video/image (e.g. CanmarketCardMotion). */
  motion?: React.ReactNode;
}) {
  const media = motion ? (
    // No hover zoom here: scaling a live 3D scene re-rasterizes it every frame.
    <div className="h-full w-full">{motion}</div>
  ) : video ? (
    <AutoVideo
      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.03]"
      src={video}
      poster={image ?? undefined}
    />
  ) : image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={name}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.03]"
    />
  ) : null;

  const body = (
    <>
      {/* Plate */}
      <div
        className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl"
        style={{ backgroundColor: `color-mix(in oklab, ${color} 14%, var(--white-100))` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(${color} 1.1px, transparent 1.3px)`,
            backgroundSize: "14px 14px",
            WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%)",
            maskImage: "radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0">{media}</div>

        {/* liquid-glass hover: sweeping sheen + frosted chip */}
        <span aria-hidden="true" className="plate-sheen" />
        <span
          className="glass absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-black opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
          View
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
        </span>
      </div>

      {/* Metadata strip */}
      <div className="flex items-start justify-between gap-4 px-1.5 pt-4">
        <div>
          <h3 className="text-xl font-bold text-black">{name}</h3>
          <p className="mt-1.5 max-w-[44ch] text-base leading-relaxed text-gray-500">{line}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5 text-sm text-gray-500">
          <span
            className="rounded-full px-3 py-1 font-bold"
            style={tagColors(color)}
          >
            {tag}
          </span>
          <span className="tabular-nums">{year}</span>
        </div>
      </div>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <Link href={href} className="group block">
      {body}
    </Link>
  );
}
