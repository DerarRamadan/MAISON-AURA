/** @type {import('tailwindcss').Config} */
export default {
    // الملفات التي سيتم البحث فيها عن كلاسات Tailwind
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // تفعيل وضع الظلام باستخدام كلاس 'dark'
    darkMode: 'class',
    theme: {
        extend: {
            // إضافة ألوان مخصصة للمشروع
            colors: {
                gold: '#d4af37', // اللون الذهبي للهوية البصرية
                'black-rich': '#0a0a0a', // الأسود الفاخر
                cream: '#fdfbf7', // لون القشدة للخلفيات
            },
            // إضافة خطوط مخصصة (تحتاج للربط في index.html أو CSS)
            fontFamily: {
                serif: ['"Amiri"', 'serif'], // خط أميري للنصوص الكلاسيكية
                sans: ['"Tajawal"', 'sans-serif'], // خط تجوال للنصوص العصرية
            },
            // تعريف الحركات المخصصة
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-25%)' },
                }
            },
            // تعريف الأنميشن
            animation: {
                marquee: 'marquee 40s linear infinite',
            }
        },
        // إعدادات الحاوية (Container)
        container: {
            center: true,
            padding: '2rem',
        }
    },
    plugins: [],
}
