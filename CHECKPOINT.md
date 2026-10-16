# Portfolio — Checkpoint

Use this file to resume work quickly. It answers: "What is the state of the project right now, and what should I do next?"

**Last checkpoint:** 2026-10-16
**Build status:** ⏳ Not verified for the latest audit commits; Vercel check is pending.
**Live site:** `https://portfolio-beta-eight-b4vx6dfs83.vercel.app/`
**Local preview:** `npm run preview` → `http://localhost:4321`

---

## Current state

The portfolio is a single-page Astro static site. Bio, experience, skills, contact, and curated project metadata live in content collections; custom interactive walkthroughs are hand-built HTML animations.

| Area | Status |
|---|---|
| Hero | ✅ complete (reads `cv/profile.md`) |
| About | ✅ complete (reads `cv/profile.md`) |
| Experience | ✅ complete (4 entries, reads `cv/profile.md`) |
| Selected projects | ✅ curated cards from `src/content/projects/*.md` |
| Skills | ✅ complete (6 groups, reads `cv/profile.md`) |
| Writing | ✅ complete (reads `src/content/writing/*.md`) |
| Contact | ✅ verified and live (reads `cv/profile.md`) |
| Favicon | ✅ custom branded SVG (terminal screen mark) |
| In-Progress badges | ✅ amber badge via `status: "in-progress"` |
| Build / deploy | ⏳ latest audit commits awaiting Vercel verification |
| Design system | ✅ tokens + dark mode |
| Memory system | ✅ 6 files created |
| Deployment | ✅ Vercel connected to GitHub |
| Project add automation | ✅ `scripts/add-project.mjs` scaffolds new entries from a repo slug |

## Open items (in priority order)

1. **Verify the current Vercel deployment** — confirm the production build passes and the live homepage reflects the latest commit.
2. **Refactor homepage markup** — `src/pages/index.astro` is still over 3,000 lines; extract sections into small Astro components without changing their behavior.
3. **Consolidate CSS tokens** — `global.css` and `system-ui.css` currently overlap; make one canonical design-token source.
4. **Review mobile and desktop visually** — confirm the clearer background, section order, fixed navigation, and animation frames at common viewport sizes.
5. **Optional personal photo** — only add if a suitable image is supplied.

> Note: "In Progress" badges are supported. Set `status: "in-progress"` in a project's frontmatter to show an amber badge on its card.

## How to resume

1. Read `MEMORY.md` — verified facts, known issues, decisions.
2. Read `CHANGELOG.md` — recent changes and why.
3. Read `RULES.md` — hard constraints.
4. Run `npm run build` to confirm the current state still builds.
5. Work on the top open item above.
6. Update `MEMORY.md` and `CHANGELOG.md` when done.

## How to add a project

Use the scaffolding script (see `README.md` for flags):

```bash
node scripts/add-project.mjs <repo-slug> --featured --accent accent
```

It pulls description/tags from the GitHub API when available and refuses to create an entry with no description. Then edit the generated file and run `npm run build`.

The frontmatter it writes:

```yaml
---
title: "Project Name"
description: "One or two sentences about it."
tags: ["Tag 1", "Tag 2"]
repo: "https://github.com/barshan94/<repo>"
status: "completed"          # or "in-progress"
featured: true               # true = large card, false = smaller card
accent: "default"            # "default" | "accent" | "accent-2"
---
```

Then run `npm run build`. The project appears on the site.