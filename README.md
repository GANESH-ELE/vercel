# Sri Ganesh Electricals — Digital Showroom

A premium, mobile-first **catalog-only** website for a building & home materials retail store in **Mangaluru, Karnataka**. Customers browse products and enquire via **WhatsApp, phone and enquiry forms** — there is no cart, checkout, payment or online ordering.

> This is an Amazon-inspired *discovery* experience with its own unique brand identity (deep-teal premium palette). It does not copy any marketplace branding, colours or layout.

## Tech Stack
- **Next.js 15 (App Router)** — JavaScript/JSX
- **React 18**
- **Tailwind CSS** + **shadcn/ui** components, **lucide-react** icons
- **Sanity CMS** (embedded Studio at `/studio`) — products, categories, brands, enquiries
- **Google Sheets API** (optional) — every enquiry appended as a row
- Built-in demo catalog (`lib/data.js`) used automatically when Sanity is not configured

## Quick links
- **DEPLOY.md** — step-by-step: GitHub → Vercel → Sanity → Google Sheets → custom domain
- **CMS-GUIDE.md** — for showroom staff: how to add/edit products, categories, brands and handle enquiries in Studio

## Commands
```bash
yarn install               # install dependencies
yarn dev                   # start dev server on port 3000
yarn build                 # production build
yarn start                 # run production build
yarn seed:sanity           # one-time: push the demo catalog (with images) into your Sanity project
yarn seed:sanity:no-images # same, without uploading images
```

## Where to edit things
| What | File |
|------|------|
| Business info (name, phone, WhatsApp, email, address, hours, maps, theme, socials) | `lib/config.js` (or `NEXT_PUBLIC_*` env vars) |
| Products / Categories / Brands (live site) | **Sanity Studio** at `/studio` |
| Demo catalog (fallback when Sanity is not configured) | `lib/data.js` |
| Sanity schemas (fields shown in Studio) | `sanity/schemas/*.js` |
| Studio sidebar | `sanity/structure.js` |
| GROQ queries + data normalisation | `sanity/lib/queries.js`, `lib/catalog.js` |
| Enquiry API (Sanity + Google Sheets + Mongo backup) | `app/api/enquiries/route.js`, `lib/sheets.js` |
| WhatsApp message builders | `lib/whatsapp.js` |
| Form validation (shared client + server) | `lib/validation.js` |
| Theme colours (HSL tokens) | `app/globals.css` |

## How data flows
```
Pages (server components) ──► lib/catalog.js ──► Sanity (GROQ)  if NEXT_PUBLIC_SANITY_PROJECT_ID is set
                                              └─► lib/data.js  (demo data) otherwise / on error
Enquiry forms ──► POST /api/enquiries ──► Sanity "enquiry" doc + Google Sheet row (+ MongoDB if MONGO_URL)
              └─► wa.me deep link opens WhatsApp with the same details
```
Content changes in Sanity appear on the site within 60 s (ISR `revalidate = 60`).

## Configure WhatsApp
Set the WhatsApp number in `lib/config.js` (`whatsappNumber`) or `NEXT_PUBLIC_WHATSAPP_NUMBER` in **international format without `+` or spaces**, e.g. `918050123456`. All “Enquire on WhatsApp” buttons build a `https://wa.me/<number>?text=...` deep link. Product enquiries auto-fill:

> Hello, I want to enquire about [PRODUCT NAME], SKU [SKU]. Please share the price and availability.

## Environment variables
See `.env.example`. `NEXT_PUBLIC_*` values are public. **Secrets** (`SANITY_WRITE_TOKEN`, `GOOGLE_PRIVATE_KEY`) are server-only — never prefix them with `NEXT_PUBLIC_` and never commit `.env`.

## Routes
`/`, `/about`, `/categories`, `/categories/[slug]`, `/products`, `/products/[slug]`, `/brands`, `/brands/[slug]`, `/contact`, `/request-quote`, `/search`, `/studio` (CMS), `/api/enquiries` (POST), plus `not-found`, `sitemap.xml`, `robots.txt`.

## Deploy to Vercel
Full walkthrough in **DEPLOY.md**. Short version: push to GitHub → import in Vercel → add env vars from `.env.example` → Deploy → add the Vercel URL to Sanity CORS origins → open `/studio`.

## Notes
- Demo catalog content is clearly marked in `lib/data.js`; run `yarn seed:sanity` to copy it into Sanity, then edit in Studio.
- No prices, ratings, reviews or stock counts are shown — availability uses neutral labels (Available / Made to Order / Enquire for Availability).
- Package pins `next-sanity@9.8.x`, `sanity@3.68.x`, `styled-components@6.1.x` are the React-18-compatible set; upgrade them together only.
