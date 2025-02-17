import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";
import { Product } from "./products-store";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface Store {
  cart: CartItem[];
  cartItemCount: number;
  cartId: string;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  initializeCart: () => Promise<void>;
}

const CART_ID = "default-cart"; // We'll use a fixed cart ID since we're not using auth

const useStore = create<Store>((set, get) => ({
  cart: [],
  cartItemCount: 0,
  cartId: CART_ID,

  initializeCart: async () => {
    const cartRef = doc(db, "Carts", CART_ID);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const data = cartSnap.data();
      set({
        cart: data.items || [],
        cartItemCount: getCartItemCount(data.items || []),
      });
    } else {
      await setDoc(cartRef, { items: [], updatedAt: Timestamp.now() });
    }
  },

  addToCart: async (product) => {
    const state = get();
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

    // Update local state
    set({
      cart: newCart,
      cartItemCount: getCartItemCount(newCart),
    });

    // Update Firebase
    const cartRef = doc(db, "Carts", CART_ID);
    await updateDoc(cartRef, {
      items: newCart,
      updatedAt: new Date(),
    });
  },

  removeFromCart: async (productId) => {
    const state = get();
    const newCart = state.cart.filter(
      (item) => +item.product.id !== +productId
    );

    // Update local state
    set({
      cart: newCart,
      cartItemCount: getCartItemCount(newCart),
    });

    // Update Firebase
    const cartRef = doc(db, "Carts", CART_ID);
    await updateDoc(cartRef, {
      items: newCart,
      updatedAt: Timestamp.now(),
    });
  },

  clearCart: async () => {
    // Update local state
    set({ cart: [], cartItemCount: 0 });

    // Update Firebase
    const cartRef = doc(db, "Carts", CART_ID);
    await updateDoc(cartRef, {
      items: [],
      updatedAt: Timestamp.now(),
    });
  },

  updateQuantity: async (productId: string, quantity: number) => {
    const state = get();
    if (quantity < 0) return;

    const newCart = state.cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );

    // Update local state
    set({
      cart: newCart,
      cartItemCount: getCartItemCount(newCart),
    });

    // Update Firebase
    const cartRef = doc(db, "Carts", CART_ID);
    await updateDoc(cartRef, {
      items: newCart,
      updatedAt: Timestamp.now(),
    });
  },
}));

const getCartItemCount = (cart: CartItem[]) => {
  return cart.filter((item) => item.quantity > 0).length;
};

export default useStore;
