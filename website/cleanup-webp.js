const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'assets');

/**
 * Recursively find and cleanup temporary WebP files.
 * Removes original .webp and renames .webp.tmp.webp to .webp
 * @param {string} directory 
 */
async function cleanupDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await cleanupDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      // Look for temporary WebP files
      if (ext === '.webp' && file.endsWith('.tmp.webp')) {
        const originalPath = fullPath.replace('.tmp.webp', '');
        
        try {
          // Remove original WebP
          if (fs.existsSync(originalPath)) {
            fs.unlinkSync(originalPath);
            console.log(`Deleted: ${originalPath}`);
          }
          
          // Rename temp file to original name
          fs.renameSync(fullPath, originalPath);
          console.log(`Renamed: ${fullPath} -> ${originalPath}`);
        } catch (error) {
          console.error(`Error cleaning up ${fullPath}:`, error.message);
        }
      }
    }
  }
}

console.log(`Starting cleanup in: ${targetDir}...`);
if (fs.existsSync(targetDir)) {
  cleanupDirectory(targetDir)
    .then(() => console.log('✅ Cleanup complete!'))
    .catch((err) => console.error('❌ Cleanup failed:', err));
} else {
  console.error(`❌ Directory not found: ${targetDir}`);
}
