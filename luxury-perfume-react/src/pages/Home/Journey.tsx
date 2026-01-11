import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

export default function Journey() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { t } = useTranslation();

    const steps = [
        {
            id: "01",
            title: t('home_sections.journey.steps.step1.title'),
            content: t('home_sections.journey.steps.step1.content')
        },
        {
            id: "02",
            title: t('home_sections.journey.steps.step2.title'),
            content: t('home_sections.journey.steps.step2.content')
        },
        {
            id: "03",
            title: t('home_sections.journey.steps.step3.title'),
            content: t('home_sections.journey.steps.step3.content')
        }
    ];

    return (
        <section className="py-24 px-6 md:px-24 bg-cream">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif mb-4">{t('home_sections.journey.title')}</h2>
                <p className="text-gray-500">{t('home_sections.journey.subtitle')}</p>
            </div>

            <div className="border-t border-black/10 max-w-4xl mx-auto">
                {steps.map((step, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div key={idx} className="accordion-item border-b border-black/10">
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                                className="w-full text-right py-6 flex justify-between items-center cursor-pointer group hover:bg-black/5 transition-colors px-4 rounded-lg my-2"
                            >
                                <div className="flex items-center gap-6">
                                    <span className={cn(
                                        "text-gold font-serif text-3xl font-bold transition-opacity",
                                        isOpen ? "opacity-100" : "opacity-50 group-hover:opacity-100"
                                    )}>
                                        {step.id}
                                    </span>
                                    <h3 className="text-2xl font-serif text-gray-800">{step.title}</h3>
                                </div>
                                <div className={cn(
                                    "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
                                    isOpen ? "border-gold text-gold" : "group-hover:border-gold group-hover:text-gold"
                                )}>
                                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 pr-20 pl-4">
                                            <p className="text-gray-600 text-lg leading-loose">
                                                {step.content}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
