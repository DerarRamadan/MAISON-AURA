import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const { setIsCartOpen, cartCount } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    // تحديد الصفحات التي يكون فيها الهيدر شفافًا (مثل الصفحة الرئيسية وصفحة المجموعات)
    const isHeroPage = location.pathname === '/' || location.pathname === '/#collections';

    useEffect(() => {
        // تغيير خلفية الهيدر عند التمرير لأسفل
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    // دالة تبديل اللغة
    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    };

    // التحقق مما إذا كان الرابط نشطًا حاليًا (يدعم الروابط الداخلية #)
    const isLinkActive = (path: string) => {
        if (path === '/') return location.pathname === '/' && location.hash === '';
        if (path.startsWith('/#')) return location.pathname === '/' && location.hash === path.substring(1);
        return location.pathname === path;
    };

    const links = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.shop'), path: '/shop' },
        { name: t('nav.collections'), path: '/#collections' },
        { name: t('nav.story'), path: '/#about' },
    ];

    return (
        <nav className={cn(
            "fixed w-full z-40 transition-all duration-300 px-6 py-4 flex justify-between items-center border-b",
            // تحديد نمط الهيدر بناءً على الحالة (Scrolled) وموقع الصفحة (Hero Page)
            // 1. إذا تم التمرير أو كانت القائمة مفتوحة -> خلفية كريمية
            // 2. إذا كنا في أعلى صفحة Hero -> شفاف
            // 3. غير ذلك -> خلفية سوداء
            (scrolled || mobileMenuOpen)
                ? "bg-cream/90 backdrop-blur border-gray-100 shadow-sm"
                : isHeroPage
                    ? "bg-transparent border-transparent"
                    : "bg-black border-transparent"
        )}>
            {/* الشعار (Logo) */}
            <NavLink to="/" className={cn(
                "text-2xl font-serif font-bold tracking-wider hover:text-gold transition-colors",
                // منطق لون النص بناءً على الحالة
                (scrolled || mobileMenuOpen) ? "text-black-rich" : "text-white"
            )}>
                MAISON AURA
            </NavLink>

            {/* روابط سطح المكتب (Desktop Links) */}
            <div className="hidden md:flex space-x-8 rtl:space-x-reverse text-sm font-bold tracking-wide">
                {links.map(link => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={() => cn(
                            "hover:text-gold transition-colors relative group",
                            isLinkActive(link.path)
                                ? "text-gold"
                                : ((scrolled || mobileMenuOpen) ? "text-black-rich" : "text-white")
                        )}
                    >
                        {link.name}
                        <span className={cn(
                            "absolute -bottom-1 right-0 h-0.5 bg-gold transition-all duration-300",
                            isLinkActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                        )} />
                    </NavLink>
                ))}
            </div>

            {/* الأزرار والإجراءات (Actions) */}
            <div className={cn(
                "flex items-center space-x-6 rtl:space-x-reverse",
                (scrolled || mobileMenuOpen) ? "text-black-rich" : "text-white"
            )}>
                {/* مبدل اللغة (Language Switcher) */}
                <button onClick={toggleLanguage} className="hover:text-gold transition-colors flex items-center gap-1 font-sans font-bold text-xs uppercase">
                    <Globe className="w-4 h-4" />
                    {i18n.language === 'ar' ? 'EN' : 'AR'}
                </button>

                <button className="hover:text-gold transition-colors hidden sm:block">
                    <Search className="w-5 h-5" />
                </button>

                <button
                    onClick={() => setIsCartOpen(true)}
                    className="hover:text-gold relative transition-colors"
                >
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                            {cartCount}
                        </span>
                    )}
                </button>

                <button
                    className="md:hidden hover:text-gold p-1"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* القائمة الجانبية للجوال (Mobile Menu Drawer) */}
            {createPortal(
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            {/* طبقة التعتيم الخلفية (Overlay) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/60 z-[9998] md:hidden backdrop-blur-sm"
                            />

                            {/* القائمة الجانبية (Drawer) */}
                            <motion.div
                                initial={{ x: i18n.language === 'ar' ? '100%' : '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: i18n.language === 'ar' ? '100%' : '-100%' }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={cn(
                                    "fixed top-0 bottom-0 z-[9999] w-full max-w-[320px] bg-cream shadow-2xl md:hidden overflow-hidden flex flex-col",
                                    i18n.language === 'ar' ? "right-0" : "left-0"
                                )}
                            >
                                {/* رأس القائمة (Drawer Header) */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                    <span className="text-xl font-serif font-bold text-black-rich">MAISON AURA</span>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black-rich"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* محتوى القائمة (Drawer Content) */}
                                <div className="flex flex-col p-8 space-y-6 overflow-y-auto">
                                    {links.map(link => {
                                        const active = isLinkActive(link.path);
                                        return (
                                            <NavLink
                                                key={link.path}
                                                to={link.path}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={cn(
                                                    "text-2xl font-serif font-bold transition-colors flex items-center justify-between group",
                                                    active ? "text-gold" : "text-black-rich hover:text-gold"
                                                )}
                                            >
                                                {link.name}
                                                <span className={cn(
                                                    "w-2 h-2 rounded-full bg-gold opacity-0 transition-opacity",
                                                    active && "opacity-100"
                                                )} />
                                            </NavLink>
                                        );
                                    })}

                                    <div className="h-px bg-gray-100 w-full my-4" />

                                    {/* إجراءات الجوال (Mobile Actions) */}
                                    <div className="space-y-4">
                                        <button
                                            onClick={() => {
                                                toggleLanguage();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="flex items-center gap-3 text-lg font-sans font-bold text-black-rich hover:text-gold transition-colors"
                                        >
                                            <Globe className="w-5 h-5" />
                                            <span>{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
                , document.body
            )}
        </nav>
    );
}
