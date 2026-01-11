import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    user: { name: string; role: string } | null;
    login: (password: string) => boolean;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (password: string) => {
                // Mock admin login
                if (password === 'admin123') {
                    set({ isAuthenticated: true, user: { name: 'Admin', role: 'admin' } });
                    return true;
                }
                return false;
            },
            logout: () => set({ isAuthenticated: false, user: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
