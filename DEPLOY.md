# Deploying Sri Ganesh Electricals — GitHub → Vercel → Sanity

This guide takes you from the project zip to a live website with a working
CMS (Sanity) and enquiry capture (Sanity + Google Sheets + WhatsApp).
Total time: about 30 minutes. No coding required.

---

## 0. What you need

| Account | Cost | Used for |
|---|---|---|
| [GitHub](https://github.com) | Free | Stores the website code |
| [Vercel](https://vercel.com) | Free (Hobby) | Hosts the website (auto-deploys from GitHub) |
| [Sanity](https://www.sanity.io) | Free | Content Studio — add/edit products, categories, brands, view enquiries |
| [Google Cloud](https://console.cloud.google.com) *(optional)* | Free | Append every enquiry to a Google Sheet |

Also install **Node.js 20 or newer** (https://nodejs.org) and **Yarn** (`npm i -g yarn`) on your computer if you want to run the site locally or run the seed script.

---

## 1. Put the code on GitHub

1. Unzip the project folder.
2. Create a new **private** repository on GitHub named e.g. `sri-ganesh-electricals`.
3. In the project folder run:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sri-ganesh-electricals.git
   git push -u origin main
   ```
   (Or drag-and-drop the folder using GitHub Desktop.)

> The `.env` file is ignored by git on purpose — secrets are added in Vercel (step 4).

---

## 2. Create the Sanity project (Content Studio)

1. Go to https://www.sanity.io/manage and sign in (Google/GitHub login works).
2. **Create new project** → name **Sri Ganesh Electricals** → dataset name **production** → visibility **Public** (read-only public content; writing still requires a token).
3. Open the project → **Settings → API**.
   * Copy the **Project ID** (looks like `ab12cd34`).
   * **Tokens → Add API token** → name `website-write`, permissions **Editor** → **Save** → copy the token *now* (it is shown once).
   * **CORS Origins → Add CORS origin**:
     * `http://localhost:3000` — tick *Allow credentials*
     * (after step 3) `https://<your-project>.vercel.app` — tick *Allow credentials*
     * your custom domain later, e.g. `https://www.sriganeshelectricals.com` — tick *Allow credentials*

---

## 3. Deploy on Vercel

1. Go to https://vercel.com → **Add New… → Project** → **Import** your GitHub repo.
2. Framework preset is detected as **Next.js**. Leave build settings as default.
3. Open **Environment Variables** and add the values below (Production + Preview):

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your Project ID | from step 2 |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `SANITY_API_VERSION` | `2025-02-19` | |
| `SANITY_WRITE_TOKEN` | your Editor token | **secret** — never share |
| `NEXT_PUBLIC_BASE_URL` | `https://<your-project>.vercel.app` | update to your custom domain later |
| `NEXT_PUBLIC_BUSINESS_NAME` | `Sri Ganesh Electricals` | |
| `NEXT_PUBLIC_BUSINESS_PHONE` | `+91 XXXXX XXXXX` | shown on the site |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `91XXXXXXXXXX` | digits only, with country code |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | your email | |
| `NEXT_PUBLIC_MAPS_URL` | Google Maps link | optional |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | see step 5 | optional |
| `GOOGLE_PRIVATE_KEY` | see step 5 | optional, secret |
| `GOOGLE_SHEETS_ID` | see step 5 | optional |
| `GOOGLE_SHEETS_RANGE` | `Enquiries!A:H` | optional |

4. Click **Deploy**. In ~2 minutes you get a URL like `https://sri-ganesh-electricals.vercel.app`.
5. Go back to Sanity → **CORS Origins** and add that Vercel URL (with *Allow credentials*).
6. Open `https://<your-project>.vercel.app/studio` and log in with your Sanity account — this is your CMS.

> Every time you push to GitHub, Vercel redeploys automatically. Editing content in Sanity does **not** need a redeploy — the site refreshes within 60 seconds.

---

## 4. Load the starter catalog into Sanity (one time)

The website ships with a demo catalog (16 products, 10 categories, 9 brands). Push it into your Sanity project so you can edit it instead of starting from zero.

On your computer, inside the project folder:

```bash
cp .env.example .env          # then open .env and fill in the SANITY_* values from step 2
yarn install
yarn seed:sanity              # uploads images too (needs internet); or: yarn seed:sanity:no-images
```

Re-running the seed is safe — it updates the same documents instead of duplicating them.
Afterwards open `/studio` → **Products** and you will see everything, ready to edit.

---

## 5. (Optional) Google Sheet for enquiries

1. https://console.cloud.google.com → **New project** (e.g. `sge-website`).
2. **APIs & Services → Library** → search **Google Sheets API** → **Enable**.
3. **IAM & Admin → Service Accounts → Create service account** → name `sheets-writer` → **Done**.
4. Click the account → **Keys → Add key → Create new key → JSON** → a file downloads. Keep it private.
5. Create a Google Sheet named **Enquiries**. Rename the first tab to **Enquiries** and type these headers in row 1:
   `Date | Name | Phone | Email | Product | Quantity | Message | Source`
6. **Share** the sheet with the service account email (`sheets-writer@…iam.gserviceaccount.com`) as **Editor**.
7. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/`**`<THIS PART>`**`/edit`.
8. In Vercel env vars set:
   * `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `client_email` from the JSON
   * `GOOGLE_PRIVATE_KEY` = `private_key` from the JSON (paste the whole value including `-----BEGIN PRIVATE KEY-----`; the `\n` characters are fine)
   * `GOOGLE_SHEETS_ID` = the Sheet ID
   * `GOOGLE_SHEETS_RANGE` = `Enquiries!A:H`
9. **Redeploy** (Vercel → Deployments → ⋯ → Redeploy). Submit a test enquiry from the site: a row appears in the sheet and an **Enquiry** appears in `/studio`.

---

## 6. Custom domain

Vercel → Project → **Settings → Domains** → add `www.yourdomain.com` and follow the DNS instructions from your domain registrar. Then:
* update `NEXT_PUBLIC_BASE_URL` in Vercel and redeploy,
* add the new origin in Sanity → CORS Origins.

---

## 7. Checklist after going live

- [ ] `/` loads with your products (not demo) — open `/studio` and confirm content exists
- [ ] `/studio` login works on the live domain (CORS origin added)
- [ ] Submit the **Request a Quote** form → appears under **Enquiries (new)** in Studio (and in the Sheet)
- [ ] WhatsApp button opens a chat with the correct number (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
- [ ] Phone / address / hours are correct (`lib/config.js` or env vars)

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `/studio` shows "Sanity is not connected yet" | `NEXT_PUBLIC_SANITY_PROJECT_ID` missing in Vercel → add and **redeploy** |
| Studio login loops / CORS error | Add the exact site origin (https://…, no path) in Sanity → API → CORS Origins with *Allow credentials* |
| Enquiries not saved to Sanity | `SANITY_WRITE_TOKEN` missing or not Editor permission → create new token, update Vercel, redeploy |
| Sheet row not appearing | Sheet not shared with the service-account email, wrong tab name in `GOOGLE_SHEETS_RANGE`, or key pasted incorrectly |
| Images missing | Product has no **Main image** in Studio — upload one; a placeholder is shown otherwise |
| Site still shows demo products | Sanity is connected but empty — run `yarn seed:sanity` or add products in Studio |

Developers: see `README.md` for local development and project structure.
