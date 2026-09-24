import Link from 'next/link';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, Youtube, Store } from 'lucide-react';
import config from '@/lib/config';
import { getAllCategories } from '@/lib/catalog';

export default async function Footer() {
  const categories = (await getAllCategories()).slice(0, 8);
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Store className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold">{config.businessName}</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{config.tagline}</p>
            <p className="mt-2 text-sm text-muted-foreground">Serving {config.city} and surrounding areas.</p>
            <div className="mt-4 flex gap-3">
              <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-lg border border-border p-2 hover:bg-white"><Facebook className="h-4 w-4" /></a>
              <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-lg border border-border p-2 hover:bg-white"><Instagram className="h-4 w-4" /></a>
              <a href={config.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-lg border border-border p-2 hover:bg-white"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-primary">Brands</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/request-quote" className="hover:text-primary">Request a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {categories.map((c) => (
                <li key={c.id}><Link href={`/categories/${c.slug}`} className="hover:text-primary">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{config.address.line1}, {config.address.line2}, {config.address.state}</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /><a href={`tel:${config.phone.replace(/\s/g, '')}`} className="hover:text-primary">{config.phone}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /><a href={`mailto:${config.email}`} className="hover:text-primary">{config.email}</a></li>
              {config.openingHours.map((h, i) => (
                <li key={i} className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{h.days}: {h.time}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {config.businessName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-primary">Privacy Policy</Link>
            <span>Catalog for enquiry only — prices on request.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
