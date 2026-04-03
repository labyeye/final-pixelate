#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'website', 'school-crm-bihar');
const destDir = path.join(root, 'website', 'counter-billing-bihar');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const templateName = 'counter-billing-patna.html';
const templatePath = path.join(destDir, templateName);

if (!fs.existsSync(templatePath)) {
  console.error('Template not found:', templatePath);
  console.error('Please ensure counter-billing-patna.html exists in', destDir);
  process.exit(1);
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html') && f.startsWith('school-crm-'));
const created = [];
const skipped = [];

function slugToCityName(slug) {
  return slug.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

const template = fs.readFileSync(templatePath, 'utf8');

files.forEach(file => {
  const m = file.match(/^school-crm-(.+)\.html$/);
  if (!m) return;
  const citySlug = m[1];
  const cityName = slugToCityName(citySlug);
  const destFileName = `counter-billing-${citySlug}.html`;
  const destPath = path.join(destDir, destFileName);
  if (fs.existsSync(destPath)) {
    skipped.push(destFileName);
    return;
  }

  let content = template;

  // Replace capitalized and slug occurrences of the template city (Patna)
  content = content.replace(/\bPatna\b/g, cityName);
  content = content.replace(/\bpatna\b/g, citySlug);

  // Ensure page-level title prefix is correct
  content = content.replace(/Counter Billing Software in\s+[A-Za-z \-]+/g, `Counter Billing Software in ${cityName}`);

  fs.writeFileSync(destPath, content, 'utf8');
  created.push(destFileName);
});

console.log('Created', created.length, 'files');
if (created.length) console.log(created.join('\n'));
if (skipped.length) console.log('Skipped (already exist):\n' + skipped.join('\n'));

process.exit(0);
