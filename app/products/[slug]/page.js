import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, FileText, Tag, Barcode, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGallery from '@/components/ProductGallery';
import WhatsAppButton from '@/components/WhatsAppButton';
import AvailabilityBadge from '@/components/AvailabilityBadge';
import ProductCarousel from '@/components/ProductCarousel';
import config from '@/lib/config';
import { productEnquiryUrl } from '@/lib/whatsapp';
import {
  getProductBySlug, getAllProducts, getBrandBySlug, getCategoryBySlug,
  getProductsByCategory, getSameBrandProducts, getAlternativeProducts,
} from '@/lib/catalog';

// Re-fetch content from Sanity at most once a minute (ISR on Vercel).
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllProducts()).map((p) => ({ slug: p.slug }));
}

async function names(product) {
  const [b, c] = await Promise.all([getBrandBySlug(product.brand), getCategoryBySlug(product.category)]);
  return {
    brandName: product.brandName || b?.name || product.brand,
    categoryName: product.categoryName || c?.name || product.category,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  const { brandName } = await names(product);
  return {
    title: `${product.name} — ${brandName}`,
    description: product.shortDescription,
    openGraph: { title: product.name, description: product.shortDescription, images: [product.image] },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const phoneHref = `tel:${config.phone.replace(/\s/g, '')}`;
  const [{ brandName, categoryName }, inCategory, allProducts, alternatives, sameBrand] = await Promise.all([
    names(product),
    getProductsByCategory(product.category),
    getAllProducts(),
    getAlternativeProducts(product, 8),
    getSameBrandProducts(product, 8),
  ]);
  const similar = inCategory.filter((p) => p.id !== product.id).slice(0, 8);
  const together = (product.relatedProductIds || []).map((id) => allProducts.find((p) => p.id === id)).filter(Boolean);
  const getBrandName = () => brandName;
  const getCategoryName = () => categoryName;

  const keyFeatures = [
    `Genuine ${brandName} product`,
    `Category: ${categoryName}`,
    product.shortDescription,
    'Contact us for the best price and availability',
  ];

  return (
    <>
      <div className="container py-8">
        <Breadcrumbs items={[
          { label: 'Products', href: '/products' },
          { label: getCategoryName(product.category), href: `/categories/${product.category}` },
          { label: product.name },
        ]} />

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery images={product.gallery} alt={product.name} />

          <div>
            <Link href={`/brands/${product.brand}`} className="text-sm font-semibold uppercase tracking-wide text-primary hover:underline">
              {getBrandName(product.brand)}
            </Link>
            <h1 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <AvailabilityBadge availability={product.availability} />
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Barcode className="h-3.5 w-3.5" /> Code: {product.productCode}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Tag className="h-3.5 w-3.5" /> SKU: {product.sku}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Price policy */}
            <div className="mt-5 rounded-lg border border-dashed border-primary/30 bg-secondary/40 p-4">
              <p className="text-sm font-semibold text-foreground">Contact for Price</p>
              <p className="text-xs text-muted-foreground">We share our best price on enquiry. Message us on WhatsApp or call the showroom.</p>
            </div>

            {/* Actions */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <WhatsAppButton href={productEnquiryUrl(product)} size="lg" className="w-full">Request Price on WhatsApp</WhatsAppButton>
              <a href={phoneHref} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground hover:brightness-95">
                <Phone className="h-4 w-4" /> Call Showroom
              </a>
              <WhatsAppButton href={productEnquiryUrl(product)} size="lg" variant="outline" className="w-full">Enquire on WhatsApp</WhatsAppButton>
              <Link href={`/request-quote?product=${product.slug}`} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-border px-6 text-sm font-bold text-foreground hover:bg-secondary">
                <FileText className="h-4 w-4" /> Request a Quote
              </Link>
            </div>

            {/* Key features */}
            <div className="mt-7">
              <h2 className="text-lg font-bold text-foreground">Key Features</h2>
              <ul className="mt-3 space-y-2">
                {keyFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-foreground">Specifications</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {product.specifications.map((s, i) => (
                  <tr key={i} className={i % 2 ? 'bg-secondary/30' : 'bg-white'}>
                    <th scope="row" className="w-1/2 px-4 py-3 text-left font-medium text-foreground sm:w-1/3">{s.label}</th>
                    <td className="px-4 py-3 text-muted-foreground">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {together.length > 0 && (
        <div className="bg-secondary/30">
          <ProductCarousel title="Frequently Used Together" subtitle="Complete your setup" products={together} />
        </div>
      )}
      {similar.length > 0 && (
        <ProductCarousel title="Similar Products" subtitle="More in this category" products={similar} viewAllHref={`/categories/${product.category}`} />
      )}
      {alternatives.length > 0 && (
        <div className="bg-secondary/30">
          <ProductCarousel title="Alternative Products" subtitle="Other options to consider" products={alternatives} />
        </div>
      )}
      {sameBrand.length > 0 && (
        <ProductCarousel title={`More from ${getBrandName(product.brand)}`} products={sameBrand} viewAllHref={`/brands/${product.brand}`} />
      )}
    </>
  );
}
