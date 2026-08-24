import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ObservationMap from "@/components/ObservationMap";
import MindsetShift from "@/components/MindsetShift";
import BeforeAfter from "@/components/BeforeAfter";

const container = "mx-auto w-full max-w-[1100px] px-6 sm:px-12";

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
      <div className="text-xs uppercase tracking-widest text-medium-gray">
        {label}
      </div>
      <div className="mt-1 text-sm text-black">{value}</div>
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
  const next = projects[(idx + 1) % projects.length];

  const mentiLayout = project.slug === "valueglance";

  return (
    <article className={mentiLayout ? "" : "pt-32 sm:pt-40"}>
      {mentiLayout ? (
        <>
          {/* Full-bleed hero banner at its natural aspect (uncropped) */}
          {project.headerImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.headerImage} alt="" className="w-full" />
          )}

          {/* Case info: title + subtitle + blurb + problem/outcome, meta rail right */}
          <header className={`${container} mt-12`}>
            <Reveal>
              <div className="grid gap-10 md:grid-cols-[minmax(0,8fr)_minmax(0,3fr)] md:gap-16">
                <div>
                  <Link
                    href="/#mywork"
                    className="text-sm text-medium-gray transition-colors hover:text-black"
                  >
                    ← All work
                  </Link>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium text-white"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.tag}
                    </span>
                    <span className="text-sm text-medium-gray">{project.year}</span>
                  </div>
                  <h1 className="mt-6 text-4xl font-bold tracking-tight text-black sm:text-5xl">
                    {project.name}
                  </h1>
                  <p className="mt-3 max-w-3xl text-xl font-semibold leading-snug text-medium-gray sm:text-2xl sm:leading-[1.35]">
                    {project.summary}
                  </p>

                  {/* Blurb (the old Overview) */}
                  <div
                    className="prose mt-8 max-w-none text-lg"
                    dangerouslySetInnerHTML={{ __html: project.overview }}
                  />

                  {/* Problem / Outcome */}
                  {(project.problem || project.outcome) && (
                    <div className="mt-10 grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-2">
                      {project.problem && (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-medium-gray">
                            Problem
                          </div>
                          <p className="mt-2 leading-relaxed text-gray-700">{project.problem}</p>
                        </div>
                      )}
                      {project.outcome && (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-medium-gray">
                            Outcome
                          </div>
                          <p className="mt-2 leading-relaxed text-gray-700">{project.outcome}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Meta rail */}
                <aside className="flex flex-row flex-wrap gap-8 md:flex-col md:pt-24">
                  <MetaItem label="Role" value={project.role} />
                  <MetaItem label="Timeline" value={project.duration} />
                  <MetaItem label="Team" value={project.team} />
                  <MetaItem label="Tools" value={project.tools} />
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-dark inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
                    >
                      Visit live site →
                    </a>
                  )}
                </aside>
              </div>
            </Reveal>
          </header>

          {/* Hero media */}
          {(project.mainVideo || project.headerImage) && (
            <div className={`${container} mt-14`}>
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
        </>
      ) : (
        <>
          {/* Header */}
          <header className={container}>
            <Reveal>
              <Link
                href="/#mywork"
                className="text-sm text-medium-gray transition-colors hover:text-black"
              >
                ← All work
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium text-white"
                  style={{ backgroundColor: project.color }}
                >
                  {project.tag}
                </span>
                <span className="text-sm text-medium-gray">{project.year}</span>
              </div>
              <h1 className="mt-4 text-4xl font-medium tracking-tight text-black sm:text-6xl">
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
              <div className="glass-card grid grid-cols-2 gap-6 rounded-3xl p-8 sm:grid-cols-4">
                <MetaItem label="Role" value={project.role} />
                <MetaItem label="Duration" value={project.duration} />
                <MetaItem label="Tools" value={project.tools} />
                <MetaItem label="Team" value={project.team} />
              </div>
            </Reveal>
          </div>

          {/* Overview */}
          <section className={`${container} mt-16`}>
            <Reveal>
              <h2 className="font-serif text-2xl italic text-black sm:text-3xl">
                Overview
              </h2>
              <div
                className="prose mt-4 max-w-3xl text-lg"
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
        <section className={`${container} mt-16`}>
          <Reveal>
            <h2 className="font-serif text-2xl italic text-black sm:text-3xl">
              Solution
            </h2>
          </Reveal>
          <div className={mentiLayout ? "mt-10 flex flex-col gap-20" : "mt-6 flex flex-col gap-10"}>
            {project.features.map((f) => {
              const m = mentiLayout ? f.title.match(/^(Feature #\d+)\s*[:—-]?\s*(.*)$/i) : null;
              return (
              <Reveal key={f.title}>
                {m ? (
                  <div className="grid gap-6 md:grid-cols-2 md:gap-16">
                    <h3 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                      <span className="block text-black">{m[1]}</span>
                      <span className="block text-medium-gray">{m[2]}</span>
                    </h3>
                    {f.desc && (
                      <p className="self-center text-lg leading-relaxed text-gray-500">{f.desc}</p>
                    )}
                  </div>
                ) : (
                  <h3 className="text-lg font-medium text-black">{f.title}</h3>
                )}
                {f.video && (
                  <div className={`${mentiLayout ? "mt-8" : "mt-4"} overflow-hidden rounded-3xl border border-black/5 bg-white-50`}>
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
                {f.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={f.image}
                    alt={f.title}
                    loading="lazy"
                    className="mt-4 w-full rounded-3xl"
                  />
                )}
              </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Story */}
      {mentiLayout ? (
        <section className="mt-24">
          <div className={container}>
            <Reveal>
              <h2 className="font-serif text-2xl italic text-black sm:text-3xl">
                {project.storyHeading}
              </h2>
            </Reveal>
          </div>
          {/* Full-bleed alternating bands, one per chapter */}
          <div className="mt-10">
            {project.stories.map((s, i) => {
              const variant = i % 3;
              const dark = variant === 1;
              const bg =
                variant === 0
                  ? `color-mix(in oklab, ${project.color} 7%, var(--white-100))`
                  : variant === 1
                    ? "rgb(18, 17, 24)"
                    : "rgb(238, 239, 245)";
              const parts = s.subheading.split(/(?<=[.!?])\s+/);
              return (
                <div key={s.subheading} style={{ backgroundColor: bg }}>
                  <div className={`${container} py-16 sm:py-24`}>
                    <Reveal>
                      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                        <div>
                        <h3 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
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
                                    : "text-medium-gray"
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
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${dark ? "border border-white/20 bg-white/10 text-gray-300" : ""}`}
                                style={
                                  dark
                                    ? undefined
                                    : {
                                        color: `color-mix(in oklab, ${project.color} 45%, var(--gray-700))`,
                                        backgroundColor: `color-mix(in oklab, ${project.color} 14%, var(--white))`,
                                      }
                                }
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
        <section className={`${container} mt-20`}>
          <Reveal>
            <h2 className="font-serif text-2xl italic text-black sm:text-3xl">
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
      )}

      {/* Most memorable moment */}
      <section className={`${container} mt-20`}>
        <Reveal>
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className="text-xs uppercase tracking-widest text-medium-gray">
              Most memorable moment
            </div>
            <h2 className="mt-3 font-serif text-2xl italic text-black sm:text-3xl">
              {project.memorable.title}
            </h2>
            <div
              className="prose mt-5 max-w-3xl"
              dangerouslySetInnerHTML={{ __html: project.memorable.body }}
            />
          </div>
        </Reveal>
      </section>

      {/* Next project */}
      <section className={`${container} mt-20`}>
        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            className="glass-card group flex items-center justify-between rounded-3xl p-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
          >
            <div>
              <div className="text-xs uppercase tracking-widest text-medium-gray">
                Next project
              </div>
              <div className="mt-2 text-2xl font-medium text-black">
                {next.name}
              </div>
            </div>
            <span className="text-2xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
