import axios from 'axios';
import { BASE_URL } from '../config/env';
import useAuthStore from '../store/authStore';

const apiClient = axios.create({ baseURL: BASE_URL });

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
