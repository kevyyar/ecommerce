import { create } from "zustand";
import { Product } from "../data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface Store {
  cart: CartItem[];
  cartItemCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const useStore = create<Store>((set) => ({
  cart: [],
  cartItemCount: 0,
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      const newCart = existingItem
        ? state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { product, quantity: 1 }];

      return {
        cart: newCart,
        cartItemCount: getCartItemCount(newCart),
      };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const newCart = state.cart.filter(
        (item) => +item.product.id !== +productId
      );
      return {
        cart: newCart,
        cartItemCount: getCartItemCount(newCart),
      };
    }),
  clearCart: () => set({ cart: [], cartItemCount: 0 }),
  updateQuantity: (productId: number, quantity: number) =>
    set((state) => {
      if (quantity < 0) return state;

      const newCart = state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );

      return {
        cart: newCart,
        cartItemCount: getCartItemCount(newCart),
      };
    }),
}));

const getCartItemCount = (cart: CartItem[]) => {
  return cart.filter((item) => item.quantity > 0).length;
};

export default useStore;
