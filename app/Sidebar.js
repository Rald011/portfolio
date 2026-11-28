"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { SITE_SECTIONS, resolveActiveSection } from "./lib/portfolio";

export default function Sidebar({ name, shortName, role }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const pathname = usePathname();
  const onHome = pathname === "/";
  const current = onHome ? active : "projects";
  const burger = useRef(null);
  const firstLink = useRef(null);
  const intersectingRef = useRef(new Set());

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

  // Highlight the section currently in view, including Contact at page bottom.
  useEffect(() => {
    intersectingRef.current = new Set();

    const syncActive = () => {
      const next = resolveActiveSection({
        pathname,
        intersectingIds: Array.from(intersectingRef.current),
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        scrollHeight: document.documentElement.scrollHeight,
      });
      if (next) setActive(next);
    };

    if (pathname !== "/") {
      syncActive();
      return;
    }

    const els = SITE_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    );
    if (!("IntersectionObserver" in window) || !els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectingRef.current.add(entry.target.id);
          } else {
            intersectingRef.current.delete(entry.target.id);
          }
        }
        syncActive();
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    els.forEach((el) => io.observe(el));
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [pathname]);

  return (
    <header className="side">
      <div className="bar">
        <Link className="bar-name" href="/" onClick={() => setOpen(false)}>
          {shortName}
        </Link>
        <div className="bar-actions">
          <ThemeToggle />
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
            {SITE_SECTIONS.map((s, i) => (
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

        <ThemeToggle />
      </div>
    </header>
  );
}
