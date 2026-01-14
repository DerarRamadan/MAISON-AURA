import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../../store/useProductStore';
import ProductModal from './components/ProductModal';
import type { Product } from '../../data/products';

// صفحة إدارة المنتجات (Admin Products)
// تعرض جدول المنتجات مع إمكانيات الإضافة، التعديل، والحذف
export default function AdminProducts() {
    const { t } = useTranslation();
    const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // حفظ المنتج (إضافة أو تعديل)
    const handleSave = (productData: Omit<Product, 'id'>) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
    };

    // فتح نافذة التعديل
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    // تصفية المنتجات حسب البحث
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-serif font-bold text-black-rich">{t('admin.products_page.title')}</h1>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-black-rich text-white px-6 py-2 rounded-lg hover:bg-gold transition-colors flex items-center gap-2 font-bold"
                >
                    <Plus className="w-5 h-5" />
                    <span>{t('admin.products_page.add_new')}</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={t('admin.products_page.search_placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.products_page.table.product')}</th>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.products_page.table.category')}</th>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.products_page.table.price')}</th>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.products_page.table.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                            )}
                                            <div>
                                                <p className="font-bold text-black-rich">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.brand}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {t(`shop.categories.${product.category}`)}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-black-rich">{product.price} {t('common.currency')}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                                                        deleteProduct(product.id);
                                                    }
                                                }}
                                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                product={editingProduct}
            />
        </div>
    );
}
