import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Route guard for /admin routes.
 * Redirects unauthenticated users to /admin/login.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  if (!isAuthenticated || !token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
