import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useOrderStore } from '../../store/useOrderStore';

// صفحة إتمام الطلب (Checkout)
export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const { addOrder, orders } = useOrderStore();
    const [orderId, setOrderId] = useState<number>(0);

    // حالة بيانات النموذج
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // التحقق من صحة رقم الهاتف (يجب أن يكون 9 أو 10 أرقام)
        const phoneRegex = /^[0-9]{9,10}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert(t('checkout.phone_error') || 'رقم الهاتف يجب أن يتكون من 9 أو 10 أرقام');
            setIsLoading(false);
            return;
        }

        // محاكاة الاتصال بالخادم
        await new Promise(resolve => setTimeout(resolve, 2000));

        // إنشاء معرف جديد للطلب
        const newId = Math.max(2000, ...orders.map(o => o.id)) + 1;

        // إضافة الطلب للمخزن
        addOrder({
            id: newId, // تمرير المعرف بشكل صريح
            customerName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            items: cart,
            total: total,
            status: 'processing',
            date: new Date().toISOString().split('T')[0],
            address: formData.address,
            city: formData.city,
            phone: formData.phone
        });

        setOrderId(newId);
        setIsLoading(false);
        setStep('success');
        clearCart();
    };

    if (step === 'success') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 text-green-600">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-serif font-bold mb-4">{t('checkout.success_title')}</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    {t('checkout.success_message')} #{orderId}
                </p>
                <Link to="/" className="bg-black-rich text-white px-8 py-3 font-bold hover:bg-gold transition-colors">
                    {t('checkout.back_home')}
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif mb-4">{t('cart.empty')}</h1>
                <Link to="/shop" className="text-gold underline">{t('cart.browse')}</Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-16 px-6 container mx-auto">
            <h1 className="text-4xl font-serif font-bold mb-12 text-center">{t('checkout.title')}</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* نموذج البيانات (Form) */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Truck className="text-gold" />
                            {t('checkout.delivery_details')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">{t('checkout.first_name')}</label>
                                <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-gold transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">{t('checkout.last_name')}</label>
                                <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-gold transition-colors" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2">{t('checkout.email')}</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-gold transition-colors" />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2">{t('checkout.address')}</label>
                            <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-gold transition-colors" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold mb-2">{t('checkout.city')}</label>
                                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-gold transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">{t('checkout.phone')}</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-gold transition-colors" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gold text-white py-4 font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? t('checkout.processing') : t('checkout.confirm')}
                        </button>
                    </form>
                </div>

                {/* ملخص الطلب (Order Summary) */}
                <div className="w-full lg:w-96 h-fit lg:sticky lg:top-24">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-serif font-bold text-xl mb-6">{t('checkout.order_summary')}</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 mb-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded bg-white" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">{item.name}</h4>
                                        <div className="flex justify-between mt-1 text-sm text-gray-500">
                                            <span>{t('checkout.quantity')}: {item.quantity}</span>
                                            <span className="text-gold font-bold">{item.price * item.quantity} {t('common.currency')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>{t('checkout.subtotal')}</span>
                                <span>{total} {t('common.currency')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('checkout.shipping')}</span>
                                <span className="text-green-600">{t('checkout.free')}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-200 mt-4">
                                <span>{t('checkout.total')}</span>
                                <span className="text-gold">{total} {t('common.currency')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
