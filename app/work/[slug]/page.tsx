import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, playground, projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import PlateCard from "@/components/PlateCard";
import SectionLabel from "@/components/SectionLabel";
import CaseStudyContents, { type ContentsSection } from "@/components/CaseStudyContents";
import { container, sectionGap } from "@/lib/ui";
import CaseStudy from "@/components/CaseStudy";

export function generateStaticParams() {
  return projects.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work — Zoey Yan" };
  return {
    title: `${project.name} — Zoey Yan`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.comingSoon) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  // Playground pieces suggest other playground pieces; work projects suggest work.
  const moreFromPlayground = project.playgroundOnly
    ? playground.filter((i) => i.slug !== slug).slice(0, 2)
    : null;
  const others = projects.filter((p) => p.slug !== slug && !p.playgroundOnly && !p.comingSoon);
  const more = [0, 1].map((k) => others[(idx + k) % others.length]);

  // Sections for the floating Contents pill; each id is set on the matching heading below.
  const firstSentence = (t: string) => t.split(/(?<=[.!?])\s+/)[0];
  const sections: ContentsSection[] = [
    { id: "overview", label: "Overview", level: 1 },
    ...(project.features.length
      ? [
          { id: "solution", label: project.featuresHeading ?? "Solution", level: 1 as const },
          ...project.features.map((f, i) => ({
            id: `feature-${i + 1}`,
            label: f.title.match(/^([A-Za-z]+ #\d+)/i)?.[1] ?? f.title,
            level: 2 as const,
          })),
        ]
      : []),
    ...(project.memorable ? [{ id: "memorable", label: "Memorable moment", level: 1 as const }] : []),
    ...(project.stories.length
      ? [
          { id: "story", label: "The story", level: 1 as const },
          ...project.stories.map((s, i) => ({ id: `chapter-${i + 1}`, label: firstSentence(s.subheading), level: 2 as const })),
        ]
      : []),
    { id: "more-projects", label: "More projects", level: 1 },
  ];

  return (
    <CaseStudy project={project}>
      {/* See more projects */}
      <section id="more-projects" className={`${container} ${sectionGap} scroll-mt-32`}>
        <Reveal>
          <SectionLabel>More projects</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {moreFromPlayground
            ? moreFromPlayground.map((item, i) => (
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
              ))
            : more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
        </div>
      </section>
      <CaseStudyContents sections={sections} />
    </CaseStudy>
  );
}
