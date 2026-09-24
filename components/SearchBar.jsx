'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar({ defaultValue = '', placeholder = 'Search products, brands, SKU, specs...', autoFocus = false }) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  return (
    <form onSubmit={onSubmit} className="relative w-full" role="search">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="h-11 w-full rounded-lg border border-border bg-white pl-10 pr-24 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:brightness-95"
      >
        Search
      </button>
    </form>
  );
}
