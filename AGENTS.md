## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project Intelligence & Continuity

This portfolio is a single-page static site. Before making changes:

1. **Read `MEMORY.md`** — the project's single source of truth for decisions, verified facts, and known issues.
2. **Read `CHANGELOG.md`** — see what was done recently and why.
3. **Read `RULES.md`** — hard constraints that must never be violated.
4. **Verify before publishing** — every claim on the site (CGPA, dates, repo links, contact details) must be verified against the source of truth listed in `MEMORY.md`. Never invent information.
5. **Run the build** after every change: `npm run build`. The build must pass before anything is considered done.
6. **Update `MEMORY.md` and `CHANGELOG.md`** at the end of every task, not at the end of the project.

## Architecture at a glance

```
src/
  pages/index.astro     ← the only page; all content comes from collections
  content/
    content.config.ts   ← collection schemas (projects, cv)
    projects/*.md       ← one file per project
    cv/profile.md       ← bio, experience, skills, contact
  layouts/
    Layout.astro        ← HTML shell, fonts, meta
    Header.astro        ← fixed numbered navigation dock
    Footer.astro         ← brand, nav, year
  components/
    SectionHeading.astro ← section header (eyebrow, title, subtitle)
    ProjectCard.astro    ← project card with tags + GitHub/Live links
    TimelineEntry.astro  ← experience timeline entry
  styles/
    design-tokens.css   ← canonical palette, typography, spacing, and motion tokens
    global.css           ← reset, utilities, scroll-reveal
    system-ui.css        ← portfolio-specific visual overrides
```

The site is **static** (output: `static`). No server, no database, no auth. Everything is plain HTML/CSS/JS built by Astro.

## Content management

Projects and CV data live in **Astro content collections**:

- **Add a project** → create `src/content/projects/<slug>.md` with frontmatter (title, description, tags, repo, status, featured, accent). It appears on the site after `npm run build`.
- **Delete a project** → remove the `.md` file. It disappears after `npm run build`.
- **Update a project** → edit the `.md` file.
- **Update CV / bio / skills / contact** → edit `src/content/cv/profile.md`.
- **Reorder projects** → the `featured` flag separates featured cards from the rest; within each group, order is by filename.

Frontmatter schemas are in `src/content.config.ts`. If you change a schema, update the existing `.md` files to match or the build will fail.

## Styling rules

- **CSS load order matters.** `Layout.astro` imports `design-tokens.css`, then `global.css`, then `system-ui.css`.
- **Token source:** `design-tokens.css` is canonical. Keep future colors, spacing, typography, and motion values there; avoid duplicate root token blocks.
- **Fonts** load from Google Fonts (Inter + JetBrains Mono). No local font files.
- **Animations** use the `.reveal` class + IntersectionObserver. Respect `prefers-reduced-motion`.

## Content rules

- Distinguish **employment**, **internships**, **freelance**, and **personal projects** in the timeline (`type` prop: `work` | `internship` | `project`).
- Distinguish **completed** work from **work in progress** (`status` field in project frontmatter).
- Keep the tone professional, direct, and natural. No buzzwords, no invented achievements.
- Contact details are verified in `MEMORY.md`; do not replace them with placeholders or invent alternate contact information.