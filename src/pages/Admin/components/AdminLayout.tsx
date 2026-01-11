import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';
import AdminHeader from './AdminHeader';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const logout = useAuthStore((state: any) => state.logout);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sidebarLinks = [
        { name: t('admin.dashboard'), path: '/admin', icon: LayoutDashboard },
        { name: t('admin.products'), path: '/admin/products', icon: Package },
        { name: t('admin.orders'), path: '/admin/orders', icon: ShoppingCart },
        { name: t('admin.users'), path: '/admin/users', icon: Users },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 md:pt-6 pt-20">
                <h2 className="text-xl font-serif font-bold text-black-rich mb-6 hidden md:block">{t('admin.menu')}</h2>
                <nav className="space-y-2">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                    isActive
                                        ? "bg-black-rich text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-black-rich"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-bold">{link.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-gray-100">
                <button
                    onClick={() => {
                        logout();
                        navigate('/admin/login');
                    }}
                    className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full px-4 py-3 rounded-lg transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold">{t('admin.logout')}</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

            <div className="flex flex-1 pt-[72px]">
                {/* Desktop Sidebar */}
                <aside className="w-64 bg-white border-l border-r border-gray-200 hidden md:flex flex-col fixed h-[calc(100vh-72px)] overflow-y-auto z-20">
                    <SidebarContent />
                </aside>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            />
                            <motion.aside
                                initial={{ x: i18n.language === 'ar' ? '100%' : '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: i18n.language === 'ar' ? '100%' : '-100%' }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className={cn(
                                    "fixed top-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl md:hidden",
                                    i18n.language === 'ar' ? "right-0" : "left-0"
                                )}
                            >
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full text-gray-500"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="h-full overflow-y-auto">
                                    <SidebarContent />
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 md:ltr:ml-64 md:rtl:mr-64 p-4 md:p-8 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
