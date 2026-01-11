import { useState, useEffect } from 'react';
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

    // specific paths that should have transparent header with hero image
    const isHeroPage = location.pathname === '/' || location.pathname === '/#collections';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update document direction based on language
    useEffect(() => {
        const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.dir = dir;
        document.documentElement.dir = dir;
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
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
            // Logic: 
            // 1. If scrolled or mobile menu open -> specific background (cream/90)
            // 2. If NOT scrolled and IS hero page -> transparent
            // 3. If NOT scrolled and NOT hero page -> black background (for visibility)
            (scrolled || mobileMenuOpen)
                ? "bg-cream/90 backdrop-blur border-gray-100 shadow-sm"
                : isHeroPage
                    ? "bg-transparent border-transparent"
                    : "bg-black border-transparent"
        )}>
            {/* Logo */}
            <NavLink to="/" className={cn(
                "text-2xl font-serif font-bold tracking-wider hover:text-gold transition-colors",
                // Text color logic
                (scrolled || mobileMenuOpen) ? "text-black-rich" : "text-white"
            )}>
                MAISON AURA
            </NavLink>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 rtl:space-x-reverse text-sm font-bold tracking-wide">
                {links.map(link => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => cn(
                            "hover:text-gold transition-colors relative group",
                            (isActive && link.path !== '/')
                                ? "text-gold"
                                : ((scrolled || mobileMenuOpen) ? "text-black-rich" : "text-white")
                        )}
                    >
                        {link.name}
                        <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
                    </NavLink>
                ))}
            </div>

            {/* Actions */}
            <div className={cn(
                "flex items-center space-x-6 rtl:space-x-reverse",
                (scrolled || mobileMenuOpen) ? "text-black-rich" : "text-white"
            )}>
                {/* Language Switcher */}
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

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden hover:text-gold"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 w-full bg-cream border-b border-gray-100 overflow-hidden md:hidden shadow-lg"
                    >
                        <div className="flex flex-col p-6 space-y-4 text-center">
                            {links.map(link => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-bold hover:text-gold transition-colors text-black-rich" // Force text color in mobile menu content
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
