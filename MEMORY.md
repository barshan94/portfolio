# Portfolio — Project Memory

This file is the **single source of truth** for the portfolio. Read it before any change.
Last updated: 2026-10-16 (portfolio audit: corrected CSS load order, reduced haze, simplified first load, and reorganized projects)

---

## Current portfolio audit (2026-10-16)

- The page hierarchy is now: hero → featured Money Calculator → selected project cards → interactive project walkthroughs → experience → skills → writing → contact.
- Removed the forced startup overlay so visitors can read the page immediately.
- Reduced the background grid/radial glow and removed blur from the fixed navigation dock to improve clarity.
- Layout.astro now imports the legacy base stylesheet before the portfolio-specific system stylesheet, so the intended design overrides load last.
- Money Calculator is marked in progress, matching the active development state.
- Cleaned duplicate language and lastUpdated declarations from the project collection schema.
- Common mojibake in homepage text and symbols was corrected.
- The Digital Marketing & Growth Systems section now renders the 12 actual repositories as individual responsive cards below the animation; they remain separate from the "Different problems. Different approaches." project index.
- The clarity/hierarchy changes and 12-repository card grid passed Vercel checks on their source/style commits. A final screenshot-based visual review is still advisable.

## Architecture

- **Framework:** Astro 7.3.8, static output. Zero runtime overhead.
- **Content:** Astro content collections. Projects and CV data live in `src/content/` as markdown files with YAML frontmatter. The homepage reads them at build time via `getCollection()`.
- **Styling:** Custom CSS design tokens + Google Fonts. No Tailwind, no component library.
- **Build:** `npm run build` → `dist/`. Must pass cleanly before anything is considered done.

## Content locations

| Data | File | Schema |
|---|---|---|
| Projects | `src/content/projects/*.md` (6 files) | `projectSchema` in `src/content.config.ts` |
| CV / bio / skills / contact | `src/content/cv/profile.md` | `cvSchema` in `src/content.config.ts` |
| Writing & Research | `src/content/writing/*.md` (2 files) | `writingSchema` in `src/content.config.ts` |

**To add a project:** `node scripts/add-project.mjs <repo-slug>` scaffolds the frontmatter file (pulling description/tags from the GitHub API when available). Edit the generated file, then `npm run build`.
**To delete a project:** remove the `.md` file.
**To update CV data:** edit `src/content/cv/profile.md`.

## Verified facts (checked against live sources)

| Claim | Value | Verified on | Source |
|---|---|---|---|
| GitHub profile | `barshan94` | 2026-10-13 | `api.github.com/users/barshan94` |
| Public repo count | 36 | 2026-10-13 | `api.github.com/users/barshan94/repos` |
| Money Calculator | `barshan94/money-calculator` | 2026-10-12 | live repo, Next.js 16, TypeScript, Supabase |
| asta-store | `barshan94/asta-store` | 2026-10-12 | live repo, Astro 7, Supabase, e-commerce |
| Mount Royal Academy | `barshan94/MountRoyalAcademy-website` | 2026-10-12 | live repo, Astro 7, Supabase |
| Thesis | `barshan94/Thesis` | 2026-10-12 | live repo, bIoT healthcare security |
| Name | Barshan Ghosh | 2026-10-13 | master brief |
| Education | B.Sc. CSE, AIUB | 2026-10-13 | master brief |
| CGPA | 3.83/4.00 | 2026-10-13 | master brief |
| Degree duration | 3 years | 2026-10-13 | master brief |
| Mount Royal Academy start | Jun 2025 | 2026-10-13 | master brief |
| Teachnook internship | Aug 2022 – Jan 2023, Bengaluru | 2026-10-13 | master brief |
| Digital Fire Safety | ~2 years 3 months | 2026-10-13 | master brief (approximate — no exact dates available) |
| Digital marketing since | 2020 | 2026-10-13 | master brief |

## Verified contact details

All live as of 2026-10-12:
  - Email: `barshan.ghoshofficial@gmail.com`
  - GitHub: `https://github.com/barshan94` (you supplied `?tab=repositories` — stripped to the bare URL; the tab param is cosmetic)
  - LinkedIn: `https://www.linkedin.com/in/barshan-ghosh/`
- **Digital Fire Safety exact dates** — only "~2 years 3 months" is known. No start/end dates verified.
- **Mount Royal Academy responsibilities** — described from the master brief only. No job description or timesheet available.
- **Teachnook project details** — "cancer prediction project using Weka and Google Colab" comes from the master brief. No source document confirms methodology.

## Known issues

- The `KeywordResearch` and `Various Systems Projects` cards link to the profile root or group many small projects. Descriptions are summaries, not per-repo facts.
- No images on the site yet (headshot or project screenshots). Would require image files in `public/` and a component to display them.
- The flagship Money Calculator section has no "Live Application" button because `money-calculator.md` has no `live:` frontmatter field. It renders only "Source Code". Add a `live:` URL only if a stable public demo exists; do not invent one.
- `src/pages/index.astro` remains over 3,000 lines and contains many showcase sections and styles. Next maintainability pass should extract sections into Astro components without changing their behavior.
- `global.css` and `system-ui.css` still both contain overlapping token definitions. Load order is corrected, but a later pass should consolidate tokens into one canonical source.
- `src/components/SectionHeading.astro`, `ProjectCard.astro`, and `TimelineEntry.astro` are no longer rendered by the page but are kept on disk. Safe to delete if the old markup is confirmed unwanted.
- The redesign has no `#system` section anymore; the header/footer nav use `#about` (the hero) instead.

## Deployment

- Build: `npm run build` → `dist/`
- Preview: `npm run preview` → `localhost:4321`
- Deploy target: Vercel, connected to `barshan94/portfolio`.
- Do not report a deployment as successful until the Vercel status is `success` and the live page reflects the latest commit.