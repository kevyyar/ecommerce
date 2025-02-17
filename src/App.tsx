import { useEffect } from "react";
import Hero from "./components/hero";
import FeaturedProduct from "./components/products/featured-product";
import useStore from "./store/cart-store";

function App() {
  const initializeCart = useStore((state) => state.initializeCart);

  useEffect(() => {
    initializeCart();
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedProduct />
    </div>
  );
}

export default App;
