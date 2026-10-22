import type { APIRoute } from "astro";
export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response("The site URL is not configured.", { status: 500 });
  }

  const paths = [
    "/",
    "/walkthroughs/",
    "/projects/",
  ];

  const uniquePaths = [...new Set(paths)];
  const urls = uniquePaths
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
