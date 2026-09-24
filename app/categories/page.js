import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryCard from '@/components/CategoryCard';
import { getAllCategories } from '@/lib/data';

export const metadata = {
  title: 'Product Categories',
  description: 'Browse all product categories — plumbing, sanitaryware, bathroom fittings, electrical, paints, tanks, lights, fans and more.',
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Categories' }]} />
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">Shop by Category</h1>
        <p className="mt-2 text-sm text-muted-foreground">Find exactly what your project needs.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (<CategoryCard key={c.id} category={c} />))}
      </div>
    </div>
  );
}
