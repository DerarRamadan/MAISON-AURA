import { useTranslation } from 'react-i18next';

interface ShopFiltersProps {
    categories: { name: string; label: string }[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    priceRange: number;
    onPriceChange: (price: number) => void;
    minPrice: number;
    maxPriceLimit: number;
}

export default function ShopFilters({
    categories,
    selectedCategories,
    onCategoryChange,
    priceRange,
    onPriceChange,
    minPrice,
    maxPriceLimit
}: ShopFiltersProps) {
    const { t } = useTranslation();

    return (
        <aside className="w-full md:w-64 ps-8 mb-8 md:mb-0 sticky top-24 h-fit">
            <h2 className="text-xl font-serif mb-6 font-bold">{t('shop.filters.title')}</h2>

            <div className="mb-8">
                <h3 className="text-sm font-bold mb-4 text-gold">{t('shop.filters.category')}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    {categories.map((cat) => (
                        <li key={cat.name}>
                            <label className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                                <input
                                    type="checkbox"
                                    className="accent-gold w-4 h-4"
                                    checked={selectedCategories.includes(cat.name)}
                                    onChange={() => onCategoryChange(cat.name)}
                                />
                                {cat.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <h3 className="text-sm font-bold mb-4 text-gold">{t('shop.filters.price')}</h3>
                <input
                    type="range"
                    min={minPrice}
                    max={maxPriceLimit}
                    value={priceRange}
                    onChange={(e) => onPriceChange(Number(e.target.value))}
                    className="w-full accent-gold h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-2 font-sans font-bold text-gray-500">
                    <span>{minPrice} {t('common.currency')}</span>
                    <span>{priceRange} {t('common.currency')}</span>
                    <span>{maxPriceLimit} {t('common.currency')}</span>
                </div>
            </div>
        </aside>
    );
}
