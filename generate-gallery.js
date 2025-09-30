const fs = require('fs').promises;
const path = require('path');

const baseImageDir = path.join(__dirname, 'assets', 'images');
const primaryExtensions = ['.webp'];
const fallbackExtensions = ['.jpg', '.jpeg', '.png'];

/**
 * Generates an alt text from a filename.
 * e.g., "Aisha-Maternity-Shoot-1.jpg" -> "Aisha Maternity Shoot 1"
 * @param {string} filename - The name of the image file.
 * @returns {string} A descriptive alt text.
 */
function generateAltText(filename) {
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    // Replace underscores and hyphens with spaces
    const spacedName = nameWithoutExt.replace(/[_-]/g, ' ');
    // Capitalize the first letter of each word
    return spacedName.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Custom sort function to sort filenames numerically.
 * e.g., "1.jpg", "2.jpg", "10.jpg"
 * @param {string} a - First filename.
 * @param {string} b - Second filename.
 * @returns {number}
 */
function numericSort(a, b) {
    const numA = parseInt(a.match(/^\d+/), 10);
    const numB = parseInt(b.match(/^\d+/), 10);
    return numA - numB;
}

async function generateGallery(category) {
    const categoryDir = path.join(baseImageDir, category);
    let htmlOutput = '';

    try {
        const entries = await fs.readdir(categoryDir, { withFileTypes: true });
        const subfolders = entries.filter(entry => entry.isDirectory());

        if (subfolders.length > 0) {
            // If subfolders exist, process them.
            for (const subfolder of subfolders) {
                const subfolderPath = path.join(categoryDir, subfolder.name);
                const imageFiles = await fs.readdir(subfolderPath);
                htmlOutput += generateHtmlForFiles(imageFiles, category, subfolder.name);
            }
        } else {
            // Otherwise, no subfolders were found. Look for image files directly in the category directory.
            const imageFiles = entries.filter(entry => entry.isFile()).map(entry => entry.name);
            htmlOutput += generateHtmlForFiles(imageFiles, category);
        }

        if (htmlOutput) {
            console.log('--- Copy the HTML below and paste it into your file ---');
            console.log(htmlOutput);
            console.log('---------------------------------------------------------');
        } else {
            console.log(`No images found in the "${category}" directory.`);
        }

    } catch (error) {
        console.error(`❌ Error generating gallery for "${category}":`, error);
        console.error(`Please ensure the directory "assets/images/${category}" exists.`);
    }
}

/**
 * Generates HTML for a list of image files.
 * @param {string[]} imageFiles - Array of filenames.
 * @param {string} category - The main category (e.g., "Maternity").
 * @param {string|null} subfolderName - The name of the subfolder, or null if none.
 * @returns {string} The generated HTML string.
 */
function generateHtmlForFiles(imageFiles, category, subfolderName = null) {
    let html = '';

    // Prefer finding WebP files first
    let filteredAndSorted = imageFiles
        .filter(file => primaryExtensions.some(ext => file.toLowerCase().endsWith(ext)))
        .sort(numericSort);

    let usingFallback = false;
    // If no WebP files are found, look for JPG/PNG as a fallback
    if (filteredAndSorted.length === 0) {
        usingFallback = true;
        filteredAndSorted = imageFiles
            .filter(file => fallbackExtensions.some(ext => file.toLowerCase().endsWith(ext)))
            .sort(numericSort);
    }

    if (subfolderName && filteredAndSorted.length > 0) {
        html += `            <!-- ${subfolderName} -->\n`;
    }

    for (const imageFile of filteredAndSorted) {
        const pathParts = ['assets', 'images', category, subfolderName, imageFile].filter(Boolean);
        const relativePath = path.join(...pathParts).replace(/\\/g, '/');
        const webpPath = relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const altText = generateAltText(imageFile);

        html += usingFallback
            ? `            <div class="masonry-item"><a href="${webpPath}"><picture><source srcset="${webpPath}" type="image/webp"><img src="${relativePath}" alt="${altText}" loading="lazy"></picture></a></div>\n`
            : `            <div class="masonry-item"><a href="${relativePath}"><picture><source srcset="${relativePath}" type="image/webp"><img src="${relativePath}" alt="${altText}" loading="lazy"></picture></a></div>\n`;
    }
    return html;
}

const categoryArg = process.argv[2];
if (!categoryArg) {
    console.error('Please provide a category name. Example: node generate-gallery.js Maternity');
    process.exit(1);
}

generateGallery(categoryArg);
