'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import ProductGrid from './ProductGrid';
import { filterProductsByQuery } from '@/lib/data';

// Receives the full catalog from the server page (Sanity or demo data) and
// filters client-side so typing feels instant.
export default function SearchClient({ products = [], categories = [], brands = [] }) {
  const sp = useSearchParams();
  const q = sp.get('q') || '';
  const results = useMemo(() => filterProductsByQuery(products, q, { brands, categories }), [products, brands, categories, q]);
  const suggestions = ['Jaquar', 'Berger', 'CPVC pipe', 'water tank', 'ceiling fan', 'wash basin'];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">Search Products</h1>
      <div className="mt-4 max-w-2xl">
        <SearchBar defaultValue={q} autoFocus />
      </div>

      {!q ? (
        <div className="mt-8">
          <p className="text-sm font-semibold text-foreground">Popular searches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="rounded-full border border-border bg-white px-4 py-1.5 text-sm hover:bg-secondary">{s}</Link>
            ))}
          </div>
          <p className="mt-8 text-sm font-semibold text-foreground">Browse categories</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.id} href={`/categories/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-1.5 text-sm hover:bg-secondary">{c.name}</Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="mb-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{results.length}</span> result{results.length === 1 ? '' : 's'} for “<span className="font-semibold text-foreground">{q}</span>”
          </p>
          <ProductGrid
            products={results}
            emptyProps={{
              title: `No results for “${q}”`,
              description: 'Try a different keyword, brand or SKU — or browse all products.',
              actionLabel: 'Browse all products', actionHref: '/products',
            }}
          />
        </div>
      )}
    </div>
  );
}
