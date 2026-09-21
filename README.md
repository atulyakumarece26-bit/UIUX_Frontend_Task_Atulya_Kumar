# DroneTV — UI/UX Redesign Concept (Frontend Build)

A modern, responsive redesign concept for **DroneTV** (reference: www.dronetv.in), built as a
practical test assignment for the UI/UX Designer & Frontend Developer Internship.

This is an original design concept — not a copy of the existing DroneTV website — while keeping
the brand's business context: drone media, pilot training and aerial services.

## Project description

Five fully responsive pages built with hand-written HTML, CSS and vanilla JavaScript:

| Page | File | Highlights |
|---|---|---|
| Home / Landing | `index.html` | Hero + CTA, services, courses, stats, featured media, process, final CTA, footer |
| Services | `services.html` | Filterable service catalogue, delivery standard section, CTA band |
| Courses / Training | `courses.html` | Stats, level filters, course cards, learning path, enrolment CTA |
| Login | `login.html` | Split auth layout, inline validation, password visibility toggle, social options |
| Dashboard | `dashboard.html` | Sidebar navigation, KPI cards, progress bars, mission table, media library, settings |

## Technologies used

- **HTML5** — semantic landmarks (`header`, `nav`, `main`, `section`, `aside`, `footer`), captions, ARIA attributes
- **CSS3** — custom properties design system, Flexbox, CSS Grid, `clamp()` fluid type, transitions, `prefers-reduced-motion`
- **JavaScript (ES5-safe, no framework)** — mobile menu, sticky header, scroll reveal, animated counters, card filtering, form validation, dashboard tabs, toast notifications
- **Google Fonts** — Space Grotesk (display) + DM Sans (body)

No React, Angular, Vue, jQuery or any other framework/library is used. No build step required.

## Design system

Everything is tokenised in `css/styles.css` under `:root`:

- **Colour** — ink `#0a1018`, surface `#101a24`, signal orange `#ff7a1a`, horizon teal `#23d3c4`
- **Type scale** — fluid `clamp()` sizes from `--fs-xs` to `--fs-hero`
- **Spacing** — 8-point scale `--s-1` … `--s-7`
- **Radius, shadows, easing** — single source of truth, reused by all components

Reusable components: buttons (`.btn` + modifiers), cards, course cards, filter pills, stats,
form fields, badges, progress bars, CTA band, header and footer.

## How to run the project

No dependencies or build tools are needed.

1. **Simplest:** open `index.html` in any modern browser.
2. **With a local server** (recommended, avoids browser file restrictions):

   ```bash
   # Python 3
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

   ```bash
   # or Node
   npx serve .
   ```

## File structure

```
03_Source_Files/
├── index.html          # Home / landing page
├── services.html       # Services page
├── courses.html        # Courses / training page
├── login.html          # Login page
├── dashboard.html      # User dashboard
├── css/
│   └── styles.css      # Design system + all components
├── js/
│   └── main.js         # All interactions
└── assets/             # Images
    ├── hero.jpg
    ├── pilot.jpg
    └── survey.jpg
```

## Responsive behaviour

Breakpoints at **1024px** (laptop/tablet), **900px** (tablet — mobile menu activates) and
**620px** (mobile). Checked for text overflow, element overlap, horizontal scrolling,
image scaling and tap-target accessibility at 1440, 1024, 768 and 375 px widths.

## Accessibility

- Skip-to-content link and visible focus rings
- `aria-current`, `aria-expanded`, `aria-pressed`, `aria-invalid` on interactive elements
- Form errors announced via `role="alert"`; toast uses `aria-live="polite"`
- Descriptive `alt` text on all images; keyboard-operable menu (Escape closes)
- Motion reduced automatically for `prefers-reduced-motion` users

## Screenshots

See the [Screenshots]'(https://drive.google.com/drive/folders/1NQrBJG0nWKYzskp2aFB-HnvFJh6-F8l0?usp=drive_link) folder of the submission (desktop and mobile captures).

## Figma link
figma link: [Figma](https://www.figma.com/make/Jwf2KepPUvPhL1uVzUZDex/Design-Interface?t=nlPsBfK9k6hs6fEQ-20&fullscreen=1)` —  Figma prototype URL .

## Live demo link

 deployed URL:  "[Github](https://github.com/atulyakumarece26-bit/UIUX_Frontend_Task_Atulya_Kumar)"  here  published.
