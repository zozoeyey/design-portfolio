import type { Metadata } from "next";
import { playground } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import PlateCard from "@/components/PlateCard";
import PlaygroundExplorer from "@/components/PlaygroundExplorer";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Playground — Zoey Yan",
  description: "Experiments, side projects, and things Zoey makes for fun.",
};

const intro = (
  <>
    <SectionLabel as="h1">Playground</SectionLabel>
    <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-500">
      Experiments and side projects — where I explore hardware, generative tools, data, and graphic
      design outside work.
    </p>
  </>
);

export default function PlaygroundPage() {
  return (
    <section className={`${container} pt-40 sm:pt-48 lg:max-w-none lg:pr-8 lg:pl-[max(5rem,calc((100%-1440px)/2+5rem))] lg:pt-28`}>
      {/* Large screens: left edge matches the site container; the right runs
          wider (32px from the window edge) so the preview can breathe */}
      {/* Phones and tablets: header on top */}
      <div className="lg:hidden">
        <Reveal>{intro}</Reveal>
      </div>

      {/* Large screens: list + preview */}
      <div className="hidden lg:block">
        <PlaygroundExplorer items={playground} intro={intro} />
      </div>

      {/* Phones and tablets: cards by category */}
      <div className="mt-12 flex flex-col gap-24 lg:hidden">
      {(
        [
          { key: "product-design", title: "Product design" },
          { key: "coding", title: "Coding" },
          { key: "physical-ai", title: "Physical AI" },
          { key: "graphic-design", title: "Graphic design" },
        ] as const
      ).map((cat) => {
        const items = playground.filter((p) => p.category === cat.key);
        if (items.length === 0) return null;
        return (
          <div key={cat.key}>
            <Reveal>
              <h2 className="font-serif text-heading italic text-black">
                {cat.title}
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2">
              {items.map((item, i) => (
                <Reveal key={item.slug} delay={i * 80}>
                  <PlateCard
                    href={item.link}
                    external={item.link.startsWith("http")}
                    name={item.name}
                    line={item.summary}
                    tag={item.tag}
                    year={item.year}
                    color={item.color}
                    image={item.image}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
}
