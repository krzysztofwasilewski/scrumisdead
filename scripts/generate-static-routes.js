#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BUILD_DIR = join(__dirname, "..", "dist");
const SRC_CONTENT_INDEX = join(__dirname, "..", "src", "content", "index.ts");

function readIndexHtml() {
  const indexPath = join(BUILD_DIR, "index.html");
  return readFileSync(indexPath, "utf8");
}

function getPostSlugs() {
  try {
    const contentIndex = readFileSync(SRC_CONTENT_INDEX, "utf8");
    const frontmatterMatch = contentIndex.match(
      /const frontmatterData: Record<string, Omit<PostMeta, "slug">> = \{([\s\S]*?)\};/
    );
    if (!frontmatterMatch) return [];
    const frontmatterString = frontmatterMatch[1];
    const slugs = [];
    for (const m of frontmatterString.matchAll(/"([^"]+)"\s*:/g)) {
      slugs.push(m[1]);
    }
    return slugs;
  } catch {
    return [];
  }
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeRouteHtml(routePath, html) {
  const fullDir = join(BUILD_DIR, routePath);
  ensureDir(fullDir);
  writeFileSync(join(fullDir, "index.html"), html);
}

function main() {
  console.log("🧱 Generating static HTML for routes...");
  const html = readIndexHtml();

  // Static routes
  writeRouteHtml("archive", html);
  writeRouteHtml("about", html);

  // Dynamic post routes
  const slugs = getPostSlugs();
  slugs.forEach((slug) => {
    writeRouteHtml(join("post", slug), html);
  });

  // Also emit a top-level 200.html (some hosts use it for SPA fallback)
  writeFileSync(join(BUILD_DIR, "200.html"), html);

  console.log(
    `✅ Emitted static HTML for ${slugs.length + 2} routes (+200.html)`
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
