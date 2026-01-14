import { Menu, Globe, User as UserIcon, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

// رأس لوحة التحكم (Admin Header)
export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const { i18n } = useTranslation();
    const user = useAuthStore((state) => state.user);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-gray-100 z-30 px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-colors text-black-rich"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <h1 className="text-xl font-serif font-bold text-black-rich">
                    MAISON AURA <span className="text-gold text-sm ml-2 font-sans uppercase tracking-widest bg-black-rich text-white px-2 py-0.5 rounded-full">Admin</span>
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleLanguage}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-2 text-sm font-bold text-black-rich"
                >
                    <Globe className="w-5 h-5" />
                    <span className="hidden sm:inline">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
                </button>

                <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-bold text-black-rich">{user?.name}</span>
                        {user?.phone && (
                            <div className="flex items-center gap-1 text-gray-500">
                                <Phone className="w-3 h-3 text-gold" />
                                <span className="text-xs font-mono" dir="ltr">{user.phone}</span>
                            </div>
                        )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
                        {user?.name ? (
                            <div className="w-full h-full bg-black-rich text-white flex items-center justify-center font-bold text-sm uppercase">
                                {user.name.substring(0, 2)}
                            </div>
                        ) : (
                            <UserIcon className="w-5 h-5 text-gray-600" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
