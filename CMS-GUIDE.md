# Managing the Website Content — Sanity Studio Guide

Your website reads all products, categories, brands and enquiries from **Sanity**.
You manage them from the built-in **Studio** at:

```
https://<your-website>/studio
```

Log in with the Google/GitHub account you used to create the Sanity project.
Changes appear on the live website within about **1 minute** — no redeploy needed.

---

## The Studio sidebar

| Section | What it is |
|---|---|
| **Products** | Every item in the catalog (fans, pipes, wires, taps, paints…) |
| **Categories** | Departments shown in the menu / home page (Electrical, Plumbing, Sanitaryware…) |
| **Brands** | Manufacturers (Havells, Finolex, Jaquar…) |
| **Enquiries (new)** | Customer enquiries from the website forms that you have not handled yet |
| **All enquiries** | Complete history of enquiries |

> The website is **enquiry only** — there is deliberately **no price field**. Customers ask on WhatsApp / via the quote form.

---

## Add a new product

1. Sidebar → **Products** → click the **＋ (Create)** button (top-left / top-right).
2. Fill the **Basic info** tab:
   * **Product name** — full name incl. size/variant, e.g. `Havells Ceiling Fan 1200mm White`.
   * **URL slug** — click **Generate** (creates `havells-ceiling-fan-1200mm-white`).
   * **Brand** — pick from the list (create the brand first if it is new — see below).
   * **Category** — pick from the list.
   * **Short description** — one line for the product card (max 160 characters).
   * **Full description** — 2–5 sentences for the product page.
   * **SKU** — your stock code (this is included in WhatsApp enquiries so you know which item they mean).
   * **Product code** — manufacturer code (optional).
   * **Availability** — `Available`, `Made to Order`, or `Enquire for Availability`.
3. **Images** tab:
   * **Main image** — click *Select / Upload*, choose a square photo (≈1000×1000 px). Use the **hotspot** tool to choose the focus area.
   * **Gallery images** — extra photos (optional).
4. **Specifications** tab:
   * Click **Add item** → Label (e.g. `Wattage`) / Value (e.g. `18 W`). Repeat for each spec.
   * **Search tags** — extra words customers may type in search (e.g. `fan, cooling, bedroom`).
   * **Related products** — pick items usually bought together (optional; same-category items are shown automatically if empty).
5. **Visibility** tab:
   * **Featured on home page** — shows in "Featured Products".
   * **New arrival badge** — shows a *New* ribbon and appears in "New Arrivals".
   * **Popular product** — appears in "Popular Products".
6. Click **Publish** (bottom-right). Done — the product is live within a minute.

### Edit / update a product
Sidebar → **Products** → click the product → change fields → **Publish**.
Use the search box at the top of the list to find items quickly.

### Mark an item out of stock
Open the product → **Availability** → choose `Enquire for Availability` (or `Made to Order`) → **Publish**.
The badge on the website changes immediately; the product stays visible so customers can still enquire.

### Remove a product
Open the product → **⋮ menu** (next to Publish) → **Delete**. If Studio says the product is referenced, first remove it from other products' *Related products*.

### Unpublish temporarily
**⋮ menu → Unpublish** hides it from the website but keeps it in Studio so you can publish again later.

---

## Add a category (department)

1. Sidebar → **Categories** → **＋ Create**.
2. **Category name** (e.g. `Switches & Sockets`) → **Generate** slug.
3. **Short description**, **Cover image** (landscape ≈1200×900), **Icon** (pick the closest icon), **Display order** (lower = appears earlier on the home page).
4. **Publish**.

Categories appear in the header menu, the *Shop by Category* grid and the filters automatically.

---

## Add a brand

1. Sidebar → **Brands** → **＋ Create**.
2. **Brand name** → **Generate** slug → **Short description** → **Brand image / logo** (optional).
3. **Publish**. The brand now appears in the brand list and in product filters.

---

## Handling enquiries

Every time a customer submits **Request a Quote**, **Contact**, or a product enquiry form on the website:

1. A WhatsApp chat opens on the customer's phone with the details (so you also get the WhatsApp message).
2. An **Enquiry** document is created in Studio (and a row is appended to your Google Sheet if configured).

To process them: Sidebar → **Enquiries (new)** → open one → read the customer's name, phone, product, quantity and message.
Set **Status**:
* **New** → not yet handled
* **Contacted** → you have called/messaged the customer
* **Quoted** → you have shared a price
* **Closed** → done (won or lost)

Add anything useful in **Internal notes** (customers never see this) → **Publish**. Items marked *Contacted/Quoted/Closed* leave the "new" list but remain under **All enquiries**.

---

## Images — tips

* Use **JPG or PNG**, under 2 MB. Square for products, landscape for categories.
* After uploading, drag the **hotspot circle** onto the most important part of the picture so it is never cropped out on mobile.
* You can reuse an uploaded picture: click *Select* → **Browse** the media library.

---

## Inviting staff

https://www.sanity.io/manage → your project → **Members → Invite** → enter their email → role **Editor** (can edit content) or **Viewer** (read-only). They log in to the same `/studio` URL.

---

## Frequently asked

**I published but the website still shows the old text.** Wait up to 60 seconds and refresh. If it persists after a few minutes, check the document is *Published* (not just saved as a draft — the Publish button turns grey once published).

**A product shows a wrong brand/category.** Open the product → change the **Brand** / **Category** reference → Publish.

**Can I change the shop phone number / address / WhatsApp number?** Those are website settings, not content: update the `NEXT_PUBLIC_BUSINESS_*` / `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variables in Vercel and redeploy (see `DEPLOY.md`), or edit `lib/config.js`.

**Can I add prices later?** Yes — a developer can add a `price` field to `sanity/schemas/product.js` and display it; the rest of the setup stays the same.
