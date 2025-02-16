import { PlusCircle } from "lucide-react";
import { useEffect } from "react";
import useStore from "../../store/cart-store";
import useProductStore from "../../store/products-store";

export default function ProductCard() {
  const addToCart = useStore((state) => state.addToCart);
  const { products, getAllProducts, isLoading } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  if (isLoading) return <p>Loading products...</p>;

  return (
    <>
      {products.map((product) => (
        <article
          key={product.id}
          className="group relative overflow-hidden rounded-lg shadow-lg"
        >
          <div className="relative h-96">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute right-4 top-4 opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100">
              <button
                className="rounded-full bg-white p-2 shadow-lg cursor-pointer hover:bg-gray-100"
                onClick={() => addToCart(product)}
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="mt-1 text-lg">${product.price}</p>
          </div>
        </article>
      ))}
    </>
  );
}
