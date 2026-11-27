import Link from "next/link";
import CopyEmail from "./CopyEmail";
import { profile, projects, skills } from "./data";

export default function Home() {
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-main">
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-status">{profile.availability}</p>
          <p className="hero-links">
            <a href="#projects">See projects</a>
            <a href="#contact">Get in touch</a>
          </p>
        </div>
        <dl className="now">
          {profile.now.map((n) => (
            <div key={n.label}>
              <dt>{n.label}</dt>
              <dd>{n.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="about" aria-labelledby="about-h">
        <h2 id="about-h">About</h2>
        {profile.about.map((para) => (
          <p key={para} className="about-p">
            {para}
          </p>
        ))}
      </section>

      <section id="projects" aria-labelledby="projects-h">
        <h2 id="projects-h">Projects</h2>
        <ul className="projects">
          {projects.map((p) => (
            <li key={p.slug}>
              <span className="p-year">{p.year}</span>
              <div className="p-body">
                <h3>
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                  {p.status && <span className="p-status">{p.status}</span>}
                </h3>
                <p className="p-what">{p.what}</p>
                <p className="p-stack">{p.stack.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="skills" aria-labelledby="skills-h">
        <h2 id="skills-h">Skills</h2>
        <dl className="skills">
          {skills.map((s) => (
            <div key={s.group}>
              <dt>{s.group}</dt>
              <dd>{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" aria-labelledby="contact-h">
        <h2 id="contact-h">Contact</h2>
        <a className="mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <p className="links">
          <CopyEmail email={profile.email} />
          {profile.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
              <span className="sr"> (opens in a new tab)</span>
            </a>
          ))}
        </p>
      </section>

      <footer>
        <p>
          {profile.name}, {profile.city}
        </p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}
