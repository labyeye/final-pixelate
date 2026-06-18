const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const targetDir = path.join(
  __dirname,
  "..",
  "assets",
  "images",
  "services",
  "nav",
);

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

        try {
          await sharp(fullPath)
            .webp({ quality: 70, alphaQuality: 90, effort: 6 })
            .toFile(outputPath);
          console.log(`Converted: ${file} → ${path.basename(outputPath)}`);
        } catch (error) {
          console.error(`Error converting ${file}:`, error.message);
        }
      } else if (ext === ".webp") {
        try {
          const tempPath = fullPath + ".tmp.webp";
          const originalSize = fs.statSync(fullPath).size;

          await sharp(fullPath)
            .webp({
              quality: 65,
              alphaQuality: 85,
              effort: 6,
              nearLossless: false,
            })
            .toFile(tempPath);

          const newSize = fs.statSync(tempPath).size;

          if (newSize < originalSize) {
            fs.unlinkSync(fullPath);
            fs.renameSync(tempPath, fullPath);
            const savedKB = ((originalSize - newSize) / 1024).toFixed(2);
            console.log(`Optimised: ${file} (saved ${savedKB} KB)`);
          } else {
            fs.unlinkSync(tempPath);
            console.log(`Skipped:   ${file} (already optimal)`);
          }
        } catch (error) {
          console.error(`Error optimising ${file}:`, error.message);
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
