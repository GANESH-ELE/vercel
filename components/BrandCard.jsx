import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductsByBrand } from '@/lib/data';

export default function BrandCard({ brand }) {
  const count = getProductsByBrand(brand.slug).length;
  const initials = brand.name.slice(0, 2).toUpperCase();
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-shadow hover:shadow-md"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-lg font-extrabold text-primary">
        {initials}
      </div>
      <h3 className="mt-3 text-sm font-bold text-foreground">{brand.name}</h3>
      <p className="text-xs text-muted-foreground">{count} products</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
        View Products <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
