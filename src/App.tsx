import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home/HomePage';
import ShopPage from './pages/Shop/ShopPage';
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import AdminLayout from './pages/Admin/components/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminLogin from './pages/Admin/AdminLogin';
import ProtectedRoute from './pages/Admin/components/ProtectedRoute';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// المكون الرئيسي للتطبيق
// يحتوي على إعدادات التوجيه (Routing) والهيكل العام للصفحات
function App() {
    const { i18n } = useTranslation();

    // تحديث اتجاه الصفحة (RTL/LTR) بناءً على اللغة المختارة
    useEffect(() => {
        const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.dir = dir;
        document.documentElement.dir = dir;
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        // مزود سلة المشتريات (Cart Context) لتوفير بيانات السلة لكل المكونات
        <CartProvider>
            <Router>
                <Routes>
                    {/* المسارات العامة (Public Routes) - محاطة بتخطيط الصفحة الرئيسي */}
                    <Route element={<Layout><Outlet /></Layout>}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailsPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                    </Route>

                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* مسارات لوحة التحكم (Admin Routes) - محمية وتستخدم تخطيط لوحة التحكم */}
                    <Route path="/admin" element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="products" element={<AdminProducts />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="users" element={<AdminUsers />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
