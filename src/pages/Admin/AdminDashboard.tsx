import { TrendingUp, ShoppingBag, Users as UsersIcon, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../../store/useProductStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useUserStore } from '../../store/useUserStore';

// لوحة التحكم الرئيسية للمسؤول (Dashboard)
// تعرض إحصائيات عامة، آخر الطلبات، والمنتجات الأكثر مبيعًا
export default function AdminDashboard() {
    const { t } = useTranslation();
    const products = useProductStore(state => state.products);
    const orders = useOrderStore(state => state.orders);
    const users = useUserStore(state => state.users);

    // حساب إجمالي المبيعات
    const totalSalesValue = orders.reduce((sum, order) => sum + order.total, 0);

    // إعداد بطاقات الإحصائيات
    const stats = [
        { title: t('admin.stats.total_sales'), value: `${totalSalesValue.toLocaleString()} ${t('common.currency')}`, icon: DollarSign, change: '+12%', color: 'from-green-500 to-emerald-600' },
        { title: t('admin.stats.new_orders'), value: orders.length.toString(), icon: ShoppingBag, change: '+5%', color: 'from-blue-500 to-indigo-600' },
        { title: t('admin.stats.new_customers'), value: users.length.toString(), icon: UsersIcon, change: '+18%', color: 'from-purple-500 to-violet-600' },
        { title: t('admin.stats.growth'), value: '24%', icon: TrendingUp, change: '+4%', color: 'from-orange-500 to-red-600' },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif font-bold text-black-rich">{t('admin.overview')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-transform hover:-translate-y-1 duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold mb-1">{stat.title}</h3>
                            <p className="text-2xl font-bold text-black-rich">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-serif font-bold mb-4">{t('admin.recent_orders')}</h2>
                    <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                        #{order.id}
                                    </div>
                                    <div>
                                        <p className="font-bold text-black-rich">{order.customerName}</p>
                                        <p className="text-sm text-gray-500">{order.date}</p>
                                    </div>
                                </div>
                                <span className="text-gold font-bold">{order.total} {t('common.currency')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-serif font-bold mb-4">{t('admin.popular_products')}</h2>
                    <div className="space-y-4">
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                    )}
                                    <div>
                                        <p className="font-bold text-black-rich">{product.name}</p>
                                        <p className="text-sm text-gray-500">{product.brand}</p>
                                    </div>
                                </div>
                                <span className="text-black-rich font-bold">{product.price} {t('common.currency')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
