import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../shared/stores/authStore';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, getRole } = useAuthStore();
  const userRole = getRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (allowedRoles.length === 0 || userRole === 'ADMIN_ROLE') {
    return children;
  }

  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute; 