import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useMobileWindow from "../../hooks/use-mobile-window";
import MobileNav from "./mobile-nav";

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Cart",
    path: "/cart",
    icon: <ShoppingCart />,
  },
];

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isMobile = useMobileWindow();

  const handleMenuOpen = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav className="bg-secondary flex justify-between items-center py-8 px-12 text-xl font-nav md:text-2xl">
      <Link to={"/"} className="font-bold">
        {"Storez & Co."}
      </Link>
      <div className="flex gap-8">
        {isMobile ? (
          <AnimatePresence mode="wait">
            {isMobileNavOpen ? (
              <motion.div
                key="drawer"
                className="fixed top-0 left-0 w-full h-full bg-gray-200 p-8 z-10"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25 }}
              >
                <div className="flex justify-end mb-8">
                  <button
                    onClick={handleMenuOpen}
                    className="p-2 cursor-pointer"
                  >
                    <X />
                  </button>
                </div>
                <div className="flex flex-col gap-4 w-fit">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button className="bg-black flex items-center gap-2 text-white px-4 py-2 rounded-md mb-6 cursor-pointer hover:bg-gray-800 transition-colors md:text-xl lg:text-2xl w-fit">
                    <ShoppingCart />
                    Cart
                  </button>
                </div>
              </motion.div>
            ) : (
              <MobileNav onClick={handleMenuOpen} />
            )}
          </AnimatePresence>
        ) : (
          <div className="flex gap-10">
            {links.map((link) => (
              <Link key={link.path} to={link.path}>
                <div className="flex items-center gap-2">
                  {link.icon && link.icon}
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
