import { PackageSearch } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmptyState({
  title = 'No products found',
  description = 'Try adjusting your search or filters.',
  actionLabel,
  actionHref,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <PackageSearch className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && actionHref && (
        <Button asChild className="mt-5">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
