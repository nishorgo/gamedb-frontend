import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Install zustand/persist
import { mountStoreDevtool } from 'simple-zustand-devtools';
import AuthService from '../services/authService';

interface AuthState {
  username: string;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<any>;
  refresh: () => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  username: '',
  isAuthenticated: false,
  login: async () => {},
  refresh: async () => {},
  logout: () => {},
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      login: async (username: string, password: string) => {
        try {
          const data = await AuthService.setToken(username, password);
          set({ username: username, isAuthenticated: true });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      refresh: async () => {
        try {
          const data = await AuthService.refreshToken();
        } catch (error) {
          console.error('Refresh error:', error);
        }
      },
      logout: () => {
        AuthService.removeToken();
        set(() => ({ ...initialState, isAuthenticated: false }));
        localStorage.removeItem('auth-state');
      },
    }),
    {
      name: 'auth-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);


if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('AuthState', useAuthStore);
