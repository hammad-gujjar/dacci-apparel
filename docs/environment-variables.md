# SLOTS SPORTSWEAR — Environment Variables & Configuration Architecture

> **Target Live Domain**: `https://slotssportswear.vercel.app`  
> **Brand & Operational Email**: `slotssportswear@gmail.com`  
> **Primary Administrator Account**: `shahrankhalid0@gmail.com`  
> **Status**: Verified & Hardened · Dual-Driver SMTP Engine · Strict Secret Isolation

---

## 1. Executive Summary & Security Principles

This document defines the complete environment variable inventory for the **SLOTS SPORTSWEAR** B2B manufacturing platform.

### Core Security Boundaries
1. **Zero Secret Leakage**: Any variable containing credentials, connection strings, or signing keys (`SMTP_PASS`, `ADMIN_EMAIL_PASSWORD`, `BETTER_AUTH_SECRET`, `MONGODB_URL`, `MONGODB_URL_APPLICATION`, `CLOUDINARY_SECRET_KEY`) is strictly server-only. They are **never** prefixed with `NEXT_PUBLIC_` and never imported into client components.
2. **Decoupled Roles**: The administrator login (`ADMIN_EMAIL`), company lead inbox (`COMPANY_EMAIL`), and SMTP mail authentication (`SMTP_USER`) are isolated into dedicated configurations.
3. **Multi-Database Partitioning**: User identity data and business/manufacturing data reside in isolated MongoDB connection clusters.
4. **Resilient Mail Fallback**: The outbound mail engine (`lib/nodemailer.ts`) supports native Gmail optimization as well as standard SMTP, falling back gracefully to ensure maximum uptime.

---

## 2. Complete Environment Variable Reference

### A. Application & Public Configuration
These variables configure user-facing brand metadata and links. They use the `NEXT_PUBLIC_` prefix, making them accessible to browser JavaScript bundles. They must **never** contain passwords, tokens, or private API keys.

| Variable | Scope | Type | Purpose | Live Value |
| :--- | :---: | :---: | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public | String | Canonical root URL used for metadata generation, sitemaps, and Open Graph tags. | `https://slotssportswear.vercel.app` |
| `NEXT_PUBLIC_EMAIL_ADDRESS` | Public | String | Public brand email address displayed across the header, footer, contact pages, and privacy policy. | `slotssportswear@gmail.com` |
| `NEXT_PUBLIC_PHONE_NUMBER` | Public | String | Official WhatsApp/phone contact line displayed on the website. | `+92 331 9165413` |
| `NODE_ENV` | Server | Enum | Runtime environment mode (`development`, `test`, `production`). | `development` / `production` |

---

### B. Administrator Access & Ownership
Administrative authorization in SLOTS SPORTSWEAR is strictly identity-based.

| Variable | Scope | Type | Purpose | Live Value |
| :--- | :---: | :---: | :--- | :--- |
| `ADMIN_EMAIL` | Server-Only | String | Exact email address of the verified user account granted access to the `/admin/*` portal. Checked by `adminAuth()`. | `shahrankhalid0@gmail.com` |

> [!IMPORTANT]
> **Admin Authorization Contract (`lib/adminhelperfunction.ts`)**:
> Access to `/admin/*` requires two simultaneous conditions:
> 1. The authenticated session user's email must exactly match `ADMIN_EMAIL`.
> 2. The user's account must have `emailVerified: true` in the database.
> The verified account `shahrankhalid0@gmail.com` is configured as `ADMIN_EMAIL`.

---

### C. Company & Notification Routing
Controls where incoming customer inquiries and RFQ alerts are dispatched.

| Variable | Scope | Type | Purpose | Live Value |
| :--- | :---: | :---: | :--- | :--- |
| `COMPANY_EMAIL` | Server-Only | String | The factory or corporate inbox that receives new B2B Tech Pack quotes, sample inquiries, and customer contact submissions. | `slotssportswear@gmail.com` |

---

### D. SMTP & Transactional Email Relay (Modern Decoupled Architecture)
Outbound emails (signup verification, password resets, buyer confirmation receipts, and factory lead notifications) are powered by Nodemailer in `lib/nodemailer.ts`. 

Authentication credentials (`SMTP_USER`, `SMTP_PASS`) are **strictly decoupled** from the display sender (`SMTP_FROM_EMAIL`) and the factory notification destination (`COMPANY_EMAIL`).

| Variable | Scope | Type | Purpose | Value / Example |
| :--- | :---: | :---: | :--- | :--- |
| `SMTP_HOST` | Server-Only | String | Mail server hostname. Supports Google (`smtp.gmail.com`), Hostinger, Amazon SES, Mailgun, etc. | `smtp.gmail.com` |
| `SMTP_PORT` | Server-Only | Number | Port number (`465` for SSL/TLS, `587` for STARTTLS). | `465` |
| `SMTP_SECURE` | Server-Only | Boolean | Set to `true` for port 465; set to `false` for port 587/STARTTLS. | `true` |
| `SMTP_USER` | Server-Only | String | Mailbox username used to authenticate against the SMTP server. | `slotssportswear@gmail.com` |
| `SMTP_PASS` | Server-Only (Secret) | String | Secret password for SMTP authentication (16-character **Google App Password**). | `[16-char App Password]` |
| `SMTP_FROM_NAME` | Server-Only | String | Display name shown as the sender in buyer inboxes. | `SLOTS SPORTSWEAR` |
| `SMTP_FROM_EMAIL` | Server-Only | String | Email address populated in the `From:` header. | `slotssportswear@gmail.com` |
| `ADMIN_EMAIL_PASSWORD` | Server-Only (Secret) | String | **Legacy fallback**: Automatically used as `SMTP_PASS` if `SMTP_PASS` is not set. | `[Redacted]` |

---

### E. Authentication (Better Auth 1.4)
Session management, email verification tokens, and user credentials.

| Variable | Scope | Type | Purpose | Value |
| :--- | :---: | :---: | :--- | :--- |
| `BETTER_AUTH_SECRET` | Server-Only (Secret) | String | Cryptographic key used to sign session cookies and JWTs. High-entropy 32+ character secret. | `[32-char Secret]` |
| `BETTER_AUTH_URL` | Server-Only | String | Base URL of the application. Used by Better Auth to construct email verification and reset password links. | `http://localhost:3000` (Local)<br/>`https://slotssportswear.vercel.app` (Prod) |

---

### F. MongoDB Multi-Database Connections
SLOTS SPORTSWEAR employs a multi-database architecture to strictly isolate client identity/authentication records from commercial catalog and manufacturing data.

| Variable | Scope | Type | Purpose | Cluster |
| :--- | :---: | :---: | :--- | :--- |
| `MONGODB_URL` | Server-Only (Secret) | URI | Connection string for the **Users database** (managed by Better Auth for `user`, `session`, `account`, `verification`). | MongoDB Atlas `users` |
| `MONGODB_URL_APPLICATION` | Server-Only (Secret) | URI | Connection string for the **Application database** (`products`, `categories`, `techpacks`, `leads`, `leadactivities`, `seopages`, `knowledgearticles`). | MongoDB Atlas `application` |

---

### G. Cloudinary Media Asset Services
Cloud asset storage and digital CAD/PDF Tech Pack attachments.

| Variable | Scope | Type | Purpose | Value |
| :--- | :---: | :---: | :--- | :--- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Public | String | Public Cloudinary cloud tenant name. | `dtfbljxs3` |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Public | String | Public API key for client-side widget initialization. | `[Public Key]` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Public | String | Upload preset configured in Cloudinary console. | `SURGICAL` |
| `CLOUDINARY_SECRET_KEY` | Server-Only (Secret) | String | Private API secret used by `/api/cloudinary-signature` for server-side upload signing. | `[Server Secret]` |

---

## 3. Local Development vs. Production (Vercel)

| Environment Variable | Local Development (`.env.local`) | Production (Vercel Project Settings) |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://slotssportswear.vercel.app` (or `http://localhost:3000`) | `https://slotssportswear.vercel.app` |
| `BETTER_AUTH_URL` | `http://localhost:3000` | `https://slotssportswear.vercel.app` |
| `NODE_ENV` | `development` | `production` |
| `NEXT_PUBLIC_EMAIL_ADDRESS` | `slotssportswear@gmail.com` | `slotssportswear@gmail.com` |
| `COMPANY_EMAIL` | `slotssportswear@gmail.com` | `slotssportswear@gmail.com` |
| `ADMIN_EMAIL` | `shahrankhalid0@gmail.com` | `shahrankhalid0@gmail.com` |
| `SMTP_HOST` | `smtp.gmail.com` | `smtp.gmail.com` |
| `SMTP_USER` & `SMTP_PASS` | Configured Relay Credentials | Production Mail Relay Credentials |
| `MONGODB_URL` | Multi-connection Atlas Cluster | Multi-connection Atlas Cluster |
| `MONGODB_URL_APPLICATION` | Multi-connection Atlas Cluster | Multi-connection Atlas Cluster |

---

## 4. Operational Playbooks

### Playbook A: How to Generate Google App Password for `slotssportswear@gmail.com`
1. Log into the Google Account: `slotssportswear@gmail.com`.
2. Navigate to **Manage your Google Account** $\rightarrow$ **Security**.
3. Under *How you sign in to Google*, ensure **2-Step Verification** is turned ON.
4. Search for **App passwords** (or navigate to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
5. Name the app `SLOTS SPORTSWEAR Website` and click **Create**.
6. Copy the generated 16-character code (e.g. `abcd efgh ijkl mnop`).
7. Update `.env.local` and Vercel Project Settings:
   ```bash
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER="slotssportswear@gmail.com"
   SMTP_PASS="your-16-char-code"
   SMTP_FROM_NAME="SLOTS SPORTSWEAR"
   SMTP_FROM_EMAIL="slotssportswear@gmail.com"
   ```
8. Redeploy or restart development server.

---

### Playbook B: How to Transition to a Custom Domain Mailbox in the Future
When a custom domain mail server is purchased and MX records are pointed for `slotssportswear.com`:
1. Obtain the SMTP hostname, port, and mailbox password from the provider.
2. Update the SMTP block in `.env.local` / Vercel:
   ```bash
   SMTP_HOST="smtp.yourprovider.com"
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER="contact@yourcustomdomain.com"
   SMTP_PASS="your-mailbox-password"
   SMTP_FROM_NAME="SLOTS SPORTSWEAR"
   SMTP_FROM_EMAIL="contact@yourcustomdomain.com"
   NEXT_PUBLIC_EMAIL_ADDRESS="contact@yourcustomdomain.com"
   COMPANY_EMAIL="contact@yourcustomdomain.com"
   ```
3. Zero code changes required—Nodemailer and CRM services read directly from environment variables.
