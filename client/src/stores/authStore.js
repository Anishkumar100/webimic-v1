import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      // User is logged in by default for testing
      user: {
        id: 'usr_dev_test_01',
        name: 'Alex Morgan',
        email: 'alex@webimic.com',
        avatar: 'AM',
        plan: 'plus',
        createdAt: '2026-01-15T08:00:00Z',
      },
      token: 'wbm_tk_dev_test_token_abc123',
      isAuthenticated: true,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        await new Promise(r => setTimeout(r, 800));
        if (email && password.length >= 6) {
          const user = {
            id: 'usr_' + Math.random().toString(36).slice(2, 10),
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            email,
            avatar: email.slice(0, 2).toUpperCase(),
            plan: 'plus',
            createdAt: new Date().toISOString(),
          };
          set({ user, token: 'wbm_tk_' + Math.random().toString(36).slice(2), isAuthenticated: true, isLoading: false });
          return true;
        }
        set({ error: 'Invalid email or password', isLoading: false });
        return false;
      },

      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        await new Promise(r => setTimeout(r, 1000));
        if (name && email && password.length >= 8) {
          const user = {
            id: 'usr_' + Math.random().toString(36).slice(2, 10),
            name, email,
            avatar: name.slice(0, 2).toUpperCase(),
            plan: 'developer',
            createdAt: new Date().toISOString(),
          };
          set({ user, token: 'wbm_tk_' + Math.random().toString(36).slice(2), isAuthenticated: true, isLoading: false });
          return true;
        }
        set({ error: 'Please fill in all fields (password min 8 chars)', isLoading: false });
        return false;
      },

      logout: () => set({ user: null, token: null, isAuthenticated: false, error: null }),
      clearError: () => set({ error: null }),
    }),
    { name: 'webimic-auth' }
  )
);

export default useAuthStore;
