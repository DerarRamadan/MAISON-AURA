import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import catFloral from '../../assets/images/cat-floral.webp';
import catWoody from '../../assets/images/cat-woody.webp';
import catOriental from '../../assets/images/cat-oriental.webp';
import catFresh from '../../assets/images/cat-fresh.webp';
import { useTranslation } from 'react-i18next';

export default function CategoryGrid() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const categories = [
        { name: t('home_sections.category_grid.categories.floral.name'), desc: t('home_sections.category_grid.categories.floral.desc'), img: catFloral, filter: "زهرية" },
        { name: t('home_sections.category_grid.categories.woody.name'), desc: t('home_sections.category_grid.categories.woody.desc'), img: catWoody, filter: "خشبية" },
        { name: t('home_sections.category_grid.categories.oriental.name'), desc: t('home_sections.category_grid.categories.oriental.desc'), img: catOriental, filter: "شرقية" },
        { name: t('home_sections.category_grid.categories.fresh.name'), desc: t('home_sections.category_grid.categories.fresh.desc'), img: catFresh, filter: "منعشة" },
    ];

    return (
        <section className="py-32 bg-black-rich text-cream relative" id="collections">
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl font-serif mb-4 text-gold">{t('home_sections.category_grid.title')}</h2>
                <p className="text-white/60 text-lg">{t('home_sections.category_grid.subtitle')}</p>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => navigate(`/shop?category=${cat.filter}`)}
                            className="group text-center cursor-pointer"
                        >
                            <div className="aspect-square rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500 mb-6 mx-auto w-32 md:w-40 h-32 md:h-40 overflow-hidden relative">
                                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" alt={cat.name} />
                                <span className="font-serif text-2xl relative z-10 text-white drop-shadow-md">{cat.name}</span>
                            </div>
                            <span className="block text-sm text-gray-400 group-hover:text-gold transition-colors">{cat.desc}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
