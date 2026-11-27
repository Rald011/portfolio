import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects } from "../../data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title} | ${profile.name}`, description: p.what };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <main id="top" className="project">
      <div className="project-head">
        <Link className="crumb" href="/#projects">
          Back to projects
        </Link>
        <h1>{p.title}</h1>
        <p className="lead">{p.what}</p>
      </div>

      <div className="project-grid">
        <aside className="facts" aria-label="Project details">
          <dl>
            {p.year && (
              <div>
                <dt>Year</dt>
                <dd>{p.year}</dd>
              </div>
            )}
            {p.status && (
              <div>
                <dt>Status</dt>
                <dd>{p.status}</dd>
              </div>
            )}
            {p.context && (
              <div>
                <dt>Context</dt>
                <dd>{p.context}</dd>
              </div>
            )}
            <div>
              <dt>Built with</dt>
              <dd>{p.stack.join(", ")}</dd>
            </div>
            {p.repo && (
              <div>
                <dt>Code</dt>
                <dd>
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    GitHub repository
                    <span className="sr"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}
            {p.paper && (
              <div>
                <dt>Paper</dt>
                <dd>
                  <a href={p.paper} target="_blank" rel="noreferrer">
                    Read the PDF
                    <span className="sr"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </aside>

        <div className="project-main">
          {p.images?.length > 0 && (
            <section aria-labelledby="shots-h">
              <h2 id="shots-h">Screenshots</h2>
              <div className="shots">
                {p.images.map((img) => (
                  <figure key={img.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    {img.caption && <figcaption>{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {p.about?.length > 0 && (
            <section aria-labelledby="about-h">
              <h2 id="about-h">About</h2>
              {p.about.map((para) => (
                <p key={para} className="about-p">
                  {para}
                </p>
              ))}
            </section>
          )}

          {p.features?.length > 0 && (
            <section aria-labelledby="features-h">
              <h2 id="features-h">What it does</h2>
              <ul className="list">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {p.design?.length > 0 && (
            <section aria-labelledby="design-h">
              <h2 id="design-h">Design decisions</h2>
              <ul className="list">
                {p.design.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <nav className="pager" aria-label="More projects">
        {prev ? (
          <Link href={`/projects/${prev.slug}`}>
            <span className="pager-label">Previous project</span>
            <span className="pager-title">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="next" href={`/projects/${next.slug}`}>
            <span className="pager-label">Next project</span>
            <span className="pager-title">{next.title}</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
