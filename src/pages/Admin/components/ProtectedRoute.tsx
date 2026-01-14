import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

// مكون حماية المسارات (Protected Route)
// يتحقق مما إذا كان المستخدم مسجلاً للدخول كمسؤول، وإلا يعيد توجيهه لصفحة الدخول
export default function ProtectedRoute() {
    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}
