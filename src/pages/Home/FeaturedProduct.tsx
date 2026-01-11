import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../../store/useProductStore';
import featSantal from '../../assets/images/feat-santal.webp';

export default function FeaturedProduct() {
    const { t } = useTranslation();
    const product = useProductStore(state => state.products.find(p => p.id === 6));

    if (!product) return null;

    return (
        <section className="py-24 bg-cream">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 order-2 md:order-1"
                    >
                        <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden shadow-2xl">
                            <img src={featSantal} className="w-full h-full object-cover" alt={t('home_sections.featured.title')} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 order-1 md:order-2 px-8 text-right"
                    >
                        <span className="text-gold uppercase tracking-widest text-sm font-bold block mb-4">{t('home_sections.featured.new_arrival')}</span>
                        <h2 className="text-5xl font-serif mb-6">{t('home_sections.featured.title')}</h2>
                        <p className="text-gray-600 mb-8 leading-loose text-lg">
                            {t('home_sections.featured.description')}
                        </p>
                        <Link
                            to="/shop?search=santal"
                            className="px-10 py-4 bg-black-rich text-white font-bold hover:bg-gold transition-colors inline-block"
                        >
                            {t('home_sections.featured.shop_now')}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
