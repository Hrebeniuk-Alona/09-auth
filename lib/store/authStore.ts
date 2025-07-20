

import { create } from 'zustand';
import { UserRes } from '@/types/user'; 

type AuthStore = {
  isAuthenticated: boolean;
  user: UserRes | null;
  setUser: (user: UserRes) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: UserRes) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
