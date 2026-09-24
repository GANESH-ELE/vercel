import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';
import AvailabilityBadge from './AvailabilityBadge';
import WhatsAppButton from './WhatsAppButton';
import { getBrandName } from '@/lib/data';
import { productEnquiryUrl } from '@/lib/whatsapp';

export default function ProductCard({ product }) {
  if (!product) return null;
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.newArrival && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
            New
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {product.brandName || getBrandName(product.brand)}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="mt-3">
          <AvailabilityBadge availability={product.availability} />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Eye className="h-4 w-4" /> View Product
          </Link>
          <WhatsAppButton href={productEnquiryUrl(product)} size="default">
            Enquire on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
