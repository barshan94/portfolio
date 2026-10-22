import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const fail = (message) => {
  console.error(`Portfolio validation failed: ${message}`);
  process.exitCode = 1;
};

const repositoriesSource = await readFile(resolve(root, "src/data/github-repositories.ts"), "utf8");
const repositoryNames = [...repositoriesSource.matchAll(/name: "([^"]+)"/g)].map((match) => match[1]);
if (repositoryNames.length !== 38) fail(`expected 38 repository entries, found ${repositoryNames.length}`);
if (new Set(repositoryNames).size !== repositoryNames.length) fail("duplicate repository names found");

const archiveHtml = await readFile(resolve(dist, "projects/index.html"), "utf8");
for (const name of repositoryNames) {
  if (!archiveHtml.includes(`https://github.com/barshan94/${name}`)) {
    fail(`repository missing from generated archive: ${name}`);
  }
}

const walkthroughSource = await readFile(resolve(root, "src/pages/walkthroughs.astro"), "utf8");
const homeSource = await readFile(resolve(root, "src/pages/index.astro"), "utf8");
const animationPaths = new Set([
  ...[...walkthroughSource.matchAll(/src: "\/([^"]+\.html)"/g)].map((match) => match[1]),
  ...[...homeSource.matchAll(/src="\/([^"]+\.html)"/g)].map((match) => match[1]),
]);
for (const animation of animationPaths) {
  try {
    await access(resolve(dist, animation));
  } catch {
    fail(`animation referenced by a page is missing from dist: ${animation}`);
  }
}

const homepage = await readFile(resolve(dist, "index.html"), "utf8");
// The writing/research homepage section was intentionally removed; individual writing pages remain available.
if (!homepage.includes("/projects/")) fail("homepage link to complete project archive is missing");

const writingDirectory = resolve(root, "src/content/writing");
const { readdir } = await import("node:fs/promises");
const writingFiles = (await readdir(writingDirectory)).filter((file) => file.endsWith(".md"));
for (const file of writingFiles) {
  const slug = file.replace(/\\.md$/, "");
  try {
    await access(resolve(dist, "writing", slug, "index.html"));
  } catch {
    fail(`writing detail page is missing from dist: ${slug}`);
  }
}

for (const route of ["index.html", "walkthroughs/index.html", "projects/index.html", "sitemap.xml"]) {
  try {
    await access(resolve(dist, route));
  } catch {
    fail(`expected built output is missing: dist/${route}`);
  }
}

if (!process.exitCode) {
  console.log(`Portfolio validation passed: ${repositoryNames.length} repositories, ${animationPaths.size} animation references, and core routes.`);
}
