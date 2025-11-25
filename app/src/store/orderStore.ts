import { create } from 'zustand';
import { fetchOrders, createOrderApi } from '../api/orderApi';

interface OrderState {
  orders: any[];
  fetch: () => Promise<void>;
  createOrder: (payload: any) => Promise<any>;
}

const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  fetch: async () => {
    const { data } = await fetchOrders();
    set({ orders: data });
  },
  createOrder: async (payload) => {
    const { data } = await createOrderApi(payload);
    await get().fetch();
    return data;
  }
}));

export default useOrderStore;
