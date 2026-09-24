import { Suspense } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchClient from '@/components/SearchClient';

export const metadata = {
  title: 'Search',
  description: 'Search our catalog by product name, brand, category, SKU, description, tags and specifications.',
};

export default function SearchPage() {
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Search' }]} />
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading search…</div>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
