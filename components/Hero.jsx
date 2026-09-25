import Link from 'next/link';
import { ArrowRight, MapPin, FileText } from 'lucide-react';
import config from '@/lib/config';

export default function Hero() {
  const heroImg =
    'https://images.pexels.com/photos/12340557/pexels-photo-12340557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  return (
    <section className="relative overflow-hidden bg-primary">
      <img src={heroImg} alt="Building materials showroom" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70" />
      <div className="container relative py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25">
            <MapPin className="h-3.5 w-3.5" /> Brahmavara’s trusted electricals & building materials Outlet
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Everything for your home &amp; construction, all in one place
          </h1>
          <p className="mt-4 text-base text-white/85 sm:text-lg">
            Browse plumbing, sanitaryware, electrical, paints, tanks, tools and more from trusted brands.
            See something you like? Enquire instantly on WhatsApp for price and availability.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-primary shadow-sm transition hover:bg-white/90"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-lg border-2 border-white/60 px-6 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" /> Visit Us
            </a>
            <Link
              href="/request-quote"
              className="inline-flex h-12 items-center gap-2 rounded-lg border-2 border-white/60 px-6 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <FileText className="h-4 w-4" /> Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
