import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const logout = useAuthStore(state => state.logout);

    const sidebarLinks = [
        { name: t('admin.dashboard'), path: '/admin', icon: LayoutDashboard },
        { name: t('admin.products'), path: '/admin/products', icon: Package },
        { name: t('admin.orders'), path: '/admin/orders', icon: ShoppingCart },
        { name: t('admin.users'), path: '/admin/users', icon: Users },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 pt-[72px]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-l border-gray-200 hidden md:flex flex-col fixed h-[calc(100vh-72px)] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xl font-serif font-bold text-black-rich mb-6">{t('admin.menu')}</h2>
                    <nav className="space-y-2">
                        {sidebarLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
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
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:mr-64 p-8 overflow-y-auto bg-gray-50 min-h-[calc(100vh-72px)]">
                <Outlet />
            </main>
        </div>
    );
}
