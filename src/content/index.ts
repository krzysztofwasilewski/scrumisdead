// src/content/index.ts
export type PostMeta = {
  title: string;
  date: string;
  tag?: string;
  excerpt?: string;
  slug: string;
};

// Manual frontmatter data since the MDX plugin isn't extracting it properly
const frontmatterData: Record<string, Omit<PostMeta, "slug">> = {
  "the-day-standups-stood-still": {
    title: "The Day Stand‑ups Stood Still",
    date: "2025-08-19",
    tag: "process",
    excerpt:
      "Daily rituals became theater. Here's how to reclaim intent without the script.",
  },
  "deliverables-are-delusions": {
    title: "Deliverables Are Delusions",
    date: "2025-07-02",
    tag: "culture",
    excerpt:
      "Outcomes over outputs: a field manual for wrecking your status reports (and loving it).",
  },
};

const modules = import.meta.glob("../content/*.mdx", { eager: true });

type Entry = { default: any; frontmatter?: any };
const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const m = mod as unknown as Entry;
    const slug = path
      .split("/")
      .pop()!
      .replace(/\.mdx$/, "");
    const fm = frontmatterData[slug] || {};
    return { slug, component: m.default, meta: { ...fm, slug } as PostMeta };
  })
  .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

export function listPosts() {
  return posts.map((p) => p.meta);
}
export function getPost(slug: string) {
  return posts.find((p) => p.meta.slug === slug);
}
