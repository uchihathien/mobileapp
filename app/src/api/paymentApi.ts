import apiClient from './apiClient';

export const createPaymentApi = (orderId: number) => apiClient.post('/payment/create', { orderId });
