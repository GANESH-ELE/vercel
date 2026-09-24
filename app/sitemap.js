import { getAllProducts, getAllCategories, getAllBrands } from '@/lib/catalog';

const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = ['', '/about', '/categories', '/products', '/brands', '/contact', '/request-quote', '/search'].map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.7,
  }));
  const [allProducts, allCategories, allBrands] = await Promise.all([getAllProducts(), getAllCategories(), getAllBrands()]);
  const products = allProducts.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  const categories = allCategories.map((c) => ({ url: `${base}/categories/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  const brands = allBrands.map((b) => ({ url: `${base}/brands/${b.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 }));
  return [...staticRoutes, ...categories, ...brands, ...products];
}
