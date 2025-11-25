import apiClient from './apiClient';

export const loginApi = (data: { email: string; password: string }) => apiClient.post('/auth/login', data);
export const registerApi = (data: { email: string; password: string; name: string }) => apiClient.post('/auth/register', data);
export const googleLoginApi = (token: string) => apiClient.post('/auth/google', { token });
