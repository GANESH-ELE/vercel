import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogExplorer from '@/components/CatalogExplorer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getBrandBySlug, getProductsByBrand, getAllBrands, getAllCategories } from '@/lib/catalog';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllBrands()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: 'Brand not found' };
  return { title: `${brand.name} Products`, description: brand.description };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  const [products, categories] = await Promise.all([getProductsByBrand(slug), getAllCategories()]);
  const waUrl = buildWhatsAppUrl(`Hello, I would like to enquire about ${brand.name} products. Please share details.`);

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Brands', href: '/brands' }, { label: brand.name }]} />

      <div className="mb-8 flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl font-extrabold text-primary">
          {brand.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">{brand.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{brand.description}</p>
          <p className="mt-2 text-sm font-semibold text-foreground">{products.length} product{products.length === 1 ? '' : 's'}</p>
        </div>
        <WhatsAppButton href={waUrl} size="lg">Enquire on WhatsApp</WhatsAppButton>
      </div>

      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading…</div>}>
        <CatalogExplorer products={products} categories={categories} showBrand={false} />
      </Suspense>
    </div>
  );
}
