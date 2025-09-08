# Build Scripts

This directory contains build-time scripts for the scrumisdead.org website.

## generate-sitemap.js

Generates `sitemap.xml` and `robots.txt` files in the `dist/` directory during the build process.

### What it does:

1. **Sitemap Generation**: Creates a comprehensive XML sitemap including:

   - Homepage (`/`)
   - Archive page (`/archive`)
   - All blog posts (`/post/{slug}`)
   - Uses actual publication dates from frontmatter
   - Sets appropriate priorities and change frequencies

2. **Robots.txt Generation**: Creates a robots.txt file that:
   - Allows all search engines to crawl the site
   - Points to the sitemap location
   - Disallows admin/private areas (if any)
   - Explicitly allows important content areas

### Usage:

```bash
# Run manually
npm run build:sitemap

# Run as part of full build
npm run build
```

### Configuration:

The script reads configuration from:

- **Site URL**: `https://scrumisdead.org` (hardcoded)
- **Content**: Automatically discovers posts from `src/content/index.ts`
- **Build Directory**: `dist/` (relative to project root)

### Output Files:

- `dist/sitemap.xml` - XML sitemap for search engines
- `dist/robots.txt` - Robots.txt for crawler instructions

### Integration:

The script is automatically run after each `vite build` via the npm build script:

```json
{
  "scripts": {
    "build": "vite build && node scripts/generate-sitemap.js"
  }
}
```

This ensures that sitemap and robots.txt are always up-to-date with the latest content.
