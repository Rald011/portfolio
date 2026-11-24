"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Effects() {
  const pathname = usePathname();
  const bar = useRef(null);
  const dot = useRef(null);
  const ring = useRef(null);
  const glow = useRef(null);

  // Scroll progress bar and hero parallax.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = document.querySelector(".hero");
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
      if (hero && !reduce && y < 1400) hero.style.setProperty("--scroll", String(y));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Reveal elements as they scroll into view.
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Custom cursor, spotlight and magnetic links (mouse devices only).
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.dataset.cursor = "on";
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      root.dataset.moved = "1";
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (glow.current) {
        glow.current.style.setProperty("--mx", `${x}px`);
        glow.current.style.setProperty("--my", `${y}px`);
      }
      document.querySelectorAll("[data-magnet]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        const near = Math.hypot(dx, dy) < Math.max(r.width, 90);
        el.style.transform = near ? `translate(${dx * 0.25}px, ${dy * 0.25}px)` : "";
      });
    };
    const onOver = (e) => {
      root.dataset.hover = e.target.closest?.("a, button") ? "1" : "";
    };
    const onDown = () => (root.dataset.press = "1");
    const onUp = () => (root.dataset.press = "");
    const onLeave = () => delete root.dataset.moved;

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      delete root.dataset.cursor;
      delete root.dataset.moved;
    };
  }, []);

  return (
    <>
      <div ref={bar} className="progress" aria-hidden="true" />
      <div ref={glow} className="spotlight" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
