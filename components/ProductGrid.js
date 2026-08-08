import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <div className="py-24 text-center">
        <p className="label text-ash">No products found</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
