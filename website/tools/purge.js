import { PurgeCSS } from "purgecss";
import fs from "fs";
import path from "path";
import { glob } from "glob";

async function runPurge() {
  try {
    

    
    const contentFiles = await glob(["**/*.html", "js/**/*.js"], {
      ignore: ["node_modules/**", "purge-output/**"],
    });

    
    const cssFiles = await glob(["**/*.css"], {
      ignore: ["node_modules/**", "purge-output/**"],
    });

    
    

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
        /--current/,
        /is-/,
        /has-/,
        /was-/,

        
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

        
        "active",
        "hidden",
        "show",
        "open",
        "visible",

        
        /^icon-/,
      ],
    });

    
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
    });

    

  } catch (error) {
    
    process.exit(1);
  }
}

runPurge();

