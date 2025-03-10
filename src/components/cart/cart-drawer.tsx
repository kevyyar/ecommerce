import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import useCartStore from "../../store/cart-store";

type CartDrawerProps = {
  onClose: () => void;
};

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { cart, updateQuantity } = useCartStore();

  // if (isLoading) return <p>Loading cart...</p>;

  return (
    <motion.div
      className="fixed top-0 right-0 w-96 h-full bg-white p-8 shadow-lg z-50"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Cart</h2>
        <button onClick={onClose} className="p-2  cursor-pointer">
          <X />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {cart.some((item) => item.quantity > 0) ? (
          cart
            .filter((item) => item.quantity > 0)
            .map((item) => (
              <div key={item.product.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-gray-600 flex gap-2 items-center">
                    Quantity: {item.quantity}
                    <span className="flex gap-2 items-center">
                      <button
                        className="p-1 bg-black text-white rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        className={`p-1 ${
                          item.quantity <= 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black cursor-pointer hover:bg-gray-800"
                        } text-white rounded-md transition-colors`}
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 0}
                      >
                        <Minus size={14} />
                      </button>
                    </span>
                  </p>
                  <p className="font-bold">
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        )}
      </div>
    </motion.div>
  );
}
