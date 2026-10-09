# SLOTS SPORTSWEAR – Project Requirements Document (PRD)

> **Document Status**: Approved / Single Source of Truth  
> **Target Live Production Domain**: `https://slotssportswear.vercel.app`  
> **Staging / Vercel Reference**: `https://slotssportswear.vercel.app`  
> **Business Model**: Custom B2B Sportswear OEM & ODM Manufacturing  
> **Document Purpose**: Complete Business and Product Requirements Specification  

---

## Table of Contents
1. [Section A: What To Build](#section-a-what-to-build)
   - [1. Business Purpose & Company Identity](#1-business-purpose--company-identity)
   - [2. Transformation from Retail E-Commerce to B2B OEM/ODM Platform](#2-transformation-from-retail-e-commerce-to-b2b-oemodm-platform)
   - [3. Primary Website Objectives & KPI Goals](#3-primary-website-objectives--kpi-goals)
   - [4. Manufacturing Inquiry & RFQ Workflow](#4-manufacturing-inquiry--rfq-workflow)
   - [5. Manufacturing Product Catalog Purpose](#5-manufacturing-product-catalog-purpose)
   - [6. B2B Tech Pack Submission System Architecture](#6-b2b-tech-pack-submission-system-architecture)
2. [Section B: Targeted Users & Client Personas](#section-b-targeted-users--client-personas)
   - [1. Global Sportswear Brands](#1-global-sportswear-brands)
   - [2. Private Label Clothing Companies](#2-private-label-clothing-companies)
   - [3. Professional Sports Teams & Clubs](#3-professional-sports-teams--clubs)
   - [4. Gym Wear & Activewear Startups](#4-gym-wear--activewear-startups)
   - [5. Wholesale Distributors & Volume Buyers](#5-wholesale-distributors--volume-buyers)
   - [6. Athletic Apparel & Performance Wear Companies](#6-athletic-apparel--performance-wear-companies)
3. [Section C: Feature Specifications](#section-c-feature-specifications)
   - [1. Homepage (`/`)](#1-homepage-)
   - [2. Manufacturing Process Specification Page (`/manufacturing-process`)](#2-manufacturing-process-specification-page-manufacturing-process)
   - [3. About Us & Factory Heritage (`/about`)](#3-about-us--factory-heritage-about)
   - [4. B2B Shop / Catalog Experience (`/shop`)](#4-b2b-shop--catalog-experience-shop)
   - [5. Dynamic Product Manufacturing Pages (`/product/[slug]`)](#5-dynamic-product-manufacturing-pages-productslug)
   - [6. Contact & Tech Pack Inquiry Portal (`/contact`)](#6-contact--tech-pack-inquiry-portal-contact)
   - [7. Authentication System (`/auth/*`)](#7-authentication-system-auth)
   - [8. Customer Dashboard (`/dashboard`)](#8-customer-dashboard-dashboard)
   - [9. Admin Dashboard (`/admin/*`)](#9-admin-dashboard-admin)
   - [10. Media Management Architecture (`/admin/media`)](#10-media-management-architecture-adminmedia)
   - [11. Inquiry & Tech Pack Order Management (`/admin/orders`)](#11-inquiry--tech-pack-order-management-adminorders)
4. [Section D: Business Rules & Operational Policies](#section-d-business-rules--operational-policies)
   - [1. Minimum Order Quantity (MOQ) Rules](#1-minimum-order-quantity-moq-rules)
   - [2. Prototyping & Sampling Timelines](#2-prototyping--sampling-timelines)
   - [3. OEM (Original Equipment Manufacturing) Workflow](#3-oem-original-equipment-manufacturing-workflow)
   - [4. ODM (Original Design Manufacturing) Workflow](#4-odm-original-design-manufacturing-workflow)
   - [5. Global Logistics & Shipping Infrastructure](#5-global-logistics--shipping-infrastructure)
   - [6. Quality Assurance & AQL 2.5 Inspection Standard](#6-quality-assurance--aql-25-inspection-standard)

---

## Section A: What To Build

### 1. Business Purpose & Company Identity
**SLOTS SPORTSWEAR** (historically referenced in codebase packages as `dacciapparel`) is an elite custom sportswear, activewear, and athletic apparel manufacturer headquartered in Punjab, Pakistan (industrial apparel manufacturing hub with direct operations dating back to 2018).

The enterprise operates as a dedicated **Original Equipment Manufacturer (OEM)** and **Original Design Manufacturer (ODM)** for international sports brands, fitness startups, university athletic departments, gym wear lines, and corporate activewear distributors across North America, Europe, the United Kingdom, Australia, and the Middle East.

### 2. Transformation from Retail E-Commerce to B2B OEM/ODM Platform
Historically conceived as a direct-to-consumer (D2C) retail storefront with consumer shopping carts, individual retail pricing, coupon checkouts, and return badges, the digital platform has undergone a comprehensive transformation into an **exclusive B2B manufacturing showroom and inquiry portal**:

1. **Elimination of D2C Retail Mechanisms**:
   - Retail unit prices, strikethrough MRPs, and consumer discount badges (`SALE -20%`) have been removed from the public customer catalog.
   - "Add to Cart" and "Add to Wardrobe" retail transaction triggers have been replaced with **"Request Quote & Tech Pack"** and **"Discuss Your Project"** B2B conversion triggers.
   - Retail consumer return badges have been replaced with **"Sample Approval Before Bulk"** and **"AQL 2.5 Quality Inspection Guaranteed"**.

2. **Establishment of Manufacturing Credibility**:
   - Global wholesale and factory credibility indicators (`5000+ Units Monthly Capacity`, `50 Pieces Minimum Order Quantity`, `7–14 Days Prototyping Lead Time`, `Worldwide Air & Sea Freight`) integrated across all viewports.
   - Conversion of consumer categories into technical manufacturing categories (*Custom Teamwear*, *Technical Golfwear*, *Compression & Fitness*, *Sublimated Sports Uniforms*, *Private Label Activewear*).

3. **Tech Pack-First Architecture**:
   - The primary call-to-action (CTA) across all product cards and individual specification sheets directs prospects to submit technical specs, digital vector artwork, measurement charts, and fabric requirements.

```
       [ Client Discovery: Homepage / Catalog / Process ]
                             │
                             ▼
              [ Inspect Technical B2B Catalog ]
        (Fabrics, GSM, Stitching, OEM Customization)
                             │
                             ▼
         [ Request Quote / Submit Tech Pack ]
     (Passes Product Type, Slug, Expected Quantities)
                             │
                             ▼
         [ Multi-Step B2B Inquiry Processing ]
   ┌─────────────────────────┴─────────────────────────┐
   ▼                                                   ▼
[ MongoDB Database Storage ]               [ Nodemailer SMTP Dispatch ]
(TechPack Model in admin portal)          (Automated notification to factory)
   │                                                   │
   └─────────────────────────┬─────────────────────────┘
                             ▼
           [ Factory Review & Sample Development ]
         (7-14 Days Prototype -> Physical Approval)
                             │
                             ▼
              [ Scaled Bulk Manufacturing ]
            (50 to 50,000+ Units / AQL 2.5 QC)
```

### 3. Primary Website Objectives & KPI Goals
1. **Lead Generation & Qualified RFQ Capture**: Generate qualified high-intent manufacturing inquiries from brand founders, procurement managers, and team equipment directors.
2. **Technical Credibility Display**: Showcase factory capabilities (fabric knitting, technical sourcing, laser cutting, flatlock stitching, sublimation, embroidery, screen printing, private labeling, custom packaging).
3. **Frictionless Tech Pack Onboarding**: Enable clients to submit design ideas, vector artwork, or detailed measurement sheets with immediate quotation routing.
4. **Preservation of Luxury Aesthetic**: Maintain a world-class, editorial aesthetic characterized by obsidian black (`#111111`), warm parchment cream (`#EDEEE7`), bespoke typography (`BrigendsExpanded`, `Freigeist-Light`), and GSAP animations without sacrificing page speed or SEO performance.

### 4. Manufacturing Inquiry & RFQ Workflow
The procurement lifecycle follows a structured sequence:
1. **Catalog Exploration**: The buyer inspects styles, cuts, and silhouettes in `/shop` or `/manufacturing-process`.
2. **Specification Review**: The buyer reviews fabric composition, available GSM weights, stitching methods, and private labeling options on `/product/[slug]`.
3. **RFQ Initiation**: Clicking `REQUEST QUOTE & TECH PACK` opens `/contact?type=<category>&slug=<slug>#teckpack`, pre-populating target product parameters.
4. **Data Ingestion**: The prospect supplies company name, contact email, country, estimated volume, target delivery deadline, selected customization options, and detailed technical specifications.
5. **Database & Email Ingestion**:
   - Stored in MongoDB under the `TechPack` collection with `isNewStatus: true`.
   - Dispatched via Nodemailer SMTP to the factory engineering and production team.
6. **Factory Follow-Up**: Production representatives evaluate fabric availability, create a quotation matrix based on quantity tiers, and initiate direct communication via WhatsApp or email within 24 business hours.

### 5. Manufacturing Product Catalog Purpose
The catalog does not serve as an inventory-stocked warehouse for immediate delivery. Instead, every catalog item serves as a **Manufacturing Archetype**:
- **Design Foundation**: Shows the factory's structural cutting pattern, silhouette engineering, and seam geometry.
- **Customization Matrix**: Demonstrates where logos can be placed, what printing methods are compatible, and what technical fabrics can be applied.
- **Prototyping Baseline**: Serves as a reference for brands to say: *"We want this exact hoodie cut, but constructed from 460 GSM organic French Terry with puff print on the chest and custom silicone aglets."*

### 6. B2B Tech Pack Submission System Architecture
The submission engine is implemented in [`app/contact/ContactClient.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/contact/ContactClient.tsx) and powered by the API endpoint `/api/contact`:
- **State Pre-population**: Reads URL query parameters (`?type=...&slug=...`) to bind inquiry context to specific products.
- **Form Fields**:
  - `name`: Contact person full name.
  - `email`: Corporate / business email address.
  - `company`: Brand or athletic organization name.
  - `country`: Delivery destination for logistics calculation.
  - `website`: Existing brand store or social handle for verification.
  - `productType`: Target product category (Hoodies, Tracksuits, Jerseys, etc.).
  - `quantity`: Exact required production run (validated against MOQ 50 pcs).
  - `deadline`: Target delivery date for production scheduling.
  - `customizationOptions`: Array of selected capabilities (Screen Printing, Embroidery, Sublimation, Custom Woven Labels, Custom Hangtags, Custom Polybags).
  - `customizationDetails`: Detailed notes on GSM weight, Pantone colors, measurements, and tech pack link.

---

## Section B: Targeted Users & Client Personas

### 1. Global Sportswear Brands
- **Profile**: Established athletic lifestyle, performance running, or outdoor wear brands requiring scalable OEM supply chain partners.
- **Key Pain Points**: Inconsistent seam quality, delayed ocean freight schedules, high defect rates, inflexible communication.
- **Platform Needs**: Verification of factory equipment, AQL 2.5 audit compliance, high monthly capacity (50,000+ units), laboratory color matching.

### 2. Private Label Clothing Companies
- **Profile**: Direct-to-consumer e-commerce brands and boutique fashion labels seeking custom garments branded with their proprietary identity.
- **Key Pain Points**: Generic blanks, inability to alter sizing/grading, lack of custom neck labels and retail packaging.
- **Platform Needs**: Complete bespoke trim programs (woven labels, silicone badges, branded drawcords, barcoded polybags), modern silhouettes.

### 3. Professional Sports Teams & Clubs
- **Profile**: Football, basketball, rugby, cricket, and collegiate sports organizations requiring specialized team kits.
- **Key Pain Points**: Fading colors, cracking numbers, peeling sponsor logos, long lead times between seasons.
- **Platform Needs**: Industrial dye-sublimation, reinforced flatlock seams, moisture-wicking and antimicrobial technical knits, exact player number personalization.

### 4. Gym Wear & Activewear Startups
- **Profile**: Influencer-led brands, cross-training apparel startups, and modern boutique fitness studios launching their first collection.
- **Key Pain Points**: Sky-high factory minimums (300–500 pcs per color), lack of tech pack guidance, expensive sampling fees.
- **Platform Needs**: Low 50-piece MOQ, rapid 7–14 day physical prototyping, sample review and iterative revisions before committing capital.

### 5. Wholesale Distributors & Volume Buyers
- **Profile**: Regional sporting goods wholesalers and bulk uniform suppliers.
- **Key Pain Points**: Margin erosion, supply chain bottlenecks, unpredictable international logistics.
- **Platform Needs**: Volume-tiered price structures, containerized sea freight logistics, predictable production calendars.

### 6. Athletic Apparel & Performance Wear Companies
- **Profile**: Technical compression, cycling, yoga, and MMA apparel brands requiring high-elastane performance knits.
- **Key Pain Points**: Fabric chafing, poor 4-way stretch recovery, sheer transparency in leggings.
- **Platform Needs**: Seamless knitting, 4-way stretch testing, interlock stitching, breathable mesh zonal ventilation.

---

## Section C: Feature Specifications

### 1. Homepage (`/`)
- **Hero Section**: High-impact editorial video background (`bg.mp4`) with luxury headline *"CUSTOM SPORTSWEAR MANUFACTURER FOR GLOBAL BRANDS"* and sub-headline highlighting OEM & ODM solutions.
- **Manufacturing Credibility Bar**: 4-column desktop / single-column mobile metric counters displaying `5000+` Monthly Capacity, `50` Pieces Starting MOQ, `7-14` Days Prototyping, and `Worldwide` Express Shipping.
- **Interactive Capabilities Reel**: Split-screen sticky capabilities showcasing custom pattern development, fabric sourcing, printing, embroidery, QC, and logistics.
- **Horizontal Category Reel**: Horizontal scrolling showcase of core manufacturing categories.
- **Factory Trust Process**: Step-by-step overview of the client journey from Tech Pack audit to global freight.

### 2. Manufacturing Process Specification Page (`/manufacturing-process`)
- **Dedicated Route**: Standalone page demonstrating technical transparency and factory precision.
- **Hero Narrative**: Centered, editorial presentation of factory engineering standards.
- **Manufacturing Credibility Stats**: Synchronized with homepage stats (`CompanyStats.tsx`) with slow, human-readable counter animations (`5000+` over 3.5s, `50` over 2.5s, `7-14` over 2.5s, `Worldwide` over 2.5s).
- **Seven Stages Of Precision Craftsmanship**:
  - Full obsidian `#111111` background.
  - Alternating desktop timeline with center spine line.
  - Strictly equal-height detail cards and image cards (`items-stretch`, `min-h-[460px]`).
  - Stage 01: Tech Pack Audit
  - Stage 02: Fabric Sourcing & Testing
  - Stage 03: 7–14D Prototyping
  - Stage 04: Precision Laser Cutting
  - Stage 05: Sublimation & Embroidery
  - Stage 06: AQL 2.5 Quality Inspection
  - Stage 07: Worldwide Logistics & Express Freight
- **B2B Call-to-Action**: Dark container with non-wrapping rolling text CTA button leading directly to Tech Pack submission.

### 3. About Us & Factory Heritage (`/about`)
- **Factory History**: Established in 2018 in Punjab, Pakistan; detailing the growth from a dedicated sampling studio to an international sportswear exporter.
- **Pinned 4-Stage Production Workflow**: Interactive GSAP pinned horizontal scroll detailing:
  - Step 01: Conceptual Design & Tech Pack Finalization
  - Step 02: Pattern Engineering & Sampling
  - Step 03: Bulk Assembly & High-Speed Sewing Lines
  - Step 04: Final QC Packaging & Export Logistics
- **Ethos & Certifications**: Deep dive into ethical labor practices, safe working environments, fair compensation, and sustainable fabric options (organic cotton, recycled polyester).

### 4. B2B Shop / Catalog Experience (`/shop`)
- **OEM Catalog Presentation**: Clean multi-column product grid featuring custom sportswear silhouettes.
- **Low MOQ Banner**: Sleek rectangular `#111111` banner announcing *"Low 50-piece MOQs, sample turnaround in 7–14 days, and worldwide shipping."*
- **Product Card Badging**: Cards display `OEM / ODM AVAILABLE` and `MOQ 50 PCS` badges.
- **Card CTA**: Pill button with rolling text animation displaying `REQUEST QUOTE` routing directly to `/contact?type=<category>&slug=<slug>#teckpack`.
- **Filtering System**: Multi-faceted filter by manufacturing categories, target sportswear types, and sorting algorithms.

### 5. Dynamic Product Manufacturing Pages (`/product/[slug]`)
- **Dynamic Routing**: Server-rendered pages with rich OpenGraph metadata and JSON-LD schema.
- **Manufacturing Category Label**: Clear classification (e.g., `OEM SPORTSWEAR / PERFORMANCE HOODIE`).
- **Product Title & Short Description**: Highlighting custom fabrics, private labeling, and wholesale ordering.
- **B2B Spec Bar**: Visual pill tags for `MOQ: 50 Pieces`, `Sample Time: 7-14 Days`, `Lead Time: 3-4 Weeks`, `Shipping: DHL/FedEx Worldwide`.
- **High-Converting Dual B2B CTAs**:
  - Primary CTA: `REQUEST QUOTE & TECH PACK` (Routes to contact form pre-filled).
  - Secondary CTA: `DISCUSS YOUR PROJECT` (Direct WhatsApp trigger or live inquiry modal).
- **Product Manufacturing Details (3-Card Matrix)**:
  - Card 1: *Fabric Options* (GSM weights, poly-cotton blends, fleece, French Terry, moisture-wicking knits).
  - Card 2: *Customization Methods* (Screen printing, embroidery, sublimation, silicone badges, woven labels).
  - Card 3: *Production Capabilities* (Pattern grading, sizing XS–5XL, custom packaging).
- **Client Information Accordion / Tabs**:
  - Tab 1: Product Overview & Technical Silhouette Specs
  - Tab 2: Customization Options & Artwork Guidelines
  - Tab 3: Why Choose This Product (Durability, Shrink Resistance)
  - Tab 4: Manufacturing Capability & Capacity Metrics
  - Tab 5: B2B FAQ (Sample costs, payment terms, revisions)
- **From Design To Delivery (6-Step Workflow)**: Step-by-step visual manufacturing pipeline embedded on every product page.

### 6. Contact & Tech Pack Inquiry Portal (`/contact`)
- **Hero**: Centered editorial heading *"Start Your Custom Sportswear Project"*.
- **3 Balanced Inquiry Channel Cards**:
  - Card 1: *Production Inquiry* (OEM orders, private label, teamwear production).
  - Card 2: *Technical Support* (Tech pack assistance, fabric consulting, sizing charts).
  - Card 3: *Global Sales* (Wholesale contracts, distributor pricing, factory visits).
- **Comprehensive Tech Pack Form**: Complete B2B inquiry form supporting multi-select customization options, volume selectors, target deadlines, and project notes.
- **Factory Trust Footer Section**: Statistics aligned with homepage trust metrics.

### 7. Authentication System (`/auth/*`)
- **Technology**: Built on **Better Auth** (`better-auth` 1.4) with native MongoDB adapter.
- **Routes**:
  - `/auth/signin`: Email and password login with session cookie generation.
  - `/auth/signup`: Account creation with email verification trigger.
  - `/auth/forget-password`: Password reset request triggering signed token email.
  - `/auth/reset-password`: Token validation and password update.
  - `/auth/verifyemail`: Email confirmation handling with auto-redirect to homepage.
- **Email Infrastructure**: Decoupled Nodemailer SMTP architecture (`lib/nodemailer.ts`) supporting standard SMTP relays (Google Workspace, Hostinger, SES, Mailgun) with dual-driver support. Delivers responsive HTML email templates ([`lib/email-verify.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/email-verify.tsx), [`lib/email-reset.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/email-reset.tsx)) with branded SLOTS SPORTSWEAR headers.
- **Admin Authorization Contract**: Administrative access to `/admin/*` requires two simultaneous conditions checked by `adminAuth()`: session email matches `ADMIN_EMAIL` AND `emailVerified: true`.


### 8. Customer Dashboard (`/dashboard`)
- **Customer Portal**: Authenticated customer account view.
- **Sections**:
  - Profile overview (Name, Email, Company, Phone, Shipping Address).
  - Project Inquiries & Tech Pack History: List of submitted RFQs and status updates.
  - Profile Edit Page (`/profile-edit`): Form to update contact details, company billing, and preferences.

### 9. Admin Dashboard (`/admin/*`)
- **Administrative Layout**: Protected layout (`app/(root)/(admin)/admin/layout.tsx`) requiring administrative credentials.
- **Sub-Modules**:
  - `/admin/dashboard`: Visual metrics, inquiry charts, recent tech pack submissions, customer signups.
  - `/admin/category`: Category listing, creation (`/add-category`), and editing (`/edit-category/[id]`).
  - `/admin/product`: Product catalog management, creation (`/add-product`), and editing (`/edit-product/[id]`).
  - `/admin/product-variant`: Size, color, and technical SKU variant management.
  - `/admin/orders`: Complete management of B2B Tech Pack submissions, quotations, and inquiry statuses.
  - `/admin/customers`: Registered client and user directory.
  - `/admin/coupon`: B2B promotional / contract discount codes.
  - `/admin/review`: Client review moderation and publishing workflow.
  - `/admin/trash`: Soft-delete recovery bin for products, categories, and inquiries.

### 10. Media Management Architecture (`/admin/media`)
- **Integrated Cloudinary System**: Direct image and document uploading to Cloudinary CDN.
- **Media Library**: Searchable grid of uploaded assets with metadata tags.
- **Modal Picker**: `MediaModal.tsx` allows administrative users to select existing assets or upload new ones directly from product/category editors without leaving the page.

### 11. Inquiry & Tech Pack Order Management (`/admin/orders`)
- **Inquiry Dashboard**: Real-time table powered by TanStack React Query and Material React Table.
- **Status Pipeline**:
  - `New Inquiry`: Fresh submission awaiting engineering review.
  - `Under Review`: Factory evaluating tech pack and fabric availability.
  - `Quote Sent`: Cost matrix dispatched to buyer.
  - `Sampling`: Physical prototype in production.
  - `Sample Dispatched`: DHL/FedEx tracking provided to buyer.
  - `Bulk Approved`: Client approved sample; bulk PO issued.
  - `Closed / Completed`: Finished order delivered.

---

## Section D: Business Rules & Operational Policies

### 1. Minimum Order Quantity (MOQ) Rules
- **Standard Style MOQ**: **50 pieces per style / colorway**.
- **Size Breakdown**: Within the 50-piece minimum, clients may distribute quantities across standard adult sizing (e.g., 10x S, 15x M, 15x L, 10x XL).
- **Custom Fabric Knitting MOQ**: In cases where clients require bespoke yarn dyeing or custom fabric knitting unavailable in open stock, a higher fabric MOQ of 150–300 pieces applies.
- **Sample Exception**: Physical prototypes for testing and approval can be ordered in quantities of 1–2 pieces prior to committing to bulk production.

### 2. Prototyping & Sampling Timelines
- **Turnaround Time**: **7 to 14 business days** from tech pack approval and sampling invoice settlement.
- **Sampling Scope**:
  - Pattern grading and laser cutting according to client measurement charts.
  - Full color sublimation or embroidery application.
  - Custom brand tags and size labels affixed.
- **Sample Review Protocol**: High-resolution studio photography and video inspection dispatched digitally, followed by express door-to-door courier dispatch (DHL/FedEx).
- **Revision Policy**: One round of measurement or aesthetic adjustments included prior to bulk production cutting.

### 3. OEM (Original Equipment Manufacturing) Workflow
- **Client Responsibility**: Client provides complete Tech Packs, vector artwork (.AI, .PDF, .EPS), Pantone color codes, fabric weight preferences, and branded packaging specifications.
- **Factory Responsibility**: SLOTS SPORTSWEAR executes exact replication of client designs, sourcing matching fabrics, engineering pattern cuts, applying branding, and executing bulk assembly.

### 4. ODM (Original Design Manufacturing) Workflow
- **Client Responsibility**: Client selects existing silhouette archetypes from the SLOTS SPORTSWEAR catalog and supplies brand logos, color themes, and general aesthetic direction.
- **Factory Responsibility**: Factory design team prepares digital mockups, develops the tech pack, generates size grading, produces the physical sample, and delivers finished private-label apparel.

### 5. Global Logistics & Shipping Infrastructure
- **Express Air Logistics**:
  - **Carriers**: DHL Express and FedEx International Priority.
  - **Transit Time**: 5 to 10 business days worldwide.
  - **Use Case**: Sample prototypes, urgent teamwear deliveries, and small-to-medium volume production runs (50–500 pcs).
- **Commercial Sea Freight**:
  - **Carriers**: Maersk, MSC, COSCO from Karachi Port (PKBQM/PKKHI).
  - **Transit Time**: 20 to 35 business days depending on destination port.
  - **Use Case**: High-volume containerized bulk orders (1,000+ to 50,000+ pcs) for maximum freight cost efficiency.
- **Incoterms Supported**: Ex Works (EXW), Free On Board (FOB), Cost, Insurance and Freight (CIF), and Delivered Duty Paid (DDP).

### 6. Quality Assurance & AQL 2.5 Inspection Standard
- **Inspection Protocol**: All production batches are audited under international **ISO 2859-1 / ANSI/ASQ Z1.4 (AQL 2.5)** sampling standards.
- **4-Stage Inspection Pipeline**:
  1. **Pre-Production Fabric Audit**: Testing for shrinkage (under 3%), color fastness to washing, tensile strength, and GSM accuracy.
  2. **In-Line Sewing Audit**: Checking seam tension, flatlock stitch integrity (minimum 4-needle 6-thread on activewear), and sleeve alignment.
  3. **Post-Finishing & Trim Audit**: Inspecting print adhesion, embroidery sharpness, zipper smoothness, and label placement.
  4. **Final Packaging & Carton Audit**: Verification of individual barcoded polybags, gross weights, export carton durability, and moisture-absorbing silica packets.
