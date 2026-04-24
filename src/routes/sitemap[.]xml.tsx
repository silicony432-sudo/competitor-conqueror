import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://liner.ai";
const URLS = [
  "/",
  "/platform",
  "/pricing",
  "/predictive-lead-generation",
  "/sales-intelligence-software",
  "/alternative-to-zoominfo",
  "/alternative-to-apollo",
  "/alternative-to-clearbit",
  "/alternative-to-6sense",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const body =
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          URLS.map(
            (u) =>
              `  <url><loc>${BASE}${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.8"}</priority></url>`,
          ).join("\n") +
          `\n</urlset>\n`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});