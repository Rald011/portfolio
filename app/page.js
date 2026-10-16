import Clock from "./Clock";
import { profile, projects, skills } from "./data";

export default function Home() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <main>
      <header className="hero">
        <Clock timeZone={profile.timezone} city="Davao" />
        <h1>
          <span>{first}</span>
          <span>{rest.join(" ")}</span>
        </h1>
        <p className="role">{profile.role}, {profile.school}</p>
      </header>

      <section aria-labelledby="about">
        <h2 id="about">About</h2>
        <p className="intro">{profile.intro}</p>
      </section>

      <section aria-labelledby="work">
        <h2 id="work">Projects</h2>
        <ul className="projects">
          {projects.map((p) => (
            <li key={p.title}>
              <a href={p.href} target="_blank" rel="noreferrer">
                <span className="p-year">{p.year}</span>
                <span className="p-main">
                  <span className="p-title">{p.title}</span>
                  <span className="p-what">{p.what}</span>
                </span>
                <span className="p-stack">{p.stack.join(", ")}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="skills">
        <h2 id="skills">Skills</h2>
        <dl className="skills">
          {skills.map((s) => (
            <div key={s.group}>
              <dt>{s.group}</dt>
              <dd>{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
        <a className="mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <p className="links">
          {profile.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </p>
      </section>

      <footer>
        <p>{profile.name}, {profile.city}</p>
      </footer>
    </main>
  );
}
