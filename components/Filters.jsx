'use client';

import { AVAILABILITY } from '@/lib/data';
import { Search, X } from 'lucide-react';

// Presentational filter controls. Parent owns the state.
export default function Filters({ value, onChange, categories = [], brands = [], showCategory = true, showBrand = true, showSearch = true }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const selectCls =
    'h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40';

  return (
    <div className="space-y-5">
      {showSearch && (
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={value.q || ''}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Search in results"
              className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>
      )}

      {showCategory && (
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</label>
          <select className={selectCls} value={value.category || ''} onChange={(e) => set({ category: e.target.value })}>
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      )}

      {showBrand && (
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Brand</label>
          <select className={selectCls} value={value.brand || ''} onChange={(e) => set({ brand: e.target.value })}>
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>{b.name}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Availability</label>
        <select className={selectCls} value={value.availability || ''} onChange={(e) => set({ availability: e.target.value })}>
          <option value="">Any Availability</option>
          <option value={AVAILABILITY.AVAILABLE}>{AVAILABILITY.AVAILABLE}</option>
          <option value={AVAILABILITY.MADE_TO_ORDER}>{AVAILABILITY.MADE_TO_ORDER}</option>
          <option value={AVAILABILITY.ENQUIRE}>{AVAILABILITY.ENQUIRE}</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sort By</label>
        <select className={selectCls} value={value.sort || 'featured'} onChange={(e) => set({ sort: e.target.value })}>
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="popular">Popularity</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      <button
        onClick={() => onChange({ q: '', category: showCategory ? '' : value.category, brand: '', availability: '', sort: 'featured' })}
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        <X className="h-4 w-4" /> Clear filters
      </button>
    </div>
  );
}
