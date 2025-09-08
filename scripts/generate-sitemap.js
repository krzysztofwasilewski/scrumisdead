#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const SITE_URL = "https://scrumisdead.org";
const BUILD_DIR = join(__dirname, "..", "dist");

// Read the content index to get all posts
function getPosts() {
  try {
    const contentIndexPath = join(
      __dirname,
      "..",
      "src",
      "content",
      "index.ts"
    );
    const contentIndex = readFileSync(contentIndexPath, "utf8");

    // Extract frontmatter data from the content index
    const frontmatterMatch = contentIndex.match(
      /const frontmatterData: Record<string, Omit<PostMeta, "slug">> = \{([\s\S]*?)\};/
    );

    if (!frontmatterMatch) {
      console.warn("Could not extract frontmatter data from content index");
      return [];
    }

    const frontmatterString = frontmatterMatch[1];
    const posts = [];

    // Parse the frontmatter data object to extract dates
    const postMatches = frontmatterString.matchAll(
      /"([^"]+)":\s*\{\s*title:\s*"[^"]*",\s*date:\s*"([^"]+)"/g
    );

    for (const match of postMatches) {
      const slug = match[1];
      const date = match[2];
      posts.push({
        slug,
        url: `${SITE_URL}/post/${slug}`,
        lastmod: date,
        changefreq: "monthly",
        priority: "0.8",
      });
    }

    return posts;
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

// Generate sitemap.xml
function generateSitemap() {
  const posts = getPosts();

  const staticPages = [
    {
      url: SITE_URL,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      url: `${SITE_URL}/archive`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.7",
    },
  ];

  const allPages = [...staticPages, ...posts];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const sitemapPath = join(BUILD_DIR, "sitemap.xml");
  writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Generated sitemap.xml with ${allPages.length} pages`);
}

// Generate robots.txt
function generateRobots() {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin or private areas (if any)
Disallow: /admin/
Disallow: /private/

# Allow all search engines to crawl everything else
Allow: /post/
Allow: /archive/
`;

  const robotsPath = join(BUILD_DIR, "robots.txt");
  writeFileSync(robotsPath, robots);
  console.log("✅ Generated robots.txt");
}

// Main execution
function main() {
  console.log("🚀 Generating sitemap and robots.txt...");

  try {
    generateSitemap();
    generateRobots();
    console.log("✨ Sitemap and robots.txt generation completed successfully!");
  } catch (error) {
    console.error("❌ Error generating sitemap/robots:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap, generateRobots };
