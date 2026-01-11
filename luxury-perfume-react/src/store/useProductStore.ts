import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts, type Product } from '../data/products';

interface ProductState {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: number, product: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
    getProduct: (id: number) => Product | undefined;
}

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
