import { create } from "zustand";
import { Product } from "../data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface Store {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useStore = create<Store>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, { product, quantity: 1 }],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => +item.product.id !== +productId),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useStore;
