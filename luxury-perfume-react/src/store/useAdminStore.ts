import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
    id: string;
    name: string;
    username: string;
    phone: string;
    password: string; // In a real app, this should be hashed. Here we store it for the prompt's simplicity.
    role: 'admin' | 'editor';
    createdAt: string;
}

interface AdminState {
    admins: AdminUser[];
    addAdmin: (admin: Omit<AdminUser, 'id' | 'createdAt'>) => void;
    updateAdmin: (id: string, updates: Partial<AdminUser>) => void;
    removeAdmin: (id: string) => void;
    getAdminByCredentials: (usernameOrPhone: string, password: string) => AdminUser | undefined;
}

const initialAdmins: AdminUser[] = [
    {
        id: '1',
        name: 'Admin',
        username: 'admin',
        phone: '1234567890',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
    }
];

export const useAdminStore = create<AdminState>()(
    persist(
        (set, get) => ({
            admins: initialAdmins,
            addAdmin: (admin) => set((state) => ({
                admins: [...state.admins, {
                    ...admin,
                    id: Math.random().toString(36).substr(2, 9),
                    createdAt: new Date().toISOString()
                }]
            })),
            updateAdmin: (id, updates) => set((state) => ({
                admins: state.admins.map((admin) =>
                    admin.id === id ? { ...admin, ...updates } : admin
                )
            })),
            removeAdmin: (id) => set((state) => ({
                admins: state.admins.filter((admin) => admin.id !== id)
            })),
            getAdminByCredentials: (usernameOrPhone, password) => {
                const state = get();
                return state.admins.find(
                    (admin) =>
                        (admin.username === usernameOrPhone || admin.phone === usernameOrPhone) &&
                        admin.password === password
                );
            }
        }),
        {
            name: 'admin-storage',
        }
    )
);
