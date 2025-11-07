const fs = require('fs').promises;
const path = require('path');

// --- Configuration ---
const projectRoot = __dirname;
// --- End Configuration ---

async function updateHtmlFile(filePath) {
    console.log(`\nProcessing: ${path.basename(filePath)}`);
    try {
        let html = await fs.readFile(filePath, 'utf-8');
        let updatesMade = false;
        const originalHtml = html;

        // Fix 1: Update <picture><img src="...jpg"> to use .webp
        const pictureImgPattern = /(<picture>.*?<img\s+src="[^"]+?)\.(jpg|jpeg|png)(".*?<\/picture>)/gi;
        if (pictureImgPattern.test(html)) {
            html = html.replace(pictureImgPattern, '$1.webp$3');
            console.log(`  - Updated <picture><img> src to WebP`);
            updatesMade = true;
        }

        // Fix 2: Update <a href="...jpg"> to use .webp (for lightbox links)
        const anchorPattern = /(<a\s+[^>]*href=")([^"]+?)\.(jpg|jpeg|png)(")/gi;
        if (anchorPattern.test(html)) {
            html = html.replace(anchorPattern, '$1$2.webp$4');
            console.log(`  - Updated <a> href to WebP`);
            updatesMade = true;
        }

        if (updatesMade && html !== originalHtml) {
            await fs.writeFile(filePath, html, 'utf-8');
            console.log(`✅ Saved updates to ${path.basename(filePath)}.`);
        } else {
            console.log(`No updates needed for ${path.basename(filePath)}.`);
        }

    } catch (error) {
        console.error(`❌ Error processing file ${filePath}:`, error);
    }
}

async function run() {
    console.log('Starting HTML update process to fix image references...\n');
    try {
        const files = await fs.readdir(projectRoot);
        const htmlFiles = files.filter(file => file.endsWith('.html')).map(file => path.join(projectRoot, file));

        if (htmlFiles.length === 0) {
            console.log('No HTML files found.');
            return;
        }

        console.log(`Found ${htmlFiles.length} HTML files to process.\n`);

        for (const file of htmlFiles) {
            await updateHtmlFile(file);
        }

        console.log('\n\n✨ All HTML files have been processed!');
    } catch (error) {
        console.error('\n❌ An error occurred during the update process:', error);
    }
}

run();
