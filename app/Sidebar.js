"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Clock from "./Clock";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Sidebar({ name, shortName, role, timezone, city }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const pathname = usePathname();
  const onHome = pathname === "/";
  const current = onHome ? active : "projects";
  const burger = useRef(null);
  const firstLink = useRef(null);

  // Mobile menu: lock page scroll, close on Escape, move focus in.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu if the window becomes desktop width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 56rem)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || !els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header className="side">
      <div className="bar">
        <Link className="bar-name" href="/" onClick={() => setOpen(false)}>
          {shortName}
        </Link>
        <button
          ref={burger}
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="menu" className={open ? "panel open" : "panel"}>
        <div className="who">
          <Link className="who-name" href="/">
            {name}
          </Link>
          <p className="who-role">{role}</p>
        </div>

        <nav aria-label="Sections">
          <ul>
            {sections.map((s, i) => (
              <li key={s.id}>
                <Link
                  ref={i === 0 ? firstLink : null}
                  href={`/#${s.id}`}
                  aria-current={current === s.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot">
          <Clock timeZone={timezone} city={city} />
        </div>
      </div>
    </header>
  );
}
