import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAdminStore } from '../../store/useAdminStore'; // Import AdminStore
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react'; // Added User icon

export default function AdminLogin() {
    const [username, setUsername] = useState<string>(''); // Changed from just password to username + password
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const login = useAuthStore((state) => state.login);
    const getAdminByCredentials = useAdminStore((state) => state.getAdminByCredentials);

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const adminUser = getAdminByCredentials(username, password);

        if (adminUser) {
            login({
                id: adminUser.id,
                name: adminUser.name,
                username: adminUser.username,
                role: adminUser.role,
                phone: adminUser.phone
            });
            navigate('/admin');
        } else {
            setError('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-black-rich">دخول المسؤول</h1>
                    <p className="text-gray-500 text-sm mt-2">يرجى إدخال بيانات الدخول للمتابعة</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">اسم المستخدم أو الهاتف</label>
                        <div className="relative">
                            <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold transition-colors"
                                placeholder="اسم المستخدم"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
                        <div className="relative">
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center font-bold bg-red-50 py-2 rounded-lg">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black-rich text-white py-3 rounded-xl hover:bg-gold transition-colors font-bold shadow-lg shadow-black/10"
                    >
                        تسجيل الدخول
                    </button>

                    <p className="text-xs text-center text-gray-400">
                        البيانات الافتراضية: admin / admin123
                    </p>
                </form>
            </div>
        </div>
    );
}
