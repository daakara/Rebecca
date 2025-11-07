const fs = require('fs').promises;
const path = require('path');
const cssnano = require('cssnano');
const postcss = require('postcss');

const cssDir = path.join(__dirname, 'assets', 'css');
const distDir = path.join(cssDir, 'dist');

// CSS files to bundle in order
const cssFiles = [
    'main.css',
    'gallery.css',
    'lightbox.css',
    'portfolio-detail.css',
    'about.css',
    'contact.css',
    'hero-scroll.css',
    'mobile-nav.css',
    'responsive.css'
];

async function buildCSS() {
    console.log('🎨 Building CSS files...\n');
    
    try {
        // Ensure dist directory exists
        try {
            await fs.access(distDir);
        } catch {
            await fs.mkdir(distDir, { recursive: true });
        }

        // Process each CSS file individually
        for (const file of cssFiles) {
            const inputPath = path.join(cssDir, file);
            const outputPath = path.join(distDir, file.replace('.css', '.min.css'));
            
            try {
                const css = await fs.readFile(inputPath, 'utf8');
                const result = await postcss([cssnano({ preset: 'default' })]).process(css, { 
                    from: inputPath,
                    to: outputPath
                });
                
                await fs.writeFile(outputPath, result.css, 'utf8');
                
                const originalSize = Buffer.byteLength(css);
                const minifiedSize = Buffer.byteLength(result.css);
                const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
                
                console.log(`✅ ${file} → ${path.basename(outputPath)}`);
                console.log(`   ${(originalSize / 1024).toFixed(2)}KB → ${(minifiedSize / 1024).toFixed(2)}KB (${savings}% smaller)\n`);
            } catch (error) {
                console.error(`❌ Error processing ${file}:`, error.message);
            }
        }

        // Bundle all CSS into one file
        console.log('📦 Creating bundled CSS file...\n');
        let bundledCSS = '';
        
        for (const file of cssFiles) {
            const inputPath = path.join(cssDir, file);
            try {
                const css = await fs.readFile(inputPath, 'utf8');
                bundledCSS += `/* ${file} */\n${css}\n\n`;
            } catch (error) {
                console.log(`⚠️  Skipping ${file}: ${error.message}`);
            }
        }

        const bundledResult = await postcss([cssnano({ preset: 'default' })]).process(bundledCSS, {
            from: undefined
        });
        
        const bundlePath = path.join(distDir, 'style.bundle.min.css');
        await fs.writeFile(bundlePath, bundledResult.css, 'utf8');
        
        const bundleSize = Buffer.byteLength(bundledResult.css);
        console.log(`✅ style.bundle.min.css created`);
        console.log(`   ${(bundleSize / 1024).toFixed(2)}KB (all CSS combined and minified)\n`);

        console.log('✨ CSS build complete!');
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

buildCSS();
