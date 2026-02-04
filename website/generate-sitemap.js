#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DOMAIN = "https://www.pixelatenest.com";
const OUTPUT_FILE = path.join(__dirname, "sitemap.xml");
const CITIES_FILE = path.join(__dirname, "cities.json");
const TODAY = new Date().toISOString().split("T")[0];

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/about", priority: "0.8", changefreq: "monthly" },
  { url: "/webdev", priority: "0.9", changefreq: "monthly" },
  { url: "/app-dev", priority: "0.9", changefreq: "monthly" },
  { url: "/software-dev", priority: "0.9", changefreq: "monthly" },
  { url: "/video-ed", priority: "0.9", changefreq: "monthly" },
  { url: "/pricing", priority: "0.8", changefreq: "monthly" },
  { url: "/blogs", priority: "0.7", changefreq: "weekly" },
  { url: "/blog-post", priority: "0.6", changefreq: "weekly" },
  { url: "/contact", priority: "0.8", changefreq: "monthly" },
  { url: "/careers", priority: "0.7", changefreq: "weekly" },
  { url: "/locations", priority: "0.9", changefreq: "monthly" },
  { url: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
  { url: "/terms-of-service", priority: "0.5", changefreq: "yearly" },
  { url: "/cookie-policy", priority: "0.5", changefreq: "yearly" },
];

function generateUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap() {
  try {
    console.log("🚀 Starting sitemap generation...");

    const citiesData = JSON.parse(fs.readFileSync(CITIES_FILE, "utf8"));
    console.log(`📍 Found ${citiesData.states.length} cities`);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Homepage -->
${generateUrlEntry(DOMAIN + "/", TODAY, "weekly", "1.0")}
  
  <!-- Static Pages -->
`;

    staticPages.slice(1).forEach((page) => {
      sitemap +=
        generateUrlEntry(
          DOMAIN + page.url,
          TODAY,
          page.changefreq,
          page.priority,
        ) + "\n";
    });

    sitemap += `\n  <!-- City Pages -->\n`;
    citiesData.states.forEach((city) => {
      const cityUrl = `${DOMAIN}/state?city=${encodeURIComponent(city.city)}`;
      sitemap += generateUrlEntry(cityUrl, TODAY, "monthly", "0.9") + "\n";
    });

    sitemap += "\n</urlset>\n";

    fs.writeFileSync(OUTPUT_FILE, sitemap, "utf8");

    console.log("✅ Sitemap generated successfully!");
    console.log(`📄 Output: ${OUTPUT_FILE}`);
    console.log(
      `📊 Total URLs: ${staticPages.length + citiesData.states.length}`,
    );
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - City pages: ${citiesData.states.length}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
