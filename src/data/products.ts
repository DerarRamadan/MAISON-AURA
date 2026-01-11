export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
}

// Helper to resolve images from src/assets/images
const getImg = (filename: string) => {
    return new URL(`../assets/images/${filename}`, import.meta.url).href;
}

export const products: Product[] = [
    { id: 1, name: "أمواج أوبوس السادس عشر", brand: "أمواج", price: 1850, image: getImg("prod-opus.webp"), category: "منعشة", description: "عطر فاخر يجسد الفخامة والرقي." },
    { id: 2, name: "لطافة خمرا", brand: "لطافة", price: 195, image: getImg("prod-khamrah.webp"), category: "شرقية", description: "رائحة دافئة وجذابة تعكس التراث الشرقي." },
    { id: 3, name: "مزيج القرشي", brand: "عبد الصمد القرشي", price: 1100, image: getImg("prod-qurashi.webp"), category: "شرقية", description: "توليفة فريدة من أجود أنواع العود والعنبر." },
    { id: 4, name: "باكارات روج 540", brand: "ميزون فرانسيس", price: 1600, image: getImg("prod-baccarat.webp"), category: "زهرية", description: "كريستال عطري يفوح بالأناقة والتميّز." },
    { id: 5, name: "لطافة يارا", brand: "لطافة", price: 155, image: getImg("prod-yara.webp"), category: "زهرية", description: "نعومة ولطف يغمر حواسك." },
    { id: 6, name: "بن شيخ", brand: "أحمد المغربي", price: 450, image: getImg("prod-binshaikh.webp"), category: "خشبية", description: "قوة وثبات يعكس شخصية القائد." },
    { id: 7, name: "مسك الخمائل", brand: "نخبة العود", price: 260, image: getImg("prod-musk.webp"), category: "شرقية", description: "مسك فاخر بلمسة عصرية." },
    { id: 8, name: "الماجد - ريتاج", brand: "الماجد", price: 235, image: getImg("prod-retaj.webp"), category: "منعشة", description: "انتعاش يدوم طوال اليوم." }
];
