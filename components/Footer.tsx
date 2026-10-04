import Link from "next/link";
import { site } from "@/lib/data";
import { container, sectionGap } from "@/lib/ui";
import HalftoneMeadow from "@/components/HalftoneMeadow";
import CopyEmailButton from "@/components/CopyEmailButton";

// Sign-off footer: no card — the page ends on a serif "Let's connect.", the
// email, one quiet row of links, and a halftone meadow along the bottom edge.

const pages = [
  { label: "Work", href: "/#mywork" },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
];

const elsewhere = [
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Instagram", href: site.socials.instagram },
  { label: "Resume", href: site.resumeUrl },
];

const quiet = "text-gray-500 transition-colors hover:text-black";

export default function Footer() {
  return (
    <footer className={`${sectionGap} relative overflow-hidden`}>
      <div className={`${container} relative z-10`}>
        <h2 className="font-serif text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] italic leading-[1.05] text-black">
          Let&rsquo;s connect.
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={`mailto:${site.email}`}
            className="text-lead text-black underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent-strong"
          >
            {site.email}
          </a>
          <CopyEmailButton className="glass text-gray-700 hover:bg-white hover:text-black" />
        </div>

        <div className="mt-16 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {pages.map((l) => (
              <Link key={l.label} href={l.href} className={quiet}>
                {l.label}
              </Link>
            ))}
            {elsewhere.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={quiet}>
                {l.label} ↗
              </a>
            ))}
          </nav>
          <div className="flex gap-6 text-gray-500">
            <span>© {site.copyright}</span>
            <a href="#top" className="transition-colors hover:text-black">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-6 h-48 sm:h-64" aria-hidden="true">
        <HalftoneMeadow />
      </div>
    </footer>
  );
}
