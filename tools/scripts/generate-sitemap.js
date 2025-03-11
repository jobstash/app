// scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://middleware.jobstash.xyz/app/sitemap';
const PUBLIC_DIR = path.join(process.cwd(), 'apps/web/public');

/**
 * Fetches sitemap from middleware API and writes to public/sitemap.xml
 * Creates public directory if it doesn't exist
 * Only override the file if the contents have changed
 */
async function generateSitemap() {
  console.log(`Fetching sitemap from ${SITEMAP_URL}...`);

  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    console.error(`Failed to fetch sitemap: ${response.statusText}`);
    process.exit(1);
  }

  const newSitemap = await response.text();
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  let currentSitemap = null;
  if (fs.existsSync(sitemapPath)) {
    currentSitemap = fs.readFileSync(sitemapPath, 'utf-8');
  }

  if (currentSitemap !== newSitemap) {
    fs.writeFileSync(sitemapPath, newSitemap);
    console.log(`Sitemap updated at ${sitemapPath}`);
  } else {
    console.log('No changes in sitemap. File not updated.');
  }
}

generateSitemap().catch((err) => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
});
