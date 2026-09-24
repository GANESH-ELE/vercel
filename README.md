# Sri Ganesh Traders — Digital Showroom

A premium, mobile-first **catalog-only** website for a building & home materials retail store in **Mangaluru, Karnataka**. Customers browse products and enquire via **WhatsApp, phone and enquiry forms** — there is no cart, checkout, payment or online ordering.

> This is an Amazon-inspired *discovery* experience with its own unique brand identity (deep-teal premium palette). It does not copy any marketplace branding, colours or layout.

## Tech Stack
- **Next.js (App Router)** — running on this template in JavaScript/JSX
- **React 18**
- **Tailwind CSS** + **shadcn/ui** components
- **lucide-react** icons
- Local mock data (CMS-ready structure)

> Note: The reference brief requested TypeScript + npm. This project was generated on a JavaScript/Yarn Next.js template for toolchain stability; the data layer and component structure are identical and can be migrated to TS trivially.

## Commands
```bash
yarn install      # install dependencies (npm install also works on a fresh clone)
yarn dev          # start dev server on port 3000
yarn build        # production build
yarn start        # run production build
```

## Where to edit things
| What | File |
|------|------|
| Business info (name, phone, WhatsApp, email, address, hours, maps, theme, socials) | `lib/config.js` |
| Products | `lib/data.js` → `products` array |
| Categories | `lib/data.js` → `categories` array |
| Brands | `lib/data.js` → `brands` array |
| Data types (JSDoc) | `lib/types.js` |
| WhatsApp message builders | `lib/whatsapp.js` |
| Form validation | `lib/validation.js` |
| Theme colours (HSL tokens) | `app/globals.css` |

## Configure WhatsApp
Set the WhatsApp number in `lib/config.js` (`whatsappNumber`) in **international format without `+` or spaces**, e.g. `918050123456`. All “Enquire on WhatsApp” buttons build a `https://wa.me/<number>?text=...` deep link. Product enquiries auto-fill:

> Hello, I want to enquire about [PRODUCT NAME], SKU [SKU]. Please share the price and availability.

## Environment variables
Optional overrides (see `.env.example`). All are `NEXT_PUBLIC_*` and safe to expose — **no private keys are used**.

## Routes
`/`, `/about`, `/categories`, `/categories/[slug]`, `/products`, `/products/[slug]`, `/brands`, `/brands/[slug]`, `/contact`, `/request-quote`, `/search`, plus `not-found`, `sitemap.xml`, `robots.txt`.

## Deploy to Vercel
1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the `NEXT_PUBLIC_*` env vars from `.env.example` (optional).
4. Deploy — the App Router project builds out of the box.

## Future: Sanity CMS integration
All catalog data lives only in `lib/data.js` behind getter functions (`getAllProducts`, `getProductBySlug`, `getProductsByCategory`, etc.). To add Sanity later:
1. Create Sanity schemas matching the shapes in `lib/types.js`.
2. Replace the bodies of the getters in `lib/data.js` with Sanity GROQ queries returning the same shapes.
3. The UI needs **no changes** — it never imports raw data, only the getters.

## Notes
- All product/category/brand content is **DEMO data** (clearly marked in `lib/data.js`). Replace before going live.
- No prices, ratings, reviews or stock counts are shown — availability uses neutral labels (Available / Made to Order / Enquire for Availability).
