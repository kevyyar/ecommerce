import ProductCard from "./product-card";

export default function FeaturedProduct() {
  return (
    <section className="w-full bg-gray-50">
      <div className="container mx-auto px-12 md:px-16 lg:px-24 py-24">
        <h1 className="text-center font-bold text-4xl md:text-6xl md:leading-tight lg:text-7xl">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <ProductCard />
        </div>
      </div>
    </section>
  );
}
