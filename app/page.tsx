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
import { container, sectionStack } from "@/lib/ui";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden">
        <HalftoneHero />
        <div className={`${container} relative pt-32 pb-16`}>
        <Reveal>
          <p className="font-serif text-lead italic text-gray-700">
            {hero.greeting}
          </p>
          <h1 className="mt-4 max-w-3xl text-display font-medium tracking-tight text-black">
            {hero.tagline}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
            >
              About me
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

      <div className={sectionStack}>
      {/* My Approach */}
      <section className={container}>
        <Reveal>
          <SectionLabel>My approach</SectionLabel>
        </Reveal>
        {/* Gallery: same-size 16:10 image on top of every card, quiet text below, one link for the section */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {approach.map((a, i) => (
            <Reveal key={a.n} delay={i * 80} className="h-full">
              <article className="glass-card flex h-full flex-col overflow-hidden rounded-3xl bg-background bg-none after:hidden">
                <div className="aspect-[16/10] overflow-hidden bg-[#f3f1fb]">
                  {a.images.length > 1 ? (
                    <Carousel images={a.images} alt={a.title} className="!rounded-none" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.images[0]} alt={a.title} loading="lazy" className="h-full w-full object-cover object-top" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold tabular-nums tracking-[0.14em] text-gray-400">{a.n}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-black text-balance">{a.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-500 text-pretty">{a.desc}</p>
                  <Link
                    href={a.link.href}
                    className="group/link mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-sm font-bold text-black hover:text-accent-strong"
                  >
                    {a.link.label}
                    <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* My Work */}
      <section id="mywork" className={`${container} scroll-mt-28`}>
        <Reveal>
          <SectionLabel>My work</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {projects.filter((p) => !p.playgroundOnly).map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* How I Collaborate */}
      <section className={container}>
        <Reveal>
          <SectionLabel>How I collaborate</SectionLabel>
        </Reveal>
        <div className="mt-10 flex flex-col divide-y divide-black/10 border-y border-black/10">
          {collaborate.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <div className="group grid gap-3 py-8 lg:grid-cols-[12rem_18rem_1fr] lg:items-baseline lg:gap-10">
                <span className="font-serif text-heading italic text-black transition-colors group-hover:text-accent-strong">
                  {c.label}
                </span>
                <h3 className="text-lg font-bold text-black">{c.title}</h3>
                <p className="text-base leading-relaxed text-gray-500">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={container}>
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="flex h-full flex-col justify-between rounded-3xl glass-card bg-background bg-none p-8 after:hidden">
                <blockquote className="text-lg leading-relaxed text-gray-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-accent/40"
                  />
                  <div>
                    <div className="font-medium text-black">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}
