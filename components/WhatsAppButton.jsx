'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WHATSAPP_GREEN } from '@/lib/config';

// Reusable WhatsApp enquiry link button (opens wa.me deep link)
export default function WhatsAppButton({
  href,
  children = 'Enquire on WhatsApp',
  className,
  size = 'default',
  variant = 'solid',
}) {
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    default: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';
  const styles =
    variant === 'outline'
      ? 'border-2 bg-white hover:bg-emerald-50'
      : 'text-white hover:brightness-95';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, sizes[size], styles, className)}
      style={
        variant === 'outline'
          ? { color: WHATSAPP_GREEN, borderColor: WHATSAPP_GREEN, '--tw-ring-color': WHATSAPP_GREEN }
          : { backgroundColor: WHATSAPP_GREEN, '--tw-ring-color': WHATSAPP_GREEN }
      }
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </a>
  );
}
