import Sidebar from "./Sidebar";
import { profile, projects, skills } from "./data";

export default function Home() {
  return (
    <div className="shell">
      <Sidebar
        name={profile.name}
        shortName={profile.shortName}
        role={profile.role}
        timezone={profile.timezone}
        city={profile.city}
      />

      <main id="top">
        <section className="hero">
          <h1>
            {profile.name.split(" ").map((word) => (
              <span key={word}>{word}</span>
            ))}
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-status">{profile.availability}</p>
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
              <li key={p.title}>
                <div className="p-head">
                  <h3>
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noreferrer">
                        {p.title}
                        <span className="sr"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <span className="p-year">{p.year}</span>
                </div>
                <p className="p-what">{p.what}</p>
                <p className="p-stack">{p.stack.join(", ")}</p>
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
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
                <span className="sr"> (opens in a new tab)</span>
              </a>
            ))}
          </p>
        </section>

        <footer>
          <p>{profile.name}, {profile.city}</p>
        </footer>
      </main>
    </div>
  );
}
