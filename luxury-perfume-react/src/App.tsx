import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <CartProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailsPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />

                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={<ProtectedRoute />}>
                            <Route element={<AdminLayout />}>
                                <Route index element={<AdminDashboard />} />
                                <Route path="products" element={<AdminProducts />} />
                                <Route path="orders" element={<AdminOrders />} />
                                <Route path="users" element={<AdminUsers />} />
                            </Route>
                        </Route>
                    </Routes>
                </Layout>
            </Router>
        </CartProvider>
    );
}

export default App;
