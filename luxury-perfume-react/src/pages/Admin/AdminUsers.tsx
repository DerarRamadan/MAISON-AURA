import { Search, Mail, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/useUserStore';

export default function AdminUsers() {
    const { t } = useTranslation();
    const users = useUserStore(state => state.users);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-black-rich">{t('admin.users_page.title')}</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={t('admin.users_page.search_placeholder')}
                        className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                    />
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div key={user.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-black-rich text-white flex items-center justify-center font-bold text-lg uppercase">
                                {user.name.substring(0, 2)}
                            </div>
                            <div>
                                <h3 className="font-bold text-black-rich">{user.name}</h3>
                                <p className="text-xs text-gray-500">{t('admin.users_page.member_since')} {user.memberSince}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Mail className="w-4 h-4 text-gold" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-gold" />
                                <span>{user.orderCount} {t('admin.users_page.orders')}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-gray-500 text-sm">{t('admin.users_page.total_spent')}</span>
                            <span className="font-bold text-black-rich">{user.totalSpent.toLocaleString()} {t('common.currency')}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
