import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useMobileWindow from "../hooks/use-mobile-window";
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
];

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isMobile = useMobileWindow();

  const handleMenuOpen = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav className="flex justify-between items-center py-8 px-12 text-xl">
      <Link to={"/"} className="font-bold">
        {"Storez & Co."}
      </Link>
      <div className="flex gap-8">
        {isMobile ? (
          <AnimatePresence mode="wait">
            {isMobileNavOpen ? (
              <motion.div
                key="drawer"
                className="fixed top-0 left-0 w-full h-full bg-yellow-500 p-8"
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
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    <Link key={link.path} to={link.path}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : (
              <MobileNav onClick={handleMenuOpen} />
            )}
          </AnimatePresence>
        ) : (
          <div className="flex gap-8">
            {links.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
