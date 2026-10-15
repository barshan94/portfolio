#!/usr/bin/env node
// scripts/sync-projects.mjs
//
// Discovers public repositories owned by barshan94, across all API pages.
// Generates missing project entries without overwriting existing content.
// The GitHub Actions workflow commits new files and opens a pull request.

import { writeFileSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const USER = "barshan94";
const CONTENT_DIR = resolve("src/content/projects");
const SYNC_MAP_PATH = resolve("sync-map.json");

const curated = JSON.parse(readFileSync(SYNC_MAP_PATH, "utf8"));

const toSlug = (name) =>
name
.replace(/([a-z])([A-Z])/g, "$1-$2")
.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
.toLowerCase();

const existing = new Set(
readdirSync(CONTENT_DIR)
.filter((file) => file.endsWith(".md"))
.map((file) => file.replace(/.md$/, ""))
);

for (const slug of Object.values(curated)) {
existing.add(slug);
}

async function fetchAllRepositories() {
const repositories = [];
let page = 1;

while (true) {
const url = new URL(
"https://api.github.com/users/${USER}/repos"
);

url.searchParams.set("type", "owner");
url.searchParams.set("per_page", "100");
url.searchParams.set("page", String(page));
url.searchParams.set("sort", "updated");
url.searchParams.set("direction", "desc");

const response = await fetch(url, {
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

if (!response.ok) {
  throw new Error(
    `GitHub API error ${response.status}: ${response.statusText}`
  );
}

const batch = await response.json();
repositories.push(...batch);

console.log(`Fetched page ${page}: ${batch.length} repositories`);

if (batch.length < 100) break;
page++;

}

return repositories;
}

const yamlString = (value) => JSON.stringify(String(value));

async function main() {
const repositories = await fetchAllRepositories();
let added = 0;
let skipped = 0;

for (const repo of repositories) {
// Only original, public, active repositories owned by this account.
if (
repo.owner?.login?.toLowerCase() !== USER.toLowerCase() ||
repo.private ||
repo.fork ||
repo.archived ||
repo.disabled
) {
skipped++;
continue;
}

// Preserve hand-curated portfolio projects.
if (curated[repo.name]) {
  skipped++;
  continue;
}

// Do not create a low-quality entry without a verified description.
if (!repo.description?.trim()) {
  skipped++;
  continue;
}

const slug = toSlug(repo.name);

// Never overwrite an existing project entry.
if (existing.has(slug)) {
  skipped++;
  continue;
}

const tags = [
  ...(repo.language ? [repo.language] : []),
  ...(repo.topics || []),
].filter((tag, index, all) => all.indexOf(tag) === index).slice(0, 6);

const frontmatter = [
  "---",
  `title: ${yamlString(repo.name)}`,
  `description: ${yamlString(repo.description)}`,
  tags.length
    ? `tags:\n${tags.map((tag) => `  - ${yamlString(tag)}`).join("\n")}`
    : "tags: []",
  `repo: ${yamlString(repo.html_url)}`,
  ...(repo.homepage?.trim()
    ? [`live: ${yamlString(repo.homepage.trim())}`]
    : []),
  'status: "completed"',
  "featured: false",
  'accent: "default"',
  "---",
  "",
  repo.description.trim(),
  "",
  "> Automatically discovered from GitHub. Add verified project details when available.",
  "",
].join("\n");

const outputPath = resolve(CONTENT_DIR, `${slug}.md`);
writeFileSync(outputPath, frontmatter + "\n", {
  flag: "wx",
});

existing.add(slug);
console.log(`+ ${slug} (${repo.full_name})`);
added++;

}

console.log("\nRepositories fetched: ${repositories.length}");
console.log("New project entries: ${added}");
console.log("Skipped repositories: ${skipped}");

if (added === 0) {
console.log("No new project entries were needed.");
}
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});

