export const SITE_SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function resolveActiveSection({
  pathname,
  intersectingIds = [],
  scrollY = 0,
  innerHeight = 0,
  scrollHeight = 0,
  sectionIds = SITE_SECTIONS.map((s) => s.id),
}) {
  if (pathname !== "/") {
    return "projects";
  }

  if (
    scrollHeight > 0 &&
    innerHeight > 0 &&
    scrollY + innerHeight >= scrollHeight - 40
  ) {
    return sectionIds[sectionIds.length - 1] ?? "contact";
  }

  for (const id of sectionIds) {
    if (intersectingIds.includes(id)) {
      return id;
    }
  }

  return null;
}

export function getProjectNavigation(projects, slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return {
    project: projects[index],
    prev: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}

export function buildProjectFactLinks(project) {
  const links = [];
  if (project.demo) {
    links.push({
      dt: "Live demo",
      label: "Try it",
      href: project.demo,
    });
  }
  if (project.repo) {
    links.push({
      dt: "Code",
      label: "GitHub repository",
      href: project.repo,
    });
  }
  if (project.paper) {
    links.push({
      dt: "Paper",
      label: "Read the PDF",
      href: project.paper,
    });
  }
  return links;
}

export function getSiteUrl() {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (vercel ? `https://${vercel}` : "http://localhost:3000");

  try {
    const parsed = new URL(raw);
    return parsed.origin;
  } catch {
    return "http://localhost:3000";
  }
}

export function buildSitemapEntries(projects, baseUrl) {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  return [
    {
      url: `${cleanBase}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${cleanBase}/projects/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
