import apiClient from './apiClient';

export const fetchCategories = () => apiClient.get('/categories');
export const fetchProducts = (params?: any) => apiClient.get('/products', { params });
export const fetchProduct = (id: number) => apiClient.get(`/products/${id}`);
