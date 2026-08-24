import type { Metadata } from "next";
import { playground } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import PlateCard from "@/components/PlateCard";

export const metadata: Metadata = {
  title: "Playground — Zoey Yan",
  description: "Experiments, side projects, and things Zoey makes for fun.",
};

const container = "mx-auto w-full max-w-[1440px] px-6 sm:px-12 md:px-20";

export default function PlaygroundPage() {
  return (
    <section className={`${container} pt-40 pb-16 sm:pt-48`}>
      <Reveal>
        <SectionLabel>Playground</SectionLabel>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
          Experiments and side projects — where I explore hardware, generative
          tools, data, and graphic design outside client work.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {playground.map((item, i) => (
          <Reveal key={item.slug} delay={i * 80}>
            <PlateCard
              href={item.link}
              external
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
    </section>
  );
}
