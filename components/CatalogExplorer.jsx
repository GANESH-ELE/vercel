'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Filters from './Filters';
import ProductGrid from './ProductGrid';
import { filterProductsByQuery } from '@/lib/data';

function matchesQuery(p, q) {
  if (!q) return true;
  return filterProductsByQuery([p], q).length > 0;
}

function sortProducts(list, sort) {
  const arr = [...list];
  switch (sort) {
    case 'name': return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest': return arr.sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || a.name.localeCompare(b.name));
    case 'popular': return arr.sort((a, b) => Number(b.popular) - Number(a.popular) || a.name.localeCompare(b.name));
    case 'featured':
    default: return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
  }
}

export default function CatalogExplorer({
  products = [], categories = [], brands = [],
  showCategory = true, showBrand = true, syncUrl = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [value, setValue] = useState({
    q: sp.get('q') || '',
    category: showCategory ? (sp.get('category') || '') : '',
    brand: showBrand ? (sp.get('brand') || '') : '',
    availability: sp.get('availability') || '',
    sort: sp.get('sort') || 'featured',
  });

  const onChange = useCallback((next) => {
    setValue(next);
    if (syncUrl) {
      const params = new URLSearchParams();
      if (next.q) params.set('q', next.q);
      if (next.category) params.set('category', next.category);
      if (next.brand) params.set('brand', next.brand);
      if (next.availability) params.set('availability', next.availability);
      if (next.sort && next.sort !== 'featured') params.set('sort', next.sort);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
  }, [syncUrl, router, pathname]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (value.category && p.category !== value.category) return false;
      if (value.brand && p.brand !== value.brand) return false;
      if (value.availability && p.availability !== value.availability) return false;
      return matchesQuery(p, value.q);
    });
    return sortProducts(list, value.sort);
  }, [products, value]);

  const filterEl = (
    <Filters value={value} onChange={onChange} categories={categories} brands={brands} showCategory={showCategory} showBrand={showBrand} />
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-40 rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide">Filters</h2>
          {filterEl}
        </div>
      </aside>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> product{filtered.length === 1 ? '' : 's'}
          </p>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold hover:bg-secondary">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-5">{filterEl}</div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <ProductGrid
          products={filtered}
          emptyProps={{ title: 'No matching products', description: 'Try clearing filters or searching a different term.', actionLabel: 'Clear all', actionHref: pathname }}
        />
      </div>
    </div>
  );
}
