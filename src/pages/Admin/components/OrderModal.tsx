import { X, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Order } from '../../../store/useOrderStore';

interface OrderModalProps {
    order: Order | null;
    onClose: () => void;
    onUpdateStatus: (id: number, status: Order['status']) => void;
}

// نافذة تفاصيل الطلب (Order Modal)
export default function OrderModal({ order, onClose, onUpdateStatus }: OrderModalProps) {
    const { t } = useTranslation();

    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-serif font-bold text-black-rich">
                        {t('admin.orders_page.details_title')} #{order.id}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Status & Date */}
                    <div className="flex flex-wrap gap-4 justify-between items-center bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-5 h-5 text-gold" />
                            <span>{order.date}</span>
                        </div>
                        <select
                            value={order.status}
                            onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                            className={`px-4 py-2 rounded-lg font-bold border-none outline-none cursor-pointer ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                        'bg-red-100 text-red-700'
                                }`}
                        >
                            <option value="processing">{t('admin.orders_page.status.processing')}</option>
                            <option value="shipped">{t('admin.orders_page.status.shipped')}</option>
                            <option value="delivered">{t('admin.orders_page.status.delivered')}</option>
                            <option value="cancelled">{t('admin.orders_page.status.cancelled')}</option>
                        </select>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg border-b border-gray-100 pb-2">{t('admin.orders_page.customer_info')}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-black-rich/5 flex items-center justify-center font-bold text-black-rich">
                                        {order.customerName.charAt(0)}
                                    </div>
                                    <span className="font-medium text-black-rich">{order.customerName}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="w-4 h-4 text-gold" />
                                    <a href={`mailto:${order.email}`} className="hover:text-gold transition-colors block">{order.email}</a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Phone className="w-4 h-4 text-gold" />
                                    <a href={`tel:${order.phone}`} className="hover:text-gold transition-colors block">{order.phone || 'N/A'}</a>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg border-b border-gray-100 pb-2">{t('checkout.delivery_details')}</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 text-gray-600">
                                    <MapPin className="w-4 h-4 text-gold mt-1" />
                                    <span>{order.city} - {order.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="font-bold text-lg border-b border-gray-100 pb-4 mb-4">{t('admin.orders_page.items')}</h3>
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex gap-4 items-center bg-white border border-gray-100 p-3 rounded-xl">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-black-rich">{item.name}</h4>
                                        <p className="text-sm text-gray-500">
                                            {item.quantity} x {item.price} {t('common.currency')}
                                        </p>
                                    </div>
                                    <div className="font-bold text-gold">
                                        {item.price * item.quantity} {t('common.currency')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center text-xl font-bold pt-6 border-t border-gray-100">
                        <span>{t('admin.orders_page.total_amount')}</span>
                        <span className="text-gold">{order.total} {t('common.currency')}</span>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="w-full bg-black-rich text-white py-3 rounded-xl font-bold hover:bg-gold transition-colors"
                    >
                        {t('common.close')}
                    </button>
                </div>
            </div>
        </div>
    );
}
