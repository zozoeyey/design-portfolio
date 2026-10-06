import Link from "next/link";
import type { Project } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ObservationMap from "@/components/ObservationMap";
import MindsetShift from "@/components/MindsetShift";
import BeforeAfter from "@/components/BeforeAfter";
import RequestsOverlap from "@/components/RequestsOverlap";
import BeforeAfterWipe from "@/components/BeforeAfterWipe";
import { container, eyebrow, sectionGap, tagColors } from "@/lib/ui";

/**
 * The body of a case study: hero, header, features, memorable moment, story
 * bands. Rendered by /work/[slug] (with `children` for the page-only bits like
 * "More projects") and inside the Playground preview with `embedded`, which
 * drops the navbar offset and back link and uses a narrower container.
 */

const embeddedContainer = "mx-auto w-full max-w-[1100px] px-6 sm:px-10";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className={eyebrow}>{label}</div>
      <div className="mt-2 text-base leading-relaxed text-black sm:text-lg">{value}</div>
    </div>
  );
}

export default function CaseStudy({
  project,
  embedded = false,
  children,
}: {
  project: Project;
  embedded?: boolean;
  children?: React.ReactNode;
}) {
  const c = embedded ? embeddedContainer : container;
  return (
    <article
      className={embedded ? "pb-16" : project.headerImage ? "" : "pt-28 sm:pt-32"}
      style={{ "--hl": project.color } as React.CSSProperties}
    >
      {/* Hero banner, same width as the navbar */}
      {project.headerImage && (
        <div className={`${c} ${embedded ? "pt-8" : "pt-28 sm:pt-32"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.headerImage} alt="" className="w-full overflow-hidden rounded-3xl" />
        </div>
      )}

      {/* Case info: back link, tag/year, title, summary, blurb, problem/outcome, meta */}
      <header className={`${c} ${project.headerImage || !embedded ? "mt-12" : "mt-8"}`}>
        <Reveal>
          {!embedded && (
            <Link href="/#mywork" className="mb-6 inline-block text-sm text-gray-500 transition-colors hover:text-black">
              ← All work
            </Link>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={tagColors(project.color)}>
              {project.tag}
            </span>
            <span className="text-sm text-gray-500">{project.year}</span>
          </div>
          <h1 id="overview" className="mt-6 scroll-mt-32 text-display font-bold tracking-tight text-black">{project.name}</h1>
          <p className="mt-3 max-w-3xl text-lead font-medium text-gray-500">{project.summary}</p>

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

          {(project.problem || project.outcome) && (
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {project.problem && (
                <div className="glass-card rounded-3xl p-6 sm:p-8">
                  <p className={eyebrow}>Problem</p>
                  <p className="mt-3 text-lg leading-relaxed text-black">{project.problem}</p>
                </div>
              )}
              {project.outcome && (
                <div className="glass-card rounded-3xl p-6 sm:p-8">
                  <p className={eyebrow}>Outcome</p>
                  <p className="mt-3 text-lg leading-relaxed text-black">{project.outcome}</p>
                </div>
              )}
            </div>
          )}

          <div className="glass-card mt-4 grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-4">
            <MetaItem label="Role" value={project.role} />
            <MetaItem label="Duration" value={project.duration} />
            <MetaItem label="Tools" value={project.tools} />
            <MetaItem label="Team" value={project.team} />
          </div>
        </Reveal>
      </header>

      {/* Features */}
      {project.features.length > 0 && (
        <section className={sectionGap}>
          <div className={c}>
            <Reveal>
              <h2 id="solution" className="scroll-mt-32 font-serif text-title italic text-black">
                {project.featuresHeading ?? "Solution"}
              </h2>
            </Reveal>
          </div>
          <div className="mt-10">
            {project.features.map((f, fi) => {
              const m = f.title.match(/^([A-Za-z]+ #\d+)\s*[:—-]?\s*(.*)$/i);
              const dark = f.band === "dark";
              const body = (
                <Reveal key={f.title}>
                  <div className={`grid gap-6 ${f.desc ? "md:grid-cols-2 md:gap-16" : ""}`}>
                    <h3 id={`feature-${fi + 1}`} className="scroll-mt-32 text-heading font-bold tracking-tight">
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
                      <p className={`self-center whitespace-pre-line text-lg leading-relaxed ${dark ? "text-[rgb(198,198,210)]" : "text-gray-500"}`}>
                        {f.desc}
                      </p>
                    )}
                  </div>
                  {f.video && (
                    <div className="mt-12 overflow-hidden rounded-3xl border border-black/5 bg-white-50">
                      <video className="h-full w-full object-cover" src={f.video} autoPlay muted loop playsInline />
                    </div>
                  )}
                  {f.images && f.images.length > 0 && (
                    <div
                      className="mx-auto mt-12 grid max-w-4xl items-center gap-4"
                      style={{ gridTemplateColumns: `repeat(${Math.min(f.images.length, 3)}, minmax(0, 1fr))` }}
                    >
                      {f.images.map((src) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={src} src={src} alt="" loading="lazy" className="w-full rounded-2xl" />
                      ))}
                    </div>
                  )}
                  {f.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.image} alt={f.title} loading="lazy" className="mx-auto mt-12 max-h-[85vh] w-auto max-w-full rounded-3xl" />
                  )}
                </Reveal>
              );
              return dark ? (
                <div key={f.title} className="mt-16 bg-[rgb(58,60,68)]">
                  <div className={`${c} py-16 sm:py-24`}>{body}</div>
                </div>
              ) : (
                <div key={f.title} className={`${c} ${fi === 0 ? "" : "pt-28"}`}>
                  {body}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Most memorable moment: heading left, story right (same split as the story bands) */}
      {project.memorable && (
        <section id="memorable" className={`${c} ${sectionGap} scroll-mt-32`}>
          <Reveal>
            <div className="glass-card grid gap-8 rounded-3xl p-8 sm:p-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div>
                <p className={eyebrow}>Most memorable moment</p>
                <h2 className="mt-4 font-serif text-title italic text-black">{project.memorable.title}</h2>
              </div>
              <div
                className="prose max-w-[65ch] text-lg"
                dangerouslySetInnerHTML={{ __html: project.memorable.body }}
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* Story: full-bleed alternating bands, one per chapter */}
      {project.stories.length > 0 && (
        <section className={sectionGap}>
          <div id="story" className={`${c} scroll-mt-32`}>
            <Reveal>
              <p className={eyebrow}>The story</p>
              <h2 className="mt-4 max-w-4xl font-serif text-title italic text-black">{project.storyHeading}</h2>
            </Reveal>
          </div>
          <div className="mt-14">
            {project.stories.map((s, i) => {
              const dark = i % 2 === 1;
              const bg = dark ? "rgb(58, 60, 68)" : "rgb(242, 243, 247)";
              const parts = s.subheading.split(/(?<=[.!?])\s+/);
              return (
                <div key={s.subheading} id={`chapter-${i + 1}`} className="scroll-mt-20" style={{ backgroundColor: bg }}>
                  <div className={`${c} py-16 sm:py-24`}>
                    <Reveal>
                      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                        <div>
                          <h3 className="text-heading font-bold tracking-tight">
                            {parts.map((t, k) => (
                              <span
                                key={t}
                                className={`block ${
                                  dark ? (k === 0 ? "text-white" : "text-gray-300") : k === 0 ? "text-black" : "text-gray-500"
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
                      ) : s.graphic === "requests-overlap" ? (
                        <div className="mt-12">
                          <RequestsOverlap color={project.color} />
                        </div>
                      ) : s.graphic === "onboarding-wipe" ? (
                        <div className="mt-12">
                          <BeforeAfterWipe color={project.color} />
                        </div>
                      ) : s.graphic === "before-after" ? (
                        <div className="mt-12">
                          <BeforeAfter color={project.color} dark={dark} />
                        </div>
                      ) : (
                        s.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.image} alt={s.subheading} loading="lazy" className="mt-12 w-full rounded-3xl" />
                        )
                      )}
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {children}
    </article>
  );
}
