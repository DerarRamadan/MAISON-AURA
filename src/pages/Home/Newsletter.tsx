import { useTranslation } from 'react-i18next';

// قسم القائمة البريدية (Newsletter)
export default function Newsletter() {
    const { t } = useTranslation();

    return (
        <section className="py-32 flex flex-col items-center justify-center bg-white px-4 text-center">
            <h2 className="text-3xl font-serif mb-8">{t('newsletter.title')}</h2>
            <form className="flex border-b border-black pb-2 w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    className="bg-transparent w-full outline-none placeholder-gray-500 text-end p-2 font-sans"
                />
                <button type="submit" className="font-bold hover:text-gold whitespace-nowrap transition-colors">{t('newsletter.button')}</button>
            </form>
        </section>
    );
}
