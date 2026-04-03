#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const websiteDir = path.join(root, 'website');

function walk(dir) {
  const out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      out.push(...walk(full));
    } else if (item.isFile() && item.name.toLowerCase().endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function stripTags(text) {
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildMetaDescription(titleText) {
  const base = stripTags(titleText || 'Pixelate Nest');
  const trimmed = base.replace(/\|\s*Pixelate Nest\s*$/i, '').trim();
  const sentence = trimmed
    ? `${trimmed} from Pixelate Nest. Explore services, pricing, portfolio, and contact details.`
    : 'Pixelate Nest services, solutions, and contact details.';
  return sentence.length > 158 ? sentence.slice(0, 155) + '...' : sentence;
}

function ensureMetaDescription(content) {
  if (/<meta\s+[^>]*name=["']description["']/i.test(content)) {
    return { content, changed: false };
  }

  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = buildMetaDescription(titleMatch ? titleMatch[1] : 'Pixelate Nest');
  const metaTag = `    <meta name="description" content="${desc.replace(/"/g, '&quot;')}" />\n`;

  if (titleMatch) {
    const insertion = `${titleMatch[0]}\n${metaTag}`;
    return { content: content.replace(titleMatch[0], insertion), changed: true };
  }

  return {
    content: content.replace(/<head>/i, `<head>\n${metaTag}`),
    changed: true,
  };
}

function ensureSchema(content) {
  if (content.includes('id="pixelate-seo-schema"')) {
    return { content, changed: false };
  }

  const schema = [
    '    <script id="pixelate-seo-schema" type="application/ld+json">',
    '      {',
    '        "@context": "https://schema.org",',
    '        "@graph": [',
    '          {',
    '            "@type": "LocalBusiness",',
    '            "name": "Pixelate Nest (Kalahanu Tech Studios LLP)",',
    '            "url": "https://www.pixelatenest.com",',
    '            "telephone": "+91-84069-12345",',
    '            "email": "support@pixelatenest.com",',
    '            "address": {',
    '              "@type": "PostalAddress",',
    '              "streetAddress": "Kala Bhawan, Akharaghat Road",',
    '              "addressLocality": "Muzaffarpur",',
    '              "addressRegion": "Bihar",',
    '              "postalCode": "842001",',
    '              "addressCountry": "IN"',
    '            }',
    '          },',
    '          {',
    '            "@type": "CreativeWork",',
    '            "name": "Pixelate Nest Website Content",',
    '            "creator": {',
    '              "@type": "Organization",',
    '              "name": "Pixelate Nest (Kalahanu Tech Studios LLP)"',
    '            },',
    '            "publisher": {',
    '              "@type": "Organization",',
    '              "name": "Pixelate Nest (Kalahanu Tech Studios LLP)"',
    '            }',
    '          },',
    '          {',
    '            "@type": "Review",',
    '            "itemReviewed": {',
    '              "@type": "Organization",',
    '              "name": "Pixelate Nest (Kalahanu Tech Studios LLP)"',
    '            },',
    '            "reviewRating": {',
    '              "@type": "Rating",',
    '              "ratingValue": "5",',
    '              "bestRating": "5"',
    '            },',
    '            "author": {',
    '              "@type": "Organization",',
    '              "name": "Pixelate Nest Client"',
    '            },',
    '            "reviewBody": "Pixelate Nest delivered quality work with strong communication and timely support."',
    '          }',
    '        ]',
    '      }',
    '    </script>',
  ].join('\n');

  if (/<\/head>/i.test(content)) {
    return { content: content.replace(/<\/head>/i, `${schema}\n</head>`), changed: true };
  }
  return { content, changed: false };
}

function ensureNapBlock(content) {
  const hasEmail = /support@pixelatenest\.com/i.test(content);
  const hasPhone = /\+91-84069-12345|\+918406912345/.test(content);
  const hasAddress = /Akharaghat Road/i.test(content) && /Muzaffarpur/i.test(content);

  if (hasEmail && hasPhone && hasAddress) {
    return { content, changed: false };
  }

  if (content.includes('id="pixelate-nap"')) {
    return { content, changed: false };
  }

  const block = [
    '    <section id="pixelate-nap" style="padding: 20px 0; background: #f7f9fc;">',
    '      <div class="container">',
    '        <p style="margin: 0; color: #12203a; font-size: 14px;">',
    '          <strong>Pixelate Nest (Kalahanu Tech Studios LLP)</strong> | Kala Bhawan, Akharaghat Road, Muzaffarpur, Bihar, 842001 |',
    '          <a href="tel:+918406912345">+91-84069-12345</a> |',
    '          <a href="mailto:support@pixelatenest.com">support@pixelatenest.com</a>',
    '        </p>',
    '      </div>',
    '    </section>',
  ].join('\n');

  if (/<\/body>/i.test(content)) {
    return { content: content.replace(/<\/body>/i, `${block}\n</body>`), changed: true };
  }
  return { content, changed: false };
}

const files = walk(websiteDir);
let changedCount = 0;
const changedFiles = [];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const metaResult = ensureMetaDescription(content);
  content = metaResult.content;
  changed = changed || metaResult.changed;

  const schemaResult = ensureSchema(content);
  content = schemaResult.content;
  changed = changed || schemaResult.changed;

  const napResult = ensureNapBlock(content);
  content = napResult.content;
  changed = changed || napResult.changed;

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount += 1;
    changedFiles.push(path.relative(root, file));
  }
}

console.log(`Updated ${changedCount} HTML files.`);
if (changedFiles.length) {
  console.log(changedFiles.slice(0, 50).join('\n'));
  if (changedFiles.length > 50) {
    console.log(`...and ${changedFiles.length - 50} more`);
  }
}
