import type { Project } from "@/lib/data";
import PlateCard from "@/components/PlateCard";

// Work card — thin wrapper over the shared PlateCard.
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <PlateCard
      href={`/work/${project.slug}`}
      name={project.name}
      line={project.claim}
      tag={project.tag}
      year={project.year}
      color={project.color}
      image={project.headerImage}
      video={project.mainVideo}
    />
  );
}
