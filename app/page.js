import Link from 'next/link';
import { ArrowRight, ShieldCheck, Lightbulb, Boxes, Store, MessageCircle, MapPin, Phone, Clock, FileText } from 'lucide-react';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import BrandCard from '@/components/BrandCard';
import ProductCarousel from '@/components/ProductCarousel';
import config, { WHATSAPP_GREEN } from '@/lib/config';
import { generalEnquiryUrl } from '@/lib/whatsapp';
import {
  getAllCategories, getAllBrands, getFeaturedProducts, getNewArrivals,
  getPopularProducts, getProductsByCategory,
} from '@/lib/data';

const WHY = [
  { icon: ShieldCheck, title: 'Genuine Products', desc: 'Only authentic products from trusted, well-known brands.' },
  { icon: Lightbulb, title: 'Helpful Guidance', desc: 'Friendly advice to help you pick the right product.' },
  { icon: Boxes, title: 'Wide Product Range', desc: 'From plumbing to paints — everything under one roof.' },
  { icon: Store, title: 'Local Showroom', desc: 'Visit us to see products in person before you decide.' },
  { icon: MessageCircle, title: 'WhatsApp Enquiries', desc: 'Quick answers on price and availability via WhatsApp.' },
  { icon: MapPin, title: 'Mangaluru-Based', desc: 'Proudly serving Mangaluru and surrounding areas.' },
];

export default function HomePage() {
  const categories = getAllCategories();
  const brands = getAllBrands();
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const popular = getPopularProducts();
  const projects = [
    ...getProductsByCategory('bathroom-fittings'),
    ...getProductsByCategory('sanitaryware'),
  ].slice(0, 8);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">Shop by Category</h2>
            <p className="mt-2 text-sm text-muted-foreground">Explore our full range of building and home materials</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (<CategoryCard key={c.id} category={c} />))}
          </div>
        </div>
      </section>

      <div className="bg-secondary/30">
        <ProductCarousel title="Featured Products" subtitle="Hand-picked favourites from our showroom" products={featured} viewAllHref="/products" />
      </div>

      <ProductCarousel title="New Arrivals" subtitle="Just added to our catalog" products={newArrivals} viewAllHref="/products?sort=newest" />

      <div className="bg-secondary/30">
        <ProductCarousel title="Popular Products" subtitle="What customers are enquiring about" products={popular} viewAllHref="/products?sort=popular" />
      </div>

      <ProductCarousel title="Bathroom Project Collection" subtitle="Everything to complete a modern bathroom" products={projects} viewAllHref="/categories/bathroom-fittings" />

      {/* Brands */}
      <section className="bg-secondary/30 py-12">
        <div className="container">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">Popular Brands</h2>
              <p className="mt-2 text-sm text-muted-foreground">Authentic products from names you trust</p>
            </div>
            <Link href="/brands" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">All brands</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {brands.map((b) => (<BrandCard key={b.id} brand={b} />))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">Why Choose Us</h2>
            <p className="mt-2 text-sm text-muted-foreground">A showroom experience built on trust and service</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <w.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-foreground">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-6">
        <div className="container">
          <div className="overflow-hidden rounded-2xl bg-primary">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
              <div className="text-white">
                <h2 className="text-2xl font-extrabold sm:text-3xl">Have a project in mind?</h2>
                <p className="mt-3 text-white/85">Talk to us for the right products at the right price. Visit our showroom or send an enquiry — we’re happy to help.</p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3"><Phone className="h-5 w-5" /> {config.phone}</li>
                  <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5" /> {config.address.line1}, {config.address.line2}, {config.address.state}</li>
                  {config.openingHours.map((h, i) => (
                    <li key={i} className="flex items-center gap-3"><Clock className="h-5 w-5" /> {h.days}: {h.time}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <a href={generalEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg font-bold text-white hover:brightness-95" style={{ backgroundColor: WHATSAPP_GREEN }}>
                  <MessageCircle className="h-5 w-5" /> Enquire on WhatsApp
                </a>
                <a href={`tel:${config.phone.replace(/\s/g, '')}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white font-bold text-primary hover:bg-white/90">
                  <Phone className="h-5 w-5" /> Call the Showroom
                </a>
                <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-white/60 font-bold text-white hover:bg-white/10">
                  <MapPin className="h-5 w-5" /> Open in Google Maps
                </a>
                <Link href="/request-quote" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-white/60 font-bold text-white hover:bg-white/10">
                  <FileText className="h-5 w-5" /> Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
