import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects } from "../../data";
import {
  buildProjectFactLinks,
  getProjectNavigation,
} from "../../lib/portfolio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.title} | ${profile.name}`;
  return {
    title,
    description: p.what,
    openGraph: { title, description: p.what, type: "article" },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const nav = getProjectNavigation(projects, slug);
  if (!nav) notFound();

  const { project: p, prev, next } = nav;
  const factLinks = buildProjectFactLinks(p);

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
            {p.role && (
              <div>
                <dt>My role</dt>
                <dd>{p.role}</dd>
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
            {factLinks.map((link) => (
              <div key={link.dt}>
                <dt>{link.dt}</dt>
                <dd>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <span className="sr"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="project-main">
          {p.images?.length > 0 && (
            <section aria-labelledby="shots-h">
              <h2 id="shots-h">Screenshots</h2>
              <div className="shots">
                {p.images.map((img) => (
                  <figure key={img.src}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width || 1280}
                      height={img.height || 800}
                      sizes="(min-width: 56rem) 44rem, 100vw"
                    />
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

          {p.mine?.length > 0 && (
            <section aria-labelledby="mine-h">
              <h2 id="mine-h">What I built</h2>
              <ul className="list">
                {p.mine.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
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
