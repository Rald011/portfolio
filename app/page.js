import Link from "next/link";
import { profile, projects, skills } from "./data";

function SplitName({ text }) {
  let offset = 0;
  const words = text.split(" ");
  return words.map((word, w) => {
    const start = offset;
    offset += word.length + 1;
    return (
      <span key={w}>
        <span className="word">
          {[...word].map((c, i) => (
            <span key={i} className="ch" style={{ "--i": start + i }}>
              {c}
            </span>
          ))}
        </span>
        {w < words.length - 1 ? " " : null}
      </span>
    );
  });
}

export default function Home() {
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <h1 aria-label={profile.name}>
            <span aria-hidden="true">
              <SplitName text={profile.name} />
            </span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-status">{profile.availability}</p>
        </div>
        <span className="cue" aria-hidden="true" />
      </section>

      <section id="about" aria-labelledby="about-h" data-reveal>
        <h2 id="about-h">About</h2>
        {profile.about.map((para, i) => (
          <p key={para} className="about-p" data-reveal style={{ "--d": i + 1 }}>
            {para}
          </p>
        ))}
      </section>

      <section id="projects" aria-labelledby="projects-h" data-reveal>
        <h2 id="projects-h">Projects</h2>
        <ul className="projects">
          {projects.map((p, i) => (
            <li key={p.slug} data-reveal style={{ "--d": i }}>
              <div className="p-head">
                <h3>
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                </h3>
                <span className="p-year">{p.year}</span>
              </div>
              <p className="p-what">{p.what}</p>
              <p className="p-stack">{p.stack.join(", ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="skills" aria-labelledby="skills-h" data-reveal>
        <h2 id="skills-h">Skills</h2>
        <dl className="skills">
          {skills.map((s, i) => (
            <div key={s.group} data-reveal style={{ "--d": i }}>
              <dt>{s.group}</dt>
              <dd>{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" aria-labelledby="contact-h" data-reveal>
        <h2 id="contact-h">Contact</h2>
        <a className="mail" data-magnet href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <p className="links">
          {profile.links.map((l) => (
            <a key={l.label} data-magnet href={l.href} target="_blank" rel="noreferrer">
              {l.label}
              <span className="sr"> (opens in a new tab)</span>
            </a>
          ))}
        </p>
      </section>

      <footer data-reveal>
        <p>
          {profile.name}, {profile.city}
        </p>
      </footer>
    </main>
  );
}
