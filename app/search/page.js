import { Suspense } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchClient from '@/components/SearchClient';
import { getAllProducts, getAllCategories, getAllBrands } from '@/lib/catalog';

export const metadata = {
  title: 'Search',
  description: 'Search our catalog by product name, brand, category, SKU, description, tags and specifications.',
};

export default async function SearchPage() {
  const [products, categories, brands] = await Promise.all([getAllProducts(), getAllCategories(), getAllBrands()]);
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Search' }]} />
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading search…</div>}>
        <SearchClient products={products} categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
}
