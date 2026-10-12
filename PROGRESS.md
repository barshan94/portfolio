# Portfolio — Progress Log

Tracks what has been done, what is in progress, and what remains.

**Last updated:** 2026-10-12

---

## ✅ Completed

### Project intelligence system (2026-10-12)

- `AGENTS.md` — agent instructions, architecture overview, styling/content rules, continuity instructions.
- `MEMORY.md` — single source of truth: verified facts, unverified info, decisions, known issues.
- `CHANGELOG.md` — chronological record of all changes.
- `RULES.md` — 9 hard constraints that must never be violated.
- `CHECKPOINT.md` — quick-resume state and open items.
- `PROGRESS.md` — this file.
- `README.md` rewritten.

### Content collections (2026-10-12)

- Projects and CV data moved from hardcoded arrays in `index.astro` into Astro content collections.
- `src/content.config.ts` defines two collections: `projects` and `cv`.
- 6 project markdown files created under `src/content/projects/`.
- `src/content/cv/profile.md` created as the single source of truth for bio, experience, skills, and contact.
- Homepage frontmatter now calls `getCollection("projects")` and `getCollection("cv")`.
- All sections (Hero, About, Experience, Projects, Skills, Contact) render from collection data.
- Build passes cleanly with no warnings.

### Contact information updated (2026-10-12)

- Verified and replaced placeholder contact details with real information:
  - Email: barshan.ghoshofficial@gmail.com
  - GitHub: https://github.com/barshan94
  - LinkedIn: https://www.linkedin.com/in/barshan-ghosh/
- Build passes cleanly with all contact links rendered correctly in dist/index.html.

---

## ⬜ Remaining

1. Custom favicon — currently the Astro default mark, needs a branded SVG/favicon.
2. Deploy target — not yet decided. Static output is Vercel/Netlify-ready.
3. Add "In Progress" badges — if any projects should be marked unfinished (`status: "in-progress"` in frontmatter).
4. Move Writing section to a content collection — currently hardcoded in `index.astro`.
5. Add a photo or custom mark — no images on the site yet.

---

## 🔧 In progress

None.