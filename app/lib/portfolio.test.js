import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveActiveSection,
  getProjectNavigation,
  buildProjectFactLinks,
  getSiteUrl,
  buildSitemapEntries,
} from "./portfolio.js";

test("resolveActiveSection returns projects on subpages", () => {
  assert.equal(
    resolveActiveSection({
      pathname: "/projects/focusmode",
      intersectingIds: ["about"],
      scrollY: 0,
      innerHeight: 900,
      scrollHeight: 2000,
    }),
    "projects"
  );
});

test("resolveActiveSection highlights contact at bottom of tall viewport", () => {
  assert.equal(
    resolveActiveSection({
      pathname: "/",
      intersectingIds: ["skills"],
      scrollY: 1100,
      innerHeight: 900,
      scrollHeight: 2020,
    }),
    "contact"
  );
});

test("resolveActiveSection picks first intersecting section in document order", () => {
  assert.equal(
    resolveActiveSection({
      pathname: "/",
      intersectingIds: ["projects", "about"],
      scrollY: 200,
      innerHeight: 900,
      scrollHeight: 2500,
    }),
    "about"
  );
});

test("getProjectNavigation returns prev and next neighbors", () => {
  const list = [{ slug: "a" }, { slug: "b" }, { slug: "c" }];
  assert.equal(getProjectNavigation(list, "missing"), null);

  const mid = getProjectNavigation(list, "b");
  assert.equal(mid.project.slug, "b");
  assert.equal(mid.prev.slug, "a");
  assert.equal(mid.next.slug, "c");

  const first = getProjectNavigation(list, "a");
  assert.equal(first.prev, null);
  assert.equal(first.next.slug, "b");
});

test("buildProjectFactLinks includes demo, repo, and paper in order", () => {
  const links = buildProjectFactLinks({
    demo: "https://example.com",
    repo: "https://github.com/test/repo",
    paper: "/papers/paper.pdf",
  });
  assert.deepEqual(
    links.map((l) => l.dt),
    ["Live demo", "Code", "Paper"]
  );
  assert.deepEqual(buildProjectFactLinks({}), []);
});

test("getSiteUrl falls back safely on invalid env values", () => {
  const prev = process.env.NEXT_PUBLIC_SITE_URL;
  const prevVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "not a url";
  assert.equal(getSiteUrl(), "http://localhost:3000");
  process.env.NEXT_PUBLIC_SITE_URL = "https://jeraldp.dev/extra";
  assert.equal(getSiteUrl(), "https://jeraldp.dev");
  if (prev === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = prev;
  if (prevVercel !== undefined) process.env.VERCEL_PROJECT_PRODUCTION_URL = prevVercel;
});

test("buildSitemapEntries builds root and project URLs", () => {
  const entries = buildSitemapEntries(
    [{ slug: "andam-davao" }, { slug: "focusmode" }],
    "https://example.com/"
  );
  assert.deepEqual(
    entries.map((e) => e.url),
    [
      "https://example.com/",
      "https://example.com/projects/andam-davao",
      "https://example.com/projects/focusmode",
    ]
  );
});
