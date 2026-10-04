import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, playground, projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import PlateCard from "@/components/PlateCard";
import SectionLabel from "@/components/SectionLabel";
import ObservationMap from "@/components/ObservationMap";
import MindsetShift from "@/components/MindsetShift";
import BeforeAfter from "@/components/BeforeAfter";
import { container, eyebrow, sectionGap, tagColors } from "@/lib/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className={eyebrow}>{label}</div>
      <div className="mt-2 text-base leading-relaxed text-black sm:text-lg">{value}</div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  // Playground pieces suggest other playground pieces; work projects suggest work.
  const moreFromPlayground = project.playgroundOnly
    ? playground.filter((i) => i.slug !== slug).slice(0, 2)
    : null;
  const others = projects.filter((p) => p.slug !== slug && !p.playgroundOnly);
  const more = [0, 1].map((k) => others[(idx + k) % others.length]);

  const mentiLayout = project.layoutV2 === true;

  return (
    <article className={mentiLayout ? "" : "pt-32 sm:pt-40"}>
      {mentiLayout ? (
        <>
          {/* Hero banner, same width as the navbar */}
          {project.headerImage && (
            <div className={`${container} pt-28 sm:pt-32`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.headerImage}
                alt=""
                className="w-full overflow-hidden rounded-3xl"
              />
            </div>
          )}

          {/* Case info: title + subtitle + blurb + problem/outcome, meta rail right */}
          <header className={`${container} mt-12`}>
            <Reveal>
              {/* Title block, full width */}
              <Link
                href="/#mywork"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                ← All work
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={tagColors(project.color)}
                >
                  {project.tag}
                </span>
                <span className="text-sm text-gray-500">{project.year}</span>
              </div>
              <h1 className="mt-6 text-display font-bold tracking-tight text-black">
                {project.name}
              </h1>
              <p className="mt-3 max-w-3xl text-lead font-medium text-gray-500">
                {project.summary}
              </p>

              {/* Blurb */}
              <div
                className="prose mt-10 max-w-[65ch] text-lg"
                dangerouslySetInnerHTML={{ __html: project.overview }}
              />

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-dark mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
                >
                  Visit live site →
                </a>
              )}

              {/* Meta panel */}
              <div className="glass-card mt-12 grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-4">
                <MetaItem label="Role" value={project.role} />
                <MetaItem label="Duration" value={project.duration} />
                <MetaItem label="Tools" value={project.tools} />
                <MetaItem label="Team" value={project.team} />
              </div>
            </Reveal>
          </header>

        </>
      ) : (
        <>
          {/* Header */}
          <header className={container}>
            <Reveal>
              <Link
                href="/#mywork"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                ← All work
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={tagColors(project.color)}
                >
                  {project.tag}
                </span>
                <span className="text-sm text-gray-500">{project.year}</span>
              </div>
              <h1 className="mt-4 text-display font-medium tracking-tight text-black">
                {project.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
                {project.summary}
              </p>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
                >
                  Visit live site →
                </a>
              )}
            </Reveal>
          </header>

          {/* Hero media */}
          {(project.mainVideo || project.headerImage) && (
            <div className={`${container} mt-12`}>
              <Reveal>
                <div
                  className="overflow-hidden rounded-3xl"
                  style={{ backgroundColor: project.color }}
                >
                  {project.mainVideo ? (
                    <video
                      className="h-full w-full object-cover"
                      src={project.mainVideo}
                      poster={project.headerImage ?? undefined}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.headerImage!}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </Reveal>
            </div>
          )}

          {/* Meta grid */}
          <div className={`${container} mt-12`}>
            <Reveal>
              <div className="glass-card grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-4">
                <MetaItem label="Role" value={project.role} />
                <MetaItem label="Duration" value={project.duration} />
                <MetaItem label="Tools" value={project.tools} />
                <MetaItem label="Team" value={project.team} />
              </div>
            </Reveal>
          </div>

          {/* Overview */}
          <section className={`${container} ${sectionGap}`}>
            <Reveal>
              <h2 className="font-serif text-heading italic text-black">
                Overview
              </h2>
              <div
                className="prose mt-4 max-w-[65ch] text-lg"
                dangerouslySetInnerHTML={{ __html: project.overview }}
              />
            </Reveal>
          </section>
        </>
      )}

      {/* Tags (menti layout shows them per-story instead) */}
      {!mentiLayout && (
      <section className={`${container} mt-10`}>
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/10 bg-white-50 px-3 py-1 text-xs text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
      )}

      {/* Features */}
      {project.features.length > 0 && (
        <section className={sectionGap}>
          <div className={container}>
            <Reveal>
              <h2
                className={
                  mentiLayout
                    ? "font-serif text-title italic text-black"
                    : "font-serif text-heading italic text-black"
                }
              >
                {project.featuresHeading ?? "Solution"}
              </h2>
            </Reveal>
          </div>
          <div className={mentiLayout ? "mt-10" : "mt-6"}>
            {project.features.map((f, fi) => {
              const m = mentiLayout ? f.title.match(/^([A-Za-z]+ #\d+)\s*[:—-]?\s*(.*)$/i) : null;
              const dark = mentiLayout && f.band === "dark";
              const body = (
              <Reveal key={f.title}>
                {mentiLayout ? (
                  <div className="grid gap-6 md:grid-cols-2 md:gap-16">
                    <h3 className="text-heading font-bold tracking-tight">
                      {m ? (
                        <>
                          <span className={`block ${dark ? "text-white" : "text-black"}`}>{m[1]}</span>
                          <span className={`block ${dark ? "text-gray-300" : "text-gray-500"}`}>{m[2]}</span>
                        </>
                      ) : (
                        <span className={`block ${dark ? "text-white" : "text-black"}`}>{f.title}</span>
                      )}
                    </h3>
                    {f.desc && (
                      <p className={`self-center whitespace-pre-line text-lg leading-relaxed ${dark ? "text-[rgb(198,198,210)]" : "text-gray-500"}`}>{f.desc}</p>
                    )}
                  </div>
                ) : (
                  <h3 className="text-lg font-medium text-black">{f.title}</h3>
                )}
                {f.video && (
                  <div className={`${mentiLayout ? "mt-12" : "mt-4"} overflow-hidden rounded-3xl border border-black/5 bg-white-50`}>
                    <video
                      className="h-full w-full object-cover"
                      src={f.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                )}
                {f.images && f.images.length > 0 && (
                  <div
                    className={`mx-auto grid max-w-4xl items-center gap-4 ${mentiLayout ? "mt-12" : "mt-4"}`}
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(f.images.length, 3)}, minmax(0, 1fr))`,
                    }}
                  >
                    {f.images.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src}
                        src={src}
                        alt=""
                        loading="lazy"
                        className="w-full rounded-2xl"
                      />
                    ))}
                  </div>
                )}
                {f.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={f.image}
                    alt={f.title}
                    loading="lazy"
                    className={`mx-auto max-h-[85vh] w-auto max-w-full rounded-3xl ${mentiLayout ? "mt-12" : "mt-4"}`}
                  />
                )}
              </Reveal>
              );
              return dark ? (
                <div key={f.title} className="mt-16 bg-[rgb(58,60,68)]">
                  <div className={`${container} py-16 sm:py-24`}>{body}</div>
                </div>
              ) : (
                <div key={f.title} className={`${container} ${fi === 0 ? "" : mentiLayout ? "pt-28" : "pt-16"}`}>
                  {body}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Most memorable moment */}
      {project.memorable && (mentiLayout ? (
        <section className={`${container} ${sectionGap}`}>
          <Reveal>
            <div className="glass-card rounded-3xl p-8 sm:p-12">
              <p className={eyebrow}>
                Most memorable moment
              </p>
              <h2 className="mt-4 max-w-4xl font-serif text-title italic text-black">
                {project.memorable.title}
              </h2>
              <div
                className="prose mt-8 max-w-[65ch] text-lg"
                dangerouslySetInnerHTML={{ __html: project.memorable.body }}
              />
            </div>
          </Reveal>
        </section>
      ) : (
      <section className={`${container} ${sectionGap}`}>
        <Reveal>
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className={eyebrow}>
              Most memorable moment
            </div>
            <h2 className="mt-3 font-serif text-heading italic text-black">
              {project.memorable.title}
            </h2>
            <div
              className="prose mt-5 max-w-[65ch]"
              dangerouslySetInnerHTML={{ __html: project.memorable.body }}
            />
          </div>
        </Reveal>
      </section>
      ))}

      {/* Story */}
      {project.stories.length > 0 && (mentiLayout ? (
        <section className={sectionGap}>
          <div className={container}>
            <Reveal>
              <p className={eyebrow}>
                The story
              </p>
              <h2 className="mt-4 max-w-4xl font-serif text-title italic text-black">
                {project.storyHeading}
              </h2>
            </Reveal>
          </div>
          {/* Full-bleed alternating bands, one per chapter */}
          <div className="mt-14">
            {project.stories.map((s, i) => {
              const dark = i % 2 === 1;
              const bg = dark ? "rgb(58, 60, 68)" : "rgb(242, 243, 247)";
              const parts = s.subheading.split(/(?<=[.!?])\s+/);
              return (
                <div key={s.subheading} style={{ backgroundColor: bg }}>
                  <div className={`${container} py-16 sm:py-24`}>
                    <Reveal>
                      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                        <div>
                        <h3 className="text-heading font-bold tracking-tight">
                          {parts.map((t, k) => (
                            <span
                              key={t}
                              className={`block ${
                                dark
                                  ? k === 0
                                    ? "text-white"
                                    : "text-gray-300"
                                  : k === 0
                                    ? "text-black"
                                    : "text-gray-500"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </h3>
                        {s.tags && s.tags.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <span
                                key={t}
                                className={`rounded-full px-3 py-1 text-xs font-bold ${dark ? "border border-white/20 bg-white/10 text-white/85" : ""}`}
                                style={dark ? undefined : tagColors(project.color)}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        </div>
                        <div
                          className={`prose self-center text-lg ${dark ? "prose-invert" : ""}`}
                          dangerouslySetInnerHTML={{ __html: s.body }}
                        />
                      </div>
                      {s.graphic === "observation-map" ? (
                        <div className="mt-12">
                          <ObservationMap color={project.color} />
                        </div>
                      ) : s.graphic === "mindset-shift" ? (
                        <div className="mt-12">
                          <MindsetShift color={project.color} />
                        </div>
                      ) : s.graphic === "before-after" ? (
                        <div className="mt-12">
                          <BeforeAfter color={project.color} dark={dark} />
                        </div>
                      ) : (
                        s.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={s.image}
                            alt={s.subheading}
                            loading="lazy"
                            className="mt-12 w-full rounded-3xl"
                          />
                        )
                      )}
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className={`${container} ${sectionGap}`}>
          <Reveal>
            <h2 className="font-serif text-heading italic text-black">
              {project.storyHeading}
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-14">
            {project.stories.map((s) => (
              <Reveal key={s.subheading}>
                <div className="grid gap-6 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="text-xl font-medium text-black">
                      {s.subheading}
                    </h3>
                    <div
                      className="prose mt-3"
                      dangerouslySetInnerHTML={{ __html: s.body }}
                    />
                  </div>
                  {s.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.image}
                      alt={s.subheading}
                      loading="lazy"
                      className="w-full rounded-3xl border border-black/5 bg-white-50"
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* See more projects */}
      <section className={`${container} ${sectionGap}`}>
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
    </article>
  );
}
