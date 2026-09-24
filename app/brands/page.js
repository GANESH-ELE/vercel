import Breadcrumbs from '@/components/Breadcrumbs';
import BrandCard from '@/components/BrandCard';
import { getAllBrands } from '@/lib/data';

export const metadata = {
  title: 'Brands',
  description: 'Explore authentic products from trusted brands including Berger, Finolex, Astral, Cera, Jaquar, Havells, Sintex, Crompton and Bosch.',
};

export default function BrandsPage() {
  const brands = getAllBrands();
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Brands' }]} />
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">Our Brands</h1>
        <p className="mt-2 text-sm text-muted-foreground">Authentic products from names you trust.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => (<BrandCard key={b.id} brand={b} />))}
      </div>
    </div>
  );
}
