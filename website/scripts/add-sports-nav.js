// One-off script: inject a "Sports Management" card into the Products
// mega-nav dropdown across every static HTML page in the site.
// Run with: node scripts/add-sports-nav.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function buildCard(eol) {
  const lines = [
    "                            <a",
    '                              href="https://www.pixelatenest.com/products/sports-management-software.html"',
    '                              class="products-mega-card"',
    "                            >",
    "                              <img",
    '                                src="https://www.pixelatenest.com/assets/images/products/nav/sports-manage.png"',
    '                                alt="Sports Management Software"',
    '                                loading="lazy"',
    "                              />",
    "                              <div>",
    '                                <span class="products-mega-card-title"',
    "                                  >Sports Management</span",
    "                                >",
    "                              </div>",
    "                            </a>",
    "",
  ];
  return lines.join(eol);
}

// Tolerant of arbitrary indentation and CRLF/LF: newline, whitespace, </div>,
// newline, whitespace, </div>, newline, whitespace, </li>
const CLOSING_RE = /\n[ \t]*<\/div>\r?\n[ \t]*<\/div>\r?\n[ \t]*<\/li>/;

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "scripts") continue;
      walk(full, out);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(ROOT, []);
let updated = 0;
let skippedAlready = 0;
const failures = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes("products-mega-nav")) continue;
  if (content.includes("Sports Management")) {
    skippedAlready++;
    continue;
  }

  const idx1 = content.indexOf("products-mega-nav");
  const rest = content.slice(idx1);
  const m = CLOSING_RE.exec(rest);

  if (idx1 === -1 || !m) {
    failures.push(file);
    continue;
  }

  const idx2 = idx1 + m.index; // position of the \n starting the closing block
  const eol = content.includes("\r\n") ? "\r\n" : "\n";

  const newContent =
    content.slice(0, idx2 + 1) + buildCard(eol) + content.slice(idx2 + 1);
  fs.writeFileSync(file, newContent, "utf8");
  updated++;
}

console.log(`Updated: ${updated}`);
console.log(`Already had it: ${skippedAlready}`);
console.log(`Failures (${failures.length}):`);
failures.forEach((f) => console.log("  " + path.relative(ROOT, f)));
