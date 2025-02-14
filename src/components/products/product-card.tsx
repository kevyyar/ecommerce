import { products } from "../../data/products";

export default function ProductCard() {
  return (
    <>
      {products.map((product) => (
        <article
          key={product.id}
          className="group relative h-96 overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
              <button className="bg-white text-black px-4 py-2 rounded-md mb-6 cursor-pointer hover:bg-gray-200 transition-colors md:text-xl lg:text-2xl">
                Add to cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
