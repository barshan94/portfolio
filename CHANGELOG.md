# Portfolio — Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/).

---

## [2026-10-13] — Hero redesign: content clarity, motion restraint, accessibility

### Changed

- `src/pages/index.astro`: Hero headline replaced awkward `split(".")` + `<br/>` markup with natural accessible heading — "Building practical software. Exploring intelligent systems." — matching actual CV headline verbatim.
- `src/pages/index.astro`: Hero description shortened from 93-word paragraph to 1 focused sentence: "Full-stack developer focused on reliable applications and AI engineering. B.Sc. Computer Science, AIUB (CGPA 3.83/4.00)."
- `src/pages/index.astro`: Primary CTA "View projects" remains filled button; secondary CTA changed from ghost "Experience" to explicit "btn-secondary" class for clear visual distinction.
- `src/pages/index.astro`: "Speedy degree" label corrected to "Accelerated degree" (truthful, professional tone).
- `src/pages/index.astro`: Public repos stat corrected from hardcoded 43 → 36 (verified live GitHub profile count via `api.github.com/users/barshan94`).
- `src/pages/index.astro`: Added `will-change: transform, opacity` to animated orbs and `will-change: transform` to rings for smoother compositing.
- `src/pages/index.astro`: `prefers-reduced-motion` now also disables reveal animations (`.reveal { opacity: 1; transform: none; }`) — not just orb/ring animations.
- `src/pages/index.astro`: Consolidated reveal CSS with proper stagger delays and explicit `.reveal.is-visible` states for IntersectionObserver.
- `src/pages/index.astro`: Responsive breakpoints improved — hero stats wrap at 768px (tablet) for readability, hero-code stays legible at 240px minimum width on mobile.
- `src/styles/global.css`: Removed ~220 lines of duplicate hero styles (hero, hero-grid, hero-inner, hero-visual, hero-orb, hero-ring, hero-code, hero-stats, btn variants) that were never applied to actual markup (index.astro uses `.orb`, not `.hero-orb`).

### Fixed

- Duplicate CSS causing maintenance risk and potential specificity conflicts.
- Missing `prefers-reduced-motion` coverage for scroll-reveal animations.
- Inaccurate public repo count.
- Heading markup that could confuse screen readers (`<br/>` inside `<h1>`).

### Changed

- `src/pages/index.astro`: Redesigned Skills section markup from comma-separated plain text lists (`.skill-list`) to tag badge chips (`.skill-chip` inside `.skill-tags`) inside cards (`.skill-card`). Applied `reveal-stagger` for sequenced scroll-in animations. Cleaned up redundant styles from `<style>` block.
- `src/pages/index.astro`: Redesigned Writing section markup from plain list items to semantic `<article>` cards with grid layout (meta label, content column, link column). Added SVG arrow icons and accessible labels (`aria-label`, `aria-disabled`).
- `src/styles/global.css`: Added clean styling for `.skill-card`, `.skill-tags`, and `.skill-chip` with hover transitions, gradient border indicator (`--accent-2-grad`), and responsive grid layouts.
- `src/styles/global.css`: Added premium styling for `.writing-item` grid layout, `.writing-meta` label badges, and `.writing-link` with animated arrow icons. Removed duplicate styles from `index.astro`'s `<style>` block.
- `src/styles/global.css`: Updated responsive breakpoints — added writing item grid collapse and contact button column layout for mobile widths.

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

- `KeywordResearch` and `Various Systems Projects` cards link to the profile root or group many small repos; descriptions are summaries.
- No images on the site yet (headshot or project screenshots).
- The hero "Public repos" stat is a hardcoded literal (`repoCount = 43` in `index.astro`) — update it if the GitHub count changes.

---

## [2026-10-12] — Continuity cleanup

### Changed

- Reconciled `PROGRESS.md`, `CHECKPOINT.md`, `CHANGELOG.md`, and `MEMORY.md` — removed "remaining" items that were already done (favicon, In-Progress badges, Writing collection), fixed the duplicate "Add a photo" entry, and corrected the "Unverified / placeholder" section header since contact details are now verified.
- `RULES.md` rule 9 updated to name the real contact details as verified, replacing stale placeholder addresses.

### Removed

- Dead `type` field (`software | research | marketing | systems`) from `projectSchema` and from the three project files that set it — nothing on the site reads it.

---

## [2026-10-12] — Project add automation

### Added

- `scripts/add-project.mjs` — scaffolds `src/content/projects/<slug>.md` from a GitHub repo slug. Pulls description and tags from the GitHub API (a verified source); refuses to create an entry with no description rather than inventing one. Supports `--title`, `--description`, `--tags`, `--live`, `--status`, `--featured`, `--accent`.
- `README.md` documents the new `add-project` command.