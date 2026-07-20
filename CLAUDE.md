# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page landing site to sell invitations to a cacao ceremony service ("Cacao Sagrado"). No build system — open `index.html` directly in a browser to preview.

## Development

**Preview:** Open `index.html` in any browser (double-click or use a local server).

**Local server (optional, for fetch/CORS compatibility):**
```bash
npx serve .
# or
python -m http.server 8000
```

No npm, no build step, no compilation needed.

## Architecture

Three files handle the entire site:

| File | Role |
|---|---|
| `index.html` | All HTML structure and content — 9 sections as a single page |
| `css/styles.css` | All styles: CSS custom properties, layout, animations, responsive |
| `java/main.js` | Navbar scroll effect, mobile menu toggle, IntersectionObserver fade-ins, form submit |

Note: JavaScript lives in `java/` (not `js/`) — this is intentional per the project folder structure.

## Design System

CSS custom properties defined in `:root` in `styles.css`:

```
--cream / --cream-alt / --light-brown   → backgrounds
--brown / --brown-dark                  → primary brand color (cacao)
--green / --green-dark                  → accent color (forest)
--gold                                  → labels, highlights, icons
--dark / --text / --text-light          → text hierarchy
```

**Fonts (via Google Fonts CDN):**
- `Playfair Display` → all headings (h1–h3)
- `Lato` → body, labels, buttons

**Icons:** Font Awesome 6.4 via cdnjs CDN.

## Page Sections

Sections in order (each has an `id` for nav anchoring):

1. `#inicio` — Hero (full-screen parallax bg, headline, CTA)
2. `#que-es` — Two-column: text + cacao drink image
3. `#historia` — Two-column reversed: cacao pods image + text
4. `#beneficios` — 6-card grid (3×2, collapses to 1 col on mobile)
5. `#ritual` — 6-step timeline grid (2 cols on desktop, 1 on mobile), dark green bg
6. `#experiencia` — Full-screen parallax bg with blockquote
7. `#reserva` — Contact form, cacao-brown bg, "Para conocer fechas y precios, contáctanos"
8. Footer

## Animations

Elements with class `.fade-in-up` start invisible (`opacity: 0`, `translateY(40px)`). `main.js` uses `IntersectionObserver` to add `.visible` when they enter the viewport, triggering the CSS transition. To animate a new element, add the class `fade-in-up` to it.

## Images

All images are loaded from Unsplash CDN (no local image files):
- Hero bg & Experience bg: `background-image` in CSS classes `.hero` and `.experience`
- Section images: `<img>` tags in HTML pointing to `images.unsplash.com`

To swap an image, update the `src` attribute (for `<img>`) or the `background-image` URL (in `styles.css` for `.hero` and `.experience`).

## Contact Form

The form (`#contact-form`) uses `onsubmit="handleSubmit(event)"` defined in `main.js`. Currently it simulates submission (1s delay, then clears fields and shows a success message). To connect to a real backend, replace the `setTimeout` block in `handleSubmit()` with an actual `fetch()` POST request to a form service (e.g., Formspree, EmailJS, or a custom endpoint).

## Content Customization Checklist

When the client provides real information, update:
- Brand name "Cacao Sagrado" → search and replace in `index.html` and `CLAUDE.md`
- Instagram/WhatsApp links in the footer (`href="#"`)
- Footer copyright year if needed
- Unsplash image URLs if client provides own photos
