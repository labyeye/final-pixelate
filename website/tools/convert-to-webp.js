const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const targetDir = path.join(__dirname, "..", "assets");

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();

      if (ext === ".png") {
        const outputPath = fullPath.replace(
          new RegExp(`${ext}$`, "i"),
          ".webp",
        );

        if (fs.existsSync(outputPath)) {
          console.log(`Skipped:   ${file} (webp already exists)`);
        } else {
          try {
            await sharp(fullPath)
              .webp({ quality: 70, alphaQuality: 90, effort: 6 })
              .toFile(outputPath);
            console.log(`Converted: ${file} → ${path.basename(outputPath)}`);
          } catch (error) {
            console.error(`Error converting ${file}:`, error.message);
          }
        }
      }
    }
  }
}

if (fs.existsSync(targetDir)) {
  console.log(`Processing: ${targetDir}`);
  processDirectory(targetDir).then(() => console.log("Done."));
} else {
  console.error(`Directory not found: ${targetDir}`);
}
