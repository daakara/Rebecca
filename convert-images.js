const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// --- Configuration ---
const baseDir = path.join(__dirname, 'assets', 'images');
const quality = 80; // WebP quality, 1-100 (a good balance of quality and size)
const supportedExtensions = ['.jpg', '.jpeg', '.png'];
// --- End Configuration ---

async function convertImagesInDirectory(dir) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // If it's a directory, look inside it
                await convertImagesInDirectory(fullPath);
            } else if (entry.isFile()) {
                const extension = path.extname(entry.name).toLowerCase();
                if (supportedExtensions.includes(extension)) {
                    const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                    try {
                        // Check if WebP version already exists to avoid re-converting
                        await fs.access(webpPath);
                        console.log(`Skipping, WebP already exists for: ${entry.name}`);
                    } catch {
                        // If it doesn't exist, create it
                        console.log(`Converting: ${fullPath}`);
                        await sharp(fullPath)
                            .webp({ quality: quality })
                            .toFile(webpPath);
                        console.log(`  -> Created: ${webpPath}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${dir}:`, error);
    }
}

async function run() {
    console.log('Starting image conversion to WebP...');
    try {
        await convertImagesInDirectory(baseDir);
        console.log('\n✅ Conversion process complete!');
    } catch (error) {
        console.error('\n❌ An error occurred during the conversion process:', error);
    }
}

run();
