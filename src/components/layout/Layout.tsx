import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { pathname, hash } = useLocation();

    // إعادة التمرير للأعلى عند تغيير المسار، أو التمرير للقسم المحدد (Hash)
    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return (
        // الهيكل العام للصفحة: Navbar في الأعلى، المحتوى في الوسط، Footer في الأسفل
        // بالإضافة للقائمة الجانبية للسلة
        <div className="min-h-screen flex flex-col font-sans text-black-rich bg-cream selection:bg-gold selection:text-white">
            <Navbar />
            <CartSidebar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
