# Portfolio — Hard Rules

These rules must never be violated. If a change conflicts with a rule, the change is wrong.

---

## 1. Verify before publishing

Every factual claim on the site must be verifiable against a real source. Sources of truth, in order:

1. The master brief (this conversation).
2. Live GitHub API (`api.github.com/users/barshan94/...`).
3. The actual repo contents (cloned or fetched).
4. Documents in the workspace.

**Never invent information.** If a fact cannot be verified, mark it as unverified in `MEMORY.md` and either omit it or qualify it clearly on the page.

## 2. Distinguish fact types

The timeline must distinguish between:

- **Employment** (paid, ongoing roles)
- **Internships** (time-bound, learning-focused)
- **Freelance / self-directed** (independent work)
- **Personal projects** (built for practice or portfolio)

Do not merge them into one "experience" list. The `TimelineEntry` `type` prop handles this.

## 3. Distinguish completed from in-progress

Every project on the site must be clearly one of:

- **Completed** — working, shipped, linkable.
- **In progress** — actively being built.

Never present unfinished work as finished.

## 4. One coherent identity

The site presents Barshan Ghosh as a **software developer building toward AI engineering**. Backgrounds in IT support, teaching, and digital marketing are presented as supporting experience — not as competing careers. Do not restructure the site around a different professional identity without updating `MEMORY.md` first.

## 5. Design tokens only

All colors, spacing, and typography come from `src/styles/design-tokens.css`. No hardcoded hex values, no magic numbers in components. Dark mode is automatic via `prefers-color-scheme`.

## 6. Build must pass

`npm run build` must pass cleanly before anything is considered done. A broken build is a broken site.

## 7. Update memory at the end of every task

After any change, update:
- `MEMORY.md` — decisions, verified facts, known issues.
- `CHANGELOG.md` — what changed, why, when.

Do not defer this to "later."

## 8. Maintainability

- Keep `index.astro` readable. If it grows beyond ~400 lines, extract a section into its own component.
- Keep the component API small and explicit. No `any` types.
- Comments explain **why**, not **what**.

## 9. Contact details are placeholders

`barshan94@gmail.com`, `linkedin.com/in/barshan94`, and `github.com/barshan94` are placeholders. Replace them before the site goes live. Do not commit real personal contact details to a public repo without review.