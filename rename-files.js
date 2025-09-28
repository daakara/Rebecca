const fs = require('fs');
const path = require('path');

// --- Configuration ---
// The full path to the folder where you want to rename files.
// IMPORTANT: Use double backslashes `\\` for the path on Windows.
const targetDirectory = "C:\\Users\\daakara\\OneDrive - DPDHL\\Documents\\Rebecca\\assets\\images\\Family\\Mrs Shola and family";
// --- End Configuration ---

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

try {
    // Check if the directory exists
    if (!fs.existsSync(targetDirectory)) {
        throw new Error(`Directory not found at: ${targetDirectory}`);
    }

    const files = fs.readdirSync(targetDirectory);
    const imageFiles = files.filter(file => {
        const extension = path.extname(file).toLowerCase();
        return supportedExtensions.includes(extension);
    });

    if (imageFiles.length === 0) {
        console.log('No image files found to rename in the specified directory.');
        process.exit(0);
    }

    console.log(`Found ${imageFiles.length} image(s) to rename.`);

    // Sort files alphabetically before renaming to ensure a consistent order
    imageFiles.sort();

    imageFiles.forEach((file, index) => {
        const oldPath = path.join(targetDirectory, file);
        const extension = path.extname(file);
        const newName = `${index + 1}${extension}`;
        const newPath = path.join(targetDirectory, newName);

        // Check if the file needs renaming to avoid errors
        if (oldPath !== newPath) {
            try {
                fs.renameSync(oldPath, newPath);
                console.log(`Renamed "${file}" to "${newName}"`);
            } catch (renameError) {
                console.error(`Could not rename "${file}". It might be in use or a file named "${newName}" already exists.`);
            }
        } else {
            console.log(`Skipped "${file}" as it already has the correct name.`);
        }
    });

    console.log('\nRenaming process complete!');

} catch (error) {
    console.error('\nAn error occurred:');
    console.error(error.message);
}
