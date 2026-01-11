import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/images/hero-bg.png';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const { t } = useTranslation();

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <header ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <img src={heroBg} alt="Hero Perfume" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-black/30"></div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center text-white mix-blend-difference px-4">
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-lg tracking-[0.3em] mb-4 font-sans font-light"
                >
                    {t('hero.tagline')}
                </motion.p>
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-serif mb-8 leading-tight"
                >
                    {t('hero.title_line1')}<br />
                    <span className="text-gold italic">{t('hero.title_line2')}</span>
                </motion.h1>
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                >
                    <Link
                        to="/shop"
                        className="inline-block border border-white px-10 py-3 text-base font-bold tracking-wide hover:bg-white hover:text-black transition-all"
                    >
                        {t('hero.cta')}
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}
