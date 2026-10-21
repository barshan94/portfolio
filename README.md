# Barshan Ghosh — Portfolio

A personal portfolio website for Barshan Ghosh, software developer building toward AI engineering.

Built with [Astro](https://astro.build) 7.3.8 as a static site, using shared layout components, content collections, and standalone HTML animation demos. Run `npm run build` to generate the static output and copy the animation assets.

## What's here

The homepage keeps the main story concise, with the full demonstrations available separately:

1. **Hero** — engineering focus and direct professional links.
2. **Featured project** — Money Calculator and its existing animation.
3. **Selected projects** — ASTA Store, Mount Royal Academy, and the bIoT thesis.
4. **Gallery entry point** — links to `/walkthroughs/`, where six existing animation demos can be opened one at a time.
5. **Archive** — Digital Coaching Management repository, Student Performance Dashboard demo, 999 Emergency Service repository, linked writing, and 12 digital-marketing repositories.
6. **Experience and skills** — information sourced from the CV content collection.
7. **Contact** — email, GitHub, and LinkedIn.

The six gallery demos are Money Calculator, ASTA Store, Student Performance Dashboard, Mount Royal Academy, 999 Emergency Service, and Digital Growth & Marketing Systems. The Digital Coaching Management System is a repository link, not a separate animation demo. Dashboard sample data is illustrative, and the 999 concept does not contact real responders.

Selected project facts live in content files. Standalone animation HTML files are copied into the static build by `copy-academy-animation.mjs`; the Money Calculator animation is served from `public/`. The Digital Growth & Marketing Systems animation is one unified showcase, followed by links to the 12 supporting repositories.

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