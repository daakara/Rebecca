# tasks/todo.md

## Session: 2026-05-06

### Completed
- [x] Phase 1: Discovery — read all agent files, mapped architecture
- [x] Phase 2: Proposal — produced Mermaid diagram, agent breakdown, orchestration logic, draft agent.md
- [x] Phase 3: Knowledge capture — created claude.md, agent.md, tasks/lessons.md, tasks/todo.md

### Open Decisions
- [x] Decide: create context-manager agent, or continue with orchestrator-injected context? → **Decision: orchestrator-injected context. No context-manager agent.**

### Issues
*(none this session)*

---

## Image Replacement Project

### Phase 0: Scope Lock
- [x] Keep existing logos and favicon.
- [x] Use `Couple_Portraits` as internal folder/page naming.
- [x] Remove old portfolio pages not listed in replacement set.

### Phase 1: Inventory
- [x] Count source images in `welcome page images` — 36 JPG files.
- [x] Count source images in `Portraits` — 140 JPG files.
- [x] Count source images in `Maternity` — 35 JPG files.
- [x] Count source images in `Family Portraits` — 61 JPG files.
- [x] Count source images in `Couple Portraits` — 20 JPG files.
- [x] Count source images in `Beauty` — 33 JPG files.
- [x] Record source image formats and nested-folder layout — all source folders are flat; all replacement files are `.jpg`.

### Phase 1 Results
- Total replacement images: 325 JPG files.
- Source folders are flat, with no nested client/session subfolders.
- Several filenames contain spaces, commas, and date-style names, so Phase 2 should normalize copied destination filenames before conversion/link generation.

### Phase 2: Asset Migration
- [x] Preserve brand assets in `assets/images`: logos and favicon.
- [x] Remove old portfolio image folders from `assets/images`.
- [x] Create new destination folders: `Welcome`, `Portrait`, `Maternity`, `Family`, `Couple_Portraits`, `Beauty`.
- [x] Copy replacement images into destination folders.
- [x] Normalize filenames for URL-safe paths if needed.
- [x] Convert non-WebP images to `.webp`.
- [x] Remove duplicate non-WebP copies after conversion if appropriate.

### Phase 2 Results
- Migrated 325 replacement JPG files to normalized `.webp` files.
- Destination counts: `Welcome` 36, `Portrait` 140, `Maternity` 35, `Family` 61, `Couple_Portraits` 20, `Beauty` 33.
- Preserved brand files: `favicon.ico`, `rebecca nwose_alt logo 1.png`, `rebecca nwose_alt logo 1.webp`, `rebeccanwose_main logo.png`, `rebeccanwose_main logo.webp`.
- Removed old non-brand top-level image `Rebecca_Nwose.webp` and old portfolio folders including `Wedding`.

### Phase 3: Gallery Generation
- [x] Update or reuse gallery-generation workflow for new folder layout.
- [x] Regenerate `portfolio-portrait.html`.
- [x] Regenerate `portfolio-maternity.html`.
- [x] Regenerate `portfolio-family.html`.
- [x] Regenerate `portfolio-beauty.html`.
- [x] Create `portfolio-couple-portraits.html`.
- [x] Ensure gallery markup keeps masonry, lazy loading, and lightbox compatibility.

### Phase 3 Results
- Regenerated gallery counts: Portrait 140, Maternity 35, Family 61, Beauty 33, Couple Portraits 20.
- Created `portfolio-couple-portraits.html` from existing portfolio detail page structure.
- Updated portfolio page titles, descriptions, Open Graph image URLs, Twitter image URLs, H1 text, and gallery markup.
- Verified generated gallery images parse as complete `picture` elements and have no missing local image references.

### Phase 4: Homepage Replacement
- [x] Replace homepage image references with `assets/images/Welcome/*`.
- [x] Ensure above-fold image loads cleanly.
- [x] Keep below-fold images lazy-loaded.
- [x] Verify responsive behavior for homepage imagery.

### Phase 4 Results
- Replaced homepage scrolling hero images with 54 `assets/images/Welcome/*` references.
- Used 27 unique Welcome images across 3 columns, duplicated per column for seamless vertical scroll.
- Updated homepage Open Graph, Twitter, and schema image URLs to `assets/images/Welcome/001-welcome-ebs0308.webp`.
- Set the first visible image in each column to `loading="eager"` and `fetchpriority="high"`; remaining hero images stay lazy-loaded.
- Verified homepage local image references with DOM/path audit: 54 hero images, 54 Welcome hero images, 0 missing image files.
- Browser visual check deferred to Phase 8 because the in-app browser was unavailable in this run.

### Phase 5: Navigation and Page Removal
- [x] Add Couple Portraits to portfolio navigation.
- [x] Add Couple Portraits to `portfolio.html`.
- [x] Remove Wedding and Event portfolio pages.
- [x] Remove Wedding and Event navigation/card links.
- [x] Update active-nav behavior if needed.

### Phase 5 Results
- Added portfolio dropdown navigation with Couple Portraits to all HTML pages that have site navigation.
- Updated `portfolio.html` to show 5 current category cards: Beauty, Family, Maternity, Portrait, Couple Portraits.
- Removed `portfolio-wedding.html` and `portfolio-event.html`.
- Verified no HTML references remain for `portfolio-wedding`, `portfolio-event`, `assets/images/Wedding`, or `assets/images/Event`.
- Verified `portfolio.html` card images exist and all dropdowns include Couple Portraits without Wedding/Event.

### Phase 6: CMS and SEO
- [x] Update `admin/config.yml` collections for final categories — skipped, no CMS active.
- [x] Add Couple Portraits CMS collection — skipped, no CMS active.
- [x] Remove Wedding/Event CMS collections if present — skipped, no CMS active.
- [x] Update `sitemap.xml`.
- [x] Update page meta titles/descriptions.

### Phase 6 Results
- Left `admin/config.yml` unchanged because CMS is not active.
- Updated `sitemap.xml`: removed Wedding/Event URLs, added Couple Portraits, set `lastmod` to `2026-06-05`.
- Confirmed sitemap parses as XML and now has 9 URLs.
- Confirmed live HTML/sitemap files have no stale refs to `portfolio-wedding`, `portfolio-event`, `assets/images/Wedding`, `assets/images/Event`, `social-share`, `Rebecca_Nwose`, or `about-rebecca`.
- Updated missing About/Contact image and social preview references to an existing Welcome image.
- Verified all local HTML image refs and social image refs exist: 0 missing.

### Phase 7: Cleanup
- [x] Search all HTML/CSS/JS for stale image paths.
- [x] Remove stale references to deleted pages/folders.
- [x] Rebuild assets with `npm run build`.

### Phase 7 Results
- Removed stale old-gallery background image classes from `assets/css/main.css`.
- Rebuilt CSS assets with `npm run build:css`, including `assets/css/dist/main.min.css` and `assets/css/dist/style.bundle.min.css`.
- Re-ran HTML image helper with `npm run build:html`; no HTML updates were needed after cleanup.
- Cleaned stale example comments in helper scripts and removed missing `privacy.html` / `terms.html` footer links from pages that referenced them.
- Verified no stale live HTML/CSS/JS refs remain for Wedding/Event pages, deleted image folders, old person/session folder names, or removed image names.
- Verified all local HTML/CSS/JS asset refs exist: 0 missing.
- Fixed the missing Sharp optional dependency with `npm install --include=optional sharp`.
- Verified full `npm run build` now passes: image step, CSS step, and HTML step all complete.

### Phase 8: Verification
- [x] Run local missing-image/path audit.
- [x] Verify homepage.
- [x] Verify each portfolio page.
- [x] Test lightbox open/next/prev/close/keyboard.
- [x] Test load-more behavior.
- [x] Test mobile nav and desktop portfolio dropdown.
- [x] Verify contact page still works.
- [x] Verify Decap CMS config parses.
- [x] Confirm no old portfolio images remain except logos/favicon.

### Phase 8 Results
- Full `npm run build` passes: image conversion, CSS build, and HTML helper all complete.
- Local HTML/CSS/JS asset path audit passes: 0 missing refs.
- Stale reference sweep passes: no live refs to Wedding/Event pages, deleted image folders, old session/person folder names, `social-share`, `Rebecca_Nwose`, or `about-rebecca`.
- Old portfolio image cleanup passes: only `Welcome`, `Portrait`, `Maternity`, `Family`, `Couple_Portraits`, `Beauty`, logos, and favicon remain under `assets/images`.
- Browser checked 10 live pages on local server: homepage, portfolio index, 5 portfolio detail pages, About, Contact, and Thank You.
- Browser completed-image check passes on all tested pages: 0 completed image failures.
- Portfolio counts verified in browser: Portrait 140, Maternity 35, Family 61, Beauty 33, Couple Portraits 20.
- Load-more verified on Portrait page: visible items increased from 9 to 18.
- Lightbox verified: opens, moves next, closes, and supports keyboard ArrowRight/Escape.
- Mobile nav verified at 390px width and fixed so portfolio category links are visible.
- Desktop portfolio dropdown now has hover/focus CSS fallback in addition to the existing JS class behavior.
- Internal page links now use `.html` targets so local/static hosting works without clean-URL rewrites; Couple Portraits mobile nav click verified at `/portfolio-couple-portraits.html`.
- Contact form verified: Formspree action present, POST method present, and required name/email/subject/message fields exist.
- `admin/config.yml` parses as YAML; CMS remains inactive per Phase 6 decision.
- Visual screenshots captured in `tasks/phase8-home-desktop.png`, `tasks/phase8-lightbox-active.png`, and `tasks/phase8-mobile-nav-fixed.png`.
