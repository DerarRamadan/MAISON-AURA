import { Play } from 'lucide-react';
import promoBg from '../../assets/images/promo-bg.webp';
import { useTranslation } from 'react-i18next';

export default function PromoVideo() {
    const { t } = useTranslation();

    return (
        <section className="h-[70vh] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black">
                <img src={promoBg} className="w-full h-full object-cover opacity-60" alt="Promo Video Background" />
            </div>
            <div className="relative z-10 text-center text-white">
                <h2 className="text-5xl md:text-7xl font-serif mb-8">{t('home_sections.promo.title')}</h2>
                <button className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all mx-auto group">
                    <Play className="w-8 h-8 fill-current group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </section>
    );
}
