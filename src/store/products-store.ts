import { collection, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductStore {
  products: Product[];
  isLoading: boolean;
  getAllProducts: () => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  getAllProducts: async () => {
    set({ isLoading: true });
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));

      set({ products, isLoading: false });
    } catch (error) {
      console.error("Error loading products", error);
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;
