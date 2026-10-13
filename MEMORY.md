# Portfolio — Project Memory

This file is the **single source of truth** for the portfolio. Read it before any change.
Last updated: 2026-10-13 (skills + writing redesign, whole-page review)

---

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
| GitHub profile | `barshan94` | 2026-10-12 | `api.github.com/users/barshan94` |
| Public repo count | 43 | 2026-10-12 | `api.github.com/users/barshan94/repos` |
| Money Calculator | `barshan94/money-calculator` | 2026-10-12 | live repo, Next.js 16, TypeScript, Supabase |
| asta-store | `barshan94/asta-store` | 2026-10-12 | live repo, Astro 7, Supabase, e-commerce |
| Mount Royal Academy | `barshan94/MountRoyalAcademy-website` | 2026-10-12 | live repo, Astro 7, Supabase |
| Thesis | `barshan94/Thesis` | 2026-10-12 | live repo, bIoT healthcare security |
| Name | Barshan Ghosh | 2026-10-12 | master brief |
| Education | B.Sc. CSE, AIUB | 2026-10-12 | master brief |
| CGPA | 3.83/4.00 | 2026-10-12 | master brief |
| Degree duration | 3 years | 2026-10-12 | master brief |
| Mount Royal Academy start | Jun 2025 | 2026-10-12 | master brief |
| Teachnook internship | Aug 2022 – Jan 2023, Bengaluru | 2026-10-12 | master brief |
| Digital Fire Safety | ~2 years 3 months | 2026-10-12 | master brief (approximate — no exact dates available) |
| Digital marketing since | 2020 | 2026-10-12 | master brief |

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
- The hero "Public repos" stat is a hardcoded literal (`repoCount = 43` in `index.astro`). It goes stale if the GitHub count changes — update it manually or wire up a build hook.

## Deployment

- Build: `npm run build` → `dist/`
- Preview: `npm run preview` → `localhost:4321`
- Deploy target: not yet decided. Static output is Vercel/Netlify-ready.