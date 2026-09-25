# PRD — Sri Ganesh Electricals Digital Showroom

## Business
- Name: **Sri Ganesh Electricals** (renamed from "Sri Ganesh Traders" on user request)
- Location: Mangaluru, Karnataka. Sells electricals, plumbing, sanitaryware, hardware, paints, tanks, tools.
- Business name/contact live in `lib/config.js` (env-overridable via NEXT_PUBLIC_BUSINESS_NAME etc.)

## Product
Amazon-inspired, catalog-only product discovery site (NO cart, checkout or prices).
- Search-first header, department/category nav, responsive grids, sidebar + mobile filters
- Product detail: gallery, specs, related products, availability badge
- Enquiry: WhatsApp deep links (wa.me) + Request Quote / Contact forms

## Tech
Next.js 15 App Router (JavaScript), Tailwind, shadcn/ui, yarn. Mock data in `lib/data.js`
(16 products, 10 categories, 9 brands) — structured for Sanity swap.

## Status
- MVP complete (13 routes). User verification pending; automated frontend test was paused by user.
- 2025-06: Business renamed to Sri Ganesh Electricals (done).

## Approved next phase (user decisions)
1. Sanity CMS, embedded Studio at `/studio`; schemas product/category/brand/enquiry; seed mock data into Sanity;
   read via GROQ with fallback to mock data when env not set.
2. Enquiries: save to Sanity **and** append to Google Sheet (tab `Enquiries`, headers
   Date|Name|Phone|Email|Product|Quantity|Message|Source). No email notifications. Keep WhatsApp redirect.
3. Vercel deploy via GitHub ("Save to GitHub" button); write DEPLOY.md + CMS-GUIDE.md (how to add items in Sanity).

## Done (2025-06, this session)
- Sanity CMS integrated (schemas product/category/brand/enquiry, Studio at /studio, structure.js sidebar, lib/catalog.js async layer w/ demo fallback, seed script `yarn seed:sanity`)
- POST /api/enquiries -> Sanity + Google Sheets + Mongo backup; EnquiryForm wired (WhatsApp opens first, then saves)
- DEPLOY.md, CMS-GUIDE.md, README updated; .env.example extended
- Production build verified; dev heap raised to 1400MB (Studio bundle)
- Zip for independent hosting: /app/sri-ganesh-electricals-website.zip (excludes node_modules/.next/.git/.env)
- googleapis pinned to 148.0.0 (Node 20 compat)
- Automated frontend tests (deep_testing_frontend) run on desktop + mobile: ALL 11 scenarios PASSED

## Sanity CONNECTED (2025-06)
- Project ID 67e0wbk7, dataset production; token in /app/.env (SANITY_WRITE_TOKEN). Seeded: 16 products, 10 categories, 9 brands, 19 images, related links (seed is 2-pass for reference integrity).
- Verified: site reads from Sanity (cdn.sanity.io images), POST /api/enquiries -> Sanity enquiry doc saved, /studio renders real Studio login.
- Still pending: Google Sheets credentials (optional). User must log in to /studio with their Sanity account.

## Credentials needed (pending from user)
- Sanity: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN
- Google: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEETS_ID, GOOGLE_SHEETS_RANGE

## Package pins (React-18 compatible, from playbook)
next-sanity@9.8.40 sanity@3.68.3 styled-components@6.1.13 @sanity/client@6.27.2 @sanity/image-url@1.2.0 googleapis
