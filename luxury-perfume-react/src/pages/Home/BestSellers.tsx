import { Link } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import { useProductStore } from '../../store/useProductStore';
import { useTranslation } from 'react-i18next';

export default function BestSellers() {
    const products = useProductStore(state => state.products);
    const featuredProducts = products.slice(0, 3);
    const { t } = useTranslation();

    return (
        <section className="py-24 px-6 md:px-12 bg-white overflow-hidden" id="collections">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <h2 className="text-4xl font-serif mb-4 md:mb-0">{t('home_sections.best_sellers.title')}</h2>
                <Link to="/shop" className="text-sm underline underline-offset-4 text-gold font-bold">
                    {t('home_sections.best_sellers.view_all')}
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-4 md:px-0">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
