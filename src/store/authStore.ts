import { create } from 'zustand';
import type { AuthState } from '../types';

const VALID_CREDENTIALS = {
  'ABC': '123',
  'XYZ': '123'
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (uid: string, password: string) => {
    if (VALID_CREDENTIALS[uid as keyof typeof VALID_CREDENTIALS] === password) {
      set({ user: { id: crypto.randomUUID(), uid } });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: async () => {
    set({ user: null });
  }
}));