import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
    id: number;
    customerName: string;
    email: string;
    items: any[];
    total: number;
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    phone?: string;
    address?: string;
    city?: string;
}

interface OrderState {
    orders: Order[];
    addOrder: (order: Order | Omit<Order, 'id'>) => void;
    updateOrderStatus: (id: number, status: Order['status']) => void;
}

// Mock initial orders
const initialOrders: Order[] = [
    { id: 2001, customerName: 'أحمد محمد', email: 'ahmed@example.com', items: [], total: 1250, status: 'processing', date: '2024-03-15' },
    { id: 2002, customerName: 'سارة خالد', email: 'sara@example.com', items: [], total: 850, status: 'shipped', date: '2024-03-14' },
];

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
