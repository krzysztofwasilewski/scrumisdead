# Anarchic Blog – Cursor-ready

Poster-art, bold, slightly unsettling blog homepage built with Vite + React + Tailwind + Framer Motion.

## Run in Cursor / VS Code

1. Ensure Node 18+ is installed.
2. `npm install`
3. `npm run dev`
4. Open the dev server URL in your browser.

## Edit slogans

`src/App.tsx` → `SLOGANS` array. Add/remove lines. Timing: interval 2500ms.

## Notes

- Minimal `Card` and `Button` components included locally (no shadcn setup needed).
- Tailwind configured; global styles in `src/styles.css`.
- Lucide icons and Framer Motion already wired.

## New features

- **Article template** at `/post/:slug` with jagged divider + anarchic hero.
- **Archive** page at `/archive` (auto-built from MDX frontmatter).
- **MDX pipeline** using `@mdx-js/rollup` + `import.meta.glob` for content.
- **Palette toggle** (crimson/bile-green/hazard-yellow/photocopied-blue) synced to `?palette=`.

## Add a new post

1. Create a file in `src/content/your-slug.mdx` with frontmatter:
   ```md
   ---
   title: "Your Title"
   date: 2025-09-04
   tag: systems
   excerpt: "Short description."
   ---

   Your MDX here.
   ```
2. Visit `/post/your-slug`
