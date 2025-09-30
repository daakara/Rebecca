const fs = require('fs').promises;
const path = require('path');
const { JSDOM } = require('jsdom');
const { glob } = require('glob');

// --- Configuration ---
const projectRoot = __dirname;
const imageExtensions = /\.(jpg|jpeg|png)$/i;
// --- End Configuration ---

async function updateHtmlFile(filePath) {
    console.log(`\nProcessing: ${path.basename(filePath)}`);
    try {
        const html = await fs.readFile(filePath, 'utf-8');
        const dom = new JSDOM(html);
        const { document } = dom.window;
        let updatesMade = false;

        // --- Part 1: Update <img> tags to <picture> elements ---
        const images = document.querySelectorAll('img:not(picture img)');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && imageExtensions.test(src)) {
                const webpSrc = src.replace(imageExtensions, '.webp');
                const picture = document.createElement('picture');
                const source = document.createElement('source');
                source.srcset = webpSrc;
                source.type = 'image/webp';
                
                // The original <img> becomes the fallback
                const originalImgClone = img.cloneNode(true);
                
                picture.appendChild(source);
                picture.appendChild(originalImgClone);
                
                img.parentNode.replaceChild(picture, img);
                console.log(`  - Wrapped <img>: `);
                updatesMade = true;
            }
        });

        // --- Part 2: Update <a> links to point to .webp ---
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && imageExtensions.test(href)) {
                const webpHref = href.replace(imageExtensions, '.webp');
                link.setAttribute('href', webpHref);
                console.log(`  - Updated <a> href:  -> `);
                updatesMade = true;
            }
        });

        if (updatesMade) {
            const newHtml = dom.serialize();
            await fs.writeFile(filePath, newHtml, 'utf-8');
            console.log(`✅ Saved updates to ${path.basename(filePath)}.`);
        } else {
            console.log(`No updates needed for ${path.basename(filePath)}.`);
        }

    } catch (error) {
        console.error(`❌ Error processing file :`, error);
    }
}

async function run() {
    console.log('Starting HTML update process to point all images to WebP...');
    try {
        const htmlFiles = await glob('**/*.html', {
            cwd: projectRoot,
            ignore: 'node_modules/**',
            absolute: true
        });

        if (htmlFiles.length === 0) {
            console.log('No HTML files found.');
            return;
        }

        for (const file of htmlFiles) {
            await updateHtmlFile(file);
        }

        console.log('\n\n✨ All HTML files have been processed!');
    } catch (error) {
        console.error('\n❌ An error occurred during the update process:', error);
    }
}

run();
