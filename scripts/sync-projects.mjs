#!/usr/bin/env node
// Discover only public repositories explicitly marked with the portfolio-showcase topic.
// New project records are generated conservatively; existing hand-written records are never overwritten.

import { writeFileSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const USER = "barshan94";
const TOPIC = "portfolio-showcase";
const CONTENT_DIR = resolve("src/content/projects");
const SYNC_MAP_PATH = resolve("sync-map.json");
const SHOWCASE_PATH = resolve("src/data/portfolio-showcase.json");
const PUBLIC_SHOWCASE_PATH = resolve("public/portfolio-showcase.json");

const curated = JSON.parse(readFileSync(SYNC_MAP_PATH, "utf8"));
const curatedNames = new Set(Object.keys(curated).map((name) => name.toLowerCase()));

const toSlug = (name) =>
  name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

const existing = new Set(
  readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
);

for (const slug of Object.values(curated)) existing.add(slug);

async function fetchAllRepositories() {
  const repositories = [];
  let page = 1;

  while (true) {
    const url = new URL(`https://api.github.com/users/${USER}/repos`);
    url.searchParams.set("type", "owner");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("sort", "updated");
    url.searchParams.set("direction", "desc");

    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API error ${response.status}: ${response.statusText}`);
    }

    const batch = await response.json();
    if (!Array.isArray(batch)) {
      throw new Error("Unexpected GitHub API response: expected a repository list.");
    }

    repositories.push(...batch);
    console.log(`Fetched page ${page}: ${batch.length} repositories`);
    if (batch.length < 100) break;
    page += 1;
  }

  return repositories;
}

const yamlString = (value) => JSON.stringify(String(value));
const isEligible = (repo) =>
  repo.owner?.login?.toLowerCase() === USER.toLowerCase() &&
  !repo.private &&
  !repo.fork &&
  !repo.archived &&
  !repo.disabled;

async function main() {
  const repositories = (await fetchAllRepositories()).filter(isEligible);
  const tagged = repositories
    .filter((repo) => Array.isArray(repo.topics) && repo.topics.includes(TOPIC))
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

  const showcase = tagged.map((repo) => ({
    name: repo.name,
    title: repo.name,
    description: repo.description?.trim() || "Project details are available in the repository README.",
    url: repo.html_url,
    ...(repo.homepage?.trim() ? { homepage: repo.homepage.trim() } : {}),
    ...(repo.language ? { language: repo.language } : {}),
    ...(repo.updated_at ? { updatedAt: repo.updated_at } : {}),
    topics: (repo.topics || []).filter((topic) => topic !== TOPIC).slice(0, 10),
  }));

  const showcaseJson = `${JSON.stringify(showcase, null, 2)}\n`;
  writeFileSync(SHOWCASE_PATH, showcaseJson, "utf8");
  writeFileSync(PUBLIC_SHOWCASE_PATH, showcaseJson, "utf8");
  console.log(`Repositories marked ${TOPIC}: ${tagged.length}`);

  let added = 0;
  let skipped = 0;

  for (const repo of tagged) {
    const slug = toSlug(repo.name);
    if (curatedNames.has(repo.name.toLowerCase()) || existing.has(slug)) {
      skipped += 1;
      continue;
    }

    const description =
      repo.description?.trim() || "Project details are available in the repository README.";
    const tags = [
      ...(repo.language ? [repo.language] : []),
      ...(repo.topics || []).filter((topic) => topic !== TOPIC),
    ]
      .filter((tag, index, all) => all.indexOf(tag) === index)
      .slice(0, 6);

    const frontmatter = [
      "---",
      `title: ${yamlString(repo.name)}`,
      `description: ${yamlString(description)}`,
      tags.length
        ? `tags:\n${tags.map((tag) => `  - ${yamlString(tag)}`).join("\n")}`
        : "tags: []",
      `repo: ${yamlString(repo.html_url)}`,
      ...(repo.homepage?.trim() ? [`live: ${yamlString(repo.homepage.trim())}`] : []),
      ...(repo.language ? [`language: ${yamlString(repo.language)}`] : []),
      ...(repo.updated_at ? [`lastUpdated: ${yamlString(repo.updated_at)}`] : []),
      'status: "in-progress"',
      "featured: false",
      'accent: "default"',
      "---",
      "",
      description,
      "",
      "> Automatically discovered from a public GitHub repository tagged portfolio-showcase. Verify details before featuring it on the homepage.",
      "",
    ].join("\n");

    writeFileSync(resolve(CONTENT_DIR, `${slug}.md`), `${frontmatter}\n`, {
      flag: "wx",
    });
    existing.add(slug);
    console.log(`+ ${slug} (${repo.full_name})`);
    added += 1;
  }

  console.log(`New project content files: ${added}; existing/curated entries skipped: ${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
