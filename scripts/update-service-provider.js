#!/usr/bin/env node
// Update Service JSON-LD provider blocks to canonical Organization NAP.

const fs = require('fs').promises;
const path = require('path');

const root = path.resolve(__dirname, '..', 'website');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(res));
    else if (e.isFile() && res.toLowerCase().endsWith('.html')) files.push(res);
  }
  return files;
}

const canonicalProvider = `"provider": {
    "@type": "Organization",
    "name": "Pixelate Nest (Kalahanu Tech Studios LLP)",
    "url": "https://www.pixelatenest.com",
    "telephone": "+91-84069-12345",
    "email": "support@pixelatenest.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kala Bhawan, Akharaghat Road",
      "addressLocality": "Muzaffarpur",
      "addressRegion": "Bihar",
      "postalCode": "842001",
      "addressCountry": "IN"
    }
  }`;

async function processFile(file) {
  let content = await fs.readFile(file, 'utf8');
  let changed = false;

  // Find <script type="application/ld+json"> ... </script> blocks
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  content = content.replace(scriptRegex, (match, jsonText) => {
    if (/"@type"\s*:\s*"Service"/.test(jsonText)) {
      // Replace existing provider object if present
      if (/"provider"\s*:\s*\{[\s\S]*?\}/.test(jsonText)) {
        const newJsonText = jsonText.replace(/"provider"\s*:\s*\{[\s\S]*?\}/, canonicalProvider);
        changed = changed || newJsonText !== jsonText;
        return match.replace(jsonText, newJsonText);
      } else {
        // Inject provider before closing brace of root object
        const injected = jsonText.replace(/\}\s*$/s, `,\n  ${canonicalProvider}\n}`);
        changed = changed || injected !== jsonText;
        return match.replace(jsonText, injected);
      }
    }
    return match;
  });

  if (changed) {
    await fs.writeFile(file, content, 'utf8');
    return true;
  }
  return false;
}

(async () => {
  try {
    const files = await walk(root);
    let updated = 0;
    for (const f of files) {
      const ok = await processFile(f);
      if (ok) {
        updated++;
        console.log('Updated service provider in:', path.relative(process.cwd(), f));
      }
    }
    console.log('Done. Updated', updated, 'files.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
