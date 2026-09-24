'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ProductGallery({ images = [], alt = 'Product image' }) {
  const list = images && images.length ? images : [];
  const [active, setActive] = useState(0);
  if (!list.length) return null;

  return (
    <div>
      <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted">
        <img src={list[active]} alt={alt} className="h-full w-full object-cover" />
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition',
                i === active ? 'border-primary' : 'border-border hover:border-primary/40'
              )}
            >
              <img src={img} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
