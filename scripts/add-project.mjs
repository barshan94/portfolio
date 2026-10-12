#!/usr/bin/env node
// scripts/add-project.mjs
//
// Scaffold a new project entry at src/content/projects/<slug>.md.
//
// Repo metadata (description, topics) is fetched from the GitHub API — a verified
// source — when not supplied explicitly. Nothing is invented: if the API can't
// provide a description, you must pass --description.
//
// Usage:
//   node scripts/add-project.mjs money-calculator
//   node scripts/add-project.mjs money-calculator --featured --accent accent --tags "Next.js,TypeScript"
//   node scripts/add-project.mjs new-repo --title "My Project" --description "Does X." --status in-progress --live "https://..."
//
// After editing the generated file, run: npm run build

import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const GITHUB_USER = "barshan94";
const CONTENT_DIR = resolve("src/content/projects");

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const boolFlag = (name) => args.includes(name);
const slug = args[0];

if (!slug) {
  console.error("Usage: node scripts/add-project.mjs <repo-slug> [flags]");
  console.error("Flags: --title, --description, --tags (comma-separated), --live, --featured, --accent (default|accent|accent-2), --status (completed|in-progress)");
  process.exit(1);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(`Invalid slug "${slug}" — use lowercase letters, digits, and hyphens only.`);
  process.exit(1);
}

const outFile = resolve(CONTENT_DIR, `${slug}.md`);
if (existsSync(outFile)) {
  console.error(`${outFile} already exists. Delete it first or use a different slug.`);
  process.exit(1);
}

const title = flag("--title");
const description = flag("--description");
const tagsRaw = flag("--tags");
const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : undefined;
const featured = boolFlag("--featured");
const accent = flag("--accent") || "default";
const status = flag("--status") || "completed";
const live = flag("--live");

if (!["default", "accent", "accent-2"].includes(accent)) {
  console.error(`Invalid accent "${accent}" — use default, accent, or accent-2.`);
  process.exit(1);
}
if (!["completed", "in-progress"].includes(status)) {
  console.error(`Invalid status "${status}" — use completed or in-progress.`);
  process.exit(1);
}

// Fetch from GitHub only when we're missing something the API can supply.
let repoInfo = null;
if (!description || !tags) {
  const url = `https://api.github.com/repos/${GITHUB_USER}/${slug}`;
  const headers = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  let res;
  try {
    res = await fetch(url, { headers });
  } catch (e) {
    console.error(`Network error reaching ${url}: ${e.message}`);
    process.exit(1);
  }

  if (res.status === 404) {
    console.error(`Repo ${GITHUB_USER}/${slug} not found on GitHub.`);
    if (!description) {
      console.error("Pass --description to create the entry without a live repo.");
      process.exit(1);
    }
  } else if (!res.ok) {
    console.error(`GitHub API error ${res.status} for ${url}`);
    process.exit(1);
  } else {
    repoInfo = await res.json();
  }
}

const finalDescription = description || repoInfo?.description || null;
const finalTags = tags || (repoInfo?.topics || []).filter(Boolean) || [];

if (!finalDescription) {
  console.error("No description available. Pass --description explicitly.");
  process.exit(1);
}

const esc = (s) => String(s).replace(/"/g, '\\"');
const yamlArr = (arr) => (arr.length ? arr.map((t) => `    "${esc(t)}"`).join("\n") : "");
const fm = [
  "---",
  `title: "${esc(title || slug)}"`,
  `description: "${esc(finalDescription)}"`,
  yamlArr(finalTags) ? `tags:\n${yamlArr(finalTags)}` : "tags: []",
  `repo: "https://github.com/${GITHUB_USER}/${slug}"`,
  ...(live ? [`live: "${esc(live)}"`] : []),
  `status: "${status}"`,
  `featured: ${featured}`,
  `accent: "${accent}"`,
  "---",
].join("\n");

const body = [
  "",
  finalDescription,
  "",
  "> Add project details here — features, architecture, what it does. Keep every claim verifiable against the repo or another real source.",
  "",
].join("\n");

writeFileSync(outFile, fm + body + "\n");
console.log(`Created ${outFile}`);
console.log(`  repo:    https://github.com/${GITHUB_USER}/${slug}`);
console.log(`  tags:    ${finalTags.length ? finalTags.join(", ") : "(none)"}`);
console.log(`  status:  ${status}   featured: ${featured}   accent: ${accent}`);
console.log("\nEdit the file, then run: npm run build");