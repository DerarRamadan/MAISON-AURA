import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CartSidebar() {
    const { cart, removeFromCart, updateQuantity, total, isCartOpen, setIsCartOpen } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* طبقة التعتيم الخلفية (Backdrop) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* القائمة الجانبية */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        // تحديد اتجاه القائمة الجانبية
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col ltr:right-0 rtl:left-0 rtl:right-auto"
                        style={{ right: document.dir === 'rtl' ? 'auto' : 0, left: document.dir === 'rtl' ? 0 : 'auto', transform: 'none' }}
                    >
                        {/* 
                           ملاحظة: نستخدم `fixed inset-y-0 right-0` لوضع القائمة على اليمين في الحالة الافتراضية.
                           في وضع RTL (العربية)، نريد القائمة على اليسار.
                           لذلك نستخدم منطق `document.dir` لتحديد الموضع الصحيح (right أو left) ديناميكيًا.
                        */}
                        <div className="h-full flex flex-col">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-cream">
                                <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                                    <ShoppingBag className="w-6 h-6 text-gold" />
                                    {t('cart.title')}
                                </h2>
                                <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                        <ShoppingBag className="w-16 h-16 opacity-20" />
                                        <p>{t('cart.empty')}</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="text-gold font-bold hover:underline"
                                        >
                                            {t('cart.browse')}
                                        </button>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-4 border-b border-gray-50 pb-6 last:border-none"
                                        >
                                            <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold font-serif text-gray-900">{item.name}</h3>
                                                    <p className="text-xs text-gray-500">{item.brand}</p>
                                                </div>
                                                <div className="flex justify-between items-end mt-2">
                                                    <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="p-1 hover:text-gold transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="p-1 hover:text-gold transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <span className="font-bold text-gold">{item.price * item.quantity} {t('common.currency')}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-300 hover:text-red-500 self-start transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 bg-gray-50 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-600">{t('cart.total')}</span>
                                        <span className="text-2xl font-bold font-serif text-gold">{total} {t('common.currency')}</span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-black-rich text-white py-4 font-bold hover:bg-gold transition-colors flex items-center justify-center gap-2 group"
                                    >
                                        {t('cart.checkout')}
                                        <ShoppingBag className="w-4 h-4 group-hover:animate-bounce" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
