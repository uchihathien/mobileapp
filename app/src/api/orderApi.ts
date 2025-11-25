import apiClient from './apiClient';

export const fetchOrders = () => apiClient.get('/orders');
export const createOrderApi = (data: any) => apiClient.post('/orders', data);
