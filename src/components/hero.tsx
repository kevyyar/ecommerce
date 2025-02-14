export default function Hero() {
  return (
    <div className="h-screen w-full bg-gray-200 p-8 md:p-16 lg:p-24">
      <div className="container mx-auto md:h-3/4 md:flex md:flex-row md:gap-8">
        <div className="flex flex-col items-center justify-center h-full md:w-1/2 md:items-start">
          <h1 className="text-4xl font-bold md:text-6xl md:leading-tight lg:text-7xl">
            Clothing Essentials
          </h1>
          <p className="text-gray-500 my-4 md:text-xl md:py-4 lg:text-2xl">
            Discover the latest stylish wardrobe with a curated collection
          </p>
          <button className="bg-black text-white px-4 py-2 rounded-md mb-6 cursor-pointer hover:bg-gray-800 transition-colors md:text-xl lg:text-2xl">
            Shop Now
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://placehold.co/600x400"
            alt="hero"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
