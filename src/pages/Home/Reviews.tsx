import { useTranslation } from 'react-i18next';

export default function Reviews() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-gold/5 overflow-hidden border-y border-gold/10">
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-marquee">
                    <li className="font-serif text-4xl md:text-5xl text-gold italic leading-normal whitespace-nowrap" dir="ltr">
                        {t('reviews.text')}
                    </li>
                    <li className="font-serif text-4xl md:text-5xl text-gold italic leading-normal whitespace-nowrap" dir="ltr">
                        {t('reviews.text')}
                    </li>
                    <li className="font-serif text-4xl md:text-5xl text-gold italic leading-normal whitespace-nowrap" dir="ltr">
                        {t('reviews.text')}
                    </li>
                    <li className="font-serif text-4xl md:text-5xl text-gold italic leading-normal whitespace-nowrap" dir="ltr">
                        {t('reviews.text')}
                    </li>
                </ul>
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-marquee" aria-hidden="true">
                    <li className="font-serif text-4xl md:text-5xl text-gold italic leading-normal whitespace-nowrap" dir="ltr">
                        {t('reviews.text')}
                    </li>
                    <li className="font-serif text-4xl md:text-5xl text-gold italic leading-normal whitespace-nowrap" dir="ltr">
                        {t('reviews.text')}
                    </li>
                    <li className="font-serif text-4xl md:text-5xl text-gold italic leading-normal whitespace-nowrap" dir="ltr">
                        {t('reviews.text')}
                    </li>
                    <li className="font-serif text-4xl md:text-5xl text-gold italic leading-normal whitespace-nowrap" dir="ltr">
                        {t('reviews.text')}
                    </li>
                </ul>
            </div>
        </section>
    );
}
