import Link from "next/link";
import {
  hero,
  approach,
  collaborate,
  testimonials,
  projects,
} from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import HalftoneHero from "@/components/HalftoneHero";
import Carousel from "@/components/Carousel";

const container = "mx-auto w-full max-w-[1440px] px-6 sm:px-12 md:px-20";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden">
        <HalftoneHero />
        <div className={`${container} relative pt-40 pb-20 sm:pt-48`}>
        <Reveal>
          <p className="font-serif text-4xl italic text-black sm:text-6xl">
            {hero.greeting}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight text-black sm:text-6xl">
            {hero.tagline}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
            >
              About Me
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/#mywork"
              className="group inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-sm text-black transition-[transform,color,background-color] hover:scale-[1.03]"
            >
              See my work
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </Reveal>
        </div>
      </section>

      {/* My Approach */}
      <section className={`${container} py-20`}>
        <Reveal>
          <SectionLabel>My Approach</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {approach.map((a, i) => (
            <Reveal key={a.n} delay={i * 80}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-card p-4 transition-colors duration-500 hover:border-[rgb(167,139,250)]/40">
                <Carousel images={a.images} alt={a.title} className="relative z-10" />
                {/* big halftone numeral, bottom-right */}
                <span
                  aria-hidden="true"
                  className="halftone-text pointer-events-none absolute -bottom-8 -right-2 select-none text-[9rem] font-bold leading-none tracking-tighter transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:-translate-x-1"
                >
                  {a.n}
                </span>
                <div className="relative z-10 flex flex-1 flex-col px-3 pb-3 pt-5">
                  <h3 className="text-xl font-bold tracking-tight text-black">
                    {a.title}
                  </h3>
                  <p className="mt-2 max-w-[85%] text-[15px] leading-relaxed text-gray-500">
                    {a.desc}
                  </p>
                  <Link
                    href={a.link.href}
                    className="group/link mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-black underline-offset-4 hover:text-[rgb(139,115,220)]"
                  >
                    {a.link.label}
                    <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* My Work */}
      <section id="mywork" className={`${container} scroll-mt-28 py-20`}>
        <Reveal>
          <SectionLabel>My Work</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* How I Collaborate */}
      <section className={`${container} py-20`}>
        <Reveal>
          <SectionLabel>How I Collaborate</SectionLabel>
        </Reveal>
        <div className="mt-10 flex flex-col divide-y divide-black/10 border-y border-black/10">
          {collaborate.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <div className="group grid gap-3 py-8 md:grid-cols-[12rem_18rem_1fr] md:items-baseline md:gap-10">
                <span className="font-serif text-3xl italic text-black transition-colors group-hover:text-[rgb(139,115,220)] sm:text-4xl">
                  {c.label}
                </span>
                <h3 className="text-lg font-semibold text-black">{c.title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-500">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${container} py-20`}>
        <Reveal>
          <SectionLabel>Testimonial</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="flex h-full flex-col justify-between rounded-3xl glass-card p-8">
                <blockquote className="text-lg leading-relaxed text-gray-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[rgb(167,139,250)]/40"
                  />
                  <div>
                    <div className="font-medium text-black">{t.name}</div>
                    <div className="text-sm text-medium-gray">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
