#!/usr/bin/env node
// scripts/sync-projects.mjs
//
// Driven by .github/workflows/sync-projects.yml on a schedule.
//
// Fetches barshan94's public repos from the GitHub API and generates a
// frontmatter file for any repo that doesn't already have one. Repos already
// curated by hand are listed in sync-map.json and skipped. Forks and repos
// with no description are skipped — content is never invented.
//
// Output: prints each added slug and exits 0. Writes files into
// src/content/projects/; the workflow commits them and opens a PR.

import { existsSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const USER = "barshan94";
const CONTENT_DIR = resolve("src/content/projects");
const SYNC_MAP_PATH = resolve("sync-map.json");

// Repo names that are already curated by hand (see sync-map.json). Any repo
// whose name is a key here is skipped so we never duplicate an existing entry.
const curated = JSON.parse(readFileSync(SYNC_MAP_PATH, "utf8"));

// Convert a GitHub repo name into a kebab-case content slug.
// MountRoyalAcademy-website -> mount-royal-academy-website
const toSlug = (name) =>
  name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

// Slugs already present on disk, plus every slug the sync map points at.
const existing = new Set(
  readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
);
for (const slug of Object.values(curated)) existing.add(slug);

const res = await fetch(
  `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`,
  { headers: { Accept: "application/vnd.github+json" } }
);

if (!res.ok) {
  console.error(`GitHub API error ${res.status} ${res.statusText}`);
  process.exit(1);
}

const repos = await res.json();
let added = 0;

for (const repo of repos) {
  if (curated[repo.name]) continue; // already curated by hand
  if (repo.fork) continue; // not original work
  if (!repo.description) continue; // never invent a description

  const slug = toSlug(repo.name);
  if (existing.has(slug)) continue; // already on disk under this slug

  const esc = (s) => String(s).replace(/"/g, '\\"');
  const tags = (repo.topics || []).slice(0, 6);
  const fm = [
    "---",
    `title: "${esc(repo.name)}"`,
    `description: "${esc(repo.description)}"`,
    tags.length
      ? `tags:\n${tags.map((t) => `    "${esc(t)}"`).join("\n")}`
      : "tags: []",
    `repo: "https://github.com/${USER}/${repo.name}"`,
    `status: "completed"`,
    `featured: false`,
    `accent: "default"`,
    "---",
    "",
    repo.description,
    "",
    "> Auto-generated from the GitHub repo. Edit the body to add details, screenshots, or architecture notes.",
    "",
  ].join("\n");

  writeFileSync(resolve(CONTENT_DIR, `${slug}.md`), fm + "\n");
  existing.add(slug);
  console.log(`+ ${slug}  (repo: ${repo.name})`);
  added++;
}

console.log(`\nAdded ${added} new project(s).`);
if (added === 0) console.log("Nothing new — no files written.");