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

### Favicon & In-Progress badges (2026-10-12)

- Custom branded SVG favicon added (`public/favicon.svg`) and wired into `Layout.astro`.
- "In Progress" amber badge implemented in `ProjectCard.astro` — set `status: "in-progress"` in a project's frontmatter.

### Project add automation (2026-10-12)

- `scripts/add-project.mjs` — scaffolds `src/content/projects/<slug>.md` from a repo slug. Pulls description and tags from the GitHub API; refuses to create an entry with no description rather than inventing one. Supports `--title`, `--description`, `--tags`, `--live`, `--status`, `--featured`, `--accent`.
- `README.md` documents the new command.

### Continuity file cleanup (2026-10-12)

- `PROGRESS.md`, `CHECKPOINT.md`, `CHANGELOG.md`, `MEMORY.md`, and `RULES.md` reconciled — removed items already completed, fixed a wrong section header, and synced `RULES.md` rule 9 with the real contact details.
- Removed the unused `type` field from `projectSchema` and the three project files that set it.

---

## ⬜ Remaining

1. Add a photo or custom mark — no images on the site yet.
2. Deploy target — not yet decided. Static output is Vercel/Netlify-ready.
3. Automate rebuilds (optional) — wire GitHub → Netlify/Vercel build hook so content changes redeploys without a manual `npm run build`.

---

## 🔧 In progress

None.