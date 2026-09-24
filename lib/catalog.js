// =============================================================
// CATALOG DATA ACCESS (server-side, async)
// -------------------------------------------------------------
// Single entry point used by all pages. Reads from Sanity when
// NEXT_PUBLIC_SANITY_PROJECT_ID is configured, otherwise falls
// back to the local demo catalog in lib/data.js. The returned
// shapes are identical in both modes (see lib/types.js).
// =============================================================

import { cache } from 'react';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY, ALL_BRANDS_QUERY } from '@/sanity/lib/queries';
import * as mock from './data';

// How often (seconds) Vercel re-fetches content from Sanity.
export const CATALOG_REVALIDATE_SECONDS = 60;

const PLACEHOLDER_IMAGE = mock.categories[0]?.image || '';

function cdn(url, w = 940) {
  if (!url) return '';
  return url.includes('cdn.sanity.io') ? `${url}?w=${w}&auto=format&fit=max` : url;
}

function normalizeProduct(p) {
  const image = cdn(p.image) || PLACEHOLDER_IMAGE;
  const gallery = [image, ...((p.gallery || []).filter(Boolean).map((g) => cdn(g)))].filter((v, i, a) => v && a.indexOf(v) === i);
  return {
    id: p.id,
    name: p.name || 'Untitled product',
    slug: p.slug,
    brand: p.brand || '',
    brandName: p.brandName || '',
    category: p.category || '',
    categoryName: p.categoryName || '',
    shortDescription: p.shortDescription || '',
    description: p.description || '',
    image,
    gallery,
    availability: p.availability || mock.AVAILABILITY.AVAILABLE,
    featured: !!p.featured,
    newArrival: !!p.newArrival,
    popular: !!p.popular,
    specifications: (p.specifications || []).filter((s) => s && s.label),
    relatedProductIds: (p.relatedProductIds || []).filter(Boolean),
    sku: p.sku || '',
    productCode: p.productCode || '',
    tags: (p.tags || []).filter(Boolean),
  };
}

function normalizeCategory(c) {
  return {
    id: c.id, name: c.name, slug: c.slug, icon: c.icon || 'Package',
    description: c.description || '', image: cdn(c.image) || PLACEHOLDER_IMAGE,
    order: c.order ?? 100, productCount: c.productCount ?? 0,
  };
}

function normalizeBrand(b) {
  return {
    id: b.id, name: b.name, slug: b.slug, description: b.description || '',
    image: cdn(b.image) || PLACEHOLDER_IMAGE, productCount: b.productCount ?? 0,
  };
}

async function sanityFetch(query) {
  return client.fetch(query, {}, { next: { revalidate: CATALOG_REVALIDATE_SECONDS } });
}

// Loads the whole catalog once per request (React cache) and once per
// revalidation window on the server (Next data cache).
export const loadCatalog = cache(async () => {
  if (!isSanityConfigured || !client) {
    return { source: 'demo', products: mock.products, categories: mock.categories, brands: mock.brands };
  }
  try {
    const [products, categories, brands] = await Promise.all([
      sanityFetch(ALL_PRODUCTS_QUERY), sanityFetch(ALL_CATEGORIES_QUERY), sanityFetch(ALL_BRANDS_QUERY),
    ]);
    return {
      source: 'sanity',
      products: (products || []).map(normalizeProduct),
      categories: (categories || []).map(normalizeCategory),
      brands: (brands || []).map(normalizeBrand),
    };
  } catch (err) {
    console.error('[catalog] Sanity fetch failed, falling back to demo data:', err?.message || err);
    return { source: 'demo-fallback', products: mock.products, categories: mock.categories, brands: mock.brands };
  }
});

// ---- Products ----
export async function getAllProducts() { return (await loadCatalog()).products; }
export async function getProductBySlug(slug) {
  return (await loadCatalog()).products.find((p) => p.slug === slug) || null;
}
export async function getProductsByCategory(slug) {
  return (await loadCatalog()).products.filter((p) => p.category === slug);
}
export async function getProductsByBrand(slug) {
  return (await loadCatalog()).products.filter((p) => p.brand === slug);
}
export async function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  const { products } = await loadCatalog();
  const byId = (product.relatedProductIds || []).map((id) => products.find((p) => p.id === id)).filter(Boolean);
  if (byId.length >= limit) return byId.slice(0, limit);
  const extra = products.filter((p) => p.category === product.category && p.id !== product.id && !byId.includes(p));
  return [...byId, ...extra].slice(0, limit);
}
export async function getSameBrandProducts(product, limit = 4) {
  if (!product) return [];
  return (await loadCatalog()).products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, limit);
}
export async function getAlternativeProducts(product, limit = 4) {
  if (!product) return [];
  return (await loadCatalog()).products
    .filter((p) => p.category === product.category && p.brand !== product.brand && p.id !== product.id)
    .slice(0, limit);
}
export async function getFeaturedProducts() { return (await loadCatalog()).products.filter((p) => p.featured); }
export async function getNewArrivals() { return (await loadCatalog()).products.filter((p) => p.newArrival); }
export async function getPopularProducts() { return (await loadCatalog()).products.filter((p) => p.popular); }

// ---- Categories / Brands ----
export async function getAllCategories() { return (await loadCatalog()).categories; }
export async function getCategoryBySlug(slug) {
  return (await loadCatalog()).categories.find((c) => c.slug === slug) || null;
}
export async function getAllBrands() { return (await loadCatalog()).brands; }
export async function getBrandBySlug(slug) {
  return (await loadCatalog()).brands.find((b) => b.slug === slug) || null;
}

// ---- Search ----
export async function searchProducts(query) {
  const { products, brands, categories } = await loadCatalog();
  return mock.filterProductsByQuery(products, query, { brands, categories });
}

// Convenience for pages that need everything at once.
export async function getCatalogSource() { return (await loadCatalog()).source; }
