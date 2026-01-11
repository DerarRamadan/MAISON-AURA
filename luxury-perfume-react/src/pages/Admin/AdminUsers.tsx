import React, { useState } from 'react';
import { Search, UserPlus, Edit2, Trash2, X, Phone, User, Lock, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdminStore, type AdminUser } from '../../store/useAdminStore';

export default function AdminUsers() {
    const { t } = useTranslation();
    const { admins, addAdmin, updateAdmin, removeAdmin } = useAdminStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        phone: '',
        password: '',
        role: 'admin' as 'admin' | 'editor'
    });

    const resetForm = () => {
        setFormData({
            name: '',
            username: '',
            phone: '',
            password: '',
            role: 'admin'
        });
        setEditingUser(null);
    };

    const handleOpenModal = (user?: AdminUser) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                username: user.username,
                phone: user.phone,
                password: user.password,
                role: user.role
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            updateAdmin(editingUser.id, formData);
        } else {
            addAdmin(formData);
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
            removeAdmin(id);
        }
    };

    const filteredUsers = admins.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold text-black-rich">{t('admin.users_page.title')}</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-black-rich text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gold transition-colors"
                >
                    <UserPlus className="w-5 h-5" />
                    <span>إضافة مستخدم</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={t('admin.users_page.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                    />
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
                        <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleOpenModal(user)}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gold hover:text-white transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-black-rich text-white flex items-center justify-center font-bold text-lg uppercase">
                                {user.name.substring(0, 2)}
                            </div>
                            <div>
                                <h3 className="font-bold text-black-rich">{user.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <Shield className="w-3 h-3 text-gold" />
                                    <span>{user.role === 'admin' ? 'مسؤول' : 'محرر'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <User className="w-4 h-4 text-gold" />
                                <span dir="ltr">@{user.username}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Phone className="w-4 h-4 text-gold" />
                                <span dir="ltr">{user.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Lock className="w-4 h-4 text-gold" />
                                <span className="font-mono text-xs">••••••••</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400 flex justify-between">
                            <span>تاريخ الإنشاء:</span>
                            <span>{new Date(user.createdAt).toLocaleDateString('ar-EG')}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold font-serif">
                                {editingUser ? 'تعديل بيانات المستخدم' : 'إضافة مستخدم جديد'}
                            </h2>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">اسم المستخدم</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف</label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">كلمة المرور</label>
                                <input
                                    type="text"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">الصلاحية</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'editor' })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold bg-white"
                                >
                                    <option value="admin">مسؤول كامل</option>
                                    <option value="editor">محرر</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 py-2 border border-gray-200 rounded-lg font-bold hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-black-rich text-white rounded-lg font-bold hover:bg-gold transition-colors"
                                >
                                    حفظ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
