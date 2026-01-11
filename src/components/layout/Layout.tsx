import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { pathname, hash } = useLocation();

    // Scroll to top on route change or to hash section
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
