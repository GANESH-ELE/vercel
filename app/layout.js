import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWhatsApp from '@/components/StickyWhatsApp';
import { Toaster } from '@/components/ui/sonner';
import config from '@/lib/config';

const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${config.businessName} | Building & Home Materials Showroom in Mangaluru`,
    template: `%s | ${config.businessName}`,
  },
  description:
    'Browse plumbing, pipes & fittings, sanitaryware, bathroom fittings, electrical, hardware, Berger Paints, water tanks, lights & fans and tools. Enquire on WhatsApp for price and availability.',
  keywords: [
    'building materials Mangaluru', 'plumbing', 'sanitaryware', 'bathroom fittings',
    'electrical', 'Berger Paints', 'water tanks', 'hardware', 'pipes and fittings',
  ],
  openGraph: {
    type: 'website',
    title: `${config.businessName} | Building & Home Materials Showroom`,
    description: 'Your complete building & home materials showroom in Mangaluru. Enquire on WhatsApp.',
    siteName: config.businessName,
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HardwareStore',
  name: config.businessName,
  description: config.tagline,
  telephone: config.phone,
  email: config.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${config.address.line1}, ${config.address.line2}`,
    addressLocality: 'Mangaluru',
    addressRegion: 'Karnataka',
    postalCode: '575001',
    addressCountry: 'IN',
  },
  areaServed: 'Mangaluru, Karnataka',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <StickyWhatsApp />
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
