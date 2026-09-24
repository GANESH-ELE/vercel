import Breadcrumbs from '@/components/Breadcrumbs';
import EnquiryForm from '@/components/EnquiryForm';
import { getProductBySlug } from '@/lib/catalog';

export const metadata = {
  title: 'Request a Quote',
  description: 'Request a quote for electrical, plumbing and building materials. Tell us what you need and we’ll respond on WhatsApp.',
};

export default async function RequestQuotePage({ searchParams }) {
  const sp = (await searchParams) || {};
  const product = sp.product ? await getProductBySlug(sp.product) : null;

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Request a Quote' }]} />
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">Request a Quote</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us what you’re looking for and we’ll share the best price and availability. No account or payment needed.
        </p>
        {product && (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3">
            <img src={product.image} alt={product.name} className="h-14 w-14 rounded-md object-cover" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{product.name}</p>
              <p className="text-muted-foreground">SKU: {product.sku}</p>
            </div>
          </div>
        )}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <EnquiryForm variant="quote" product={product || undefined} />
        </div>
      </div>
    </div>
  );
}
