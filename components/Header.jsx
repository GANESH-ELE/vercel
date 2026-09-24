'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, Store, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import SearchBar from './SearchBar';
import config, { WHATSAPP_GREEN } from '@/lib/config';
import { generalEnquiryUrl } from '@/lib/whatsapp';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Brands', href: '/brands' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const phoneHref = `tel:${config.phone.replace(/\s/g, '')}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-extrabold text-foreground sm:text-lg">{config.businessName}</span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">{config.city}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={phoneHref}
              className="hidden h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold text-foreground hover:bg-secondary sm:inline-flex"
            >
              <Phone className="h-4 w-4 text-primary" /> Call
            </a>
            <a
              href={generalEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-white hover:brightness-95 sm:inline-flex"
              style={{ backgroundColor: WHATSAPP_GREEN }}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <span className="text-lg font-extrabold">{config.businessName}</span>
                  <SheetClose asChild>
                    <button aria-label="Close menu" className="rounded-md p-1 hover:bg-secondary">
                      <X className="h-5 w-5" />
                    </button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col p-2">
                  {NAV.map((n) => (
                    <SheetClose asChild key={n.href}>
                      <Link
                        href={n.href}
                        className="rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary"
                      >
                        {n.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
                  <a href={phoneHref} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border font-semibold">
                    <Phone className="h-4 w-4 text-primary" /> {config.phone}
                  </a>
                  <a
                    href={generalEnquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg font-semibold text-white"
                    style={{ backgroundColor: WHATSAPP_GREEN }}
                  >
                    <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search row */}
        <div className="pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
