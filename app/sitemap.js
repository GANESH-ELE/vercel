import { getAllProducts, getAllCategories, getAllBrands } from '@/lib/data';

const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ['', '/about', '/categories', '/products', '/brands', '/contact', '/request-quote', '/search'].map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.7,
  }));
  const products = getAllProducts().map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  const categories = getAllCategories().map((c) => ({ url: `${base}/categories/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  const brands = getAllBrands().map((b) => ({ url: `${base}/brands/${b.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 }));
  return [...staticRoutes, ...categories, ...brands, ...products];
}
