import { motion } from 'framer-motion';
import ingRose from '../../assets/images/ing-rose.webp';
import ingOud from '../../assets/images/ing-oud.webp';
import ingVanilla from '../../assets/images/ing-vanilla.webp';
import { useTranslation } from 'react-i18next';

// قسم مكونات العطور (Ingredients)
// يعرض المكونات الأساسية للعطور مع تأثيرات وتنسيق شبكي
export default function Ingredients() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-white/50">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif">{t('home_sections.ingredients.title')}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 h-96">
                {/* المكون الأول: الورد */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group overflow-hidden h-full col-span-2 md:col-span-1"
                >
                    <img src={ingRose} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Rose" />
                    <div className="absolute bottom-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
                        <h3 className="font-serif text-xl">{t('home_sections.ingredients.rose')}</h3>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative group overflow-hidden h-full md:col-span-2"
                >
                    <img src={ingOud} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Oud" />
                    <div className="absolute bottom-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
                        <h3 className="font-serif text-xl">{t('home_sections.ingredients.oud')}</h3>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative group overflow-hidden h-full col-span-2 md:col-span-1"
                >
                    <img src={ingVanilla} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Vanilla" />
                    <div className="absolute bottom-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
                        <h3 className="font-serif text-xl">{t('home_sections.ingredients.vanilla')}</h3>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
