import { PUBLIC_URL } from "../constant";
const globby = require('globby')
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

const getDate = new Date().toISOString();
const formatXml = (sitemap: string) =>
  prettier.format(sitemap, { parser: "html" });

(async () => {
  const sitemaps = await globby(["public/sitemap*.xml"]);
  const sitemapIndex = `
    ${sitemaps
      .map((sitemap: string) => {
        const sitemapPath = sitemap.replace("public/", "");
        return `
          <sitemap>
            <loc>${`${PUBLIC_URL}${sitemapPath}`}</loc>
            <lastmod>${getDate}</lastmod>
          </sitemap>`;
      })
      .join("")}
  `;

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndex}
    </sitemapindex>
  `;

  fs.writeFileSync(
    path.resolve(__dirname, "../public/sitemap-index.xml"),
    formatXml(sitemap),
    "utf8",
  );
})();
export default undefined