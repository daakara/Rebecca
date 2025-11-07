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

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6)
- **Image Processing**: Sharp (Node.js)
- **CSS Processing**: PostCSS, cssnano
- **Form Handling**: Formspree
- **Server**: Apache (with .htaccess URL rewriting)
- **Image Format**: WebP with fallbacks
- **Build Tools**: Custom Node.js scripts

## 📁 Project Structure

```
Rebecca/
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
- Minifies all CSS files individually
- Creates a bundled `style.bundle.min.css` (all CSS combined)
- Outputs to `assets/css/dist/`
- Shows file size savings

#### `convert-images.js`
- Converts JPG/PNG images to WebP format
- Quality setting: 80% (configurable)
- Skips already-converted images
- Recursive directory processing

#### `fix-html-images.js`
- Updates `<img src>` references from JPG/PNG to WebP
- Ensures consistency across all HTML files
- Safe regex-based replacement

#### `generate-gallery.js`
Usage:
```bash
node generate-gallery.js Beauty
node generate-gallery.js Portrait
# etc.
```
- Generates HTML markup for gallery images
- Automatically sorts images numerically
- Creates proper `<picture>` elements with WebP sources

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
3. HTML pages automatically reference minified versions in `dist/`

### SEO Maintenance

- Update `sitemap.xml` after adding new pages
- Keep meta descriptions current and unique
- Update Open Graph images for social sharing
- Monitor and update structured data

## ⚠️ Known Issues

### Critical

1. **portfolio-portrait.html contains wrong images**
   - **Issue**: Page displays Beauty category images instead of Portrait
   - **Impact**: Users see incorrect portfolio content
   - **Fix**: Regenerate using `node generate-gallery.js Portrait` and manually replace gallery section
   - **Priority**: HIGH

### Compatibility

1. **Node.js Version**
   - Requires Node.js v14+
   - Dependencies (glob v11, jsdom v27) prefer Node.js v18+
   - Current scripts are compatible with v14 using workarounds

2. **Browser Support**
   - WebP images: All modern browsers
   - Fallback PNG for logo works in all browsers
   - IE11 not officially supported

## 📝 Development Notes

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
**Version**: 1.0.0
**Maintained by**: David (daakara)
