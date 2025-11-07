const fs = require('fs').promises;
const path = require('path');

const projectRoot = __dirname;

const replacements = [
    {
        old: 'assets/images/Beauty/untitled_folder',
        new: 'assets/images/Beauty/Editorial'
    },
    {
        old: 'assets/images/Family/untitled_folder',
        new: 'assets/images/Family/Lifestyle'
    },
    {
        old: 'assets/images/Portrait/untitled_folder',
        new: 'assets/images/Portrait/Studio'
    }
];

async function updateHtmlFile(filePath) {
    console.log(`\nProcessing: ${path.basename(filePath)}`);
    try {
        let html = await fs.readFile(filePath, 'utf-8');
        let updatesMade = false;
        
        replacements.forEach(({ old, new: newPath }) => {
            const oldPattern = new RegExp(old.replace(/\//g, '\\/'), 'g');
            const matches = (html.match(oldPattern) || []).length;
            
            if (matches > 0) {
                html = html.replace(oldPattern, newPath);
                console.log(`  - Replaced "${old}" with "${newPath}" (${matches} occurrences)`);
                updatesMade = true;
            }
        });

        if (updatesMade) {
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
    console.log('Starting folder rename update process...\n');
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
