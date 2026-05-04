const fs = require("fs");
const path = require("path");

const targetDir = path.join(__dirname, "assets");

async function cleanupDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await cleanupDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();

      if (ext === ".webp" && file.endsWith(".tmp.webp")) {
        const originalPath = fullPath.replace(".tmp.webp", "");

        try {
          if (fs.existsSync(originalPath)) {
            fs.unlinkSync(originalPath);
          }

          fs.renameSync(fullPath, originalPath);
        } catch (error) {}
      }
    }
  }
}

if (fs.existsSync(targetDir)) {
  cleanupDirectory(targetDir);
} else {
}
