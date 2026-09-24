import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

export default function ProductGrid({ products = [], emptyProps }) {
  if (!products || products.length === 0) {
    return <EmptyState {...emptyProps} />;
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
