# Portfolio — Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/).

---

## [2026-10-12] — Content collections + continuity system

### Added

- **Astro content collections** — projects and CV data now live in `src/content/` as markdown files. The homepage reads them at build time via `getCollection()`.
  - `src/content.config.ts` — collection schemas (`projects`, `cv`).
  - `src/content/projects/*.md` — 6 project files (money-calculator, asta-store, mount-royal-academy, biot-thesis, keyword-research, various-systems).
  - `src/content/cv/profile.md` — single source of truth for bio, experience, skills, and contact.
  - `astro.config.mjs` — `legacy.collectionsBackwardsCompat: true` required for this Astro version's content loader.
- **Project intelligence system** — `AGENTS.md`, `MEMORY.md`, `CHANGELOG.md`, `RULES.md`, `CHECKPOINT.md`, `PROGRESS.md`.
- `README.md` rewritten to document the site, the intelligence files, commands, and verified sources.

### Changed

- `src/pages/index.astro` — frontmatter now calls `getCollection("projects")` and `getCollection("cv")` instead of hardcoded arrays. Hero, About, Experience, Projects, Skills, and Contact sections all render from collection data.
- `astro.config.mjs` — added `legacy.collectionsBackwardsCompat: true`.

### Fixed

- Stale hero stat "35+ public repos" → "43" (verified against live GitHub API).
- CV entry lookup: `getEntry("cv", "profile")` → `getCollection("cv")` (the entry ID is generated from the filename, not predictable).
- `Layout.astro` import paths corrected (`./Header.astro`, `./Footer.astro`) — build was failing with `ReferenceError: Header is not defined`.

### Known

- Contact details are placeholders.
- `KeywordResearch` and `Various Systems Projects` cards link to the profile root or group many small repos; descriptions are summaries.
- No custom favicon yet.