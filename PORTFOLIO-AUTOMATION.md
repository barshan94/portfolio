# Portfolio automation

The portfolio sync is opt-in: it only discovers public, original, non-archived repositories owned by `barshan94` that have the GitHub topic `portfolio-showcase`.

## Publishing a repository

1. Open the repository on GitHub.
2. In the **About** panel, add the topic `portfolio-showcase`.
3. Add a useful repository description and, if available, a live demo URL in the repository's **About** panel.
4. Wait for the hourly sync, or manually run **Actions → Sync showcased GitHub projects → Run workflow**.
5. Review the generated pull request and merge it when the title, description, source link, and demo link are correct.

The workflow creates project content without overwriting hand-written project files. The existing seven homepage demo cards stay curated. Newly synced repositories are added to the searchable **All GitHub Projects** archive at `/projects/`.

## CV behavior

When the showcase index changes on `main`, the **Refresh CV project appendix** workflow appends a generated appendix to `public/Barshan Ghosh.pdf`. It preserves the original CV pages and rebuilds the appendix from the saved base PDF each time, so project pages do not accumulate duplicates.

On the first successful refresh, the workflow stores the current PDF as `cv-source/Barshan Ghosh.base.pdf`. If the core CV (education, experience, skills, contact details, or layout) changes later, replace that base file with the updated core PDF, then run **Actions → Refresh CV project appendix → Run workflow**. Do not update only the generated PDF, because the next refresh is rebuilt from the base file.

The animated CV is a separate hand-authored presentation and is not rewritten by the repository sync. Repository descriptions are sourced from GitHub metadata; the automation does not invent impact metrics or claims of completion.
