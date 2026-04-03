#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'website');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && /\.html$/i.test(entry.name)) {
      files.push(full);
    }
  }
}

walk(root);

let missingMeta = 0;
let missingSchema = 0;
let missingNap = 0;
const missingMetaFiles = [];
const missingSchemaFiles = [];
const missingNapFiles = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  if (!/<meta\s+[^>]*name="description"/i.test(content)) {
    missingMeta += 1;
    missingMetaFiles.push(path.relative(path.resolve(__dirname, '..'), file));
  }

  if (!/(LocalBusiness|pixelate-seo-schema)/i.test(content)) {
    missingSchema += 1;
    missingSchemaFiles.push(path.relative(path.resolve(__dirname, '..'), file));
  }

  const hasEmail = /support@pixelatenest\.com/i.test(content);
  const hasPhone = /\+91-84069-12345|\+918406912345/.test(content);
  const hasAddress = /Akharaghat Road/i.test(content);
  if (!(hasEmail && hasPhone && hasAddress)) {
    missingNap += 1;
    missingNapFiles.push(path.relative(path.resolve(__dirname, '..'), file));
  }
}

console.log('HTML', files.length);
console.log('MISSING_META', missingMeta);
console.log('MISSING_SCHEMA_HINT', missingSchema);
console.log('MISSING_NAP_HINT', missingNap);
if (missingMetaFiles.length) {
  console.log('META_FILES');
  console.log(missingMetaFiles.join('\n'));
}
if (missingSchemaFiles.length) {
  console.log('SCHEMA_FILES');
  console.log(missingSchemaFiles.join('\n'));
}
if (missingNapFiles.length) {
  console.log('NAP_FILES');
  console.log(missingNapFiles.join('\n'));
}
