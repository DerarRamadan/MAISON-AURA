import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// تعريف واجهة الطلب (Order Interface)
export interface Order {
    id: number; // رقم الطلب
    customerName: string; // اسم العميل
    email: string; // البريد الإلكتروني
    items: any[]; // المنتجات المطلوبة
    total: number; // الإجمالي
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled'; // حالة الطلب
    date: string; // تاريخ الطلب
    phone?: string; // رقم الهاتف
    address?: string; // العنوان
    city?: string; // المدينة
}

// واجهة حالة مخزن الطلبات
interface OrderState {
    orders: Order[];
    addOrder: (order: Order | Omit<Order, 'id'>) => void; // إضافة طلب
    updateOrderStatus: (id: number, status: Order['status']) => void; // تحديث حالة طلب
}

// Mock initial orders
const initialOrders: Order[] = [
    { id: 2001, customerName: 'أحمد محمد', email: 'ahmed@example.com', items: [], total: 1250, status: 'processing', date: '2024-03-15' },
    { id: 2002, customerName: 'سارة خالد', email: 'sara@example.com', items: [], total: 850, status: 'shipped', date: '2024-03-14' },
];

// إنشاء مخزن الطلبات
export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: initialOrders,
            addOrder: (order) => set((state) => {
                const newId = 'id' in order ? order.id : Math.max(2000, ...state.orders.map(o => o.id)) + 1;
                const newOrder = 'id' in order ? (order as Order) : { ...order, id: newId };
                return { orders: [newOrder, ...state.orders] };
            }),
            updateOrderStatus: (id, status) => set((state) => ({
                orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
            })),
        }),
        {
            name: 'order-storage',
        }
    )
);
