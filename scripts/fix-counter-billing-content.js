"use strict";
const fs = require("fs").promises;
const path = require("path");

const TEMPLATE_FILE = "counter-billing-bettiah.html";
const DIR = path.resolve(__dirname, "..", "website", "counter-billing-bihar");
const schoolRegex =
  /(School CRM|Smart School|School Management|Education Teams|Student Management System|School ERP|School CRM & ERP)/i;

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => (w && w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

(async function main() {
  try {
    const templatePath = path.join(DIR, TEMPLATE_FILE);
    const templateRaw = await fs.readFile(templatePath, "utf8");

    const templateCitySlug = TEMPLATE_FILE.replace(
      /^counter-billing-/,
      "",
    ).replace(/\.html$/, "");
    const templateCityTitle = slugToTitle(templateCitySlug);

    const dirFiles = await fs.readdir(DIR);
    const htmlFiles = dirFiles.filter((f) => f.toLowerCase().endsWith(".html"));

    const modified = [];

    for (const file of htmlFiles) {
      if (file === TEMPLATE_FILE) continue;
      const fp = path.join(DIR, file);
      const content = await fs.readFile(fp, "utf8");
      if (!schoolRegex.test(content)) continue; // skip files that look correct

      const slug = path.basename(file, ".html"); // counter-billing-ara
      const citySlug = slug.replace(/^counter-billing-/, "");
      const cityName = slugToTitle(citySlug);

      // Build new content from the template, replacing city placeholders and filenames
      function escapeRegExp(s) {
        return s.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
      }

      let newContent = templateRaw;

      const swaps = [
        [new RegExp(escapeRegExp(templateCityTitle), "g"), cityName],
        [new RegExp(escapeRegExp(templateCitySlug), "g"), citySlug],
        [new RegExp(escapeRegExp(TEMPLATE_FILE), "g"), `${slug}.html`],
        [
          new RegExp(
            escapeRegExp(
              `https://www.pixelatenest.com/counter-billing-bihar/${TEMPLATE_FILE}`,
            ),
            "g",
          ),
          `https://www.pixelatenest.com/counter-billing-bihar/${slug}.html`,
        ],
        [
          new RegExp(
            escapeRegExp(`Counter Billing Software in ${templateCityTitle}`),
            "g",
          ),
          `Counter Billing Software in ${cityName}`,
        ],
      ];

      for (const [from, to] of swaps) newContent = newContent.replace(from, to);

      // safety replacements: remove school-specific phrasing if any remains
      const safetyReplacements = [
        [/Education Teams/gi, "Counters"],
        [/EDUCATION TEAMS/gi, "COUNTERS"],
        [/Smart School CRM & ERP Solution in/gi, "Counter Billing Software in"],
        [/School CRM & ERP Solution in/gi, "Counter Billing Software in"],
        [/Smart School CRM/gi, "Counter Billing Software"],
        [/School Management Software/gi, "Counter Billing Software"],
        [/School ERP/gi, "Counter Billing System"],
        [/School CRM/gi, "Counter Billing System"],
        [/\bSchool(s?)\b/gi, "Counter Billing"],
        [/Education/gi, "Counter"],
      ];

      for (const [from, to] of safetyReplacements)
        newContent = newContent.replace(from, to);

      // create backup (timestamped to avoid overwriting existing backups) and write
      const bakPath = fp + ".bak." + Date.now();
      await fs.copyFile(fp, bakPath);
      await fs.writeFile(fp, newContent, "utf8");

      modified.push(fp);
      console.log("Updated", fp);
    }

    console.log(`\nDone. ${modified.length} file(s) updated.`);
    modified.forEach((f) => console.log("-", path.relative(process.cwd(), f)));
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
