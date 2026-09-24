'use client';

import { usePathname } from 'next/navigation';

// Hides the storefront header/footer on the embedded Sanity Studio (/studio)
// so the CMS gets the full viewport. Header/Footer are server components
// passed in as props from the root layout.
export default function SiteChrome({ header, footer, sticky, toaster, children }) {
  const pathname = usePathname() || '';
  const isStudio = pathname.startsWith('/studio');

  if (isStudio) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      {header}
      <main className="min-h-[60vh]">{children}</main>
      {footer}
      {sticky}
      {toaster}
    </>
  );
}
