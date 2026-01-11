import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export default function ProtectedRoute() {
    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}
