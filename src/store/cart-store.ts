import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";
import { GuestCart, initializeGuestCart } from "../lib/guest-utils";
import { Product } from "./products-store";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface Store {
  cart: CartItem[];
  cartItemCount: number;
  guestCart: GuestCart | null;
  isLoading: boolean;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  initializeCart: () => Promise<void>;
}

const useStore = create<Store>((set, get) => ({
  cart: [],
  cartItemCount: 0,
  guestCart: null,
  isLoading: false,

  initializeCart: async () => {
    set({ isLoading: true });
    try {
      // Initialize guest cart
      const guestCart = initializeGuestCart();
      set({ guestCart });

      // Get cart from Firebase using guest ID
      const cartRef = doc(db, "Carts", guestCart.guestId);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const data = cartSnap.data();
        set({
          cart: data.items || [],
          cartItemCount: getCartItemCount(data.items || []),
        });
      } else {
        // Create new cart document for guest
        await setDoc(cartRef, {
          items: [],
          updatedAt: Timestamp.now(),
          guestId: guestCart.guestId,
          createdAt: Timestamp.fromDate(guestCart.createdAt),
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (product) => {
    set({ isLoading: true });
    try {
      const state = get();
      if (!state.guestCart) throw new Error("Guest cart not initialized");

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
      const cartRef = doc(db, "Carts", state.guestCart.guestId);
      await updateDoc(cartRef, {
        items: newCart,
        updatedAt: Timestamp.now(),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  removeFromCart: async (productId) => {
    set({ isLoading: true });
    try {
      const state = get();
      if (!state.guestCart) throw new Error("Guest cart not initialized");

      const newCart = state.cart.filter(
        (item) => +item.product.id !== +productId
      );

      // Update local state
      set({
        cart: newCart,
        cartItemCount: getCartItemCount(newCart),
      });

      // Update Firebase
      const cartRef = doc(db, "Carts", state.guestCart.guestId);
      await updateDoc(cartRef, {
        items: newCart,
        updatedAt: Timestamp.now(),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: async () => {
    set({ isLoading: true });
    try {
      const state = get();
      if (!state.guestCart) throw new Error("Guest cart not initialized");

      // Update local state
      set({ cart: [], cartItemCount: 0 });

      // Update Firebase
      const cartRef = doc(db, "Carts", state.guestCart.guestId);
      await updateDoc(cartRef, {
        items: [],
        updatedAt: Timestamp.now(),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    set({ isLoading: true });
    try {
      const state = get();
      if (!state.guestCart) throw new Error("Guest cart not initialized");
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
      const cartRef = doc(db, "Carts", state.guestCart.guestId);
      await updateDoc(cartRef, {
        items: newCart,
        updatedAt: Timestamp.now(),
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

const getCartItemCount = (cart: CartItem[]) => {
  return cart.filter((item) => item.quantity > 0).length;
};

export default useStore;
