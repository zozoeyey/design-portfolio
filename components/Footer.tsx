import Link from "next/link";
import { site } from "@/lib/data";
import HalftoneGarden from "@/components/HalftoneGarden";

const footerLinks = [
  { label: "Work", href: "/#mywork" },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
];

const link =
  "text-gray-700 transition-colors hover:text-[rgb(124,99,204)]";

export default function Footer() {
  return (
    <footer className="mt-24 px-6 pb-6 sm:px-12 md:px-20">
      <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] border border-[rgb(167,139,250)]/30 bg-[rgb(243,240,254)] text-black">
        <HalftoneGarden />

        <div className="relative px-8 py-14 sm:px-12 md:px-16">
          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md">
              <p className="font-serif text-3xl italic text-black sm:text-4xl">
                Let&apos;s connect.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block text-lg text-gray-700 underline-offset-4 transition-colors hover:text-[rgb(124,99,204)] hover:underline"
              >
                {site.email}
              </a>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              <nav className="flex flex-col gap-2">
                <span className="mb-1 text-xs uppercase tracking-widest text-[rgb(124,99,204)]">
                  Pages
                </span>
                {footerLinks.map((l) => (
                  <Link key={l.label} href={l.href} className={link}>
                    {l.label}
                  </Link>
                ))}
              </nav>

              <nav className="flex flex-col gap-2">
                <span className="mb-1 text-xs uppercase tracking-widest text-[rgb(124,99,204)]">
                  Social
                </span>
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                  LinkedIn
                </a>
                <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                  Instagram
                </a>
                <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  Resume
                </a>
              </nav>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-[rgb(167,139,250)]/25 pt-6 text-sm text-medium-gray">
            <span>© {site.copyright}</span>
            <a href="#top" className="transition-colors hover:text-black">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
