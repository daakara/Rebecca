const fs = require('fs').promises;
const path = require('path');

// --- ⚠️ CONFIGURATION ⚠️ ---

// Set to `false` to permanently delete files. 
// It is strongly recommended to run with `true` first.
const dryRun = false;

const baseDir = path.join(__dirname, 'assets', 'images');
const extensionsToDelete = ['.jpg', '.jpeg'];

// --- End Configuration ---

let filesFound = 0;
let failedCount = 0;

async function findAndDelete(dir) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // Recurse into subdirectories
                await findAndDelete(fullPath);
            } else if (entry.isFile()) {
                const extension = path.extname(entry.name).toLowerCase();

                if (extensionsToDelete.includes(extension)) {
                    filesFound++;
                    if (dryRun) {
                        console.log(`[DRY RUN] Would delete: ${fullPath}`);
                    } else {
                        try {
                            await fs.unlink(fullPath);
                            console.log(`Deleted: ${fullPath}`);
                        } catch (deleteError) {
                            console.error(`❌ Failed to delete: ${fullPath}`, deleteError);
                            failedCount++;
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${dir}:`, error);
        failedCount++;
    }
}

async function run() {
    if (dryRun) {
        console.log('--- Starting Dry Run: No files will be deleted. ---');
    } else {
        console.log('--- ⚠️ Starting Deletion: This is permanent! ---');
    }

    await findAndDelete(baseDir);

    console.log('\n--- Summary ---');
    if (dryRun) {
        console.log(`Found ${filesFound} image(s) that would be deleted.`);
        console.log('To delete them, change `dryRun` to `false` in the script and run it again.');
    } else {
        console.log(`✅ Successfully deleted: ${filesFound - failedCount} image(s).`);
        if (failedCount > 0) {
            console.log(`❌ Failed to delete: ${failedCount} image(s).`);
        }
    }
    console.log('-----------------');
}

run();
