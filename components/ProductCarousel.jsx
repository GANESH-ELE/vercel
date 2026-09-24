'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductCarousel({ title, products = [], viewAllHref, subtitle }) {
  const ref = useRef(null);
  if (!products || products.length === 0) return null;

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {viewAllHref && (
              <Link href={viewAllHref} className="hidden text-sm font-semibold text-primary hover:underline sm:inline">View all</Link>
            )}
            <button aria-label="Scroll left" onClick={() => scroll(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white hover:bg-secondary">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button aria-label="Scroll right" onClick={() => scroll(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white hover:bg-secondary">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div ref={ref} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
          {products.map((p) => (
            <div key={p.id} className="w-[68vw] shrink-0 snap-start sm:w-64">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
