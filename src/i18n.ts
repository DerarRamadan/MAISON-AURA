import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';


// مكتبة i18next لإدارة تعدد اللغات
i18n
    // تحميل ملفات الترجمة عبر HTTP (من المجلد العامة /public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // اكتشاف لغة المستخدم تلقائيًا (من المتصفح)
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // تمرير نسخة i18n إلى react-i18next
    .use(initReactI18next)
    // تهيئة الإعدادات
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: 'ar', // اللغة الاحتياطية
        lng: 'ar', // اللغة الافتراضية: العربية
        debug: true, // تفعيل وضع التصحيح في الكونسول

        interpolation: {
            escapeValue: false, // لا حاجة للهروب (escaping) لأن React يقوم بذلك تلقائيًا
        },

        backend: {
            loadPath: '/locales/{{lng}}/translation.json', // مسار ملفات الترجمة
        }
    });

export default i18n;
