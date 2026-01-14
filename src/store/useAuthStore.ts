import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean; // هل المستخدم مسجل دخوله أم لا
    user: { id: string; name: string; username: string; role: string; phone: string } | null; // بيانات المستخدم الحالي
    // دوال التحكم في حالة الجلسة
    login: (user: { id: string; name: string; username: string; role: string; phone: string }) => boolean;
    logout: () => void;
    updateUser: (updates: Partial<{ id: string; name: string; username: string; role: string; phone: string }>) => void;
}

// إنشاء مخزن المصادقة (Authentication Store)
export const useAuthStore = create<AuthState>()(
    // حفظ حالة تسجيل الدخول في LocalStorage
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
            name: 'auth-storage', // اسم التخزين
        }
    )
);
