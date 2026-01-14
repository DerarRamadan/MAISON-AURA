import Hero from './Hero';
import StorySection from './StorySection';
import BestSellers from './BestSellers';
import CategoryGrid from './CategoryGrid';
import FeaturedProduct from './FeaturedProduct';
import Ingredients from './Ingredients';
import PromoVideo from './PromoVideo';
import Journey from './Journey';
import Reviews from './Reviews';
import Newsletter from './Newsletter';

// الصفحة الرئيسية (Landing Page)
// تقوم بتجميع وعرض جميع أقسام الصفحة الرئيسية
export default function HomePage() {
    return (
        <div className="overflow-hidden">
            <Hero />              {/* القسم الرئيسي (البانر) */}
            <StorySection />      {/* قسم القصة (About Us) */}
            <BestSellers />       {/* قسم المنتجات الأكثر مبيعًا */}
            <CategoryGrid />      {/* شبكة التصنيفات */}
            <FeaturedProduct />   {/* منتج مميز */}
            <Ingredients />       {/* مكونات العطور */}
            <PromoVideo />        {/* فيديو ترويجي */}
            <Journey />           {/* رحلة العطر */}
            <Reviews />           {/* آراء العملاء */}
            <Newsletter />        {/* القائمة البريدية */}
        </div>
    );
}
