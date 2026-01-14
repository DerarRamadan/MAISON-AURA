import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../data/products';

// واجهة عنصر السلة (تضيف الكمية للمنتج)
export interface CartItem extends Product {
    quantity: number;
}

// واجهة السياق (Context)
interface CartContextType {
    cart: CartItem[]; // عناصر السلة
    addToCart: (product: Product) => void; // دالة إضافة للسلة
    removeFromCart: (productId: number) => void; // دالة حذف من السلة
    updateQuantity: (productId: number, delta: number) => void; // دالة تعديل الكمية
    clearCart: () => void; // إفراغ السلة
    total: number; // الإجمالي المالي
    cartCount: number; // عدد العناصر
    isCartOpen: boolean; // هل القائمة الجانبية للسلة مفتوحة؟
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// مزود السياق (Provider)
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // تحميل السلة من LocalStorage عند البدء
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    // حفظ السلة في LocalStorage عند أي تغيير
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, cartCount, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
