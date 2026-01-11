import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="group cursor-pointer bg-white p-3 shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-500 relative flex flex-col h-full"
        >
            <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-4 relative rounded-sm">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                        onClick={handleAddToCart}
                        className="bg-gold text-white px-6 py-2 font-bold text-sm hover:bg-black transition-colors flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {t('product.add_to_cart')}
                    </button>
                </div>
            </div>

            <div className="text-center mt-auto">
                <h3 className="font-serif text-lg font-bold mb-1 text-gray-900 group-hover:text-gold transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-3 font-sans font-medium">{product.brand}</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-gold font-bold text-lg">{product.price} {t('common.currency')}</span>
                </div>
            </div>
        </div>
    );
}
