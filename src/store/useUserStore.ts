import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// واجهة بيانات المستخدم (العميل)
export interface User {
    id: number;
    name: string;
    email: string;
    memberSince: string; // تاريخ الانضمام
    orderCount: number; // عدد الطلبات
    totalSpent: number; // إجمالي المصروفات
}

interface UserState {
    users: User[];
    addUser: (user: Omit<User, 'id'>) => void;
}

const initialUsers: User[] = [
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', memberSince: '2024-01-10', orderCount: 3, totalSpent: 3500 },
    { id: 2, name: 'سارة خالد', email: 'sara@example.com', memberSince: '2024-02-15', orderCount: 1, totalSpent: 850 },
];

// إنشاء مخزن المستخدمين
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            users: initialUsers,
            addUser: (user) => set((state) => ({
                users: [...state.users, { ...user, id: state.users.length + 1 }]
            })),
        }),
        {
            name: 'user-storage',
        }
    )
);
