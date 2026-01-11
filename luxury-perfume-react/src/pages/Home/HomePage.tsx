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

export default function HomePage() {
    return (
        <div className="overflow-hidden">
            <Hero />
            <StorySection />
            <BestSellers />
            <CategoryGrid />
            <FeaturedProduct />
            <Ingredients />
            <PromoVideo />
            <Journey />
            <Reviews />
            <Newsletter />
        </div>
    );
}
