# Rebecca Nwose Photography Portfolio

A professional photography portfolio website showcasing the work of Rebecca Nwose, a Lagos-based photographer specializing in Beauty, Fashion, Portrait, Wedding, Family, Maternity, and Event photography.

## 🌐 Live Site

**[www.rebeccanwose.com](https://www.rebeccanwose.com)**

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Build Scripts](#build-scripts)
- [Deployment](#deployment)
- [Maintenance](#maintenance)
- [Known Issues](#known-issues)

## ✨ Features

- **Responsive Design**: Mobile-first approach with full tablet and desktop support
- **Image Optimization**: WebP format with optimized loading and lazy loading
- **Portfolio Categories**: Organized galleries for different photography styles
- **Lightbox Gallery**: Interactive image viewer with keyboard navigation
- **Contact Form**: Integrated with Formspree for client inquiries
- **SEO Optimized**: Proper meta tags, sitemap, and semantic HTML
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Performance**: Minified CSS, optimized images, and efficient loading
- **CMS Integration**: Decap CMS for easy content management without coding

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6)
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Image Processing**: Sharp (Node.js)
- **CSS Processing**: PostCSS, cssnano
- **Form Handling**: Formspree
- **Server**: Apache (with .htaccess URL rewriting) / Netlify
- **Image Format**: WebP with fallbacks
- **Build Tools**: Custom Node.js scripts

## 📁 Project Structure

```
Rebecca/
├── admin/                      # Decap CMS admin panel
│   ├── index.html              # CMS interface
│   └── config.yml              # CMS configuration
├── assets/
│   ├── css/                    # Stylesheets
│   │   ├── dist/               # Minified CSS (generated)
│   │   ├── main.css            # Core styles
│   │   ├── gallery.css         # Gallery layouts
│   │   ├── lightbox.css        # Lightbox modal
│   │   ├── portfolio-detail.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── hero-scroll.css     # Animated hero section
│   │   ├── mobile-nav.css
│   │   └── responsive.css
│   ├── images/                 # Photography portfolio images
│   │   ├── Beauty/
│   │   │   ├── Damilola/
│   │   │   ├── Debby/
│   │   │   ├── Editorial/      # (formerly untitled_folder)
│   │   │   └── ... (other clients)
│   │   ├── Family/
│   │   │   ├── Mrs_Shola_family/
│   │   │   ├── The_Ighodaro's/
│   │   │   ├── Lifestyle/      # (formerly untitled_folder)
│   │   │   └── ...
│   │   ├── Portrait/
│   │   │   ├── Ms_Lara/
│   │   │   ├── Nora_West/
│   │   │   ├── Studio/         # (formerly untitled_folder)
│   │   │   └── ...
│   │   ├── Wedding/
│   │   ├── Maternity/
│   │   └── Event/
│   └── js/                     # JavaScript modules
│       ├── main.js             # Navigation, scroll effects
│       ├── lightbox.js         # Image lightbox functionality
│       ├── gallery.js          # Gallery interactions
│       ├── contact.js          # Contact form (placeholder)
│       ├── form-validation.js  # Client-side validation
│       └── portfolio-load-more.js
├── *.html                      # HTML pages
├── build-css.js                # CSS minification script
├── convert-images.js           # Image → WebP converter
├── fix-html-images.js          # HTML image reference updater
├── generate-gallery.js         # Gallery HTML generator
├── delete-jpgs.js              # Cleanup script
├── update-folder-references.js # Folder rename script
├── package.json
├── postcss.config.js
├── sitemap.xml
├── robots.txt
└── .htaccess                   # Apache config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v14.17.5 or higher (v18+ recommended)
- **npm**: v6.14.14 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/daakara/Rebecca.git
cd Rebecca
```

2. Install dependencies:
```bash
npm install
```

3. Build assets:
```bash
npm run build
```

## 🔧 Build Scripts

### Main Build Commands

```bash
# Build everything (images → WebP, minify CSS, update HTML)
npm run build

# Individual builds
npm run build:images    # Convert JPG/PNG to WebP
npm run build:css       # Minify CSS files
npm run build:html      # Update HTML image references

# Utilities
npm run clean:jpg       # Delete original JPG/PNG files after WebP conversion
npm run generate:gallery <Category>  # Generate gallery HTML for a category
```

### Build Script Details

#### `build-css.js`
- **Purpose**: Minifies and bundles CSS for production
- **What it does**:
  - Minifies all CSS files individually
  - Creates a bundled `style.bundle.min.css` (all CSS combined)
  - Outputs to `assets/css/dist/`
  - Shows file size savings and compression stats
- **Dependencies**: postcss, cssnano
- **Configuration**: Uses `postcss.config.js` settings

#### `convert-images.js`
- **Purpose**: Converts original images to optimized WebP format
- **What it does**:
  - Converts JPG/PNG images to WebP format
  - Quality setting: 80% (configurable in script)
  - Skips already-converted images
  - Recursive directory processing through all portfolio categories
  - Preserves original files (delete with `delete-jpgs.js`)
- **Dependencies**: sharp (image processing library)

#### `fix-html-images.js`
- **Purpose**: Fixes broken image references in HTML files
- **What it does**:
  - Scans all HTML files for `<picture>` elements
  - Updates `<img src>` attributes to match the WebP source
  - Ensures fallback images use the same path as WebP images
  - Uses regex patterns for safe, accurate replacement
- **When to use**: After converting images to WebP or reorganizing folders
- **Output**: Reports number of fixes made per file

#### `update-folder-references.js`
- **Purpose**: Updates HTML when image folders are renamed
- **What it does**:
  - Finds and replaces old folder paths with new paths
  - Processes all HTML files in the project
  - Preserves all other HTML structure and attributes
- **Usage**: Edit the script with old/new paths, then run
- **Safety**: Always commit changes before running bulk replacements

#### `generate-gallery.js`
Usage:
```bash
node generate-gallery.js Beauty
node generate-gallery.js Portrait
node generate-gallery.js Family
# etc. - works with any category name
```
- **Purpose**: Generates HTML markup for portfolio galleries
- **What it does**:
  - Scans category folder for all image subfolders
  - Automatically sorts images numerically (1.webp, 2.webp, etc.)
  - Creates proper `<picture>` elements with WebP sources and fallbacks
  - Generates organized HTML comments for each client/subfolder
  - Outputs copyable HTML ready to paste into portfolio pages
- **Usage tip**: Copy output and replace gallery section in HTML file

#### `delete-jpgs.js`
- **Purpose**: Cleanup tool to remove original JPG/PNG files
- **Warning**: Only run after verifying WebP conversion is complete
- **What it does**: Recursively deletes all .jpg, .jpeg, .png files in images folder
- **Safety**: Does not delete the logo file (rebecca nwose_alt logo 1.png)

## 🚢 Deployment

### Apache Server Setup

The project includes `.htaccess` for:
- Clean URLs (removes `.html` extension)
- 301 redirects from `.html` to clean URLs
- Proper MIME types for WebP images

### Deployment Checklist

1. **Build assets**:
   ```bash
   npm run build
   ```

2. **Verify all images are WebP**:
   ```bash
   find assets/images -type f \( -name "*.jpg" -o -name "*.png" \) | wc -l
   # Should return 0 (except logos)
   ```

3. **Test HTML references**:
   ```bash
   grep -r '\.jpg\|\.jpeg\|\.png' *.html | grep -v 'rebecca nwose_alt logo'
   # Should return no gallery image references
   ```

4. **Upload to server**:
   - Use FTP/SFTP client
   - Upload all files maintaining directory structure
   - Ensure `.htaccess` is uploaded

5. **Post-deployment verification**:
   - Test all portfolio pages
   - Verify lightbox functionality
   - Check contact form submission
   - Test mobile responsiveness

## 🔄 Maintenance

### Adding New Photos

1. **Organize files**:
   - Create client folder: `assets/images/[Category]/[ClientName]/`
   - Name files numerically: `1.jpg`, `2.jpg`, etc.

2. **Convert to WebP**:
   ```bash
   npm run build:images
   ```

3. **Generate gallery HTML**:
   ```bash
   node generate-gallery.js [Category]
   ```

4. **Update HTML page**:
   - Copy generated HTML
   - Paste into appropriate `portfolio-[category].html`
   - Update alt texts for better SEO

5. **Clean up originals** (optional):
   ```bash
   npm run clean:jpg
   ```

### Updating CSS

1. Edit CSS files in `assets/css/`
2. Rebuild minified versions:
   ```bash
   npm run build:css
   ```
3. Minified files are created in `assets/css/dist/`
4. HTML pages reference both source and minified CSS for development/production

### Managing Image Folders

When reorganizing image folders:

1. **Rename folders** using descriptive names (not "untitled_folder")
2. **Update HTML references**:
   ```bash
   node update-folder-references.js
   ```
   - Or manually find/replace folder paths in HTML files
3. **Test all portfolio pages** to ensure images load correctly

### Fixing HTML Image References

If image references break:

```bash
npm run build:html
```

This will:
- Scan all HTML files for `<picture>` tags
- Update `<img src>` attributes to match WebP sources
- Fix any inconsistencies in image paths

### SEO Maintenance

- Update `sitemap.xml` after adding new pages
- Keep meta descriptions current and unique
- Update Open Graph images for social sharing
- Monitor and update structured data

## ⚠️ Known Issues

### Resolved ✅

1. **✅ portfolio-portrait.html contains wrong images** - FIXED (Nov 7, 2025)
   - Previously displayed Beauty category images instead of Portrait
   - Fixed by regenerating gallery with correct Portrait images
   - Verified 178 Portrait images now display correctly

2. **✅ Package.json duplicates and conflicts** - FIXED (Nov 7, 2025)
   - Removed duplicate `postcss-cli` entry
   - Resolved `glob` and `jsdom` dependency conflicts
   - All dependencies now compatible with Node.js v14+

3. **✅ Broken image references in HTML** - FIXED (Nov 7, 2025)
   - Fixed 85 broken `<img>` fallback references across 11 HTML files
   - All `<picture>` tags now have correct WebP sources and fallbacks

4. **✅ Disorganized image folders** - FIXED (Nov 7, 2025)
   - Renamed `Beauty/untitled_folder` → `Beauty/Editorial`
   - Renamed `Family/untitled_folder` → `Family/Lifestyle`
   - Renamed `Portrait/untitled_folder` → `Portrait/Studio`
   - Updated all HTML references to new folder structure

5. **✅ Missing CSS build pipeline** - FIXED (Nov 7, 2025)
   - Created `build-css.js` for proper CSS minification
   - All CSS files now minify to `assets/css/dist/`
   - Bundle creation working (though not currently linked in HTML)

6. **✅ Homepage improvements** - FIXED (Nov 7, 2025)
   - Removed "Rebecca Nwose" text overlay from hero section
   - Reduced animated image columns from 5 to 3 for better mobile UX

7. **✅ Contact form enhancement** - FIXED (Nov 7, 2025)
   - Added phone number input field with proper validation
   - Includes international format placeholder

### Active

None currently identified.

### Compatibility

1. **Node.js Version**
   - Requires Node.js v14.17.5+
   - Fully tested on v14.17.5
   - Custom build scripts written to work around older Node.js limitations
   - Dependencies chosen for v14 compatibility

2. **Browser Support**
   - WebP images: All modern browsers (Chrome, Firefox, Safari, Edge)
   - Fallback WebP for logo works in all browsers
   - Progressive enhancement approach for older browsers
   - IE11 not officially supported

## 📝 Development Notes

### Recent Updates (November 2025)

**Major Fixes & Improvements:**
- ✅ Fixed portfolio-portrait.html showing wrong images (Beauty → Portrait)
- ✅ Cleaned up package.json (removed duplicates, resolved conflicts)
- ✅ Fixed 85 broken image references across all HTML files
- ✅ Reorganized 3 untitled_folder directories with descriptive names
- ✅ Built proper CSS minification pipeline with custom script
- ✅ Updated sitemap.xml with current dates
- ✅ Enhanced homepage UX (removed overlay, reduced columns)
- ✅ Added phone number field to contact form
- ✅ Created comprehensive build and maintenance scripts

**Scripts Created:**
- `build-css.js` - CSS minification and bundling
- `fix-html-images.js` - Automated image reference fixing
- `update-folder-references.js` - Bulk folder path updates

### Image Naming Convention
- Use numeric naming for gallery images: `1.webp`, `2.webp`, etc.
- Use descriptive names for featured/hero images
- Avoid spaces in filenames (use underscores or hyphens)

### CSS Architecture
- **main.css**: Global styles, typography, layout
- **Component-specific CSS**: Separate files for major sections
- **responsive.css**: Media queries and mobile adjustments
- **Order matters**: CSS is bundled in specific order (see build-css.js)

### JavaScript Modules
- Each module is self-contained
- No external frameworks/libraries
- ES6 syntax throughout
- Event delegation where appropriate

## 🤝 Contributing

This is a private client project. For inquiries, contact the repository owner.

## 📄 License

© 2025 Rebecca Nwose Photography. All rights reserved.

## 🔗 Links

- **Website**: [www.rebeccanwose.com](https://www.rebeccanwose.com)
- **Instagram**: [@rebeccanwose](https://www.instagram.com/rebeccanwose/)
- **LinkedIn**: [Rebecca Nwose](https://www.linkedin.com/in/rebecca-nwose-84236585/)

---

**Last Updated**: November 7, 2025  
**Version**: 2.0.0  
**Maintained by**: David (daakara)  
**Status**: Production-ready, fully optimized

### Changelog

**v2.0.0 (November 7, 2025)**
- Fixed critical bug: portfolio-portrait.html showing wrong images
- Reorganized image folder structure (removed untitled_folders)
- Created comprehensive build pipeline (CSS minification, image processing)
- Fixed 85 broken image references across all pages
- Enhanced homepage design and contact form
- Updated all documentation
- Cleaned up package.json dependencies
- Created automated maintenance scripts

**v1.0.0 (Initial Release)**
- Initial website launch
- Basic portfolio galleries
- Contact form integration
- Mobile-responsive design
