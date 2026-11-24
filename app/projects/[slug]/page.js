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
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <main id="top" className="project">
      <div className="project-head" data-reveal>
        <Link className="crumb" href="/#projects">
          Back to projects
        </Link>
        <h1>{p.title}</h1>
        {p.context && <p className="proj-meta">{p.context}</p>}
        <p className="lead">{p.what}</p>
        {(p.repo || p.paper) && (
          <p className="proj-links">
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer">
                Source code on GitHub
                <span className="sr"> (opens in a new tab)</span>
              </a>
            )}
            {p.paper && (
              <a href={p.paper} target="_blank" rel="noreferrer">
                Read the paper (PDF)
                <span className="sr"> (opens in a new tab)</span>
              </a>
            )}
          </p>
        )}
      </div>

      {p.images?.length > 0 && (
        <section data-reveal aria-labelledby="shots-h">
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
        <section data-reveal aria-labelledby="about-h">
          <h2 id="about-h">About</h2>
          {p.about.map((para) => (
            <p key={para} className="about-p">
              {para}
            </p>
          ))}
        </section>
      )}

      {p.features?.length > 0 && (
        <section data-reveal aria-labelledby="features-h">
          <h2 id="features-h">What it does</h2>
          <ul className="list">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      {p.design?.length > 0 && (
        <section data-reveal aria-labelledby="design-h">
          <h2 id="design-h">Design decisions</h2>
          <ul className="list">
            {p.design.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>
      )}

      <section data-reveal aria-labelledby="stack-h">
        <h2 id="stack-h">Built with</h2>
        <p className="about-p">{p.stack.join(", ")}</p>
      </section>
    </main>
  );
}
