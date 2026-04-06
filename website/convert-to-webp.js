const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'assets');

/**
 * Recursively find and convert JPG/PNG images to WebP, and re-compress existing WebP files.
 * @param {string} directory 
 */
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      // Convert original images to WebP
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const outputPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
        
        try {
          await sharp(fullPath)
            .webp({ quality: 80, alphaQuality: 100 })
            .toFile(outputPath);
          console.log(`Converted: ${fullPath} -> ${outputPath}`);
        } catch (error) {
          console.error(`Error converting ${fullPath}:`, error.message);
        }
      }
      // Re-compress existing WebP files for better optimization
      else if (ext === '.webp') {
        try {
          const tempPath = fullPath + '.tmp.webp';
          await sharp(fullPath)
            .webp({ quality: 75, alphaQuality: 100, nearLossless: true })
            .toFile(tempPath);
          
          // Replace original with optimized version
          fs.unlinkSync(fullPath);
          fs.renameSync(tempPath, fullPath);
          console.log(`Re-compressed: ${fullPath}`);
        } catch (error) {
          console.error(`Error re-compressing ${fullPath}:`, error.message);
        }
      }
    }
  }
}

console.log(`Starting WebP conversion in: ${targetDir}...`);
if (fs.existsSync(targetDir)) {
  processDirectory(targetDir)
    .then(() => console.log('✅ Conversion complete!'))
    .catch((err) => console.error('❌ Conversion failed:', err));
} else {
  console.error(`❌ Directory not found: ${targetDir}`);
}
