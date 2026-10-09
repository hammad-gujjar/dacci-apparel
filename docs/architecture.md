# SLOTS SPORTSWEAR – Technical Architecture & Engineering Documentation

> **Document Status**: Single Source of Truth for Technical Architecture & Engineering  
> **Framework**: Next.js 16.1.4 (App Router) & React 19.2.3  
> **Database Architecture**: Dual-Isolated MongoDB Clusters with Mongoose 9.1.5 & Native MongoDB Driver  
> **Authentication Engine**: Better Auth 1.4.16 with Session Cookies & Email Verification  
> **Media & Assets**: Cloudinary SDK 2.9.0 with Next-Cloudinary 6.17.5  
> **Animation Engine**: GreenSock GSAP 3.14.2 & ScrollTrigger  

---

## Table of Contents
1. [Section A: Website Flow & System Architecture](#section-a-website-flow--system-architecture)
   - [1. End-to-End User Journeys](#1-end-to-end-user-journeys)
   - [2. Public Pages Navigation Architecture](#2-public-pages-navigation-architecture)
   - [3. Customer Authentication & Account Flow](#3-customer-authentication--account-flow)
   - [4. Administrative Control & Moderation Flow](#4-administrative-control--moderation-flow)
   - [5. B2B Manufacturing Inquiry & RFQ Pipeline](#5-b2b-manufacturing-inquiry--rfq-pipeline)
2. [Section B: Directory Hierarchy & Modular Organization](#section-b-directory-hierarchy--modular-organization)
   - [1. `app/` Directory (App Router Architecture)](#1-app-directory-app-router-architecture)
   - [2. `app/components/` & Sub-Component Primitives](#2-appcomponents--sub-component-primitives)
   - [3. `models/` Directory (Mongoose Schemas)](#3-models-directory-mongoose-schemas)
   - [4. `lib/` Directory (Core Utilities & Singletons)](#4-lib-directory-core-utilities--singletons)
   - [5. `app/api/` Route Handlers](#5-appapi-route-handlers)
   - [6. `docs/` Knowledge Repository](#6-docs-knowledge-repository)
3. [Section C: Technology Stack & Core Dependencies](#section-c-technology-stack--core-dependencies)
   - [1. Next.js 16 App Router & React 19 Server Components](#1-nextjs-16-app-router--react-19-server-components)
   - [2. TypeScript Strict Static Typing](#2-typescript-strict-static-typing)
   - [3. Tailwind CSS v4 & Custom Styling Architecture](#3-tailwind-css-v4--custom-styling-architecture)
   - [4. MongoDB & Dual-Connection Isolation Strategy](#4-mongodb--dual-connection-isolation-strategy)
   - [5. Better Auth Session Management & Security](#5-better-auth-session-management--security)
   - [6. Cloudinary CDN Asset Delivery & Transformations](#6-cloudinary-cdn-asset-delivery--transformations)
   - [7. GSAP Animation Engine & ScrollTrigger Lifecycle](#7-gsap-animation-engine--scrolltrigger-lifecycle)
4. [Section D: Data Flow & State Lifecycle](#section-d-data-flow--state-lifecycle)
   - [1. Product & Catalog Data Lifecycle](#1-product--catalog-data-lifecycle)
   - [2. B2B Tech Pack Submission & Notification Pipeline](#2-b2b-tech-pack-submission--notification-pipeline)
   - [3. User Identity, Session Validation & Profile Mutation](#3-user-identity-session-validation--profile-mutation)
   - [4. Administrative Operations & Soft-Delete Recycle Bin](#4-administrative-operations--soft-delete-recycle-bin)

---

## Section A: Website Flow & System Architecture

### 1. End-to-End User Journeys
The platform supports three distinct user journeys:
1. **Unauthenticated Prospective B2B Buyer**:
   - Discovers platform via search, social proof, or direct link.
   - Evaluates technical capability on the Homepage and `/manufacturing-process`.
   - Explores silhouette patterns and fabrication options in `/shop` and `/product/[slug]`.
   - Submits a custom Tech Pack or inquiry via `/contact` or initiates direct WhatsApp consultation.
2. **Authenticated Client**:
   - Accesses registered account via `/auth/sign-in`.
   - Reviews past inquiries, orders, and company specifications in `/dashboard`.
   - Edits corporate profile, billing, and logistics requirements in `/profile-edit`.
3. **Internal Production Administrator**:
   - Signs into the protected administrative realm (`/admin/dashboard`).
   - Moderates submitted Tech Packs, updates inquiry stages (e.g. `Quote Sent`, `Sampling`, `Bulk Approved`).
   - Manages product archetypes, categories, media assets, coupons, and customer directory.

### 2. Public Pages Navigation Architecture

```
                                   [ Public User Entrance ]
                                              │
         ┌───────────────────────────┬────────┴──────────────────┬───────────────────────────┬───────────────────────────┐
         ▼                           ▼                           ▼                           ▼                           ▼
    [ Homepage ]            [ Process Page ]              [ Catalog ]            [ Programmatic SEO ]         [ Knowledge Hub ]
        (`/`)            (`/manufacturing-process`)        (`/shop`)             (`/solutions/[slug]`)      (`/knowledge/[slug]`)
         │                           │                           │                           │                           │
         │                           │                           ▼                           │                           │
         │                           │                  [ Product Detail ]                   │                           │
         │                           │                 (`/product/[slug]`)                   │                           │
         │                           │                           │                           │                           │
         └───────────────────────────┴───────────────────────────┼───────────────────────────┴───────────────────────────┘
                                                                 ▼
                                                [ B2B Contact & Tech Pack Portal ]
                                                    (`/contact#teckpack` & `/cart`)
                                                                 │
                                                                 ▼
                                                   [ Direct WhatsApp Concierge ]
```

- **Top Navigation (`app/components/Nav.tsx`)**: Fixed floating island dock offering instant access to Catalog, Process, About, Search modal, and Cart drawer.
- **Search Modal**: Instant client-side fuzzy search querying active catalog archetypes.
- **Footer Navigation (`app/components/Footer.tsx`)**: Comprehensive sitemap, legal disclosures, and direct contact avenues.

### 3. Customer Authentication & Account Flow
- **Framework**: Powered by Better Auth (`better-auth`) with MongoDB adapter.
- **Signup Flow**:
  1. User fills registration form (`/auth/signup`) validating via Zod schema.
  2. Better Auth creates unverified user record in the Users MongoDB cluster.
  3. System renders custom HTML template ([`lib/email-verify.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/email-verify.tsx)) and dispatches verification link via Nodemailer SMTP.
  4. User clicks link (`/auth/verifyemail`), confirming email and activating account.
- **Session Handling**: Secure HTTP-only cookies (`better-auth.session_token`) validated on protected route requests.

### 4. Administrative Control & Moderation Flow
- **Route Guard**: Handled in [`app/(root)/(admin)/admin/layout.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/(root)/(admin)/admin/layout.tsx).
- **Session Verification**: Validates whether the active session belongs to a user with administrative privileges (`role: 'admin'`).
- **Layout Architecture**: Persistent administrative sidebar (`SideBar.tsx`) and dynamic topbar (`Topbar.tsx`) providing responsive navigation across catalog, media, orders, and system settings.

### 5. B2B Manufacturing Inquiry & RFQ Pipeline
1. **Submission**: Buyer submits form on `/contact` with product details, volume requirements, and customization checkboxes.
2. **API Ingestion**: Next.js route handler (`/api/contact/submit`) parses payload and validates fields.
3. **Database Insertion**: Document instantiated via `TechPack` Mongoose model and saved to the application MongoDB database.
4. **Email Dispatch**: Nodemailer connects to Google SMTP, sending real-time lead notification to the manufacturing team.
5. **Admin Processing**: Tech pack appears immediately in the administrative orders portal (`/admin/orders`) with `isNewStatus: true`.

---

## Section B: Directory Hierarchy & Modular Organization

### 1. `app/` Directory (App Router Architecture)
```
app/
├── (root)/
│   └── (admin)/
│       └── admin/                  # Administrative Protected Routes
│           ├── category/           # Category Listing & Form Routes
│           ├── components/         # Admin UI Widgets (Sidebar, Topbar, Tables)
│           ├── coupon/             # Promotional & B2B Discount Management
│           ├── customers/          # Client & User Directory
│           ├── dashboard/          # Analytics & Overview Panels
│           ├── leads/              # B2B CRM Lead Pipeline & Buyer Experience System
│           ├── media/              # Cloudinary Asset Manager
│           ├── orders/             # B2B Tech Pack Orders & Pipeline
│           ├── product/            # Product Catalog Administration
│           ├── product-variant/    # Size/Color SKU Administration
│           ├── review/             # Client Review Moderation
│           ├── trash/              # Soft-Delete Recycle Bin
│           └── layout.tsx          # Admin Route Guard & Shell
├── about/                          # About Us & Factory Heritage Page
├── api/                            # Next.js Server-Side Route Handlers
│   ├── account/                    # Authenticated Buyer Portal APIs (Anti-IDOR Protected)
│   │   └── inquiries/              # GET List & Metrics (/api/account/inquiries), GET Detail (/[id])
│   ├── admin/                      # Administrative Protected Endpoints
│   │   ├── leads/                  # CRM Pipeline APIs (list, analytics, status, notes)
│   │   └── seo/                    # SEO CMS APIs (solutions & knowledge CRUD)
│   ├── auth/[...all]/              # Better Auth Catch-All Endpoint
│   ├── category/                   # Category CRUD (create, delete, export, get, update)
│   ├── cloudinary-signature/       # Direct Secure Upload Signer
│   ├── contact/                    # Tech Pack Submission (submit, get, update)
│   ├── coupon/                     # Coupon Endpoints
│   ├── customers/                  # Customer Directory Endpoints
│   ├── dashboard/stats/            # Administrative Metric APIs
│   ├── media/                      # Cloudinary Metadata (creat, delete, get, update)
│   ├── product/                    # Product CRUD Handlers
│   ├── product-variant/            # SKU Variant Endpoints
│   ├── products/new-arrivals/      # Public New Arrivals Query
│   ├── public/                     # Public Data Feeds (categories, products, search)
│   ├── review/                     # Review Submission & Query
│   ├── subscribe/                  # Newsletter Subscription
│   └── upload/tech-pack/           # Cloudinary Streaming Tech Pack Dropzone API
├── auth/                           # Client Authentication Pages
│   ├── signin/                     # Sign In Page (/auth/signin)
│   ├── signup/                     # Sign Up Page (/auth/signup)
│   ├── forget-password/            # Password Recovery (/auth/forget-password)
│   ├── reset-password/             # Password Reset (/auth/reset-password)
│   └── verifyemail/                # Email Verification (/auth/verifyemail)
├── cart/                           # Inquiry Bag / Specification Summary
├── components/                     # Global Shared UI Components
├── contact/                        # B2B Contact & Tech Pack Portal
├── context/                        # React Context Providers (Loader, Theme)
├── dashboard/                      # Authenticated Customer & Buyer Portal
│   ├── inquiries/                  # Buyer RFQ & Production Tracking (/dashboard/inquiries)
│   │   ├── [id]/                   # Inquiry Detail & 5-Stage Timeline (/dashboard/inquiries/[id])
│   │   ├── InquiriesClient.tsx     # Client Filtering & Inquiries Grid
│   │   └── page.tsx                # Server Component with Auth Check & noindex Robots
│   └── page.tsx                    # Buyer Dashboard with Production Overview & KPIs
├── faq/                            # Frequently Asked Questions
├── knowledge/                      # B2B Manufacturing Knowledge Hub & Technical Guides
│   ├── [slug]/                     # Dynamic Article Pages (SSG / ISR)
│   ├── KnowledgeDirectoryClient.tsx# Interactive Category Filter & Article Grid
│   └── page.tsx                    # Knowledge Directory Hub
├── manufacturing-process/          # Dedicated OEM 7-Stage Process Page
├── policy/                         # Privacy Policy
├── product/                        # Dynamic Product Detail Routing (`[slug]`)
├── profile-edit/                   # Customer Profile Editing
├── refund/                         # Return & Sampling Policies
├── shipping/                       # Freight & Logistics Policy
├── shop/                           # B2B Wholesale Catalog
├── story/                          # Factory Heritage Narrative
├── terms/                          # Commercial Terms of Service
├── globals.css                     # Tailwind v4 Directives & Fonts
├── layout.tsx                      # Root Viewport Shell & Metadata
├── page.tsx                        # Public Homepage
├── robots.ts                       # Dynamic Robots.txt Generator
└── sitemap.ts                      # Dynamic XML Sitemap Generator
```

### 2. `app/components/` & Sub-Component Primitives
- **Layout Primitives**: [`Nav.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/Nav.tsx), [`Footer.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/Footer.tsx), [`SmoothScroll.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/SmoothScroll.tsx).
- **Typography & Motion**: [`Heading.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/Heading.tsx), [`FormattedTitle.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/FormattedTitle.tsx), [`AnimatedSwapText.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/AnimatedSwapText.tsx).
- **Interactive Triggers**: [`TransitionButton.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/TransitionButton.tsx), [`WhatsAppButton.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/WhatsAppButton.tsx).
- **Homepage Sections**: [`HeroSection.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/HeroSection.tsx), [`CompanyStats.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/CompanyStats.tsx), [`OurServices.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/OurServices.tsx), [`HorizontalCategories.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/HorizontalCategories.tsx), [`Whychooseus.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/Whychooseus.tsx).

### 3. `models/` Directory (Mongoose Schemas)
- [`models/TechPack.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/TechPack.model.ts): B2B Tech Pack inquiries, buyer contact, quantities, deadlines, customization arrays.
- [`models/product.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/product.model.ts): Catalog archetypes, manufacturing descriptions, slug, category relations, gallery images, soft-delete flags.
- [`models/category.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/category.model.ts): Manufacturing taxonomy (Custom Teamwear, Fitness Apparel, etc.).
- [`models/productVariant.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/productVariant.model.ts): Technical garment configurations (GSM, fabric weight, colorway).
- [`models/Media.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/Media.model.ts): Cloudinary asset references, dimensions, file size, public IDs.
- [`models/User.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/User.model.ts): Customer accounts, roles (`admin` / `customer`), contact numbers.
- [`models/review.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/review.model.ts): B2B client testimonials, rating stars, moderation approval status.
- [`models/Coupon.model.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/models/Coupon.model.ts): B2B contract terms, volume discounts, expiration dates.

### 4. `lib/` Directory (Core Utilities & Singletons)
- [`lib/database.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/database.ts): Dual-connection MongoDB singleton ensuring client caching across hot reloads.
- [`lib/auth.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/auth.ts): Better Auth server configuration, MongoDB adapter, email verification plugins.
- [`lib/auth-client.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/auth-client.ts): Client-side authentication hooks (`useSession`, `signIn`, `signUp`, `signOut`).
- [`lib/cloudinary.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/cloudinary.ts): Cloudinary SDK configuration for asset management.
- [`lib/nodemailer.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/nodemailer.ts): SMTP transport singleton configured with Google App Password credentials.
- [`lib/zodSchema.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/zodSchema.ts): Comprehensive Zod schemas for forms and API validation.
- [`lib/materialTheme.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/materialTheme.ts): MUI theming adapter aligning Material React Table with the luxury aesthetic.

### 5. `app/api/` Route Handlers
Standardized Next.js route handlers returning JSON payloads with explicit HTTP status codes (`200`, `201`, `400`, `401`, `404`, `500`). Protected administrative routes validate authorization headers or session cookies prior to mutation.

### 6. `docs/` Knowledge Repository
- `memory.md`: Full project operational memory and session history.
- `project-requirements-document.md`: Complete business & product requirements.
- `design-full-audit.md`: Visual styling, typography, palette, and component design.
- `architecture.md`: System engineering, database topology, and data flows.
- `rules.md`: AI development boundaries, safety protocols, and coding rules.
- `phases.md`: Completed phases and future engineering roadmap.

---

## Section C: Technology Stack & Core Dependencies

### 1. Next.js 16 App Router & React 19 Server Components
- **Framework Version**: `next@16.1.4`, `react@19.2.3`, `react-dom@19.2.3`.
- **Rendering Architecture**: Hybrid Server Components (RSC) for initial page layouts and SEO metadata, combined with dynamic Client Components (`"use client"`) for GSAP animations, interactive forms, and client filtering.

### 2. TypeScript Strict Static Typing
- **TypeScript Version**: `typescript@^5`.
- **Configuration**: Strict type checking enabled (`tsconfig.json`), path aliasing (`@/*` -> `./*`). All Mongoose models, API request bodies, and component props are strictly typed.

### 3. Tailwind CSS v4 & Custom Styling Architecture
- **Framework Version**: `@tailwindcss/postcss@^4`, `tailwindcss@^4`.
- **CSS Architecture**: Modern Tailwind v4 configuration via `@theme inline` in [`app/globals.css`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/globals.css) with zero reliance on legacy `tailwind.config.js`.

### 4. MongoDB & Dual-Connection Isolation Strategy
- **Driver & ODM**: `mongodb@^7.0.0`, `mongoose@^9.1.5`.
- **Dual-Database Topology**:
  - **Application Database (`MONGODB_URL_APPLICATION`)**: Houses catalog products, categories, SKU variants, B2B Tech Packs, media assets, reviews, and coupons.
  - **Identity Database (`MONGODB_URL`)**: Completely isolated database dedicated to user accounts, session tokens, verification tokens, and Better Auth authentication states.
- **Connection Caching**: Singleton pattern implemented in `lib/database.ts` utilizing `(global as any).mongooseMulti` to prevent connection exhaustion in serverless environments.

### 5. Better Auth Session Management & Security
- **Version**: `better-auth@^1.4.16`.
- **Security Features**:
  - Secure HTTP-only cookies preventing XSS token exfiltration.
  - Strict CSRF protection with trusted origins (`BETTER_AUTH_URL`).
  - Mandatory email verification prior to account activation.
  - Signed password reset tokens with time-to-live (TTL) expiry.

### 6. Cloudinary CDN Asset Delivery & Transformations
- **SDKs**: `cloudinary@^2.9.0`, `next-cloudinary@^6.17.5`.
- **Capabilities**: Direct browser-to-cloud uploads via signed upload endpoints (`/api/cloudinary-signature`), automatic WebP/AVIF format conversion, responsive image scaling, and secure asset deletion.

### 7. GSAP Animation Engine & ScrollTrigger Lifecycle
- **Version**: `gsap@^3.14.2`, `@gsap/react@^2.1.2`.
- **Plugins**: ScrollTrigger, SplitText.
- **Lifecycle Management**: Scoped strictly within `useGSAP` hooks ensuring automatic teardown upon component unmount, preventing animation memory leaks.

---

## Section D: Data Flow & State Lifecycle

### 1. Product & Catalog Data Lifecycle
```
[ Cloudinary ] <--- (Image Upload) --- [ Admin Product Editor ]
      │                                         │
      ▼ (Secure URL & Public ID)                ▼ (POST/PUT payload)
[ Product Image Storage ] ------------> [ MongoDB App DB (products) ]
                                                │
                                                ▼ (Mongoose Query / ISR)
                                       [ Next.js Server Component ]
                                                │
                                                ▼ (Props)
                                       [ Public Product View ]
```

### 2. B2B Tech Pack Submission & Notification Pipeline
```
[ Single Item (/contact) ]          [ Multi-Item RFQ (/cart & TechPackDrawer) ]
            │                                           │
            │ (Individual specs + files)                │ (Multi-style array + files via TechPackContext)
            └─────────────────────┬─────────────────────┘
                                  │
                                  ▼
               [ Direct Upload: POST /api/upload/tech-pack ]
               - Validates format (.pdf, .ai, .eps, .psd, .dxf, .zip, .png, .jpg)
               - Validates file size (max 25MB)
               - Streams buffer to Cloudinary CDN (folder: "tech_packs")
                                  │
                                  ▼
                     [ POST /api/contact/submit ]
                                  │ (Parse items, specs & attached files)
            ┌─────────────────────┴─────────────────────┐
            ▼                                           ▼
[ Save to TechPack Collection ]              [ Trigger Nodemailer ]
- Populates productType, quantity           - Dispatches to ADMIN_EMAIL
- Stores optional items: [{...}]            - Renders itemized garment table
- Stores attached files: [{...}]            - Renders file download action links
- Sets isNewStatus: true                    - Embeds client project brief
            │                                           │
            ▼                                           ▼
[ Admin Orders Pipeline ]                    [ Factory Engineering Inbox ]
(/admin/orders real-time monitor)            (Direct CAD/Tech Pack download in 24h)
```

### 3. User Identity, Session Validation & Profile Mutation
```
[ Client Sign-In Form ]
         │ (POST credentials)
         ▼
[ /api/auth/sign-in ]
         │ (Better Auth validates against Users DB)
         ▼
[ Set HTTP-Only Cookie ] ---------> [ Browser Client ]
                                           │
                                           ▼ (Subsequent Request)
[ Server Route Guard / Middleware ] <──────┘
         │ (Validate Session Token)
         ├── Valid -> Render Dashboard / Admin
         └── Invalid -> Redirect to /auth/sign-in
```

### 4. Administrative Operations & Soft-Delete Recycle Bin
- **Soft-Delete Architecture**: Catalog items, categories, and inquiries implement a `deleted: { type: Boolean, default: false }` or `deletedAt: Date` field.
- **Trash Bin (`/admin/trash`)**: Queries all documents where `deleted: true`.
- **Restoration**: Administrative users can restore mistakenly deleted archetypes with a single click (`deleted: false`), preserving data integrity and relational bindings.
- **Permanent Purge**: Hard deletion (`deleteOne` / `deleteMany`) and associated Cloudinary asset purging can only be initiated from within the Trash interface.

### 5. Technical Manufacturing Knowledge Hub & SEO Architecture
```
[ Static Engineering Content (knowledgeData.ts) ] <---> [ MongoDB App DB (KnowledgeArticle) ]
                                      │
                                      ▼ (Fallback to static if DB unpopulated)
                         [ Next.js Server Component ]
                           (/knowledge & /knowledge/[slug])
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
[ 4 Schema.org JSON-LD ]    [ 6 Technical Components ]    [ 24h ISR Caching ]
- TechArticle (Expert)      - KnowledgeHero               - revalidate = 86400
- FAQPage                   - ArticleContent              - generateStaticParams()
- BreadcrumbList            - TechnicalSpecification
- Organization              - FAQSection (Accordion)
                            - RelatedSolutions (Cross-link to /solutions)
                            - RFQCTA (Obsidian Conversion Card)
```

### 6. B2B CRM Pipeline & Lead Activity Architecture
```
[ Web RFQ / Cart / Manual ] ---> [ POST /api/contact/submit ]
                                          │
                                          ▼
                               [ MongoDB (Lead Model) ]
                                          │
         ┌────────────────────────────────┼────────────────────────────────┐
         ▼                                ▼                                ▼
[ Initial LeadActivity ]       [ Buyer Confirmation ]          [ Factory Alert Email ]
("RFQ Received from Web")      (BOM SLA + WhatsApp)            (Direct CRM Deep Link)
                                          │
                                          ▼
                             [ Admin Pipeline (/admin/leads) ]
                             - 6 Stages: New, Contacted, Sample Requested,
                               Production, Completed, Rejected
                             - Status Transition -> PUT /api/admin/leads/[id]/status
                             - Internal Notes -> POST /api/admin/leads/[id]/notes
                             - Audit Trail -> LeadActivity Logging
                             - Buyer Status Dispatch -> Optional milestone email
```

### 7. B2B SEO Content CMS & Internal Linking Graph Architecture
```
                         [ Admin CMS (/admin/seo) ]
             ┌─────────────────────────┼─────────────────────────┐
             ▼                         ▼                         ▼
   [ /admin/seo/solutions ]     [ /admin/seo/knowledge ]    [ /admin/seo/stats ]
   - Solution Page Builder      - Technical Guide Builder   - Health Audit Index
   - Target Keyword & Intent    - Specs Matrix Builder      - Character Length Alarms
   - Fabric Specs & FAQs        - Buyer Advice & FAQs       - Unindexed Draft Alarms
             │                         │
             ▼                         ▼
   [ Models: SEOPage ]          [ Models: KnowledgeArticle ]
   - status: Draft | Published  - status: Draft | Published
   - noIndex, canonicalUrl      - noIndex, canonicalUrl
   - relatedKnowledgeGuides     - relatedSolutions & relatedArticles
             │                         │
             └────────────┬────────────┘
                          ▼
            [ Public Dynamic Routing & Linking ]
             ┌────────────┴────────────┐
             ▼                         ▼
    [ /solutions/[slug] ]      [ /knowledge/[slug] ]
    - Static Fallback Safe     - Static Fallback Safe
    - Cross-links to Guides    - Cross-links to Solutions
    - robots: { index, follow } based on published & noIndex status
                          │
                          ▼
             [ XML Sitemap (/sitemap.ts) ]
             - Excludes drafts & noIndex pages
             - Synchronizes live published inventory with search engines
```

### 8. B2B Buyer Portal, Anti-IDOR Security & Progress Tracking Architecture
```
[ Authenticated Buyer ]
         │
         ▼
[ Next.js Middleware / Better Auth Session ]
         │  (Session Cookie Validation -> resolves userId & email)
         ▼
[ Buyer Portal Frontend (/dashboard/inquiries) ]
         │
         ├── GET /api/account/inquiries ──┐
         │                                ▼
         │                [ Query: { $or: [{ userId }, { email }], isArchived: false } ]
         │                                │
         │                                ▼
         │                 [ Projection: Strips notes, margin, priority ]
         │                                │
         │                                ▼
         │                 [ Returns: Formatted Inquiries & Stats ]
         │
         └── GET /api/account/inquiries/[id] ──┐
                                               ▼
                                  [ Anti-IDOR Validation ]
                                  - Query: { _id: id, $or: [{ userId }, { email }] }
                                  - If no match -> Return 404 (Access Denied)
                                               │
                                               ▼
                                  [ 5-Stage Timeline Computation ]
                                  - Inquiry Received -> Review -> Sampling -> Production -> Shipped
                                  - Projects CAD attachments & garment breakdowns
                                  - Excludes internal factory notes, margin & priority
```

### 9. Decoupled Transactional Email & SMTP Relay Architecture
```
[ Trigger Events ]
  ├── Better Auth: Signup Verification & Password Reset
  ├── Better Auth Hooks: New User & Session Alerts -> ADMIN_EMAIL
  ├── RFQ Intake (/api/contact/submit): Buyer Confirmation
  ├── Factory Alert: Inbound RFQ Notification -> COMPANY_EMAIL || ADMIN_EMAIL
  └── CRM Updates: Production Status Milestone Notifications
           │
           ▼
[ Centralized Transporter (lib/nodemailer.ts) ]
  ├── Host Evaluation:
  │     - If 'smtp.gmail.com': Uses optimized native 'gmail' service driver (prevents socket timeouts)
  │     - If custom host: Uses standard Host, Port (587/465), and Secure (TLS/SSL)
  ├── Auth Decoupling:
  │     - Authenticates strictly using SMTP_USER and SMTP_PASS (Google App Password or Mailbox Pass)
  │     - Decoupled from COMPANY_EMAIL (notification inbox) and ADMIN_EMAIL (admin identity)
  └── Standardized Envelope:
        - From: "${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>
        - Reply-To: Inquiring Buyer Email or COMPANY_EMAIL
```

