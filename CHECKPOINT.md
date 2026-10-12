# Portfolio — Checkpoint

Use this file to resume work quickly. It answers: "What is the state of the project right now, and what should I do next?"

**Last checkpoint:** 2026-10-12
**Build status:** ✅ passing (`npm run build` → 1 page, ~1s, no warnings)
**Live preview:** `npm run preview` → `http://localhost:4321`

---

## Current state

The portfolio is a **complete, single-page static site** powered by Astro content collections. All sections render from markdown files in `src/content/`.

| Area | Status |
|---|---|
| Hero | ✅ complete (reads `cv/profile.md`) |
| About | ✅ complete (reads `cv/profile.md`) |
| Experience | ✅ complete (4 entries, reads `cv/profile.md`) |
| Projects | ✅ complete (6 cards, reads `src/content/projects/*.md`) |
| Skills | ✅ complete (6 groups, reads `cv/profile.md`) |
| Writing | ✅ complete (reads `src/content/writing/*.md`) |
| Contact | ✅ verified and live (reads `cv/profile.md`) |
| Favicon | ✅ custom branded SVG (terminal screen mark) |
| Build | ✅ passing, no warnings |
| Design system | ✅ tokens + dark mode |
| Memory system | ✅ 6 files created |
| Deploy config | ✅ `vercel.json` + `netlify.toml` in place |

## Open items (in priority order)

1. **Add a photo** — no images in the site yet.
2. **Add a photo** — no images in the site yet.
3. **Actually deploy** — config files are ready; you run `vercel --prod` or `netlify deploy --dir=dist --prod`.

> Note: "In Progress" badges are now supported. Set `status: "in-progress"` in a project's frontmatter to show an amber badge on its card.

## How to resume

1. Read `MEMORY.md` — verified facts, known issues, decisions.
2. Read `CHANGELOG.md` — recent changes and why.
3. Read `RULES.md` — hard constraints.
4. Run `npm run build` to confirm the current state still builds.
5. Work on the top open item above.
6. Update `MEMORY.md` and `CHANGELOG.md` when done.

## How to add a project

Create `src/content/projects/<slug>.md` with this frontmatter:

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