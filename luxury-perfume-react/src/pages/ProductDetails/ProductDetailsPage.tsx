import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Star, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import ProductCard from '../../components/product/ProductCard';
import { useTranslation } from 'react-i18next';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { t } = useTranslation();

    // Convert id to number since params are strings
    const productId = Number(id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif mb-4">{t('product.not_found')}</h1>
                <button onClick={() => navigate('/shop')} className="text-gold underline">{t('product.back_to_shop')}</button>
            </div>
        );
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="pt-32 pb-16 px-6 md:px-12 container mx-auto">
            {/* Breadcrumb / Back */}
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gold mb-8 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>{t('product.back')}</span>
            </button>

            <div className="flex flex-col md:flex-row gap-12 mb-24">
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-square bg-gray-50 rounded-lg overflow-hidden group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-sm font-bold text-gold tracking-widest uppercase mb-2">{product.brand}</h2>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">{product.name}</h1>

                    <div className="flex items-center gap-2 mb-6 text-gold">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                        </div>
                        <span className="text-gray-400 text-sm">(45 {t('product.reviews_count')})</span>
                    </div>

                    <p className="text-2xl font-bold mb-8">{product.price} {t('common.currency')}</p>

                    <p className="text-gray-600 leading-loose mb-8 text-lg">
                        {product.description || t('product.default_description')}
                    </p>

                    <div className="flex gap-4 mb-12">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-black-rich text-white py-4 font-bold hover:bg-gold transition-colors flex items-center justify-center gap-2 text-lg"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {t('product.add_to_cart')}
                        </button>
                    </div>

                    <div className="space-y-4 border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-4 text-gray-600">
                            <Truck className="w-6 h-6 text-gold" />
                            <span>{t('product.free_shipping')}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                            <ShieldCheck className="w-6 h-6 text-gold" />
                            <span>{t('product.authentic')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related */}
            {relatedProducts.length > 0 && (
                <div className="border-t border-gray-100 pt-16">
                    <h2 className="text-3xl font-serif font-bold mb-12 text-center">{t('product.you_might_like')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
