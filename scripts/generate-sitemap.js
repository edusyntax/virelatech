import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.virelatech.com";

const routes = [
  "/",
  "/about",
  "/services",
  "/services/website-development-services",
  "/services/seo-services",
  "/services/google-ads-services",
  "/services/lead-generation-campaigns-services",
  "/services/social-media-marketing-services",
  "/services/meta-ads-services",
  "/services/content-marketing-services",
  "/services/email-marketing-services",
  "/services/ai-automation-services",
  "/blog",
  "/contact",
  "/testimonials",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>
`
  )
  .join("")}
</urlset>`;

const publicPath = path.resolve(__dirname, "../public");

if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

fs.writeFileSync(
  path.resolve(publicPath, "sitemap.xml"),
  sitemap,
  "utf8"
);

console.log("✅ sitemap.xml generated successfully");