import type { APIRoute } from "astro";

const SITE_URL = "https://fruco.es";

// Legal pages for each language
const legalPages = [
  "aviso-legal",
  "politica-cookies",
  "politica-privacidad",
  "politica-calidad",
  "politica-confidencialidad",
  "canal-etico",
  "codigo-conducta",
];

const languages = ["es", "en", "fr", "pt"];

export const GET: APIRoute = () => {
  const pages = [
    {
      loc: `${SITE_URL}/`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      loc: `${SITE_URL}/verification`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "yearly",
      priority: 0.3,
    },
  ];

  // Add legal pages for all languages
  languages.forEach((lang) => {
    legalPages.forEach((page) => {
      pages.push({
        loc: `${SITE_URL}/legal/${lang}/${page}`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: 0.5,
      });
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
