import { create } from 'zustand';
import apiClient from '../api/apiClient';

export type CartItem = { productId: number; quantity: number; product?: any; price?: number };

type CartState = {
  items: CartItem[];
  fetch: () => Promise<void>;
  add: (productId: number, quantity?: number) => Promise<void>;
  update: (productId: number, quantity: number) => Promise<void>;
  remove: (productId: number) => Promise<void>;
};

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  fetch: async () => {
    const { data } = await apiClient.get('/cart');
    set({ items: data });
  },
  add: async (productId, quantity = 1) => {
    await apiClient.post('/cart', { productId, quantity });
    await get().fetch();
  },
  update: async (productId, quantity) => {
    await apiClient.put(`/cart/${productId}`, { quantity });
    await get().fetch();
  },
  remove: async (productId) => {
    await apiClient.delete(`/cart/${productId}`);
    await get().fetch();
  }
}));

export default useCartStore;
