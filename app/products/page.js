import { Suspense } from 'react';
import CatalogExplorer from '@/components/CatalogExplorer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllProducts, getAllCategories, getAllBrands } from '@/lib/catalog';

export const metadata = {
  title: 'All Products',
  description: 'Browse the full catalog of electrical, plumbing and building materials. Filter by category, brand and availability, then enquire on WhatsApp.',
};

export default async function ProductsPage() {
  const [products, categories, brands] = await Promise.all([getAllProducts(), getAllCategories(), getAllBrands()]);
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Products' }]} />
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">All Products</h1>
        <p className="mt-2 text-sm text-muted-foreground">Explore our complete range and enquire for price &amp; availability.</p>
      </div>
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading products…</div>}>
        <CatalogExplorer products={products} categories={categories} brands={brands} syncUrl />
      </Suspense>
    </div>
  );
}
