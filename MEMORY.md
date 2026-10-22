# Portfolio — Project Memory

This file is the **single source of truth** for the portfolio. Read it before any change.
Last updated: 2026-10-22 (interactive gallery playback and demo-to-repository alignment)

---

## Current portfolio audit (2026-10-22)

- Homepage: removed the full-width “EXPLORE THE FULL BODY OF WORK” CTA block. The Selected Projects heading now contains a compact primary link to `/walkthroughs/` and a secondary link to `/projects/`, preserving both destinations with less vertical space.
- Walkthroughs: Money Calculator is the featured animation and starts automatically unless the visitor prefers reduced motion. The remaining six demos load inside their own cards after one click; no separate video modal or second play click is required.
- Performance/accessibility: only one animation is active at a time; starting another demo stops the previous one. Reduced-motion visitors see a static featured poster and can choose whether to start motion.
- Demo/repository alignment audit:
  - Money Calculator is a cinematic ledger visualization, not a screenshot or live UI; its source repo remains the source of truth for implemented financial features.
  - Asta Store animation covers catalog browsing and adding an item to the bag; checkout/admin features exist in the linked repository but are not shown in this animation.
  - Student Performance Dashboard is an Excel-based academic analytics project; animation data is fictional.
  - Mount Royal Academy animation is a school-themed motion piece, not a screen-by-screen preview of the actual website/admin interface.
  - 999 is an academic C# Windows Forms / SQL Server concept, not a live emergency service.
  - Digital Growth & Marketing is an overview of 12 separate repositories/workflows, not one deployed software platform.
  - Digital Coaching Management animation was narrowed to the two automations in the current `Code.js`: add today's date to the Attendance sheet and the current month to the Payment sheet when absent. Student registry/reporting/communication scenes no longer render as if implemented.
- Build routing: the four root-level HTML animations (Asta, Mount Royal, 999, Digital Growth) are copied to `dist/` by `copy-academy-animation.mjs`; Money Calculator, Student Performance, and Coaching animations are served from `public/`.
- Verification: the latest commit's Vercel status check reports success. I could not independently inspect the live page through the available browser, so visual confirmation that the deployed page reflects the latest commit remains pending.

## Previous portfolio audit (2026-10-16)

- The page hierarchy is now: hero → featured Money Calculator → selected project cards → interactive project walkthroughs → experience → skills → writing → contact.
- Removed the forced startup overlay so visitors can read the page immediately.
- Reduced the background grid/radial glow, increased muted-text contrast, and removed blur from the fixed navigation dock to improve clarity.
- Tablet navigation now sits in the document flow instead of floating over the content; the bottom dock remains on small screens.
- Layout.astro now imports the legacy base stylesheet before the portfolio-specific system stylesheet, so the intended design overrides load last.
- Money Calculator is marked in progress, matching the active development state.
- Cleaned duplicate language and lastUpdated declarations from the project collection schema.
- Common mojibake in homepage text and symbols was corrected.
- The Digital Marketing & Growth Systems section now renders the 12 actual repositories as individual responsive cards below the animation; they remain separate from the "Different problems. Different approaches." project index.
- The clarity/hierarchy changes, 12-repository card grid, canonical tokens, and responsive navigation passed Vercel checks on their source/style commits. A final screenshot-based visual review is still advisable.

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

- The `Various Systems Projects` card links to the GitHub profile because its academic projects are spread across repositories. Replace this with direct repository links only after verifying the exact source repositories.
- No personal headshot or real project screenshots are present; the current visuals are CSS mockups and custom animations.
- The flagship Money Calculator section has no "Live Application" button because `money-calculator.md` has no `live:` frontmatter field. It renders only "Source Code". Add a `live:` URL only if a stable public demo exists; do not invent one.
- `src/pages/index.astro` remains over 3,000 lines and contains many showcase sections and styles. Next maintainability pass should extract sections into Astro components without changing their behavior.
- `design-tokens.css` is now the canonical token source, imported before the base and portfolio-specific styles. Continue replacing hardcoded component values with tokens when those areas are refactored.
- `src/components/SectionHeading.astro`, `ProjectCard.astro`, and `TimelineEntry.astro` are no longer rendered by the page but are kept on disk. Safe to delete if the old markup is confirmed unwanted.
- The redesign has no `#system` section anymore; the header/footer nav use `#about` (the hero) instead.

## Deployment

- Build: `npm run build` → `dist/`
- Preview: `npm run preview` → `localhost:4321`
- Deploy target: Vercel, connected to `barshan94/portfolio`.
- Do not report a deployment as successful until the Vercel status is `success` and the live page reflects the latest commit.