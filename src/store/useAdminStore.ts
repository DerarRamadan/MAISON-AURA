import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// تعريف واجهة بيانات المسؤول (Admin Interface)
export interface AdminUser {
    id: string; // المعرف الفريد
    name: string; // الاسم
    username: string; // اسم المستخدم
    phone: string; // رقم الهاتف
    password: string; // كلمة المرور (في تطبيق حقيقي يجب أن تكون مشفرة)
    role: 'admin' | 'editor'; // الدور: مسؤول أو محرر
    createdAt: string; // تاريخ الإنشاء
}

// تعريف واجهة حالة المتجر (Store State Interface)
interface AdminState {
    admins: AdminUser[]; // قائمة المسؤولين
    addAdmin: (admin: Omit<AdminUser, 'id' | 'createdAt'>) => void; // إضافة مسؤول جديد
    updateAdmin: (id: string, updates: Partial<AdminUser>) => void; // تحديث بيانات مسؤول
    removeAdmin: (id: string) => void; // حذف مسؤول
    getAdminByCredentials: (usernameOrPhone: string, password: string) => AdminUser | undefined; // التحقق من بيانات الدخول
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

// إنشاء مخزن حالة المسؤولين باستخدام Zustand
export const useAdminStore = create<AdminState>()(
    // استخدام middleware 'persist' لحفظ البيانات في LocalStorage
    persist(
        (set, get) => ({
            admins: initialAdmins,
            // دالة إضافة مسؤول جديد
            addAdmin: (admin) => set((state) => ({
                admins: [...state.admins, {
                    ...admin,
                    id: Math.random().toString(36).substr(2, 9), // توليد معرف عشوائي بسيط
                    createdAt: new Date().toISOString()
                }]
            })),
            // دالة تحديث بيانات مسؤول
            updateAdmin: (id, updates) => set((state) => ({
                admins: state.admins.map((admin) =>
                    admin.id === id ? { ...admin, ...updates } : admin
                )
            })),
            // دالة حذف مسؤول
            removeAdmin: (id) => set((state) => ({
                admins: state.admins.filter((admin) => admin.id !== id)
            })),
            // دالة البحث عن مسئول للمصادقة
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
            name: 'admin-storage', // اسم المفتاح في LocalStorage
        }
    )
);
