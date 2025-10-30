#!/usr/bin/env node

/**
 * Sitemap Generator for Pixelate Nest
 * Generates sitemap.xml including all city pages from cities.json
 * Usage: node generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://www.pixelatenest.com';
const OUTPUT_FILE = path.join(__dirname, 'sitemap.xml');
const CITIES_FILE = path.join(__dirname, 'cities.json');
const TODAY = new Date().toISOString().split('T')[0];

// Static pages configuration
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/webdev.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/app-dev.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/software-dev.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/video-ed.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/pricing.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/blogs.html', priority: '0.7', changefreq: 'weekly' },
    { url: '/blog-post.html', priority: '0.6', changefreq: 'weekly' },
    { url: '/contact.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/careers.html', priority: '0.7', changefreq: 'weekly' },
    { url: '/locations.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/privacy-policy.html', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms-of-service.html', priority: '0.5', changefreq: 'yearly' },
    { url: '/cookie-policy.html', priority: '0.5', changefreq: 'yearly' }
];

// Function to generate URL entry
function generateUrlEntry(loc, lastmod, changefreq, priority) {
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Main function
async function generateSitemap() {
    try {
        console.log('🚀 Starting sitemap generation...');

        // Read cities data
        const citiesData = JSON.parse(fs.readFileSync(CITIES_FILE, 'utf8'));
        console.log(`📍 Found ${citiesData.cities.length} cities`);

        // Start sitemap XML
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Homepage -->
${generateUrlEntry(DOMAIN + '/', TODAY, 'weekly', '1.0')}
  
  <!-- Static Pages -->
`;

        // Add static pages
        staticPages.slice(1).forEach(page => {
            sitemap += generateUrlEntry(
                DOMAIN + page.url,
                TODAY,
                page.changefreq,
                page.priority
            ) + '\n';
        });

        // Add city pages
        sitemap += `\n  <!-- City Pages -->\n`;
        citiesData.cities.forEach(city => {
            const cityUrl = `${DOMAIN}/state.html?city=${encodeURIComponent(city.city)}`;
            sitemap += generateUrlEntry(cityUrl, TODAY, 'monthly', '0.9') + '\n';
        });

        // Close sitemap
        sitemap += '\n</urlset>\n';

        // Write to file
        fs.writeFileSync(OUTPUT_FILE, sitemap, 'utf8');

        console.log('✅ Sitemap generated successfully!');
        console.log(`📄 Output: ${OUTPUT_FILE}`);
        console.log(`📊 Total URLs: ${staticPages.length + citiesData.cities.length}`);
        console.log(`   - Static pages: ${staticPages.length}`);
        console.log(`   - City pages: ${citiesData.cities.length}`);

    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

// Run the generator
generateSitemap();
