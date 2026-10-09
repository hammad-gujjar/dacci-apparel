# SLOTS SPORTSWEAR – Complete Visual Design Audit & Specification

> **Document Status**: Single Source of Truth for Visual Design & UI System  
> **Brand Identity**: SLOTS SPORTSWEAR Luxury OEM/ODM Manufacturing  
> **Primary Surfaces**: `#EDEEE7` (Canvas Cream) & `#111111` (Obsidian Black)  
> **Typography Pair**: `BrigendsExpanded` (`font-[main]`) & `Freigeist-Light` (`font-[middle]`)  
> **Animation Framework**: GSAP 3.14.2 & ScrollTrigger  

---

## Table of Contents
1. [Section A: Color Palette & Theming System](#section-a-color-palette--theming-system)
   - [1. Primary Background Colors](#1-primary-background-colors)
   - [2. Dark Theme & Obsidian Manufacturing Sections](#2-dark-theme--obsidian-manufacturing-sections)
   - [3. Card Surface Colors & Tokens](#3-card-surface-colors--tokens)
   - [4. Border System & Hairline Dividers](#4-border-system--hairline-dividers)
   - [5. Glassmorphism & Backdrop Blur Effects](#5-glassmorphism--backdrop-blur-effects)
   - [6. Micro-Interactions & Hover States](#6-micro-interactions--hover-states)
2. [Section B: Font System & Font-Face Architecture](#section-b-font-system--font-face-architecture)
   - [1. BrigendsExpanded Architecture (`font-[main]`)](#1-brigendsexpanded-architecture-font-main)
   - [2. Freigeist-Light Architecture (`font-[middle]`)](#2-freigeist-light-architecture-font-middle)
   - [3. Heading Construction Rules](#3-heading-construction-rules)
   - [4. Body Text & Narrative Styling Rules](#4-body-text--narrative-styling-rules)
   - [5. Numerical, Tabular & Metric Counter Styling](#5-numerical-tabular--metric-counter-styling)
3. [Section C: Typography Scale & Tracking Specs](#section-c-typography-scale--tracking-specs)
   - [1. H1 Display Heading Scale](#1-h1-display-heading-scale)
   - [2. H2 & Section Heading Scale](#2-h2--section-heading-scale)
   - [3. H3 Sub-heading & Card Header Scale](#3-h3-sub-heading--card-header-scale)
   - [4. Paragraph & Body Copy Scale](#4-paragraph--body-copy-scale)
   - [5. Button & Micro-Label Typography](#5-button--micro-label-typography)
   - [6. Letter Spacing & Tracking Rules Matrix](#6-letter-spacing--tracking-rules-matrix)
4. [Section D: Layout System & Responsive Geometry](#section-d-layout-system--responsive-geometry)
   - [1. Container Widths & Viewport Constraints](#1-container-widths--viewport-constraints)
   - [2. Spacing Scale & Rhythm](#2-spacing-scale--rhythm)
   - [3. Padding Rules & Section Gutters](#3-padding-rules--section-gutters)
   - [4. Desktop Grid & Multi-Column Architecture](#4-desktop-grid--multi-column-architecture)
   - [5. Mobile Layout, Single-Column Flow & Touch Ergonomics](#5-mobile-layout-single-column-flow--touch-ergonomics)
5. [Section E: Animation System & Motion Physics](#section-e-animation-system--motion-physics)
   - [1. GSAP 3 Architecture & Scoping](#1-gsap-3-architecture--scoping)
   - [2. ScrollTrigger Scroll Dynamics & Scrub Pinning](#2-scrolltrigger-scroll-dynamics--scrub-pinning)
   - [3. Character-by-Character Heading Reveals (`Heading.tsx`)](#3-character-by-character-heading-reveals-headingtsx)
   - [4. Button Rolling Text Desktop Interaction (`TransitionButton.tsx`)](#4-button-rolling-text-desktop-interaction-transitionbuttontsx)
   - [5. Imagery, Parallax & Lightbox Transitions](#5-imagery-parallax--lightbox-transitions)
   - [6. Slow Human-Readable Counter Animations](#6-slow-human-readable-counter-animations)
6. [Section F: Component Design Standards](#section-f-component-design-standards)
   - [1. Cards (Light Frosted Glass & Dark Obsidian)](#1-cards-light-frosted-glass--dark-obsidian)
   - [2. Buttons (Pill Shapes, Arrows & Touch States)](#2-buttons-pill-shapes-arrows--touch-states)
   - [3. Navigation Bar (`Nav.tsx`) & Floating Dock Architecture](#3-navigation-bar-navtsx--floating-dock-architecture)
   - [4. Footer (`Footer.tsx`) Architecture](#4-footer-footertsx-architecture)
   - [5. Forms, Inputs, Dropzones & Select Menus](#5-forms-inputs-dropzones--select-menus)

---

## Section A: Color Palette & Theming System

### 1. Primary Background Colors
The visual identity of SLOTS SPORTSWEAR is built around a distinct, high-end editorial palette that avoids stark digital whites in favor of organic, luxury material surfaces:
- **Canvas Cream (Default Page Background)**:
  - Hex: `#EDEEE7`
  - Usage: Applied to the root `body` element in [`app/globals.css`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/globals.css) and primary public viewport surfaces.
  - Psychological Tone: Warm, tactile, reminiscent of unbleached heavy cotton canvas and architectural parchment paper.
- **Pure White Contrast**:
  - Hex: `#FFFFFF`
  - Usage: Used selectively for nested frosted glass backdrops (`bg-white/40`, `bg-white/60`, `bg-white/80`) and active pill markers.

### 2. Dark Theme & Obsidian Manufacturing Sections
To communicate industrial capability, engineering precision, and high-tech textile fabrication, major sections utilize deep obsidian surfaces:
- **Obsidian Black (Core Dark Tone)**:
  - Hex: `#111111`
  - Usage:
    - Dedicated manufacturing blocks (Seven Stages of Precision Craftsmanship in `/manufacturing-process`).
    - B2B Tech Pack promotional banners on the Catalog page (`/shop`).
    - High-impact CTA closing blocks.
    - Global site footer (`app/components/Footer.tsx`).
    - Button surfaces and icon backgrounds.
- **Deep Charcoal Card Surface**:
  - Hex: `#181818` / `rgba(24, 24, 24, 0.9)`
  - Usage: Elevated cards inside dark obsidian sections (`bg-[#181818]/90`), providing subtle contrast against `#111111`.

### 3. Card Surface Colors & Tokens
Card components are rendered in two primary material treatments:
1. **Light Surface Cards (on `#EDEEE7` background)**:
   - Background: `bg-white/40` or `bg-white/50`
   - Backdrop Filter: `backdrop-blur-sm`
   - Border: `border border-neutral-900/10`
   - Hover Border: `hover:border-neutral-900/25`
   - Shadow: `shadow-sm hover:shadow-md`
2. **Dark Surface Cards (on `#111111` background)**:
   - Background: `bg-[#181818]/90` or `bg-white/[0.03]`
   - Backdrop Filter: `backdrop-blur-sm`
   - Border: `border border-white/10`
   - Hover Border: `hover:border-white/25`
   - Shadow: `shadow-xl`

### 4. Border System & Hairline Dividers
All borders strictly emulate luxury horology and architectural drawings—thin, deliberate, and low-opacity:
- **Subtle Light Divider**: `bg-black/10` or `bg-neutral-900/10` (used for stats dividers and card separators on cream surfaces).
- **Subtle Dark Divider**: `bg-white/10` or `border-white/10` (used inside dark obsidian containers).
- **Grid Accent Lines**: `border-black/5` or `border-white/5`.
- **Card Radius**:
  - Standard cards: `rounded-2xl` (`16px`) or `rounded-3xl` (`24px`).
  - Container wraps: `rounded-[28px]` or `rounded-[32px]`.
  - Buttons and badges: `rounded-full` (`9999px`).

### 5. Glassmorphism & Backdrop Blur Effects
- **Floating Header**: `bg-[#EDEEE7]/80 backdrop-blur-md border border-black/10 rounded-full shadow-lg`.
- **Search Modal Drawer**: `bg-[#111111]/95 backdrop-blur-xl text-white`.
- **macOS Toast Notifications**: `bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl`.

### 6. Micro-Interactions & Hover States
- **Card Elevations**: Gentle vertical translation (`-translate-y-1.5`) paired with border darkening (`hover:border-neutral-900/30` or `hover:border-white/30`).
- **Tactile Button Press**: Mobile and desktop active state `active:scale-[0.97]` transition `duration-150`.
- **Icon Hover Transitions**: Arrow icons within buttons shift 45 degrees or 4px horizontally (`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300`).

---

## Section B: Font System & Font-Face Architecture

### 1. BrigendsExpanded Architecture (`font-[main]`)
- **Font File**: `/fonts/BrigendsExpanded-nReK1.otf`
- **Format**: OpenType (`format('opentype')`)
- **Font Display**: `swap`
- **CSS Family Declaration (Composite Font System)**:
  ```css
  /* Restored: Original BrigendsExpanded for primary headings */
  @font-face {
    font-family: 'main';
    src: url('/fonts/BrigendsExpanded-nReK1.otf') format('opentype');
    font-display: swap;
  }
  ```
- **Application**: Headings (`h1`, `h2`), hero titles, primary brand statements, product titles, and modal headers.
- **Characteristics**: Geometric, ultra-wide expanded uppercase typography. Imparts authority, power, and high-end automotive/athletic brand positioning.
- **Strict Preservation Rule**: The original font asset natively contains unconventional numeral and symbol glyphs. Per explicit stakeholder directive, no CSS `unicode-range` fallbacks or React component character replacements (`FormattedTitle.tsx`) are permitted. `BrigendsExpanded` must be rendered in its pure, unaltered form globally to prevent weight distortion on standard alphabet characters.

### 2. Freigeist-Light Architecture (`font-[middle]`)
- **Font File**: `/fonts/Freigeist-Light.woff2`
- **Format**: WOFF2 (`format('woff2')`)
- **Font Display**: `swap`
- **CSS Family Declaration**:
  ```css
  @font-face {
    font-family: 'middle';
    src: url('/fonts/Freigeist-Light.woff2') format('woff2');
    font-display: swap;
  }
  ```
- **Application**: Body paragraphs, descriptions, technical specification lists, numeric statistics counters, button labels, and metadata tags.
- **Characteristics**: Clean, geometric neo-grotesque with refined optical kerning and light stroke weight. Provides exceptional legibility when paired with expanded display headings.

### 3. Heading Construction Rules
1. **Uppercase Enforced**: All `font-[main]` titles must be uppercase (`uppercase`).
2. **Tight Tracking**: Must use `tracking-tight` or `tracking-tighter` to compensate for wide letter geometry.
3. **Leading (Line-Height)**: Keep tight (`leading-[0.9]`, `leading-[0.95]`, or `leading-none`) so multi-line headlines form dense typographic posters.
4. **Color Harmony**: `#111111` on `#EDEEE7` cream surfaces; `#FFFFFF` on `#111111` dark obsidian surfaces.

### 4. Body Text & Narrative Styling Rules
1. **Font Consistency**: Must strictly use `font-[middle]` (`Freigeist-Light`). Never use system sans-serif or default Inter/Roboto.
2. **Readability & Tracking**: Set to `leading-relaxed` (`1.6`–`1.75`) with subtle positive tracking (`tracking-wide` or `tracking-[0.02em]`).
3. **Contrast**: Text on light surfaces must be `text-neutral-600` (secondary) or `text-neutral-800` / `#111111` (primary). Text on dark surfaces must be `#EDEEE7` or `text-neutral-400`.

### 5. Numerical, Tabular & Metric Counter Styling
1. **Font Family**: Numbers in statistical displays must use `Freigeist-Light` (`font-[middle]` or `!font-[middle]`).
2. **Tabular Numerals**: Enforce `tabular-nums` so numbers do not shift horizontally during counter interpolation.
3. **Size Ratio**: Large display numbers (`text-4xl sm:text-5xl md:text-6xl`) anchored by a fixed container height (`min-h-[60px]`) to eliminate layout jump.

### 6. Dynamic splitText Character Masking Pattern
To achieve character-level staggered reveals without layout jitter:
```tsx
const splitText = (text: string, charClass = 'stat-char') =>
    text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-flex overflow-hidden">
            {word.split('').map((char, ci) => (
                <span key={ci} className={`${charClass} inline-block translate-y-full`}>
                    {char}
                </span>
            ))}
        </span>
    ));
```
- Each word is held in an `inline-flex overflow-hidden` wrapper.
- Characters start masked at `translate-y-full` and animate to `y: '0%'` via GSAP ScrollTrigger (`duration: 0.35s`, `stagger: 0.012s`, `ease: 'power2.out'`).

---

## Section C: Typography Scale & Tracking Specs

### 1. H1 Display Heading Scale
- **Desktop (>= 1024px)**: `text-6xl` to `text-8xl` (`3.75rem`–`6rem` / `60px`–`96px`), `leading-[0.92]`, `tracking-tighter`.
- **Tablet (768px - 1023px)**: `text-5xl` to `text-6xl` (`3rem`–`3.75rem` / `48px`–`60px`), `leading-[0.95]`.
- **Mobile (< 768px)**: `text-3xl` to `text-4xl` (`1.875rem`–`2.25rem` / `30px`–`36px`), `leading-tight`.

### 2. H2 & Section Heading Scale
- **Desktop (>= 1024px)**: `text-3xl` to `text-5xl` (`1.875rem`–`3rem` / `30px`–`48px`), `leading-tight`, `tracking-tight`.
- **Mobile (< 768px)**: `text-2xl` to `text-3xl` (`1.5rem`–`1.875rem` / `24px`–`30px`).

### 3. H3 Sub-heading & Card Header Scale
- **Desktop (>= 1024px)**: `text-xl` to `text-2xl` (`1.25rem`–`1.5rem` / `20px`–`24px`), `leading-snug`.
- **Mobile (< 768px)**: `text-lg` to `text-xl` (`1.125rem`–`1.25rem` / `18px`–`20px`).

### 4. Paragraph & Body Copy Scale
- **Lead Narrative Copy**: `text-base sm:text-lg md:text-xl` (`16px`–`20px`), `leading-relaxed`.
- **Standard Body**: `text-sm sm:text-base` (`14px`–`16px`), `leading-relaxed`.
- **Technical Specs / Micro-Text**: `text-xs sm:text-sm` (`12px`–`14px`), `leading-normal`.

### 5. Button & Micro-Label Typography
- **Primary Action Buttons**: `text-xs sm:text-sm`, `font-semibold`, `uppercase`, `tracking-wider` (`0.05em`).
- **B2B Badges & Metric Pill Tags**: `text-[10px] sm:text-xs`, `font-bold`, `uppercase`, `tracking-[0.2em]` to `tracking-[0.4em]`.

### 6. Letter Spacing & Tracking Rules Matrix

| Role | Font Family | Size Range | Tailwind Class | Letter Spacing Value |
| :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `font-[main]` | 48px – 96px | `tracking-tighter` | `-0.04em` |
| **Section H2** | `font-[main]` | 30px – 48px | `tracking-tight` | `-0.025em` |
| **Card H3** | `font-[main]` | 20px – 24px | `tracking-tight` | `-0.015em` |
| **B2B Stage Title** | `font-[main]` | 20px – 28px | `tracking-tight` | `-0.02em` |
| **Stat Numbers** | `font-[middle]` | 40px – 64px | `tabular-nums` | `0em` |
| **Stat Subtitle** | `font-[middle]` | 12px – 14px | `tracking-wider` | `+0.05em` |
| **Body Paragraph** | `font-[middle]` | 14px – 16px | `tracking-normal` | `+0.01em` |
| **Button Text** | `font-[middle]` | 12px – 14px | `tracking-wider` | `+0.05em` |
| **Category Pill** | `font-[middle]` | 10px – 12px | `tracking-[0.25em]`| `+0.25em` |

---

## Section D: Layout System & Responsive Geometry

### 1. Container Widths & Viewport Constraints
- **Primary Content Container**: `max-w-7xl` (`1280px` max boundary), centered with `mx-auto`.
- **Editorial / Narrative Container**: `max-w-5xl` (`1024px`) or `max-w-4xl` (`896px`) for readable line lengths in About and Story pages.
- **Narrow Forms & Auth**: `max-w-md` (`448px`) or `max-w-lg` (`512px`).
- **Full-Bleed Media Reels**: `w-full` with inner constrained padding (`px-5 md:px-10 lg:px-16`).

### 2. Spacing Scale & Rhythm
- **Micro-Gaps (chips, badges, buttons)**: `gap-2` (`8px`) or `gap-3` (`12px`).
- **Component Inner Spacing**: `p-4 sm:p-6 md:p-8`.
- **Grid Gaps**: `gap-4 sm:gap-6 lg:gap-8`.
- **Section Stack Margin**: `space-y-12 sm:space-y-16 lg:space-y-24`.

### 3. Padding Rules & Section Gutters
- **Section Vertical Padding**:
  - Hero sections: `pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24`.
  - Standard content sections: `py-16 sm:py-24 md:py-32`.
  - Dark container blocks: `p-6 sm:p-10 md:p-16 lg:p-20`.
- **Horizontal Screen Gutters**:
  - Mobile (< 640px): `px-4 sm:px-6`.
  - Tablet (640px – 1024px): `px-6 md:px-10`.
  - Desktop (> 1024px): `px-8 lg:px-12 xl:px-16`.

### 4. Desktop Grid & Multi-Column Architecture
- **Catalog Grid**: 3 columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`).
- **Credibility Stats Grid**: 4 equal columns (`grid-cols-1 md:grid-cols-4 gap-6`).
- **Manufacturing Timeline**: Alternating 2-column layout with center spine line.
  - Left column: Text card (Odd stages) / Image card (Even stages).
  - Center: SVG line and circular numbered milestone nodes.
  - Right column: Image card (Odd stages) / Text card (Even stages).
  - **Height Synchronization**: `items-stretch` with matching `min-h-[460px]`.

### 5. Mobile Layout, Single-Column Flow & Touch Ergonomics
- **Single-Column Fallback**: All multi-column grids gracefully degrade to `grid-cols-1` on screens under 768px.
- **Timeline Card Reordering**: On mobile viewports, text detail cards always render **above** image cards to maintain narrative clarity before visual inspection.
- **Touch Target Sizing**: All interactive buttons, menu toggles, and form inputs provide minimum touch bounding boxes of `44px × 44px`.
- **Sticky Actions**: Mobile product pages feature bottom-anchored or high-contrast sticky RFQ triggers.

---

## Section E: Animation System & Motion Physics

### 1. GSAP 3 Architecture & Scoping
- **Core Engine**: GreenSock Animation Platform (`gsap@^3.14.2`) with `@gsap/react@^2.1.2`.
- **Component Lifecycle Scoping**: All GSAP timelines must be scoped using `useGSAP` or clean `gsap.context()` wrappers tied to container DOM references to prevent memory leaks and React 19 strict-mode duplication:
  ```typescript
  useGSAP(() => {
    // animations registered here
  }, { scope: containerRef, dependencies: [dependencies] });
  ```

### 2. ScrollTrigger Scroll Dynamics & Scrub Pinning
- **Plugin Registration**: `gsap.registerPlugin(ScrollTrigger);`
- **Pinned Workflow Reel (`HowItWorks.tsx`)**:
  - Desktop: Horizontal scroll transform pinned over `250%` viewport distance (`pin: true`, `scrub: 1`).
  - Mobile: Smooth vertical card progression.
- **Pinned Capabilities Reel (`OurServices.tsx`)**: Split-screen pinning with right-hand visual transformation driven by scroll triggers.

### 3. Character-by-Character Heading Reveals (`Heading.tsx`)
- **Mechanism**: Splits headline strings into discrete character/word spans.
- **Motion Values**:
  - Initial State: `opacity: 0`, `y: 40`, `rotateX: -20deg`.
  - Target State: `opacity: 1`, `y: 0`, `rotateX: 0deg`.
  - Stagger: `0.02s` to `0.04s` per glyph.
  - Easing: `power3.out`.

### 4. Button Rolling Text Desktop Interaction (`TransitionButton.tsx`)
- **Desktop Hover**: On pointer enter, text rolls vertically out of view while a duplicated duplicate string rolls in from beneath (`yPercent: -100` translation).
- **Mobile Graceful Handling**: On touch devices, rolling animation is suppressed in favor of instant tactile scale feedback (`active:scale-[0.97]`).
- **Whitespace Protection**: Button labels apply `whitespace-nowrap inline-flex items-center shrink-0` to guarantee text and iconography never wrap across two lines.

### 5. Imagery, Parallax & Lightbox Transitions
- **Image Reveal**: Initial subtle scale (`scale: 1.08`) settling to `1.0` with `opacity: 1` over `1.2s` (`power2.out`).
- **Hover Zoom**: Card image wraps feature `overflow-hidden`, zooming `scale-105` on container hover over `500ms ease-out`.
- **Fullscreen Lightbox (`GalleryMarquee.tsx`)**: Smooth modal expansion with backdrop opacity reveal and draggable high-resolution product inspection.

### 6. Slow Human-Readable Counter Animations
To replace jarring fast counter blurs with a calm, high-end luxury feel, statistical counters are animated at deliberate, readable paces:
- **`5000+` Monthly Capacity**:
  - Duration: **3.5 seconds**.
  - Easing: `power1.out` (smooth deceleration so numbers can be tracked by human eyes).
  - Interpolation: `0` to `5000` + appended `+`.
- **`50` Minimum Order Quantity**:
  - Duration: **2.5 seconds**.
  - Easing: `power1.out`.
  - Interpolation: `0` to `50`.
- **`7-14` Days Sample Turnaround**:
  - Duration: **2.5 seconds**.
  - Easing: `power1.out`.
  - Interpolation: `1-1` to `7-14`.
- **`Worldwide` Logistics**:
  - Duration: **2.5 seconds**.
  - Motion: Vertical reveal (`y: 20` to `0`) and opacity fade (`0` to `1`).

### 7. Alternating Timeline Staggered Slide Reveals
Applied to the 7 stages of manufacturing in [`ManufacturingProcessClient.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/manufacturing-process/ManufacturingProcessClient.tsx):
- **Left Cards (Odd stages)**: Slide from `x: -80`, `opacity: 0` to `x: 0`, `opacity: 1`.
- **Right Cards (Even stages)**: Slide from `x: 80`, `opacity: 0` to `x: 0`, `opacity: 1`.
- **Duration & Easing**: `1.0s`, `power3.out`.
- **Stagger**: `0.15s` offset between card pairs.
- **Trigger**: `start: "top 80%"`, `once: true`.

---

## Section F: Component Design Standards

### 1. Cards (Light Frosted Glass & Dark Obsidian)
1. **Light Frosted Glass Card (`bg-white/40`)**:
   ```html
   <div className="bg-white/40 border border-neutral-900/10 backdrop-blur-sm p-6 sm:p-8 rounded-3xl hover:border-neutral-900/25 transition-all duration-300 shadow-sm">
     ...
   </div>
   ```
2. **Dark Obsidian Card (`bg-[#181818]/90`)**:
   ```html
   <div className="bg-[#181818]/90 border border-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-3xl hover:border-white/25 transition-all duration-300 shadow-xl">
     ...
   </div>
   ```
3. **Equal-Height Architecture**: When cards are paired in grid rows (e.g., timeline detail and image boxes), parents must apply `items-stretch` and cards must use `h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-between`.

### 2. Buttons (Pill Shapes, Arrows & Touch States)
1. **Dark Primary Pill (`bg-[#111111] text-[#EDEEE7]`)**:
   - Class: `rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#111111] text-[#EDEEE7] hover:bg-neutral-900 active:scale-[0.97] transition-all duration-200`.
2. **Light Secondary Pill (`bg-white text-[#111111] border border-neutral-900/10`)**:
   - Class: `rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-white text-[#111111] hover:bg-neutral-50 active:scale-[0.97] border border-neutral-900/10 transition-all duration-200`.
3. **Pill Icon Arrow**: Circular nested container with `w-6 h-6 rounded-full bg-white text-black flex items-center justify-center ml-2 transition-transform duration-300 group-hover:translate-x-1`.

### 3. Navigation Bar (`Nav.tsx`) & Floating Dock Architecture
- **Floating Island**: Docked at top of viewport with `fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-7xl mx-auto`.
- **Surface**: `bg-[#EDEEE7]/80 backdrop-blur-md border border-black/10 rounded-full px-6 py-3 shadow-lg flex items-center justify-between`.
- **Logo Sizing Rules**:
  - **Desktop (>= 768px)**: `md:h-[9vh]`, width auto, perfectly centered.
  - **Mobile (< 768px)**: `h-[7vh]`, width auto.
  - **Isolation**: Wrapped in dedicated list item without button styling interference.
- **Search & Bag Toggles**: Minimalist SVG icons with badge counters.
- **Mobile Menu Drawer**: Fullscreen slide-over panel in obsidian `#111111` with staggered menu link reveals.

### 4. Footer (`Footer.tsx`) Architecture
- **Surface**: Full-bleed `#111111` background, `#EDEEE7` text.
- **Grid Hierarchy**:
  - Column 1: Brand Wordmark, OEM/ODM Mission Statement, Pakistan manufacturing origin disclosure.
  - Column 2: Navigation Links (Manufacturing Process, Catalog, About, Contact).
  - Column 3: B2B Services (Custom Teamwear, Private Label, Fabric Sourcing, AQL 2.5 QC).
  - Column 4: Factory Inquiries, WhatsApp direct trigger, Email, and Newsletter signup.
- **Sub-Footer**: Hairline border (`border-white/10`), copyright notice, and legal links (Privacy, Terms, Shipping, Refund policies).

### 5. Forms, Inputs, Dropzones & Select Menus
- **Text Inputs & Textareas**:
  - Surface: `bg-white/60 dark:bg-white/[0.05]`
  - Border: `border border-neutral-900/15 dark:border-white/15 focus:border-[#111111] dark:focus:border-white`
  - Radius: `rounded-2xl`
  - Typography: `font-[middle] text-sm sm:text-base`
  - Focus Ring: `outline-none ring-2 ring-neutral-900/10 dark:ring-white/10`
- **Custom Multi-Select Checkbox Pills**:
  - Pill button that toggles active state (`bg-[#111111] text-white` when selected vs. `bg-white/40 text-neutral-800` when inactive).
- **Date Picker**: Integrated `@mui/x-date-pickers` styled to match the dark/light palette seamlessly.
- **File Upload Dropzone**: Dashed border (`border-2 border-dashed border-neutral-900/20`), drag-and-drop support for PDF, AI, ZIP, and PNG tech pack files.


## Admin Dashboard (Phase 22)
- **Theme Alignment**: Removed generic Tailwind gradients (green-50, purple-50, etc.). Standardized around the premium SLOTS SPORTSWEAR palette: Cream (\#EDEEE7\) and Obsidian (\#111111\).
- **Typography**: Replaced generic text-gray classes with \ont-[main]\ for headers, \ont-[AeonikBold]\ for numbers, and \ont-[middle]\ for body text/labels, matching the public storefront.
- **Sidebar**: Converted active/hover states to subtle monochrome overlays (\g-[#111111]/5\).
- **Status**: Verified clear, readable, and responsive B2B administrator interface.


## Admin Layout Exclusivity (Phase 22.1)
- **Sidebar**: Corrected the header title scale to \	ext-[14px]\ to safely accommodate the ultra-wide BrigendsExpanded font inside a fixed-width container.
- **Footer**: Migrated to \ConditionalFooter\ to prevent the massive public-facing footer from polluting the compact B2B Admin Dashboard layout.
- **Topbar**: UserDropdown properly styled with a circular placeholder avatar rather than bare text.
