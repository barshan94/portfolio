# Barshan Ghosh — Portfolio

A personal portfolio website for Barshan Ghosh, software developer building toward AI engineering.

Built with [Astro](https://astro.build) 7.3.8 as a static site. Single page, no framework components, no build step beyond `npm run build`.

## What's here

- **Hero** — professional headline, biography, key stats.
- **About** — what I do, where I'm heading, how I work, background.
- **Experience** — employment, internship, freelance, and personal projects, distinguished by type.
- **Projects** — six verified projects with live GitHub links.
- **Skills** — grouped by domain (frontend, backend, AI/ML, devops, marketing, languages).
- **Writing & Research** — published research and project write-ups.
- **Contact** — email, GitHub, LinkedIn.

## Project intelligence

This repo maintains a continuity system so it can be worked on across sessions:

| File | Purpose |
|---|---|
| `MEMORY.md` | Single source of truth — verified facts, decisions, known issues |
| `CHANGELOG.md` | Chronological record of all changes |
| `RULES.md` | Hard constraints that must never be violated |
| `CHECKPOINT.md` | Quick-resume state and open items |
| `PROGRESS.md` | Progress log |
| `AGENTS.md` | Agent instructions and architecture overview |

**Read `MEMORY.md` before making any change.**

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server at localhost:4321
npm run build        # production build → dist/
npm run preview      # preview the production build locally
```

## Adding a project

Scaffold a new project entry (frontmatter + stub body) from a GitHub repo:

```bash
node scripts/add-project.mjs <repo-slug>                 # pulls description/tags from GitHub API
node scripts/add-project.mjs <repo-slug> --featured     # top row, larger card
node scripts/add-project.mjs <repo-slug> --title "X" --description "Does Y." --tags "A,B" --status in-progress --live "https://..." --accent accent
```

- Repo metadata comes from the **GitHub API** (a verified source) when not passed explicitly.
- If the repo doesn't exist on GitHub, you must pass `--description` — nothing is invented.
- Edit the generated file, then run `npm run build`.

**To delete a project:** remove `src/content/projects/<slug>.md` and rebuild.

## Verified sources

All factual claims on the site are verified against:

1. The master brief.
2. Live GitHub API (`api.github.com/users/barshan94`).
3. Actual repo contents.

Unverified information is flagged in `MEMORY.md`, never presented as fact.

## License

© Barshan Ghosh. See `CHECKPOINT.md` for open items and next steps.