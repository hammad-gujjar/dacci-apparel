# SLOTS SPORTSWEAR – Project Memory

## 0. Complete Project Documentation System (Single Source of Truth)
The project documentation system is organized into specialized, authoritative documents in [`docs/`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/):
- 🔍 [**Complete Website Audit & Synchronization Report**](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/complete-website-audit-report.md): Full comprehensive audit report comparing live code, components, routes, database, APIs, and documentation as of September 20, 2026.
- 📋 [**Project Requirements Document (PRD)**](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/project-requirements-document.md): Complete business purpose, OEM/ODM transformation, targeted client personas, feature sets, and operational business rules (MOQ 50 pcs, 7–14 days prototyping, AQL 2.5 QC).
- 🎨 [**Design Full Audit & Style Guide**](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/design-full-audit.md): Complete visual design specification, color palette (`#EDEEE7`, `#111111`, `#181818`), font system (`font-[main]` for `BrigendsExpanded`, `font-[middle]` for `Freigeist-Light`), typography scale, layout containers (`max-w-7xl`), GSAP motion dynamics, and component primitives.
- 🏗️ [**Technical Architecture Documentation**](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/architecture.md): Full system flows, App Router directory hierarchy, tech stack (Next.js 16, React 19, TypeScript, Tailwind v4, MongoDB, Better Auth, Cloudinary, GSAP), dual-database isolation strategy, and data lifecycle.
- 🛡️ [**AI Development Boundaries & Engineering Rules**](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/rules.md): Mandatory developer and AI operating boundaries, pre-change inspection protocol, design consistency enforcement, performance rules, asset preservation, and error handling standards.
- 🗺️ [**Project Development Roadmap & Phases**](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/phases.md): Chronological history of completed implementation phases (Phases 1–6) and future strategic growth initiatives (Phases 7–12).

---

## 0.1. Comprehensive Website Audit & Synchronization (September 20, 2026)
- **Audit Date**: September 20, 2026
- **Audit Scope**: Complete cross-verification of codebase, routes, models, components, APIs, and documentation.
- **Key Discovered Route Alignments**:
  1. *Authentication Routes*: Actual directory paths are `/auth/signin`, `/auth/signup`, `/auth/forget-password`, and `/auth/verifyemail` (without interior hyphens).
  2. *Contact Submission API*: Dedicated endpoint is mounted at `/api/contact/submit` (POST), safely committing to `TechPack` collection and alerting factory via Nodemailer Google SMTP.
  3. *Media Creation API*: Internal endpoint mounted at `/api/media/creat/route.ts` (`creat` folder name).
- **TypeScript Verification**: `npx tsc --noEmit` executed with code 0 (zero compilation errors).
- **Completed Audit Summary**: Full audit report cataloged in [`docs/complete-website-audit-report.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/complete-website-audit-report.md).

---

## 1. Project Overview
- **Brand & Business Entity**: SLOTS SPORTSWEAR (in local repository source and package manifests referred to historically as `dacciapparel` / "DACCI APPAREL").
- **Core Business Model**: High-performance custom sportswear, fitness apparel, and activewear manufacturer specializing in Original Equipment Manufacturing (OEM) and Original Design Manufacturing (ODM). The platform serves primarily as a digital catalog, brand showcase, and customized **B2B Tech Pack inquiry and sampling portal** for emerging athletic brands, sports teams, gym wear startups, and global wholesalers.
- **Production Hub & Origin**: Rooted in Punjab, Pakistan (historically originating in Lahore in 2018; operational contact numbers and WhatsApp point to Pakistan country code `+92`).
- **Primary Domain & Production Deployments**:
  - Configured Canonical URL / `metadataBase`: `https://slotssportswear.vercel.app`
  - Live Reference Staging / Vercel Deployment: `https://slotssportswear.vercel.app`
- **Core Value Propositions**:
  - **Low Minimum Order Quantities (MOQ)**: Starting at 50 pieces per style to enable independent and emerging brands to launch without massive capital expenditure.
  - **Rapid Sample Turnaround**: 7 to 14 business days from Tech Pack submission and approval to physical prototype.
  - **End-to-End Customization**: Custom pattern development, fabric sourcing, moisture-wicking and technical knits, sublimation printing, precision embroidery, screen printing, custom woven labels, hangtags, and bespoke packaging.
  - **Worldwide Express Logistics**: International air courier shipments via DHL and FedEx (5–10 business days delivery window) and sea freight for high-volume bulk runs (20–35 days).
  - **High Production Capacity**: 50,000+ units per month production capability with strict AQL 2.5 quality control standards.
- **Current Operational Reality**: While the UI is styled with luxury minimalist e-commerce aesthetics, the website functions as a premier B2B OEM/ODM sportswear manufacturing specification catalog and Tech Pack inquiry portal. All retail shopping elements (retail pricing, sale prices, discount badges, "Add to Cart/Wardrobe", retail exchange badges) have been eliminated. Product detail pages feature dynamic manufacturing categories, B2B spec highlights (MOQ 50 pcs, 7–14 days sampling lead time, worldwide DHL/FedEx logistics), dual high-converting B2B CTAs ("REQUEST QUOTE & TECH PACK" and "DISCUSS YOUR PROJECT") with rolling text desktop animations and mobile press feedback, a 3-card "Product Manufacturing Details" specification block, a 5-section interactive client information block (Product Overview, Customization Options, Why Choose This Product, Manufacturing Capability, FAQ), and a 6-stage "From Design To Delivery" manufacturing workflow with GSAP scroll animations. All inquiries route to `/contact?type=<category>&slug=<slug>#teckpack`.

---

## 1.1. Project SEO & B2B Transformation History

### Homepage Optimization
Updated homepage from generic sportswear presentation to B2B OEM manufacturing positioning.
- **Hero Messaging**: Updated for *Custom Sportswear Manufacturer For Global Brands*.
- **Manufacturing Credibility**: Added statistics (`5000+` Monthly Capacity, `7-14` Days Sample Turnaround, `50` MOQ, `Worldwide` Shipping) using `Freigeist-Light` (`!font-[middle]`).
- **Categories**: Converted into B2B manufacturing categories (*Custom Teamwear*, *Golfwear*, *Fitness Apparel*, *Activewear*, *Sports Uniforms*, *Private Label Clothing*).
- **Services**: Updated for OEM/ODM workflow (Fabric Sourcing, Custom Pattern Development, Printing, Embroidery, QC, Packaging).
- **Manufacturing Trust Process**: 5-stage production process added.
- **Preserved**: GSAP animations, theme, colors (`#EDEEE7`, `#111111`), typography, layout.

### About Page Optimization
Updated About page for OEM sportswear manufacturing excellence.
- **Hero**: Changed to *Custom Sportswear Manufacturing Excellence* with center alignment.
- **Manufacturing Credibility Content**: Added with factory capacity metrics.
- **Brand Ethos**: Focused on Custom Apparel Development, Technical Fabric Sourcing, Private Label Manufacturing, and Global Brand Partnerships.
- **Production Workflow**: 4-stage pinned interactive process preserved.
- **Corrections**: OEM & ODM entity formatting (`&amp;`), production capability and team metrics verified.

### Shop Catalog Optimization
Converted shop page from retail storefront into B2B manufacturing catalog.
- **Pricing**: Removed retail prices and consumer discounts from product items.
- **Badges**: Added `OEM / ODM Available` and `MOQ 50 PCS` indicators.
- **CTAs**: Converted to `REQUEST QUOTE` with staggered rolling text animations.
- **Tech Pack Banner**: Sleek rectangular `#111111` banner with low MOQ and sample lead time messaging.
- **Filtering**: B2B category filtering and customization options.
- **Preserved**: Product cards, theme, GSAP entrance animations.

### Product Detail Optimization
Converted product pages (`/product/[slug]`) into B2B manufacturing specification pages.
- **Pricing**: Completely removed consumer pricing, sale prices, and discount labels.
- **Header**: Added `Manufacturing Category` label, kept dynamic product title, and added OEM short description.
- **Manufacturing Details**: 3 cards for *Fabric Options*, *Customization*, and *Production*.
- **Workflow**: 6-stage *From Design To Delivery* manufacturing process with GSAP scroll reveal.
- **Client Information**: Structured tabbed sections (*Product Overview*, *Customization Options*, *Why Choose This Product*, *Manufacturing Capability*, *FAQ*).
- **CTAs**: `REQUEST QUOTE & TECH PACK` and `DISCUSS YOUR PROJECT` with rolling text desktop hover and mobile tactile press feedback.

### Contact Page Optimization
Converted contact page (`/contact`) into a high-converting B2B inquiry and quote portal.
- **Hero**: Centered *Start Your Custom Sportswear Project* with supporting B2B description.
- **Inquiry Channels**: 3 equal-height balanced cards (*Production Inquiry*, *Technical Support*, *Global Sales*).
- **Tech Pack Submission Form**: 2-column symmetrical layout for Company Information, Project Details, Customization Options, and Specs.
- **Trust Section**: Matched homepage credibility statistics layout and `Freigeist-Light` typography (`50` MOQ Starting, `7-14` Days Sampling, `Worldwide` Shipping).
### Manufacturing Process Page Optimization & Final Visual Corrections
Completed final visual corrections on the dedicated OEM sportswear manufacturing process specification page (`/manufacturing-process`) and navbar:
- **Navbar Logo Restored**:
  - Fully restored original navbar logo size, markup structure, and positioning.
  - Sits exactly like the original navbar version (`md:h-[9vh]` desktop height, `h-[7vh]` mobile scaling).
  - Keeps navbar pill design and spacing completely intact.
  - Prevented any external or hero section CSS from altering logo dimensions.
- **Manufacturing Credibility Statistics**:
  - Aligned directly with homepage `CompanyStats.tsx` design system.
  - Layout: 4 equal columns on desktop (`md:grid-cols-4`), single column on mobile (`grid-cols-1`) for spacious, symmetric balance.
  - Hierarchy & Spacing:
    - Number: `Freigeist-Light` (`!font-[middle]`) with `stat-value` sizing matching homepage stats (`text-4xl sm:text-5xl md:text-6xl tabular-nums`). Container has fixed `min-h-[60px]` preventing layout jitter.
    - Divider: Centered `w-12 h-[1px] bg-black/10 rounded-full`.
    - Title: Medium font style (`font-[middle] font-semibold text-xs md:text-sm uppercase tracking-wider`).
    - Description: Small readable style (`text-xs text-neutral-600 font-[middle] max-w-[220px] leading-relaxed`).
  - Metrics:
    1. `5000+` — Monthly Production Capacity (*Scalable OEM bulk production lines*)
    2. `50` — Pieces MOQ Starting (*Low-risk launches for emerging brands*)
    3. `7-14` — Days Sample Turnaround (*Rapid prototyping & physical review*)
    4. `Worldwide` — Shipping Logistics (*Door-to-door express via DHL & FedEx*)
  - **Premium Slow Counter Animations Added**: Built using existing GSAP (`ScrollTrigger`) with smooth decelerating easing (`power1.out`):
    - `5000+`: counts from `0` to `5000+` over `3.5s` for effortless human eye tracking.
    - `50`: counts from `0` to `50` over `2.5s`.
    - `7-14`: smooth transition from `1-1` to `7-14` over `2.5s`.
    - `Worldwide`: smooth vertical fade and opacity reveal over `2.5s`.
- **Seven Stages Of Precision Craftsmanship (Dark Theme & Equal Height Cards)**:
  - Section Title: *Seven Stages Of Precision Craftsmanship*.
  - Section Background: `#111111` (dark obsidian manufacturing block).
  - Text Colors:
    - Numbers: `#FFFFFF` (`font-[middle] tabular-nums font-semibold`).
    - Titles: `#FFFFFF` (`font-[main]` uppercase tracking-tight).
    - Description: `#EDEEE7` (cream body text).
  - **Equal Height Image & Detail Cards**:
    - Applied `items-stretch` on the grid row and `h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]` on both the detail boxes (`ContentCard`) and image boxes (`ImageCard`).
    - Detail cards use `flex flex-col justify-between` to ensure perfect vertical alignment across all screen sizes.
  - Refined Content:
    1. `01` / *Tech Pack Audit*: Review designs, measurements, materials and production requirements to create an accurate manufacturing roadmap.
    2. `02` / *Fabric Sourcing*: Select performance fabrics, colors and materials based on comfort, durability and brand requirements.
    3. `03` / *7-14D Prototyping*: Develop physical samples quickly for fitting, quality review and production approval.
    4. `04` / *Laser Cutting*: Precision cutting technology ensures consistent patterns and accurate garment construction.
    5. `05` / *Sublimation & Embroidery*: Apply custom branding with advanced printing and embroidery techniques.
    6. `06` / *AQL 2.5 QC*: Multi-stage quality inspection ensures every product meets international standards.
    7. `07` / *Worldwide Freight*: Secure packaging and global shipping solutions through trusted logistics partners.
  - **Synchronized Left/Right Animations Preserved**:
    - Left cards slide smoothly from left (`x: -80` to `0`).
    - Right cards slide smoothly from right (`x: 80` to `0`).
    - Exact 1s duration, `power3.out` easing, and 0.15s stagger offset between alternating sides.
  - Visuals: All 7 verified high-resolution manufacturing images (`i.pinimg.com`) strictly preserved.
  - Layout & Readability: Alternating 2-column desktop timeline with center spine line and numbered markers; mobile layout enforces consistent text-card first order before images.
- **B2B CTA Box & Button Wrapping Fix**:
  - High-converting dark container (`#111111`) with radial grid background.
  - Description: *Have a product idea or ready design? Our manufacturing team helps global brands transform concepts into premium sportswear collections through reliable OEM and private label production.*
  - **CTA Button Wrapping Fixed**: Increased button width (`min-w-[280px]`–`min-w-[320px]`), applied `whitespace-nowrap`, `inline-flex`, and `shrink-0` to guarantee text and arrows remain strictly on a single line.
  - Preserved `TransitionButton` rolling text animation on desktop hover and mobile tactile feedback.
- **Performance Rules Maintained**:
  - Strictly zero external animation libraries or duplicate dependencies added.
  - Reused existing GSAP, `TransitionButton`, and global typography classes.
  - Zero SEO changes or performance slowdown.
- **B2B CTA Box & Button Wrapping Fix**:
  - High-converting dark container (`#111111`) with radial grid background.
  - Description: *Have a product idea or ready design? Our manufacturing team helps global brands transform concepts into premium sportswear collections through reliable OEM and private label production.*
  - **CTA Button Wrapping Fixed**: Increased button width (`min-w-[280px]`–`min-w-[320px]`), applied `whitespace-nowrap`, `inline-flex`, and `shrink-0` to guarantee text and arrows remain strictly on a single line.
  - Preserved `TransitionButton` rolling text animation on desktop hover and mobile tactile feedback.
- **Design Consistency & Performance-First Rules Preserved**:
  - Strictly maintain color palette (`#EDEEE7`, `#111111`), global typography (`BrigendsExpanded`, `Freigeist-Light`), and existing GSAP setup.
  - Performance-First Rule: Zero external animation libraries or duplicate dependencies added.

### Complete Documentation System Established
Architected and created a comprehensive, specialized documentation suite inside `docs/` serving as the definitive single source of truth for future AI agents and software engineers:
- [`docs/project-requirements-document.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/project-requirements-document.md): Complete PRD covering business identity, B2B OEM/ODM transformation, targeted client personas, full feature inventory, and operational business rules (MOQ 50 pcs, 7–14 days sampling lead time, AQL 2.5 QC standard, worldwide freight).
- [`docs/design-full-audit.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/design-full-audit.md): Comprehensive design audit specifying the `#EDEEE7` / `#111111` / `#181818` palette, `@font-face` bindings (`BrigendsExpanded` as `font-[main]`, `Freigeist-Light` as `font-[middle]`), typography scale, layout containers (`max-w-7xl`), GSAP motion dynamics (slow readable counters, split text, rolling buttons), and component primitives.
- [`docs/architecture.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/architecture.md): Complete technical architecture detailing user journeys, App Router folder hierarchy, technology stack (Next.js 16, React 19, TypeScript, Tailwind v4, MongoDB, Better Auth, Cloudinary, GSAP), dual-database connection caching, and data pipelines.
- [`docs/rules.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/rules.md): AI operating boundaries and engineering policies defining mandatory pre-change inspection, component reuse, design integrity, performance rules, asset preservation, and standardized error handling.
- [`docs/phases.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/phases.md): Strategic roadmap tracking Phases 1 through 6 (Foundation, Core Showroom, B2B Transformation, Manufacturing Process, Client Auth, Admin System) and forward-looking Phase 7 (programmatic landing pages, technical manufacturing blog, and fabric guides).

### Phase 8: Transform Consumer Cart Into B2B Tech Pack Specification System (Completed)
Successfully eliminated all remaining direct-to-consumer shopping cart artifacts and transformed the system into a professional B2B Tech Pack Specification Drawer and Wholesale RFQ Builder:
- **Global B2B State**: Created [`app/context/TechPackContext.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/context/TechPackContext.tsx) with browser `localStorage` persistence, maintaining queued manufacturing archetypes, MOQ-governed quantities (minimum 50 pcs), color requirements, size ranges, customization options, and manufacturing notes.
- **Floating Tech Pack Drawer**: Created [`app/components/TechPackDrawer.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/TechPackDrawer.tsx), an editorial slide-over drawer showing selected styles, volume counters, MOQ badges, remove triggers, and direct CTA to full RFQ specification.
- **Navbar & Viewport Integration**: Updated [`app/layout.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/layout.tsx) with `<TechPackProvider>` and `<TechPackDrawer />`. Updated [`app/components/Nav.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/Nav.tsx) so the bag icon displays an active badge counter (`itemCount`) and triggers drawer opening.
- **Product Detail Integration**: Updated [`app/product/[slug]/components/ProductInfo.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/product/[slug]/components/ProductInfo.tsx) so `REQUEST QUOTE & TECH PACK` adds the active silhouette with its selected variant/color to the Tech Pack list, displays a toast alert, and reveals the drawer.
- **Dedicated B2B RFQ Builder Page**: Rebuilt [`app/cart/page.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/cart/page.tsx) and [`app/cart/CartClient.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/cart/CartClient.tsx) into a comprehensive 2-column wholesale inquiry portal with per-item customization chips (*Sublimation*, *Embroidery*, *Screen Printing*, *Heat Transfer*, *Private Label*, *Custom Packaging*, *Custom Labels*), MOQ validation, company contact fields, and formal inquiry submission.
- **Backend Schema & Email Dispatch**: Extended [`models/TechPack.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/TechPack.model.ts) with an optional `items` array and enhanced [`app/api/contact/submit/route.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/api/contact/submit/route.ts) to render an itemized table in the factory notification email sent via Nodemailer.
- **Zero Retail Mechanics**: Completely removed all prices, currency symbols, subtotals, consumer taxes, and payment gateways.

### Phase 9: Direct Tech Pack File Upload System For B2B OEM Manufacturing (Completed)
Implemented a professional technical document and CAD file upload system enabling international brands to attach direct vector patterns and garment specifications during RFQ submission:
- **Server-Side Secure Cloudinary Streaming**: Built dedicated endpoint [`app/api/upload/tech-pack/route.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/api/upload/tech-pack/route.ts) that validates extensions (`.pdf`, `.ai`, `.eps`, `.psd`, `.dxf`, `.zip`, `.png`, `.jpg`, `.jpeg`), enforces a 25 MB file boundary, sanitizes filenames, and streams files directly to Cloudinary's `tech_packs` CDN folder with `resource_type: "auto"`.
- **Reusable Component Architecture**: Developed [`app/components/TechPackUploadZone.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/TechPackUploadZone.tsx), featuring drag-and-drop mechanics, file browsing, real-time upload progress indicators, file type badges (PDF, AI, ZIP, IMG), human-readable byte sizes, direct preview links, and individual file removal.
- **Mongoose Database Schema Extension**: Updated [`models/TechPack.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/TechPack.model.ts) with `files: [{ fileName, fileUrl, fileType, fileSize, uploadedAt }]` subdocuments while preserving 100% backwards compatibility.
- **Dual Workflow Integration**:
  - **Wholesale RFQ Builder (`/cart`)**: Embedded `<TechPackUploadZone />` inside the Right Column submission card ([`app/cart/CartClient.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/cart/CartClient.tsx)), passing attached files directly with the multi-garment RFQ payload.
  - **Manufacturing Inquiry Portal (`/contact`)**: Added Section 05 (`05 / Attach Tech Pack & Vector Files`) to the inquiry form ([`app/contact/ContactClient.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/contact/ContactClient.tsx)), linking attached files with single-category quote requests.
- **Factory Email Delivery**: Enhanced [`app/api/contact/submit/route.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/api/contact/submit/route.ts) to format a high-contrast itemized technical file table with direct download buttons inside the Nodemailer HTML email dispatched to factory production engineers.

### Phase 10: Programmatic B2B SEO Landing Pages System (Completed)
Constructed an enterprise-grade programmatic B2B SEO architecture generating high-authority landing pages tailored for international buyers searching for custom sportswear manufacturing:
- **Dynamic Route Architecture**: Implemented [`app/solutions/[slug]/page.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/solutions/[slug]/page.tsx) with SSG pre-rendering via `generateStaticParams()`, 24-hour ISR caching, and dynamic metadata generation.
- **Manufacturing Content Repository**: Built [`lib/seo/solutionsData.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/seo/solutionsData.ts) containing exhaustive, factory-grade copy, fabric specifications, customization techniques, and buyer FAQs across 7 high-intent manufacturing search clusters:
  1. `/solutions/custom-sportswear-manufacturer`
  2. `/solutions/private-label-sportswear-manufacturer`
  3. `/solutions/custom-football-jersey-manufacturer`
  4. `/solutions/custom-basketball-uniform-manufacturer`
  5. `/solutions/sublimation-sportswear-manufacturer`
  6. `/solutions/teamwear-manufacturer`
  7. `/solutions/fitness-apparel-manufacturer`
- **Dynamic Mongoose Schema**: Created [`models/SEOPage.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/SEOPage.model.ts) to allow administrative overrides and database-backed dynamic programmatic page publishing.
- **6 Modular Reusable Components**:
  - `SEOHero.tsx`: Breadcrumb navigation, luxury display titles (`font-[main]`), trust statistics, and dual B2B quote triggers.
  - `ManufacturingBenefits.tsx`: 4-card value proposition grid (50 MOQ, CAD Tech Pack audit, factory pricing, AQL 2.5).
  - `CapabilityGrid.tsx`: Factory machinery, athletic fabric specifications table, and embellishment methods.
  - `ProcessTimeline.tsx`: Structured 5-stage production roadmap from audit to air cargo dispatch.
  - `FAQAccordion.tsx`: Accessible interactive accordion answering high-value buyer procurement questions.
  - `RFQCTA.tsx`: Obsidian black conversion block directing traffic to `/contact` and `/cart`.
- **4 Schema.org JSON-LD Objects**: Automatically injected on every solution page (`Organization`, `Service`, `BreadcrumbList`, and `FAQPage`).
- **Sitemap Indexing**: Updated [`app/sitemap.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/sitemap.ts) to dynamically include all programmatic solution pages with priority `0.85`.

### Phase 11: Technical Manufacturing Knowledge Hub & B2B SEO Blog System (Completed)
Constructed an authoritative, engineering-grade B2B Technical Manufacturing Knowledge Hub to capture informational long-tail search intent, build factory E-E-A-T topical authority, and route global sportswear founders and sourcing managers directly into the RFQ workflow:
- **Directory Hub Route**: Built [`app/knowledge/page.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/knowledge/page.tsx) with ISR caching (`revalidate = 86400`), Schema.org `CollectionPage` structured data, and client-side category filtering ([`app/knowledge/KnowledgeDirectoryClient.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/knowledge/KnowledgeDirectoryClient.tsx)) across 6 manufacturing categories (*Materials & Fabrics*, *Printing & Embellishment*, *Quality Assurance*, *Business & Sourcing*, *Manufacturing Hubs*, *Teamwear & Wholesale*).
- **Dynamic SSG/ISR Article Route**: Implemented [`app/knowledge/[slug]/page.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/knowledge/[slug]/page.tsx) with Next.js 16 async `params`, `generateStaticParams()`, comprehensive OpenGraph/Twitter card metadata, and dual-source data fetching (DB first, fallback to static dataset).
- **Static Knowledge Repository**: Built [`lib/seo/knowledgeData.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/seo/knowledgeData.ts) containing 6 exhaustive, technical manufacturing guides:
  1. `/knowledge/sportswear-fabric-guide`: Fabric GSM weights, polyester-spandex vs nylon-spandex, ASTM D5034 tensile testing, hydrophilic wicking chemistry, squat-proof opacity parameters.
  2. `/knowledge/sublimation-printing-guide`: Gas-state dye sublimation thermodynamics, 200°C drum calibration, Kiian/Sensient Swiss inks, cut-and-sew vs blank printing, zero added hand-feel.
  3. `/knowledge/aql-2-5-quality-control`: ISO 2859-1 (ANSI/ASQ Z1.4) Level II sampling tables, critical/major/minor defect definitions, 4-point fabric audits, 9-point calibrated needle detection.
  4. `/knowledge/private-label-sportswear-guide`: Private label sourcing economics, 50-piece low MOQ startup runway, tech pack CAD development, custom branding (woven labels, hangtags, polybags).
  5. `/knowledge/sialkot-sportswear-manufacturer-guide`: Sialkot apparel manufacturing cluster heritage, 70%+ global soccer ball production, Sialkot International Airport (SIAL) air cargo, direct export customs clearance.
  6. `/knowledge/custom-teamwear-buying-guide`: Club athletic procurement timeline, 12-week kickoff countdown, reinforced 6-thread seams, mid-season roster top-up archiving.
- **Dynamic Mongoose Model**: Created [`models/KnowledgeArticle.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/KnowledgeArticle.model.ts) using the dual-connection caching pattern (`getApplicationConnection()`) for optional administrative article publishing and CMS management.
- **6 Reusable Knowledge Components**:
  - `KnowledgeHero.tsx`: Breadcrumbs, category & read time badges, H1 display title, E-E-A-T verified engineering author card, and jump navigation anchor links.
  - `ArticleContent.tsx`: Executive brief, multi-section narrative, obsidian `#111111` technical takeaway callouts, and buyer procurement due diligence checkpoints.
  - `TechnicalSpecification.tsx`: Responsive laboratory testing matrix with ASTM / ISO standards.
  - `FAQSection.tsx`: Interactive client accordion handling technical queries.
  - `RelatedSolutions.tsx`: Cross-linking cards to programmatic B2B SEO landing pages (`/solutions/[slug]`).
  - `RFQCTA.tsx`: High-contrast obsidian B2B conversion block with factory commitments grid (50 MOQ, AQL 2.5, 7–14 days sample, CAD direct intake).
- **4 Schema.org JSON-LD Objects**: Automatically injected on every knowledge article (`TechArticle` with expert proficiency, `FAQPage`, `BreadcrumbList`, and `Organization`).
- **Internal Linking & Navigation**: Added `/knowledge` to [`app/sitemap.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/sitemap.ts), [`app/components/Nav.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/Nav.tsx) full-screen overlay menu, and [`app/components/Footer.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/Footer.tsx) Company column.

### Phase 12: Advanced B2B CRM Lead Management & Buyer Experience System (Completed)
Constructed an enterprise-grade B2B Customer Relationship Management (CRM) pipeline and buyer experience management engine for SLOTS SPORTSWEAR, unifying wholesale RFQ intake, factory communications, sampling progression, and bulk order milestones:
- **Admin CRM Workspace (`/admin/leads`)**: Implemented high-contrast administrative workspace ([`app/(root)/(admin)/admin/leads/page.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/(root)/(admin)/admin/leads/page.tsx), [`LeadsClient.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/(root)/(admin)/admin/leads/LeadsClient.tsx)) featuring real-time debounced search, stage filtering, interactive pipeline cards, and visual analytics.
- **6-Stage CRM Pipeline**: Standardized factory milestone workflow across `New`, `Contacted`, `Sample Requested`, `Production`, `Completed`, and `Rejected`.
- **Lead Detail & Audit Drawer**: Inspection drawer providing complete client credentials, product directives, itemized style breakdowns, direct CAD/Tech Pack downloads, internal engineering notes feed, and immutable audit timeline.
- **Multi-Channel Email System ([`lib/crmEmailService.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/crmEmailService.ts))**:
  - *Buyer Confirmation Receipt*: Branded HTML receipt with BOM review timeline, sampling turnaround, and WhatsApp Concierge trigger.
  - *Factory Lead Alert*: Instant alert dispatched to production engineers with direct CRM link (`/admin/leads?id=...`).
  - *Milestone Status Updates*: Automated notifications dispatched to buyers upon pipeline stage transitions with optional production director notes.
- **Dual-Connection Database Architecture**:
  - [`models/Lead.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/Lead.model.ts): Central CRM document with client credentials, multi-item garment specs, attached CAD files, stage, priority, and value estimation.
  - [`models/LeadActivity.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/LeadActivity.model.ts): Immutable audit log capturing stage transitions, internal notes, and email dispatches.
- **Visual Analytics Suite (`/api/admin/leads/analytics`)**: Built comprehensive KPI aggregator calculating monthly RFQs trend, geographic distribution across buyer countries, popular product scopes, lead source attribution, and pipeline conversion rates.
- **Automatic Legacy Sync**: Automatically identifies unmigrated legacy `TechPack` inquiries and synchronizes them into the CRM pipeline with status `New`.
- **Strict Security & Access Control**: Protected via `adminAuth()` session validation, role gating, and input validation.

---

## 1.2. Core Project Rules & Operating Directives

### Mandatory Protocol Before Any Change
1. **First inspect existing page structure**: Inspect component tree, DOM hierarchy, and container layouts before editing.
2. **Check current website theme**: Adhere strictly to the luxury manufacturing palette (`#EDEEE7` cream surface, `#111111` obsidian accents/cards, `#181818` dark surfaces).
3. **Check typography**: Respect `@font-face` tokens (`font-[main]` for `BrigendsExpanded` headlines, `font-[middle]` for `Freigeist-Light` body/numbers/labels).
4. **Check existing animation system**: Preserve GSAP ScrollTrigger patterns, scoped timelines, and text rolling behaviors.
5. **Check spacing and responsive behavior**: Ensure balanced padding (`max-w-7xl`, symmetric paddings, clean single-column mobile fallbacks).

### Design Rule
- **Do not create a new design.** Match existing Slots Sportswear luxury manufacturing theme strictly across all pages and components.

### Performance Rule
- **Avoid**:
  - New animation libraries (e.g. Framer Motion, AOS)
  - Heavy external dependencies or redundant packages
  - Duplicate code, duplicate wrappers, or parallel component systems
- **Reuse**:
  - Existing GSAP & ScrollTrigger
  - Existing `TransitionButton` (with rolling text desktop hover & tactile mobile press)
  - Existing typography system (`font-[main]`, `font-[middle]`)
  - Existing color system & tokens (`#EDEEE7`, `#111111`, frosted glass styles)

### Memory Rule
- **Update memory.md**: Update `docs/memory.md` after changes.
- **Document every change**: Maintain complete historical fidelity and technical documentation for every adjustment.

---

## 1.3. Design Consistency & Performance-First Workflow

### Performance-First Development Rules
1. **Zero External Animation Libraries**: Never introduce Framer Motion, AOS, or other heavy animation libraries when GSAP is already installed and globally configured.
2. **Zero Duplicate Components**: Reuse existing primitives (`TransitionButton`, `Heading`, `Icon`) rather than creating ad-hoc custom buttons or icon wrappers.
3. **Preserve Native Typography & Theme**: Use existing `@font-face` tokens (`font-[main]` for headlines, `font-[middle]` for body and numbers) and colors (`#EDEEE7`, `#111111`).
4. **Preserved Assets**: Never remove or replace verified product/process images or media assets without explicit instructions.

### Mandatory Pre-Change Analysis Workflow
Before creating or modifying any page or component, always conduct an exhaustive design review:
1. **Analyze Existing Theme Colors**:
   - Primary Surface / Background: `#EDEEE7` (warm cream/canvas).
   - Dark Surface / Accents: `#111111` (rich obsidian black).
   - Glassmorphism & Cards: `bg-white/40 border border-neutral-900/10 backdrop-blur-sm hover:border-neutral-900/25 shadow-sm`.
   - Dark Cards: `bg-[#181818]/90 border border-white/10 backdrop-blur-sm hover:border-white/25 shadow-xl`.
   - Subtle Dividers: `bg-black/10` or `bg-black/15` (on light); `bg-white/10` or `bg-white/15` (on dark).
2. **Analyze Typography Tokens**:
   - Primary Headings (`h1`, `h2`): `font-[main]` (`BrigendsExpanded`).
   - Body & Supporting Text (`p`, `h3`, stats numbers): `font-[middle]` (`Freigeist-Light`).
   - Badges & Metric Trackers: `uppercase font-bold tracking-[0.2em]` to `tracking-[0.4em]`.
3. **Analyze GSAP Animation Patterns**:
   - GSAP ScrollTrigger for entrance and scroll reveals (`.scroll-fade`, `.fade-up`, `.stat-item`, `.timeline-step-item`).
   - Character-by-character headline reveals via `<Heading />` and `splitText`.
   - Staggered letter rolling text on desktop hover (`TransitionButton` with `rollingText`).
   - Tactile press feedback on touch/click (`active:scale-[0.97]`).
   - Always scope GSAP with `useGSAP(() => { ... }, { scope: containerRef, dependencies: [isLoading] })`.
4. **Analyze Spacing & Layout**:
   - Symmetrical, balanced padding (`pt-28 md:pt-36 pb-20`, `px-5 md:px-10`, `max-w-7xl` containers).
   - Mobile-first responsive layouts with clean single-column fallbacks.
5. **Component Style & Consistency**:
   - Luxury minimalist, frosted glass cards, thin borders (`border-black/5` or `border-black/10`), rounded pill buttons (`rounded-full`).
6. **Preserved Assets & Strict Non-Destructive Rules**:
   - Never remove or replace images or videos without explicit user authorization.
   - Never change established colors or introduce alien styling frameworks.
   - Never replace existing GSAP animations with inconsistent or foreign libraries.
   - Retain verified remote image hosts (`i.pinimg.com`, `res.cloudinary.com`) configured in `next.config.ts`.


---

## 2. Technology Stack

### Core Framework & Runtime
- **Next.js**: `16.1.4` (Latest Next.js 16 App Router architecture, leveraging React Server Components, server actions, dynamic route handlers, Turbopack support, and automated image optimization).
- **React**: `19.2.3` (React 19 core library).
- **React DOM**: `19.2.3` (React 19 client and server DOM renderer).
- **TypeScript**: `^5` (Strict type checking enabled, `tsconfig.json` targeting `ES2017` with `bundler` module resolution and path alias `@/*`).

### Styling & Design System
- **Tailwind CSS**: `^4` (Tailwind CSS v4 engine paired with `@tailwindcss/postcss` and `tw-animate-css` `^1.4.0`).
- **PostCSS**: Configured via `postcss.config.mjs` with `@tailwindcss/postcss`.
- **Class Utilities**: `clsx` (`^2.1.1`), `tailwind-merge` (`^3.4.0`), and `class-variance-authority` (`^0.7.1`) merged inside `lib/utils.ts`.
- **Component Primitives**: Radix UI Primitives (shadcn/ui New York style preset):
  - `@radix-ui/react-dialog` (`^1.1.15`)
  - `@radix-ui/react-dropdown-menu` (`^2.1.16`)
  - `@radix-ui/react-slot` (`^1.2.4`)
  - `@radix-ui/react-label` (`^2.1.8`)
  - `@radix-ui/react-checkbox` (`^1.3.3`)
  - `@radix-ui/react-popover` (Radix popover primitive)
  - `@radix-ui/react-separator` (`^1.1.8`)
  - `@radix-ui/react-tooltip` (`^1.2.8`)
  - `@radix-ui/react-collapsible` (`^1.1.12`)
  - `cmdk` (`^1.1.1`)
- **Material UI (Admin Panel)**: `@mui/material` (`^7.3.7`), `@mui/icons-material` (`^7.3.7`), `@emotion/react` (`^11.14.0`), `@emotion/styled` (`^11.14.1`), and `@mui/x-date-pickers` (`^8.26.0`) used for advanced admin data management and date selection.
- **Icons**: `lucide-react` (`^0.563.0`), `react-icons` (`^5.5.0`), and custom static SVGs in `public/icons/`.
- **Theming**: `next-themes` (`^0.4.6`) supplying light/dark/system theme states for the administrative dashboard.

### Animations & Smooth Scrolling
- **GSAP (GreenSock)**: `gsap` (`^3.14.2`) powering character-by-character headline reveals, entrance transitions, pinned split-screen viewports, and timeline triggers.
- **GSAP React Integration**: `@gsap/react` (`^2.1.2`) with `useGSAP` lifecycle management and `ScrollTrigger` registration.
- **Smooth Scroll**: `locomotive-scroll` (`^5.0.1`) dynamically loaded client-side with Lenis virtual scroll interpolation (`lerp: 0.001`, `duration: 1.2`) bound to `ScrollTrigger`.

### Authentication & Authorization
- **Better Auth**: `better-auth` (`^1.4.16`) with native `mongodbAdapter`, email-password authentication, mandatory email verification, auto-signin post-verification, reset-password tokens, and administrative notification webhooks.
- **Better Auth Client**: `better-auth/react` configured in `lib/auth-client.ts`.
- **Custom Auth Plugin**: `lib/plugins.ts` extending the user schema with custom `phone` (number) and `deletedAt` (Date) fields.
- **Password Hashing**: `bcryptjs` (`^3.0.3`).
- **Role Enforcement**: `lib/adminhelperfunction.ts` enforcing strict matching of verified session email against `process.env.ADMIN_EMAIL`.

### Database & Data Layer
- **MongoDB**: Native driver `mongodb` (`^7.0.0`) for Better-Auth connections.
- **Mongoose**: `mongoose` (`^9.1.5`) for business entity modeling.
- **Multi-Database Connection Architecture**: `lib/database.ts` managing two completely independent cached database connection pools:
  1. `application`: Stores products, product variants, categories, media, coupons, reviews, and tech pack inquiries.
  2. `users`: Stores Better-Auth user profiles, sessions, accounts, and email verification tokens.
- **Client State & Data Fetching**: `@tanstack/react-query` (`^5.90.20`) with `@tanstack/react-query-devtools` (`^5.91.2`), and `axios` (`^1.13.4`).
- **Form Management & Validation**: `react-hook-form` (`^7.71.1`), `@hookform/resolvers` (`^5.2.2`), and `zod` (`^4.3.6`).

### Media & Cloud Services
- **Cloudinary SDK**: `cloudinary` (`^2.9.0`) and `next-cloudinary` (`^6.17.5`) for cloud-hosted asset management, unsigned/signed direct uploads, and CDN delivery.
- **Email Delivery**: `nodemailer` (`^8.0.4`) utilizing Gmail SMTP transport for transactional notifications.
- **Rich Text Content**: `ckeditor5` (`^47.4.0`) and `@ckeditor/ckeditor5-react` (`^11.0.1`) for rich product descriptions.
- **Data Export**: `export-to-csv` (`^1.4.0`) for admin CSV reporting.
- **Notifications**: `react-hot-toast` (`^2.6.0`) styled with custom frosted glass macOS aesthetics (`.macos-toast`).
- **Date Formatting**: `dayjs` (`^1.11.19`).

---

## 3. Complete Project Structure

```
c:\Users\AXE\Desktop\Ecommerce\dacciapparel/
├── .env.local                                # 15 environment variables (DB, Auth, Cloudinary, Nodemailer, Company Info)
├── .gitignore                                # Git ignore rules (node_modules, .next, .env, build outputs)
├── 11.12.1                                   # Artifact file (accidental npm error output "Unknown command: notice")
├── README.md                                 # Upstream Next.js boilerplate documentation
├── components.json                           # shadcn/ui configuration (New York style, neutral, CSS variables)
├── eslint.config.mjs                         # ESLint 9 configuration extending eslint-config-next 16.1.4
├── next.config.ts                            # Next.js config (Cloudinary/Pinterest remote patterns, package optimizations)
├── package.json                              # Project manifests, 42 dependencies, 11 devDependencies
├── package-lock.json                         # Pinned dependency tree
├── postcss.config.mjs                        # PostCSS configuration integrating @tailwindcss/postcss
├── prompts                                   # Scratch note containing prompt instructions for category hover animation
├── test-reviews.js                           # Scratch script testing cross-database Mongoose aggregation between User and Review
├── tsconfig.json                             # TypeScript compiler options (target ES2017, strict, alias @/*)
├── tsconfig.tsbuildinfo                      # Incremental TypeScript compilation cache
├── types/
│   └── nodemailer.d.ts                       # Ambient type declaration for nodemailer modules
│
├── public/                                   # Static assets served from root URL
│   ├── fonts/
│   │   ├── BrigendsExpanded-nReK1.otf        # Primary display uppercase font ('main')
│   │   ├── Freigeist-Light.woff2             # Modern grotesque body font ('middle')
│   │   └── ag-book-pro-light.otf             # Alternative clean book font asset
│   ├── icons/
│   │   ├── arrow-right-01.svg                # Directional diagonal arrow
│   │   ├── login-02.svg                      # Auth doorway icon
│   │   ├── menu.svg                          # Hamburger drawer icon
│   │   ├── search.svg                        # Lens search icon
│   │   ├── shopping-bag.svg                  # Cart / wardrobe shopping bag icon
│   │   └── user.svg                          # User profile silhouette icon
│   ├── images/
│   │   ├── about.jpeg                        # About page factory hero visual
│   │   ├── box.png                           # Custom packaging service badge
│   │   ├── daccilogosvg.png                  # Legacy DACCI APPAREL emblem
│   │   ├── gears.jpeg                        # Gears collection banner
│   │   ├── gloves.jpeg                       # Gloves collection banner
│   │   ├── guarantee.png                     # Quality guarantee badge
│   │   ├── hero.jpeg                         # Storefront hero fallback image
│   │   ├── hoody.jpeg                        # Hoodies category visual
│   │   ├── logo.png                          # Primary SLOTS SPORTS WEAR logo
│   │   ├── mens.jpeg                         # Men collection showcase image
│   │   ├── mobilehero.jpeg                   # Mobile viewport hero graphic
│   │   ├── polo.jpeg                         # Polo shirt category image
│   │   ├── price-tag.png                     # Low MOQ pricing badge
│   │   ├── schedule.png                      # Fast turnaround timeline badge
│   │   ├── sdfjhjksadf.jpeg                  # Scratch apparel image visual
│   │   ├── shop.png                          # Shop category thumbnail
│   │   ├── shophero.jpeg                     # Catalog top hero banner
│   │   ├── short.jpeg                        # Shorts category banner
│   │   ├── vest.jpeg                         # Technical vest visual
│   │   └── womens.jpeg                       # Women collection showcase image
│   └── videos/
│       └── hero.mp4                          # High-impact background athlete / factory showcase video
│
├── models/                                   # Mongoose Object Data Modeling
│   ├── category.model.ts                     # Category schema (name, slug, types array, deletedAt)
│   ├── Coupon.model.ts                       # Coupon schema (code, discountPercentage, minShoppingAmount, validity, deletedAt)
│   ├── Media.model.ts                        # Cloudinary Media schema (asset_id, public_id, path, urls, alt, deletedAt)
│   ├── product.model.ts                      # Product schema (name, slug, category ref, productType, mrp, sellingPrice, media refs, tags, deletedAt)
│   ├── productVariant.model.ts               # ProductVariant schema (product ref, color, size, sku, mrp, sellingPrice, media refs, deletedAt)
│   ├── review.model.ts                       # Review schema (product ref, user ref, rating 1-5, title, review, deletedAt)
│   ├── TechPack.model.ts                     # TechPack / Custom Order schema (name, email, company, productType, slug, quantity, deadline, customizationDetails)
│   └── User.model.ts                         # User model bound to Better-Auth 'user' collection (name, email, emailVerified, image, phone)
│
├── hooks/                                    # Reusable custom React hooks
│   ├── editCallfunction.ts                   # Generic Axios data fetching and mutation hook ('useFetch')
│   ├── use-mobile.ts                         # Media-query hook detecting screen widths < 768px ('useIsMobile')
│   └── useDeleteMutation.ts                  # TanStack Query mutation hook for soft ('SD') and permanent ('PD') deletion
│
├── lib/                                      # Core library configurations, business helpers, and schemas
│   ├── adminhelperfunction.ts                # Server-side 'adminAuth()' session inspection and role validation
│   ├── auth-client.ts                        # Client-side Better Auth SDK instantiation ('authClient')
│   ├── auth.ts                               # Server-side Better Auth instance with MongoDB adapter and email handlers
│   ├── cloudinary.ts                         # Cloudinary SDK v2 initialization
│   ├── column.tsx                            # Material React Table column definitions for Admin CRUD
│   ├── columnConfig.ts                       # Column display and filter configurations
│   ├── database.ts                           # Multi-database connection caching (getApplicationConnection & getUsersConnection)
│   ├── email-reset.tsx                       # HTML template generator for password reset transactional emails
│   ├── email-verify.tsx                      # HTML template generator for email verification emails
│   ├── materialTheme.ts                      # Material UI dark/light theme options for admin panel tables
│   ├── nodemailer.ts                         # Nodemailer Gmail SMTP transporter and fallback sender address
│   ├── plugins.ts                            # Custom Better-Auth plugin injecting 'phone' and 'deletedAt' to User
│   ├── utils.ts                              # Class name merging utility ('cn()')
│   └── zodSchema.ts                          # Comprehensive Zod schema for all storefront and admin validation forms
│
├── routes/
│   └── adminroutes.js                        # Administrative route generator helpers
│
├── components/                               # Shared UI & Application Components
│   ├── JsonLd.tsx                            # Server-rendered JSON-LD script tag injector
│   ├── application/
│   │   ├── DataTable.tsx                     # Material React Table wrapper component
│   │   ├── DataTableWrapper.tsx              # Card container with search, delete, and export actions
│   │   ├── DeleteAction.tsx                  # Confirmation dialog handling soft/permanent delete mutations
│   │   ├── EditAction.tsx                    # Quick edit button triggering entity edit route
│   │   └── select.jsx                        # Custom dropdown selector component
│   ├── globalprovider/
│   │   └── provider.tsx                      # TanStack QueryClientProvider and ReactQueryDevtools
│   └── ui/                                   # shadcn/ui components
│       ├── EntranceNotification.tsx          # Timed entrance modal pop-up for guest discounts / member perks
│       ├── badge.tsx                         # Status badge pill component
│       ├── breadcrumb.tsx                    # Hierarchical breadcrumb navigation
│       ├── button.tsx                        # Variant-based button component
│       ├── card.tsx                          # Card, CardHeader, CardContent containers
│       ├── checkbox.tsx                      # Controlled checkbox input
│       ├── collapsible.tsx                   # Collapsible disclosure primitive
│       ├── command.tsx                       # Command menu palette
│       ├── dialog.tsx                        # Modal dialog primitive with overlays
│       ├── dropdown-menu.tsx                 # Popover dropdown action menu
│       ├── input.tsx                         # Accessible input field
│       ├── label.tsx                         # Accessible form label
│       ├── popover.tsx                       # Popover container primitive
│       ├── separator.tsx                     # Semantic divider rule
│       ├── sheet.tsx                         # Slide-out drawer panel
│       ├── sidebar.tsx                       # Full-featured responsive sidebar navigation engine
│       ├── skeleton.tsx                      # Pulsing content placeholder skeleton
│       └── tooltip.tsx                       # Contextual tooltip hover container
│
├── docs/                                     # System documentation
│   └── memory.md                             # Comprehensive technical and functional project memory (this file)
│
└── app/                                      # Next.js App Router Root
    ├── apple-icon.png                        # Apple Touch Icon
    ├── favicon.png                           # Favicon graphic
    ├── icon.png                              # Default web app icon
    ├── globals.css                           # Global Tailwind v4 styles, custom fonts, buttons, and macOS toast styles
    ├── ckeditor5.css                         # CKEditor 5 theme and layout overrides
    ├── layout.tsx                            # Root HTML layout (metadata, fonts, loader, nav, toasts, smooth scroll, footer)
    ├── page.tsx                              # Storefront Homepage
    ├── robots.ts                             # Dynamic /robots.txt generation
    ├── sitemap.ts                            # Dynamic /sitemap.xml generating live product URLs
    ├── context/
    │   └── LoaderContext.tsx                 # Fullscreen curtain page transition provider and loader animation
    ├── components/                           # Storefront Reusable Section Components
    │   ├── AnimatedSwapText.tsx              # Text hover swap animation component
    │   ├── CompanyStats.tsx                  # Animated counter metrics bar (customers, products, orders, rating)
    │   ├── Footer.tsx                        # Global dark footer with brand info, category links, policies, and newsletter
    │   ├── FormattedTitle.tsx                # Title formatter with split font styling
    │   ├── Heading.tsx                       # Character-by-character GSAP stagger headline reveal
    │   ├── HeroSection.tsx                   # Hero video showcase, dynamic arrivals ticker, and social proof rating
    │   ├── HomeContact.tsx                   # Quick contact / inquiry submission section on homepage
    │   ├── HomeMiddle.tsx                    # Brand narrative section with width-expanding image reveal
    │   ├── HorizontalCategories.tsx          # 2x2 grid category cards with image hover zoom and active selection
    │   ├── Icon.tsx                          # Dynamic SVG icon loader mapping to public/icons/
    │   ├── Log-out.tsx                       # Better Auth sign-out button component
    │   ├── Nav.tsx                           # Global frosted glass header, mega-menu, live search drawer, mobile menu
    │   ├── NewArrival.tsx                    # Horizontal scrolling new arrivals showcase
    │   ├── OurServices.tsx                   # Pinned split-screen services presentation and Whychooseus section
    │   ├── PopularCategories.tsx             # Horizontal drag/scroll carousel of featured apparel styles
    │   ├── ProductItem.tsx                   # Product card with image hover swap, price, and category badge
    │   ├── ShopBreadcrumb.tsx                # Breadcrumb trail component for catalog navigation
    │   ├── ShopClient.tsx                    # Client-side shop controller managing filters, sorting, and pagination
    │   ├── ShopFilters.tsx                   # Multi-faceted filter drawer (categories, tags, sale status, clear filters)
    │   ├── ShopHero.tsx                      # Minimalist header banner for the catalog
    │   ├── SmoothScroll.tsx                  # Locomotive Scroll / Lenis initialization wrapper
    │   ├── TransitionButton.tsx              # Animated button executing coordinated page transitions via LoaderContext
    │   ├── WhatsAppButton.tsx                # Floating bottom-right direct WhatsApp click-to-chat button
    │   └── Whychooseus.tsx                   # 4-pillar brand differentiation section (low MOQ, quality, shipping, speed)
    │
    ├── about/                                # Brand & Manufacturing Capabilities
    │   ├── AboutClient.tsx                   # GSAP entrance animation controller for About page
    │   ├── components/
    │   │   └── HowItWorks.tsx                # Pinned 4-stage interactive manufacturing process animation
    │   └── page.tsx                          # About page server entry point
    │
    ├── auth/                                 # Authentication Route Group
    │   ├── layout.tsx                        # Auth session check (redirects active users away from auth pages)
    │   ├── signin/page.tsx                   # Email/password login form with redirect handling
    │   ├── signup/page.tsx                   # New client registration form triggering email verification
    │   ├── forget-password/page.tsx          # Password reset email request form
    │   ├── reset-password/page.tsx           # New password submission form validating reset token
    │   └── verifyemail/page.tsx              # Email verification confirmation landing screen
    │
    ├── cart/                                 # Wardrobe / Cart Route
    │   └── page.tsx                          # "Cart Experience Coming Soon" apology page with catalog redirect CTAs
    │
    ├── contact/                              # B2B Manufacturing Inquiry & Quote Portal
    │   ├── ContactClient.tsx                 # B2B Quote & Tech Pack form, rolling text CTA, 3 contact cards, trust section
    │   └── page.tsx                          # Contact page server component with targeted B2B SEO metadata
    │
    ├── dashboard/                            # Customer Account Area
    │   └── page.tsx                          # Member overview displaying profile stats, status badge, and quick links
    │
    ├── profile-edit/                         # Customer Account Editing
    │   └── page.tsx                          # Profile management form (avatar photo upload, name, phone number)
    │
    ├── product/[slug]/                       # Dynamic Product Detail View
    │   ├── loading.tsx                       # Skeleton loader for product detail view
    │   ├── ProductClient.tsx                 # Client controller managing variant selection, rating, and marquee
    │   ├── components/
    │   │   ├── GalleryMarquee.tsx            # Fullscreen lightbox marquee displaying all product/variant images
    │   │   ├── ProductGallery.tsx            # Vertical thumbnail strip, discount tag, and main interactive zoom image
    │   │   ├── ProductInfo.tsx               # Pricing, color pills, size buttons, description, and "Add to Wardrobe" CTA
    │   │   ├── ReviewCollective.tsx          # Customer ratings summary, star distribution, and verified review list
    │   │   └── ReviewModal.tsx               # Verified client review submission dialog with interactive 5-star picker
    │   └── page.tsx                          # Server component: parallel DB queries, JSON-LD injection, SEO metadata
    │
    ├── shop/                                 # Product Catalog
    │   ├── loading.tsx                       # Skeleton loader for the catalog grid
    │   └── page.tsx                          # Server component fetching categories, initial products, and tags
    │
    ├── story/page.tsx                        # Brand history, 2018-2026 milestones timeline, core manufacturing values
    ├── faq/page.tsx                          # Categorized FAQ accordion (MOQ, Sampling, Production, Shipping, Payment)
    ├── policy/page.tsx                       # Privacy policy and data handling disclosures
    ├── refund/page.tsx                       # 7-day exchange, defective goods replacement, and refund terms
    ├── shipping/page.tsx                     # Global logistics breakdown (DHL, FedEx, customs, delivery timelines)
    ├── terms/page.tsx                        # Legal terms and conditions of manufacturing agreements
    ├── test-toast/page.tsx                   # Internal developer sandbox for testing macOS frosted glass toasts
    │
    ├── (root)/(admin)/admin/                 # Administrative Management Panel
    │   ├── layout.tsx                        # Server-side 'adminAuth()' security guard, SideBar, Topbar, ThemeProvider
    │   ├── dashboard/page.tsx                # Admin overview charts (Recharts), stats counters, recent activity logs
    │   ├── category/
    │   │   ├── page.tsx                      # Category table list with search, export, and soft delete
    │   │   ├── add/page.tsx                  # New category creation form (name, slug, garment types)
    │   │   └── edit/[id]/page.tsx            # Category edit form
    │   ├── product/
    │   │   ├── page.tsx                      # Product table list with media previews, pricing, and category filters
    │   │   ├── add/page.tsx                  # Product creation form (CKEditor, category picker, Cloudinary media picker)
    │   │   └── edit/[id]/page.tsx            # Product edit form
    │   ├── product-variant/
    │   │   ├── page.tsx                      # Variant table list (SKU, color, size, price, stock, images)
    │   │   ├── add/page.tsx                  # Variant creation form bound to parent product
    │   │   └── edit/[id]/page.tsx            # Variant edit form
    │   ├── coupon/
    │   │   ├── page.tsx                      # Coupon table list (code, percentage, minimum order, validity)
    │   │   ├── add/page.tsx                  # Coupon creation form
    │   │   └── edit/[id]/page.tsx            # Coupon edit form
    │   ├── orders/
    │   │   └── page.tsx                      # Tech Pack inquiry management table with detail modal and status toggle
    │   ├── customers/
    │   │   └── page.tsx                      # Registered user directory with verification status, phone, and role
    │   ├── media/
    │   │   ├── page.tsx                      # Visual media asset library with Cloudinary upload widget
    │   │   └── edit/[id]/page.tsx            # Media metadata editor (title, alt text)
    │   ├── review/
    │   │   └── page.tsx                      # Product review moderation table with rating filters and delete actions
    │   ├── trash/
    │   │   └── page.tsx                      # Multi-entity soft-delete recycle bin (restore or permanently purge)
    │   └── components/                       # Admin Specific Components
    │       ├── AddMedia.tsx                  # Media selection modal for product and variant creation
    │       ├── BreadCrumb.tsx                # Administrative section breadcrumbs
    │       ├── Editor.tsx                    # Dynamic client-only CKEditor 5 wrapper
    │       ├── Media.tsx                     # Media card component displaying image dimensions, format, and actions
    │       ├── MediaModal.tsx                # Fullscreen asset preview and selector dialog
    │       ├── SideBar.tsx                   # Collapsible admin sidebar with active route highlighting
    │       ├── ThemeProvider.tsx             # Next-themes wrapper for admin UI
    │       ├── Themeswitch.tsx               # Light / Dark / System theme toggle button
    │       ├── Topbar.tsx                    # Admin top navigation bar with user profile dropdown and theme toggle
    │       ├── UploadMedia.tsx               # Direct Cloudinary CldUploadWidget trigger
    │       ├── UserDropdown.tsx              # Admin user account popup menu with sign-out action
    │       └── adminsidebarmenu.ts           # Navigation structure config for admin sidebar menu
    │
    └── api/                                  # API Route Handlers
        ├── auth/[...all]/route.ts            # Better-Auth wildcard authentication handler
        ├── category/
        │   ├── route.ts                      # GET paginated categories (supports search, sort, trash flag)
        │   ├── create/route.ts               # POST create new category
        │   ├── get/[id]/route.ts             # GET single category details
        │   ├── update/route.ts               # PUT update category attributes
        │   ├── delete/route.ts               # PUT/DELETE soft delete or permanently purge categories
        │   └── export/route.ts               # GET export categories to CSV format
        ├── product/
        │   ├── route.ts                      # GET paginated products (supports search, sort, trash flag)
        │   ├── create/route.ts               # POST create new product
        │   ├── get/[id]/route.ts             # GET single product details
        │   ├── update/route.ts               # PUT update product attributes
        │   ├── delete/route.ts               # PUT/DELETE soft delete or permanently purge products
        │   └── export/route.ts               # GET export products to CSV format
        ├── product-variant/
        │   ├── route.ts                      # GET paginated variants (supports search, sort, trash flag)
        │   ├── create/route.ts               # POST create new variant
        │   ├── get/[id]/route.ts             # GET single variant details
        │   ├── update/route.ts               # PUT update variant attributes
        │   ├── delete/route.ts               # PUT/DELETE soft delete or permanently purge variants
        │   └── export/route.ts               # GET export variants to CSV format
        ├── coupon/
        │   ├── route.ts                      # GET paginated coupons (supports search, sort, trash flag)
        │   ├── create/route.ts               # POST create new coupon
        │   ├── get/[id]/route.ts             # GET single coupon details
        │   ├── update/route.ts               # PUT update coupon attributes
        │   ├── delete/route.ts               # PUT/DELETE soft delete or permanently purge coupons
        │   └── export/route.ts               # GET export coupons to CSV format
        ├── customers/
        │   ├── route.ts                      # GET paginated customer users from USERS DB
        │   ├── get/route.ts                  # GET current authenticated customer profile
        │   └── update/route.ts               # PUT update customer profile details (name, phone, image)
        ├── media/
        │   ├── route.ts                      # GET paginated media assets from Cloudinary collection
        │   ├── creat/route.ts                # POST record newly uploaded Cloudinary asset into database
        │   ├── get/[id]/route.ts             # GET single media asset details
        │   ├── update/route.ts               # PUT update media alt and title text
        │   └── delete/route.ts               # PUT/DELETE soft delete or permanently delete media
        ├── review/
        │   ├── route.ts                      # GET paginated reviews with product and user population
        │   ├── create/route.ts               # POST submit new product review
        │   ├── get/[id]/route.ts             # GET single review details
        │   ├── delete/route.ts               # PUT/DELETE soft delete or permanently purge reviews
        │   └── export/route.ts               # GET export reviews to CSV format
        ├── contact/
        │   ├── get/route.ts                  # GET all Tech Pack / custom order inquiries
        │   ├── submit/route.ts               # POST create new TechPack submission and send email notification
        │   └── update/[id]/route.ts          # PUT update inquiry status (mark isNewStatus = false)
        ├── products/
        │   └── new-arrivals/route.ts         # GET latest 8 products for homepage ticker
        ├── public/
        │   ├── categories/route.ts           # GET active public categories for navigation and footer
        │   ├── nav-data/route.ts             # GET grouped categories and latest products for mega-menu
        │   ├── products/route.ts             # GET paginated public catalog products with filters
        │   ├── products/[slug]/route.ts      # GET public product details by slug
        │   ├── reviews/route.ts              # GET public reviews for a product
        │   ├── search/route.ts               # GET live debounced search suggestions
        │   ├── stats/route.ts                # GET public social proof counts (customers, products, orders, rating)
        │   └── users/route.ts                # GET customer avatars for social proof display
        ├── cloudinary-signature/route.ts     # POST generate cryptographic SHA signature for client uploads
        ├── dashboard/
        │   └── stats/route.ts                # GET aggregated analytics for admin dashboard (7-day trends)
        └── subscribe/route.ts                # POST quick inquiry submission handler from homepage and footer
```

---

## 4. Next.js Architecture

### Rendering Paradigm & Server Components
- **Hybrid App Router Architecture**: Leverages React Server Components (RSC) for initial page loads, data hydration, and dynamic metadata generation, combined with granular `"use client"` boundaries for animation-heavy, interactive interfaces.
- **Server Component Data Fetching**:
  - `app/product/[slug]/page.tsx` runs entirely on the server, opening direct isolated database connections to query both `APPLICATION` and `USERS` databases, computing rating averages, generating OpenGraph and Twitter cards, and injecting Google-compliant Product JSON-LD structured data before streaming HTML to the client.
  - `app/shop/page.tsx` queries MongoDB directly on the server to retrieve active categories, initial 20 products, and unique branding tags, pre-populating `ShopClient` to prevent layout shift and eliminate client-side waterfall delays.
- **Client Component Boundaries**:
  - `ShopClient.tsx`, `ProductClient.tsx`, `Nav.tsx`, `HeroSection.tsx`, `OurServices.tsx`, and `HowItWorks.tsx` declare `"use client"` to access browser APIs, window scroll listeners, GSAP timelines, and client hooks (`useLoader`, `useSearchParams`, `useSession`).

### Layout Hierarchy & Route Guards
1. **Root Layout (`app/layout.tsx`)**:
   - Applies HTML/body tags with `antialiased` class and background color `#EDEEE7`.
   - Injects DNS preconnect hints to `res.cloudinary.com` and `i.pinimg.com`.
   - Injects global `Organization` JSON-LD structured data.
   - Envelops the application inside `LoaderProvider` (curtain animation engine).
   - Mounts global singleton components: `Nav`, `Toaster` (with macOS frosted glass styling), `SmoothScroll` (Locomotive/Lenis), `Providers` (React Query), `Footer`, `EntranceNotification`, and `WhatsAppButton`.
2. **Auth Layout (`app/auth/layout.tsx`)**:
   - Enforces `robots: { index: false, follow: false }`.
   - Checks user session server-side via `auth.api.getSession()`.
   - If an authenticated session exists and email is verified:
     - If user matches `adminAuth()`: redirects to `/admin/dashboard`.
     - Else: redirects to customer `/dashboard`.
   - Prevents logged-in users from seeing sign-in or registration screens.
3. **Admin Layout (`app/(root)/(admin)/admin/layout.tsx`)**:
   - Strict server-side security gate executing `adminAuth()`.
   - If user is not authenticated, email is unverified, or email does not match `process.env.ADMIN_EMAIL`, immediately redirects to root `/`.
   - Wraps the administrative views in `ThemeProvider` (Next Themes), `SidebarProvider` (shadcn), `SideBar`, `Topbar`, and an admin footer.

### Streaming & Loading States
- **Loading Boundaries**: Dedicated `loading.tsx` skeletons in `app/shop/loading.tsx` and `app/product/[slug]/loading.tsx` provide instant visual feedback with pulsating geometric cards during server fetch and navigation.
- **Custom Page Transition Curtain**: `LoaderContext.tsx` intercepts router transitions (`transitionTo()`), orchestrating a full-screen vertical curtain slide with an animated percentage counter (`0% -> 100%`) and marquee brand ticker before revealing the newly loaded route.

### Route Groups
- **`(root)/(admin)`**: Group folder isolating administrative routes under `/admin/*` with custom layout, styles, and MUI dependencies, completely decoupled from public customer navigation.

---

## 5. Complete Route / Page Inventory

| Route Path | Route Type | Source File | Rendering | Auth Requirement | Purpose & Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Static Root | `app/page.tsx` | Client Hydrated | Public | Main storefront homepage: hero video, company stats, collections, services, brand story, quick inquiry form |
| `/about` | Static Marketing | `app/about/page.tsx` | Client Hydrated | Public | Manufacturing capabilities, factory ethos, and pinned 4-stage "How It Works" interactive process |
| `/shop` | Dynamic Catalog | `app/shop/page.tsx` | Server + Client | Public | Multi-faceted catalog browsing with taxonomy accordion, sale filters, search, and pagination |
| `/product/[slug]` | Dynamic Detail | `app/product/[slug]/page.tsx` | Server (RSC) + Client | Public | Detailed garment specifications, variant switcher, image marquee, reviews, and "Add to Wardrobe" CTA |
| `/cart` | Static Informational | `app/cart/page.tsx` | Server | Public | "Cart Experience Coming Soon" apology and status page redirecting to shop or contact |
| `/contact` | Static Form | `app/contact/page.tsx` | Client Hydrated | Public | Comprehensive B2B Tech Pack and custom order specification submission portal |
| `/story` | Static Marketing | `app/story/page.tsx` | Server | Public | Brand narrative, 2018–2026 milestones timeline, craftsmanship standards, and factory philosophy |
| `/faq` | Static Help | `app/faq/page.tsx` | Server | Public | Comprehensive FAQ answering MOQ, sampling speed, quality certifications, shipping, and payment |
| `/policy` | Static Legal | `app/policy/page.tsx` | Server | Public | Privacy policy, cookie usage, data collection, and customer information protection |
| `/refund` | Static Legal | `app/refund/page.tsx` | Server | Public | 7-day exchange terms, defective manufacturing replacement guarantee, and refund rules |
| `/shipping` | Static Legal | `app/shipping/page.tsx` | Server | Public | Global courier delivery terms (DHL, FedEx air freight 5-10 days, sea freight 20-35 days, customs duties) |
| `/terms` | Static Legal | `app/terms/page.tsx` | Server | Public | Commercial terms of service governing OEM/ODM manufacturing contracts and client agreements |
| `/test-toast` | Developer Sandbox | `app/test-toast/page.tsx` | Client | Public | Sandbox interface for testing macOS frosted glass toast notifications |
| `/dashboard` | Customer Dashboard | `app/dashboard/page.tsx` | Server | Customer (User) | Account overview for logged-in clients: member status badge, profile details, quick links |
| `/profile-edit` | Customer Form | `app/profile-edit/page.tsx` | Client | Customer (User) | Profile management: avatar upload via Cloudinary, name modification, phone number update |
| `/auth/signin` | Auth Interface | `app/auth/signin/page.tsx` | Client | Public (Guest) | Client sign-in form with email/password credentials and password reset link |
| `/auth/signup` | Auth Interface | `app/auth/signup/page.tsx` | Client | Public (Guest) | New account registration triggering automated verification email |
| `/auth/forget-password` | Auth Interface | `app/auth/forget-password/page.tsx` | Client | Public (Guest) | Password reset request form triggering time-limited reset email |
| `/auth/reset-password` | Auth Interface | `app/auth/reset-password/page.tsx` | Client | Public (Guest) | Form allowing password updates via cryptographic token validation |
| `/auth/verifyemail` | Auth Interface | `app/auth/verifyemail/page.tsx` | Client | Public (Guest) | Confirmation landing page notifying user of verification status |
| `/admin/dashboard` | Admin Overview | `app/(root)/(admin)/admin/dashboard/page.tsx` | Client | Administrator | Analytical overview: total products, users, reviews, 7-day user activity charts (Recharts) |
| `/admin/category` | Admin CRUD | `app/(root)/(admin)/admin/category/page.tsx` | Client | Administrator | Category management table: search, export CSV, soft delete, edit links |
| `/admin/category/add` | Admin Form | `app/(root)/(admin)/admin/category/add/page.tsx` | Client | Administrator | Form to create new category with slug and sub-type tags |
| `/admin/category/edit/[id]` | Admin Form | `app/(root)/(admin)/admin/category/edit/[id]/page.tsx` | Client | Administrator | Form to update category name, slug, and sub-types |
| `/admin/product` | Admin CRUD | `app/(root)/(admin)/admin/product/page.tsx` | Client | Administrator | Product catalog management table with media thumbnails, pricing, and category filters |
| `/admin/product/add` | Admin Form | `app/(root)/(admin)/admin/product/add/page.tsx` | Client | Administrator | Product creation form: CKEditor rich description, pricing, category picker, image selector |
| `/admin/product/edit/[id]` | Admin Form | `app/(root)/(admin)/admin/product/edit/[id]/page.tsx` | Client | Administrator | Product edit form with preloaded attributes |
| `/admin/product-variant` | Admin CRUD | `app/(root)/(admin)/admin/product-variant/page.tsx` | Client | Administrator | Product variant management table: SKU, size, color, MRP, selling price, image gallery |
| `/admin/product-variant/add` | Admin Form | `app/(root)/(admin)/admin/product-variant/add/page.tsx` | Client | Administrator | Variant creation form bound to parent product |
| `/admin/product-variant/edit/[id]` | Admin Form | `app/(root)/(admin)/admin/product-variant/edit/[id]/page.tsx` | Client | Administrator | Variant edit form |
| `/admin/coupon` | Admin CRUD | `app/(root)/(admin)/admin/coupon/page.tsx` | Client | Administrator | Promotional coupon table with discount percentages and validity dates |
| `/admin/coupon/add` | Admin Form | `app/(root)/(admin)/admin/coupon/add/page.tsx` | Client | Administrator | Form to create discount coupons with expiration and minimum spend limits |
| `/admin/coupon/edit/[id]` | Admin Form | `app/(root)/(admin)/admin/coupon/edit/[id]/page.tsx` | Client | Administrator | Coupon edit form |
| `/admin/orders` | Admin Inquiries | `app/(root)/(admin)/admin/orders/page.tsx` | Client | Administrator | Tech Pack inquiry management table: client details, product type, deadline, specification modal |
| `/admin/customers` | Admin Directory | `app/(root)/(admin)/admin/customers/page.tsx` | Client | Administrator | Customer directory table: email verification, name, phone, registration date |
| `/admin/media` | Admin Media | `app/(root)/(admin)/admin/media/page.tsx` | Client | Administrator | Visual Cloudinary asset manager with infinite scroll and upload widget |
| `/admin/media/edit/[id]` | Admin Form | `app/(root)/(admin)/admin/media/edit/[id]/page.tsx` | Client | Administrator | Editor for media asset alt text and internal title |
| `/admin/review` | Admin Moderation | `app/(root)/(admin)/admin/review/page.tsx` | Client | Administrator | Customer review moderation table with star ratings, product references, and delete actions |
| `/admin/trash` | Admin Recycle Bin | `app/(root)/(admin)/admin/trash/page.tsx` | Client | Administrator | Multi-entity soft delete repository for restoring or permanently destroying entities |
| `/robots.txt` | Special Next.js | `app/robots.ts` | Server Generated | Public | Web crawler instructions disallowing `/admin/`, `/dashboard/`, `/api/`, `/auth/` |
| `/sitemap.xml` | Special Next.js | `app/sitemap.ts` | Dynamic Server | Public | Dynamic XML sitemap querying active product slugs from MongoDB hourly |

---

## 6. Page-by-Page Detailed Documentation

### Homepage
- **URL**: `/`
- **Source File**: `app/page.tsx`
- **Purpose**: Serve as the flagship storefront landing experience for SLOTS SPORTSWEAR, establishing brand credibility, showcasing core sportswear collections, presenting manufacturing performance metrics, and offering instant inquiry pathways.
- **Business Role**: Prime conversion gateway for sports brands, wholesale buyers, and athletic apparel startups. Educates visitors on OEM capabilities and moves leads into the Tech Pack or contact funnel.
- **Main Sections**:
  1. HeroSection: Autoplaying factory/athletic video backdrop, typography reveal, new arrivals ticker, and social proof trust score.
  2. CompanyStats: 4-metric animated statistical counters (Customers, Products, Orders, Average Rating).
  3. HorizontalCategories: 2x2 grid highlighting Men, Women, Gloves, and Gears collections.
  4. NewArrival: Horizontal scrolling showcase of recent garment designs.
  5. PopularCategories: Smooth scrolling carousel of specific category silhouettes with responsive width cards.
  6. OurServices: Pinned split-screen presentation highlighting 7 OEM manufacturing capabilities with synchronized image reel.
  7. Whychooseus: Embedded 4-pillar differentiator (Low MOQ, Quality Assurance, Global Logistics, Production Speed).
  8. HomeMiddle: Brand narrative storytelling section with animated image width expansion.
  9. HomeContact: Quick inquiry form capturing name, contact handle, and message.
- **Components Used**: `HeroSection`, `CompanyStats`, `HorizontalCategories`, `NewArrival`, `PopularCategories`, `OurServices`, `Whychooseus`, `HomeMiddle`, `HomeContact`, `Heading`, `Icon`, `TransitionButton`.
- **Data Sources**: Client-side fetch to `/api/products/new-arrivals` on mount via GSAP lifecycle; secondary fetches to `/api/public/stats` (in `CompanyStats`) and `/api/public/users` (in `HeroSection`).
- **Assets Used**: `public/videos/hero.mp4`, `public/images/hero.jpeg`, `public/images/mens.jpeg`, `public/images/womens.jpeg`, `public/images/gloves.jpeg`, `public/images/gears.jpeg`, `public/images/box.png`, `public/images/guarantee.png`, `public/images/price-tag.png`, `public/images/schedule.png`, remote Cloudinary and Pinterest images.
- **Buttons / CTAs**: "Explore Shop" / "Browse Collection" buttons routing to `/shop`, category cards routing to `/shop?category=<slug>`, submit inquiry button in `HomeContact`.
- **Internal Links**: `/shop`, `/shop?category=men`, `/shop?category=women`, `/shop?category=gloves`, `/shop?category=gears`, `/about`, `/contact`.
- **External Links**: None within page body (footer links handled globally).
- **Forms**: Quick Inquiry Form in `HomeContact` (submits `firstName`, `contact`, `inquiry` to `/api/subscribe`).
- **Interactions**:
  - Split-character GSAP stagger headline reveal.
  - Video play/pause toggle.
  - Interactive star rating display.
  - Hover zoom on category cards.
  - Pinned scroll-driven vertical image train in `OurServices`.
  - Expanding full-width image curtain reveal in `HomeMiddle`.
- **Responsive Behavior**: Hero video aspect adapts cleanly; categories shift from 2-column to 1-column on mobile (<768px); `OurServices` converts from vertical split-screen to horizontal scrolling layout.
- **SEO**: Inherits root metadata from `app/layout.tsx`. Includes `Organization` structured data.
- **Important Logic**: Uses `useLoader().setIsReady(true)` inside the fetch callback to dismiss the initial full-screen page transition curtain once new arrivals data is loaded.
- **Dependencies**: `gsap`, `@gsap/react`, `axios`, `react-hot-toast`, `react-icons`.
- **Notes**: Does not perform direct server-side database querying; relies on client-side API hydration.

---

### About Us
- **URL**: `/about`
- **Source File**: `app/about/page.tsx` & `app/about/AboutClient.tsx`
- **Purpose**: Articulate SLOTS SPORTSWEAR's manufacturing infrastructure, engineering precision, Pakistan factory heritage, and complete OEM/ODM production methodology.
- **Business Role**: Overcomes client hesitation regarding overseas apparel manufacturing by demonstrating transparent, ISO-certified processes and rapid sample turnarounds.
- **Main Sections**:
  1. Hero: Editorial header "The Architecture of Modern Sportswear".
  2. Brand Ethos: High-density narrative explaining fabric selection, laser cutting, and stitch integrity.
  3. HowItWorks: Pinned 4-step interactive timeline explaining the journey from Tech Pack to USA delivery.
  4. Facility Visuals: High-resolution showcase of cutting tables, automated sewing machines, and inspection stations.
- **Components Used**: `AboutClient`, `HowItWorks`, `Heading`, `FormattedTitle`, `TransitionButton`.
- **Data Sources**: Static structured content embedded within component files; no external API calls required.
- **Assets Used**: `public/images/about.jpeg`, curated remote Pinterest imagery of textile production lines.
- **Buttons / CTAs**: "Start Your Project" and "Submit Tech Pack" buttons linking directly to `/contact#teckpack`.
- **Internal Links**: `/contact`, `/shop`, `/story`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**:
  - GSAP `ScrollTrigger` pinning the `HowItWorks` section for `steps.length * 350vh` of scroll depth.
  - Smooth animated pill capsule tracking active step headers.
  - Accordion expansion of step descriptions with continuous clip-path reveal of corresponding process photography.
- **Responsive Behavior**: On viewports < 1024px, the pinned step animation gracefully transitions into a sequential vertical stack with scroll-fade effects.
- **SEO**: Page metadata configured via Next.js metadata API (title: "About Us · Slots Sports Wear").
- **Important Logic**: Utilizes GSAP timeline scrub (`scrub: 3`) and automatic snap-to-step points (`snapTo: 1 / 3`) for tactile feedback during scrolling.
- **Dependencies**: `gsap`, `@gsap/react`, `ScrollTrigger`.
- **Notes**: High visual impact section that directly establishes OEM capability.

---

### Catalog / Shop
- **URL**: `/shop`
- **Source File**: `app/shop/page.tsx` & `app/components/ShopClient.tsx`
- **Purpose**: Comprehensive e-commerce catalog allowing users to discover, filter, search, and paginate through all active garments, silhouettes, and collections.
- **Business Role**: Showcases available styles that clients can order off-the-shelf or customize with their own branding, logos, colorways, and tech specifications.
- **Main Sections**:
  1. ShopHero: Minimalist header displaying current catalog breadcrumb and collection title.
  2. ShopBreadcrumb: Navigation trail with home link and active category indications.
  3. ShopFilters (Sidebar Drawer): Category list accordion, garment types, unique branding tag filters, and "On Sale" toggle.
  4. Product Grid: Responsive multi-column layout of `ProductItem` cards with image hover swapping and price displays.
  5. Pagination Controls: Numeric page navigation with next/previous arrow triggers.
- **Components Used**: `ShopClient`, `ShopHero`, `ShopBreadcrumb`, `ShopFilters`, `ProductItem`.
- **Data Sources**:
  - Initial SSR: Server query via `app/shop/page.tsx` executing parallel Mongoose `find()` for categories, latest 20 products, unique branding tags, and total count.
  - Dynamic Client Filtering: `axios.get('/api/public/products', { params })` triggering on query param updates.
- **Assets Used**: `public/images/shophero.jpeg`, Cloudinary product media URLs.
- **Buttons / CTAs**: "Clear All Filters", "Apply Filters", pagination numbers, product cards.
- **Internal Links**: `/product/[slug]`, `/shop?category=<slug>`, `/shop?sort=<type>`.
- **External Links**: None.
- **Forms**: Search input within sidebar filter drawer; checkbox controls for tags and sale items.
- **Interactions**:
  - GSAP staggered card rise (`y: 30 -> 0`) upon product state updates.
  - Accordion expand/collapse for taxonomy filter groups.
  - URL query synchronization without page reload via Next.js router.
- **Responsive Behavior**: Desktop displays a fixed 280px filter sidebar with 3-column product grid; mobile collapses filters into a slide-over modal drawer triggered by a floating button.
- **SEO**: Dynamic title "Shop All · Slots Sports Wear", descriptive meta tags for search indexation.
- **Important Logic**: `ShopClient` checks `isFirstRender` ref to prevent unnecessary redundant client fetches on initial hydration when SSR data is already present.
- **Dependencies**: `mongoose`, `axios`, `gsap`, `@gsap/react`, `lucide-react`.
- **Notes**: All pricing displayed represents sample or base production pricing; wholesale discounts apply upon Tech Pack inquiry.

---

### Product Detail Page
- **URL**: `/product/[slug]`
- **Source File**: `app/product/[slug]/page.tsx` & `app/product/[slug]/ProductClient.tsx`
- **Purpose**: In-depth garment inspection page presenting multi-angle photography, variant options (colors and sizes), fabric narrative, verified reviews, and inquiry initiation.
- **Business Role**: Prime product consideration and conversion point where prospective apparel brands inspect prototype craftsmanship and transition to submitting sample orders.
- **Main Sections**:
  1. ProductGallery: Vertical thumbnail carousel, primary zoomable photography container, and discount badge.
  2. ProductInfo: Garment title, category tags, dual-currency pricing, DHL/FedEx guarantee, color switcher pills, size buttons, story behind the craft, and the primary "Add to Wardrobe" CTA.
  3. ReviewCollective: Summary rating score, 5-star distribution breakdown, and verified customer testimonials.
  4. GalleryMarquee: Fullscreen modal lightbox showcasing all high-res photography in continuous marquee scroll.
  5. Curated Affinity / Related Products: 4-column grid of complementary garments.
  6. ReviewModal: Interactive 5-star review submission modal dialog.
- **Components Used**: `ProductClient`, `ProductGallery`, `ProductInfo`, `ReviewCollective`, `ReviewModal`, `GalleryMarquee`, `ProductItem`, `JsonLd`, `Heading`.
- **Data Sources**:
  - Server: Parallel queries in `getProductData(slug)` fetching `Product`, populating `Media` and `Category`, querying `Review` collection, matching user IDs against `User` collection in `USERS` database, fetching variants, and loading 12 related products.
  - Client Review Submission: `axios.post('/api/review/create')`.
- **Assets Used**: Cloudinary remote image assets; fallback placeholder `/placeholder.png`.
- **Buttons / CTAs**:
  - "Add to Wardrobe": Navigates to `/contact?type=<category>&slug=<slug>#teckpack`.
  - Color selector pills: Updates active variant and switches displayed gallery images.
  - Size selector circles: Selects garment sizing dimensions.
  - "Write a Review": Opens `ReviewModal`.
  - Fullscreen zoom icon: Opens `GalleryMarquee`.
- **Internal Links**: `/contact?type=...`, `/shop`, `#review` anchor.
- **External Links**: None.
- **Forms**: Review submission form inside `ReviewModal` (rating, title, comment).
- **Interactions**:
  - GSAP pre-transition entrance (left image section slides `x: -80 -> 0`, right info elements stagger `y: 40 -> 0`).
  - ScrollTrigger reveals for related products.
  - Interactive star rating picker with hover scaling.
- **Responsive Behavior**: Desktop uses sticky 2-column layout (gallery 60%, info 40%); tablet/mobile stacks gallery above product info with horizontal thumbnail swiping.
- **SEO**: Server-side `generateMetadata` generating dynamic OpenGraph title, description, and high-res image previews. Injects Google Product JSON-LD schema with pricing and aggregate rating.
- **Important Logic**:
  - Selecting a color variant dynamically filters available sizes belonging specifically to that color.
  - Variant image arrays override parent product media when selected.
  - "Add to Wardrobe" bypasses standard e-commerce cart, routing directly to the custom manufacturing Tech Pack form.
- **Dependencies**: `mongoose`, `better-auth`, `axios`, `gsap`, `react-hot-toast`, `react-icons`.
- **Notes**: Exemplifies the B2B lead-generation architecture disguised as a luxury catalog.

---

### Cart / Wardrobe Page
- **URL**: `/cart`
- **Source File**: `app/cart/page.tsx`
- **Purpose**: Informational apology and navigation detour page explaining that direct e-commerce checkout is temporarily in development.
- **Business Role**: Prevents dead-end user drop-off if a customer attempts to access standard shopping bag flows, directing them toward catalog exploration or direct sales contact.
- **Main Sections**:
  1. Status Indicator: Pulsing circular graphic with status badge "Status: In Development".
  2. Headline: "Cart Experience Coming Soon".
  3. Explanatory Note: Transparent explanation that checkout is being refined.
  4. Call-to-Action Buttons: Dual links routing to `/shop` and `/contact`.
  5. Footer Signature: "Slots Sports Wear · Manufacturing Excellence".
- **Components Used**: `FormattedTitle`, `Link`.
- **Data Sources**: Completely static server component; zero database dependencies.
- **Assets Used**: None.
- **Buttons / CTAs**: "Explore shop" (links to `/shop`), "Get in touch" (links to `/contact`).
- **Internal Links**: `/shop`, `/contact`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: CSS pulsing dot animation.
- **Responsive Behavior**: Centers cleanly on all screen viewports; CTA buttons stack vertically on mobile screens.
- **SEO**: Explicit metadata: `title: 'Cart · Slots Sports Wear'`.
- **Important Logic**: None.
- **Dependencies**: `next/link`, `next`.
- **Notes**: Serves as concrete evidence that SLOTS SPORTSWEAR operates on a custom inquiry and Tech Pack model rather than immediate credit card checkout.

---

### Contact & Tech Pack Submission
- **URL**: `/contact`
- **Source File**: `app/contact/page.tsx` & `app/contact/ContactClient.tsx`
- **Purpose**: Primary conversion terminal for the entire business. Allows prospective clients and established brands to specify custom garment requirements, target deadlines, order quantities, and tech pack details.
- **Business Role**: High-value lead acquisition. Every submission generates a structured record in the `TechPack` database collection and fires an immediate email dispatch to `ADMIN_EMAIL`.
- **Main Sections**:
  1. Header: "Start Your Production" with subtext explaining 48-hour response turnaround.
  2. Direct Communication Channels: Phone, email, WhatsApp, and factory address.
  3. Tech Pack Submission Form: Comprehensive input fields for specifications.
  4. Social Media Channels: Direct links to Instagram, Facebook, Medium, and Pinterest.
- **Components Used**: `ContactClient`, `Heading`, `Icon`.
- **Data Sources**:
  - Server: Pre-fetches all active categories from `Category` model to populate garment type selector.
  - Client URL Parameters: Reads `?type=` and `?slug=` from router to prefill product type and slug fields if arriving from a product page.
- **Assets Used**: `public/icons/arrow-right-01.svg`, social icons.
- **Buttons / CTAs**: "Submit Tech Pack" button with loading spinner state.
- **Internal Links**: Prefilled anchors (`#teckpack`).
- **External Links**: Social media channel links.
- **Forms**: Tech Pack Form submitting to `POST /api/contact/submit`:
  - `name`: Client Full Name (required)
  - `email`: Work / Brand Email (required)
  - `company`: Brand or Organization Name (optional)
  - `productType`: Garment Category / Type (required)
  - `productSlug`: Specific Prototype Slug (optional)
  - `quantity`: Order Quantity in units (required)
  - `deadline`: Target Delivery Date (required)
  - `customizationDetails`: Technical notes on fabric, GSM, colors, sizing, printing (required)
- **Interactions**:
  - GSAP `fade-up` staggered entrance for form controls.
  - Toast confirmation on submission: `Tech Pack successfully submitted to Slots Sports Wear.`
  - Form state reset upon success.
- **Responsive Behavior**: 2-column layout on desktop (contact information on left, form on right); stacks vertically on tablet and mobile viewports.
- **SEO**: Metadata configured (title: "Contact Us · Slots Sports Wear").
- **Important Logic**: Captures product slug and category passed from product detail pages, ensuring continuous context when clients click "Add to Wardrobe".
- **Dependencies**: `axios`, `react-hot-toast`, `gsap`, `@gsap/react`, `react-icons`.
- **Notes**: Submissions appear in the Admin Panel under the "Orders" view (`/admin/orders`).

---

### Our Story
- **URL**: `/story`
- **Source File**: `app/story/page.tsx`
- **Purpose**: In-depth brand narrative chronicling the founding, evolution, and future trajectory of SLOTS SPORTSWEAR from 2018 to 2026.
- **Business Role**: Builds enterprise trust and brand prestige by communicating factory heritage, skilled artisan employment, and ethical production practices.
- **Main Sections**:
  1. Hero: "Est. 2018 · Punjab, Pakistan" headline with high-impact introduction.
  2. Factory Panorama: Full-width photographic showcase of the manufacturing facility.
  3. Mission Statement: "Manufacturing Excellence, Without Compromise".
  4. Chronological Milestones: Interactive vertical timeline detailing achievements (2018 Workshop, 2020 Global Expansion, 2022 Tech Pack Integration, 2024 Capacity Milestone, 2026 Innovation).
  5. Core Manufacturing Values: 4 foundational pillars (Craftsmanship, Transparency, Sustainability, Partnership).
  6. Direct CTA: Prompt to initiate custom production runs.
- **Components Used**: `FormattedTitle`, `Link`.
- **Data Sources**: Static server component; zero runtime database queries.
- **Assets Used**: High-resolution factory photography via remote Pinterest CDN.
- **Buttons / CTAs**: "Start Your Order" linking to `/contact`, "View Collections" linking to `/shop`.
- **Internal Links**: `/contact`, `/shop`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: CSS hover transitions on timeline cards and values.
- **Responsive Behavior**: Timeline alternates left/right on desktop and condenses into a clean linear stack on mobile screens.
- **SEO**: Comprehensive metadata including OpenGraph image tags and factory description.
- **Important Logic**: None.
- **Dependencies**: `next/link`, `next`.
- **Notes**: Authoritatively establishes the 2018 founding date and Punjab, Pakistan base of operations.

---

### Frequently Asked Questions (FAQ)
- **URL**: `/faq`
- **Source File**: `app/faq/page.tsx`
- **Purpose**: Authoritative customer knowledge base clarifying operational parameters, order rules, testing standards, and payment terms.
- **Business Role**: Deflects repetitive support inquiries and accelerates sales velocity by pre-emptively answering commercial questions.
- **Main Sections**:
  1. Ordering & MOQ: 50-piece minimum per style, multi-style mixing allowances.
  2. Sampling & Design: 7–14 day sample turnaround, tech pack assistance, prototyping fees.
  3. Production & Quality: AQL 2.5 inspection protocols, ISO certification, performance fabric sourcing, 50,000+ monthly unit volume.
  4. Shipping & Delivery: DHL/FedEx air freight (5–10 days), ocean freight (20–35 days), commercial invoices, import duty liabilities.
  5. Payment: Bank wire transfer (T/T), PayPal, Western Union; 30% deposit with 70% balance prior to bill of lading dispatch.
- **Components Used**: `FormattedTitle`, `Link`.
- **Data Sources**: Static server component.
- **Assets Used**: None.
- **Buttons / CTAs**: "Ask a Question" linking to `/contact`.
- **Internal Links**: `/contact`, `/policy`, `/refund`, `/shipping`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Categorized grid structure with responsive card containers.
- **Responsive Behavior**: 2-column card layout on desktop collapsing to 1-column on mobile viewports.
- **SEO**: Title: "FAQs — Slots Sports Wear"; description targeting low MOQ, sampling, and Pakistan sportswear manufacturing terms.
- **Important Logic**: None.
- **Dependencies**: `next/link`, `next`.
- **Notes**: Crucial reference for verifying factual business rules.

---

### Privacy Policy
- **URL**: `/policy`
- **Source File**: `app/policy/page.tsx`
- **Purpose**: Formal legal disclosure regarding user privacy, data collection, cookie usage, authentication session storage, and third-party services.
- **Business Role**: Compliance with international data protection regulations (GDPR/CCPA) for international e-commerce and lead generation.
- **Main Sections**: Information Collected (contact data, tech packs, account credentials), Use of Information, Cookies & Session Storage, Data Security, Third-Party Disclosures (Cloudinary, Better-Auth, Nodemailer), Client Rights.
- **Components Used**: `FormattedTitle`, `Link`.
- **Data Sources**: Static server component.
- **Assets Used**: None.
- **Buttons / CTAs**: None.
- **Internal Links**: `/contact`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Static reading view.
- **Responsive Behavior**: Clean single-column constrained typography layout.
- **SEO**: Metadata configured for legal indexing.
- **Important Logic**: None.
- **Dependencies**: `next`.
- **Notes**: Standard legal disclosure.

---

### Refund & Exchange Policy
- **URL**: `/refund`
- **Source File**: `app/refund/page.tsx`
- **Purpose**: Legal terms governing product returns, sampling replacements, defect compensation, and dispute resolution for custom-manufactured apparel.
- **Business Role**: Mitigates commercial risk while assuring international wholesale clients of quality guarantees.
- **Main Sections**: 7-Day Inspection Window, Custom Order Policy (non-refundable once production commences), Defective Goods Replacement Guarantee, Sample Approval Precedent, Shipping Liabilities.
- **Components Used**: `FormattedTitle`, `Link`.
- **Data Sources**: Static server component.
- **Assets Used**: None.
- **Buttons / CTAs**: "Contact Support" linking to `/contact`.
- **Internal Links**: `/contact`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Static legal reading layout.
- **Responsive Behavior**: Responsive text margins and typography scaling.
- **SEO**: Standard legal indexing.
- **Important Logic**: Details the policy that approved physical samples serve as the binding quality benchmark for bulk manufacturing.
- **Dependencies**: `next`.
- **Notes**: Essential reference for B2B contract terms.

---

### Shipping & Logistics Policy
- **URL**: `/shipping`
- **Source File**: `app/shipping/page.tsx`
- **Purpose**: Complete logistical disclosure covering shipping carriers, lead times, international freight routes, tracking mechanisms, and customs duties.
- **Business Role**: Provides clear delivery expectations for foreign buyers ordering apparel from Pakistan.
- **Main Sections**: Carrier Partnerships (DHL Express, FedEx, Air Cargo, Ocean Freight), Delivery Timelines (Air: 5–10 business days; Sea: 20–35 days), Customs & Duties liabilities, Tracking Information, Packaging Standards.
- **Components Used**: `FormattedTitle`, `Link`.
- **Data Sources**: Static server component.
- **Assets Used**: None.
- **Buttons / CTAs**: "Inquire About Freight" linking to `/contact`.
- **Internal Links**: `/contact`, `/faq`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Static layout.
- **Responsive Behavior**: Responsive table and card layouts.
- **SEO**: Indexed legal metadata.
- **Important Logic**: Explicitly notes that international buyers bear responsibility for local customs clearance and import tariffs.
- **Dependencies**: `next`.
- **Notes**: Confirms international logistics protocols.

---

### Terms of Service
- **URL**: `/terms`
- **Source File**: `app/terms/page.tsx`
- **Purpose**: Binding legal agreement establishing intellectual property ownership, manufacturing contracts, payment schedules, and liability limitations.
- **Business Role**: Protects SLOTS SPORTSWEAR's manufacturing operations and guarantees client intellectual property protection for proprietary Tech Packs.
- **Main Sections**: Acceptance of Terms, Manufacturing Contracts, Intellectual Property (client retains all design ownership), Payment Schedules (30% upfront, 70% prior to dispatch), Limitation of Liability, Governing Jurisdiction (Pakistan).
- **Components Used**: `FormattedTitle`, `Link`.
- **Data Sources**: Static server component.
- **Assets Used**: None.
- **Buttons / CTAs**: None.
- **Internal Links**: `/contact`, `/policy`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Static legal reading layout.
- **Responsive Behavior**: Fluid typographic scaling.
- **SEO**: Standard legal indexing.
- **Important Logic**: Confirms that submitted Tech Packs remain confidential and the exclusive intellectual property of the submitting client.
- **Dependencies**: `next`.
- **Notes**: Core commercial contract terms.

---

### Toast Sandbox
- **URL**: `/test-toast`
- **Source File**: `app/test-toast/page.tsx`
- **Purpose**: Internal developer interface for triggering and testing custom macOS frosted glass toast notifications.
- **Business Role**: Quality assurance utility for notification UX and glassmorphic aesthetic consistency.
- **Main Sections**: Interactive button controls for Success, Error, and Info toasts.
- **Components Used**: None (uses `react-hot-toast` directly).
- **Data Sources**: Static client triggers.
- **Assets Used**: None.
- **Buttons / CTAs**: "Trigger Success", "Trigger Error", "Trigger Info".
- **Internal Links**: None.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Button clicks trigger animated `toast.success`, `toast.error`, and default toasts displaying the `.macos-toast` styling.
- **Responsive Behavior**: Centered sandbox card.
- **SEO**: Unindexed developer utility.
- **Important Logic**: Demonstrates the CSS overrides applied to `react-hot-toast` in `app/globals.css`.
- **Dependencies**: `react-hot-toast`.
- **Notes**: Development / test artifact.

---

### Customer Dashboard
- **URL**: `/dashboard`
- **Source File**: `app/dashboard/page.tsx`
- **Purpose**: Centralized account management portal for authenticated clients.
- **Business Role**: Client retention, profile oversight, and quick access to catalog and editing features.
- **Main Sections**:
  1. Profile Hero: Member avatar, full name, registered email address, "Active Member" status badge, and sign-out button.
  2. Quick Action Links: Links to Catalog, Admin Panel (if authorized), and Profile Edit.
  3. Account Overview Card: Phone number, member since timestamp, and verification status.
- **Components Used**: `TransitionButton`, `Logout`.
- **Data Sources**: Server session inspected via `auth.api.getSession({ headers: await headers() })`.
- **Assets Used**: Fallback avatar image; user Cloudinary avatar if present.
- **Buttons / CTAs**: "Edit Profile" (routes to `/profile-edit`), "Shop Collection" (routes to `/shop`), "Log Out" (Better-Auth sign out).
- **Internal Links**: `/shop`, `/profile-edit`, `/admin/dashboard`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Interactive button transitions via `useLoader`.
- **Responsive Behavior**: Stacks profile hero elements vertically on mobile screens.
- **SEO**: Protected user view (`robots: { index: false, follow: false }`).
- **Important Logic**: Server-side redirect to `/auth/signin` if no authenticated session exists. Generates 2-letter fallback initials if user has no avatar image.
- **Dependencies**: `better-auth`, `next/navigation`, `react-icons`.
- **Notes**: Gated behind customer authentication.

---

### Profile Edit Page
- **URL**: `/profile-edit`
- **Source File**: `app/profile-edit/page.tsx`
- **Purpose**: Client profile editing interface allowing users to update their display name, phone number, and avatar photo.
- **Business Role**: Ensures client contact information remains current for manufacturing communications and invoice generation.
- **Main Sections**:
  1. Avatar Preview & Upload Trigger: Visual circle with camera overlay for uploading new profile pictures.
  2. Profile Form: Inputs for full name and contact phone number.
  3. Action Toolbar: Save changes button and navigation link back to dashboard.
- **Components Used**: `zSchema`, `useFetch`, `useForm`.
- **Data Sources**:
  - Initial: `useFetch('/api/customers/get')`.
  - Mutation: Direct signed Cloudinary upload followed by `axios.put('/api/customers/update')`.
- **Assets Used**: User avatar previews.
- **Buttons / CTAs**: "Upload Photo", "Save Changes", "Back to Dashboard".
- **Internal Links**: `/dashboard`.
- **External Links**: None.
- **Forms**: Profile edit form validated via Zod (`zSchema.pick({ image, name, phone })`).
- **Interactions**:
  - Direct file picker trigger for avatar updates.
  - Client-side cryptographic signing request to `/api/cloudinary-signature` for direct-to-cloud image upload.
  - GSAP card and input entry animations.
  - Success toast upon profile update.
- **Responsive Behavior**: Mobile-friendly centered form card.
- **SEO**: Protected user view.
- **Important Logic**: Uploads raw image file directly to Cloudinary using signed upload parameters before submitting the returned `secure_url` to MongoDB.
- **Dependencies**: `react-hook-form`, `zod`, `@hookform/resolvers`, `axios`, `react-hot-toast`, `gsap`.
- **Notes**: Extends default Better-Auth user schema via `myPlugin`.

---

### Sign In
- **URL**: `/auth/signin`
- **Source File**: `app/auth/signin/page.tsx`
- **Purpose**: Authentication doorway for existing clients and administrators.
- **Business Role**: Secures account access and gates administrative capabilities.
- **Main Sections**: Minimalist credentials card (email, password), "Remember Me" checkbox, forgot password link, sign-up redirect.
- **Components Used**: `authClient`, `Input`, `Button`.
- **Data Sources**: Better Auth API endpoint `/api/auth/sign-in/email`.
- **Assets Used**: Logo visual in header.
- **Buttons / CTAs**: "Sign In" button with loading state, "Create Account" link, "Forgot Password?" link.
- **Internal Links**: `/auth/signup`, `/auth/forget-password`, `/dashboard`, `/admin/dashboard`.
- **External Links**: None.
- **Forms**: Sign-in form capturing `email` and `password`.
- **Interactions**: Error toasts for invalid credentials or unverified email addresses.
- **Responsive Behavior**: Centered responsive authentication card.
- **SEO**: Unindexed (`robots: { index: false, follow: false }`).
- **Important Logic**: Auth layout automatically intercepts and redirects authenticated users away from this page. Triggers admin login notification email in background.
- **Dependencies**: `better-auth/react`, `react-hot-toast`.
- **Notes**: Email verification is mandatory before access is granted.

---

### Sign Up
- **URL**: `/auth/signup`
- **Source File**: `app/auth/signup/page.tsx`
- **Purpose**: Account creation interface for new clients, athletic brands, and wholesale buyers.
- **Business Role**: Captures prospective buyer credentials and initiates email verification workflow.
- **Main Sections**: Registration card (full name, email, phone number, password, confirm password), terms acceptance disclaimer.
- **Components Used**: `authClient`, `Input`, `Button`.
- **Data Sources**: Better Auth API endpoint `/api/auth/sign-up/email`.
- **Assets Used**: Logo graphic.
- **Buttons / CTAs**: "Create Account" button, "Sign In" redirect link.
- **Internal Links**: `/auth/signin`, `/auth/verifyemail`, `/terms`.
- **External Links**: None.
- **Forms**: Sign-up form submitting `name`, `email`, `password`, and custom `phone`.
- **Interactions**: Form validation; triggers automated Nodemailer email with verification link upon submission.
- **Responsive Behavior**: Centered card adapting to all screens.
- **SEO**: Unindexed.
- **Important Logic**: Custom Better-Auth hook passes `phone` to MongoDB. Database hook triggers an immediate admin alert email notifying `ADMIN_EMAIL` of the new registration.
- **Dependencies**: `better-auth/react`, `react-hot-toast`.
- **Notes**: Auto-signin occurs once email link is verified.

---

### Forgot Password
- **URL**: `/auth/forget-password`
- **Source File**: `app/auth/forget-password/page.tsx`
- **Purpose**: Self-serve password recovery initiation form.
- **Business Role**: Minimizes support overhead when clients lose password access.
- **Main Sections**: Single-field input card requesting registered email address.
- **Components Used**: `authClient`, `Input`, `Button`.
- **Data Sources**: Better Auth `/api/auth/forget-password`.
- **Assets Used**: None.
- **Buttons / CTAs**: "Send Reset Link", "Back to Sign In".
- **Internal Links**: `/auth/signin`.
- **External Links**: None.
- **Forms**: Single email input form.
- **Interactions**: Submits email and renders success message confirming dispatch of recovery email.
- **Responsive Behavior**: Centered modal layout.
- **SEO**: Unindexed.
- **Important Logic**: Triggers `sendResetPassword` callback in `lib/auth.ts`, sending styled HTML email via Nodemailer.
- **Dependencies**: `better-auth/react`, `react-hot-toast`.
- **Notes**: Rate-limited by Better-Auth.

---

### Reset Password
- **URL**: `/auth/reset-password`
- **Source File**: `app/auth/reset-password/page.tsx`
- **Purpose**: Interface for setting a new account password following email link verification.
- **Business Role**: Completes user password recovery flow.
- **Main Sections**: New password and password confirmation inputs.
- **Components Used**: `authClient`, `Input`, `Button`.
- **Data Sources**: Validates cryptographic reset token from query string via Better Auth.
- **Assets Used**: None.
- **Buttons / CTAs**: "Update Password".
- **Internal Links**: `/auth/signin`.
- **External Links**: None.
- **Forms**: New password form.
- **Interactions**: Submits new password; redirects to `/auth/signin` with success notification.
- **Responsive Behavior**: Centered card.
- **SEO**: Unindexed.
- **Important Logic**: Validates token expiry and matching password strings.
- **Dependencies**: `better-auth/react`, `react-hot-toast`.
- **Notes**: Tokens expire after set duration.

---

### Verify Email
- **URL**: `/auth/verifyemail`
- **Source File**: `app/auth/verifyemail/page.tsx`
- **Purpose**: Landing interface confirming email verification status.
- **Business Role**: Completes customer onboarding and unlocks access to authenticated areas.
- **Main Sections**: Confirmation icon, status message ("Email Verified Successfully"), and proceed button.
- **Components Used**: `Button`.
- **Data Sources**: Better Auth token verification endpoint.
- **Assets Used**: None.
- **Buttons / CTAs**: "Proceed to Dashboard".
- **Internal Links**: `/dashboard`, `/auth/signin`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Automatic verification check upon URL load.
- **Responsive Behavior**: Centered card.
- **SEO**: Unindexed.
- **Important Logic**: Updates `emailVerified: true` on user record in `USERS` database.
- **Dependencies**: `better-auth`.
- **Notes**: Essential prerequisite for user and admin session validity.

---

### Admin Dashboard
- **URL**: `/admin/dashboard`
- **Source File**: `app/(root)/(admin)/admin/dashboard/page.tsx`
- **Purpose**: Central operational intelligence center for administrators.
- **Business Role**: Provides high-level visibility over inventory counts, client registrations, review volume, and weekly activity trends.
- **Main Sections**:
  1. Top Metric Cards: Total Products, Total Users, Total Reviews, Recent Users (Last 7 days).
  2. Weekly Activity Chart: Interactive bar chart (Recharts) visualizing daily user sign-ups and logins.
  3. Quick Actions: Fast links to add products, view orders, and inspect media.
- **Components Used**: `BreadCrumb`, `Card`, `BarChart` (Recharts), `ResponsiveContainer`.
- **Data Sources**: `axios.get('/api/dashboard/stats')` querying both `APPLICATION` and `USERS` databases.
- **Assets Used**: None.
- **Buttons / CTAs**: Timeframe toggles, entity navigation shortcuts.
- **Internal Links**: `/admin/product/add`, `/admin/orders`, `/admin/customers`, `/admin/media`.
- **External Links**: None.
- **Forms**: None.
- **Interactions**: Recharts tooltip hover effects and bar animations.
- **Responsive Behavior**: Grid adapts from 4 columns to 2 columns to 1 column based on screen width.
- **SEO**: Unindexed admin route.
- **Important Logic**: Secured by `adminAuth()`. Direct multi-database aggregation in API route.
- **Dependencies**: `recharts`, `axios`, `@mui/material`.
- **Notes**: Gated to `ADMIN_EMAIL`.

---

### Admin Category Management
- **URL**: `/admin/category`
- **Source File**: `app/(root)/(admin)/admin/category/page.tsx`
- **Purpose**: Administrative directory of all garment categories.
- **Business Role**: Allows managers to organize taxonomy, create new apparel lines, and soft-delete unused categories.
- **Main Sections**: Data table with columns for category name, slug, sub-types, actions toolbar (search, export CSV, trash link, add category button).
- **Components Used**: `BreadCrumb`, `DataTableWrapper`, `DataTable`, `DeleteAction`, `EditAction`.
- **Data Sources**: `/api/category` (supports pagination, search, sorting).
- **Assets Used**: None.
- **Buttons / CTAs**: "Add Category", "Export CSV", "Trash", edit/delete row actions.
- **Internal Links**: `/admin/category/add`, `/admin/category/edit/[id]`, `/admin/trash?type=category`.
- **External Links**: None.
- **Forms**: Search input within table toolbar.
- **Interactions**: Row selection for bulk soft-deletion; CSV export trigger via `export-to-csv`.
- **Responsive Behavior**: Horizontal table scroll with sticky column headers.
- **SEO**: Unindexed.
- **Important Logic**: Excludes soft-deleted items (`deletedAt: null`) unless trash view is active.
- **Dependencies**: `material-react-table`, `@tanstack/react-query`.
- **Notes**: Soft delete moves category to `/admin/trash`.

---

### Admin Add Category
- **URL**: `/admin/category/add`
- **Source File**: `app/(root)/(admin)/admin/category/add/page.tsx`
- **Purpose**: Interface for creating a new apparel category.
- **Business Role**: Expands the storefront catalog structure.
- **Main Sections**: Form with category name, auto-generating slug, and sub-type tag input.
- **Components Used**: `BreadCrumb`, `Input`, `Button`, `Card`.
- **Data Sources**: `POST /api/category/create`.
- **Assets Used**: None.
- **Buttons / CTAs**: "Create Category", "Cancel".
- **Internal Links**: `/admin/category`.
- **External Links**: None.
- **Forms**: Category creation form validated via Zod (`zSchema.pick({ name, slug, types })`).
- **Interactions**: Real-time slugification as user types category name.
- **Responsive Behavior**: Responsive form card.
- **SEO**: Unindexed.
- **Important Logic**: Enforces unique slug check before database insertion.
- **Dependencies**: `react-hook-form`, `zod`, `axios`, `react-hot-toast`.
- **Notes**: Requires verified admin session.

---

### Admin Edit Category
- **URL**: `/admin/category/edit/[id]`
- **Source File**: `app/(root)/(admin)/admin/category/edit/[id]/page.tsx`
- **Purpose**: Interface for modifying existing category details.
- **Business Role**: Maintains category naming and tag taxonomy accuracy.
- **Main Sections**: Preloaded form with name, slug, and tag array.
- **Components Used**: `BreadCrumb`, `Input`, `Button`.
- **Data Sources**: Preloaded via `GET /api/category/get/[id]`; saved via `PUT /api/category/update`.
- **Assets Used**: None.
- **Buttons / CTAs**: "Save Changes", "Back to Categories".
- **Internal Links**: `/admin/category`.
- **External Links**: None.
- **Forms**: Category update form.
- **Interactions**: Form reset on data load; success toast on submission.
- **Responsive Behavior**: Responsive layout.
- **SEO**: Unindexed.
- **Important Logic**: Checks for ID presence in route parameters.
- **Dependencies**: `react-hook-form`, `zod`, `axios`.
- **Notes**: Admin only.

---

### Admin Product Management
- **URL**: `/admin/product`
- **Source File**: `app/(root)/(admin)/admin/product/page.tsx`
- **Purpose**: Catalog inventory control panel.
- **Business Role**: Manage public product visibility, pricing, and category mapping.
- **Main Sections**: Table displaying thumbnail, product name, slug, category, MRP, selling price, discount, and action buttons.
- **Components Used**: `BreadCrumb`, `DataTableWrapper`, `DataTable`, `DeleteAction`, `EditAction`.
- **Data Sources**: `/api/product` (paginated, populated with Category and Media).
- **Assets Used**: Cloudinary thumbnails.
- **Buttons / CTAs**: "Add Product", "Trash", "Export CSV", row edit/delete.
- **Internal Links**: `/admin/product/add`, `/admin/product/edit/[id]`, `/admin/trash?type=product`.
- **External Links**: None.
- **Forms**: Search and filter toolbar.
- **Interactions**: Multi-select bulk soft delete; pagination controls.
- **Responsive Behavior**: Material React Table with column virtualization.
- **SEO**: Unindexed.
- **Important Logic**: Filters out products with `deletedAt !== null`.
- **Dependencies**: `material-react-table`, `@tanstack/react-query`.
- **Notes**: Central product index.

---

### Admin Add Product
- **URL**: `/admin/product/add`
- **Source File**: `app/(root)/(admin)/admin/product/add/page.tsx`
- **Purpose**: Comprehensive product creation workstation.
- **Business Role**: Introduces new garments into the public catalog.
- **Main Sections**:
  1. Basic Details: Product Name, Slug, Category Selector, Product Type.
  2. Pricing: MRP, Selling Price, Discount Percentage (auto-calculated).
  3. Description: CKEditor 5 rich text editor.
  4. Media: Asset picker modal connecting to Cloudinary media library.
  5. Tags: Apparel tagging array (e.g. "Limited", "Summer", "Gym").
- **Components Used**: `BreadCrumb`, `Editor` (CKEditor 5), `AddMedia`, `MediaModal`, `Input`, `Button`.
- **Data Sources**: `POST /api/product/create`; categories loaded from `/api/category`.
- **Assets Used**: Selected Cloudinary image previews.
- **Buttons / CTAs**: "Select Media", "Save Product", "Cancel".
- **Internal Links**: `/admin/product`.
- **External Links**: None.
- **Forms**: Multi-section product form validated via `zSchema`.
- **Interactions**: CKEditor dynamic import without SSR; media selection dialog; price discount math.
- **Responsive Behavior**: Responsive form grid.
- **SEO**: Unindexed.
- **Important Logic**: Automatically derives `discountPercentage` when MRP and selling price are entered.
- **Dependencies**: `ckeditor5`, `@ckeditor/ckeditor5-react`, `react-hook-form`, `zod`, `axios`.
- **Notes**: Media must be selected from the Media Library.

---

### Admin Edit Product
- **URL**: `/admin/product/edit/[id]`
- **Source File**: `app/(root)/(admin)/admin/product/edit/[id]/page.tsx`
- **Purpose**: Workspace for modifying existing product details and media associations.
- **Business Role**: Keeps product specifications, pricing, and descriptions accurate.
- **Main Sections**: Prepopulated form with basic details, pricing, CKEditor description, and media gallery.
- **Components Used**: `BreadCrumb`, `Editor`, `AddMedia`, `Input`, `Button`.
- **Data Sources**: `GET /api/product/get/[id]`; saved via `PUT /api/product/update`.
- **Assets Used**: Media image previews.
- **Buttons / CTAs**: "Update Product", "Cancel".
- **Internal Links**: `/admin/product`.
- **External Links**: None.
- **Forms**: Product update form.
- **Interactions**: CKEditor hydration; media add/remove pills.
- **Responsive Behavior**: Responsive layout.
- **SEO**: Unindexed.
- **Important Logic**: Populates existing media references from MongoDB.
- **Dependencies**: `ckeditor5`, `react-hook-form`, `zod`, `axios`.
- **Notes**: Admin only.

---

### Admin Product Variant Management
- **URL**: `/admin/product-variant`
- **Source File**: `app/(root)/(admin)/admin/product-variant/page.tsx`
- **Purpose**: Management table for all specific garment variants (color/size/SKU).
- **Business Role**: Controls stock keeping units, variant-specific pricing, and colorway galleries.
- **Main Sections**: Table columns for Parent Product, SKU, Color, Size, MRP, Selling Price, and Media previews.
- **Components Used**: `BreadCrumb`, `DataTableWrapper`, `DataTable`, `DeleteAction`, `EditAction`.
- **Data Sources**: `/api/product-variant` (populated with Product and Media).
- **Assets Used**: Cloudinary image thumbnails.
- **Buttons / CTAs**: "Add Variant", "Trash", "Export CSV", edit/delete.
- **Internal Links**: `/admin/product-variant/add`, `/admin/product-variant/edit/[id]`, `/admin/trash?type=product-variant`.
- **External Links**: None.
- **Forms**: Search and filter toolbar.
- **Interactions**: Multi-select bulk soft delete; pagination.
- **Responsive Behavior**: Responsive table layout.
- **SEO**: Unindexed.
- **Important Logic**: Bound to parent `Product` ObjectId references.
- **Dependencies**: `material-react-table`, `@tanstack/react-query`.
- **Notes**: Every variant must tie to an existing parent product.

---

### Admin Add Product Variant
- **URL**: `/admin/product-variant/add`
- **Source File**: `app/(root)/(admin)/admin/product-variant/add/page.tsx`
- **Purpose**: Interface for registering a new color or size variant under an existing product.
- **Business Role**: Allows multiple colorways and sizes for each catalog prototype.
- **Main Sections**: Parent product selector, SKU input, Color name, Size selector, MRP, Selling price, Media picker.
- **Components Used**: `BreadCrumb`, `AddMedia`, `Input`, `Button`.
- **Data Sources**: `POST /api/product-variant/create`; parent products loaded from `/api/product`.
- **Assets Used**: Cloudinary previews.
- **Buttons / CTAs**: "Create Variant", "Cancel".
- **Internal Links**: `/admin/product-variant`.
- **External Links**: None.
- **Forms**: Variant creation form validated via `zSchema`.
- **Interactions**: Media selector modal; price discount calculation.
- **Responsive Behavior**: Responsive form grid.
- **SEO**: Unindexed.
- **Important Logic**: Enforces unique SKU constraint across the database.
- **Dependencies**: `react-hook-form`, `zod`, `axios`.
- **Notes**: Required before colors/sizes appear on the public product page.

---

### Admin Edit Product Variant
- **URL**: `/admin/product-variant/edit/[id]`
- **Source File**: `app/(root)/(admin)/admin/product-variant/edit/[id]/page.tsx`
- **Purpose**: Interface for editing existing variant attributes.
- **Business Role**: Adjust variant pricing, SKU codes, and images.
- **Main Sections**: Preloaded variant form.
- **Components Used**: `BreadCrumb`, `AddMedia`, `Input`, `Button`.
- **Data Sources**: `GET /api/product-variant/get/[id]`; saved via `PUT /api/product-variant/update`.
- **Assets Used**: Media image previews.
- **Buttons / CTAs**: "Save Changes", "Cancel".
- **Internal Links**: `/admin/product-variant`.
- **External Links**: None.
- **Forms**: Variant update form.
- **Interactions**: Media updating; price modification.
- **Responsive Behavior**: Responsive layout.
- **SEO**: Unindexed.
- **Important Logic**: Preserves parent product association.
- **Dependencies**: `react-hook-form`, `zod`, `axios`.
- **Notes**: Admin only.

---

### Admin Coupon Management
- **URL**: `/admin/coupon`
- **Source File**: `app/(root)/(admin)/admin/coupon/page.tsx`
- **Purpose**: Management table for discount coupon codes.
- **Business Role**: Promotion management for wholesale discount incentives.
- **Main Sections**: Table displaying Coupon Code, Discount Percentage, Minimum Shopping Amount, Validity Date, and actions.
- **Components Used**: `BreadCrumb`, `DataTableWrapper`, `DataTable`, `DeleteAction`, `EditAction`.
- **Data Sources**: `/api/coupon` (supports pagination, search, soft delete).
- **Assets Used**: None.
- **Buttons / CTAs**: "Add Coupon", "Trash", "Export CSV", edit/delete.
- **Internal Links**: `/admin/coupon/add`, `/admin/coupon/edit/[id]`, `/admin/trash?type=coupon`.
- **External Links**: None.
- **Forms**: Search toolbar.
- **Interactions**: Bulk deletion; CSV export.
- **Responsive Behavior**: Responsive table.
- **SEO**: Unindexed.
- **Important Logic**: Soft-delete toggling.
- **Dependencies**: `material-react-table`, `@tanstack/react-query`.
- **Notes**: Currently coupons exist in the database model and admin CRUD, but direct cart checkout is in development.

---

### Admin Add Coupon
- **URL**: `/admin/coupon/add`
- **Source File**: `app/(root)/(admin)/admin/coupon/add/page.tsx`
- **Purpose**: Form for generating new promotional discount codes.
- **Business Role**: Configures promotional discounts.
- **Main Sections**: Coupon Code, Discount Percentage, Minimum Shopping Amount, Validity Date picker.
- **Components Used**: `BreadCrumb`, `Input`, `Button`, `DatePicker` (MUI).
- **Data Sources**: `POST /api/coupon/create`.
- **Assets Used**: None.
- **Buttons / CTAs**: "Create Coupon", "Cancel".
- **Internal Links**: `/admin/coupon`.
- **External Links**: None.
- **Forms**: Coupon creation form validated via `zSchema`.
- **Interactions**: Date picker interaction.
- **Responsive Behavior**: Responsive card.
- **SEO**: Unindexed.
- **Important Logic**: Enforces unique coupon code.
- **Dependencies**: `react-hook-form`, `zod`, `axios`, `@mui/x-date-pickers`.
- **Notes**: Admin only.

---

### Admin Edit Coupon
- **URL**: `/admin/coupon/edit/[id]`
- **Source File**: `app/(root)/(admin)/admin/coupon/edit/[id]/page.tsx`
- **Purpose**: Form for updating existing coupon parameters.
- **Business Role**: Modifies discount percentages or extends validity deadlines.
- **Main Sections**: Preloaded coupon fields.
- **Components Used**: `BreadCrumb`, `Input`, `Button`.
- **Data Sources**: `GET /api/coupon/get/[id]`; saved via `PUT /api/coupon/update`.
- **Assets Used**: None.
- **Buttons / CTAs**: "Save Changes", "Cancel".
- **Internal Links**: `/admin/coupon`.
- **External Links**: None.
- **Forms**: Coupon update form.
- **Interactions**: Form reset on fetch.
- **Responsive Behavior**: Responsive layout.
- **SEO**: Unindexed.
- **Important Logic**: Preserves coupon ID.
- **Dependencies**: `react-hook-form`, `zod`, `axios`.
- **Notes**: Admin only.

---

### Admin Orders & Tech Packs
- **URL**: `/admin/orders`
- **Source File**: `app/(root)/(admin)/admin/orders/page.tsx`
- **Purpose**: Inbound Tech Pack and custom manufacturing inquiry dashboard.
- **Business Role**: Primary sales lead processing center. Allows management to review client specifications, company background, required quantities, target deadlines, and technical notes.
- **Main Sections**:
  1. Inquiries Table: Status badge ("New" animated pulse vs "Viewed"), Date, Client Name / Company, Email, Product Type, Target Deadline, Quantity.
  2. Inquiry Detail Modal: Fullscreen dialog opening on row click displaying complete client notes, customization specifications, and prototype reference.
- **Components Used**: `MaterialReactTable`, `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `Icon`.
- **Data Sources**: `axios.get('/api/contact/get')` querying the `TechPack` collection; status updates via `axios.put('/api/contact/update/[id]')`.
- **Assets Used**: None.
- **Buttons / CTAs**: Row click to view detail modal, close modal button.
- **Internal Links**: None.
- **External Links**: Direct `mailto:` link to client email.
- **Forms**: None.
- **Interactions**:
  - Clicking any row opens the full specification modal.
  - Automatically sends PUT request to mark `isNewStatus: false` when a "New" inquiry is opened, updating the badge in real-time.
- **Responsive Behavior**: Responsive Material React Table with horizontal scrolling.
- **SEO**: Unindexed admin route.
- **Important Logic**: The page is labeled "Orders" in the sidebar navigation, but under the hood it queries the `TechPack` Mongoose collection because SLOTS SPORTSWEAR's orders represent custom manufacturing agreements.
- **Dependencies**: `material-react-table`, `@mui/material`, `axios`, `react-hot-toast`.
- **Notes**: Demonstrates the core B2B Tech Pack business model.

---

### Admin Customers Directory
- **URL**: `/admin/customers`
- **Source File**: `app/(root)/(admin)/admin/customers/page.tsx`
- **Purpose**: Directory of all registered user accounts on the platform.
- **Business Role**: Customer relationship management, verifying buyer credentials, and checking user activity.
- **Main Sections**: Table displaying User Avatar, Full Name, Email, Verification Status (Verified badge vs Unverified), Contact Phone, and Registration Date.
- **Components Used**: `BreadCrumb`, `DataTableWrapper`, `DataTable`.
- **Data Sources**: `axios.get('/api/customers')` querying the `user` collection in the `USERS` database.
- **Assets Used**: User avatar thumbnails.
- **Buttons / CTAs**: Search toolbar, pagination controls.
- **Internal Links**: None.
- **External Links**: None.
- **Forms**: Search input.
- **Interactions**: Search filter by name or email.
- **Responsive Behavior**: Responsive table.
- **SEO**: Unindexed.
- **Important Logic**: Queries the Better-Auth `user` collection directly through the multi-database connection manager.
- **Dependencies**: `material-react-table`, `@tanstack/react-query`.
- **Notes**: Shows both regular clients and administrator profiles.

---

### Admin Media Library
- **URL**: `/admin/media`
- **Source File**: `app/(root)/(admin)/admin/media/page.tsx`
- **Purpose**: Centralized digital asset management repository connected directly to Cloudinary.
- **Business Role**: Allows administrators to upload, inspect, tag, and organize photography for products and banners.
- **Main Sections**:
  1. Upload Toolbar: Direct Cloudinary Upload Widget button.
  2. Media Asset Grid: Infinite-scroll visual gallery showing image thumbnail, dimensions, format, file size, and action icons.
  3. Action Overlays: Edit metadata (alt text, title) and delete actions.
- **Components Used**: `BreadCrumb`, `Media`, `UploadMedia`, `DeleteAction`, `CldUploadWidget` (next-cloudinary).
- **Data Sources**: `/api/media` (paginated Mongoose `Media` collection records).
- **Assets Used**: Cloudinary CDN hosted assets.
- **Buttons / CTAs**: "Upload Media", edit button, delete button.
- **Internal Links**: `/admin/media/edit/[id]`.
- **External Links**: Direct Cloudinary secure URLs.
- **Forms**: Search input.
- **Interactions**:
  - Direct file upload via Cloudinary widget.
  - Automatic database record creation via `POST /api/media/creat` on upload success.
  - Modal confirmation for deletion.
- **Responsive Behavior**: Responsive CSS grid (2 to 6 columns depending on screen width).
- **SEO**: Unindexed.
- **Important Logic**: Media records store `asset_id`, `public_id`, `thumbnail_url`, and `secure_url` for reference by Products and Variants.
- **Dependencies**: `next-cloudinary`, `axios`, `react-hot-toast`.
- **Notes**: Essential foundation for product catalog imagery.

---

### Admin Edit Media
- **URL**: `/admin/media/edit/[id]`
- **Source File**: `app/(root)/(admin)/admin/media/edit/[id]/page.tsx`
- **Purpose**: Interface for editing image metadata.
- **Business Role**: SEO and accessibility optimization for product media assets.
- **Main Sections**: Image preview card, Alt Text input, Title Text input.
- **Components Used**: `BreadCrumb`, `Input`, `Button`.
- **Data Sources**: `GET /api/media/get/[id]`; saved via `PUT /api/media/update`.
- **Assets Used**: Preview of target image.
- **Buttons / CTAs**: "Save Metadata", "Back to Media".
- **Internal Links**: `/admin/media`.
- **External Links**: None.
- **Forms**: Metadata update form.
- **Interactions**: Form submit and toast feedback.
- **Responsive Behavior**: Responsive card.
- **SEO**: Unindexed.
- **Important Logic**: Populates accessibility alt tags consumed by Next.js `<Image>` components.
- **Dependencies**: `react-hook-form`, `axios`.
- **Notes**: Admin only.

---

### Admin Review Moderation
- **URL**: `/admin/review`
- **Source File**: `app/(root)/(admin)/admin/review/page.tsx`
- **Purpose**: Customer review and rating moderation panel.
- **Business Role**: Protects brand reputation by monitoring client feedback and moderating inappropriate or spam reviews.
- **Main Sections**: Table displaying Product Name, Reviewer Name, Star Rating (1–5), Review Title, Comment Body, and Delete action.
- **Components Used**: `BreadCrumb`, `DataTableWrapper`, `DataTable`, `DeleteAction`.
- **Data Sources**: `/api/review` (cross-database populated with Product and User).
- **Assets Used**: None.
- **Buttons / CTAs**: "Export CSV", "Trash", delete row action.
- **Internal Links**: `/admin/trash?type=review`.
- **External Links**: None.
- **Forms**: Search and filter toolbar.
- **Interactions**: Row deletion (soft delete); CSV export.
- **Responsive Behavior**: Responsive table.
- **SEO**: Unindexed.
- **Important Logic**: Soft-deleting a review recalculates product average ratings dynamically.
- **Dependencies**: `material-react-table`, `@tanstack/react-query`.
- **Notes**: Reviews appear live on product detail pages unless soft-deleted.

---

### Admin Trash & Recycle Bin
- **URL**: `/admin/trash`
- **Source File**: `app/(root)/(admin)/admin/trash/page.tsx`
- **Purpose**: Centralized recycle bin for all soft-deleted business entities.
- **Business Role**: Prevents accidental data loss by allowing administrators to restore mistakenly deleted categories, products, variants, coupons, or reviews, or permanently purge them from MongoDB.
- **Main Sections**:
  1. Entity Selector Tabs: Category Trash, Product Trash, Product Variant Trash, Coupon Trash, Review Trash.
  2. Trash Table: Filtered table displaying records where `deletedAt !== null`.
  3. Action Bar: Permanent Delete button (`deleteType="PD"`) and Restore button (`deleteType="SD"`).
- **Components Used**: `BreadCrumb`, `DataTableWrapper`, `DataTable`, `DeleteAction`.
- **Data Sources**: Calls entity endpoints with query parameter `?trash=true` (e.g. `/api/product?trash=true`).
- **Assets Used**: Thumbnails where applicable.
- **Buttons / CTAs**: "Restore Record", "Permanently Delete", entity tab buttons.
- **Internal Links**: `/admin/trash?type=category`, `/admin/trash?type=product`, etc.
- **External Links**: None.
- **Forms**: Search bar.
- **Interactions**: Tab switching via URL query parameter `type`; mutation execution via `useDeleteMutation`.
- **Responsive Behavior**: Responsive table layout.
- **SEO**: Unindexed.
- **Important Logic**:
  - Soft-delete restore sets `deletedAt = null` via HTTP PUT.
  - Permanent delete invokes Mongoose `findByIdAndDelete()` via HTTP DELETE.
- **Dependencies**: `material-react-table`, `@tanstack/react-query`, `useDeleteMutation`.
- **Notes**: Essential safety mechanism for database administration.

---

### Dynamic Robots Configuration
- **URL**: `/robots.txt`
- **Source File**: `app/robots.ts`
- **Purpose**: Search engine crawler instruction file.
- **Business Role**: Ensures public product and landing pages are indexed while protecting admin and customer portals from crawler exposure.
- **Main Sections**: Rules directive block and sitemap reference.
- **Components Used**: None.
- **Data Sources**: Statically declared rules in TypeScript.
- **Assets Used**: None.
- **Buttons / CTAs**: None.
- **Internal Links**: None.
- **External Links**: Points to `https://slotssportswear.vercel.app/sitemap.xml`.
- **Forms**: None.
- **Interactions**: Server response.
- **Responsive Behavior**: N/A (plaintext file).
- **SEO**: Directs web crawlers:
  - Allowed: `/` (all public routes)
  - Disallowed: `/admin/`, `/dashboard/`, `/api/`, `/auth/`
  - Host: `https://slotssportswear.vercel.app`
- **Important Logic**: Generated dynamically via Next.js `MetadataRoute.Robots`.
- **Dependencies**: `next`.
- **Notes**: Production crawler policy.

---

### Dynamic Sitemap Generator
- **URL**: `/sitemap.xml`
- **Source File**: `app/sitemap.ts`
- **Purpose**: Automated XML sitemap index for search engines.
- **Business Role**: Maximizes organic search discoverability for every published garment prototype in the catalog.
- **Main Sections**: Static page definitions and dynamic product URL generator.
- **Components Used**: None.
- **Data Sources**: MongoDB `Product.find({ deletedAt: null }).select('slug updatedAt')`.
- **Assets Used**: None.
- **Buttons / CTAs**: None.
- **Internal Links**: None.
- **External Links**: Links to canonical domain URLs.
- **Forms**: None.
- **Interactions**: Server response.
- **Responsive Behavior**: N/A (XML feed).
- **SEO**:
  - `/` (Priority 1.0, Daily)
  - `/shop` (Priority 0.9, Daily)
  - `/about` (Priority 0.7, Monthly)
  - `/contact` (Priority 0.6, Monthly)
  - `/product/[slug]` (Priority 0.8, Weekly, lastModified dynamically bound to product `updatedAt`)
- **Important Logic**:
  - `dynamic = 'force-dynamic'`
  - `revalidate = 3600` (hourly cache revalidation)
  - Automatically excludes soft-deleted products.
  - Fallback returns static pages if database connection encounters an error.
- **Dependencies**: `mongoose`, `next`.
- **Notes**: Currently omits `/story`, `/faq`, `/policy`, `/refund`, `/shipping`, and `/terms`.

---

## 7. Navigation & User Flows

### Header Navigation Architecture (`app/components/Nav.tsx`)
- **Desktop Navbar**: Sticky translucent header positioned above all content with high z-index (`z-[999]`). Features:
  - Brand Logo & Typography linking to `/`.
  - Collections Mega-Menu trigger: On hover over "Collections", activates an expansive dropdown populated dynamically from `/api/public/nav-data` displaying categories and featured preview photography.
  - Direct Links: "About" (`/about`), "Contact" (`/contact`).
  - Action Toolbar:
    - Live Search Icon: Opens a full-screen blurred overlay drawer with real-time debounced search against `/api/public/search?q=<query>`.
    - Wardrobe / Bag Icon: Links to `/cart`.
    - User Profile Silhouette: Dynamic state checking Better-Auth session via `authClient.useSession()`. If logged out, routes to `/auth/signin`; if logged in, opens a quick menu to `/dashboard`, `/profile-edit`, or administrative routes.
- **Mobile Drawer Navigation**: Responsive full-screen slide-over panel triggered by the hamburger SVG icon:
  - Staggered GSAP reveal of main navigation links.
  - Accordion for category collections.
  - Direct contact links and social media channels.
  - Locks body scrolling (`position: fixed; overflow: hidden`) during drawer activation to prevent touch jitter.

### Footer Navigation Architecture (`app/components/Footer.tsx`)
- **Dark Theme Anchor**: High-contrast dark container (`bg-[#111111] text-[#EDEEE7]`) closing every page view:
  - Brand & Mission Column: Logo, brand philosophy summary, and circular social media icon buttons (Instagram, Facebook, Twitter/X, Pinterest).
  - Collections Column: Dynamically populated from `/api/public/categories`, falling back to static category links (Sports, Casuals, Team, Limited Edition) plus FAQ link (`/faq`).
  - Company Column: Direct links to "Our Story" (`/story`), "About Us" (`/about`), "Shipping Info" (`/shipping`), "Policies" (`/policy`), "Returns & Refunds" (`/refund`), and "Contact Support" (`/contact`).
  - Contact Details Column: Direct location ("Punjab, Pakistan · International Shipping Worldwide"), public email address (`NEXT_PUBLIC_EMAIL_ADDRESS`), and phone number (`NEXT_PUBLIC_PHONE_NUMBER`).
  - Giant Brand Text: Massive centered display typography "SLOTS SPORTS WEAR".
  - Bottom Legal Bar: Copyright statement and secondary links to Privacy, Terms, Shipping, and Returns.

### Core User & Business Flows

```
1. B2B Tech Pack / Custom Manufacturing Lead Flow:
   [Storefront / Shop Catalog]
               │
               ▼
   [Product Detail Page (/product/[slug])] ── "Add to Wardrobe" Click
               │
               ▼
   [Redirect to /contact?type=<category>&slug=<slug>#teckpack]
               │
               ▼
   [User fills Quantity, Deadline, Customization Details]
               │
               ▼
   [Submit Form ──> POST /api/contact/submit]
         ├──────────────────────────────────────────┐
         ▼                                          ▼
   [Record Saved in TechPack Collection]    [Nodemailer Email sent to ADMIN_EMAIL]
         │
         ▼
   [Admin views submission in /admin/orders modal & replies via Email/WhatsApp]

2. Customer Onboarding & Authentication Flow:
   [User clicks "Sign In" or "Register"]
               │
               ▼
   [Submits Signup Form (/auth/signup)]
               │
               ▼
   [Better Auth creates User in USERS DB with emailVerified: false]
               │
               ▼
   [Nodemailer sends verification email with secure URL token]
               │
               ▼
   [User clicks email link ──> /auth/verifyemail]
               │
               ▼
   [Better Auth marks emailVerified: true & logs user in]
               │
               ▼
   [Redirects to /dashboard with "Active Member" status]

3. Administrator Authentication & Gating Flow:
   [User logs in with credentials]
               │
               ▼
   [Navigates to /admin/*]
               │
               ▼
   [adminAuth() checks: session exists && emailVerified && email === ADMIN_EMAIL]
         ├── If Pass: Granted access to Admin Dashboard and CRUD panels
         └── If Fail: Immediately redirected to root (/)
```

---

## 8. Component Architecture

### Nav
- **File**: `app/components/Nav.tsx`
- **Purpose**: Global responsive header navigation, search drawer, and mega-menu.
- **Used By**: `app/layout.tsx` (mounted across the entire application).
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Fetches category taxonomy and preview images via `/api/public/nav-data` on mount.
  - Implements live debounced search query listening to user input with `/api/public/search?q=`.
  - Locks and unlocks window scroll coordinates when modal/drawer states toggle.
  - Checks user authentication session using `authClient.useSession()`.
  - Dispatches page transitions via `useLoader().transitionTo()`.
- **Styling**: Tailwind CSS with custom classes `.nav-blur-bg`, frosted glass backdrop filter, sticky top positioning, high z-index (`z-[999]`).
- **Interactions**: Mega-menu open/close delay timer, search overlay modal, mobile slide-over drawer with GSAP stagger animation.
- **Dependencies**: `axios`, `gsap`, `@gsap/react`, `better-auth`, `react-icons`, `next/navigation`.
- **Notes**: Core navigation centerpiece for the customer experience.

---

### Footer
- **File**: `app/components/Footer.tsx`
- **Purpose**: Global site footer containing brand credentials, sitemap links, social channels, and legal disclosures.
- **Used By**: `app/layout.tsx` (rendered inside `SmoothScroll`).
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Fetches active categories from `/api/public/categories` on mount to render dynamic collection links with static fallbacks.
- **Styling**: Dark container (`bg-[#111111] text-[#EDEEE7]`), responsive 4-column grid, custom fonts `font-[main]` and `font-[middle]`.
- **Interactions**: Hover transitions on links and social icons.
- **Dependencies**: `axios`, `react-icons`, `next/link`.
- **Notes**: Authoritatively establishes Pakistan manufacturing origin and company contact points.

---

### SmoothScroll
- **File**: `app/components/SmoothScroll.tsx`
- **Purpose**: Virtual momentum scrolling driver for fluid, continuous website navigation.
- **Used By**: `app/layout.tsx` (wraps `Providers`, page children, and `Footer`).
- **Props**: `children: ReactNode`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Dynamically imports `locomotive-scroll` v5 client-side to prevent SSR hydration errors; initializes Lenis virtual scroll engine with `lerp: 0.001`, `duration: 1.2`, and automatically synchronizes with GSAP `ScrollTrigger`.
- **Styling**: `data-scroll-container` wrapper.
- **Interactions**: Intercepts mouse wheel, trackpad, and touch events for smooth interpolation.
- **Dependencies**: `locomotive-scroll`, `gsap`, `ScrollTrigger`.
- **Notes**: Essential for luxury editorial aesthetic; automatically destroyed on unmount.

---

### WhatsAppButton
- **File**: `app/components/WhatsAppButton.tsx`
- **Purpose**: Floating direct-response click-to-chat button for rapid customer inquiries.
- **Used By**: `app/layout.tsx` (rendered globally).
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Constructs direct WhatsApp URI: `https://wa.me/923319165413?text=...` with prefilled message.
- **Styling**: Fixed bottom-right (`fixed bottom-8 right-8 z-[9999]`), green circle (`bg-[#25D366]`), pulsing radar ring, dark tooltip.
- **Interactions**: Pulsing CSS ring animation, scale on hover, tooltip reveal on mouseover.
- **Dependencies**: `react-icons`, `lib/utils`.
- **Notes**: Primary real-time communication channel for international wholesale buyers.

---

### EntranceNotification
- **File**: `components/ui/EntranceNotification.tsx`
- **Purpose**: Delayed promotional pop-up modal offering discounts to guests or early access to members.
- **Used By**: `app/layout.tsx`.
- **Props**: None.
- **Client/Server**: Client (`"use client"`).
- **Internal Logic**:
  - Waits 4500ms after initial mount before triggering display.
  - Evaluates user authentication via `authClient.useSession()`.
  - Guests receive: "LIMITED OFFER: Get 10% off on register" with links to sign up / sign in.
  - Authenticated members receive: "MEMBER PERKS: Welcome back" with links to shop / orders.
- **Styling**: Frosted glass backdrop with blurred card and high z-index.
- **Interactions**: Multi-step GSAP timeline entrance animation; dismiss button.
- **Dependencies**: `gsap`, `better-auth`.
- **Notes**: Boosts registration conversions.

---

### LoaderProvider
- **File**: `app/context/LoaderContext.tsx`
- **Purpose**: Full-screen page transition engine and loader coordinator.
- **Used By**: `app/layout.tsx` (wraps entire application).
- **Props**: `children: ReactNode`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Manages `isLoading`, `isReady`, and `progress` numeric state.
  - Exposes `transitionTo(url)` to intercept routing and run coordinated multi-column curtain slide animations.
  - Continuously loops brand marquee banner during transition.
  - Waits for `setIsReady(true)` from pages before opening the curtain.
- **Styling**: Fixed full-screen overlay with multi-column vertical black panels and marquee typography.
- **Interactions**: Sliding column reveals with percentage counter (`0% -> 100%`).
- **Dependencies**: `gsap`, `@gsap/react`, `next/navigation`.
- **Notes**: Trademark luxury transition effect found throughout the application.

---

### Heading
- **File**: `app/components/Heading.tsx`
- **Purpose**: Character-by-character staggered text reveal animation for primary headlines.
- **Used By**: Homepage sections, About page, Shop hero, Product client.
- **Props**: `title?: string`, `className?: string`, `delay?: number`, `padding?: string`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Splits title string into words, then words into individual character spans (`.char`). Uses GSAP to animate `y: "100%" -> "0%"` with `stagger: 0.02` and `ease: "expo.out"` when triggered by `ScrollTrigger`.
- **Styling**: Uppercase expanded display font (`font-[main]`), overflow hidden wrapper.
- **Interactions**: Scroll-triggered character entrance.
- **Dependencies**: `gsap`, `@gsap/react`, `ScrollTrigger`, `useLoader`.
- **Notes**: High-density typography animation component.

---

### FormattedTitle
- **File**: `app/components/FormattedTitle.tsx`
- **Purpose**: Typography formatter splitting text into contrasting font styles.
- **Used By**: Legal pages, Cart page, FAQ, Story page.
- **Props**: `children: React.ReactNode`, `className?: string`.
- **Client/Server**: Client/Server compatible.
- **Internal Logic**: Formats headings with consistent styling and rhythm.
- **Styling**: Main display uppercase font styling.
- **Interactions**: Static layout.
- **Dependencies**: None.
- **Notes**: Utility typography component.

---

### TransitionButton
- **File**: `app/components/TransitionButton.tsx`
- **Purpose**: Interactive button triggering seamless page transitions via `LoaderContext`.
- **Used By**: `Nav`, `HeroSection`, `HomeMiddle`, `Dashboard`, `PopularCategories`.
- **Props**: `text: React.ReactNode`, `url: string`, `className?: string`, `arrow?: boolean`, `icon?: any`, `scroll?: boolean`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Intercepts click events, invokes `transitionTo(url, { scroll })`, allowing the loader curtain to close before executing Next.js routing.
- **Styling**: Adapts to passed classes (e.g. `.light-button`, `.dark-button`).
- **Interactions**: Executes curtain transition; animates rotating arrow icon on hover.
- **Dependencies**: `useLoader`, `react-icons`.
- **Notes**: Central navigation button for the custom transition engine.

---

### Icon
- **File**: `app/components/Icon.tsx`
- **Purpose**: Dynamic SVG icon renderer loading vector assets from `public/icons/`.
- **Used By**: `Nav`, `ProductInfo`, `ContactClient`, `ProductClient`, `OrdersPage`.
- **Props**: `name: string`, `className?: string`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Maps icon string names ('arrow', 'user', 'search', 'bag', 'menu') to raw SVG files in `public/icons/`.
- **Styling**: Standard SVG styling via Tailwind.
- **Interactions**: Scale and rotation animations on parent hover.
- **Dependencies**: None.
- **Notes**: Clean asset abstraction.

---

### AnimatedSwapText
- **File**: `app/components/AnimatedSwapText.tsx`
- **Purpose**: Micro-interaction component swapping two lines of text on hover.
- **Used By**: `HorizontalCategories`, `PopularCategories`.
- **Props**: `primaryText: string`, `secondaryText?: string`, `className?: string`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Slides primary text upwards while secondary text enters from bottom on hover.
- **Styling**: Overflow hidden relative container.
- **Interactions**: CSS transform hover transition.
- **Dependencies**: None.
- **Notes**: Polished micro-interaction.

---

### JsonLd
- **File**: `components/JsonLd.tsx`
- **Purpose**: Injects Google-compliant JSON-LD structured data into server-rendered HTML.
- **Used By**: `app/layout.tsx` (Organization), `app/product/[slug]/page.tsx` (Product).
- **Props**: `data: Record<string, unknown>`.
- **Client/Server**: Server Component (RSC).
- **Internal Logic**: Renders `<script type="application/ld+json">` with sanitized stringified schema object.
- **Styling**: None.
- **Interactions**: None.
- **Dependencies**: None.
- **Notes**: Zero client JavaScript overhead.

---

### HeroSection
- **File**: `app/components/HeroSection.tsx`
- **Purpose**: High-impact storefront hero showcase with background video, live ticker, and rating social proof.
- **Used By**: `app/page.tsx`.
- **Props**: `arrivalData: any[]`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Split-character GSAP stagger animation for main headline.
  - Video play/pause toggle state.
  - Fetches customer avatars from `/api/public/users` for social proof badge.
  - Renders 5-star rating graphic.
- **Styling**: Fullscreen viewport container with responsive video background and overlay.
- **Interactions**: Video toggle, interactive star hover, animated arrivals ticker.
- **Dependencies**: `gsap`, `@gsap/react`, `axios`, `react-icons`.
- **Notes**: Flagship visual section.

---

### CompanyStats
- **File**: `app/components/CompanyStats.tsx`
- **Purpose**: Animated metric bar demonstrating production scale and social proof.
- **Used By**: `app/page.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Fetches `/api/public/stats` on mount.
  - Triggers GSAP animated numeric counters when section enters viewport via `ScrollTrigger`.
- **Styling**: 4-column bordered counter grid.
- **Interactions**: Scroll-triggered numeric counting.
- **Dependencies**: `axios`, `gsap`, `@gsap/react`, `ScrollTrigger`.
- **Notes**: Provides tangible proof of business scale.

---

### HorizontalCategories
- **File**: `app/components/HorizontalCategories.tsx`
- **Purpose**: 2x2 interactive collection showcase highlighting core apparel lines.
- **Used By**: `app/page.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Manages active category index on mouseenter; triggers navigation via `useLoader().transitionTo()`.
- **Styling**: 2-column responsive grid with background imagery and dark gradients.
- **Interactions**: Card hover zoom, text swap, category switching.
- **Dependencies**: `gsap`, `useLoader`, `react-icons`.
- **Notes**: Men, Women, Gloves, Gears collections.

---

### NewArrival
- **File**: `app/components/NewArrival.tsx`
- **Purpose**: Horizontal scrolling showcase of newly designed sportswear items.
- **Used By**: `app/page.tsx`.
- **Props**: `products: any[]`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Maps product items into a scrollable card row with GSAP entrance effects.
- **Styling**: Horizontal flex track with scrollbar hidden.
- **Interactions**: Drag / scroll navigation; card hover scaling.
- **Dependencies**: `ProductItem`, `Heading`.
- **Notes**: Keeps catalog fresh on homepage.

---

### PopularCategories
- **File**: `app/components/PopularCategories.tsx`
- **Purpose**: Carousel of specific apparel silhouettes with varied card dimensions.
- **Used By**: `app/page.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Renders curated categories with detailed and simple card variations.
- **Styling**: Horizontal scrolling track.
- **Interactions**: Card hover animation and transition buttons.
- **Dependencies**: `gsap`, `useLoader`.
- **Notes**: Highlights Men's Top, Women, Autumn, Shoes, Girl's Top, Accessories.

---

### OurServices
- **File**: `app/components/OurServices.tsx`
- **Purpose**: Pinned split-screen presentation of 7 OEM manufacturing capabilities with synchronized photography.
- **Used By**: `app/page.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - GSAP `ScrollTrigger` pins section for 700vh of scroll depth.
  - Left panel crossfades service titles and descriptions.
  - Right panel slides an image train (`trainRef`) vertically on desktop and horizontally on mobile.
  - Embeds `Whychooseus` at the bottom.
- **Styling**: Pinned split-screen container (`h-screen w-full`).
- **Interactions**: Scroll-driven synchronized text crossfade and image train translation.
- **Dependencies**: `gsap`, `@gsap/react`, `ScrollTrigger`, `Whychooseus`.
- **Notes**: High-impact technical demonstration of factory capabilities.

---

### Whychooseus
- **File**: `app/components/Whychooseus.tsx`
- **Purpose**: 4-pillar brand differentiation section emphasizing key factory advantages.
- **Used By**: `app/components/OurServices.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Renders 4 benefit cards (Low MOQ, Quality Assurance, Global Delivery, Fast Sampling) with icon badges.
- **Styling**: 4-column responsive grid with subtle borders and clean typography.
- **Interactions**: Hover elevation on cards.
- **Dependencies**: `Heading`.
- **Notes**: Reinforces B2B competitive advantages.

---

### HomeMiddle
- **File**: `app/components/HomeMiddle.tsx`
- **Purpose**: Narrative brand story section with full-width image reveal.
- **Used By**: `app/page.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: GSAP ScrollTrigger reveals text blocks and expands image container width from `0% -> 100%`.
- **Styling**: Centered editorial layout with dynamic image container.
- **Interactions**: Scroll-triggered expanding image curtain.
- **Dependencies**: `gsap`, `@gsap/react`, `ScrollTrigger`, `TransitionButton`.
- **Notes**: Editorial brand storytelling.

---

### HomeContact
- **File**: `app/components/HomeContact.tsx`
- **Purpose**: Homepage quick inquiry form.
- **Used By**: `app/page.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Submits `firstName`, `contact`, and `inquiry` to `POST /api/subscribe`; triggers email notification to `ADMIN_EMAIL`.
- **Styling**: Minimalist input cards with dark button.
- **Interactions**: Form submission with loading spinner and toast notification.
- **Dependencies**: `axios`, `react-hot-toast`, `gsap`.
- **Notes**: Quick lead capture on the homepage.

---

### ShopClient
- **File**: `app/components/ShopClient.tsx`
- **Purpose**: Client-side catalog controller managing filtering, sorting, pagination, and animations.
- **Used By**: `app/shop/page.tsx`.
- **Props**: `initialCategories: any[]`, `initialProducts: any[]`, `initialMeta: any`, `brandingTags: string[]`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Reads search params (`category`, `type`, `tags`, `searchQuery`, `sort`, `onSale`, `page`).
  - Fetches updated product lists from `/api/public/products` on filter change.
  - Bypasses fetch on initial render if SSR data matches default query.
  - Runs GSAP staggered card rise on product updates.
- **Styling**: Multi-column catalog layout with sticky sidebar and responsive grid.
- **Interactions**: Filter drawer toggling, sorting dropdown, pagination navigation.
- **Dependencies**: `axios`, `gsap`, `@gsap/react`, `next/navigation`.
- **Notes**: Core catalog state manager.

---

### ShopFilters
- **File**: `app/components/ShopFilters.tsx`
- **Purpose**: Multi-faceted filter sidebar for the shop catalog.
- **Used By**: `app/components/ShopClient.tsx`.
- **Props**: `categories: any[]`, `brandingTags: string[]`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Updates URL search parameters when filters are checked or cleared without full page reloads.
- **Styling**: Accordion groups with checkboxes and count badges.
- **Interactions**: Accordion expansion, checkbox toggling, "Clear All" action.
- **Dependencies**: `next/navigation`, `react-icons`.
- **Notes**: Responsive sidebar filter.

---

### ProductItem
- **File**: `app/components/ProductItem.tsx`
- **Purpose**: Reusable product card component.
- **Used By**: `ShopClient`, `NewArrival`, `ProductClient` (related products).
- **Props**: `product: any`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Displays primary image with smooth swap to secondary image on hover; formats pricing and discount tags.
- **Styling**: Aspect-ratio constrained image container with clean typographic meta below.
- **Interactions**: Image hover crossfade, navigation via `useLoader`.
- **Dependencies**: `next/image`, `useLoader`.
- **Notes**: Standard catalog card.

---

### ProductClient
- **File**: `app/product/[slug]/ProductClient.tsx`
- **Purpose**: Client controller for the dynamic product detail page.
- **Used By**: `app/product/[slug]/page.tsx`.
- **Props**: `initialData: any`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Manages selected variant state (color/size).
  - Recalculates active price, MRP, discount, and gallery images based on selection.
  - GSAP pre-transition entrance animations.
  - Handles review submission via `/api/review/create`.
- **Styling**: 2-column sticky desktop layout with full-width review section below.
- **Interactions**: Variant selection, star rating helper, review modal toggle, marquee lightbox open.
- **Dependencies**: `gsap`, `@gsap/react`, `axios`, `react-hot-toast`, `better-auth`.
- **Notes**: Integrates all modular product subcomponents.

---

### ProductGallery
- **File**: `app/product/[slug]/components/ProductGallery.tsx`
- **Purpose**: Multi-image presentation with vertical thumbnail strip and zoomable main view.
- **Used By**: `app/product/[slug]/ProductClient.tsx`.
- **Props**: Gallery state, media arrays, active image index, setter functions.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Switches active image on thumbnail click; handles discount badge display.
- **Styling**: Vertical thumbnail strip on left, large main image on right.
- **Interactions**: Thumbnail click, fullscreen marquee trigger.
- **Dependencies**: `next/image`, `Icon`.
- **Notes**: High-resolution garment inspection.

---

### ProductInfo
- **File**: `app/product/[slug]/components/ProductInfo.tsx`
- **Purpose**: Product details, variant selectors, pricing, description, and primary CTA.
- **Used By**: `app/product/[slug]/ProductClient.tsx`.
- **Props**: Product attributes, selected variant, price, MRP, star renderer.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Extracts unique color options from variants.
  - Filters size buttons dynamically based on currently selected color.
  - Routes "Add to Wardrobe" click to `/contact?type=<category>&slug=<slug>#teckpack`.
- **Styling**: Sticky column layout with pill buttons and bold typography.
- **Interactions**: Color selection, size picking, CTA navigation.
- **Dependencies**: `next/navigation`, `Icon`, `Heading`.
- **Notes**: Direct conduit to the B2B Tech Pack form.

---

### ReviewCollective
- **File**: `app/product/[slug]/components/ReviewCollective.tsx`
- **Purpose**: Review summary, 5-star distribution chart, and customer testimonial list.
- **Used By**: `app/product/[slug]/ProductClient.tsx`.
- **Props**: Product data, star renderer, modal opener.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Calculates percentage distribution across 1 to 5 stars; renders verified client reviews with user avatars.
- **Styling**: 2-column rating breakdown card.
- **Interactions**: "Write a Review" button opening `ReviewModal`.
- **Dependencies**: `react-icons`, `Icon`.
- **Notes**: Crucial social proof section.

---

### ReviewModal
- **File**: `app/product/[slug]/components/ReviewModal.tsx`
- **Purpose**: Modal dialog for submitting verified product reviews.
- **Used By**: `app/product/[slug]/ProductClient.tsx`.
- **Props**: Open state, form state, submit handler, star picker.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Validates authenticated session; allows interactive 1–5 star selection; captures review title and text.
- **Styling**: Frosted glass dialog overlay (`Dialog` from shadcn).
- **Interactions**: Star rating selection with hover scaling, form submission.
- **Dependencies**: `components/ui/dialog`, `react-icons`.
- **Notes**: Gated behind client login.

---

### GalleryMarquee
- **File**: `app/product/[slug]/components/GalleryMarquee.tsx`
- **Purpose**: Fullscreen modal marquee lightbox displaying all garment photography in continuous motion.
- **Used By**: `app/product/[slug]/ProductClient.tsx`.
- **Props**: `isMarqueeOpen: boolean`, `setIsMarqueeOpen: (open: boolean) => void`, `allImages: any[]`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Fullscreen portal displaying an infinite horizontal scrolling track of high-resolution images.
- **Styling**: Fullscreen dark modal with backdrop blur.
- **Interactions**: Marquee scroll, close button.
- **Dependencies**: `gsap`, `react-icons`.
- **Notes**: Luxury visual asset showcase.

---

### HowItWorks
- **File**: `app/about/components/HowItWorks.tsx`
- **Purpose**: Pinned 4-step interactive timeline explaining the manufacturing journey.
- **Used By**: `app/about/page.tsx` via `AboutClient.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Pinned by GSAP `ScrollTrigger` for `steps.length * 350vh` of scroll distance.
  - Scrub timeline interpolates capsule pill position, text color change, description accordion height, and image clip-path reveals.
- **Styling**: Fullscreen pinned container with left step list and right synchronized image showcase.
- **Interactions**: Scroll-driven pinned step progress.
- **Dependencies**: `gsap`, `@gsap/react`, `ScrollTrigger`.
- **Notes**: Highlights Submit Tech Pack, Sampling, Production, and Ship to USA.

---

### ContactClient
- **File**: `app/contact/ContactClient.tsx`
- **Purpose**: Form controller for custom Tech Pack and order specification submissions.
- **Used By**: `app/contact/page.tsx`.
- **Props**: `categories: any[]`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**:
  - Reads `?type=` and `?slug=` from URL query parameters.
  - Captures complete technical specifications (quantity, deadline, fabric details).
  - Submits to `POST /api/contact/submit`.
- **Styling**: 2-column contact layout with custom styled inputs.
- **Interactions**: Form submission, toast notifications, GSAP fade-up entrance.
- **Dependencies**: `axios`, `react-hot-toast`, `gsap`, `@gsap/react`.
- **Notes**: Core commercial conversion terminal.

---

### SideBar (Admin)
- **File**: `app/(root)/(admin)/admin/components/SideBar.tsx`
- **Purpose**: Main administrative sidebar navigation panel.
- **Used By**: `app/(root)/(admin)/admin/layout.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Renders hierarchical menu items defined in `adminsidebarmenu.ts`; highlights active route based on `usePathname()`.
- **Styling**: Collapsible sidebar engine from shadcn/ui.
- **Interactions**: Submenu expansion, sidebar collapse toggle.
- **Dependencies**: `components/ui/sidebar`, `react-icons`, `next/navigation`.
- **Notes**: Secured within admin layout.

---

### Topbar (Admin)
- **File**: `app/(root)/(admin)/admin/components/Topbar.tsx`
- **Purpose**: Top navigation bar for administrative views.
- **Used By**: `app/(root)/(admin)/admin/layout.tsx`.
- **Props**: None.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Renders section title, theme toggle (`Themeswitch`), and user account dropdown (`UserDropdown`).
- **Styling**: Clean header bar with bottom border.
- **Interactions**: Dropdown menus, theme switching.
- **Dependencies**: `Themeswitch`, `UserDropdown`.
- **Notes**: Admin UI component.

---

### Editor (Admin)
- **File**: `app/(root)/(admin)/admin/components/Editor.tsx`
- **Purpose**: Rich text description editor for products.
- **Used By**: Product Add and Product Edit pages.
- **Props**: `value: string`, `onChange: (data: string) => void`.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Dynamically imports CKEditor 5 client-side without SSR to eliminate React hydration mismatch errors; provides bold, italic, lists, link, and heading formatting.
- **Styling**: CKEditor 5 CSS overrides in `app/ckeditor5.css`.
- **Interactions**: Rich text editing toolbar.
- **Dependencies**: `ckeditor5`, `@ckeditor/ckeditor5-react`.
- **Notes**: Powers the formatted HTML product descriptions.

---

### UploadMedia (Admin)
- **File**: `app/(root)/(admin)/admin/components/UploadMedia.tsx`
- **Purpose**: Direct-to-Cloudinary upload widget trigger.
- **Used By**: `app/(root)/(admin)/admin/media/page.tsx`.
- **Props**: Callback handlers on upload success.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Initializes `CldUploadWidget` from `next-cloudinary` using `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`; calls `POST /api/media/creat` on upload completion to register the asset in MongoDB.
- **Styling**: Action button with upload icon.
- **Interactions**: Cloudinary modal widget activation.
- **Dependencies**: `next-cloudinary`, `axios`, `react-hot-toast`.
- **Notes**: Directly uploads images to Cloudinary without routing bulky binaries through the Next.js server.

---

### AddMedia & MediaModal (Admin)
- **File**: `app/(root)/(admin)/admin/components/AddMedia.tsx` & `MediaModal.tsx`
- **Purpose**: Asset selection modal dialog allowing administrators to attach images from the Media Library to products or variants.
- **Used By**: Product Add/Edit, Variant Add/Edit.
- **Props**: Selected media array, selection callback.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Queries `/api/media` with infinite pagination; allows single or multi-select of media assets.
- **Styling**: Grid gallery inside a modal dialog.
- **Interactions**: Checkbox image selection, modal open/close.
- **Dependencies**: `axios`, `components/ui/dialog`.
- **Notes**: Bridges the Media asset library to Products and Variants.

---

### DataTableWrapper (Admin)
- **File**: `components/application/DataTableWrapper.tsx`
- **Purpose**: Container card providing search, CSV export, and bulk deletion actions for admin data tables.
- **Used By**: All admin entity lists (Category, Product, Variant, Coupon, Review, Trash, Customers).
- **Props**: Title, search callback, export endpoint, delete endpoint, children table.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Coordinates search debouncing, triggers CSV export via `export-to-csv`, and opens delete confirmation modals.
- **Styling**: Bordered card container with responsive header toolbar.
- **Interactions**: Export button click, bulk delete trigger.
- **Dependencies**: `export-to-csv`, `components/ui/card`.
- **Notes**: Standardized administrative table container.

---

### DeleteAction (Admin)
- **File**: `components/application/DeleteAction.tsx`
- **Purpose**: Confirmation dialog modal for soft delete ('SD') and permanent delete ('PD') mutations.
- **Used By**: Admin data tables and trash view.
- **Props**: Selected row IDs, delete endpoint, delete type.
- **Client/Server**: Client (`'use client'`).
- **Internal Logic**: Invokes `useDeleteMutation` to execute HTTP PUT (for soft delete/restore) or HTTP DELETE (for permanent purge); automatically invalidates React Query cache on success.
- **Styling**: Warning modal dialog with action buttons.
- **Interactions**: Confirmation prompt.
- **Dependencies**: `useDeleteMutation`, `components/ui/dialog`.
- **Notes**: Prevents accidental data destruction.

---

## 9. Design System

### Typography Hierarchy & Custom Fonts
SLOTS SPORTSWEAR implements a distinct dual-font design language pairing an industrial expanded display font with a clean, high-legibility geometric sans-serif:

1. **Display Font (`main`)**:
   - **Font Asset**: `public/fonts/BrigendsExpanded-nReK1.otf`
   - **CSS Declaration**:
     ```css
     @font-face {
       font-family: 'main';
       src: url('/fonts/BrigendsExpanded-nReK1.otf') format('opentype');
       font-display: swap;
     }
     ```
   - **Usage**: Used for high-impact uppercase titles, brand marks, section headers (`h1`, `h2`), hero typography, and product names.
   - **Styling Specs**:
     - `h1`: `font-family: 'main'; font-size: 40px; text-transform: uppercase; color: #111111;`
     - `h2`: `font-family: 'main'; font-size: 30px; word-spacing: 2.5px; letter-spacing: 1.8px; text-transform: uppercase;`

2. **Subheading & Body Font (`middle`)**:
   - **Font Asset**: `public/fonts/Freigeist-Light.woff2`
   - **CSS Declaration**:
     ```css
     @font-face {
       font-family: 'middle';
       src: url('/fonts/Freigeist-Light.woff2') format('woff2');
       font-display: swap;
     }
     ```
   - **Usage**: Used for narrative paragraphs, descriptions, technical specifications, and secondary headings (`h3`).
   - **Styling Specs**:
     - `h3`: `font-family: 'middle'; font-size: 20px; word-spacing: 2.5px; letter-spacing: 1.8px;`
     - `p`: `font-family: 'middle'; font-size: 15px; word-spacing: 3.3px; letter-spacing: 2.4px;`

3. **Auxiliary Font Asset**:
   - `public/fonts/ag-book-pro-light.otf`: Kept in public assets for clean alternate book-weight styling.

### Color Palette & Token System
The visual identity relies on a high-contrast luxury bone-and-charcoal palette:

- **Primary Canvas / Bone White**: `#EDEEE7` (applied globally to `body` in `globals.css` as the warm linen background).
- **Deep Neutral Black**: `#111111` (primary typography, footer container, dark button fills, solid black accents).
- **Pure White**: `#FFFFFF` (card highlights, modal backgrounds, input fields).
- **Subtle Borders**: `#00000020` (`rgba(0,0,0,0.12)`) and `rgba(255, 255, 255, 0.2)` for ultra-fine micro-borders.
- **Accent Green**: `#25D366` (WhatsApp brand color), `#10B981` (free shipping & verified status badges), `#34c759` (toast success icons).
- **System Red / Destructive**: `#EF4444` / `#ff3b30` (error notifications and deletion warnings).
- **Star Gold**: `#F59E0B` / `#000000` (ratings rendered in solid black or dark charcoal).

#### CSS Custom Variables & OKLCH Theme Tokens
Configured in `app/globals.css` for shadcn/ui components:
```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --color-black: #111111;
}

.dark {
  --background: #111111;
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --border: oklch(1 0 0 / 10%);
}
```

### Button Styles & Micro-Interactions

1. **Light Button (`.light-button`)**:
   - Border: `1px solid #00000020`
   - Color: `#111111`
   - Pseudo-element (`::before`): Slides from `top: 100%` to `top: 0` with background `#111111` on hover.
   - Text color inverts to `#EDEEE7` smoothly (`transition: all 0.3s ease-in-out`).
   - Arrow icon rotates -45 degrees on hover.

2. **Dark Button (`.dark-button`)**:
   - Border: `1px solid #EDEEE7`
   - Color: `#EDEEE7`
   - Pseudo-element (`::before`): Slides up from `top: 100%` with background `#EDEEE7` on hover.
   - Text color inverts to `#111111` on hover.
   - Arrow icon rotates -45 degrees.

### Glassmorphism & macOS Notification Toast Styles
- **macOS Toast Notification (`.macos-toast`)**:
  ```css
  .macos-toast {
    background: #ffffff87 !important;
    backdrop-filter: blur(20px) saturate(130%) !important;
    border: 1px solid #ffffff73 !important;
    box-shadow: 0 8px 32px 0 #0000001f, 0 1px 2px 0 #0000000f, inset 0 0 0 1px #ffffff33 !important;
    border-radius: 18px !important;
    padding: 14px 20px !important;
  }
  ```
- **iOS Form Inputs (`.ios-input`)**:
  ```css
  .ios-input {
    padding: 14px 16px;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
    color: #ffffff !important;
    background-color: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(12px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
  }
  ```
- **Translucent Nav Header (`.nav-blur-bg`)**:
  ```css
  .nav-blur-bg {
    backdrop-filter: blur(20px) saturate(180%);
    background: rgba(255, 255, 255, 0.7) !important;
  }
  ```

---

## 10. Assets & Media

### Local Static Imagery (`public/images/`)
The project stores 20 optimized images locally:
1. `about.jpeg`: Factory craftsmanship and garment tailoring overview.
2. `box.png`: Icon badge representing custom branded packaging.
3. `daccilogosvg.png`: Legacy emblem graphic of DACCI APPAREL.
4. `gears.jpeg`: Gears & accessories collection showcase graphic.
5. `gloves.jpeg`: Athletic gloves collection showcase graphic.
6. `guarantee.png`: Quality guarantee certification badge.
7. `hero.jpeg`: High-resolution hero image fallback.
8. `hoody.jpeg`: Technical sportswear hoodie showcase image.
9. `logo.png`: Official SLOTS SPORTS WEAR brand mark.
10. `mens.jpeg`: Men's athletic wear collection showcase graphic.
11. `mobilehero.jpeg`: High-contrast portrait banner optimized for mobile screens.
12. `polo.jpeg`: Performance athletic polo silhouette.
13. `price-tag.png`: Low MOQ pricing differentiator badge.
14. `schedule.png`: Fast turnaround and scheduling badge.
15. `sdfjhjksadf.jpeg`: Prototype garment showcase visual.
16. `shop.png`: Category navigation icon thumbnail.
17. `shophero.jpeg`: Wide-angle banner visual for the catalog header.
18. `short.jpeg`: Performance athletic shorts showcase image.
19. `vest.jpeg`: Technical utility athletic vest image.
20. `womens.jpeg`: Women's activewear collection showcase graphic.

### Local Static Vector Icons (`public/icons/`)
Clean, line-style SVG icons loaded dynamically via `app/components/Icon.tsx`:
1. `arrow-right-01.svg`: Directional navigation arrow.
2. `login-02.svg`: Doorway auth doorway icon.
3. `menu.svg`: Mobile hamburger menu toggle.
4. `search.svg`: Lens search icon.
5. `shopping-bag.svg`: Shopping bag / wardrobe icon.
6. `user.svg`: Silhouette customer profile avatar.

### Local Video Assets (`public/videos/`)
- `hero.mp4`: Autoplaying background video capturing active athletes and factory manufacturing operations.

### Remote Media CDNs & Security Whitelist
Configured in `next.config.ts`:
- `res.cloudinary.com`: Primary CDN for all uploaded product galleries, variant images, and customer avatars.
- `i.pinimg.com`: Secondary visual reference images used for lifestyle banners and manufacturing steps.
- `ui-avatars.com`: Dynamic avatar generator fallback for customer profiles.

---

## 11. Website Content

### Core Brand Narrative & Value Propositions
- **Headline Statement**: "Slots Sports Wear — Premium Clothing Manufacturer | Low MOQ"
- **Founding Heritage**: Established in 2018 in Lahore / Punjab, Pakistan, expanding from a boutique workshop to an ISO-certified production facility with 100+ skilled artisans and 50,000+ monthly capacity.
- **Primary Audience**: Independent athletic apparel brands, fitness gym wear startups, sports clubs, corporate apparel programs, and wholesale distributors seeking custom OEM/ODM manufacturing partnerships.
- **Key Differentiators**:
  - **Low MOQ**: 50 pieces per style (enabling emerging brands to launch without massive risk).
  - **Rapid Prototyping**: Samples produced and dispatched within 7–14 business days.
  - **AQL 2.5 Quality Inspection**: Multi-stage inspection of fabric durability, stitching precision, and colorfastness.
  - **Global Express Freight**: Direct DHL and FedEx door-to-door delivery worldwide.

### Service Offerings (from `OurServices.tsx`)
1. **Premium Custom Apparel**: High-quality sportswear and casual clothing tailored to brand identities.
2. **Private Label Services**: Custom neck tags, woven labels, heat-transfer branding, and complete confidentiality.
3. **Bulk Scale Manufacturing**: High-volume assembly lines for global wholesale contracts.
4. **Global Export Solutions**: Seamless customs paperwork, commercial invoicing, and international freight handling.
5. **Bespoke Product Design**: In-house pattern making, digital tech pack consulting, and 3D modeling.
6. **Quality Assurance**: ISO-standard fabric shrinkage testing, seam strength verification, and color retention checks.
7. **Branding Solutions**: Customized hang tags, polybags, barcoding, and presentation packaging.

### Commercial Policies & Contractual Disclosures
- **Turnaround Timelines**: Sampling (7–14 days), Bulk Production (3–4 weeks upon sample approval), Air Delivery (5–10 days), Sea Delivery (20–35 days).
- **Payment Structure**: 30% advance production deposit; 70% balance payable upon production completion prior to bill of lading dispatch. Accepted channels include Bank Wire (T/T), PayPal, and Western Union.
- **Sample Approval Rule**: Physical sample approval is legally binding; bulk production replicates the signed-off prototype.

---

## 12. Forms & Interactive Features

### 1. B2B Tech Pack Submission Form (`app/contact/ContactClient.tsx`)
- **Endpoint**: `POST /api/contact/submit`
- **Form Fields**:
  - `name` (string, required): Client contact name.
  - `email` (string, required): Brand / company email address.
  - `company` (string, optional): Organization or apparel brand name.
  - `productType` (string, required): Garment category (Hoodie, T-Shirt, Short, etc.).
  - `productSlug` (string, optional): Referenced catalog prototype slug.
  - `quantity` (number, required): Requested production volume in pieces.
  - `deadline` (date string, required): Target delivery deadline.
  - `customizationDetails` (text, required): Detailed technical specifications (GSM, fabric blend, colors, printing, embroidery).
- **Data Action**: Inserts a new document into the `TechPack` collection in MongoDB (`isNewStatus: true`).
- **Notification Action**: Fires an HTML transactional email via Nodemailer to `ADMIN_EMAIL` with full inquiry details.

### 2. Quick Contact / Inquiry Form (`app/components/HomeContact.tsx`)
- **Endpoint**: `POST /api/subscribe`
- **Form Fields**: `firstName` (string), `contact` (email or WhatsApp number), `inquiry` (message text).
- **Action**: Validates server credentials and dispatches an immediate email alert to `ADMIN_EMAIL`.

### 3. Product Review Submission Form (`ReviewModal.tsx`)
- **Endpoint**: `POST /api/review/create`
- **Authentication**: Requires active Better-Auth user session.
- **Form Fields**: `product` (ObjectId), `rating` (number 1–5), `title` (string), `review` (string).
- **Action**: Inserts document into `Review` collection, recalculates product average rating, updates client state.

### 4. Live Search Modal Drawer (`Nav.tsx`)
- **Endpoint**: `GET /api/public/search?q=<query>`
- **Behavior**: Debounced live query matching title, slug, and category name against MongoDB; returns live suggestion cards.

### 5. Client Authentication Forms
- **Sign In Form (`/auth/signin`)**: Submits credentials to Better-Auth; triggers admin notification email on login.
- **Sign Up Form (`/auth/signup`)**: Submits name, email, custom phone, and password; triggers verification email.
- **Password Recovery Forms (`/auth/forget-password`, `/auth/reset-password`)**: Dispatches and validates cryptographic reset tokens.

### 6. Profile Editing Form (`/profile-edit`)
- **Action**: Uploads image directly to Cloudinary using signed signature from `/api/cloudinary-signature`, then updates name and phone via `PUT /api/customers/update`.

### 7. Administrative CRUD Forms
- **Category Add/Edit**: Name, unique slug, and sub-types array.
- **Product Add/Edit**: Product name, unique slug, category picker, product type, MRP, selling price, CKEditor description, Cloudinary media picker, tags.
- **Variant Add/Edit**: Parent product selector, SKU, color, size, MRP, selling price, image gallery.
- **Coupon Add/Edit**: Code, discount percentage, minimum shopping amount, validity deadline.

---

## 13. Product System

### Catalog Hierarchy & Entity Architecture
The product system is organized into a clean 3-tier hierarchy:
```
Category (e.g. "Sportswear", "Men", "Gloves")
   │
   └── Product (e.g. "Technical Pro Training Hoodie")
          │
          └── ProductVariant (e.g. Color: "Charcoal", Size: "XL", SKU: "TPH-CHR-XL")
```

1. **Category Level (`models/category.model.ts`)**:
   - Manages top-level navigation, collection grouping, and sub-type tags.
   - Indexed uniquely by `slug`.
   - Supports soft-delete archiving.

2. **Product Level (`models/product.model.ts`)**:
   - Represents the core garment design or prototype.
   - Stores general attributes: `name`, `slug`, `productType`, base `mrp`, `sellingPrice`, `discountPercentage`, rich HTML `description` (from CKEditor), array of `tags`, and default `media` ObjectIds.
   - References `Category` via ObjectId.
   - Supports soft-delete archiving (`deletedAt`).

3. **Product Variant Level (`models/productVariant.model.ts`)**:
   - Represents specific manufacturing variations (colorways, garment dimensions, sizes).
   - Stores specific attributes: `product` (parent ObjectId reference), `color`, `size`, unique `sku`, variant-specific `mrp`, variant-specific `sellingPrice`, `discountPercentage`, and variant-specific `media` gallery.
   - Allows different colors to present distinct photography sets.

### Pricing, MRP & Discounts
- Every product and variant maintains dual pricing:
  - `mrp`: Maximum Retail Price (reference standard).
  - `sellingPrice`: Active unit purchase or sample price.
  - `discountPercentage`: Percentage discount computed automatically in admin forms:
    `Math.round(((mrp - sellingPrice) / mrp) * 100)`.
- Prices displayed on the storefront default to USD (`$`), but JSON-LD structured data specifies currency as `PKR` in `app/product/[slug]/page.tsx`.

### Review & Social Proof Engine
- Products maintain independent customer reviews in the `Review` collection (`models/review.model.ts`).
- `averageRating` is calculated dynamically using MongoDB aggregation or reduce calculations across non-deleted reviews.
- Reviews tie to users in the separate `USERS` database, joined in memory during server rendering.

---

## 14. Data Architecture

### Dual-Database Architecture
A standout architectural characteristic of the project is the deliberate physical separation of business data from authentication data. Configured in `lib/database.ts`:

```
                      ┌───────────────────────────────────────────────┐
                      │             Next.js Application               │
                      └──────┬─────────────────────────────────┬──────┘
                             │                                 │
                 getApplicationConnection()            getUsersConnection()
                             │                                 │
                             ▼                                 ▼
              ┌─────────────────────────────┐   ┌─────────────────────────────┐
              │    APPLICATION DATABASE     │   │       USERS DATABASE        │
              │ (MONGODB_URL_APPLICATION)   │   │       (MONGODB_URL)         │
              ├─────────────────────────────┤   ├─────────────────────────────┤
              │ • products                  │   │ • user                      │
              │ • productvariants           │   │ • session                   │
              │ • categories                │   │ • account                   │
              │ • medias                    │   │ • verification              │
              │ • coupons                   │   └─────────────────────────────┘
              │ • reviews                   │
              │ • techpacks                 │
              └─────────────────────────────┘
```

1. **APPLICATION Database (`MONGODB_URL_APPLICATION`)**:
   - Managed via Mongoose (`mongoose.createConnection()`).
   - Hosts all e-commerce, content, and manufacturing collections.
   - Connection is cached globally on `global.mongooseMulti.application` across Next.js hot-reloads.
2. **USERS Database (`MONGODB_URL`)**:
   - Managed via both native `MongoClient` (for Better Auth) and Mongoose (`getUsersConnection()`).
   - Hosts user credentials, active sessions, account linkages, and email verification tokens.
   - Connection cached on `global.mongooseMulti.users`.

### Data Models & Schemas

#### 1. Category Schema (`models/category.model.ts`)
```typescript
{
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  types: [{ type: String, trim: true }],
  deletedAt: { type: Date, default: null, index: true },
  createdAt: Date,
  updatedAt: Date
}
// Bound to 'categories' collection in APPLICATION DB
```

#### 2. Product Schema (`models/product.model.ts`)
```typescript
{
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  productType: { type: String, trim: true, required: true },
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true }],
  description: { type: String, required: true },
  tags: [{ type: String, trim: true }],
  isNew: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null, index: true },
  createdAt: Date,
  updatedAt: Date
}
// Bound to 'products' collection in APPLICATION DB
```

#### 3. ProductVariant Schema (`models/productVariant.model.ts`)
```typescript
{
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  color: { type: String, required: true, trim: true },
  size: { type: String, required: false, trim: true, default: null },
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  sku: { type: String, required: true, unique: true },
  media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true }],
  deletedAt: { type: Date, default: null, index: true },
  createdAt: Date,
  updatedAt: Date
}
// Bound to 'productvariants' collection in APPLICATION DB
```

#### 4. Media Schema (`models/Media.model.ts`)
```typescript
{
  asset_id: { type: String, required: true, trim: true },
  public_id: { type: String, required: true, trim: true },
  path: { type: String, required: true, trim: true },
  thumbnail_url: { type: String, required: true, trim: true },
  secure_url: { type: String, required: true, trim: true },
  alt: { type: String, trim: true },
  title: { type: String, trim: true },
  deletedAt: { type: Date, default: null, index: true },
  createdAt: Date,
  updatedAt: Date
}
// Bound to 'medias' collection in APPLICATION DB
```

#### 5. Coupon Schema (`models/Coupon.model.ts`)
```typescript
{
  code: { type: String, required: true, unique: true, trim: true },
  discountPercentage: { type: String, required: true, unique: true, trim: true },
  minShoppingAmount: { type: String, required: true, unique: true, trim: true },
  validity: { type: Date, required: true },
  deletedAt: { type: Date, default: null, index: true },
  createdAt: Date,
  updatedAt: Date
}
// Bound to 'coupons' collection in APPLICATION DB
```

#### 6. TechPack Schema (`models/TechPack.model.ts`)
```typescript
{
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  productType: { type: String, required: true },
  productSlug: { type: String },
  quantity: { type: Number, required: true },
  deadline: { type: Date, required: true },
  customizationDetails: { type: String, required: true },
  isNewStatus: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}
// Bound to 'techpacks' collection in APPLICATION DB
```

#### 7. Review Schema (`models/review.model.ts`)
```typescript
{
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  review: { type: String, required: true },
  deletedAt: { type: Date, default: null, index: true },
  createdAt: Date,
  updatedAt: Date
}
// Bound to 'reviews' collection in APPLICATION DB
```

#### 8. User Schema (`models/User.model.ts`)
```typescript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  image: { type: String },
  phone: { type: Number },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
// Bound to 'user' collection in USERS DB
```

### Soft Delete Pattern
- Implemented uniformly on `Category`, `Product`, `ProductVariant`, `Media`, `Coupon`, and `Review`.
- Standard queries apply `{ deletedAt: null }` to exclude archived records.
- Soft-deleted items can be inspected, restored, or permanently deleted via the `/admin/trash` interface.

---

## 15. SEO Implementation

### Root Metadata & Social Graph
Defined in `app/layout.tsx`:
- **metadataBase**: `new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://slotssportswear.vercel.app')`
- **Title Configuration**:
  - Default: `Slots Sports Wear — Premium Clothing Manufacturer | Low MOQ`
  - Template: `%s | Slots Sports Wear`
- **Meta Description**: `Slots Sports Wear is a premium clothing manufacturer based in Pakistan offering high-quality custom apparel, activewear, and formal wear with low minimum order quantities starting at 50 pieces.`
- **Keywords**: `clothing manufacturer Pakistan`, `custom apparel manufacturer`, `low MOQ clothing`, `bulk clothing manufacturer`, `custom activewear`, `custom sportswear`, `private label clothing`, `Slots Sports Wear`, `Pakistan garment factory`.
- **OpenGraph & Twitter Card**: Full-width social preview card with image (`https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp`), `1200x630` dimensions, type `website`.
- **Robots Indexation**: `index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' }`.

### Structured Data (JSON-LD)
1. **Organization Schema (`app/layout.tsx`)**:
   - Injected globally on every page via `components/JsonLd.tsx`:
     ```json
     {
       "@context": "https://schema.org",
       "@type": "Organization",
       "name": "Slots Sports Wear",
       "url": "https://slotssportswear.vercel.app",
       "logo": "https://slotssportswear.vercel.app/images/logo.png",
       "description": "Premium clothing manufacturer in Pakistan offering high-quality custom apparel, activewear, and formal wear with low MOQ starting at 50 pieces.",
       "address": {
         "@type": "PostalAddress",
         "addressCountry": "PK"
       },
       "contactPoint": {
         "@type": "ContactPoint",
         "contactType": "customer service",
         "url": "https://slotssportswear.vercel.app/contact"
       }
     }
     ```
2. **Product Schema (`app/product/[slug]/page.tsx`)**:
   - Injected server-side on product detail pages:
     - `@type`: `Product`
     - `name`: Product title
     - `description`: Truncated 500-character description
     - `sku`: Product slug
     - `brand`: `{ "@type": "Brand", "name": "Slots Sports Wear" }`
     - `category`: Category name
     - `offers`: Price currency (`PKR`), selling price, availability (`InStock`), seller (`Slots Sports Wear`)
     - `aggregateRating`: Dynamic rating value and review count when reviews exist.

### Dynamic Sitemap & Robots.txt
- **Sitemap Generator (`app/sitemap.ts`)**:
  - Revalidates hourly (`revalidate = 3600`).
  - Statically includes `/`, `/shop`, `/about`, `/contact`.
  - Queries active MongoDB products (`deletedAt: null`) to dynamically emit `/product/[slug]` URLs with `lastModified` set to the product's `updatedAt` timestamp.
- **Robots Directives (`app/robots.ts`)**:
  - Allows search engine crawlers on all public storefront pages.
  - Disallows private and transactional paths: `/admin/`, `/dashboard/`, `/api/`, `/auth/`.
  - Declares canonical sitemap location: `https://slotssportswear.vercel.app/sitemap.xml`.

---

## 16. Performance Implementation

### Next.js Image Optimization
Configured in `next.config.ts`:
- **Modern Next-Gen Formats**: `formats: ['image/avif', 'image/webp']` enabled.
- **Remote Host Optimization**: Directly optimizes Cloudinary CDN assets (`res.cloudinary.com`), Pinterest lifestyle references (`i.pinimg.com`), and UI avatar fallbacks (`ui-avatars.com`).
- **Preconnect Hints**: `app/layout.tsx` specifies preconnect links to `res.cloudinary.com` and `i.pinimg.com` to shave round-trip connection times on asset discovery.

### Package Import Tree-Shaking
Configured in `next.config.ts`:
```typescript
experimental: {
  optimizePackageImports: [
    '@mui/material',
    '@mui/icons-material',
    'lucide-react',
    'react-icons',
    'recharts',
  ],
}
```
Eliminates unused barrel-file code from bulky libraries during production build bundling.

### Font Performance
Custom fonts (`main`, `middle`) declare `font-display: swap` in `globals.css`, ensuring immediate text rendering with system fallbacks to prevent Flash of Invisible Text (FOIT).

### Dynamic Code Splitting & No-SSR
- **CKEditor 5**: Dynamically imported client-side only to prevent Node.js window/DOM errors and reduce initial JS bundle size.
- **Locomotive Scroll**: Loaded asynchronously within `useEffect` in `SmoothScroll.tsx` to isolate heavy smooth-scrolling computations from critical render path.

### Response Compression & Headers
- `compress: true` enabled in `next.config.ts`.
- `poweredByHeader: false` enabled for HTTP header payload reduction and security obscurity.
- API endpoints specify caching headers (e.g. `Cache-Control: public, s-maxage=600, stale-while-revalidate=3600` on `/api/public/stats`).

---

## 17. Accessibility Implementation

### Semantic Structure & Landmarks
- Standard HTML5 semantic elements used: `<main>`, `<header>`, `<nav>`, `<footer>`, `<section>`, `<article>`.
- Headings follow logical nesting hierarchy (`h1`, `h2`, `h3`).

### Accessible Component Primitives (Radix UI)
- All modal dialogs, drawers, dropdowns, and tooltips utilize Radix UI primitives with built-in ARIA roles (`role="dialog"`, `aria-modal="true"`, `aria-expanded`, `aria-haspopup`).
- Focus trapping inside open dialogs (`ReviewModal`, `OrdersPage` inquiry modal) and keyboard dismissal via `Escape` key.

### Visual Contrast & Form Accessibility
- High contrast pairing of dark text (`#111111`) against warm linen canvas (`#EDEEE7`).
- Form controls declare matching `<label>` elements with `htmlFor` association.
- Focus outlines provided on interactive elements (`outline-ring/50`).

---

## 18. Dependencies

### Production Dependencies (`package.json`)
| Package Name | Exact Version | Category | Purpose |
| :--- | :--- | :--- | :--- |
| `next` | `16.1.4` | Framework | Next.js 16 App Router full-stack web framework |
| `react` | `19.2.3` | Core | React 19 UI component library |
| `react-dom` | `19.2.3` | Core | React DOM renderer |
| `better-auth` | `^1.4.16` | Authentication | Full-stack auth engine with MongoDB adapter |
| `mongodb` | `^7.0.0` | Database | Native MongoDB driver for Better Auth |
| `mongoose` | `^9.1.5` | Database | Mongoose Object Data Modeling for business entities |
| `@tanstack/react-query` | `^5.90.20` | State Management | Async server state and cache synchronization |
| `@tanstack/react-query-devtools` | `^5.91.2` | Development Tool | React Query visual inspection tool |
| `axios` | `^1.13.4` | Networking | Promise-based HTTP client for API interactions |
| `zod` | `^4.3.6` | Validation | TypeScript-first schema declaration and validation |
| `react-hook-form` | `^7.71.1` | Forms | Form state management and submission |
| `@hookform/resolvers` | `^5.2.2` | Forms | Zod resolver adapter for React Hook Form |
| `gsap` | `^3.14.2` | Animation | Professional animation library |
| `@gsap/react` | `^2.1.2` | Animation | Official React wrapper and hooks for GSAP |
| `locomotive-scroll` | `^5.0.1` | Animation | Smooth scrolling engine (Lenis powered) |
| `cloudinary` | `^2.9.0` | Media | Server-side Cloudinary SDK |
| `next-cloudinary` | `^6.17.5` | Media | Client-side Cloudinary widgets and components |
| `nodemailer` | `^8.0.4` | Email | SMTP email delivery engine |
| `ckeditor5` | `^47.4.0` | Rich Text | WYSIWYG rich text editor |
| `@ckeditor/ckeditor5-react` | `^11.0.1` | Rich Text | React wrapper for CKEditor 5 |
| `material-react-table` | `^3.2.1` | Admin UI | Material UI data table component |
| `@mui/material` | `^7.3.7` | Admin UI | Material Design components for admin panel |
| `@mui/icons-material` | `^7.3.7` | Admin UI | Material Design SVG icons |
| `@mui/x-date-pickers` | `^8.26.0` | Admin UI | Date pickers for admin coupon management |
| `@emotion/react` | `^11.14.0` | Styling | CSS-in-JS library required by MUI |
| `@emotion/styled` | `^11.14.1` | Styling | Styled components required by MUI |
| `recharts` | `^3.7.0` | Admin UI | Composable SVG charting library for dashboard stats |
| `lucide-react` | `^0.563.0` | Icons | Minimalist icon toolkit |
| `react-icons` | `^5.5.0` | Icons | Comprehensive multi-library vector icon set |
| `react-hot-toast` | `^2.6.0` | Notifications | Lightweight toast notification library |
| `next-themes` | `^0.4.6` | Theming | Dark/light theme provider for admin panel |
| `@radix-ui/react-dialog` | `^1.1.15` | UI Primitives | Accessible modal dialog primitive |
| `@radix-ui/react-dropdown-menu` | `^2.1.16` | UI Primitives | Accessible dropdown menu primitive |
| `@radix-ui/react-slot` | `^1.2.4` | UI Primitives | Slot component for polymorphic element rendering |
| `@radix-ui/react-label` | `^2.1.8` | UI Primitives | Accessible form label primitive |
| `@radix-ui/react-checkbox` | `^1.3.3` | UI Primitives | Accessible checkbox primitive |
| `@radix-ui/react-separator` | `^1.1.8` | UI Primitives | Accessible divider primitive |
| `@radix-ui/react-tooltip` | `^1.2.8` | UI Primitives | Contextual tooltip primitive |
| `@radix-ui/react-collapsible` | `^1.1.12` | UI Primitives | Collapsible accordion disclosure primitive |
| `radix-ui` | `^1.4.3` | UI Primitives | Radix UI suite package |
| `cmdk` | `^1.1.1` | UI Primitives | Fast command palette menu primitive |
| `class-variance-authority` | `^0.7.1` | Styling | Type-safe CSS variant composer |
| `clsx` | `^2.1.1` | Styling | Class name conditional utility |
| `tailwind-merge` | `^3.4.0` | Styling | Merge conflicting Tailwind CSS classes |
| `bcryptjs` | `^3.0.3` | Security | Password hashing library |
| `dayjs` | `^1.11.19` | Utilities | Lightweight date parsing and formatting |
| `slugify` | `^1.6.6` | Utilities | String slug generator for categories and products |
| `export-to-csv` | `^1.4.0` | Utilities | Client-side CSV file exporter for admin tables |
| `entities` | `^7.0.1` | Utilities | HTML entity encoding/decoding library |

### Dev Dependencies (`package.json`)
| Package Name | Exact Version | Purpose |
| :--- | :--- | :--- |
| `typescript` | `^5` | TypeScript language compiler |
| `tailwindcss` | `^4` | Tailwind CSS v4 framework |
| `@tailwindcss/postcss` | `^4` | PostCSS integration plugin for Tailwind CSS v4 |
| `tw-animate-css` | `^1.4.0` | Animation utilities extension for Tailwind CSS |
| `eslint` | `^9` | JavaScript and TypeScript linter |
| `eslint-config-next` | `16.1.4` | Official Next.js ESLint rules and best practices |
| `@svgr/webpack` | `^8.1.0` | Webpack loader for importing SVGs as React components |
| `@types/node` | `^20` | TypeScript type declarations for Node.js runtime |
| `@types/react` | `^19` | TypeScript type declarations for React 19 |
| `@types/react-dom` | `^19` | TypeScript type declarations for React DOM |
| `@types/nodemailer` | `^7.0.11` | TypeScript type declarations for Nodemailer |

---

## 19. Configuration

### 1. `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' }
    ]
  },
  experimental: {
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      'lucide-react',
      'react-icons',
      'recharts',
    ],
  },
};

export default nextConfig;
```

### 2. `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. `components.json` (shadcn/ui)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### 4. `postcss.config.mjs`
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### 5. `eslint.config.mjs`
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

---

## 20. Integrations

### 1. Cloudinary Media Asset Hosting & Processing
- **Cloud Account**: Identified via `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
- **Upload Preset**: Client uploads trigger unsigned/preset-based delivery using `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.
- **Cryptographic Upload Signatures**: `/api/cloudinary-signature` utilizes `CLOUDINARY_SECRET_KEY` via the Cloudinary v2 SDK to generate SHA-based signatures for secure browser-direct file uploads.
- **Media Records**: Registered files automatically populate the `Media` collection in MongoDB for instant reuse across products.

### 2. Nodemailer & Google SMTP Transactional Emailing
- **Transport Mechanism**: `nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })`.
- **Transactional Triggers**:
  1. Email Verification on Sign-up (`getEmailVerifyHtml`).
  2. Password Reset Token Link (`getResetPasswordEmailHtml`).
  3. New User Registration Alert sent to `ADMIN_EMAIL`.
  4. User Login Notification Alert sent to `ADMIN_EMAIL`.
  5. New Tech Pack Inquiry / Custom Order Submission sent to `ADMIN_EMAIL`.
  6. Homepage Quick Inquiry Submission sent to `ADMIN_EMAIL`.

### 3. Better Auth Authentication Provider
- **Adapter**: Native `mongodbAdapter` connecting to the `USERS` database.
- **Features Active**: Email and password credentials, mandatory verification requirement, session management, reset password hooks, and custom schema plugin for phone numbers.

### 4. Direct WhatsApp Live Chat
- **Integration**: Floating interactive widget linking directly to WhatsApp Web / App:
  `https://wa.me/923319165413?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20premium%20clothing%20manufacturing%20services.`

---

## 21. Security & Environment Variables

### Environment Variables Audit
All 15 environment variables identified in `.env.local` (documented by variable name and purpose only; no secret keys or passwords disclosed):

| Variable Name | Exposure Scope | Sensitive | Purpose & Architectural Role |
| :--- | :--- | :--- | :--- |
| `BETTER_AUTH_SECRET` | Server-side Only | **YES** | Cryptographic secret used for signing session cookies and authentication tokens in Better-Auth. |
| `BETTER_AUTH_URL` | Server-side Only | No | Canonical origin URL of the authentication service (e.g. `http://localhost:3000` or production URL). |
| `MONGODB_URL` | Server-side Only | **YES** | MongoDB connection string for the USERS database (`user`, `session`, `account`, `verification`). |
| `MONGODB_URL_APPLICATION` | Server-side Only | **YES** | MongoDB connection string for the APPLICATION database (`products`, `categories`, `techpacks`, etc.). |
| `NODE_ENV` | System Runtime | No | Node environment designation (`development` vs `production`). |
| `ADMIN_SECRET_HASH` | Server-side Only | **YES** | Cryptographic hash used for legacy admin verification or backend utility script authorization. |
| `COMPANY_EMAIL` | Server-side / Client | No | Fallback company email address (`slotssportswear@gmail.com`). |
| `ADMIN_EMAIL` | Server-side Only | **YES** | Administrative email receiving inquiry notifications, order alerts, and checked by `adminAuth()`. |
| `ADMIN_EMAIL_PASSWORD` | Server-side Only | **YES** | Gmail SMTP App Password used by Nodemailer to authenticate email dispatch. |
| `NEXT_PUBLIC_EMAIL_ADDRESS` | Public (Client Bundle) | No | Support and sales email displayed in the website header, footer, and inquiry mailers. |
| `NEXT_PUBLIC_PHONE_NUMBER` | Public (Client Bundle) | No | Official company contact phone number displayed in footers and contact sections. |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Public (Client Bundle) | No | Preset identifier used by `CldUploadWidget` for client asset uploads to Cloudinary. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Public (Client Bundle) | No | Cloudinary cloud identifier used to construct public asset URLs. |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Public (Client Bundle) | No | Cloudinary public API key for widget authorization. |
| `CLOUDINARY_SECRET_KEY` | Server-side Only | **YES** | Cloudinary secret API key used for generating upload signatures and executing deletions. |

### Access Control & Authorization Security
- **Strict Role-Based Admin Protection**: Server-side helper `adminAuth()` in `lib/adminhelperfunction.ts` requires:
  1. An active session retrieved via `auth.api.getSession()`.
  2. `session.user.emailVerified === true`.
  3. Strict equality: `session.user.email === process.env.ADMIN_EMAIL`.
- **Database Query Isolation**: Public API routes systematically enforce `deletedAt: null` on Mongoose queries to prevent accidental leakage of archived records.
- **Client Direct Uploads**: Client file uploads bypass Next.js application servers by transmitting directly to Cloudinary using signed authorization tokens, preventing Denial of Service (DoS) from large file buffering.

---

## 22. Deployment

### Target Platform & Infrastructure
- **Hosting Platform**: Vercel Serverless Platform (verified by staging deployment `https://slotssportswear.vercel.app`).
- **Database Infrastructure**: MongoDB Atlas Cloud Clusters hosting both `APPLICATION` and `USERS` database namespaces.
- **CDN & Media Hosting**: Cloudinary Global Media CDN.

### Build Commands & Packaging
- **Development Server**: `npm run dev` (`next dev`).
- **Production Build**: `npm run build` (`next build`).
- **Production Start**: `npm run start` (`next start`).
- **Linter**: `npm run lint` (`eslint`).

---

## 23. Business Logic

### B2B Prototyping & Tech Pack Inquiries vs Traditional E-Commerce
The defining business architectural reality of SLOTS SPORTSWEAR is that it operates as a **custom manufacturing inquiry and lead-generation portal** rather than an instant self-serve retail store:
1. **"Add to Wardrobe" Routing**:
   - On the product detail page (`app/product/[slug]/components/ProductInfo.tsx`), clicking "Add to Wardrobe" does not add an item to an in-memory shopping cart.
   - Instead, it reads the product's category and slug, and redirects the user:
     ```typescript
     router.push(`/contact?type=${encodeURIComponent(type)}&slug=${encodeURIComponent(product.slug)}#teckpack`);
     ```
   - This directly opens the custom Tech Pack submission form prefilled with the garment category and prototype reference.
2. **Cart Page Status (`/cart`)**:
   - The cart page explicitly renders an informational apology: "Cart Experience Coming Soon — We are currently refining our minimalist checkout flow... This page will be available very soon."
   - Provides CTAs to browse the catalog (`/shop`) or request a custom quote (`/contact`).
3. **Admin "Orders" Reality**:
   - In the administrative sidebar, "Orders" routes to `app/(root)/(admin)/admin/orders/page.tsx`.
   - This view queries `/api/contact/get`, which fetches records from the `TechPack` collection.
   - When an admin views an inquiry, clicking the row marks `isNewStatus: false` via `PUT /api/contact/update/[id]`.
4. **Algorithmic Social Proof Metrics**:
   - In `app/api/public/stats/route.ts`, the system computes:
     ```typescript
     const totalOrders = Math.floor(totalCustomers * 1.5) + ratingResult.length;
     ```
   - Because there is no automated checkout `Order` model, the platform derives an estimated order metric from registered customers and review activity to provide social proof on the storefront.

---

## 24. Important File Relationships

### Data Flow & Dependency Architecture

```
                                ┌─────────────────────────┐
                                │   Root Layout / App     │
                                │   (app/layout.tsx)      │
                                └────────────┬────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
         ┌───────────────────────────┐               ┌───────────────────────────┐
         │     Storefront Routes     │               │    Admin Route Group      │
         │  (/, /shop, /product/*)   │               │   (root)/(admin)/admin/*  │
         └─────────────┬─────────────┘               └─────────────┬─────────────┘
                       │                                           │
                       │                                           ▼
                       │                             ┌───────────────────────────┐
                       │                             │    adminAuth() Guard      │
                       │                             │ (lib/adminhelperfunction) │
                       │                             └─────────────┬─────────────┘
                       │                                           │
                       ▼                                           ▼
         ┌───────────────────────────┐               ┌───────────────────────────┐
         │     Public API Routes     │               │     Admin API Routes      │
         │     (/api/public/*)       │               │   (/api/[entity]/*)       │
         └─────────────┬─────────────┘               └─────────────┬─────────────┘
                       │                                           │
                       └─────────────────────┬─────────────────────┘
                                             │
                                             ▼
                               ┌───────────────────────────┐
                               │     Database Manager      │
                               │     (lib/database.ts)     │
                               └─────────────┬─────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
         ┌───────────────────────────┐               ┌───────────────────────────┐
         │    APPLICATION Database   │               │      USERS Database       │
         │   (Products, Reviews,     │               │   (Better Auth Users,     │
         │     TechPacks, Media)     │               │    Sessions, Accounts)    │
         └───────────────────────────┘               └───────────────────────────┘
```

### Key Cross-File Bindings
- **`lib/database.ts` <-> All Models**: Every Mongoose schema file dynamically imports `getApplicationConnection()` or `getUsersConnection()` to bind itself to the correct isolated database connection pool.
- **`lib/adminhelperfunction.ts` <-> `app/(root)/(admin)/admin/layout.tsx` & Admin APIs**: The `adminAuth()` guard protects both server-rendered admin layouts and administrative API route handlers.
- **`app/context/LoaderContext.tsx` <-> `TransitionButton.tsx` & `Nav.tsx`**: Coordinates application-wide page transitions by managing transition safety and curtain triggers.
- **`hooks/useDeleteMutation.ts` <-> `DataTableWrapper.tsx` & `app/admin/trash/page.tsx`**: Manages soft deletion (`deleteType="SD"`) and permanent purge (`deleteType="PD"`) across all entity controllers.
- **`lib/zodSchema.ts` <-> Client Forms & API Routes**: Provides shared field validation across all frontend React Hook Form instances and backend route handlers.

---

## 25. Special Behaviors & Animations

### 1. Pinned 4-Step Process Timeline (`app/about/components/HowItWorks.tsx`)
- Uses GSAP `ScrollTrigger` with `pin: true` and `scrub: 3`.
- Pins the section for `steps.length * 350vh` of scroll depth.
- Synchronously tracks an active capsule background, toggles text color from black to white, expands description accordions, and wipes in next-step photography using animated CSS `clipPath` masks.
- Automatically snaps to each step with `snapTo: 1 / 3` and `duration: { min: 0.8, max: 2.5 }`.

### 2. Pinned Split-Screen Capabilities Reel (`app/components/OurServices.tsx`)
- Pinned for 700vh of scroll distance.
- Left panel crossfades through 7 manufacturing service descriptions (`opacity: 0 -> 1`).
- Right panel translates an image train (`trainRef`) smoothly along the Y-axis (desktop) or X-axis (mobile) to display matching photography.

### 3. Character-by-Character Staggered Typography (`app/components/Heading.tsx`)
- Splits string titles into words and individual characters (`.char`).
- Animates each character from `translateY(100%)` to `translateY(0%)` with `ease: "expo.out"` and `stagger: 0.02` when scrolled into view.

### 4. Coordinated Page Transition Curtain (`app/context/LoaderContext.tsx`)
- Intercepts navigation actions.
- Slides multiple vertical black columns down to conceal the screen.
- Runs an animated progress counter (`0% -> 100%`) paired with an infinite brand marquee.
- Waits for the incoming route to signal `setIsReady(true)` before sliding columns upwards to reveal the new page.

### 5. Fullscreen Lightbox Image Marquee (`app/product/[slug]/components/GalleryMarquee.tsx`)
- Opens an immersive portal on the product detail page.
- Animates all high-resolution garment angles along a continuous infinite horizontal marquee track.

### 6. Momentum Scroll Smoothing (`app/components/SmoothScroll.tsx`)
- Dynamically loads Locomotive Scroll v5 / Lenis.
- Enforces an ultra-smooth interpolation factor (`lerp: 0.001`, `duration: 1.2`) across the document root.

---

## 26. Current Implementation Status

### Fully Implemented & Operational Features
- [x] Next.js 16 App Router architecture with TypeScript strict mode.
- [x] Multi-database connection caching separating business data from auth data (`lib/database.ts`).
- [x] Better-Auth email/password authentication, registration, session management, and custom phone plugin.
- [x] Mandatory email verification workflow with automated Nodemailer dispatch.
- [x] Password recovery and reset token workflows.
- [x] Role-based admin access control (`adminAuth()`) gated to `ADMIN_EMAIL`.
- [x] Storefront homepage with hero video, animated counters, categories, pinned services, and brand narrative.
- [x] Dynamic shop catalog with taxonomy filters, branding tags, sale filter, sorting, and pagination.
- [x] Server-rendered dynamic product detail pages with variant switching, gallery, and related products.
- [x] Verified product review submission and display system.
- [x] B2B Tech Pack / custom manufacturing submission portal with database storage and admin email dispatch.
- [x] Complete Administrative CRUD modules for Categories, Products, Product Variants, Coupons, and Reviews.
- [x] Admin Media Library with direct Cloudinary Upload Widget integration.
- [x] Admin Inquiries / Orders dashboard with detail modal and status toggling.
- [x] Multi-entity soft delete and recycle bin management (`/admin/trash`).
- [x] Google JSON-LD structured data for Organization and Products.
- [x] Dynamic XML sitemap (`/sitemap.xml`) and crawler directives (`/robots.txt`).
- [x] Custom macOS frosted glass toast notifications and floating WhatsApp direct messaging widget.

### Partially Implemented Features
- [ ] **Coupons System**: Fully implemented in the database schema, Zod validation, and administrative CRUD panel (`/admin/coupon`), but not currently active on the storefront due to the cart checkout page being under construction.
- [ ] **User Account Editing**: Profile name, phone, and avatar photo can be updated via `/profile-edit`, but address book and order history sub-modules are not yet present.

### Placeholder & Mocked Features
- [ ] **Direct E-Commerce Cart Checkout**: `/cart` renders a deliberate "Status: In Development" apology page directing users to browse the catalog or contact sales.
- [ ] **Order Metrics**: Public order counts in `/api/public/stats` use an algorithmic formula derived from customers and reviews because no transactional checkout `Order` model exists.
- [ ] **Customer Reviews in Test File**: `test-reviews.js` remains as a root developer scratch script for testing cross-database joins.

---

## 27. Known Limitations / TODOs

1. **`lib/nodemailer.ts` Variable Scoping Bug**:
   - In `lib/nodemailer.ts` (lines 6–7), the transporter configuration references `user: companyEmail` and `pass: companyPassword`, which are undefined variables in that file's module scope.
   - However, `app/api/subscribe/route.ts` creates its own explicit `mailOptions` with `process.env.ADMIN_EMAIL`, and `lib/auth.ts` relies on the transporter. In production, if `lib/nodemailer.ts` is evaluated without global bindings for those variables, Nodemailer authentication can fail unless the environment variables are explicitly passed.
2. **Absence of Direct Payment Gateway**:
   - The platform currently has no payment processor SDKs (e.g. Stripe, PayPal, LemonSqueezy) installed in `package.json`. All financial transactions for bulk orders are handled off-platform via bank wire (T/T), PayPal invoicing, or Western Union as documented in the FAQ.
3. **Coupon Schema Uniqueness Constraints**:
   - In `models/Coupon.model.ts`, both `discountPercentage` and `minShoppingAmount` specify `unique: true` in their Mongoose schemas. This will cause MongoDB duplicate key errors if two different coupon codes share the same discount percentage (e.g. two 10% off coupons).
4. **Missing Legal Pages in Dynamic Sitemap**:
   - `app/sitemap.ts` statically includes `/`, `/shop`, `/about`, and `/contact`, plus dynamic product pages, but omits `/story`, `/faq`, `/policy`, `/refund`, `/shipping`, and `/terms`.
5. **Orphan Root Artifacts**:
   - `11.12.1`: An accidental npm error log file located at the repository root.
   - `prompts`: A raw developer prompt note left at the repository root.
   - `test-reviews.js`: A scratch diagnostic script located at the repository root.

---

## 28. UNKNOWN / NOT VERIFIED

The following items cannot be definitively confirmed from the local source code and configuration alone, and are formally categorized as `UNKNOWN / NOT VERIFIED`:

- **Physical Manufacturing Facility Address**: The website copy and footer cite "Lahore, Pakistan" and "Punjab, Pakistan", but the exact street address, industrial zone, and GPS coordinates of the factory floor are `UNKNOWN / NOT VERIFIED`.
- **Google Analytics / Tag Manager IDs**: No tracking measurement IDs (e.g. `G-XXXXXXXXXX`) or Google Tag Manager scripts are configured in source files; external analytics setup is `UNKNOWN / NOT VERIFIED`.
- **Google Search Console Verification Tokens**: No HTML meta tags or DNS TXT records for Search Console ownership verification are declared in source; external console status is `UNKNOWN / NOT VERIFIED`.
- **Production MongoDB Atlas Cluster Configuration**: The exact topology, replica set configuration, backup schedule, and hardware tier of the live MongoDB Atlas database are managed externally and are `UNKNOWN / NOT VERIFIED`.
- **DNS & Custom Domain SSL Provider**: External DNS record routing (Cloudflare, Vercel DNS, or registrar) between `slotssportswear.com` and Vercel servers is `UNKNOWN / NOT VERIFIED`.
- **Third-Party Email Relay Quotas**: Exact daily sending limits and reputation scores for the Gmail SMTP relay account are `UNKNOWN / NOT VERIFIED`.
- **Physical Factory Machinery Models**: Specific brands of laser cutting tables, embroidery machines, or sublimation heat presses mentioned in marketing copy are `UNKNOWN / NOT VERIFIED`.

---

## 29. AI / Developer Quick Reference

### Essential Project Cheat Sheet

- **Core Identity**: SLOTS SPORTSWEAR (Legacy: `dacciapparel`)
- **Framework**: Next.js 16.1.4 (App Router) + React 19.2.3 + Tailwind CSS v4
- **Primary Architecture**: B2B Sportswear Custom Manufacturing & Tech Pack Inquiry Portal

### Critical File Locations
- **Database Connection Manager**: `lib/database.ts`
- **Authentication Setup**: `lib/auth.ts` & `lib/auth-client.ts`
- **Admin Role Security**: `lib/adminhelperfunction.ts` (`adminAuth()`)
- **Zod Form Schemas**: `lib/zodSchema.ts`
- **Admin Table Columns**: `lib/column.tsx`
- **Global Layout & SEO**: `app/layout.tsx`
- **Dynamic Sitemap**: `app/sitemap.ts`
- **Catalog Page Controller**: `app/shop/page.tsx` & `app/components/ShopClient.tsx`
- **Product Page Controller**: `app/product/[slug]/page.tsx` & `ProductClient.tsx`
- **Tech Pack Form**: `app/contact/ContactClient.tsx`
- **Inquiry Submission API**: `app/api/contact/submit/route.ts`
- **Admin Inquiries / Orders**: `app/(root)/(admin)/admin/orders/page.tsx`

### Standard Terminal Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production build
npm run build

# Start production server
npm run start

# Run ESLint validation
npm run lint
```

### Common Developer Gotchas
1. **Adding a New Model**: Must bind to the appropriate connection pool via `getApplicationConnection()` (for business data) or `getUsersConnection()` (for auth data) in `lib/database.ts`.
2. **Admin Access Testing**: User must have `emailVerified: true` in MongoDB and their email must exactly match `process.env.ADMIN_EMAIL`.
3. **Product Imagery**: Products and variants must reference image documents created in the `Media` collection (`models/Media.model.ts`); direct URL strings are not permitted in the product schema.
4. **CKEditor 5**: Always dynamically import with `{ ssr: false }` to prevent SSR window errors.
5. **Soft Deletes**: Always include `{ deletedAt: null }` in Mongoose queries unless deliberately implementing trash views.
6. **Homepage B2B Positioning & Metadata**: The homepage (`app/page.tsx`) operates as an App Router Server Component exporting target B2B metadata (`Custom Sportswear Manufacturer | OEM Teamwear Supplier`) and delegates client interactivity to `app/components/HomePageClient.tsx`. All homepage sections (`HeroSection`, `CompanyStats`, `PopularCategories`, `HorizontalCategories`, `OurServices`, `Whychooseus`) are configured for B2B sportswear, OEM, and private label manufacturing messaging.
7. **About Page B2B OEM Transformation**: The About page (`app/about/page.tsx`, `AboutClient.tsx`, `components/HowItWorks.tsx`) is positioned as a custom sportswear OEM/ODM manufacturing authority with metadata `About Us | Custom Sportswear Manufacturer`, covering custom apparel development, technical fabric sourcing, private label manufacturing, factory capabilities (AQL 2.5, 50,000+ units/mo), and a 4-step roadmap (Tech Pack, Sampling, Production, QC & Delivery).
8. **Catalog & Shop Page B2B Transformation**: The catalog page (`app/shop/page.tsx`, `ShopHero.tsx`, `ShopFilters.tsx`, `ShopClient.tsx`, `ProductItem.tsx`, `ShopBreadcrumb.tsx`) is transformed into a professional B2B sportswear manufacturing catalog:
   - **SEO Metadata**: Absolute title `Custom Sportswear Collection | OEM Apparel Manufacturer` and description `Explore custom sportswear collections including teamwear, activewear and performance apparel manufactured for global brands and wholesale buyers.`.
   - **Shop Hero**: Heading `Custom Sportswear Collection` and description `Explore our complete range of custom sportswear, teamwear and activewear solutions designed for global brands, teams and wholesale buyers.`.
   - **B2B Categories**: `Teamwear`, `Golfwear`, `Fitness Apparel`, `Activewear`, `Running Wear`, and `Training Wear` with expandable sportswear types and quick category navigation pills.
   - **Customization Services**: `Sublimation`, `Embroidery`, `Screen Printing`, and `Private Label` filters.
   - **B2B Product Cards**: Clean 4-tier layout: Product Image $\rightarrow$ Dynamic Category Name $\rightarrow$ Dynamic Product Name $\rightarrow$ `REQUEST QUOTE & TECH PACK` button (white normal state, black hover state with staggered rolling text animation on desktop and press scale effect on mobile; all retail prices, currency, and discount info removed).
   - **Tech Pack Banner**: Rectangular `#111111` premium shape with single-line text `Low 50-piece MOQs, sample turnaround in 7–14 days, and worldwide shipping.` and direct submission link to `/contact#teckpack`.
   - **Internal Linking**: Seamless integration linking to sportswear categories, product detail pages (`/product/[slug]`), and custom tech pack submission (`/contact#teckpack`).
9. **Phase 13 B2B SEO Content CMS & Internal Linking Engine**:
   - **Data Architecture**: Built native Content Management System on MongoDB models `SEOPage` and `KnowledgeArticle`.
   - **Schema Fields**: Added `status` ('Draft' | 'Published' | 'Archived'), `searchIntent`, `targetKeyword`, `secondaryKeywords`, `canonicalUrl`, `noIndex`, `relatedKnowledgeGuides`, and `relatedArticles`.
   - **Admin CMS**: Protected workspace under `/admin/seo` with sub-routes for Solution landing pages (`/admin/seo/solutions`) and Technical Knowledge Hub guides (`/admin/seo/knowledge`), featuring real-time title/meta description length counters, fabric specifications matrix, and FAQ schema builders.
   - **Bidirectional Linking**: Solution pages automatically cross-link to relevant technical knowledge articles (`app/components/seo/RelatedKnowledgeGuides.tsx`), and Knowledge articles cross-link to commercial OEM solutions (`RelatedSolutions.tsx`), building topical authority and commercial conversion pathways.
   - **Indexation Safeguards**: Drafts are blocked via `robots: { index: false, follow: false }` and strictly excluded from dynamic XML sitemaps (`app/sitemap.ts`).
   - **Static Fallback Guarantee**: Public pages (`/solutions/[slug]` and `/knowledge/[slug]`) always fall back gracefully to hardcoded static datasets (`solutionsData.ts` and `knowledgeData.ts`) if the database is unpopulated or disconnected.
10. **Phase 14 B2B Buyer Portal, RFQ Tracking & Production Status Experience**:
   - **Buyer Portal Architecture**: Transformed `/dashboard` into an active B2B manufacturing portal. Created dedicated inquiry tracking routes at `/dashboard/inquiries` and `/dashboard/inquiries/[id]`.
   - **Session Binding & Ingestion**: Enhanced `Lead` model (`models/Lead.model.ts`) with `userId: { type: String, trim: true, default: '', index: true }`. In `app/api/contact/submit/route.ts`, resolved Better Auth session via `auth.api.getSession` to attach `userId` for authenticated buyers while preserving full support for guest submissions.
   - **Guest-to-Account Auto-Linking**: Authenticated query `{ $or: [{ userId }, { email: userEmail.toLowerCase() }] }` ensures guest RFQ submissions automatically surface in the buyer's portal once they sign up or log in with that email address.
   - **Strict Server-Side Anti-IDOR Security**: Every inquiry query validates identity against the authenticated session. If Buyer B attempts to access Buyer A's inquiry via `/api/account/inquiries/[id]` or `/dashboard/inquiries/[id]`, the system returns HTTP 404 / access denied.
   - **Factory Intelligence Isolation (Zero Margin / Note Leaks)**: Internal factory notes (`notes`), FOB margins / contract values (`estimatedValue`), and internal urgency ranking (`priority`) are strictly stripped from all buyer-facing responses.
   - **5-Stage Public Progress Timeline**: Maps internal CRM stages (`New`, `Contacted`, `Sample Requested`, `Production`, `Completed`) into buyer-facing milestones (`Inquiry Received` -> `Review In Progress` -> `Prototype Sampling` -> `Bulk Production` -> `Order Completed & Shipped`) with dynamic `isCurrent` and `isCompleted` states.
   - **SEO & Privacy Guard**: Dashboard and inquiry routes explicitly export `robots: { index: false, follow: false }` to prevent search engine indexing of private buyer orders and specifications.
11. **Phase 15 Authentication, Email Delivery & Professional Environment Configuration Hardening**:
   - **SMTP Authentication Decoupling**: In `lib/nodemailer.ts`, SMTP authentication credentials (`SMTP_USER`, `SMTP_PASS`) are strictly decoupled from inbound notification inboxes (`COMPANY_EMAIL`) and administrator identities (`ADMIN_EMAIL`).
   - **Dual-Driver Architecture**: When targeting `smtp.gmail.com`, `lib/nodemailer.ts` uses Nodemailer's native `service: 'gmail'` transport to avoid Windows socket `ECONNRESET` greeting timeouts. When targeting custom domain mailboxes (Hostinger, Amazon SES, Mailgun), it seamlessly adapts to standard `host`, `port`, and `secure`.
   - **Clean Environment Separation**: `.env.local` is organized into 7 clearly documented sections. Secrets must NEVER be exposed through `NEXT_PUBLIC_*` variables or committed to version control.
   - **Template & Documentation Single Source of Truth**: [`.env.example`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/.env.example) provides a sanitized template with placeholder values, and [`docs/environment-variables.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/environment-variables.md) provides comprehensive operational playbooks for credential rotation and production (Vercel) deployments.
   - **Admin Access Enforcement**: `adminAuth()` in `lib/adminhelperfunction.ts` checks both `session.user.email === process.env.ADMIN_EMAIL` and `session.user.emailVerified === true`. To transfer admin ownership, the new owner must first register and verify their email, then update `ADMIN_EMAIL`.
12. **Stabilization Sprint: Global Typography Repair & Login Notification Data Alignment**:
   - **Full Original Typography Restoration**: All recent typography workarounds (including `unicode-range`, `SafeDisplayText.tsx`, and `<FormattedTitle>`) were completely reverted to restore the exact original visual appearance of `BrigendsExpanded`. Despite structural limitations within the font asset itself, no fallbacks or character-level replacements are permitted, guaranteeing the primary alphabetical glyphs retain their intended bold, heavy weight across all environments.
   - **Domain & Identity Alignment**: All canonical links, JSON-LD schemas, sitemaps, robots directives, and form placeholders are synchronized to `https://slotssportswear.vercel.app`.
   - **Email Role Isolation**: Inbound factory inquiries route through `slotssportswear@gmail.com`. Administrative access to `/admin/*` is bound to the owner's verified MongoDB account `shahrankhalid0@gmail.com`.
   - **Login Notification Data Integrity**: Database queries inside Better Auth hooks were rewritten to properly cast string user IDs into MongoDB `ObjectId` types, preventing false `Unknown User` or `Unknown Email` admin notifications upon real user logins.

13. **Phase 16 B2B Brand Story Page Modernization**:
   - **Story Route Transformation**: The `/story` route was rebuilt into a robust B2B manufacturing heritage page, emphasizing factory capacity, technical modernization (tech packs, OEM/ODM), and global scale. Consumer-facing retail jargon was strictly purged.
   - **SEO Integrity**: Injected targeted metadata emphasizing custom sportswear manufacturing, OEM factory heritage, and global B2B capabilities, anchored by an explicit canonical URL to the active production domain.
   - **Performance & GSAP Retention**: Transitioned the structural framework to a Server Component (`app/story/page.tsx`), leaning solely on the pre-existing client-side `<Heading>` GSAP animation engine without injecting superfluous scroll libraries or duplicate typography wrappers.


14. **Phase 17 Desktop UX & B2B Authentication Popup Refinements**:
   - **Desktop Fullscreen Nav Overflow Fix**: Transitioned the fullscreen overlay menu links (\HOME\, \SHOP\, \FAQ\, etc.) from hardcoded \md:gap-12\ and \md:text-7xl\ to fluid CSS clamps (\md:text-[clamp(2rem,5.5vh,4.5rem)]\ and \md:gap-[max(1rem,2.5vh)]\). This dynamic sizing ensures that all 7 items scale correctly inside the viewport on smaller laptops at 100% zoom without triggering vertical overflow or hidden boundaries.
   - **B2B Entrance Notification (Popup) Evolution**: Rebuilt \EntranceNotification.tsx\ into a sophisticated state-aware B2B portal prompt. Replaced generic retail copy ('10% off') with wholesale/tech-pack messaging. Implemented strict rendering boundaries: triggers only on \/\ and \/shop\, strictly for unauthenticated users, after either a 20-second delay or 40% vertical scroll depth. Added \localStorage\ integration (\slots_popup_dismissed\) to persistently honor dismissals across sessions, while strictly preserving the luxury \BrigendsExpanded\ GSAP-animated presentation layer.

## Phase 20: Final Enterprise QA & Technical Audit
- Executed full codebase sweep isolating a Unicode metadata rendering error (?") across all page layouts. Repaired via global Node.js RegExp replacement.
- Audited pp/sitemap.ts and corrected the programmatic omission of the B2B /story route.
- Verified TypeScript stability (
pm run build & 
px tsc --noEmit PASS).
- Confirmed RFQ/CRM flow maps successfully without data loss.
- Created docs/complete-website-audit-report.md.

## Phase 20.1: Pre-Design Stabilization & Regression Audit
- Verified global ix_encoding.js script replaced legitimate � (em-dash) with - (hyphen). Confirmed this did not damage punctuation or cause literal question mark truncation.
- Re-audited dmin route existence. Successfully verified that /admin/leads and /admin/seo exist within pp/(root)/(admin)/admin/ and are robustly protected via dminAuth checking.
- Confirmed Typography BrigendsExpanded fallbacks remain cleanly structured inside pp/globals.css.
- Confirmed dataLayer is fully structured for B2B analytics, but noted that Google Tag Manager or GA4 tags are currently missing from layout.tsx (Analytics is 'ready', but not transmitting).
- Passed all regression requirements for product badges, entrance popup boundaries, and CRM MongoDB mapping.

## Phase 20.2: Final Pre-Design Production Readiness & Verification
- Fixed an accidental JSX syntax error in ReviewModal.tsx, page.tsx (knowledge), and SolutionForm.tsx introduced by the global encoding script where ?" replacement unintentionally swallowed double-quotes in React string attributes.
- Resolved the "Unknown User" issue in lib/auth.ts. The legacy raw MongoDB query (db.collection('user').findOne) was failing due to ObjectId parsing on userId strings that weren't 24-character hex strings in some contexts, logging Unknown User in Admin emails. Rewrote the handler to securely import and use the Mongoose User model (User.findById), mapping the identity natively into the email template.
- Verified TypeScript compilation successfully passes across all files (
px tsc --noEmit).
- Triggered final production build (
pm run build) to guarantee structural integrity.

## Phase 20.3: Final Live Verification
- Checked SMTP configurations internally to send live test emails but was blocked by a Google BadCredentials error (invalid password for slotssportswear@gmail.com). Marked email delivery tests as OWNER ACTION REQUIRED.
- Marked all visual tests (animations, product badges, responsive screen breaks, font character bypasses) as NOT VERIFIED since accurate validation strictly demands a visual/headed browser environment.
- Verified that the "Unknown User" fix dynamically extracts names properly in lib/auth.ts, ensuring Mongoose replaces the error-prone string ID lookups in raw MongoDB.
- Project remains stable, built, and compiled perfectly. Phase 20 concludes here.

## Phase 21: Shop Taxonomy & Navbar Linking
- Safely implemented strict DB product category migrations without data loss. Re-assigned 31 products natively based on exact subcategory string matches to the requested 6 categories. Left 21 legacy ambiguous products untouched. 
- Integrated dynamic API response mapping into Nav.tsx and ShopFilters.tsx to strictly serve the required order and subset of navigation categories (Golfwear, Teamwear, Fitness Apparel, Activewear).

- **Phase 22 Update**: Successfully verified Phase 1 (Admin auth verification) and Phase 2 (7 Manufacturing timeline WebP images). Refined Admin Dashboard and Sidebar UI mapping onto the correct SLOTS SPORTSWEAR design system (font-[main], font-[middle], font-[AeonikBold], #EDEEE7 background, #111111 surfaces) stripping generic gradients. Verified build stability.

- **Phase 22.1 Update**: Fixed Admin Sidebar header regression (clipping text) by adjusting font size to fit the expanded typeface. Extracted Footer to a ConditionalFooter wrapper to cleanly unmount the public footer from all /admin boundaries. Converted UserDropdown placeholder text into a styled profile avatar. Verified 'Unknown User' reviews correctly map to orphaned database entries.

- **Admin Sidebar Correction**: Replaced the top-left 'SLOTS ADMIN' heading with 'ADMIN' in pp/(root)/(admin)/admin/components/SideBar.tsx to maintain compact aesthetics while preserving the BrigendsExpanded typography. Successfully verified via TypeScript compiler.

- **Phase 23.1 Update**: Cleaned up the exposed SMTP credentials from Phase 23. Deleted test-smtp.js and scrubbed passwords from all documentation. Required the owner to rotate the compromised Google App Password. Statically verified CRM isolation, canonical SEO configs, and NodeMailer env variable mappings. Reclassified E2E email testing and responsive layouts as NOT VERIFIED (requiring manual QA).
