import Link from 'next/link';
import { ShieldCheck, Boxes, HeartHandshake, MapPin, MessageCircle, FileText } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import config, { WHATSAPP_GREEN } from '@/lib/config';
import { generalEnquiryUrl } from '@/lib/whatsapp';

export const metadata = {
  title: 'About Us',
  description: `Learn about ${config.businessName}, a trusted electrical, plumbing and building materials Retailer in Brahmavara, Karnataka.`,
};

const VALUES = [
  { icon: ShieldCheck, title: 'Authenticity', desc: 'We stock only genuine products from established, reliable brands.' },
  { icon: Boxes, title: 'Complete Range', desc: 'A single destination for plumbing, electrical, sanitaryware, paints and more.' },
  { icon: HeartHandshake, title: 'Personal Service', desc: 'Honest guidance so you buy exactly what your project needs.' },
];

export default function AboutPage() {
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">About {config.businessName}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {config.businessName} is a trusted electrical, plumbing and building materials based in {config.city}. For years we have
          helped homeowners, builders, plumbers, electricians and contractors find the right products for their projects
          — all under one roof. From the first pipe to the final coat of paint, we’re here to make sourcing materials simple.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          This website is our digital showroom. Browse our catalog, explore categories and brands, and when something
          catches your eye, send us a quick WhatsApp message or call the showroom for price and availability. There’s no
          online checkout — just friendly, direct service the way a local showroom should be.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-card p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary"><v.icon className="h-5 w-5" /></span>
              <h3 className="mt-3 font-bold text-foreground">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-primary p-8 text-white">
          <h2 className="text-xl font-extrabold">Visit our shop in Brahmavara</h2>
          <p className="mt-2 text-white/85">{config.address.line1}, {config.address.line2}, {config.address.state}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={generalEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-bold text-white hover:brightness-95" style={{ backgroundColor: WHATSAPP_GREEN }}>
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-primary hover:bg-white/90">
              <MapPin className="h-4 w-4" /> Google Maps
            </a>
            <Link href="/request-quote" className="inline-flex h-11 items-center gap-2 rounded-lg border-2 border-white/60 px-5 text-sm font-bold text-white hover:bg-white/10">
              <FileText className="h-4 w-4" /> Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
