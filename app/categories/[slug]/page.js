import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogExplorer from '@/components/CatalogExplorer';
import { getCategoryBySlug, getProductsByCategory, getAllCategories, getAllBrands } from '@/lib/data';

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category not found' };
  return {
    title: `${category.name}`,
    description: category.description,
    openGraph: { title: category.name, description: category.description, images: [category.image] },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const brands = getAllBrands();

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Categories', href: '/categories' }, { label: category.name }]} />

      <div className="mb-8 overflow-hidden rounded-2xl border border-border">
        <div className="relative h-44 sm:h-56">
          <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40" />
          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 text-white">
            <h1 className="text-2xl font-extrabold sm:text-4xl">{category.name}</h1>
            <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">{category.description}</p>
            <p className="mt-3 text-sm font-semibold">{products.length} product{products.length === 1 ? '' : 's'}</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading…</div>}>
        <CatalogExplorer products={products} brands={brands} showCategory={false} />
      </Suspense>

      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-secondary/50 p-6 sm:flex-row">
        <div>
          <h3 className="text-lg font-bold">Need help choosing {category.name}?</h3>
          <p className="text-sm text-muted-foreground">Request a quote and we’ll get back with the right options.</p>
        </div>
        <Link href="/request-quote" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:brightness-95">
          <FileText className="h-4 w-4" /> Request a Quote
        </Link>
      </div>
    </div>
  );
}
