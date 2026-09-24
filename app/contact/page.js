import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import EnquiryForm from '@/components/EnquiryForm';
import config, { WHATSAPP_GREEN } from '@/lib/config';
import { generalEnquiryUrl } from '@/lib/whatsapp';

export const metadata = {
  title: 'Contact Us',
  description: `Contact ${config.businessName} in Mangaluru by phone, WhatsApp or the enquiry form.`,
};

export default function ContactPage() {
  const phoneHref = `tel:${config.phone.replace(/\s/g, '')}`;
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">Get in Touch</h1>
        <p className="mt-2 text-sm text-muted-foreground">We’d love to help you find the right products.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-bold">Showroom Details</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{config.address.line1}, {config.address.line2}, {config.address.state}, {config.address.country}</span></li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><a href={phoneHref} className="hover:text-primary">{config.phone}</a></li>
              <li className="flex items-center gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" /><a href={`mailto:${config.email}`} className="hover:text-primary">{config.email}</a></li>
              {config.openingHours.map((h, i) => (
                <li key={i} className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{h.days}<br /><span className="text-muted-foreground">{h.time}</span></span></li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-2">
              <a href={generalEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg font-semibold text-white hover:brightness-95" style={{ backgroundColor: WHATSAPP_GREEN }}>
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border font-semibold hover:bg-secondary">
                <MapPin className="h-4 w-4 text-primary" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Send an Enquiry</h2>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">Fill in your details and we’ll get back to you.</p>
          <EnquiryForm variant="contact" />
        </div>
      </div>
    </div>
  );
}
