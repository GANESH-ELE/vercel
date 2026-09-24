'use client';

import { MessageCircle } from 'lucide-react';
import { generalEnquiryUrl } from '@/lib/whatsapp';
import { WHATSAPP_GREEN } from '@/lib/config';

// Sticky floating WhatsApp button (mobile-first, visible on all screens)
export default function StickyWhatsApp() {
  return (
    <a
      href={generalEnquiryUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg shadow-emerald-600/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ backgroundColor: WHATSAPP_GREEN, '--tw-ring-color': WHATSAPP_GREEN }}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
