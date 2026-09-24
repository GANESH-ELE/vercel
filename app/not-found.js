import Link from 'next/link';
import { Home, Search, PackageX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <PackageX className="h-8 w-8 text-primary" />
      </div>
      <h1 className="mt-6 text-4xl font-extrabold text-foreground">404</h1>
      <p className="mt-2 text-lg font-semibold text-foreground">Page not found</p>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        The page you are looking for doesn’t exist or may have been moved. Try browsing our products instead.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:brightness-95">
          <Home className="h-4 w-4" /> Go Home
        </Link>
        <Link href="/products" className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold hover:bg-secondary">
          <Search className="h-4 w-4" /> Browse Products
        </Link>
      </div>
    </div>
  );
}
