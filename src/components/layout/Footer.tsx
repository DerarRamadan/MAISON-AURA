import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        // تذييل الصفحة (Footer) يحتوي على روابط ومعلومات التواصل
        <footer className="bg-black-rich text-white py-16 px-6 border-t border-gold/20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-start">
                <div className="col-span-1 md:col-span-2 md:pe-12">
                    <h2 className="text-3xl font-serif mb-6 text-white">{t('hero.title')}</h2>
                    <p className="text-gray-400 text-sm max-w-sm leading-loose">
                        {t('footer.description')}
                    </p>
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-bold mb-6 text-gold uppercase tracking-wider">{t('footer.discover')}</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link to="/shop" className="hover:text-white transition-colors">{t('nav.collections')}</Link></li>
                        <li><Link to="/#about" className="hover:text-white transition-colors">{t('nav.story')}</Link></li>
                        <li><a href="#" className="hover:text-white transition-colors">{t('nav.shop')}</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-bold mb-6 text-gold uppercase tracking-wider">{t('footer.legal')}</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">{t('footer.shipping')}</a></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                <span>{t('footer.rights')}</span>
                <span className="text-gold/80 font-medium italic">{t('footer.graduation_project')}</span>
                <span>{t('footer.made_in')}</span>
            </div>
        </footer>
    );
}
