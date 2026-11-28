import { projects } from "./data";
import { buildSitemapEntries, getSiteUrl } from "./lib/portfolio";

export default function sitemap() {
  return buildSitemapEntries(projects, getSiteUrl());
}
