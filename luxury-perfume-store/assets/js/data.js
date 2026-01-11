/**
 * بيانات العطور - متجر ميزون أورا
 * تم تحديثها ببيانات حقيقية وصور عالية الجودة
 */

const products = [
    {
        id: 1,
        name: "أمواج أوبوس السادس عشر - تيمبر",
        brand: "أمواج",
        price: 1400,
        category: "عطور شرقية",
        image: "assets/images/prod-opus.png",
        description: "جزء من مجموعة المكتبة، يجمع بين نفحات التوابل الحارة مثل الفلفل الوردي وجوزة الطيب، مع قلب عطري من الأوسمانثوس واللبان، مما يمنحه عمقًا وشخصية فنية.",
        notes: ["فلفل وردي", "جوزة الطيب", "أوسمانثوس", "لبان"],
        isBestSeller: true,
        isNew: true
    },
    {
        id: 2,
        name: "لطافة خمرا",
        brand: "لطافة",
        price: 150,
        category: "عطور شرقية",
        image: "assets/images/prod-khamrah.png",
        description: "يتميز بنفحاته الدافئة والتوابل، مع مزيج من القرفة وجوزة الطيب في الافتتاحية، وقلب من البرالين والفانيليا، وقاعدة كريمية من التونكا وخشب الصندل.",
        notes: ["قرفة", "برالين", "فانيليا", "خشب الصندل"],
        isBestSeller: true,
        isNew: false
    },
    {
        id: 3,
        name: "مزيج القرشي",
        brand: "عبد الصمد القرشي",
        price: 850,
        category: "عود",
        image: "assets/images/prod-qurashi.png",
        description: "عطر عود فاخر يجسد العمق والرقي في تركيبة مميزة تعكس التراث العربي الأصيل.",
        notes: ["دهن العود", "عنبر", "مسك"],
        isBestSeller: false,
        isNew: false
    },
    {
        id: 4,
        name: "باكارات روج 540",
        brand: "ميزون فرانسيس",
        price: 1200,
        category: "عطور زهرية",
        image: "assets/images/prod-baccarat.png",
        description: "عطر فاخر يجسد الرقي والأناقة. يتميز بمزيج معقد من العنبر والنغمات الخشبية، بالإضافة إلى لمسات من الياسمين والزعفران.",
        notes: ["ياسمين", "زعفران", "عنبر", "خشب الأرز"],
        isBestSeller: true,
        isNew: false
    },
    {
        id: 5,
        name: "لطافة يارا",
        brand: "لطافة",
        price: 120,
        category: "عطور زهرية",
        image: "assets/images/prod-yara.png",
        description: "مزيج آسر من النغمات الاستوائية والغورماندية، ويقدم تجربة عطرية أنيقة وحسية، مع حلاوة رقيقة تناسب جميع الأوقات.",
        notes: ["أوركيد", "فانيليا", "فواكه استوائية"],
        isBestSeller: true,
        isNew: true
    },
    {
        id: 6,
        name: "بن شيخ",
        brand: "أحمد المغربي",
        price: 350,
        category: "عطور خشبية",
        image: "assets/images/prod-binshaikh.png",
        description: "عطر ذكوري فاخر يتميز بعبق العود الجريء الذي يمتزج بنعومة الزعفران، ليقدم تجربة عطرية متوازنة وأنيقة.",
        notes: ["عود", "زعفران", "باتشولي"],
        isBestSeller: false,
        isNew: true
    },
    {
        id: 7,
        name: "مسك الخمائل",
        brand: "نخبة العود",
        price: 200,
        category: "مسك",
        image: "assets/images/prod-musk.png",
        description: "رائحة النظافة والانتعاش مع لمسات بودرية ناعمة تدوم طويلاً.",
        notes: ["مسك أبيض", "بودرة", "ورد"],
        isBestSeller: false,
        isNew: false
    },
    {
        id: 8,
        name: "الماجد للعود - ريتاج",
        brand: "الماجد",
        price: 180,
        category: "عطور شرقية",
        image: "assets/images/prod-retaj.png",
        description: "تناغم مثالي بين العود والورد الطائفي، لعشاق الفخامة العربية التقليدية.",
        notes: ["عود", "ورد طائفي", "صندل"],
        isBestSeller: true,
        isNew: false
    }
];

// Initialize LocalStorage if empty or reset with new Arabic data
// Forcing reset to apply new Arabic data for this update
localStorage.setItem('products', JSON.stringify(products));

// Global accessor
window.perfumeStore = {
    getProducts: () => JSON.parse(localStorage.getItem('products')) || [],
    addProduct: (product) => {
        const current = JSON.parse(localStorage.getItem('products')) || [];
        product.id = Date.now();
        current.push(product);
        localStorage.setItem('products', JSON.stringify(current));
    },
    deleteProduct: (id) => {
        let current = JSON.parse(localStorage.getItem('products')) || [];
        current = current.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(current));
    },
    getProductById: (id) => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        return products.find(p => p.id == id);
    }
};
