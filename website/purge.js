import { PurgeCSS } from "purgecss";
import fs from "fs";
import path from "path";
import { glob } from "glob";

async function runPurge() {
  try {
    console.log("🔧 Starting PurgeCSS optimization...\n");

    // Use glob to find all matching files
    const contentFiles = await glob([
      "**/*.html",
      "js/**/*.js"
    ], { 
      ignore: ['node_modules/**', 'purge-output/**']
    });

    const cssFiles = await glob([
      "*.css"
    ], {
      ignore: ['node_modules/**']
    });

    console.log(`📂 Found ${contentFiles.length} content files`);
    console.log(`📄 Found ${cssFiles.length} CSS files\n`);

    const purgeCSSResult = await new PurgeCSS().purge({
      content: contentFiles,
      css: cssFiles,
      safelist: [
        /^w-/,
        /^w--/,
        /^aria-/,
        /^data-/,
        /--open$/,
        /--active$/,
        /is-/,
        /has-/,
        /was-/,
        /--active/,
        /--current/,
        /^fa-/,
        /^icon-/,
        "w--open",
        "w-nav",
        "menu-button",
        "w-open",
        "navbar-open",
        "modal-open",
        "is-open",
        "is-visible",
        "show",
        "active",
        "hidden"
      ]
    });

    // Create output directory if it doesn't exist
    if (!fs.existsSync("purge-output")) {
      fs.mkdirSync("purge-output", { recursive: true });
    }

    // Write purged CSS files with statistics
    let totalSavings = 0;
    let filesProcessed = 0;

    purgeCSSResult.forEach((file) => {
      const fileName = path.basename(file.file);
      const outputPath = path.join("purge-output", fileName);
      fs.writeFileSync(outputPath, file.css);

      const originalSize = fs.statSync(file.file).size;
      const purgedSize = file.css.length;
      const savings = originalSize - purgedSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(2);

      totalSavings += savings;
      filesProcessed++;

      console.log(`📄 ${fileName}`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
      console.log(`   Purged:   ${(purgedSize / 1024).toFixed(2)} KB`);
      console.log(`   Saved:    ${(savings / 1024).toFixed(2)} KB (${savingsPercent}%)\n`);
    });

    console.log("\n✨ PurgeCSS completed successfully!");
    console.log(`📦 Total files processed: ${filesProcessed}`);
    console.log(`💾 Total savings: ${(totalSavings / 1024).toFixed(2)} KB`);
    console.log(`📁 Purged CSS files saved to: ./purge-output\n`);
  } catch (error) {
    console.error("❌ Error running PurgeCSS:", error.message);
    console.error(error);
    process.exit(1);
  }
}

runPurge();