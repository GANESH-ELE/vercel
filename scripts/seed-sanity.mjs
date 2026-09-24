// =============================================================
// SEED SANITY WITH THE DEMO CATALOG
// -------------------------------------------------------------
// Usage:  yarn seed:sanity
// Reads .env.local / .env for NEXT_PUBLIC_SANITY_PROJECT_ID,
// NEXT_PUBLIC_SANITY_DATASET and SANITY_WRITE_TOKEN.
// Idempotent: uses stable _ids (category-<slug>, brand-<slug>,
// product-<slug>) so re-running updates instead of duplicating.
// =============================================================

import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import { products, categories, brands } from '../lib/data.js';

// ---- tiny .env loader (no extra dependency) ----
for (const file of ['.env.local', '.env']) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m || process.env[m[1]] !== undefined) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: process.env.SANITY_API_VERSION || '2025-02-19' });
const skipImages = process.argv.includes('--no-images');

const assetCache = new Map();
async function imageRef(url, filename) {
  if (!url || skipImages) return undefined;
  if (assetCache.has(url)) return assetCache.get(url);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload('image', buf, { filename: `${filename}.jpg` });
    const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    assetCache.set(url, ref);
    console.log(`  uploaded image ${filename}`);
    return ref;
  } catch (e) {
    console.warn(`  ! image failed for ${filename}: ${e.message}`);
    assetCache.set(url, undefined);
    return undefined;
  }
}

const slugOf = (s) => ({ _type: 'slug', current: s });
const idToSlug = new Map(products.map((p) => [p.id, p.slug]));

async function run() {
  console.log(`Seeding project ${projectId} / ${dataset} ...`);

  console.log(`\nCategories (${categories.length})`);
  for (const [i, c] of categories.entries()) {
    await client.createOrReplace({
      _id: `category-${c.slug}`, _type: 'category', name: c.name, slug: slugOf(c.slug),
      description: c.description, icon: c.icon, order: (i + 1) * 10,
      image: await imageRef(c.image, `category-${c.slug}`),
    });
    console.log(`  ✓ ${c.name}`);
  }

  console.log(`\nBrands (${brands.length})`);
  for (const b of brands) {
    await client.createOrReplace({
      _id: `brand-${b.slug}`, _type: 'brand', name: b.name, slug: slugOf(b.slug),
      description: b.description, image: await imageRef(b.image, `brand-${b.slug}`),
    });
    console.log(`  ✓ ${b.name}`);
  }

  console.log(`\nProducts (${products.length})`);
  for (const p of products) {
    const main = await imageRef(p.image, `product-${p.slug}`);
    const gallery = [];
    for (const [i, g] of (p.gallery || []).entries()) {
      if (g === p.image) continue;
      const ref = await imageRef(g, `product-${p.slug}-${i + 1}`);
      if (ref) gallery.push({ ...ref, _key: `g${i + 1}` });
    }
    await client.createOrReplace({
      _id: `product-${p.slug}`, _type: 'product', name: p.name, slug: slugOf(p.slug),
      brand: { _type: 'reference', _ref: `brand-${p.brand}` },
      category: { _type: 'reference', _ref: `category-${p.category}` },
      shortDescription: p.shortDescription, description: p.description,
      sku: p.sku, productCode: p.productCode, availability: p.availability,
      featured: !!p.featured, newArrival: !!p.newArrival, popular: !!p.popular,
      image: main, gallery,
      specifications: (p.specifications || []).map((s, i) => ({ _type: 'spec', _key: `s${i + 1}`, label: s.label, value: s.value })),
      tags: p.tags || [],
      relatedProducts: (p.relatedProductIds || [])
        .map((id) => idToSlug.get(id)).filter(Boolean)
        .map((slug, i) => ({ _type: 'reference', _ref: `product-${slug}`, _key: `r${i + 1}` })),
    });
    console.log(`  ✓ ${p.name}`);
  }

  console.log('\nSeed complete. Open /studio to see your content.');
}

run().catch((e) => { console.error(e); process.exit(1); });
