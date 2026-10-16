# Portfolio — Progress Log

Tracks what has been done, what is in progress, and what remains.

**Last updated:** 2026-10-16

---

## Portfolio clarity and hierarchy audit (2026-10-16)

- Reordered homepage content: selected project cards now appear before the long animated walkthroughs.
- Added an Interactive Walkthroughs heading to separate demonstrations from the project index.
- Removed the timed startup overlay so content appears immediately.
- Reduced background grid/glow and removed blur from the fixed navigation dock.
- Corrected stylesheet load order: base CSS first, portfolio-specific CSS second.
- Repaired common mojibake in homepage text and symbols.
- Marked Money Calculator as in progress.
- Added a responsive grid of all 12 original digital marketing repositories beneath the animation, separate from the selected project cards.
- Removed duplicate project schema fields.
- Updated README, MEMORY, CHANGELOG, and CHECKPOINT to reflect the current structure.
- **Verification:** Vercel checks succeeded for the homepage/style changes and 12-repository grid. A visual screenshot review remains useful.

### Next

1. Verify production deployment.
2. Split the oversized homepage into maintainable Astro components.
3. Consolidate overlapping CSS tokens.
4. Inspect mobile and desktop rendering after deployment.

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

1. Confirm latest Vercel build and live rendering.
2. Refactor the 3,000+ line homepage into components.
3. Consolidate CSS tokens and remove obsolete style rules.
4. Consider a personal photo if a suitable image is supplied.

---

## 🔧 In progress

- Production verification of the clarity/hierarchy changes.