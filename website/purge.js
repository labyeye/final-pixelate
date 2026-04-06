import { PurgeCSS } from "purgecss";
import fs from "fs";
import path from "path";
import { glob } from "glob";

async function runPurge() {
  try {
    console.log("🔧 Starting PurgeCSS optimization...\n");

    // ✅ Scan all HTML + JS files
    const contentFiles = await glob(["**/*.html", "js/**/*.js"], {
      ignore: ["node_modules/**", "purge-output/**"],
    });

    // ✅ Include ALL CSS (including FontAwesome)
    const cssFiles = await glob(["**/*.css"], {
      ignore: ["node_modules/**", "purge-output/**"],
    });

    console.log(`📂 Found ${contentFiles.length} content files`);
    console.log(`📄 Found ${cssFiles.length} CSS files\n`);

    const purgeCSSResult = await new PurgeCSS().purge({
      content: contentFiles,
      css: cssFiles,

      // 🔥 STRONG safelist (FontAwesome + Webflow + dynamic classes)
      safelist: [
        // Webflow / layout
        /^w-/,
        /^w--/,
        /^aria-/,
        /^data-/,
        /--open$/,
        /--active$/,
        /--current/,
        /is-/,
        /has-/,
        /was-/,

        // 🔥 FULL FontAwesome protection
        /^fa-/,
        /^fas/,
        /^far/,
        /^fab/,
        /^fa-solid/,
        /^fa-regular/,
        /^fa-brands/,
        /^fa-light/,
        /^fa-thin/,
        /^fa-duotone/,
        /fa$/,

        // Generic UI states
        "active",
        "hidden",
        "show",
        "open",
        "visible",

        // Custom
        /^icon-/,
      ],
    });

    // ✅ Create output folder
    if (!fs.existsSync("purge-output")) {
      fs.mkdirSync("purge-output", { recursive: true });
    }

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
      console.log(
        `   Saved:    ${(savings / 1024).toFixed(2)} KB (${savingsPercent}%)\n`,
      );
    });

    console.log("\n✨ PurgeCSS completed successfully!");
    console.log(`📦 Total files processed: ${filesProcessed}`);
    console.log(`💾 Total savings: ${(totalSavings / 1024).toFixed(2)} KB`);
    console.log(`📁 Output folder: ./purge-output\n`);
  } catch (error) {
    console.error("❌ Error running PurgeCSS:", error.message);
    process.exit(1);
  }
}

runPurge();
