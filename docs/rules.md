# SLOTS SPORTSWEAR – AI Development Boundaries & Engineering Rules

> **Document Status**: Mandatory Operating Standard & Policy Document  
> **Target Audience**: AI Coding Agents & Full-Stack Developers  
> **Core Mandate**: Strict preservation of design system, performance standards, brand identity, and stability  

---

## Table of Contents
1. [Section A: Mandatory Operating Protocol (What To Do)](#section-a-mandatory-operating-protocol-what-to-do)
   - [1. Always Inspect Existing Design First](#1-always-inspect-existing-design-first)
   - [2. Reuse Existing Primitives & Component Architecture](#2-reuse-existing-primitives--component-architecture)
   - [3. Maintain Luxury Manufacturing Brand Theme](#3-maintain-luxury-manufacturing-brand-theme)
   - [4. Update Memory Documentation Continuously](#4-update-memory-documentation-continuously)
   - [5. Preserve Page Speed & Runtime Performance](#5-preserve-page-speed--runtime-performance)
2. [Section B: Engineering Prohibitions (What To Avoid)](#section-b-engineering-prohibitions-what-to-avoid)
   - [1. Do Not Create New Design Languages](#1-do-not-create-new-design-languages)
   - [2. Do Not Remove or Replace Verified Media Assets](#2-do-not-remove-or-replace-verified-media-assets)
   - [3. Do Not Replace or Bypass GSAP](#3-do-not-replace-or-bypass-gsap)
   - [4. Do Not Introduce Redundant External Libraries](#4-do-not-introduce-redundant-external-libraries)
   - [5. Do Not Alter SEO & Structured Metadata Without Authorization](#5-do-not-alter-seo--structured-metadata-without-authorization)
   - [6. Do Not Inflate JavaScript Bundle Size](#6-do-not-inflate-javascript-bundle-size)
3. [Section C: AI Agent Operating Boundaries](#section-c-ai-agent-operating-boundaries)
   - [1. Exhaustive Pre-Change Analysis Before Editing](#1-exhaustive-pre-change-analysis-before-editing)
   - [2. Absolute Prohibition on Random UI Creation](#2-absolute-prohibition-on-random-ui-creation)
   - [3. Zero Duplicate Components Policy](#3-zero-duplicate-components-policy)
   - [4. Preservation of Existing Working Functionality](#4-preservation-of-existing-working-functionality)
   - [5. Mandatory Static Type Verification (`tsc --noEmit`)](#5-mandatory-static-type-verification-tsc---noemit)
   - [6. Synchronous Changelog & Memory Updates](#6-synchronous-changelog--memory-updates)
4. [Section D: Robust Error Handling Standards](#section-d-robust-error-handling-standards)
   - [1. API Route Error Handling & Response Contracts](#1-api-route-error-handling--response-contracts)
   - [2. Client Form Validation & User Feedback](#2-client-form-validation--user-feedback)
   - [3. Database Connection & Query Fault Tolerance](#3-database-connection--query-fault-tolerance)
   - [4. Authentication & Authorization Failure Handling](#4-authentication--authorization-failure-handling)

---

## Section A: Mandatory Operating Protocol (What To Do)

### 1. Always Inspect Existing Design First
Before proposing or writing a single line of code, any AI agent or engineer must thoroughly examine the target page, its parent layout, and the surrounding visual components:
- Inspect component tree and DOM hierarchy.
- Inspect responsive breakpoints and grid container classes (`max-w-7xl`, `px-5 md:px-10`).
- Check active theme colors on the element and adjacent blocks (`#EDEEE7` cream surface vs. `#111111` obsidian black).
- Verify typography classes in surrounding elements (`font-[main]` vs. `font-[middle]`).

### 2. Reuse Existing Primitives & Component Architecture
Never create custom one-off solutions when established building blocks exist:
- **Button Interactions**: Always use [`TransitionButton.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/TransitionButton.tsx) with rolling text enabled on desktop hover and mobile tactile press feedback.
- **Headings & Titles**: Use [`Heading.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/Heading.tsx) for split-text entrance animations and [`FormattedTitle.tsx`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/components/FormattedTitle.tsx) for italicized luxury accent typography.
- **Iconography**: Leverage existing icons from `lucide-react`, `react-icons`, or local SVG wrappers.
- **Administrative Tables**: Reuse `DataTableWrapper.tsx` and Material React Table configurations.

### 3. Maintain Luxury Manufacturing Brand Theme
Strict adherence to the established visual identity is mandatory across every viewport:
- **Surface Palette**: Preserve `#EDEEE7` as the default warm canvas and `#111111` / `#181818` for dark manufacturing blocks.
- **Typography Tokens**:
  - `font-[main]`: Primary display typeface using `BrigendsExpanded-nReK1.otf`. Because BrigendsExpanded has malformed numerals and symbols, developers must wrap numbers (0-9) and problematic punctuation in `<FormattedTitle>` or `SafeDisplayText` to apply `font-[middle]` (`Freigeist-Light`) explicitly. Do NOT use `unicode-range` as it alters standard alphabetical weighting.
  - `font-[middle]` (`Freigeist-Light.woff2`): Technical specifications, narrative body copy, tabular numbers.
- **Visual Texture**: Subtle frosted glass (`backdrop-blur-sm bg-white/40` or `bg-[#181818]/90`), hairline dividers (`border-black/10` or `border-white/10`), pill-shaped geometry (`rounded-full`).

### 4. Update Memory Documentation Continuously
The central memory file [`docs/memory.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/memory.md) is the living historical record of the enterprise.
- Whenever a component is modified, a feature is transformed, or a bug is corrected, `docs/memory.md` must be updated synchronously.
- Document exact file paths, modified code snippets, architectural rationale, and verification outcomes.

### 5. Preserve Page Speed & Runtime Performance
- Keep pages fast, responsive, and lightweight.
- Ensure all images utilize `next/image` with explicit width, height, and modern format support (WebP/AVIF).
- Respect server-side rendering boundaries; only mark components `"use client"` when state, DOM references, or GSAP animations strictly require browser execution.

---

## Section B: Engineering Prohibitions (What To Avoid)

### 1. Do Not Create New Design Languages
- **Zero Inventions**: Do not introduce neon gradients, generic Bootstrap styles, bright colored buttons, rounded square cards, or alien styling frameworks.
- **Design Alignment**: Every new view must feel like a natural, continuous extension of the existing Slots Sportswear digital experience.

### 2. Do Not Remove or Replace Verified Media Assets
- High-resolution manufacturing imagery (such as the 7 verified Pinterest image links in `/manufacturing-process`), factory videos (`bg.mp4`), and Cloudinary catalog photography are core company assets.
- **Do not delete, unlink, replace, or swap asset URLs** unless the user provides replacement media files.

### 3. Do Not Replace or Bypass GSAP
- Do not attempt to introduce Framer Motion, Motion One, AOS, Anime.js, or plain CSS transitions in place of GSAP.
- GSAP 3.14.2 and ScrollTrigger are the dedicated, unified animation standard of the platform.

### 4. Do Not Introduce Redundant External Libraries
- The existing package manifest (`package.json`) contains complete, battle-tested solutions for tables, date pickers, rich text editing, forms, validation, and styling.
- Do not install duplicate UI toolkits (e.g. Chakra UI, Mantine, Ant Design) or secondary date/math libraries.

### 5. Do Not Alter SEO & Structured Metadata Without Authorization
- Established canonical domains (`https://slotssportswear.vercel.app`), OpenGraph social tags, dynamic `sitemap.ts`, `robots.ts`, and Schema.org JSON-LD scripts are search-engine indexed.
- Do not alter meta titles, meta descriptions, or schema definitions without explicit instruction.

### 6. Do Not Inflate JavaScript Bundle Size
- Avoid importing entire monolithic libraries when tree-shaken named imports are available.
- Dynamic import (`next/dynamic` with `{ ssr: false }`) heavy interactive components (such as CKEditor 5 or complex visualization canvases).

### 7. Do Not Modify Production Code During Audits
- When assigned an audit or architectural review, never touch or mutate working production source code.
- First analyze everything, verify files against actual filesystem reality, and record findings strictly within `docs/`.

### 8. Strict Prohibition on Retail E-Commerce Cart & Checkout Mechanics
- The `/cart` route and drawer must operate solely as a **B2B Tech Pack Specification & RFQ Builder**.
- Never introduce consumer retail pricing, strikethrough MRPs, cart subtotals, consumer sales taxes, coupons, or payment processing gateways.
- All quantities must respect the **30-piece Minimum Order Quantity (MOQ)** per style.

### 9. Secure File Upload Boundaries & Storage Protocols
- Technical file uploads must stream directly to Cloudinary CDN (`tech_packs` folder) through secure server route [`/api/upload/tech-pack`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/api/upload/tech-pack/route.ts).
- Never store uploaded user files on local server disk or inside MongoDB as large binary blobs.
- Enforce strict extension whitelisting (`.pdf`, `.ai`, `.eps`, `.psd`, `.dxf`, `.zip`, `.png`, `.jpg`, `.jpeg`) and 25 MB per-file limit.
- Sanitize filenames and validate MIME types server-side to prevent malicious execution or directory traversal attacks.

### 10. Programmatic B2B SEO Content Standards & Schema Integrity
- All programmatic landing pages under `/solutions/[slug]` must strictly target B2B brand buyers, sports clubs, and apparel startups using OEM/ODM factory terminology.
- Never use cheap retail or consumer discount language ("sale", "checkout", "cheap items").
- Every solution page must inject 4 Schema.org JSON-LD definitions: `Organization`, `Service`, `BreadcrumbList`, and `FAQPage`.
- All programmatic routes must support static site generation via `generateStaticParams()` and be indexed in `app/sitemap.ts`.

### 11. Technical Manufacturing Knowledge Hub & E-E-A-T Standards
- All articles under `/knowledge/[slug]` must adhere to rigorous B2B textile engineering standards:
  - Precise metrics (GSM weights, fiber blend percentages, shrinkage tolerances, tensile ratings).
  - Explicit testing standards references (ASTM D5034, ISO 2859-1, ANSI/ASQ Z1.4, OEKO-TEX Standard 100).
  - Authentic Sialkot OEM factory context (70%+ global soccer ball share, Sialkot International Airport air cargo export logistics).
- Absolute prohibition on generic consumer shopping advice or shallow AI marketing filler.
- Every knowledge guide must inject 4 Schema.org JSON-LD definitions: `TechArticle` (with `proficiencyLevel: "Expert"`), `FAQPage`, `BreadcrumbList`, and `Organization`.
- Every guide must cross-link to relevant programmatic B2B SEO landing pages (`/solutions/[slug]`) and drive qualified leads to the Tech Pack RFQ workflow (`/contact` & `/cart`).
- Dynamic routes in Next.js 16 must strictly treat `params` as a Promise (`params: Promise<{ slug: string }>`) and `await params` in both `generateMetadata` and `Page`.

### 12. B2B CRM Pipeline Integrity, Audit Trails & Email Dispatch Boundaries
- Every wholesale inquiry arriving via `/contact` or `/cart` must automatically instantiate a `Lead` record in the CRM and log an initial `LeadActivity` audit trail.
- Pipeline stage transitions must strictly conform to the 6 validated factory milestones: `New`, `Contacted`, `Sample Requested`, `Production`, `Completed`, `Rejected`.
- Every status modification, internal engineering note, and external buyer email must append an immutable record to `LeadActivity` capturing `type`, `title`, `description`, and `performedBy`.
- Outgoing buyer notifications (`sendBuyerStatusUpdateEmail`) must be gated behind explicit admin opt-in checkboxes to avoid unsolicited buyer dispatches.
- All administrative CRM API endpoints (`/api/admin/leads/*`) must enforce `adminAuth()` session verification and role gating before fulfilling queries or mutations.

---

## Section C: AI Agent Operating Boundaries

### 1. Exhaustive Pre-Change Analysis Before Editing
- An AI agent must never guess or make blind edits.
- Read target files, examine dependencies, verify imports, and check current styling before proposing code modifications.

### 2. Absolute Prohibition on Random UI Creation
- If a requirement is ambiguous or unspecified, maintain the exact aesthetic, spacing, and component structure of adjacent sections.
- When creating a new section, match the container width (`max-w-7xl mx-auto px-5 md:px-10`), padding scale (`py-16 sm:py-24`), and typography hierarchy of existing sections.

### 3. Zero Duplicate Components Policy
- Do not create `CustomButton.tsx` if `TransitionButton.tsx` exists.
- Do not create `PageHeader.tsx` if `Heading.tsx` and `FormattedTitle.tsx` exist.
- Extend existing components using clean props rather than creating parallel duplicates.

### 4. Preservation of Existing Working Functionality
- Ensure refactors do not break existing features, working API routes, authentication flows, or database models.
- When modifying shared layout components (`Nav.tsx`, `Footer.tsx`), verify that other pages utilizing the component remain visually and functionally intact.

### 5. Mandatory Static Type Verification (`tsc --noEmit`)
- After modifying or creating TypeScript files, execute `npx tsc --noEmit` via the terminal.
- Code changes are not complete until TypeScript exits with code 0 and zero compilation errors.

### 6. Synchronous Changelog & Memory Updates
- Every change made to the codebase must be documented in both `docs/memory.md` and the active session walkthrough.

### 7. Explicit Verification of Disk Directory Paths
- Never assume standard URL slugs match physical directory names. Always inspect disk directories with file search tools (e.g. confirming `/auth/signin` vs `/auth/sign-in`, or `/api/contact/submit` vs `/api/contact`).

### 8. Temporary Dev Artifact Cleanliness
- Be aware that Next.js hot-reloading writes ephemeral typing definitions to `.next/dev/types/` during active server requests. If syntax errors occur solely inside `.next/dev/types/`, purge the folder to trigger clean Next.js re-generation.

---

## Section D: Robust Error Handling Standards

### 1. API Route Error Handling & Response Contracts
All API route handlers in `app/api/` must follow consistent JSON contracts and standard HTTP response codes:
- **Successful Mutation**: `NextResponse.json({ success: true, data: ... }, { status: 200 | 201 })`
- **Validation Failure**: `NextResponse.json({ success: false, error: 'Detailed validation message', fields: ... }, { status: 400 })`
- **Unauthorized / Forbidden**: `NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 | 403 })`
- **Resource Not Found**: `NextResponse.json({ success: false, error: 'Resource not found' }, { status: 404 })`
- **Internal Server Error**: Must be caught via `try/catch` and returned as `NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })`. Never let unhandled server exceptions crash the route.

### 2. Client Form Validation & User Feedback
- **Schema Validation**: All forms must validate client-side input against Zod schemas ([`lib/zodSchema.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/zodSchema.ts)).
- **Inline Error Messages**: Display clear, contextual error indicators beneath invalid input fields in `font-[middle] text-xs text-red-500`.
- **Loading States**: Submit buttons must display a disabled, animated loading spinner during asynchronous network requests to prevent double-submissions.
- **Toast Notifications**: Use `react-hot-toast` with custom macOS/island styling to inform users of submission successes or network failures.

### 3. Database Connection & Query Fault Tolerance
- **Connection Isolation**: Always invoke `getApplicationConnection()` for catalog operations and `getUsersConnection()` for authentication.
- **Failover & Buffering**: Both connections configure `bufferCommands: false` to avoid silent indefinite hangs if MongoDB is unreachable.
- **Query Protection**: All Mongoose queries must be wrapped in `try/catch` blocks with descriptive error logging in server logs.

### 4. Authentication & Authorization Failure Handling
- **Expired Session Tokens**: Seamlessly redirect unauthenticated users attempting to access `/dashboard` or `/admin/*` to `/auth/sign-in?callbackUrl=...`.
- **Email Verification Guard**: Prevent unverified accounts from accessing sensitive client portal features until email confirmation is completed.
- **Admin Privilege Guard**: If an authenticated non-admin user navigates to `/admin/*`, return a clean 403 Forbidden page rather than an unhandled runtime error.

---

## Section E: B2B SEO & Organic Publishing Rules

### 1. Static Fallback Integrity Guarantee
- Public SEO routes (`/solutions/[slug]` and `/knowledge/[slug]`) must NEVER return a 500 error if the database connection fails or if MongoDB collections are unpopulated.
- All dynamic data resolvers must catch DB errors and gracefully fall back to verified static datasets ([`lib/seo/solutionsData.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/seo/solutionsData.ts) and [`lib/seo/knowledgeData.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/lib/seo/knowledgeData.ts)).

### 2. Draft & Indexation Safeguards
- Content in `Draft` state or with `noIndex: true` MUST be strictly excluded from dynamic XML sitemaps ([`app/sitemap.ts`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/app/sitemap.ts)).
- Draft pages must output `robots: { index: false, follow: false }` metadata to prevent staging leaks into Google SERPs.

### 3. Bidirectional Internal Linking Graph
- Every commercial OEM/ODM Solution page must cross-link to relevant Technical Knowledge Hub articles to prove engineering capability and topical authority.
- Every Technical Knowledge Hub guide must cross-link to relevant OEM/ODM Solution lines to provide seamless conversion funnels for commercial procurement teams.

### 4. Strict B2B Technical Language Standards
- All titles, copy, and sample content generated within the CMS must strictly adhere to B2B apparel terminology (OEM/ODM, private label, GSM weights, ASTM/ISO testing, MOQ, BOM).
- Absolute prohibition on retail consumer wording ("sale", "clearance", "add to cart", "free shipping").

---

## Section F: B2B Buyer Portal Security & Data Privacy Rules

### 1. Mandatory Server-Side Anti-IDOR Protection
- Every buyer account endpoint (`/api/account/inquiries`, `/api/account/inquiries/[id]`, `/dashboard/inquiries/[id]`) MUST enforce strict session identity validation.
- Inquiries must only be retrieved if `{ _id: id, $or: [{ userId: session.user.id }, { email: session.user.email.toLowerCase() }] }`.
- Never trust client-supplied user parameters in request bodies or search parameters; identity must always resolve from HTTP-only session cookies via `auth.api.getSession`.
- If an inquiry does not belong to the active authenticated buyer, the server must return HTTP 404 ("Inquiry not found or access denied") without leaking resource existence.

### 2. Factory Intelligence & Margin Isolation (Zero Leak Policy)
- Internal factory CRM fields (`notes`, `estimatedValue`, `priority`, internal staff assignments) are strictly confidential.
- Buyer-facing API routes must strictly project buyer-safe DTOs. Internal notes and profit margins must NEVER be sent over the wire to client components.

### 3. Search Engine Non-Indexation
- All buyer account, dashboard, and inquiry routes must export `robots: { index: false, follow: false }` metadata.
- Private CAD files and buyer project specifications must never be indexed in search engines or included in XML sitemaps.

### 4. Frictionless Guest-to-Account Association
- Prospective B2B buyers submitting RFQs before registration must never encounter barriers.
- Inquiries submitted as guests must be bound by normalized email (`email.toLowerCase()`) so they automatically appear in the buyer's portal upon subsequent registration or login.

---

## Section G: Environment Variable Hygiene & Secrets Protection Rules

### 1. Absolute Prohibition of Secrets in Client Bundles
- Sensitive credentials (`BETTER_AUTH_SECRET`, `SMTP_PASS`, `ADMIN_EMAIL_PASSWORD`, `MONGODB_URL`, `MONGODB_URL_APPLICATION`, `CLOUDINARY_SECRET_KEY`) must NEVER be prefixed with `NEXT_PUBLIC_`.
- Only non-sensitive display strings (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_EMAIL_ADDRESS`, `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`) are permissible in client-side code.

### 2. Git Ingestion Prevention (.gitignore Enforcement)
- The `.gitignore` file must unconditionally ignore `.env*` files.
- Developers and automated agents must verify `git status --porcelain` to confirm `.env.local` or `.env*.bak` files are never staged.

### 3. Sanitized Documentation & Artifacts Policy
- Documentation files, walkthrough artifacts, test scripts, and terminal logs must NEVER print or record raw secret values.
- All public templates ([`.env.example`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/.env.example)) and configuration guides ([`docs/environment-variables.md`](file:///c:/Users/AXE/Desktop/Ecommerce/dacciapparel/docs/environment-variables.md)) must use masked placeholder strings only.

### 4. Decoupled SMTP Credential Isolation
- SMTP authentication credentials (`SMTP_USER`, `SMTP_PASS`) must remain independent from destination notification inboxes (`COMPANY_EMAIL`) and administrator login identifiers (`ADMIN_EMAIL`).
- Code in `lib/nodemailer.ts` must never assume that an inbox receiving notifications is capable of authenticating outbound mail.



## Security Testing
- Never hardcode real passwords or API keys in temporary test scripts (e.g., \	est-smtp.js\).
- Never print, log, or document real environment variables from \.env.local\ in chat outputs or markdown reports.
- Modifying the codebase to remove an exposed credential does NOT invalidate the credential. You must instruct the owner to revoke and rotate the compromised password.
