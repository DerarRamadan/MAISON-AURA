import { useState, useMemo } from 'react';
import { Search, Eye, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOrderStore, type Order } from '../../store/useOrderStore';
import OrderModal from './components/OrderModal';

export default function AdminOrders() {
    const { t } = useTranslation();
    const { orders, updateOrderStatus } = useOrderStore();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.id.toString().includes(searchQuery);
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [orders, searchQuery, statusFilter]);

    const handleStatusUpdate = (id: number, status: Order['status']) => {
        updateOrderStatus(id, status);
        // Also update local selected order if it's the one being modified
        if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder({ ...selectedOrder, status });
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-black-rich">{t('admin.orders_page.title')}</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('admin.orders_page.search_placeholder')}
                        className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-gold bg-white cursor-pointer"
                    >
                        <option value="all">{t('admin.orders_page.status.all')}</option>
                        <option value="processing">{t('admin.orders_page.status.processing')}</option>
                        <option value="shipped">{t('admin.orders_page.status.shipped')}</option>
                        <option value="delivered">{t('admin.orders_page.status.delivered')}</option>
                        <option value="cancelled">{t('admin.orders_page.status.cancelled')}</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.orders_page.table.order_id')}</th>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.orders_page.table.customer')}</th>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.orders_page.table.date')}</th>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.orders_page.table.total')}</th>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.orders_page.table.status')}</th>
                                <th className="px-6 py-4 font-bold text-gray-600">{t('admin.orders_page.table.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        لا توجد طلبات
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-black-rich">#{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-xs uppercase">
                                                    {order.customerName.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-700">{order.customerName}</span>
                                                    <span className="text-xs text-gray-400">{order.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                        <td className="px-6 py-4 font-bold text-black-rich">{order.total} {t('common.currency')}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'processing' ? 'bg-yellow-50 text-yellow-600' :
                                                order.status === 'shipped' ? 'bg-blue-50 text-blue-600' :
                                                    order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                                                        'bg-red-50 text-red-600'
                                                }`}>
                                                {t(`admin.orders_page.status.${order.status}`)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gold transition-colors"
                                                title="عرض التفاصيل"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Modal */}
            <OrderModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onUpdateStatus={handleStatusUpdate}
            />
        </div>
    );
}
