# Copilot Instructions for Akhilesh Portfolio

## Project Overview

This is a personal portfolio website for Akhilesh M. Bhandakkar (CTO at ZINTECH). It's a **static single-page application** with HTML, CSS, and Vanilla JavaScript featuring:
- Smooth scrolling navigation
- Dark/light theme toggle
- Scroll-triggered animations
- Contact form (client-side validation only)
- Six featured project showcases
- Skills section with animated progress bars

**Stack**: HTML5 + CSS3 + Vanilla JavaScript (no build tools, no frameworks)

## Architecture & Key Patterns

### Structure
- **index.html**: Semantic HTML sections (hero, about, skills, projects, services, contact, footer) using `.container` wrapper for responsive layout
- **style.css**: CSS variables for theming (2052 lines) with dark/light mode support via `data-theme="light"` attribute on `<body>`
- **script.js**: Event-driven Vanilla JS (276 lines) managing interactions

### Data Attributes & State Management
- **Skill progress**: `.skill-progress[data-progress="70"]` — dynamically set width on scroll
- **Counter targets**: `.stat-number[data-target="10"]` — animate to target number on element visibility
- **Animation delays**: Stagger animations via `style.animationDelay` on card elements (index × 0.1s)
- **Theme state**: In-memory `currentTheme` variable (no localStorage, defaults to dark)

### Key JavaScript Patterns

1. **Intersection Observer** for scroll-triggered animations:
   - `.project-card`, `.service-card`, `.blog-card` get `.animate` class
   - Counter and skill animations fire once per page load
   - Threshold: 0.2, margin offset: -100px

2. **Smooth Scroll & Offset**:
   - All anchor links use `#section-id` navigation
   - Navbar offset: -80px for smooth scroll (accounts for fixed navbar height)
   - Hero parallax: `translateY(scrolled × 0.3)` for content, `0.2` for image

3. **Theme Toggle**: 
   - Button changes icon (moon → sun)
   - Updates CSS via `body.setAttribute('data-theme', 'light')` or `removeAttribute`
   - No persistence between sessions

4. **Form Validation** (contact form):
   - Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Shows `.form-message.error` or `.form-message.success`
   - Simulated 2-second submission delay

## CSS Architecture

### Color System
- **CSS Variables** for colors, typography, and spacing
- **Light mode defaults**: Cream backgrounds, slate text
- **Dark mode overrides**: Applied via `[data-theme="light"]` media query pattern
- **Semantic tokens**: `--color-primary` (teal), `--color-secondary` (brown), accent colors

### Responsive Design
- Single `.container` wrapper with max-width and auto margins
- Hamburger menu (hidden on desktop) via `.hamburger.active` → `.nav-menu.active`
- **No media queries visible in first 100 lines** — check around line 1500+ for breakpoints

### Animation Approach
- CSS transitions for smooth state changes (0.3s default)
- SVG data URIs for select caretes (light/dark versions)
- Particle animation in hero section (pure CSS animation)
- Stagger via JavaScript-injected `animation-delay`

## Common Development Tasks

### Adding a New Project Card
1. Copy a `.project-card` block in `<section id="projects">`
2. Update image URL, title, description, tech badges
3. JavaScript auto-detects and applies stagger delay (index × 0.1s)
4. Intersection Observer auto-adds `.animate` class on scroll

### Adding a New Skill
1. Add `.skill-item` inside appropriate `.skill-category` div
2. Set `data-progress="X"` on `.skill-progress` element
3. JavaScript reads this on scroll and animates width expansion

### Adjusting Colors
- Edit CSS variables in `:root` (lines 1-80 of style.css)
- Semantic tokens (e.g., `--color-primary`) cascade throughout
- Update both regular and RGB versions for opacity support
- Dark mode overrides are applied dynamically

### Updating Contact Form
- Form IDs: `name`, `email`, `subject`, `message` in index.html
- Validation logic: lines 183-223 in script.js
- Simulated submission removes `.loading` class and shows success message

## File Organization

```
akhilesh-portfolio/
├── index.html          (665 lines, semantic sections)
├── style.css           (2052 lines, variables, responsive design)
├── script.js           (276 lines, event handlers, animations)
├── assest/             (typo: should be "assets/")
│   └── img/
│       ├── logo.png
│       ├── logo.svg
│       └── 1.jpg, 2.jpg (profile images)
└── .github/
    └── copilot-instructions.md (this file)
```

## Important Notes

- **No build process**: Direct HTML/CSS/JS in browser (no transpilation)
- **Asset typo**: Directory is `assest/` not `assets/` — preserve this in imports
- **External dependencies**: Font Awesome 6.4.0 (CDN), Google Fonts, Unsplash images for projects
- **Email not functional**: Contact form is demo-only (client-side validation, no backend)
- **localStorage not used**: Theme resets on page reload
- **Commented code**: Blog section, some skills (Express, Django, PostgreSQL) are commented — preserve comments

## Code Style

- **Naming**: kebab-case for CSS classes, camelCase for JavaScript variables
- **Comments**: Minimal but present for major sections
- **Indentation**: 4 spaces (CSS), no tabs
- **Semicolons**: Present in JavaScript, maintain consistency
- **Selectors**: Prefer class selectors (`.class`), minimal IDs (used for form/sections only)
