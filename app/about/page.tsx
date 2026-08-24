import type { Metadata } from "next";
import { aboutIntro, collaborate, hobbies, testimonials } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import HobbyCard from "@/components/HobbyCard";
import StoryCards from "@/components/StoryCards";

export const metadata: Metadata = {
  title: "About — Zoey Yan",
  description: "A little about Zoey beyond the work — painting, climbing, film, and snow.",
};

const container = "mx-auto w-full max-w-[1440px] px-6 sm:px-12 md:px-20";

export default function AboutPage() {
  return (
    <>
      {/* Intro: halftone portrait + summary */}
      <section className={`${container} pt-40 pb-8 sm:pt-48`}>
        <Reveal>
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
            <div className="mx-auto w-full max-w-sm md:mx-0 md:max-w-[24rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={aboutIntro.portrait} alt="Photo of Zoey" className="block w-full" />
            </div>
            <div>
              {/* Pick-a-card intro: clicking a card swaps the story below */}
              <StoryCards />
            </div>
          </div>
        </Reveal>
      </section>

      {/* How I collaborate — title left, items right */}
      <section className={`${container} py-16`}>
        <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <Reveal>
            <div className="md:sticky md:top-32">
              <SectionLabel>How I collaborate</SectionLabel>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-gray-500">
                Three roles I end up playing on every team, whatever the title says.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-col divide-y divide-black/10 border-y border-black/10">
            {collaborate.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <div className="group py-7">
                  <span className="font-serif text-3xl italic text-black transition-colors group-hover:text-[rgb(139,115,220)] sm:text-4xl">
                    {c.label}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-black">{c.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-gray-500">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* I enjoy… */}
      <section className={`${container} py-16`}>
        <Reveal>
          <SectionLabel>I enjoy…</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {hobbies.map((h, i) => (
            <Reveal key={h.name} delay={i * 80}>
              <HobbyCard name={h.name} body={h.body} images={h.images} index={i} />
            </Reveal>
          ))}
        </div>

      </section>

      {/* Testimonials */}
      <section className={`${container} py-16`}>
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
