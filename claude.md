# claude.md — Rebecca Nwose Photography Portfolio

## Project Overview
Static HTML/CSS/JS photography portfolio for Rebecca Nwose (Lagos-based photographer). Live at www.rebeccanwose.com. No backend, no database, no server-side code.

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript ES6
- **CMS**: Decap CMS (formerly Netlify CMS) at `/admin/`
- **Forms**: Formspree (contact form)
- **Hosting**: Netlify (Apache `.htaccess` also present for fallback)
- **Image format**: WebP (converted from originals via `convert-images.js`)
- **CSS build**: PostCSS + cssnano via `build-css.js`
- **Build tools**: Custom Node.js scripts in project root

## Project Structure
```
Rebecca/
├── admin/              # Decap CMS — config.yml + index.html
├── assets/
│   ├── css/            # Source stylesheets (main.css, gallery.css, lightbox.css, etc.)
│   └── images/         # Portfolio images organised by category/client (WebP)
├── assets/js/          # JS files (contact.js, gallery.js, lightbox.js, main.js, etc.)
├── portrait/           # Standalone portrait index page
├── *.html              # Page files (index, about, contact, portfolio-*.html, thank-you.html)
└── *.js                # Build/utility scripts (convert-images, generate-gallery, etc.)
```

## Image Categories
Beauty, Family, Maternity, Portrait, Wedding, Event — each with client sub-folders.

## Known Gotchas
- Images must be WebP. JPGs deleted via `delete-jpgs.js`. HTML references updated via `update-html-to-webp-only.js`.
- Folder references updated with `update-folder-references.js` — run after any image reorganisation.
- `fix-html-images.js` patches broken image paths after structural changes.
- No automated test suite exists. QA is manual.
- Decap CMS requires Netlify Identity + Git Gateway enabled — see DECAP_CMS_SETUP.md.

## Conventions
- Mobile-first CSS. Responsive breakpoints in `responsive.css`.
- ARIA labels + keyboard navigation required on all interactive elements.
- Semantic HTML — always use proper heading hierarchy and landmark elements.
- No jQuery or heavy frameworks. Vanilla JS only.
- CSS specificity: keep selectors shallow. Avoid `!important`.

## Environment
- Node.js required for build scripts.
- Run `npm run build` to compile/minify CSS.
- No CI/CD pipeline defined in code — Netlify auto-deploys on git push to main.

---

## Session: 2026-05-06

### Generalised Knowledge
- Project is a static photography portfolio. No DB, no API, no auth (except Decap CMS admin via Netlify Identity).
- Nine agent `.md` files exist in project root as custom VS Code Copilot agents.
- `frontend-design.md` is a **skill file** (no model/tools in frontmatter) — not a routable agent.
- `context-manager` agent referenced in `ui-designer.md` and `fullstack-developer.md` does not exist. Orchestrator injects context directly until one is created.
- `architect-reviewer` and `fullstack-developer` are over-scoped for current static site — retain for project evolution.

### Context for Future Agents
- Always check `agent.md` for routing rules before selecting which specialist to invoke.
- `ux-researcher` is the only agent with WebFetch/WebSearch — use for any web-access needs.
- Opus model agents (architect-reviewer, code-reviewer) are expensive — invoke only when the concern warrants it.
- All knowledge file writes go through `agent-organizer` only. Sub-agents do not write to `claude.md`, `agent.md`, or `tasks/`.
