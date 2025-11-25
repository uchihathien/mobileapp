import { create } from 'zustand';
import { loginApi, registerApi, googleLoginApi } from '../api/authApi';

type AuthState = {
  token: string | null;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: async (email, password) => {
    const { data } = await loginApi({ email, password });
    set({ token: data.token, user: data.user });
  },
  register: async (name, email, password) => {
    const { data } = await registerApi({ name, email, password });
    set({ token: data.token, user: data.user });
  },
  googleLogin: async (token) => {
    const { data } = await googleLoginApi(token);
    set({ token: data.token, user: data.user });
  },
  logout: () => set({ token: null, user: null })
}));

export default useAuthStore;
