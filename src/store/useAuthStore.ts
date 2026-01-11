import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; name: string; username: string; role: string; phone: string } | null;
    login: (user: { id: string; name: string; username: string; role: string; phone: string }) => boolean;
    logout: () => void;
    updateUser: (updates: Partial<{ id: string; name: string; username: string; role: string; phone: string }>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (user: { id: string; name: string; username: string; role: string; phone: string }) => {
                set({ isAuthenticated: true, user });
                return true;
            },
            logout: () => set({ isAuthenticated: false, user: null }),
            updateUser: (updates) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null
            })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
