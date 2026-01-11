import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import storyBg from '../../assets/images/story-bg.webp';
import { useTranslation } from 'react-i18next';

export default function StorySection() {
    const { t } = useTranslation();

    return (
        <section className="min-h-screen flex flex-col md:flex-row" id="about">
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-cream z-10 order-2 md:order-1">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-serif mb-8 leading-tight text-gold">{t('home_sections.story.title_line1')}<br />{t('home_sections.story.title_line2')}</h2>
                    <p className="text-gray-600 leading-loose mb-8 text-lg font-light">
                        {t('home_sections.story.text')}
                    </p>
                    <Link to="/#about" className="text-black font-bold border-b border-gold pb-1 w-max hover:text-gold transition-colors">
                        {t('home_sections.story.cta')}
                    </Link>
                </motion.div>
            </div>
            <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative order-1 md:order-2">
                <img src={storyBg} className="w-full h-full object-cover" alt="Perfume Making" />
            </div>
        </section>
    );
}
