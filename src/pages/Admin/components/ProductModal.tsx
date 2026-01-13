import React, { useState, useEffect } from 'react';
import { X, Upload, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../../data/products';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: any) => void;
    product?: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
    const { t } = useTranslation();
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        brand: '',
        price: 0,
        image: '',
        category: 'oriental',
        description: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                category: product.category || 'oriental',
                description: product.description || '',
            });
        } else {
            setFormData({
                name: '',
                brand: '',
                price: 0,
                image: '',
                category: 'oriental',
                description: '',
            });
        }
    }, [product, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const categories = [
        { value: 'floral', label: 'shop.categories.floral' },
        { value: 'woody', label: 'shop.categories.woody' },
        { value: 'oriental', label: 'shop.categories.oriental' },
        { value: 'fresh', label: 'shop.categories.fresh' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-serif font-bold text-black-rich">
                        {product ? 'تعديل منتج' : 'إضافة منتج جديد'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">اسم المنتج</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">العلامة التجارية</label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">السعر</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">الفئة</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none flex justify-between items-center bg-white text-right"
                                >
                                    <span className="text-gray-700">
                                        {categories.find(c => c.value === formData.category)?.label
                                            ? t(categories.find(c => c.value === formData.category)!.label)
                                            : formData.category}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isCategoryOpen && (
                                    <>
                                        <div className="fixed inset-0 z-[55]" onClick={() => setIsCategoryOpen(false)} />
                                        <div className="absolute z-[60] w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl max-h-48 overflow-y-auto left-0">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, category: cat.value }));
                                                        setIsCategoryOpen(false);
                                                    }}
                                                    className={`w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0
                                                        ${formData.category === cat.value ? 'bg-gold/5 text-gold font-bold' : 'text-gray-700'}
                                                    `}
                                                >
                                                    <span className="flex-1">{t(cat.label)}</span>
                                                    {formData.category === cat.value && (
                                                        <div className="w-2 h-2 rounded-full bg-gold" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">الوصف</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gold outline-none h-24"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">صورة المنتج</label>
                        <div className="flex items-center gap-4">
                            {formData.image && (
                                <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                            )}
                            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-gold transition-colors cursor-pointer">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">اضغط لرفع صورة</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-black-rich text-white rounded-lg hover:bg-gold transition-colors font-bold"
                        >
                            حفظ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
