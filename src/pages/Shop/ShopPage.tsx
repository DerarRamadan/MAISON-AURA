import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import ShopFilters from './ShopFilters';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../../store/useProductStore';

export default function ShopPage() {
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();
    const products = useProductStore(state => state.products);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState(2000);
    const [sortOption, setSortOption] = useState('default');

    const CATEGORIES = [
        { name: 'زهرية', label: t('shop.categories.floral') },
        { name: 'خشبية', label: t('shop.categories.woody') },
        { name: 'شرقية', label: t('shop.categories.oriental') },
        { name: 'منعشة', label: t('shop.categories.fresh') },
    ];

    // Initialize from URL
    useEffect(() => {
        const catParam = searchParams.get('category');
        if (catParam) {
            setSelectedCategories([catParam]);
        }
        const searchParam = searchParams.get('search');
        // Search logic could be added here if we had a text search, for now we just filter
        if (searchParam && searchParam === 'santal') {
            // Show all or specific logic
        }
    }, [searchParams]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const filteredProducts = useMemo(() => {
        let result = products;

        // Filter by Category
        if (selectedCategories.length > 0) {
            result = result.filter(p => p.category && selectedCategories.includes(p.category));
        }

        // Filter by Price
        result = result.filter(p => p.price <= priceRange);

        // Sort
        if (sortOption === 'price-asc') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [selectedCategories, priceRange, sortOption]);

    return (
        <div className="pt-24 px-6 md:px-12 flex flex-col md:flex-row min-h-screen">
            <ShopFilters
                categories={CATEGORIES}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                minPrice={0}
                maxPriceLimit={2000}
            />

            <main className="flex-1 pb-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif font-bold">{t('shop.title')}</h1>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="bg-transparent border-b border-gray-300 text-sm outline-none pb-1 font-sans cursor-pointer hover:border-gold transition-colors"
                    >
                        <option value="default">{t('shop.sort.label')}: {t('shop.sort.featured')}</option>
                        <option value="price-asc">{t('shop.sort.price_asc')}</option>
                        <option value="price-desc">{t('shop.sort.price_desc')}</option>
                    </select>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl mb-4">{t('shop.empty')}</p>
                        <button
                            onClick={() => { setSelectedCategories([]); setPriceRange(2000); }}
                            className="text-gold font-bold hover:underline"
                        >
                            {t('shop.reset_btn')}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
