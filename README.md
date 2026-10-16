# Barshan Ghosh — Portfolio

A personal portfolio website for Barshan Ghosh, software developer building toward AI engineering.

Built with [Astro](https://astro.build) 7.3.8 as a static site. Single page, no framework components, no build step beyond `npm run build`.

## What's here

The homepage is organized in this order so visitors see project evidence before longer demonstrations:

1. **Hero** — engineering focus and a direct path to the work.
2. **Featured project** — Money Calculator, marked in progress.
3. **Selected projects** — curated cards from the Astro project collection.
4. **Interactive walkthroughs** — Student Performance Dashboard, Digital Coaching Management System, 999 National Emergency Service, and Digital Marketing & Growth Systems. These are visual demonstrations; any sample data is illustrative, not live production data.
5. **Experience** — employment, internship, and freelance experience distinguished by type.
6. **Skills** — grouped by domain.
7. **Writing & Research** — research and project write-ups.
8. **Contact** — email, GitHub, LinkedIn.

Project facts live in content files rather than being duplicated across page markup. Animation HTML is copied into the static build by copy-academy-animation.mjs.

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