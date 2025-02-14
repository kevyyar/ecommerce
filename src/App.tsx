import FeaturedProduct from "./components/featured-product";
import Hero from "./components/hero";

function App() {
  return (
    <div className="p-8 md:p-16 lg:p-24">
      <Hero />
      <FeaturedProduct />
    </div>
  );
}

export default App;
