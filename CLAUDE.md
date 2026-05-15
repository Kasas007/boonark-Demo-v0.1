# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Boonark** is a Thai restaurant and cooking-course website (demo v0.1). The UI is in Thai; dates are displayed in Buddhist Era (พ.ศ. = CE + 543). The color scheme is dark backgrounds with gold (`#ffc107`) as the primary accent.

Design references:
- Site map: https://www.gloomaps.com/AitfmzkwZH
- Figma: https://www.figma.com/design/BmNdhtUPdjn1emrrYq03uN/

## Running Locally

No build tools or package manager. Open any HTML file in a browser, or serve from the project root with any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/Index.html
```

Files must be served (not opened as `file://`) for the `<video>` sources and absolute asset paths (e.g. `/video/`, `/images/`) to load correctly.

## Architecture

### File layout

| File | Role |
|---|---|
| `Index.html` | Home — hero video + featured menu carousel |
| `menu.html` | Full menu page |
| `booking.html` | Booking page — course calendar |
| `calendar.html` | Schedule page (stub) |
| `checkticket.html` | Coupon check page (stub) |
| `aboutme.html` | About page |
| `styles.css` | **Single shared stylesheet** for all pages |
| `script.js` | **Single shared JS file** for all pages |
| `video/` | MP4 background videos |
| `images/` | Menu and section images |

### script.js — conditional page guards

All JavaScript for every page lives in the single `script.js`. Features are activated only on the page that needs them using `getElementById` guards at the top of each block:

```js
if (document.getElementById('nextBtn')) { /* menu carousel */ }
if (document.getElementById('calendarGrid')) { /* booking calendar */ }
```

**Web Components** (`<nav-bar>` and `<site-footer>`) are defined at the bottom of `script.js` and are automatically used by every HTML page. To change the navbar links or footer content, edit the `connectedCallback` HTML strings in those class definitions.

### Course data

The monthly course schedule is a plain JS object in `script.js` inside the `calendarGrid` guard block:

```js
const courses = {
    '2026-05-10': [{ name: '...', time: '09:00–14:00', slots: 6, color: '#28a745', textColor: '#fff' }],
    // YYYY-MM-DD keys, one entry per course day
};
```

Add, remove, or edit entries here to update which days appear as course days on the booking calendar.

### Adding a new page

1. Copy the shell from any stub page (`calendar.html` or `checkticket.html`).
2. Place page-specific CSS at the end of `styles.css`.
3. Add a guarded block in `script.js` using a unique element ID as the guard.
4. Add the nav link inside the `NavBar` component's `connectedCallback` in `script.js`.
