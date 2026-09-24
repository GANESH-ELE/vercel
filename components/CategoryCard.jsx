import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { getProductsByCategory } from '@/lib/data';

export default function CategoryCard({ category }) {
  const Icon = Icons[category.icon] || Icons.Package;
  const count = getProductsByCategory(category.slug).length;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-primary shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-base font-bold text-white">{category.name}</h3>
          <p className="text-xs text-white/80">{count} products</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="line-clamp-1 text-xs text-muted-foreground">{category.description}</span>
        <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
