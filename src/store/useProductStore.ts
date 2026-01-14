import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts, type Product } from '../data/products';

// واجهة حالة المنتجات
interface ProductState {
    products: Product[]; // قائمة المنتجات
    addProduct: (product: Omit<Product, 'id'>) => void; // إضافة منتج
    updateProduct: (id: number, product: Partial<Product>) => void; // تحديث منتج
    deleteProduct: (id: number) => void; // حذف منتج
    getProduct: (id: number) => Product | undefined; // الحصول على منتج معين
}

// إنشاء مخزن المنتجات
export const useProductStore = create<ProductState>()(
    persist(
        (set, get) => ({
            products: initialProducts,
            addProduct: (product) => set((state) => ({
                products: [
                    ...state.products,
                    { ...product, id: Math.max(0, ...state.products.map(p => p.id)) + 1 }
                ]
            })),
            updateProduct: (id, updatedProduct) => set((state) => ({
                products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
            })),
            deleteProduct: (id) => set((state) => ({
                products: state.products.filter((p) => p.id !== id)
            })),
            getProduct: (id) => get().products.find((p) => p.id === id),
        }),
        {
            name: 'product-storage',
        }
    )
);
